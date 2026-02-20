# CNN 视频音频生成 - 快速开始

## 🚀 快速开始（3 步完成）

### 第 1 步：检查环境

```bash
# 确保在正确的目录
cd /Users/borfyqiu/Desktop/study/self/qiubohong.github.io/remotion-videos/public/CNNVideo

# 检查Python版本（需要3.8+）
python3 --version

# 检查字幕文件是否存在
ls -la scene*-captions.json
```

### 第 2 步：运行脚本

```bash
python3 generate_audio.py
```

### 第 3 步：预览视频

```bash
cd ../..
npm start
```

在浏览器中选择 `CNNVideo` 进行预览。

## 📋 预期输出

### 成功运行示例

```
============================================================
CNN视频 - Qwen3-TTS音频生成工具
============================================================
🤖 使用Qwen3-TTS模型生成高质量语音解说
🎯 统一使用温柔女生角色，语音风格一致
📝 自动读取字幕JSON文件，生成对应音频
============================================================

🔍 检查Qwen3-TTS依赖包...
✓ torch
✓ transformers
✓ accelerate
✓ qwen_tts
✓ soundfile
✓ librosa
✓ numpy
✓ tqdm
✅ 所有必需依赖包已安装
🎮 GPU可用: NVIDIA GeForce RTX 3090

🔍 检查字幕文件...
✓ scene1: scene1-captions.json
✓ scene2: scene2-captions.json
✓ scene3: scene3-captions.json
✓ scene4: scene4-captions.json
✓ scene5: scene5-captions.json
✓ scene6: scene6-captions.json
✅ 所有字幕文件检查通过

🎵 开始处理CNN视频音频...
🤖 使用Qwen3-TTS模型生成高质量语音
🎯 优化参数：严格控制音频时长和语音质量

📝 处理场景: scene1 - 介绍
🎤 生成新音频...
   文本: 今天我们来学习卷积网络CNN，一句话核心：CNN等于模拟人类视觉系统...
🔧 加载Qwen3-TTS模型...
✅ Qwen3-TTS模型加载完成
🔄 尝试生成语音 (第1次)...
📊 音频时长: 14.23秒
✓ 音频后处理完成: scene1-audio.mp3
✓ 生成音频: scene1-audio.mp3
✅ 场景音频生成完成: scene1-audio.mp3
🔄 更新字幕时间戳...
✓ 字幕时间戳已更新: scene1-captions.json

... (其他场景类似) ...

📊 处理结果:
   总场景数: 6
   成功处理: 6/6
   使用已存在音频: 0
   新生成音频: 6
   字幕更新成功: 6/6
   失败: 0

🎉 所有场景处理完成！
📁 音频文件位置: ./
🎬 现在可以运行 'npm start' 预览视频效果

🎯 使用说明:
1. 运行 'npm start' 预览视频效果
2. 运行 'npm run render -- CNNVideo' 渲染最终视频
3. 音频文件位置: public/CNNVideo/
```

## 🎯 生成的文件

运行成功后，会生成以下音频文件：

```
public/CNNVideo/
├── scene1-audio.mp3  ✅ 介绍（约14秒）
├── scene2-audio.mp3  ✅ 定义（约20秒）
├── scene3-audio.mp3  ✅ 对比（约25秒）
├── scene4-audio.mp3  ✅ 三层功能（约30秒）
├── scene5-audio.mp3  ✅ 实际应用（约25秒）
└── scene6-audio.mp3  ✅ 冷知识（约20秒）
```

## ⚡ 常见问题

### Q1: 缺少依赖包怎么办？

```bash
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
```

### Q2: 模型文件在哪里？

需要下载 Qwen3-TTS 模型，放在：

```
../../Qwen3-TTS-12Hz-1.7B-Base
```

### Q3: 参考音频在哪里？

需要准备参考音频文件：

```
../../borfy.mp3
```

### Q4: 如何重新生成某个场景的音频？

删除对应的音频文件，然后重新运行脚本：

```bash
rm scene1-audio.mp3
python3 generate_audio.py
```

### Q5: 音频时长不匹配怎么办？

脚本会自动更新字幕时间戳。如果还有问题，可以：

1. 删除音频文件重新生成
2. 手动调整字幕 JSON 文件中的时间戳

## 🎬 下一步

### 预览视频

```bash
cd /Users/borfyqiu/Desktop/study/self/qiubohong.github.io/remotion-videos
npm start
```

### 渲染视频

```bash
npm run render -- CNNVideo
```

### 调整视频帧数

如果音频时长与视频不匹配，需要更新 `src/CNNVideo.tsx` 中的帧数：

```tsx
// 场景1: 介绍 - 14秒 = 420帧 (14 * 30fps)
<TransitionSeries.Sequence durationInFrames={420}>
```

## 📚 更多信息

详细文档请查看：[README.md](./README.md)

---

**快速开始指南** | 更新于 2026-02-15
