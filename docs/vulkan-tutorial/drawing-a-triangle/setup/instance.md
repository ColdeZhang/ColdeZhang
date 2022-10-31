---
title: 实例化
date: 2022-10-29
sidebar: auto
article: true
---

## 创建实例

首先通过创建一个实例来初始化Vulkan库。实例是你的程序和Vulkan库之间的桥梁，同时告诉驱动程序有关你的程序的一些基本信息。

首先创建一个成员变量用于存储实例：

```c++
private:
	VkInstance instance;
```

现在，我们来创建一个实例化方法。

使用[`VkApplicationInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkApplicationInfo.html)结构体配置关于我们程序的基本信息。从技术上来说这一步不是必须的，但它可能会为驱动程序提供一些有用的信息，以优化我们的应用程序（在某些特殊的情况下需要对驱动配置做出调整）：

```c++
void createInstance() {
    VkApplicationInfo appInfo{};
    appInfo.sType = VK_STRUCTURE_TYPE_APPLICATION_INFO;
    appInfo.pApplicationName = "Hello Triangle";
    appInfo.applicationVersion = VK_MAKE_VERSION(1, 0, 0);
    appInfo.pEngineName = "No Engine";
    appInfo.engineVersion = VK_MAKE_VERSION(1, 0, 0);
    appInfo.apiVersion = VK_API_VERSION_1_0;
}
```

如前所述，Vulkan中的许多结构需要通过指定成员变量`sType`的值来设定其类型。与其他结构体一样，这里的`VkApplicationInfo`也具有`pNext`成员变量，通过成员变量`pNext`可以指向其他的的扩展信息。此处不设置其值，使其默认（为`nullptr`）。

Vulkan中的许多信息是通过结构体而不是函数参数传递的，为创建实例提供足够的信息我们必须再填写一个结构体。下一个结构体是必须的，它告诉Vulkan驱动程序我们想要使用哪些全局扩展（global extensions）和验证层（validation layers ）。这里的全局意味着它们适用于整个程序，而不是特定的设备。



::: tips 什么是全局扩展和验证层？

随着教程的深入会在后面讲解，现在不用太纠结于概念问题。

:::



```c++
VkInstanceCreateInfo createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO;
createInfo.pApplicationInfo = &appInfo;
```

`sType` 和`pApplicationInfo`很好理解。接下来的变量需要为其指定所需的全局扩展。如概述一章所述，Vulkan是一个平台不可知的API，这意味着您需要一个扩展来与系统交互。GLFW有一个方便的内置函数，可以返回它所需的扩展，我们可以传递给结构：

```c++
uint32_t glfwExtensionCount = 0;
const char** glfwExtensions;

glfwExtensions = glfwGetRequiredInstanceExtensions(&glfwExtensionCount);

createInfo.enabledExtensionCount = glfwExtensionCount;
createInfo.ppEnabledExtensionNames = glfwExtensions;
```

结构的最后两个成员决定了要启用的全局验证层。我们将在下一章中更深入地讨论这些，所以暂时把这些留空。

```c++
createInfo.enabledLayerCount = 0;
createInfo.ppEnabledLayerNames = nullptr;
```

我们现在已经拥有了Vulkan创建实例所需的一切，我们终于可以调用[`vkCreateInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html)进行创建：

```c++
VkResult result = vkCreateInstance(&createInfo, nullptr, &instance);
```

Vulkan中对象创建函数`vkCreateInstance`的参数含义如下：

- 创建信息结构体的指针

- 自定义分配器回调函数的指针（在本教程中始终为空）

- 用于接收实例化出来的实例对象指针

如果一切顺利，那么实例的句柄将存储在VkInstance类成员中。几乎所有Vulkan函数都返回VkResult类型的值，该值要么是VK_SUCCESS，要么是错误代码。要检查实例是否成功创建，我们不需要存储结果，只需使用检查成功值即可：

```c++
if (vkCreateInstance(&createInfo, nullptr, &instance) != VK_SUCCESS) {
    throw std::runtime_error("failed to create instance!");
}
```

现在运行程序，并确保成功创建实例。

## VK_ERROR_INCOMPATIBLE_DRIVER (-9)错误：

如果在MacOS平台使用最新的MoltenVK sdk，您可能会收到从`vkCreateInstance`返回的`VK_ERROR_INCOMPATIBLE_DRIVER`（错误代码-9）。根据[入门笔记](https://vulkan.lunarg.com/doc/sdk/1.3.216.0/mac/getting_started.html)。从Vulkan SDK 1.3.216开始，必须要安装`VK_KHR_PORTABILITY_subset`扩展。

要克服此错误，请首先将`VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR`信息位添加到`VkInstanceCreateInfo`结构的`flags`中，然后将`VK_KHR_PORTABILITY_ENUMERATION_EXTENSION_NAME`添加到实例启用的扩展列表中。

改动如下：

```c++
...

std::vector<const char*> requiredExtensions;

for(uint32_t i = 0; i < glfwExtensionCount; i++) {
    requiredExtensions.emplace_back(glfwExtensions[i]);
}

requiredExtensions.emplace_back(VK_KHR_PORTABILITY_ENUMERATION_EXTENSION_NAME)

createInfo.flags |= VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR;

createInfo.enabledExtensionCount = (uint32_t) requiredExtensions.size();
createInfo.ppEnabledExtensionNames = requiredExtensions.data();

if (vkCreateInstance(&createInfo, nullptr, &instance) != VK_SUCCESS) {
    throw std::runtime_error("failed to create instance!");
}
```

