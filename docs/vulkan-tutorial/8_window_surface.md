---
title: 窗口表面
date: 2023-1-6
article: false
---

由于Vulkan是一个与硬件平台无关的抽象API，它无法直接与窗口系统交互。要向屏幕显示结果，我们需要使用WSI（Window System Integration 窗口系统集成）系列扩展在Vulkan和窗口系统之间建立连接。在本章中，我们将讨论第一个扩展，`VK_KHR_surface`。它提供了一个`VkSurfaceKHR`对象，我们就将图像渲染在这个对象的抽象表面。再由我们已经使用GLFW打开的窗口将这个表面显示出来。

`VK_KHR_surface`属于实例扩展，因此我们实际上已经在先前获取实例扩展列表（`glfwGetRequiredInstanceExtensions`）的时候启用了它。同样的这个方法返回的扩展列表里包含了所有的WSI扩展，我们会在后面一些章节使用它们。

窗口表面的创建需要在实例创建之后、物理设备选择之前，因为是否创建窗口表面会影响到物理设备的选择。我们现在才介绍窗口表面而不是在创建实例后介绍的原因是：窗口表面只是渲染目标和展示这一终极目标的一小部分，提前引入介绍对系统的理解是不利的。另外，窗口表面也并不是Vulkan必须的配置，因为你可能只需要使用Vulkan来做一些无屏渲染工作，那么在这种情况下我们并不需要一个可视的窗口，因此也不需要窗口表面。

## 创建窗口表面

首先在勒种创建一个`surface`成员变量。

```c++
VkSurfaceKHR surface;
```

虽然`VkSurfaceKHR`对象及其使用与平台无关，但创建的详细步骤在不同的系统平台上都不太一样。例如，在Windows上创建窗口表面需要`HWND`和`HMODULE`句柄。因此，在不同的平台上他们这个扩展有不同的名字，在Windows上称为`VK_KHR_win32_surface`，也会自动包含在`glfwGetRequiredInstanceExtensions`的列表中。

我们将以Windows平台为例展示如何实现这种特定平台的扩展创建，但教程中实际上不会这么做。因为，既然都使用了GLFW这样的跨平台库，还需要为不同平台准备不同的源代码是非常不可理喻的。GLFW实际上为我们提供了`glfwCreateWindowSurface`函数，为我们在不同平台创建不同的窗口表面。尽管如此，在我们依赖这样的自动化功能之前，最好先了解它在幕后做了什么。

在顶部的头文件引入Windows平台的原生API：

```c++
#define VK_USE_PLATFORM_WIN32_KHR
#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>
#define GLFW_EXPOSE_NATIVE_WIN32
#include <GLFW/glfw3native.h>
```

由于窗口表面是Vulkan对象，因此需要配置`VkWin32SurfaceCreateInfoKHR`结构体来创建。它有两个重要参数：`hwnd`和`hinstance`，分别对应了Windows系统中的窗口和进程。

```c++
VkWin32SurfaceCreateInfoKHR createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_WIN32_SURFACE_CREATE_INFO_KHR;
createInfo.hwnd = glfwGetWin32Window(window);
createInfo.hinstance = GetModuleHandle(nullptr);
```

 `glfwGetWin32Window` 函数用于从GLFW窗口对象中获取原生 `HWND`。`GetModuleHandle`则会返回一个 `HINSTANCE`代表了当前进程的句柄。

之后，可以使用`vkCreateWin32SurfaceKHR`创建窗口表面，其中包括实例的参数、窗口表面创建详细信息、自定义分配器和用与存储窗口表面的变量。从技术上讲，这是一个WSI扩展函数，但它非常常用，以至于标准的Vulkan加载程序就包含它，因此与其他扩展不同，我们不用手动加载它。

```c++
if (vkCreateWin32SurfaceKHR(instance, &createInfo, nullptr, &surface) != VK_SUCCESS) {
    throw std::runtime_error("failed to create window surface!");
}
```

以上过程同样适用于Linux等其他平台，使用`vkCreateXcbSurfaceKHR`将XCB连接和窗口作为创建详细信息。



`glfwCreateWindowSurface`函数可以帮助我们自动适应不同平台的创建操作。我们现在将把它引入到我们的项目中中。添加一个函数`createSurface`，在`initVulkan`中，实例创建和`setupDebugMessenger`后调用。

```c++
void initVulkan() {
    createInstance();
    setupDebugMessenger();
    createSurface();
    pickPhysicalDevice();
    createLogicalDevice();
}

void createSurface() {

}
```

