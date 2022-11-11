---
title: 校验层
date: 2022-10-26
article: false
---

## 什么是校验层？

Vulkan API 的设计是紧紧围绕最小化驱动程序开销进行的，所以，默认情况下，Vulkan API 提供的错误检查功能非常有限。很多很基本的错误 都没有被 Vulkan API 显式地处理，遇到错误程序会直接崩溃或者发生未被明确定义的行为（即Segmentation fault）。Vulkan 需要我们显式地定义每一个操作，所以就很容易在使用过程中产生一些小错误，比如使用了一个新的GPU特性，却忘记在逻辑设备创建时请求这一特性。

然而，这并不意味着我们不能将错误检查加入API调用。Vulkan 引入了校验层来优雅地解决这个问题。校验层是一个可选的可以用来在 Vulkan API 函数调用上进行附加操作的组件。校验层常被用来做下面的工作：

- 检查参数值是否合法
- 追踪对象的创建和清除操作，发现资源泄漏问题
- 追踪发起调用的线程，检测是否线程安全
- 将API调用和相应的参数写入日志
- 追踪API调用进行分析和回放

下面是一个展示校验层使用的例子：

```c++
VkResult vkCreateInstance(
    const VkInstanceCreateInfo* pCreateInfo,
    const VkAllocationCallbacks* pAllocator,
    VkInstance* instance) {

    if (pCreateInfo == nullptr || instance == nullptr) {
        log("Null pointer passed to required parameter!");
        return VK_ERROR_INITIALIZATION_FAILED;
    }

    return real_vkCreateInstance(pCreateInfo, pAllocator, instance);
}
```

读者可以利用校验层自由得添加任何调试功能。我们可以在开发时使用校验层，然后在发布应用程序时，禁用校验层来提高程序的运行表现。

