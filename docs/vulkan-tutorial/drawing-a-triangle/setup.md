---
title: 项目基础
date: 2022-10-26
article: false
---

## 基本代码

### 通用结构 框架

在上一章中，您创建了一个具有所有正确配置的Vulkan项目，并使用示例代码进行了测试。在本章中，我们将从头开始使用以下代码：

```c++
#include <vulkan/vulkan.h>

#include <iostream>
#include <stdexcept>
#include <cstdlib>

class HelloTriangleApplication {
public:
    void run() {
        initVulkan();
        mainLoop();
        cleanup();
    }

private:
    void initVulkan() {

    }

    void mainLoop() {

    }

    void cleanup() {

    }
};

int main() {
    HelloTriangleApplication app;

    try {
        app.run();
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
```

首先引入Vulkan SDK头文件，这样我们才可以使用Vulkan提供的函数，结构体等。`stdexcept`和`iostream`用于捕获错误，前者提供了 `EXIT_SUCCESS` `EXIT_FAILURE`等宏定义。

程序本身被包装成一个类，这些函数将在`initVulkan()`方法中进行初始化。一旦一切准备就绪，我们进入`mainLoop()`开始渲染帧。我们将在`mainLoop()`中添加一个主循环用于渲染每一帧的数据，直到关闭窗口。一旦窗口关闭`mainLoop()`返回，我们将在`cleanup()`中回收分配的资源。

如果在执行过程中发生任何类型的致命错误，那么我们将在主函数抛出带有描述性消息的`std::runtime_error`异常，并打印出来。为了处理各种标准异常类型，我们捕获了更通用的`std::exception`。这将有利于我们处理错误与不支持的扩展。

在此章节之后，几乎每个章节都将向`cleanup()`添加一个从`initVulkan()`调用的新函数和一个或多个新的Vulkan对象。

### 资源管理

就像用`malloc`分配的每个内存块都需要被释放`free`一样，当我们不再需要时，我们创建的每个Vulkan对象都需要手动销毁它。在C++中，可以使用`<memory>`头文件中提供的RAII或智能指针实现自动资源管理。然而，在本教程中，我选择了手动实现Vulkan对象的分配和回收。毕竟，Vulkan的利基点（niche）是明确每个操作，以避免错误，因此最好明确对象的生命周期，以了解API的工作原理。

遵循本教程后，您可以根据您的需求使用`std::unique_ptr`或`std::shared_ptr`获取Vulkan对象来实现自动资源管理，或者使用类的构造函数与析构函数实现资源分配与回收。RAII是大型Vulkan程序推荐的模型，但出于学习目的，了解幕后情况总是好的。

Vulkan对象要么直接使用`vkCreateXXX`等函数创建，要么通过另一个具有`vkAllocateXXX`等方法的对象分配。在确保对象不再需要使用后，您需要使用对应的`vkDestroyXXX`或者`vkFreeXXX`销毁它。这些函数的参数通常因不同类型的对象而异，但它们有一个共同参数：`pAllocator`。这是一个可选参数，允许您指定一个自定义的内存分配器回调。此教程没有使用这个参数，我们将在教程中使用`nullptr`作为参数传递，以忽略此参数。

### 使用GLFW

Vulkan在没有窗口的情况下也可以实现渲染，但在窗口中显示出来会很有意思！首先将`#include <vulkan/vulkan.h>`行替换为：

```c++
#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>
```

这样，便引入了GLFW，在GLFW中已经自动加载了Vulkan标头。添加`initWindow()`函数，并在`run()`的最开始调用它。我们将使用该功能初始化GLFW并创建一个窗口。

```c++
void run() {
    initWindow();
    initVulkan();
    mainLoop();
    cleanup();
}

private:
    void initWindow() {

    }
```

首先调用应该是`glfwInit()`，它初始化了GLFW库。由于GLFW最初是用于创建OpenGL上下文的，因此我们需要告诉它不要通过后续调用创建OpenGL上下文：

```c++
glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);	// 禁止创建OpenGL上下文
```

由于调整大小的窗口可能会产生许多问题，我们稍后会研究，因此暂时禁用它：

```c++
glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);	// 禁用窗口大小调整
```

现在剩下的就是创建实际的窗口。添加一个成员变量`GLFWwindow* window;`来存储窗口，并使用以下方式初始化窗口：

```c++
window = glfwCreateWindow(800, 600, "Vulkan", nullptr, nullptr);
```

前三个参数指定了窗口的宽度、高度和标题。第四个参数用于指定在哪个显示器打开窗口，最后一个参数仅与OpenGL相关。

使用常量而不是硬编码的宽度和高度数字是一个好主意，因为我们将来会在很多地方用到这些值。我在`HelloTriangleApplication`类定义上方添加了以下行：

```c++
const uint32_t WIDTH = 800;
const uint32_t HEIGHT = 600;
```

修改创建窗口的代码：

```c++
window = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);
```

`initWindow`现在看起来应该是这样的：

```c++
void initWindow() {
    glfwInit();

    glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

    window = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);
}
```

为了保持应用程序运行，直到发生错误或窗口关闭，我们需要向`mainLoop`函数添加事件循环，如下所示：

```c++
void mainLoop() {
    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }
}
```

这个代码应该相当不言自明。它循环并检查事件，例如按下X按钮，直到窗口被用户关闭。这也是一个循环，我们稍后将调用一个函数来渲染单个帧。

窗口关闭之后，我们需要回收、清理资源。如下：

```c++
void cleanup() {
    glfwDestroyWindow(window);
    glfwTerminate();
}
```

当您现在运行程序时，您应该会看到一个名为Vulkan的窗口出现，直到应用程序通过关闭窗口而终止。

![](https://sslbackend.deercloud.site:450/LightPicture/2022/10/aed2c67ef5550ce4.png)

## 实例化

### 创建实例

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

### VK_ERROR_INCOMPATIBLE_DRIVER (-9)错误：

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

### 检查扩展支持性

如果您查看[vkCreateInstance文档](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html)，那么您可能会注意到有一个错误代码为`VK_ERROR_EXTENSION_NOT_PRESENT`。我们可以简单地指定我们需要的扩展，并在错误代码返回时终止。对于窗口系统界面等基本扩展来说，这是有道理的，但是如果我们想检查可选功能呢？

要在创建实例之前检索受支持的扩展列表，有vkEnumerateInstanceExtensionProperties函数。它需要一个指向存储扩展数量的变量的指针和一个VkExtensionProperties数组来存储扩展的详细信息。它还需要一个可选的第一个参数，允许我们按特定的验证层过滤扩展，我们现在将忽略这一点。

要分配一个数组来保存扩展详细信息，我们首先需要知道有多少。您可以通过将后一个参数留空来请求扩展的数量：
