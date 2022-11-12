---
title: 实例
date: 2022-10-26
article: false
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



::: tip 什么是全局扩展和验证层？

随着教程的深入会在后面讲解，现在不用太纠结于概念问题。

:::



```c++
VkInstanceCreateInfo createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO;
createInfo.pApplicationInfo = &appInfo;
```

`sType` 和`pApplicationInfo`很好理解。接下来的变量需要为其指定所需的全局扩展。如概述一章所述，Vulkan是一个平台不可知的API，这意味着窗口应用（GLFW）需要一个扩展来使用Vulkan API。GLFW有一个方便的内置函数，可以返回它所需的扩展，我们可以传递给结构：

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

> 译者注：对于MacOS用户而言，安装完sdk后还需要执行安装路径下的`install_vulkan.py`将一些目录添加到系统目录，详情参见[Getting Start Notes](https://vulkan.lunarg.com/doc/sdk/1.3.216.0/mac/getting_started.html)的 *SDK System Paths* 章节。
>
> ![](https://sslbackend.deercloud.site:450/LightPicture/2022/11/187ad181a7bb2d4b.png)

## 检查所有设备支持（可用）的扩展

如果您查看[vkCreateInstance文档](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html)，那么您可能会注意到有一个错误代码为`VK_ERROR_EXTENSION_NOT_PRESENT`。我们可以 利用这个错误代码在扩展不能满足时直接结束我们的程序，这对于像窗口 系统这种必要的扩展来说非常适合。但有时，我们请求的扩展可能是非必 须的，有了很好，没有的话，程序仍然可以运行，这时，我们该怎么做呢?

要在创建实例之前检索受支持的扩展列表，我们可以使用[`vkEnumerateInstanceExtensionProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceExtensionProperties.html)函数。它需要一个整数变量指针用于保存支持的扩展数量，和一个[`VkExtensionProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkExtensionProperties.html)数组来存储扩展的详细信息。它还有一个可选的第一个参数，允许我们按特定的验证层过滤扩展，我们现在将忽略这一点。

要创建一个数组来保存扩展详细信息，我们首先需要知道数组的大小。您可以通过将后一个参数留空来请求扩展的数量：

```c++
uint32_t extensionCount = 0;
vkEnumerateInstanceExtensionProperties(nullptr, &extensionCount, nullptr);
```

现在可以根据支持的扩展数量创建对应大小的数组用于保存扩展详细信息（`include <vector>`）：

```c++
std::vector<VkExtensionProperties> extensions(extensionCount);
```

最后再次调用函数用刚刚创建的数组接收支持的扩展详细信息列表：

```c++
vkEnumerateInstanceExtensionProperties(nullptr, &extensionCount, extensions.data());
```

每个 [`VkExtensionProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkExtensionProperties.html) 结构都包含扩展的名称和版本。我们可以用一个简单的for循环来列出它们（`\t`制表符缩进）：

```c++
std::cout << "available extensions:\n";

for (const auto& extension : extensions) {
    std::cout << '\t' << extension.extensionName << '\n';
}
```

如果您想提供有关Vulkan支持的一些详细信息，您可以将此代码添加到`createInstance`函数中。可以尝试挑战一下，创建一个函数，以检查`glfwGetRequiredInstanceExtensions获取到的扩展是否都包含在设备支持的扩展列表中。

## 收尾工作

在程序退出时应当销毁[`VkInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html)，我们可以使用[`vkDestroyInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyInstance.html)函数：

```c++
void cleanup() {
    vkDestroyInstance(instance, nullptr);

    glfwDestroyWindow(window);

    glfwTerminate();
}
```

[`vkDestroyInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyInstance.html)函数的参数很简单。如上一章所述，Vulkan中的分配和处理位置函数都可以传入一个回调函数，此处暂时不需要使用回调因此传入`nullptr`即可。同样的，在后面的章节中所有创建出来的资源都应当在程序退出时进行回收。

在进行更复杂的操作之前，我们先熟悉一下[校验层](https://vulkan-tutorial.com/Drawing_a_triangle/Setup/Validation_layers)来帮助我们进行应用程序的调试。
