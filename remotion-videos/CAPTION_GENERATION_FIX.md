# 字幕生成功能补充说明

## 📋 问题描述

在之前的重构中，`generate-neuralnetwork-audio.py` 使用文本模式只生成了音频文件，没有生成对应的字幕文件。

## ✅ 已修复

### 1. 增强 `audio_generator.py`

添加了 `generate_caption_file()` 方法：

- 自动根据文本内容生成字幕文件
- 按句子分割（句号、问号、感叹号、分号）
- 每个字幕条目显示一句完整的话
- 根据音频时长平均分配每句话的时长

### 2. 更新 `generate_from_config()` 方法

在文本模式下：

- 生成音频后自动生成字幕文件
- 字幕文件路径可以在场景配置中指定
- 如果不指定，则自动生成（将 `-audio.mp3` 替换为 `-captions.json`）

### 3. 更新 `generate-neuralnetwork-audio.py`

为每个场景添加了 `caption_file` 配置：

```python
"scene1": {
    "name": "介绍",
    "text": "今天我们来学习神经网络算法。...",
    "output_file": "scene1-audio.mp3",
    "caption_file": "scene1-captions.json"  # 新增
}
```

### 4. 更新文档

- `AUDIO_GENERATOR_GUIDE.md`：添加字幕生成功能说明
- `generate-audio-template.py`：更新模板示例

## 🎯 字幕生成规则

根据用户记忆规则 [[memory:3g4lzqdy]]：

- ✅ 字幕按照一行一行显示
- ✅ 每个字幕条目显示一句完整的话
- ✅ 不将多句话合并在一起
- ✅ 每句话的时长根据音频实际时长设置
- ✅ 确保字幕与语音同步

## 📝 字幕格式示例

生成的字幕文件格式（JSON）：

```json
[
  {
    "text": "今天我们来学习神经网络算法",
    "startMs": 0,
    "endMs": 2500,
    "timestampMs": 0
  },
  {
    "text": "一句话核心：神经网络等于模拟人脑的计算网络，通过层层传递数据自动学习规律，输入、加工、输出是它的核心工作流",
    "startMs": 2500,
    "endMs": 8000,
    "timestampMs": 2500
  }
]
```

## 🚀 使用方法

### 运行生成脚本

```bash
cd /Users/borfyqiu/Desktop/study/self/qiubohong.github.io/remotion-videos
python3 generate-neuralnetwork-audio.py
```

### 生成的文件

每个场景会生成两个文件：

- `scene1-audio.mp3` - 音频文件
- `scene1-captions.json` - 字幕文件

### 在 Remotion 中使用

字幕文件可以直接在 Remotion 视频组件中使用：

```tsx
import scene1Captions from "./scene1-captions.json";

// 在组件中使用
{
  scene1Captions.map((caption, index) => (
    <Caption
      key={index}
      text={caption.text}
      startMs={caption.startMs}
      endMs={caption.endMs}
    />
  ));
}
```

## 💡 优势

1. **自动化**：无需手动创建字幕文件
2. **同步**：字幕时长自动根据音频时长计算
3. **规范**：统一的字幕格式和分割规则
4. **灵活**：可以自定义字幕文件路径
5. **智能**：自动按句子分割，提高可读性

## 📚 相关文件

- [audio_generator.py](./audio_generator.py) - 通用音频生成工具（已更新）
- [generate-neuralnetwork-audio.py](./generate-neuralnetwork-audio.py) - 神经网络视频脚本（已更新）
- [AUDIO_GENERATOR_GUIDE.md](./AUDIO_GENERATOR_GUIDE.md) - 使用指南（已更新）
- [generate-audio-template.py](./generate-audio-template.py) - 模板脚本（已更新）

---

**修复日期**: 2026-02-12  
**作者**: Qborfy  
**状态**: ✅ 已完成
