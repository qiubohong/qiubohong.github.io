# 损失函数视频音频生成工具

快速为损失函数视频生成所有音频文件的 Python 脚本。

## 🚀 快速开始

### 1. 安装依赖

```bash
pip3 install edge-tts
```

### 2. 生成音频

```bash
python3 generate_loss_function_audio.py
```

### 3. 查看可用语音

```bash
python3 generate_loss_function_audio.py --list-voices
```

## 📁 生成的文件

- `public/LossFunctionVideo/scene1-audio.mp3` - 介绍（约 15 秒）
- `public/LossFunctionVideo/scene2-audio.mp3` - 定义（约 20 秒）
- `public/LossFunctionVideo/scene3-audio.mp3` - 分类（约 15 秒）
- `public/LossFunctionVideo/scene4-audio.mp3` - 函数前 3 个（约 20 秒）
- `public/LossFunctionVideo/scene5-audio.mp3` - 函数后 2 个（约 12 秒）
- `public/LossFunctionVideo/scene6-audio.mp3` - 黄金准则（约 15 秒）
- `public/LossFunctionVideo/scene7-audio.mp3` - 冷知识（约 20 秒）
- `public/scene8-ending.mp3` - 结尾（约 6 秒）

## ⚙️ 自定义配置

编辑脚本中的以下变量：

```python
VOICE = "zh-CN-YunyangNeural"  # 语音类型
RATE = "+0%"                    # 语速（-50% 到 +100%）
PITCH = "+0Hz"                  # 音调（-50Hz 到 +50Hz）
```

## 📚 详细文档

查看 [LOSS_FUNCTION_AUDIO_GUIDE.md](./LOSS_FUNCTION_AUDIO_GUIDE.md) 获取完整使用指南。

## ⏭️ 下一步

1. 检查生成的音频质量
2. 根据实际音频时长调整字幕时间轴
3. 运行 `npm run dev` 预览视频
4. 运行 `npx remotion render LossFunctionVideo out/loss-function.mp4` 渲染视频

---

**提示**：字幕文件已生成在 `public/LossFunctionVideo/` 目录下，可能需要根据实际音频时长微调时间戳。
