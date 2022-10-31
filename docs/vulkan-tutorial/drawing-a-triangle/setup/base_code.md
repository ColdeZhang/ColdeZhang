---
title: 基础代码 框架
date: 2022-10-26
sidebar: auto
article: true
---

## 通用结构 框架

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

## 资源管理

就像用`malloc`分配的每个内存块都需要被释放`free`一样，当我们不再需要时，我们创建的每个Vulkan对象都需要手动销毁它。在C++中，可以使用`<memory>`头文件中提供的RAII或智能指针实现自动资源管理。然而，在本教程中，我选择了手动实现Vulkan对象的分配和回收。毕竟，Vulkan的利基点（niche）是明确每个操作，以避免错误，因此最好明确对象的生命周期，以了解API的工作原理。

遵循本教程后，您可以根据您的需求使用`std::unique_ptr`或`std::shared_ptr`获取Vulkan对象来实现自动资源管理，或者使用类的构造函数与析构函数实现资源分配与回收。RAII是大型Vulkan程序推荐的模型，但出于学习目的，了解幕后情况总是好的。

Vulkan对象要么直接使用`vkCreateXXX`等函数创建，要么通过另一个具有`vkAllocateXXX`等方法的对象分配。在确保对象不再需要使用后，您需要使用对应的`vkDestroyXXX`或者`vkFreeXXX`销毁它。这些函数的参数通常因不同类型的对象而异，但它们有一个共同参数：`pAllocator`。这是一个可选参数，允许您指定一个自定义的内存分配器回调。此教程没有使用这个参数，我们将在教程中使用`nullptr`作为参数传递，以忽略此参数。

## 使用GLFW

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
