# 通用音频生成工具使用指南

## 📚 概述

`audio_generator.py` 是一个通用的视频音频生成工具，支持两种模式：

- **文本模式**：直接从配置的文本生成音频
- **字幕模式**：从字幕 JSON 文件读取文本生成音频，并自动更新时间戳

## 🚀 快速开始

### 1. 文本模式示例

适用于直接提供文本内容的场景（如神经网络视频）：

```python
#!/usr/bin/env python3
from audio_generator import AudioGenerator, AudioGeneratorConfig, check_dependencies
import sys

# 场景配置
SCENES = {
    "scene1": {
        "name": "介绍",
        "text": "今天我们来学习...",
        "output_file": "scene1-audio.mp3"
    },
    "scene2": {
        "name": "定义",
        "text": "什么是...",
        "output_file": "scene2-audio.mp3"
    }
}

def main():
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)

    # 创建配置
    config = AudioGeneratorConfig(
        video_name="MyVideo",
        output_dir="public/MyVideo",
        model_path="./Qwen3-TTS-12Hz-1.7B-Base",
        reference_audio="./borfy.mp3",
        mode="text"  # 文本模式
    )

    # 创建生成器并生成音频
    generator = AudioGenerator(config)
    success_count, skipped_count, failed_count = generator.generate_from_config(SCENES)

    # 输出结果
    print(f"成功: {success_count}, 跳过: {skipped_count}, 失败: {failed_count}")

if __name__ == "__main__":
    main()
```

### 2. 字幕模式示例

适用于已有字幕文件的场景（如无监督学习视频、强化学习视频）：

```python
#!/usr/bin/env python3
from audio_generator import AudioGenerator, AudioGeneratorConfig, check_dependencies
import sys

# 场景配置
SCENES = {
    "scene1": {
        "name": "介绍",
        "caption_file": "scene1-captions.json",  # 字幕文件路径
        "output_file": "scene1-audio.mp3"
    },
    "scene2": {
        "name": "定义",
        "caption_file": "scene2-captions.json",
        "output_file": "scene2-audio.mp3"
    }
}

def main():
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)

    # 创建配置
    config = AudioGeneratorConfig(
        video_name="MyVideo",
        output_dir="public/MyVideo",
        model_path="./Qwen3-TTS-12Hz-1.7B-Base",
        reference_audio="./borfy.mp3",
        mode="caption"  # 字幕模式
    )

    # 创建生成器并生成音频
    generator = AudioGenerator(config)
    success_count, skipped_count, failed_count = generator.generate_from_config(SCENES)

    # 输出结果
    print(f"成功: {success_count}, 跳过: {skipped_count}, 失败: {failed_count}")

if __name__ == "__main__":
    main()
```

### 3. 兼容旧接口

如果需要兼容旧的 `generate_audio_with_captions` 函数：

```python
from audio_generator import generate_audio_with_captions

# 生成单个音频和字幕
success = generate_audio_with_captions(
    text="今天我们来学习...",
    audio_output_path="public/scene1-audio.mp3",
    caption_output_path="public/scene1-captions.json",
    reference_audio="./borfy.mp3",
    speed=1.0
)
```

## 📋 配置说明

### AudioGeneratorConfig 参数

| 参数              | 类型 | 说明                              | 默认值                                |
| ----------------- | ---- | --------------------------------- | ------------------------------------- |
| `video_name`      | str  | 视频名称                          | 必填                                  |
| `output_dir`      | str  | 输出目录                          | 必填                                  |
| `model_path`      | str  | TTS 模型路径                      | `"./Qwen3-TTS-12Hz-1.7B-Base"`        |
| `reference_audio` | str  | 参考音频路径                      | `"./borfy.mp3"`                       |
| `reference_text`  | str  | 参考文本                          | `"5分钟 AI，每天搞懂一个知识点！..."` |
| `mode`            | str  | 生成模式：`"text"` 或 `"caption"` | `"text"`                              |

### 场景配置格式

#### 文本模式

```python
{
    "scene_id": {
        "name": "场景名称",
        "text": "文本内容",
        "output_file": "输出文件名.mp3",
        "caption_file": "字幕文件名.json"  # 可选，不指定则自动生成
    }
}
```

#### 字幕模式

```python
{
    "scene_id": {
        "name": "场景名称",
        "caption_file": "字幕文件路径.json",
        "output_file": "输出文件名.mp3"
    }
}
```

## 🎯 功能特点

### 1. 智能跳过已存在的音频

- 自动检测已存在的音频文件
- 读取音频时长并更新字幕时间戳
- 避免重复生成，节省时间

