# 无监督学习视频 - 音频生成快速指南

## 🚀 快速开始（3步完成）

### 步骤1：安装依赖

```bash
cd remotion-videos
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
```

### 步骤2：下载模型（首次使用）

```bash
# 下载 Qwen3-TTS 模型到项目根目录
git lfs install
git clone https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base
```

### 步骤3：生成音频

```bash
python3 tts_unsupervised.py
```

就这么简单！脚本会自动：
- ✅ 读取所有8个场景的字幕文件
- ✅ 生成对应的音频文件
- ✅ 保存到 `public/UnsupervisedLearningVideo/` 目录

## 📁 生成的文件

```
public/UnsupervisedLearningVideo/
├── scene1-audio.mp3  # 介绍 (约6秒)
├── scene2-audio.mp3  # 定义 (约8秒)
├── scene3-audio.mp3  # 三种方法 (约6秒)
├── scene4-audio.mp3  # 聚类详解 (约10秒)
├── scene5-audio.mp3  # 降维详解 (约10秒)
├── scene6-audio.mp3  # 关联详解 (约10秒)
├── scene7-audio.mp3  # 动手实验 (约8秒)
└── scene8-audio.mp3  # 实际案例 (约8秒)
```

## 🎬 预览视频

```bash
npm start
# 访问 http://localhost:3001
```

## 🎥 渲染视频

```bash
npm run build:unsupervised
# 输出：out/unsupervised-learning.mp4
```

## ⚙️ 配置说明

### 字幕文件位置

字幕JSON文件应在：`public/UnsupervisedLearningVideo/scene[1-8]-captions.json`

### 音频输出位置

音频MP3文件将保存到：`public/UnsupervisedLearningVideo/scene[1-8]-audio.mp3`

### 参考音频（可选）

如果想使用自定义音色，准备一个参考音频文件 `borfy.mp3` 放在项目根目录。

## 🔧 常见问题

### Q: 模型下载太慢怎么办？

A: 使用国内镜像：
```bash
export HF_ENDPOINT=https://hf-mirror.com
git clone https://hf-mirror.com/Qwen/Qwen3-TTS-12Hz-1.7B-Base
```

### Q: GPU内存不足？

A: 修改脚本使用CPU：
```python
# 在 tts_unsupervised.py 中修改
model_kwargs = {
    "device_map": "cpu",  # 改为CPU
    "torch_dtype": torch.float32,
}
```

### Q: 音频质量不好？

A: 调整生成参数：
- 降低 `temperature`（当前0.3）
- 增加 `repetition_penalty`（当前1.5）
- 使用更好的参考音频

### Q: 只想生成某个场景的音频？

A: 修改脚本中的 `SCENE_CONFIG`，注释掉不需要的场景。

## 📚 详细文档

- [完整音频生成指南](./AUDIO_GENERATION_UNSUPERVISED.md)
- [字幕使用说明](./CAPTIONS_UNSUPERVISED.md)
- [视频快速开始](./QUICKSTART_UNSUPERVISED.md)

## 💡 提示

- 首次运行需要下载模型（约3GB），请耐心等待
- GPU加速可显著提升生成速度（约快10倍）
- 生成的音频已自动优化音量和清晰度
- 视频文件已配置好音频引用，无需手动修改

## 🎉 完成！

音频生成完成后，直接运行 `npm start` 预览带音频的视频效果！
