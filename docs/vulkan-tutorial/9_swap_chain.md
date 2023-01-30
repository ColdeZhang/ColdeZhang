---
title: 交换链
date: 2023-1-13
article: false
---

Vulkan没有“默认帧缓存”的概念，因此它需要一个方案来实现类似于buffer的功能，在我们将其内存显示带屏幕上之前渲染buffer里的东西。这个方案被称为*交换链*，在Vulkan中必须手动创建。交换链本质上就是一系列等待被呈现到屏幕上的image。我们的应用会获取图片进行绘制，然后将图片返回队列。交换链的配置决定了队列的工作方式与图片的现实时机，但是交换链最常用的功能还是用于同步图片的展示和屏幕刷新率。

## 检查交换链支持

因为各种原因，不是所有显卡都能够直接将图片展示在屏幕上的，例如一些服务器专用计算卡是没有显示输出接口的。其次，图片显示与窗口系统还有窗口表面是强绑定的，它们实际上不属于Vulkan的核心。因此我们需要启用 `VK_KHR_swapchain` 设备扩展来检查支持性。

为此我们首先需要扩展 `isDeviceSuitable` 函数的功能，来检查设备是否支持交换链扩展。先前我们已经介绍了列出 [`VkPhysicalDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html)物理设备支持的扩展列表的方法，现在只需要检查交换链扩展是否在列表中即可。Vulkan提供了一个`VK_KHR_SWAPCHAIN_EXTENSION_NAME`宏定义来指代 `VK_KHR_swapchain`字符串，使用宏定义可以避免拼写错误。

首先定义一个设备所需扩展列表（类似于所需校验层列表）：

```c++
const std::vector<const char*> deviceExtensions = {
    VK_KHR_SWAPCHAIN_EXTENSION_NAME
};
```

接着创建一个新的函数 `checkDeviceExtensionSupport` 用于检查设备扩展支持性，并在 `isDeviceSuitable` 中调用：

```c++
bool isDeviceSuitable(VkPhysicalDevice device) {
    QueueFamilyIndices indices = findQueueFamilies(device);

    bool extensionsSupported = checkDeviceExtensionSupport(device);

    return indices.isComplete() && extensionsSupported;
}

bool checkDeviceExtensionSupport(VkPhysicalDevice device) {
    return true;
}
```

完善新函数的结构体，获取设备拥有的所有扩展，并检查其中是否有我们所需的扩展：

```c++
bool HelloTriangleApplication::checkDeviceExtensionSupport(VkPhysicalDevice _device) {
    uint32_t extensionCount;
    vkEnumerateDeviceExtensionProperties(_device, nullptr, &extensionCount, nullptr);
    std::vector<VkExtensionProperties> availableExtensions(extensionCount);
    vkEnumerateDeviceExtensionProperties(_device, nullptr, &extensionCount, availableExtensions.data());

    std::set<std::string> requiredExtensions(deviceExtensions.begin(), deviceExtensions.end());
    for (const auto& extension : availableExtensions) {
        requiredExtensions.erase(extension.extensionName);
    }

    return requiredExtensions.empty();
}
```

此处将所需的扩展拷贝到一个新的列表中，然后尝试将设备支持的扩展依次从新列表剔除。这样如果新列表最后为空，意味着设备拥有所有我们所需的扩展。这样做仅需要一个循环即可完成，你也可以使用类似于 `checkValidationLayerSupport`中的双重循环来实现这一功能。

现在编译运行程序，验证你的系统平台是否支持交换链扩展。事实上如果我们上一章节的显示队列是存在的，那么交换链扩展也必然存在。尽管如此，明确的检查步骤是个不错的好习惯。

## 启用设备扩展

使用交换链还需要启用 `VK_KHR_swapchain` 扩展，我们需要修改一下创建逻辑设备的函数，完善创建信息：

```c++
createInfo.enabledExtensionCount = static_cast<uint32_t>(deviceExtensions.size());
createInfo.ppEnabledExtensionNames = deviceExtensions.data();
```

## 查询交换链支持的详细信息

仅仅检查设备是否支持交换链是不够的，因为交换链可能无法用于我们的窗口表面。创建交换链所需要的设置比实例还有设备多得多，因此在正式创建交换链之前我们需要更多信息。

主要有以下这些东西需要检查：

- 基本窗口表面支持（交换链存储的最大/最小图片数量与图片的宽高）
- 窗口表面颜色格式（像素/色彩空间）
- 可用的显示模式

与 `findQueueFamilies`寻找队列族相似，我们使用一个结构体打包所需的信息。上述三种类型的属性打包后如下：

```c++
struct SwapChainSupportDetails {
    VkSurfaceCapabilitiesKHR capabilities;
    std::vector<VkSurfaceFormatKHR> formats;
    std::vector<VkPresentModeKHR> presentModes;
};
```

然后创建一个新函数 `querySwapChainSupport` 获取交换链信息：

```c++
SwapChainSupportDetails querySwapChainSupport(VkPhysicalDevice device) {
    SwapChainSupportDetails details;

    return details;
}
```

此章节主要介绍如何获取这些信息。关于这些结构体的具体数据的含义会在下一章节说明。

我们先从基本的窗口表面支持开始：

```c++
vkGetPhysicalDeviceSurfaceCapabilitiesKHR(device, surface, &details.capabilities);
```

这个函数传入一个 [`VkPhysicalDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html) 物理设备与 `VkSurfaceKHR`窗口表面作为参数，使用`VkSurfaceCapabilitiesKHR`指针带出结果，接下来的另外两个函数的前两个参数与之相同。