### 2. 音频质量优化

- 音量标准化到-3dB
- 低通滤波提高清晰度
- 自动裁剪过长音频（最大 30 秒）

### 3. 字幕自动生成和同步

- **文本模式**：自动根据文本生成字幕文件，按句子分割（句号、问号、感叹号、分号）
- **字幕模式**：自动根据音频时长更新字幕时间戳
- 支持不同的字幕格式（`startMs/endMs` 或 `start/end`）
- 智能判断是否需要更新（差异<10%则跳过）
- **字幕规则**：按照一行一行显示，每个字幕条目显示一句完整的话

### 4. 重试机制

- 自动重试失败的任务（最多 3 次）
- 每次重试间隔 2 秒
- 提高生成成功率

### 5. 进度显示

- 使用 tqdm 显示进度条
- 详细的日志输出
- 清晰的成功/失败统计

## 📂 项目结构

```
remotion-videos/
├── audio_generator.py                    # 通用音频生成工具
├── generate-neuralnetwork-audio.py       # 神经网络视频（文本模式）
├── tts_unsupervised.py                   # 无监督学习视频（字幕模式，旧版）
├── public/
│   ├── ReinforcementLearningVideo/
│   │   └── generate_audio.py             # 强化学习视频（字幕模式，旧版）
│   ├── NeuralNetworkVideo/
│   │   ├── scene1-audio.mp3
│   │   └── ...
│   └── UnsupervisedLearningVideo/
│       ├── scene1-audio.mp3
│       ├── scene1-captions.json
│       └── ...
└── Qwen3-TTS-12Hz-1.7B-Base/             # TTS模型
```

## 🔄 迁移指南

### 从 tts.py 迁移

**旧代码：**

```python
SCENE_SCRIPTS = {
    "scene1-intro": "文本内容...",
}

generate_all_scene_audios()
```

**新代码：**

```python
from audio_generator import AudioGenerator, AudioGeneratorConfig

SCENES = {
    "scene1": {
        "name": "介绍",
        "text": "文本内容...",
        "output_file": "scene1-intro.mp3"
    }
}

config = AudioGeneratorConfig(
    video_name="MyVideo",
    output_dir="public",
    mode="text"
)
generator = AudioGenerator(config)
generator.generate_from_config(SCENES)
```

### 从 tts_unsupervised.py 迁移

**旧代码：**

```python
SCENE_CONFIG = {
    "scene1": {
        "name": "介绍",
        "caption_file": "public/MyVideo/scene1-captions.json",
        "output_file": "public/MyVideo/scene1-audio.mp3"
    }
}

generate_all_scene_audios()
```

**新代码：**

```python
from audio_generator import AudioGenerator, AudioGeneratorConfig

SCENES = {
    "scene1": {
        "name": "介绍",
        "caption_file": "scene1-captions.json",  # 相对路径
        "output_file": "scene1-audio.mp3"
    }
}

config = AudioGeneratorConfig(
    video_name="MyVideo",
    output_dir="public/MyVideo",  # 统一的输出目录
    mode="caption"
)
generator = AudioGenerator(config)
generator.generate_from_config(SCENES)
```

## 💡 最佳实践

1. **使用相对路径**：在场景配置中使用相对路径，由 `output_dir` 统一管理
2. **检查依赖**：在 main 函数开始时调用 `check_dependencies()`
3. **错误处理**：检查返回的 `failed_count`，及时处理失败的场景
4. **复用模型**：多次生成时，模型会自动复用，无需重复加载
5. **字幕格式**：确保字幕 JSON 格式正确，包含 `text` 字段

## 🐛 常见问题

### Q: 音频生成失败怎么办？

A: 检查以下几点：

- 模型路径是否正确
- 参考音频文件是否存在
- 文本内容是否过长（建议<200 字符）
- 磁盘空间是否充足

### Q: 字幕时间戳不同步？

A: 工具会自动更新字幕时间戳，如果仍不同步：

- 检查字幕 JSON 格式是否正确
- 确认音频文件已正确生成
- 查看日志中的缩放比例信息

### Q: 如何自定义语音参数？

A: 修改 `AudioGenerator.generate_tts_audio()` 方法中的参数：

- `temperature`: 控制随机性（0.1-1.0）
- `top_k`: 采样范围（5-50）
- `top_p`: 采样概率（0.5-0.95）

## 📚 参考资料

- [Qwen3-TTS 文档](https://github.com/QwenLM/Qwen-TTS)
- [Remotion 文档](https://www.remotion.dev/)
- [项目 README](./README.md)

---

**作者**: Qborfy  
**更新日期**: 2026-02-12
