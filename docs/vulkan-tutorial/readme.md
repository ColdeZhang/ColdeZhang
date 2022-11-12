---
title: Vulkan 教程
date: 2022-11-01
categories:
 - 学习笔记
tags:
 - Vulkan
 - Graphics
article: true
---

Vulkan 官方教程 -  翻译

<!-- more -->

## 关于

本教程将教您使用[Vulkan](https://www.khronos.org/vulkan/)图形和计算API的基础知识。Vulkan是[Khronos公司](https://www.khronos.org/)（以OpenGL闻名）的新API，可以更好地抽象现代显卡。这个新接口允许您更好地描述应用程序对显卡的操作，与[OpenGL](https://en.wikipedia.org/wiki/OpenGL)和[Direct3D](https://en.wikipedia.org/wiki/Direct3D)等现有API相比，这可以带来更好的性能和不那么令人惊讶的驱动程序行为。Vulkan背后的想法与[Direct3D 12](https://en.wikipedia.org/wiki/Direct3D#Direct3D_12)和[Metal](https://en.wikipedia.org/wiki/Metal_(API))的想法相似，但Vulkan具有完全跨平台的优势，允许您同时为Windows、Linux和Android等平台开发应用程序。

然而，您为这些好处付出的代价是，必须使用更冗长的API。与图形API相关的每个细节都需要手动管理，包括帧缓冲区的创建和缓冲区纹理图像等对象的内存管理。图形驱动程序不会在这方便做太多事情，这意味着您必须在应用程序中做更多工作，以确保正确运行。

丑话说在前面，Vulkan并不适合所有人。它的受众是那些热衷于高性能计算机图形并愿意投入一些精力的程序员。如果您对游戏开发而不是计算机图形更感兴趣，那么您可能希望坚持使用OpenGL或Direct3D。另一种选择是使用[虚幻引擎](https://en.wikipedia.org/wiki/Unreal_Engine#Unreal_Engine_4)或[Unity](https://en.wikipedia.org/wiki/Unity_(game_engine))等引擎，该引擎将能够使用Vulkan，同时向您暴露更高级别的API。

因此，让我们先介绍一下学习本教程的一些先决条件：

- 与Vulkan（[NVIDIA](https://developer.nvidia.com/vulkan-driver)、[AMD](http://www.amd.com/en-us/innovations/software-technologies/technologies-gaming/vulkan)、[Intel](https://software.intel.com/en-us/blogs/2016/03/14/new-intel-vulkan-beta-1540204404-graphics-driver-for-windows-78110-1540)、[Apple Silicon（或Apple M1）](https://www.phoronix.com/scan.php?page=news_item&px=Apple-Silicon-Vulkan-MoltenVK)）兼容的显卡和驱动程序
- C++经验（熟悉RAII，列表容器初始化）
- 一个支持C++17功能的编译器（Visual Studio 2017+、GCC 7+或Clang 5+）
- 有一定3D计算机图形学的知识

本教程不需要有OpenGL或Direct3D基础，但它确实需要您了解3D计算机图形学的基础知识。例如，在教程中不会解释透视投影背后的数学概念。这里推荐一本有关计算机图形学的书籍，请参阅这本[在线书籍](https://paroj.github.io/gltut/)。其他也有一些很棒的计算机图形学资源：

- [一周学习光线追踪](https://github.com/RayTracing/raytracing.github.io)

- [基于物理的渲染](http://www.pbr-book.org/)

- Vulkan在开源引擎[Quake](https://github.com/Novum/vkQuake)和[DOOM3](https://github.com/DustinHLand/vkDOOM3)中的实战应用

如果您愿意，您可以使用C而不是C++，但您必须使用不同的线性代数库，并且自己梳理代码的结构。我们将使用C++中的类和RAII等功能来组织逻辑和资源生命周期。本教程还有一个可供Rust开发人员使用的[替代版本](https://github.com/bwasty/vulkan-tutorial-rs)。

为了使使用其他编程语言的开发人员更容易理解，并获得一些使用基本API的经验，我们将使用原始的C API来包装Vulkan功能。但是，如果您使用的是C++，您可能更喜欢使用较新的[Vulkan-Hpp](https://github.com/KhronosGroup/Vulkan-Hpp)绑定，这些绑定可以省去一些麻烦的工作，并有助于防止某些类的错误。

## 教程结构

我们将首先概述Vulkan的工作原理，以及我们在屏幕上绘制一个三角形必须要完成的工作。在您了解了它们在整个过程中中的基本角色后，所有小步骤的目的将更加有意义。接下来，我们将使用[**Vulkan SDK**](https://lunarg.com/vulkan-sdk/)、用于线性代数运算的[**GLM库**](http://glm.g-truc.net/)和用于窗口创建的[**GLFW**](http://www.glfw.org/)设置开发环境。本教程将介绍如何使用Visual Studio在Windows上设置这些，以及使用GCC在Ubuntu Linux上设置这些。

之后，我们将实现渲染第一个三角形所需的Vulkan程序的所有基本组件。每章大致遵循以下结构：

- 介绍新概念及其目的

- 相关API的使用方法并将其集成到您的程序中

- 封装辅助函数

虽然每一章都具有前后文关联，但也可以将这些章节作为介绍特定Vulkan功能的独立文章阅读。这意味着其可以作为参考书目。所有Vulkan函数和类型都添加了官方文档的超链接，因此您可以单击它们以了解更多信息。Vulkan是一个非常新的API，因此规范本身可能存在一些缺陷。欢迎读者向[Khronos的GitHub仓库](https://github.com/Overv/VulkanTutorial)提交反馈。

如前所述，Vulkan API可让您最大程度地控制图形硬件，是一个相当复杂的API。这导致创建纹理等基本操作每次都必须重复采取许多步骤。因此，我们将在整个教程中对其进行封装。

每章还将在末尾给出完整的代码链接。如果您对现有的代码有什么疑惑或是正在遇到了棘手的问题，您可以参考它。所有代码都已在多个供应商的显卡上通过了运行测试。

Vulkan仍然是一个非常新的API，目前还没有最好的实践示例。如果您对本教程有什么建议，请随时向[GitHub仓库](https://github.com/Overv/VulkanTutorial)提交问题或拉取请求。您可以关注本教程仓库，以收到最新的版本更新。

在您完成在屏幕上使用Vulkan成功绘制出第一个三角形后，我们将开始扩展程序，引入线性转换、纹理和3D模型。

如果您以前接触过图形API，那么您应该知道，在屏幕上显示第一个几何形状之前，可能需要做很多准备工作。在Vulkan中这些步骤显得尤其复杂，但其实每个单独的步骤都并不复杂，并且不会感到多余。请记住，一旦你成功画出了个看起来很无聊的三角形，绘制全纹理的3D模型便不再需要那么多额外的工作，因此每一步都是有回报的。

如果您在阅读教程时遇到任何问题，请首先查看FAQ部分，看看里面是否包含了您的问题及其解决方案。如果您仍然无法解决问题，请随时在相关章节的评论部分寻求帮助。

准备好深入了解高性能图形API的未来了吗？我们开始吧！