下一步是获取交换链支持的表面颜色格式，由于是一个结构体列表，因此需要先获取数量再获取列表本身：

```c++
uint32_t formatCount;
vkGetPhysicalDeviceSurfaceFormatsKHR(device, surface, &formatCount, nullptr);

if (formatCount != 0) {
    details.formats.resize(formatCount);
    vkGetPhysicalDeviceSurfaceFormatsKHR(device, surface, &formatCount, details.formats.data());
}
```

最后用类似的方法获取支持的显示模式列表：

```c++
uint32_t presentModeCount;
vkGetPhysicalDeviceSurfacePresentModesKHR(device, surface, &presentModeCount, nullptr);

if (presentModeCount != 0) {
    details.presentModes.resize(presentModeCount);
    vkGetPhysicalDeviceSurfacePresentModesKHR(device, surface, &presentModeCount, details.presentModes.data());
}
```

现在所有我们需要的详细信息都在结构体中了，接下来扩充 `isDeviceSuitable` 函数，新增交换链支持是否完善的检查。在本教程中只要交换链支持我们的窗口表面至少一个颜色（图片）格式与一个显示模式即可。

```c++
bool swapChainAdequate = false;
if (extensionsSupported) {
    SwapChainSupportDetails swapChainSupport = querySwapChainSupport(device);
    swapChainAdequate = !swapChainSupport.formats.empty() && !swapChainSupport.presentModes.empty();
}
```

需要注意的是我们应当**只在交换链扩展支持的前提下**才需要检查交换链详情。最后补充返回语句：

```c++
return indices.isComplete() && extensionsSupported && swapChainAdequate;
```

## 为交换链选择合适的设置

尽管现在已经能够确定交换链适用于窗口表面，但是因为交换链每个参数都有若干个可选内容，因此我们还需要选择最合适的设置来创建交换链。具体来说有三种类型的设置需要确定：

- 颜色（表面）格式（颜色、深度）
- 显示格式（交换图片至屏幕的时机）
- 交换范围（交换链中的图像的分辨率）

对于上述设置，每一个我们都有一个理想的值，如果这个理想的值无法满足，则应当寻找一个尽可能好的替代的值。

### 表面格式

