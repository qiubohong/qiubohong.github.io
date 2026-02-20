# CNN 视频音频生成工具

## 📖 简介

这是一个为 CNN（卷积神经网络）视频自动生成高质量语音解说的工具。使用 Qwen3-TTS 模型，根据字幕 JSON 文件生成对应的音频文件。

## 🎯 功能特点

- ✅ **自动读取字幕**：从 JSON 文件中读取字幕文本，自动合并生成完整解说
- ✅ **智能时长控制**：自动裁剪超过 30 秒的音频，确保与视频同步
- ✅ **语音质量优化**：使用优化的参数配置，提高语音稳定性和清晰度
- ✅ **音频后处理**：音量标准化、低通滤波，提升音频质量
- ✅ **自动更新字幕时间戳**：根据实际音频时长，自动调整字幕时间戳
- ✅ **重试机制**：失败自动重试，提高成功率
- ✅ **增量生成**：已存在的音频文件会被跳过，只生成缺失的音频

## 📋 场景配置

本工具为以下 6 个场景生成音频：

| 场景 ID | 场景名称 | 字幕文件             | 输出文件         |
| ------- | -------- | -------------------- | ---------------- |
| scene1  | 介绍     | scene1-captions.json | scene1-audio.mp3 |
| scene2  | 定义     | scene2-captions.json | scene2-audio.mp3 |
| scene3  | 对比     | scene3-captions.json | scene3-audio.mp3 |
| scene4  | 三层功能 | scene4-captions.json | scene4-audio.mp3 |
| scene5  | 实际应用 | scene5-captions.json | scene5-audio.mp3 |
| scene6  | 冷知识   | scene6-captions.json | scene6-audio.mp3 |

## 🔧 环境要求

### 系统要求

- Python 3.8+
- 推荐使用 GPU（CUDA 支持），CPU 也可运行但速度较慢

### 依赖包

```bash
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
```

### 模型文件

需要下载 Qwen3-TTS 模型，放置在以下路径：

```
../../Qwen3-TTS-12Hz-1.7B-Base
```

### 参考音频

需要准备参考音频文件（用于声音克隆）：

```
../../borfy.mp3
```

## 🚀 使用方法

### 1. 准备字幕文件

确保所有字幕 JSON 文件已创建，格式如下：

```json
[
  {
    "text": "今天我们来学习卷积网络CNN",
    "startMs": 0,
    "endMs": 3000
  },
  {
    "text": "一句话核心：CNN等于模拟人类视觉系统",
    "startMs": 3000,
    "endMs": 7000
  }
]
```

### 2. 运行脚本

```bash
cd /Users/borfyqiu/Desktop/study/self/qiubohong.github.io/remotion-videos/public/CNNVideo
python3 generate_audio.py
```

### 3. 查看结果

脚本会输出详细的处理日志：

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
...

📊 处理结果:
   总场景数: 6
   成功处理: 6/6
   使用已存在音频: 0
   新生成音频: 6
   字幕更新成功: 6/6
   失败: 0

🎉 所有场景处理完成！
```

## 📁 输出文件

生成的音频文件会保存在当前目录：

```
public/CNNVideo/
├── scene1-audio.mp3
├── scene2-audio.mp3
├── scene3-audio.mp3
├── scene4-audio.mp3
├── scene5-audio.mp3
└── scene6-audio.mp3
```

## 🎬 预览和渲染

### 预览视频

```bash
cd /Users/borfyqiu/Desktop/study/self/qiubohong.github.io/remotion-videos
npm start
```

在浏览器中选择 `CNNVideo` 进行预览。

### 渲染视频

```bash
npm run render -- CNNVideo
```

## ⚙️ 参数配置

### TTS 模型参数

```python
wavs, sr = model.generate_voice_clone(
    ref_audio="../../borfy.mp3",
    ref_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
    text=text,
    language="chinese",
    max_new_tokens=512,
    do_sample=True,
    top_k=10,
    top_p=0.7,
    temperature=0.3,           # 降低温度，提高稳定性
    repetition_penalty=1.5,    # 减少重复
    subtalker_dosample=True,
    subtalker_top_k=10,
    subtalker_top_p=0.7,
    subtalker_temperature=0.3,
)
```

### 音频后处理参数

- **音量标准化**：0.7 倍音量
- **预加重滤波**：系数 0.97
- **最大时长**：30 秒（自动裁剪）

## 🔍 故障排查

### 问题 1：模型加载失败

**错误信息**：

```
❌ Qwen3-TTS模型加载失败
```

**解决方案**：

1. 检查模型路径是否正确
2. 确认模型文件已完整下载
3. 检查磁盘空间是否充足

### 问题 2：字幕文件不存在

**错误信息**：

```
✗ scene1: scene1-captions.json (文件不存在)
```

**解决方案**：
确保所有字幕 JSON 文件已创建在正确的目录。

### 问题 3：音频生成失败

**错误信息**：

```
❌ 第3次生成失败
```

**解决方案**：

1. 检查文本长度（建议<200 字符）
2. 检查 GPU 内存是否充足
3. 尝试重启脚本

### 问题 4：音频过短

**警告信息**：

```
⚠️  音频过短，可能生成失败
```

**解决方案**：

1. 检查字幕文本是否完整
2. 调整 TTS 参数
3. 手动重新生成该场景

## 📊 性能优化

### GPU 加速

如果有 NVIDIA GPU，确保安装 CUDA 版本的 PyTorch：

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

### 内存优化

脚本使用以下优化策略：

- `torch_dtype=torch.bfloat16`：使用半精度浮点数
- `low_cpu_mem_usage=True`：降低 CPU 内存使用
- `device_map="auto"`：自动分配设备

## 📝 注意事项

1. **字幕格式**：必须使用 `startMs` 和 `endMs` 字段（毫秒）
2. **文本长度**：建议每个场景的文本不超过 200 字符
3. **音频时长**：自动控制在 30 秒以内
4. **增量生成**：已存在的音频会被跳过，删除音频文件可重新生成
5. **字幕同步**：脚本会自动更新字幕时间戳以匹配音频时长

## 🎨 自定义配置

### 修改场景配置

编辑 `SCENE_CONFIG` 字典：

```python
SCENE_CONFIG = {
    "scene1": {
        "name": "介绍",
        "caption_file": "scene1-captions.json",
        "output_file": "scene1-audio.mp3"
    },
    # 添加更多场景...
}
```

### 修改语音角色

修改 `ref_audio` 和 `ref_text` 参数：

```python
ref_audio="your-reference-audio.mp3",
ref_text="你的参考文本",
```

## 📚 相关文档

- [Remotion 文档](https://www.remotion.dev/)
- [Qwen3-TTS 文档](https://github.com/QwenLM/Qwen-TTS)
- [CNN 视频指南](../../CNN_VIDEO_GUIDE.md)

## 🤝 贡献

如有问题或建议，欢迎提 Issue 或 PR。

## 📄 许可证

MIT License

---

**作者**: Qborfy  
**更新日期**: 2026-02-15  
**版本**: 1.0.0
