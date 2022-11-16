---
title: 逻辑设备和队列
date: 2022-11-14
article: false
---

## 简单介绍

在选择好物理设备后还需要根据物理设备设置一个用于交互的*逻辑设备*。逻辑设备的创建步骤和实例的创建步骤类似，都需要指定希望使用的特征。因为我们先前已经检查了有哪些队列族可用，因此我们还需要选择要创建的队列。如果有多种不同的用处，还可以根据一个物理设备创建多个逻辑设备。

首先创建一个成员变量用于存储逻辑设备：

```c++
VkDevice device;
```

接下来添加 `createLogicalDevice` 函数，并在 `initVulkan`中调用：

```c++
void initVulkan() {
    createInstance();
    setupDebugMessenger();
    pickPhysicalDevice();
    createLogicalDevice();
}

void createLogicalDevice() {

}
```

## 配置要创建的队列

创建逻辑设备需要配置创建信息结构体的需要值，首先是 [`VkDeviceQueueCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDeviceQueueCreateInfo.html)（队列创建信息）。这个结构体描述了我们希望通过一个队列族创建多少队列。现在我们只需要一个具有图形能力的队列即可。

```c++
QueueFamilyIndices indices = findQueueFamilies(physicalDevice);

VkDeviceQueueCreateInfo queueCreateInfo{};
queueCreateInfo.sType = VK_STRUCTURE_TYPE_DEVICE_QUEUE_CREATE_INFO;
queueCreateInfo.queueFamilyIndex = indices.graphicsFamily.value();
queueCreateInfo.queueCount = 1;
```

目前驱动程序只允许我们用每个队列族创建很少数量的队列，并且通常我们也不需要每个队列族有一个以上的队列。因为我们可以在多个线程创建指令缓冲，然后一次性提交到主线程以降低性能开销。

我们还需要给队列配置一个0.0～1.0的优先度，以便于控制指令缓冲的执行顺序。即便只有一个队列，也需要配置：

```c++
float queuePriority = 1.0f;
queueCreateInfo.pQueuePriorities = &queuePriority;
```

## 配置要使用的设备特征

下一个要设置的信息是我们希望使用的设备功能集合。这些是我们上一章中使用[`vkGetPhysicalDeviceFeatures`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetPhysicalDeviceFeatures.html)检查的内容，例如几何着色器。现在我们不需要任何特性，所以我们可以简单地定义一下，这样它的默认值都是`VK_FALSE`。当我们需要使用Vulkan程序做更有意思的事情的时候，我们会回过头来研究这里。

```c++
VkPhysicalDeviceFeatures deviceFeatures{};
```

## 创建逻辑设备

接下来使用前两小节创建的结构体来填充， [`VkDeviceCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDeviceCreateInfo.html)结构体。

```c++
VkDeviceCreateInfo createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;
```

首先填充队列信息结构体（`queueCreateInfo`）和设备特征结构体（`deviceFeatures`）的指针：

```c++
createInfo.pQueueCreateInfos = &queueCreateInfo;
createInfo.queueCreateInfoCount = 1;

createInfo.pEnabledFeatures = &deviceFeatures;
```

其余信息与[`VkInstanceCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstanceCreateInfo.html)结构相似，要求指定扩展和校验层。注意，这些是基于设备的扩展与校验层。

我们使用`VK_KHR_swapchain`作为设备扩展的例子，这个扩展的作用是将渲染好的图像显从设备展示到窗口上。某些Vulkan设备（显卡）可能只可以用来执行计算操作，不具备这项功能，因此没有这个扩展。我们将在交换链章节具体讲解这个扩展。

在之前的旧版Vulkan中，实例和设备的校验层是不同的两样东西（需要分别设置），但在新版中它们可以[共用校验层](https://www.khronos.org/registry/vulkan/specs/1.3-extensions/html/chap40.html#extendingvulkan-layers-devicelayerdeprecation)。这意味着[`VkDeviceCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDeviceCreateInfo.html)中的 `enabledLayerCount`和`ppEnabledLayerNames`字段在编译时会被（上上章节中配置的校验层）直接覆盖。不管怎么说，遵照旧的规定对他们进行设置以兼容旧版有益无害：

```c++
createInfo.enabledExtensionCount = 0;

if (enableValidationLayers) {
    createInfo.enabledLayerCount = static_cast<uint32_t>(validationLayers.size());
    createInfo.ppEnabledLayerNames = validationLayers.data();
} else {
    createInfo.enabledLayerCount = 0;
}
```

此处只配置兼容旧版的校验层扩展，我们现在暂时不需要别的一些设备扩展。

接下来我们只需要调用[`vkCreateDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateDevice.html)函数将逻辑设备创建出来：

```c++
if (vkCreateDevice(physicalDevice, &createInfo, nullptr, &device) != VK_SUCCESS) {
    throw std::runtime_error("failed to create logical device!");
}
```

从前向后参数依次是要用于创建的物理设备、我们刚刚设置的队列和设备特征、可选的内存分配回调指针和用于存储逻辑设备的指针。与实例创建函数类似，如果尝试去启用一个不存在的扩展则会返回相应的错误码。

最后，别忘记在 `cleanup`中调用 [`vkDestroyDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyDevice.html) 清除创建的设备：

```c++
void cleanup() {
    vkDestroyDevice(device, nullptr);
    ...
}
```

逻辑设备因为并不与实例交互，因此创建逻辑设备时不需要使用实例作为参数。

## 获取队列句柄

队列随着逻辑设备的创建而自动创建，我们只需要获取队列句柄即可。首先新建一个成员变量用于存储图形队列句柄。

```c++
VkQueue graphicsQueue;
```

当然，队列也会随着设备的清理被自动清理，因此我们也不需要在 `cleanup`中手动清理。

使用[`vkGetDeviceQueue`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetDeviceQueue.html)函数获取每个队列族的队列句柄。参数依次是逻辑设备、队列族、队列索引和用于存储队列句柄的变量的指针。因为我们只创建了一个队列，所以我们取索引为`0`的队列。

```c++
vkGetDeviceQueue(device, indices.graphicsFamily.value(), 0, &graphicsQueue);
```

有了逻辑设备和队列句柄，我们可以开始吩咐显卡干活儿了！在接下来的几章中，我们将配置资源来渲染一些东西。

> [截止于此的所有代码示例](https://vulkan-tutorial.com/code/04_logical_device.cpp)

