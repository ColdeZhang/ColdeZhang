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

### #3 窗口表面和交换链

我们还需要创建一个窗口来呈现渲染的画面（除非你只需要无屏渲染）。Windows可以使用其原生平台API或[GLFW](http://www.glfw.org/)和[SDL](https://www.libsdl.org/)等库创建，本教程使用GLFW。

要想成功渲染一个窗口还需要两样东西：窗口表面（`VkSurfaceKHR`）和交换链（`VkSwapchainKHR`）。你会发现它们都有一个`KHR`后缀，这意味着这些对象都是Vulkan扩展的一部分。由于Vulkan API是跨平台的，因此需要使用标准的WSI（Window System Interface）（窗口系统接口）扩展来与不同系统平台的窗口管理器交互。表面（Surface）就是一种为了跨平台而做的窗口抽象，通常通过实例化各平台的窗口句柄来得到。例如Windows上的`HWND`。听起来要实现跨平台窗口十分的复杂？不用担心，GLFW库具有内置功能来处理不同平台窗口的具体细节。

交换链是渲染目标的集合。它存在的意义是确保我们当前渲染的图像不同于当前屏幕上的图像，用于确保渲染图像的完整性。当我们想渲染一帧时，必须从交换链获取要渲染的图像。这一帧被渲染完成后，图像会重新返回到交换链中，以等待显示到屏幕上。交换链中的渲染目标以及显示到屏幕的时机取决于显示模式。目前常见的模式是双缓冲（vsync）（垂直同步）和三缓冲。我们将在创建交换链章节中详细解释这些内容。

一些平台不需要通过`VK_KHR_display`和`VK_KHR_display_swapchain`扩展或任何窗口管理器直接渲染到显示器。例如，可以创建一个全屏幕的表面，实现自定义的的窗口管理器。

### #4 图像视图和帧缓冲

要绘制从交换链获得的图像，我们必须将其包装成[`VkImageView`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkImageView.html)（图像视图）和[`VkFramebuffer`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkFramebuffer.html)（帧缓冲）。图像视图可以引用要使用的图像的特定部分，帧缓冲引用图像视图作为颜色、深度和模板目标。由于交换链中可能有很多不同的图像，可以预先每个图像都创建一个图像视图和帧缓冲，在绘制时使用对应的即可。

### #5 渲染流程

Vulkan中的渲染流程描述了渲染操作中使用的图像类型，图像的使用方式，以及图像的内容应该如何处理。在三角形渲染绘制中，我们将告诉Vulkan，使用单个图像作为颜色目标，绘制操作之前将其清除为纯色。渲染流程仅描述图像类型，图像绑定是通过[`VkFramebuffer`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkFramebuffer.html)完成的。

### #6 图形管线

Vulkan中的图形管线是通过创建[`VkPipeline`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPipeline.html)对象来设置的。图形管线描述了显卡的可配置状态，例如视口大小和深度缓冲区操作以及使用[`VkShaderModule`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkShaderModule.html)对象的可编程状态。[`VkShaderModule`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkShaderModule.html)对象是从着色器字节码创建的。通过引用渲染流程来指定渲染目标，让驱动程序知道管线中需要使用哪些渲染目标。

与现有API相比，Vulkan最不同的地方之一是图形管线的几乎所有配置都需要提前设置。这意味着，如果需要切换着色器或更改顶点布局，需要完全重新创建整个图形管线。为了提高效率，我们必须提前为渲染操作所需的所有不同组合创建出所有我们需要用到的[`VkPipeline`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPipeline.html)（管线）对象（只有一些基本配置才能动态更改，如视口大小和清除颜色。图形管线的所有状态也需要显式地描述，例如，没有默认的颜色混合状态）。这样就相当于预编译而不是实时编译，因此驱动程序有更多的优化机会。运行时性能也加更稳定，因为切换图形管道等大动作都是已经提前准备好的。

### #7 指令池和指令缓冲

如前所述，Vulkan中执行的大多数操作（如绘图操作），需要提交到队列中。操作在提交之前，首先需要记录在[`VkCommandBuffer`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkCommandBuffer.html)（指令缓冲）中。指令缓冲是从关联了特定队列族的[`VkCommandPool`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkCommandPool.html)分配的。要绘制一个简单的三角形，我们需要向指令缓冲写入以下内容：

- 开始渲染流程

- 绑定图形管线

- 绘制3个顶点

- 结束渲染流程

由于帧缓冲区中的图像取决于从交换链中获取的图像，因此我们需要为每个图像都准备一个指令缓冲，然后在绘制时直接使用对应的指令缓冲。另一种选择是在每帧渲染时都重新写入一次命令缓冲区，当然这样会比较低效。

### #8 主循环

将指令包装进指令缓冲后，最后一步是最简单的主循环。 首先使用`vkAcquireNextImageKHR`从交换链中获取一张图片。然后为图片选择合适的指令，使用 [`vkQueueSubmit`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkQueueSubmit.html)将指令缓冲提交到队列（Queue）中。最后，使用 `vkQueuePresentKHR`将图像返回交换链等待将其显示到屏幕上。

被提交到队列的指令是异步执行的。因此，我们必须使用信号量等方法来保证数据同步，确保正确的执行顺序。绘制指令的执行必须在获取图像之后，否则我们可能会出现读写冲突。`vkQueuePresentKHR`也需要在绘制之后执行，为此，我们将在渲染完成后发出第二次信号量。

### 总结

以上说明应该让你基本了解绘制一个三角形所需的工作。在实际开发中，还有更多的事要做，例如分配顶点缓冲区、创建统一（Uniform）缓冲区和上传纹理图像，具体内容我们将在后面的章节讲到，现在先从简单的开始，因为Vulkan的学习曲线十分陡峭。

> 请注意，我们现在会采取将顶点坐标写在顶点着色器中这种取巧的办法，而没有使用顶点缓冲。这是因为管理顶点缓冲首先需要熟悉命令缓冲。

简单来说，绘制一个三角形需要如下步骤：

- 创建一个 [`VkInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html)（实例）
- 选择合适的[`VkPhysicalDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html)（物理显卡设备）
- 创建 [`VkDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDevice.html) （逻辑设备）和 [`VkQueue`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkQueue.html) （队列）用来绘制与显示
- 创建窗口、窗口表面还有交换链
- 将交换链中的图像包装为 [`VkImageView`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkImageView.html)
- 创建一个有指定渲染目标和使用方式的渲染流程
- 为渲染流程创建帧缓冲
- 设置图形管线
- 为每一个交换链图像分配所需的指令缓冲
- 从交换链获取图像进行绘制，提交图像的指令缓冲，将图像返回交换链

即便简化了看起来仍然很复杂，但其实每一步在接下来的将章节中都很简单。如果在后面的章节中对细节的存在价值感到不解，后退一步，回头来看看本章。



## API相关概念

本章最后将简要概述Vulkan API的一些底层结构。

### 编码约定

所有Vulkan函数、枚举和结构体都定义在`vulkan.h`头文件中，该头文件包含在LunarG开发的[Vulkan SDK](https://lunarg.com/vulkan-sdk/)中。下一章节会介绍如何安装SDK。

小写`vk`前缀的代表函数，大写`Vk`前缀的代表枚举和结构体等类型，枚举内的值一般是`VK_`前缀。API大量使用结构体作为函数的参数。例如，创建对象一半是如下的流程：

```c++
VkXXXCreateInfo createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_XXX_CREATE_INFO;
createInfo.pNext = nullptr;
createInfo.foo = ...;
createInfo.bar = ...;

VkXXX object;
if (vkCreateXXX(&createInfo, nullptr, &object) != VK_SUCCESS) {
    std::cerr << "failed to create object" << std::endl;
    return false;
}
```

Vulkan中的许多结构体需要通过`sType`指定结构类型。`pNext`成员可以指向另一个扩展结构，在本教程中将始终为`nullptr`。创建或销毁对象的函数都有一个[`VkAllocationCallbacks`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkAllocationCallbacks.html)参数，可以用于自定义内存分配器，该参数也将在本教程中也始终为`nullptr`。

几乎所有函数都返回[`VkResult`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkResult.html)类型的值代表函数的执行情况，即`VK_SUCCESS`代表执行成功或一个错误代码。规范文档描述了每个函数可能返回的错误代码及其含义。

### 校验层

前面提到过，Vulkan被设计成高性能、低开销的API，因此其自身的错误检查以及调试功能非常有限。如果程序出现了问题往往会直接崩溃而不是抛出错误代码，甚至可能在某些显卡上正常工作，但是完全无法运行在别的设备上。

Vulkan设计了一种叫做校验层（*validation layers*）的机制用于调试程序检查错误。验证层是一些被插入在API和图形驱动程序之间的代码片段，用于对函数参数进行额外检查和跟踪内存管理等问题。这种设计精妙在，可以在开发时启用校验层，而在编译发型版时完全禁用校验层避免额外的性能开销。我们可以自由设计自己校验层，但我们在本教程中将按照LunarG的Vulkan SDK提供的一套校验层设计标准进行。同时，还需要注册回调函数用于处理从校验层中输出的错误信息。

由于Vulkan中每一步都需要手动设置，并且校验层几乎覆盖了所有步骤，因此与OpenGL和Direct3D相比，实际上更容易处理异常！

在真正开始开发前，只剩了最后一件事——配置开发环境。