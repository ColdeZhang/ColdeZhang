---
title: 物理设备和队列族
date: 2022-11-11
article: false
---

## 选择一个物理设备

在通过 [`VkInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html) 加载了 Vulkan 库之后，我们需要选择一块支持我们所需特性的物理设备（显卡）。Vulkan 允许我们使用任何数量的显卡设备并且同时使用它们，在教程中我们只需要使用第一个符合我们需要的显卡设备。

首先我们新建一个 `pickPhysicalDevice` 方法，并在 `initVulkan` 中调用：

```c++
void initVulkan() {
    createInstance();
    setupDebugMessenger();
    pickPhysicalDevice();
}

void pickPhysicalDevice() {

}
```

创建一个 [`VkPhysicalDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html) 成员变量用于存储我们需要使用的物理显卡设备，该对象会在[`VkInstance`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html) 被销毁（回收）时自动被清理，因此我们不需要在 `cleanup` 中手动处理它：

```c++
VkPhysicalDevice physicalDevice = VK_NULL_HANDLE;
```

获取可用的显卡列表和获取可用的扩展列表操作相同，都是先获取可用的列表数量，再用一个相同数量的空列表去接收内容：

```c++
uint32_t deviceCount = 0;
vkEnumeratePhysicalDevices(instance, &deviceCount, nullptr);
```

如果没有可用的显卡设备，则没有必要继续去尝试获取列表：

```c++
if (deviceCount == 0) {
    throw std::runtime_error("failed to find GPUs with Vulkan support!");
}
```

在有显卡设备的情况下我们创建一个 [`VkPhysicalDevice`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html) 数组来接收显卡列表：

```c++
std::vector<VkPhysicalDevice> devices(deviceCount);
vkEnumeratePhysicalDevices(instance, &deviceCount, devices.data());
```

接下来我们需要检查这些显卡设备列表中哪些是可用的，因为并不是所有显卡都能支持我们需要的特性。创建一个新的函数：

```c++
bool isDeviceSuitable(VkPhysicalDevice device) {
    return true;
}
```

遍历所有的显卡列表，并使用第一个满足我们要求的设备：

```c++
for (const auto& device : devices) {
    if (isDeviceSuitable(device)) {
        physicalDevice = device;
        break;
    }
}

if (physicalDevice == VK_NULL_HANDLE) {
    throw std::runtime_error("failed to find a suitable GPU!");
}
```

下一小节会对 `isDeviceSuitable`需要检查的工作作具体说明，随着我们使用的显卡功能越复杂，这一检查需要做的工作也会越来越多。

## 设备基本检查