Vulkan库本身并没有提供任何内建的校验层，但 LunarG 的 Vulkan SDK 供了一个非常不错的校验层实现。它们也是完全[开源](https://github.com/KhronosGroup/Vulkan-ValidationLayers)的，因此您可以检查这些校验层帮你查出了什么错误。读者可以使用这个校验层实现来保证自己的应用程序在不同的驱动程序下能够尽可能得表现一致，而不是依赖于某个驱动程序的未定义行为。

只有当系统安装了校验层时才能使用，比如，LunarG 的校验层只可以在 安装了 Vulkan SDK 的 PC 上使用。

Vulkan 可以使用两种不同类型的校验层：实例校验层（instance）和设备校验层（device specific）。 实例校验层只检查和全局 Vulkan 对象相关的调用，比如 Vulkan 实例。设备校验层只检查和特定GPU相关的调用。设备校验层现在已经不推荐使用， 也就是说，应该使用实例校验层来检测所有的 Vulkan 调用。Vulkan 规范文档为了兼容性仍推荐启用设备校验层。在本教程，为了简便，我们为实例和设备指定相同的校验层。

## 使用校验层

在本章节，我们将使用 LunarG 的 Vulkan SDK 提供的校验层。和使用扩展一样，使用校验层需要指定校验层的名称。 LunarG 的 Vulkan SDK 允许我们通过`VK_LAYER_KHRONOS_validation`来隐式地开启所有可用的校验层。

首先，让我们添加两个变量到程序中来控制是否启用指定的校验层。 这里，我们通过条件编译来设定是否启用校验层。代码中的`NDEBUG` 是C++标准宏的一部分，表示是否处于非调试模式下：

```c++
const uint32_t WIDTH = 800;
const uint32_t HEIGHT = 600;

// 要使用的校验层名称列表
const std::vector<const char*> validationLayers = {
    "VK_LAYER_KHRONOS_validation"		// 开启所有校验层
};

#ifdef NDEBUG
    const bool enableValidationLayers = false;
#else
    const bool enableValidationLayers = true;
#endif
```

接着我们创建一个函数`checkValidationLayerSupport`用来请求所有可用的校验层。首先创建一个整数并调用一次 [`vkEnumerateInstanceLayerProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceLayerProperties.html)函数获取所有可用的校验层数量。接着再创建一个`VkLayerProperties`数组（用于接收所有的）并在再调用一次 [`vkEnumerateInstanceLayerProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceLayerProperties.html)获取校验层列表。（这与前面使用 [`vkEnumerateInstanceExtensionProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceExtensionProperties.html) 函数获取所有可用的扩展步骤是一致的）

```c++
bool checkValidationLayerSupport() {
    uint32_t layerCount;	// 可用验证层数量
    vkEnumerateInstanceLayerProperties(&layerCount, nullptr);

    std::vector<VkLayerProperties> availableLayers(layerCount);	// 用于存储验证层列表
    vkEnumerateInstanceLayerProperties(&layerCount, availableLayers.data());

    return false;
}
```

接下来对`validationLayers`和`availableLayers`进行遍历检查我们要使用的校验层是否都是可用的（使用`strcmp`需要先引入`<cstring>`头文件）：

```c++
for (const char* layerName : validationLayers) {
    bool layerFound = false;

    for (const auto& layerProperties : availableLayers) {
        if (strcmp(layerName, layerProperties.layerName) == 0) {
            layerFound = true;
            break;
        }
    }

    if (!layerFound) {
        return false;
    }
}

return true;
```

现在，我们可以在`createInstance`函数中调用验证层检查函数：

```c++
void createInstance() {
    if (enableValidationLayers && !checkValidationLayerSupport()) {
        throw std::runtime_error("validation layers requested, but not available!");
    }

    ...
}
```

在编译时使用debug模式，确保没有错误出现。如果运行出现了错误，请检查是否正确安装了 Vulkan SDK。其他错误（如缺少可用的校验层）请检查 LunarG 的 Vulkan SDK 的官方文档。

最后再修改我们创建实例时配置的 [`VkInstanceCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstanceCreateInfo.html) 结构体相关参数，在启用校验层时制定校验层：

```c++
if (enableValidationLayers) {
    createInfo.enabledLayerCount = static_cast<uint32_t>(validationLayers.size());
    createInfo.ppEnabledLayerNames = validationLayers.data();
} else {
    createInfo.enabledLayerCount = 0;
}
```

如果我们刚刚的校验层检查函数正常执行了，那么 [`vkCreateInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html) 就不会返回 `VK_ERROR_LAYER_NOT_PRESENT`错误。

## 回调消息

默认情况下，校验层会在标准输出（控制台）中打印出错误信息，我们也可以通过指定**回调函数**来自定义消息的处理方式。有些错误往往并不是致命的错误，因此我们可以通过这样的方式屏蔽这类消息。如果你对此不感兴趣，你可以选择跳过这一章节。

设置回调信息需要使用 `VK_EXT_debug_utils` 扩展。

我们创建一个 `getRequiredExtensions`函数，根据是否启用校验层来返回所需的扩展列表：

```c++
std::vector<const char*> getRequiredExtensions() {
    uint32_t glfwExtensionCount = 0;
    const char** glfwExtensions;
    glfwExtensions = glfwGetRequiredInstanceExtensions(&glfwExtensionCount);

    std::vector<const char*> extensions(glfwExtensions, glfwExtensions + glfwExtensionCount);

    if (enableValidationLayers) {
        extensions.push_back(VK_EXT_DEBUG_UTILS_EXTENSION_NAME);
    }

    return extensions;
}
```

与前面一样，首先需要获取到 GLFW 扩展，然后根据是否启动了校验层来引入调试信息扩展。代码中使用了一个 `VK_EXT_DEBUG_UTILS_EXTENSION_NAME` 宏，这个宏等价于`VK_EXT_debug_utils`使用宏定义是为了避免拼写错误。

现在在`createInstance`中调用：

```c++
auto extensions = getRequiredExtensions();
createInfo.enabledExtensionCount = static_cast<uint32_t>(extensions.size());
createInfo.ppEnabledExtensionNames = extensions.data();
```

运行程序，确保没有出现 `VK_ERROR_EXTENSION_NOT_PRESENT` 错误。校验层可用意味着校验调试信息扩展是可用的（如果不可用那么在检查校验层时就会出错），因此不用额外对校验调试信息扩展做可用性检查。

现在让我们来看看调试信息回调函数长什么样子。我们在程序中添加一个以 `PFN_vkDebugUtilsMessengerCallbackEXT` 为原形的 `debugCallback`静态函数。使用 `VKAPI_ATTR` 和 `VKAPI_CALL`作为函数定义，确保他能被Vulkan库调用。

```c++
static VKAPI_ATTR VkBool32 VKAPI_CALL debugCallback(
    VkDebugUtilsMessageSeverityFlagBitsEXT messageSeverity,
    VkDebugUtilsMessageTypeFlagsEXT messageType,
    const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData,
    void* pUserData) {

    std::cerr << "validation layer: " << pCallbackData->pMessage << std::endl;

    return VK_FALSE;
}
```

函数的第一个参数指定了消息级别，可以有如下值：

- `VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT`：诊断信息
- `VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT`：资源创建类信息
- `VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT`：警告信息
- `VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT`：不合法或可能因此程序崩溃的操作信息

这些值的规则设计允许用户使用比较运算符来进行级别过滤，比如：

```c++
if (messageSeverity >= VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT) {
    // 只输出警告及以上等级的信息
}
```

第二个参数 `messageType` 可以是以下值：

- `VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT`：一些与规范性或性能无关的事件
- `VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT`：违反规范（可能导致错误）的事件
- `VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT`：可能影响 Vulkan 性能的行为

第三个参数 `pCallbackData` 是一个指向 `VkDebugUtilsMessengerCallbackDataEXT`的结构体指针，其包含了以下成员变量：

- `pMessage`：一个以null结尾的包含调试信息的字符串
- `pObjects`：存储有和消息相关的 Vulkan 对象句柄的数组
- `objectCount`：数组对象的个数

最后一个参数 `pUserData` 是一个指向了我们设置回调函数时，传递的数据指针。

回调函数返回了一个布尔值，用来表示引发校验层处理的 Vulkan API 调用是否被中断。如果返回值为true，对应 Vulkan API 调用就会返回 `VK_ERROR_VALIDATION_FAILED_EXT` 错误代码。通常，只在测试校验层本身时会返回true，其余情况下，回调函数
 应该返回 `VK_FALSE`。

定义完成回调函数后要配置 Vulkan 使用这个回调函数。也许有点令人惊讶的是，在 Vulkan 中即便是调试回调信息也需要手动进行资源的创建与回收。我们需要一个`VkDebugUtilsMessengerEXT`（回调信使）对象来存储回调函数信息，然后将它提交给Vulkan完成回调函数的设置:

```c++
VkDebugUtilsMessengerEXT debugMessenger;
```

> 译者注：此处用于存储回调函数的对象我讲翻译为“信使”，因为译者在中文网络没有找到其他更好的翻译。信使，顾名思义就是将程序内发生的错误按照回调函数的格式“带”出来。

接着在 `initVulkan` 中的 `createInstance`后添加一个`setupDebugMessenger`函数：

```c++
void initVulkan() {
    createInstance();
    setupDebugMessenger();
}

void setupDebugMessenger() {
    if (!enableValidationLayers) return;

}
```

然后我们需要填写`VkDebugUtilsMessengerCreateInfoEXT`（创建信使信息）结构体的所需信息：

```c++
VkDebugUtilsMessengerCreateInfoEXT createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CREATE_INFO_EXT;
createInfo.messageSeverity = VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT;
createInfo.messageType = VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT;
createInfo.pfnUserCallback = debugCallback;
createInfo.pUserData = nullptr; // Optional
```

`messageSeverity`（信息重要性）字段允许您指定您希望回调函数处理的消息等级。在这里，除了`VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT`外指定了所有类型，以接收所有可能的问题信息，同时省略冗长的一般调试信息。

同样，`messageType`字段允许您过滤回调函数的消息类型。在这里我们启用了所有类型。读者可以根据自己的需要开启和禁用处理的消息类型。

最后，`pfnUserCallback`字段是一个指向回调函数的指针。您可以选择将指针传递给`pUserData`字段它是可选的，这个指针所指的地址会被作为回调函数的参数，用来向回调函数传递用户数据。例如，您可以使用它来传递指向`HelloTriangleApplication`类的指针。

有许多方式配置校验层消息和回调，更多信息可以参考扩展的[规范文档](https://www.khronos.org/registry/vulkan/specs/1.3-extensions/html/chap50.html#VK_EXT_debug_utils)。

此结构应传递给`vkCreateDebugUtilsMessengerEXT`函数，以创建`VkDebugUtilsMessengerEXT`信使对象。不幸的是，由于此函数是一个扩展函数，因此它不会自动加载。我们必须使用[`vkGetInstanceProcAddr`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetInstanceProcAddr.html)自己查找其地址。我们将创建自己的代理函数，在后台处理这个问题。我把它添加到`HelloTriangleApplication`类定义的正上方（或者是作为类的静态函数）。

```c++
VkResult CreateDebugUtilsMessengerEXT(VkInstance instance, const VkDebugUtilsMessengerCreateInfoEXT* pCreateInfo, const VkAllocationCallbacks* pAllocator, VkDebugUtilsMessengerEXT* pDebugMessenger) {
    auto func = (PFN_vkCreateDebugUtilsMessengerEXT) vkGetInstanceProcAddr(instance, "vkCreateDebugUtilsMessengerEXT");
    if (func != nullptr) {
        return func(instance, pCreateInfo, pAllocator, pDebugMessenger);
    } else {
        return VK_ERROR_EXTENSION_NOT_PRESENT;
    }
}
```

如果无法加载，[`vkGetInstanceProcAddr`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetInstanceProcAddr.html)函数将返回`nullptr`。如果扩展对象可用，我们现在可以调用此函数来创建扩展对象：

```c++
if (CreateDebugUtilsMessengerEXT(instance, &createInfo, nullptr, &debugMessenger) != VK_SUCCESS) {
    throw std::runtime_error("failed to set up debug messenger!");
}
```

函数的第二个参数是可选的分配器回调函数，我们没有自定义的分配 器，所以将其设置为`nullptr`。由于我们的调试回调是针对特定Vulkan 实例和它的校验层，所以需要在第一个参数指定调试回调作用的Vulkan实例。

最后`VkDebugUtilsMessengerEXT`信使对象需要通过调用`vkDestroyDebugUtilsMessengerEXT`来清理。与`vkCreateDebugUtilsMessengerEXT`类似，这个函数需要手动加载。

```c++
void DestroyDebugUtilsMessengerEXT(VkInstance instance, VkDebugUtilsMessengerEXT debugMessenger, const VkAllocationCallbacks* pAllocator) {
    auto func = (PFN_vkDestroyDebugUtilsMessengerEXT) vkGetInstanceProcAddr(instance, "vkDestroyDebugUtilsMessengerEXT");
    if (func != nullptr) {
        func(instance, debugMessenger, pAllocator);
    }
}
```

请确保这个代理函数需要被定义为静态或者类之外，然后我们在 `cleanup` 中调用：

```c++
void cleanup() {
    if (enableValidationLayers) {
        DestroyDebugUtilsMessengerEXT(instance, debugMessenger, nullptr);
    }

    vkDestroyInstance(instance, nullptr);

    glfwDestroyWindow(window);

    glfwTerminate();
}
```

## 调试实例的创建与销毁

尽管我们现在已经添加了校验层用于调试程序，但是校验层并没有覆盖到所有的部分。因为调试消息的创建依赖于实例，所以他只在实例创建后才能生效，并且他需要在实例销毁前销毁，因此其也无法对实例的销毁进行调试。

但是，如果您仔细阅读[扩展文档](https://github.com/KhronosGroup/Vulkan-Docs/blob/master/appendices/VK_EXT_debug_utils.txt#L120)，您会发现有一种方法可以专门为这两个函数调用创建一个单独的调试消息。您只需将`VkDebugUtilsMessengerCreateInfoEXT`（创建信使信息）结构体的指针传递给[`VkInstanceCreateInfo`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstanceCreateInfo.html)（实例创建信息）结构体的`pNext`字段。首先将创建信使信息结构体的部分从原先的`setupDebugMessenger`（设置信使函数）中分离出来，将信息创建作为一个单独的函数`populateDebugMessengerCreateInfo`：

```c++
void populateDebugMessengerCreateInfo(VkDebugUtilsMessengerCreateInfoEXT& createInfo) {
    createInfo = {};
    createInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CREATE_INFO_EXT;
    createInfo.messageSeverity = VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT;
    createInfo.messageType = VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT | VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT;
    createInfo.pfnUserCallback = debugCallback;
}

...

void setupDebugMessenger() {
    if (!enableValidationLayers) return;

    VkDebugUtilsMessengerCreateInfoEXT createInfo;
    populateDebugMessengerCreateInfo(createInfo);

    if (CreateDebugUtilsMessengerEXT(instance, &createInfo, nullptr, &debugMessenger) != VK_SUCCESS) {
        throw std::runtime_error("failed to set up debug messenger!");
    }
}
```

修改原先 `createInstance` （创建实例）函数内的部分：

```c++
void createInstance() {
    ...

    VkInstanceCreateInfo createInfo{};
    createInfo.sType = VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO;
    createInfo.pApplicationInfo = &appInfo;

    ...

    VkDebugUtilsMessengerCreateInfoEXT debugCreateInfo{};
    if (enableValidationLayers) {
        createInfo.enabledLayerCount = static_cast<uint32_t>(validationLayers.size());
        createInfo.ppEnabledLayerNames = validationLayers.data();

        populateDebugMessengerCreateInfo(debugCreateInfo);
        createInfo.pNext = (VkDebugUtilsMessengerCreateInfoEXT*) &debugCreateInfo;
    } else {
        createInfo.enabledLayerCount = 0;

        createInfo.pNext = nullptr;
    }

    if (vkCreateInstance(&createInfo, nullptr, &instance) != VK_SUCCESS) {
        throw std::runtime_error("failed to create instance!");
    }
}
```

`debugCreateInfo`变量放置在if语句之外，以确保在`vkCreateInstance`调用之前不会被销毁。通过这种方式创建一个额外的调试信使，它将在`vkCreateInstance`和`vkDestroyInstance`期间生效，然后随着实例的销毁自动被清理。

## 测试

如果我们不在 `cleanup` 时调用`DestroyDebugUtilsMessengerEXT`来销毁回调信使，那么你可能会在控制台遇到以下信息：

```
validation layer: Validation Error: [ VUID-vkDestroyInstance-instance-00629 ] Object 0: handle = 0x151044000, type = VK_OBJECT_TYPE_INSTANCE; Object 1: handle = 0xfd5b260000000001, type = VK_OBJECT_TYPE_DEBUG_UTILS_MESSENGER_EXT; | MessageID = 0x8b3d8e18 | OBJ ERROR : For VkInstance 0x151044000[], VkDebugUtilsMessengerEXT 0xfd5b260000000001[] has not been destroyed. The Vulkan spec states: All child objects created using instance must have been destroyed prior to destroying instance (https://vulkan.lunarg.com/doc/view/1.3.231.0/mac/1.3-extensions/vkspec.html#VUID-vkDestroyInstance-instance-00629)
```

## 更多配置

验证层行为的设置比`VkDebugUtilsMessengerCreateInfoEXT`结构中指定的设置要多得多。浏览Vulkan SDK，然后转到Config目录。在那里，您将找到一个`vk_layer_settings.txt`文件，该文件解释了如何配置各个校验层。

要为您自己的应用程序配置校验层设置，请将文件复制到项目的`Debug` 调试和`Release`发布目录，并按照文档中的说明设置所需的参数。但是，在本教程的其余部分，我将假设您使用的是默认设置。

在本教程中，我们将故意犯一些错误，以展示验证层在处理这些问题时的作用。

