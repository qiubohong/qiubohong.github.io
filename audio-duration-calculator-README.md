# Audio Duration Calculator Skill

这是一个用于计算音频文件时长的 CodeBuddy Skill，特别适合视频编辑工作流程。

## 功能特性

- 📊 计算音频文件时长（秒）
- 🎬 转换为视频帧数（支持自定义 FPS）
- ⏱️ 格式化时间显示（HH:MM:SS.mmm）
- 🎯 自动计算缓冲帧数（原始帧数 + 30 帧）
- 🎵 支持多种音频格式（MP3, WAV, M4A, AAC, FLAC, OGG 等）

## 安装要求

### 1. Python 依赖

```bash
pip install pydub
```

### 2. 系统依赖（ffmpeg）

- **macOS**: `brew install ffmpeg`
- **Ubuntu/Debian**: `sudo apt-get install ffmpeg`
- **Windows**: 从 https://ffmpeg.org/ 下载安装

## 使用方法

### 基本用法

```bash
# 获取音频时长（秒）
python scripts/get_audio_duration.py path/to/audio.mp3
```

输出示例：

```
文件: audio.mp3
时长: 8.69 秒
```

### 计算视频帧数

```bash
# 使用默认 30fps
python scripts/get_audio_duration.py path/to/audio.mp3 --frames

# 使用自定义 FPS（如 60fps）
python scripts/get_audio_duration.py path/to/audio.mp3 --frames --fps 60
```

输出示例：

```
文件: audio.mp3
时长: 8.69 秒
帧数: 260 帧 (@ 30 fps)
建议缓冲帧数: 290 帧 (原始帧数 + 30帧缓冲)
```

### 格式化时间显示

```bash
python scripts/get_audio_duration.py path/to/audio.mp3 --format
```

输出示例：

```
文件: audio.mp3
时长: 8.69 秒
格式化时长: 00:08.688
```

### 组合使用

```bash
python scripts/get_audio_duration.py path/to/audio.mp3 --frames --fps 30 --format
```

## 实际应用场景

### 1. Remotion 视频编辑

在创建 Remotion 视频时，需要为每个场景计算准确的帧数：

```typescript
// 使用脚本计算音频时长和帧数
// python scripts/get_audio_duration.py scene1-audio.mp3 --frames --fps 30
// 输出: 260 帧 + 30 缓冲 = 290 帧

<TransitionSeries.Sequence durationInFrames={290}>
  <Scene1 />
  <Html5Audio src={staticFile("scene1-audio.mp3")} />
</TransitionSeries.Sequence>
```

### 2. 批量处理多个音频文件

```bash
# 处理目录中的所有 MP3 文件
for file in audio/*.mp3; do
    echo "处理: $file"
    python scripts/get_audio_duration.py "$file" --frames --fps 30
    echo "---"
done
```

### 3. 字幕时间轴计算

```bash
# 获取精确的时间格式用于字幕同步
python scripts/get_audio_duration.py narration.mp3 --format
```

## 测试示例

使用你的项目中的音频文件测试：

```bash
python scripts/get_audio_duration.py \
  remotion-videos/public/RNNVideo/scene1-intro-audio.mp3 \
  --frames --fps 30 --format
```

## 文件结构

```
audio-duration-calculator/
├── SKILL.md                          # Skill 说明文档
└── scripts/
    └── get_audio_duration.py         # 音频时长计算脚本
```

## 技术细节

脚本提供了三个核心函数：

1. **get_audio_duration(file_path)**: 返回音频时长（秒）
2. **seconds_to_frames(seconds, fps)**: 将秒数转换为帧数
3. **format_time(seconds)**: 格式化时间为 HH:MM:SS.mmm

## 支持的音频格式

通过 ffmpeg 支持所有常见音频格式：

- MP3
- WAV
- M4A
- AAC
- FLAC
- OGG
- 以及其他 ffmpeg 支持的格式

## 故障排除

### 错误：找不到 ffmpeg

确保已安装 ffmpeg：

```bash
# 检查 ffmpeg 是否安装
ffmpeg -version

# macOS 安装
brew install ffmpeg

# Ubuntu/Debian 安装
sudo apt-get install ffmpeg
```

### 错误：ModuleNotFoundError: No module named 'pydub'

安装 pydub：

```bash
pip install pydub
```

## 许可证

此 skill 遵循 MIT 许可证。
