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
- 显示模式（交换图片至屏幕的时机）
- 交换范围（交换链中的图像的分辨率）

对于上述设置，每一个我们都有一个理想的值，如果这个理想的值无法满足，则应当寻找一个尽可能好的替代的值。

### 表面（颜色）格式（Surface format）

创建一个函数来选择合适的表面格式，函数接受一个来自`SwapChainSupportDetails`上一小节结构体的`VkSurfaceFormatKHR`列表作为参数：

```c++
VkSurfaceFormatKHR chooseSwapSurfaceFormat(const std::vector<VkSurfaceFormatKHR>& availableFormats) {

}
```

每一个 `VkSurfaceFormatKHR` 都包含一个 `format` 和一个 `colorSpace`成员变量。 `format` 成员变量代表了颜色通道与格式。例如， `VK_FORMAT_B8G8R8A8_SRGB` 代表了包含RGBA四个8bit通道的色彩格式。 `colorSpace`成员变量使用 `VK_COLOR_SPACE_SRGB_NONLINEAR_KHR`表示是否支持SRGB色彩空间，需要注意的是在旧版本中为 `VK_COLORSPACE_SRGB_NONLINEAR_KHR` 。

如果支持SRGB，那么我们应该尽可能的使用，因为这样我们可以[获得好的色准表现](http://stackoverflow.com/questions/12524623/)。SRGB也是最常用的标准图片色彩空间，后面我们使用的纹理（材质）通常为此。因此我们选择使用SRGB色彩空间格式 `VK_FORMAT_B8G8R8A8_SRGB`。

我们遍历列表，来寻找支持SRGB的表面格式：

```c++
for (const auto& availableFormat : availableFormats) {
    if (availableFormat.format == VK_FORMAT_B8G8R8A8_SRGB && availableFormat.colorSpace == VK_COLOR_SPACE_SRGB_NONLINEAR_KHR) {
        return availableFormat;
    }
}
```

如果不存在我们想要的表面格式，那么我们还需要制定一个标准来为不同的表面格式打分，然后进行排序选择最好的那一个。但是多数情况下我们直接使用默认的第一个就行了。

```c++
VkSurfaceFormatKHR chooseSwapSurfaceFormat(const std::vector<VkSurfaceFormatKHR>& availableFormats) {
    for (const auto& availableFormat : availableFormats) {
        if (availableFormat.format == VK_FORMAT_B8G8R8A8_SRGB && availableFormat.colorSpace == VK_COLOR_SPACE_SRGB_NONLINEAR_KHR) {
            return availableFormat;
        }
    }

    return availableFormats[0];
}
```

### 显示模式（Presentation mode）

显示模式可以说是交换链最重要的设置，因为它代表了交换链向屏幕上显示图像的条件。Vulkan提供了四种可选的模式：

- `VK_PRESENT_MODE_IMMEDIATE_KHR`：立即将应用提交的图像交换到屏幕上，可能会导致画面撕裂。
- `VK_PRESENT_MODE_FIFO_KHR`：交换链变成一个队列，当显示器刷新并且应用在队列后面插入渲染的图像时，显示器从队列前面获取图像。如果队列已满，则插入操作需要等待。这与现代游戏中的垂直同步最相似。显示屏刷新的那一刻称为“垂直消隐（vertical blank）”。
- `VK_PRESENT_MODE_FIFO_RELAXED_KHR`：与上一个模式的区别在于，当显示器刷新速度远高于应用插入速度，导致队列为空后，如果此时应用在队列插入图像便会立即被交换到屏幕上，而不会等待下次屏幕刷新。这可能导致画面撕裂。
- `VK_PRESENT_MODE_MAILBOX_KHR`：这也是第二种模式的变种。区别在于，如果队列满了不会堵塞新的插入操作，而是直接用新的图片替换队列中的内容。相比于普通的垂直同步，这种模式可以在减少延迟或卡顿撕裂的前提下尽可能的提高帧渲染速度。这通常被称为“三重缓冲”，尽管仅存在三个缓冲区并不一定意味着帧速率是解锁的。

在这些模式中，一般情况 `VK_PRESENT_MODE_FIFO_KHR` 是绝对可用的，接下来开始新建选择交换显示模式函数，默认返回 `VK_PRESENT_MODE_FIFO_KHR` ：

```c++
VkPresentModeKHR chooseSwapPresentMode(const std::vector<VkPresentModeKHR>& availablePresentModes) {
    return VK_PRESENT_MODE_FIFO_KHR;
}
```

我个人认为`VK_PRESENT_MODE_MAILBOX_KHR`（三重缓冲）综合来说具有更好的性能（如果不考虑功率消耗）。但是在移动设备上，我们最好使用 `VK_PRESENT_MODE_FIFO_KHR` 来减少功耗的使用（省电）。现在，我们在方法中添加寻找`VK_PRESENT_MODE_MAILBOX_KHR` 的逻辑：

```c++
VkPresentModeKHR chooseSwapPresentMode(const std::vector<VkPresentModeKHR>& availablePresentModes) {
    for (const auto& availablePresentMode : availablePresentModes) {
        if (availablePresentMode == VK_PRESENT_MODE_MAILBOX_KHR) {
            return availablePresentMode;
        }
    }

    return VK_PRESENT_MODE_FIFO_KHR;
}
```

### 交换范围（Swap extent）

现在只剩最后一个交换范围需要选择，为其添加一个函数：

```c++
VkExtent2D chooseSwapExtent(const VkSurfaceCapabilitiesKHR& capabilities) {

}
```

交换范围指的是交换链中的图像分辨率，通常这个分辨率就等于我们应用的窗口分辨率。可选的分辨率范围定义在 `VkSurfaceCapabilitiesKHR`结构体中。Vlukan通过 `currentExtent`告诉我们应用程序窗口的交换范围。但是在某些系统平台上这些数值会被设置为 `uint32_t`的最大值，这表明需要我们自己选择范围，而且必须要在 `minImageExtent` 和 `maxImageExtent` 之间。 

请注意，一定要使用恰当的单位。GLFW有两种不同的描述屏幕尺寸的单位：像素、[屏幕坐标](https://www.glfw.org/docs/latest/intro_guide.html#coordinate_systems)。例如，我们先前创建窗口用的宽高单位就是屏幕坐标单位。但是Vulkan使用的是像素单位，因此交换链范围使用的也是像素单位。如果你使用的是高DPI屏幕（如苹果的 Retina 显示器），那么屏幕的坐标单位与像素单位大小就是不一致的。由于像素密度较高，窗口的像素分辨率将大于屏幕坐标中的分辨率。因此，如果Vulkan没有通过 `currentExtent`提供给我们恰当的交换分辨率，我们不能直接使用窗口的宽高。需要使用 `glfwGetFramebufferSize`获取窗口的像素单位尺寸。

```c++
#include <cstdint> // Necessary for uint32_t
#include <limits> // Necessary for std::numeric_limits
#include <algorithm> // Necessary for std::clamp

...

VkExtent2D chooseSwapExtent(const VkSurfaceCapabilitiesKHR& capabilities) {
    if (capabilities.currentExtent.width != std::numeric_limits<uint32_t>::max()) {
        return capabilities.currentExtent;
    } else {
        int width, height;
        glfwGetFramebufferSize(window, &width, &height);

        VkExtent2D actualExtent = {
            static_cast<uint32_t>(width),
            static_cast<uint32_t>(height)
        };

        actualExtent.width = std::clamp(actualExtent.width, capabilities.minImageExtent.width, capabilities.maxImageExtent.width);
        actualExtent.height = std::clamp(actualExtent.height, capabilities.minImageExtent.height, capabilities.maxImageExtent.height);

        return actualExtent;
    }
}
```

 函数`clamp`用于将 `width` 和`height`限制在最大和最小范围之间。

## 创建交换链 

现在我们已经准备好了创建交换链所需的工具，接下来使用这些工具获取恰当的信息来创建交换链。

创建一个 `createSwapChain` 函数并在 `initVulkan` 中的创建逻辑设备后调用：

```c++
void initVulkan() {
    createInstance();
    setupDebugMessenger();
    createSurface();
    pickPhysicalDevice();
    createLogicalDevice();
    createSwapChain();
}

void createSwapChain() {
    SwapChainSupportDetails swapChainSupport = querySwapChainSupport(physicalDevice);

    VkSurfaceFormatKHR surfaceFormat = chooseSwapSurfaceFormat(swapChainSupport.formats);
    VkPresentModeKHR presentMode = chooseSwapPresentMode(swapChainSupport.presentModes);
    VkExtent2D extent = chooseSwapExtent(swapChainSupport.capabilities);
}
```

除此之外我们还需要决定交换链队列大大小。我们可以从交换链支持信息中获取交换链支持的最小队列数量：

```c++
uint32_t imageCount = swapChainSupport.capabilities.minImageCount;
```

然而，简单地坚持这个最低标准意味着我们有时可能需要等待驱动程序完成内部操作，然后我们才能对另一个图像进行渲染。因此，建议至少要求比最小值多一张图像：

```c++
uint32_t imageCount = swapChainSupport.capabilities.minImageCount + 1;
```

有了队列最小长度，我们还应该确保不超过图像的最大数量，其中0是一个特殊值，这意味着没有最大限制：

```c++
if (swapChainSupport.capabilities.maxImageCount > 0 && imageCount > swapChainSupport.capabilities.maxImageCount) {
    imageCount = swapChainSupport.capabilities.maxImageCount;
}
```

与Vulkan创建其他的对象一样，创建交换链对象使用一个结构体作为创建参数：

```c++
VkSwapchainCreateInfoKHR createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_SWAPCHAIN_CREATE_INFO_KHR;
createInfo.surface = surface;   // 交换链绑定的窗口表面
```

在指定交换链绑定的表面后，指定交换链的详细设置信息：

```c++
createInfo.minImageCount = imageCount;
createInfo.imageFormat = surfaceFormat.format;
createInfo.imageColorSpace = surfaceFormat.colorSpace;
createInfo.imageExtent = extent;
createInfo.imageArrayLayers = 1;
createInfo.imageUsage = VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT;
```

 `imageArrayLayers` 用于指定每个图像包含的层数。除非是立体3D应用程序，否则这始终为1。 `imageUsage`用于设置交换链中的图像的作用。在本教程中我们我们将直接渲染图像，即直接对其着色。

还可以先将图像渲染为单独的图像，用于做一些后处理等操作。在这种情况下，可以设置为`VK_IMAGE_USAGE_TRANSFER_DST_BIT`，并使用内存操作将渲染的图像传输到交换链图像。
