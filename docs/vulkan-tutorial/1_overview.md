---
title: 概览
date: 2022-11-12
article: false
---

本章将首先介绍Vulkan及其设计的初衷。之后，我们将看看画一个三角形需要哪些步骤。这将给你一个总体的认识以便于后面每一小章节的的学习。最后，我们将介绍Vulkan API的结构和一般使用模式。

## Vulkan的起源

与以往的图形API一样，Vulkan被设计为[GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit)上的跨平台抽象API。大多数这些API的问题在于，受它们所处时代的硬件局限性，他们大多只能使用固定功能的渲染管线。程序员必须以特定格式提供顶点数据，并在光照和阴影选项方面受GPU制造商的限制。

随着显卡架构的成熟，它们的可编程性越来越强。所有这些新功能都必须以某种方式与原有的API合并到一起。这导致了不太理想的抽象设计和图形驱动程序方面的大量兼容问题（屎山）。这就是为什么需要经常更新驱动程序来提高游戏中的性能的原因，有时效果显著。另一方面，由于这些驱动程序的复杂性，开发人员还需要关注不同显卡生产商之间的差异，例如[着色器](https://en.wikipedia.org/wiki/Shader)语法的差异。除了这些新功能外，过去十年随着移动设备的兴起。这些移动GPU因为其能效和空间的原因，因此具有了另一些不同的架构。例如[基于图块的渲染](https://en.wikipedia.org/wiki/Tiled_rendering)，通过让=给予程序员更多地控制权限，从而提高性能。受限于当时的CPU设计，这些API诞生时代的另一个局限因素就是糟糕的多线程支持。

因为没有历史包袱，Vulkan可以从零开始为现代图形架构设计API。它允许程序员使用更详细具体的API，从而减少了驱动程序开销，并允许使用多线程并行创建和提交命令。通过标准化字节代码，减少了着色器编译产生的不一致。同时，它通过将图形和计算功能统一到一个API中，充分发挥出现代显卡的通用处理能力。

## 画一个三角形需要的步骤

我们现在将概述在一个完整的Vulkan程序中绘制出三角形所需的步骤。我们会在随后的章节中详细介绍每个细节。此处只是为了给你一个大概的整体认识，便于将各个部分联系起来理解。

### #1 实例和物理设备的选择

所有的Vulkan应用程序都需要先通过[`VkInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html)（Vulkan实例）设置Vulkan API。通过对你的应用程序的描述和需要使用的API扩展来创建实例。创建实例后，检测Vulkan支持的硬件，并选择一个或多个想要使用的[`VkPhysicalDevices`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html)（物理设备）。例如，根据各个设备的VRAM大小或设备功能等属性来选择所需的设备。

### #2 逻辑设备和队列族

选择要使用的物理设备后，还需要使用[`VkPhysicalDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDeviceFeatures.html)来指定更详细的信息（例如多窗口渲染和64位浮点支持），以创建一个[`VkDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDevice.html)（逻辑设备）。接着还需要指定要使用的队列族。Vulkan执行的大多数操作（如绘制命令和内存操作）都是通过将它们提交到[`VkQueue`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkQueue.html)（队列）来异步执行的。队列根据队列族分配，每个队列族支持一组特定操作。例如，图形、计算和内存传输操作分别由不同的队列族支持。因此我们也可以根据显卡对不同队列族的支持来选择显卡。支持Vulkan的设备也可能不提供任何图形功能（专用于某些领域的计算卡），但一般来说所有支持Vulkan的显卡都会支持我们希望使用的队列操作。

### #3 窗口和交换链



### #4 图像视图和帧缓冲



### #5 渲染步骤



### #6 图形管线



### #7 指令池和指令缓冲



### #8 主循环



### #9 总结



## API相关概念

### 编码约定



### 校验层