GLFW调用采用简单的参数，而不是复杂的结构体作为创建参数：

```c++
void createSurface() {
    if (glfwCreateWindowSurface(instance, window, nullptr, &surface) != VK_SUCCESS) {
        throw std::runtime_error("failed to create window surface!");
    }
}
```

需要的参数依次为 [`VkInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html)（Vulkan实例），窗口指针，可自定义的分配器，存储创建出来的窗口表面的指针。这个函数会返回一个 [`VkResult`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkResult.html)类型表明创建的结果。GLFW并没有提供用于销毁窗口表面的专用API，因为销毁窗口表面只需要使用原生API即可：

```c++
void cleanup() {
        ...
        vkDestroySurfaceKHR(instance, surface, nullptr);
        vkDestroyInstance(instance, nullptr);
        ...
    }
```

请确保窗口表面的销毁在实例销毁之前。



## 检查显示支持（Presentation Support）

虽然Vulkan实现可以支持窗口系统集成，但这并不意味着设备上的每张显卡都支持Vulkan。因此，我们需要扩展`isDeviceSuitable`函数的功能，以确保设备可以将图像显示到我们创建的窗口表面。由于显示是特定于队列的功能，因此这个问题实际上是找到一个能够在我们创建的表面显示图像的队列族。

实际上，支持绘图命令的队列族和支持显示的队列族可能并不重复。因此，我们必须在我们的程序中预留保存位置，修改`QueueFamilyIndices`结构，新增一个显示队列族：

```c++
struct QueueFamilyIndices {
    std::optional<uint32_t> graphicsFamily;
    std::optional<uint32_t> presentFamily;

    bool isComplete() {
        return graphicsFamily.has_value() && presentFamily.has_value();
    }
};
```

接下来修改 `findQueueFamilies`函数，增加寻找显示窗口表面队列族的功能。我们在遍历循环中使用`vkGetPhysicalDeviceSurfaceSupportKHR`函数检查每个队列族，如果支持窗口表面显示功能则将其索引添加到`QueueFamilyIndices`结构体：

```c++
VkBool32 presentSupport = false;
vkGetPhysicalDeviceSurfaceSupportKHR(device, i, surface, &presentSupport);
if (presentSupport) {
    indices.presentFamily = i;
}
```

请注意，他们最终很可能是同一个队列族，但为了统一操作，我们将把它们视为两个不同的东西。我们也可以明确指定绘制和显示的队列族为同一个物理设备来提高性能。

## 创建显示队列（Presentation Queue）

剩下的一件事是修改逻辑设备创建过程，以创建显示队列并获取[`VkQueue`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkQueue.html)句柄。首先添加一个成员变量：

```c++
VkQueue presentQueue;
```

接下来，我们需要给每个族准备[`VkDeviceQueueCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDeviceQueueCreateInfo.html)结构来创建族的队列。一种优雅的方法是创建一个包含所需队列族的集合，然后遍历实现：

```c++
#include <set>

...

QueueFamilyIndices indices = findQueueFamilies(physicalDevice);

std::vector<VkDeviceQueueCreateInfo> queueCreateInfos;
std::set<uint32_t> uniqueQueueFamilies = {indices.graphicsFamily.value(), indices.presentFamily.value()};

float queuePriority = 1.0f;
for (uint32_t queueFamily : uniqueQueueFamilies) {
    VkDeviceQueueCreateInfo queueCreateInfo{};
    queueCreateInfo.sType = VK_STRUCTURE_TYPE_DEVICE_QUEUE_CREATE_INFO;
    queueCreateInfo.queueFamilyIndex = queueFamily;
    queueCreateInfo.queueCount = 1;
    queueCreateInfo.pQueuePriorities = &queuePriority;
    queueCreateInfos.push_back(queueCreateInfo);
}
```

修改 [`VkDeviceCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDeviceCreateInfo.html) 使用新的参数：

```c++
createInfo.queueCreateInfoCount = static_cast<uint32_t>(queueCreateInfos.size());
createInfo.pQueueCreateInfos = queueCreateInfos.data();
```

如果队列族相同，那么我们只需要传递一次其索引。最后，获取队列句柄：

```c++
vkGetDeviceQueue(device, indices.presentFamily.value(), 0, &presentQueue);
```

如果队列家族相同，这两个句柄现在很可能具有相同的值。在下一章中，我们将研究交换链，以及如何使用交换链展示图像。