为了评估设备的适用性，我们需要获取更多的设备信息。可以使用[`vkGetPhysicalDeviceProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetPhysicalDeviceProperties.html)查询基本设备属性，如名称、类型和支持的Vulkan版本。

```c++
VkPhysicalDeviceProperties deviceProperties;
vkGetPhysicalDeviceProperties(device, &deviceProperties);
```

可以使用[`vkGetPhysicalDeviceFeatures`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetPhysicalDeviceFeatures.html)查询显卡是否支持纹理压缩、64位浮点和多视口渲染（对VR有用）等可选功能：

```c++
VkPhysicalDeviceFeatures deviceFeatures;
vkGetPhysicalDeviceFeatures(device, &deviceFeatures);
```

还有更多的详细信息，我们将在稍后讨论如何获取设备内存和队列族（请参阅下一节）。

现在假设我们的应用程序只能运行在支持几何着色器（geometry shaders）的显卡上，那么 `isDeviceSuitable`函数的内容如下：

```c++
bool isDeviceSuitable(VkPhysicalDevice device) {
    VkPhysicalDeviceProperties deviceProperties;
    VkPhysicalDeviceFeatures deviceFeatures;
    vkGetPhysicalDeviceProperties(device, &deviceProperties);
    vkGetPhysicalDeviceFeatures(device, &deviceFeatures);

    return deviceProperties.deviceType == VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU &&
           deviceFeatures.geometryShader;
}
```

除了只检查设备是否合适并选择第一台设备，我们还可以给每个显卡设备按照功能设置权重并选择权重最高的设备。这样，可以根据权重进行优先选择。例如：

```c++
#include <map>

...

void pickPhysicalDevice() {
    ...

    // 利用有序键值对的自动排序特性 按权重升序排列设备
    std::multimap<int, VkPhysicalDevice> candidates;

    for (const auto& device : devices) {
        int score = rateDeviceSuitability(device);
        candidates.insert(std::make_pair(score, device));
    }

    // 检查最高权重分的显卡设备是否真的符合要求
    if (candidates.rbegin()->first > 0) {
        physicalDevice = candidates.rbegin()->second;
    } else {
        throw std::runtime_error("failed to find a suitable GPU!");
    }
}

int rateDeviceSuitability(VkPhysicalDevice device) {
    ...

    int score = 0;

    // 如果是独立显卡则+1000权重 独立显卡往往具有更高的性能表现
    if (deviceProperties.deviceType == VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU) {
        score += 1000;
    }

    // 按照支持的最大纹理大小为其加权重（更大的纹理大小支持意味着更好的画面）
    score += deviceProperties.limits.maxImageDimension2D;

    // 如果没有几何着色器则权重直接清零
    if (!deviceFeatures.geometryShader) {
        return 0;
    }

    return score;
}
```

对于教程来说这些都不是必须的，但以上内容展示了如何**设计设备选择流程**。当然，另一种方案是将显卡设备的名字在应用内列出来，让用户自己去手动选择。

因为我们才刚刚开始，我们仅需要使用Vulkan支持，因此任何GPU都能满足我们的要求：

```c++
bool isDeviceSuitable(VkPhysicalDevice device) {
    return true;
}
```

在下一节中，我们将讨论第一个真正需要检查的功能。

## 队列族

就像之前提到的，Vulkan的几乎每个操作，从绘图到加载纹理，都需要先将命令提交到队列再执行。不同类型的队列来自不同的队列家族，每个队列家族只允许提交特定的一类命令的子集。例如，一个只允许处理计算命令的队列族，或是一个只允许内存传输相关命令的队列族。

我们需要检查设备支持哪些队列族，以及其中哪一个支持我们想要使用的命令。为此，我们将添加一个新函数`findQueueFamilies`，查找支持图形命令的队列族。

```c++
uint32_t findQueueFamilies(VkPhysicalDevice device) {
    
}
```

因为在下一章节中我们会需要用到另一个队列，因此我们在这里就先做好准备工作。将需要检查的队列族索引打包成一个结构体，方便后期扩充：

```c++
struct QueueFamilyIndices {
    uint32_t graphicsFamily;
};

QueueFamilyIndices findQueueFamilies(VkPhysicalDevice device) {
    QueueFamilyIndices indices;
    // Logic to find queue family indices to populate struct with
    return indices;
}
```

> 译者注：结构体存储的是队列族索引而不是队列族本身，因为设备中的每个队列族都有一个唯一索引，因此只需要保存索引即可。

但是，如果队列族不可用呢？我们可以在`findQueueFamilies`中抛出一个异常，但我们不会在这里根据这个异常决定此设备是否可用。例如有可能出现这样的情况，我们可能更想要使用某种具有专用传输队列族的设备，但是我们并不会用到这个队列族。因此，我们别的某种方法来指示是否找到了特定的队列族。

实际上我们没办法使用值来指示队列族是否存在，因为uint32_t的任何值理论上都可能是有效的队列族索引，包括0。幸运的是，C++17引入了一个数据结构来区分有或不存在值的情况：

```c++
#include <optional>

...
std::optional<uint32_t> graphicsFamily;
std::cout << std::boolalpha << graphicsFamily.has_value() << std::endl; // false
graphicsFamily = 0;
std::cout << std::boolalpha << graphicsFamily.has_value() << std::endl; // true
```

`std::optional`是一个包装器，在您为其分配内容之前不包含任何值。在任何时候，您都可以通过调用其`has_value()`成员函数来查询它是否包含值。这意味着我们可以将结构体更改为：

```c++
#include <optional>

struct QueueFamilyIndices {
    std::optional<uint32_t> graphicsFamily;
};
```

现在我们来实现 `findQueueFamilies`方法：

```c++
QueueFamilyIndices findQueueFamilies(VkPhysicalDevice device) {
    QueueFamilyIndices indices;

    ...

    return indices;
}
```

使用[`vkGetPhysicalDeviceQueueFamilyProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetPhysicalDeviceQueueFamilyProperties.html)函数获取设备拥有的的队列族列表，流程与先前获取物理显卡设备列表还有扩展列表一样：

```c++
uint32_t queueFamilyCount = 0;
vkGetPhysicalDeviceQueueFamilyProperties(device, &queueFamilyCount, nullptr);

std::vector<VkQueueFamilyProperties> queueFamilies(queueFamilyCount);
vkGetPhysicalDeviceQueueFamilyProperties(device, &queueFamilyCount, queueFamilies.data());
```

`VkQueueFamilyProperties`结构包含有关队列族的一些详细信息，包括支持的操作类型和可以根据该系列创建的队列数量。我们需要找到至少一个支持`VK_QUEUE_GRAPHICS_BIT`（图形队列）的队列族。

```
int i = 0;
for (const auto& queueFamily : queueFamilies) {
    if (queueFamily.queueFlags & VK_QUEUE_GRAPHICS_BIT) {
        indices.graphicsFamily = i;
    }

    i++;
}
```

现在我们有了这个队列族查找函数，我们可以在`isDeviceSuitable`函数中调用他，以确保设备可以处理我们想要使用的命令：

```c++
bool isDeviceSuitable(VkPhysicalDevice device) {
    QueueFamilyIndices indices = findQueueFamilies(device);

    return indices.graphicsFamily.has_value();
}
```

为了便捷，我们将检查移动到结构体内部：

```c++
struct QueueFamilyIndices {
    std::optional<uint32_t> graphicsFamily;

    bool isComplete() {
        return graphicsFamily.has_value();
    }
};

...

bool isDeviceSuitable(VkPhysicalDevice device) {
    QueueFamilyIndices indices = findQueueFamilies(device);

    return indices.isComplete();
}
```

或者在更提前的地方处理实现这个检查：

```c++
for (const auto& queueFamily : queueFamilies) {
    ...

    if (indices.isComplete()) {
        break;
    }

    i++;
}
```

太好了，这就是我们现在找到合适的物理设备所需要的一切！下一步是创建一个逻辑设备。

> [截止于此的所有代码示例](https://vulkan-tutorial.com/code/03_physical_device_selection.cpp)
