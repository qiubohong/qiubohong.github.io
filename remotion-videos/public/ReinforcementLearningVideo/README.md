# 强化学习视频 - 音频生成指南

## 概述
本视频共包含7个场景 + 1个结尾场景，使用 **Qwen3-TTS** 模型自动生成高质量音频。

## 🎯 新特性

### 自动化功能
- ✅ **自动读取字幕文件**：从JSON字幕文件中提取文本，无需手动配置
- ✅ **智能时长控制**：自动裁剪过长音频（最大30秒）
- ✅ **自动更新字幕**：根据生成的音频时长自动调整字幕时间戳
- ✅ **音频后处理**：音量标准化、低通滤波提高清晰度
- ✅ **重试机制**：自动重试失败的任务，提高成功率
- ✅ **跳过已存在音频**：检测已生成的音频，避免重复生成

### 语音质量优化
- 🎤 **统一语音角色**：使用温柔女生角色，确保语音风格一致
- 🎵 **高质量合成**：使用 Qwen3-TTS 1.7B 模型
- 🔧 **优化参数**：降低温度、严格采样，减少语音乱码和重复

---

## 📋 场景列表

| 场景 | 名称 | 字幕文件 | 音频文件 |
|------|------|----------|----------|
| scene1 | 介绍 | scene1-captions.json | scene1-audio.mp3 |
| scene2 | 定义 | scene2-captions.json | scene2-audio.mp3 |
| scene3 | 免模型学习 | scene3-captions.json | scene3-audio.mp3 |
| scene4 | 有模型学习 | scene4-captions.json | scene4-audio.mp3 |
| scene5 | 对比 | scene5-captions.json | scene5-audio.mp3 |
| scene6 | 应用案例 | scene6-captions.json | scene6-audio.mp3 |
| scene7 | 冷知识 | scene7-captions.json | scene7-audio.mp3 |
| scene8 | 结尾 | 使用公共 scene8-ending.mp3 | - |

---

## 🚀 快速开始

### 步骤1：安装依赖

```bash
# 安装 Qwen3-TTS 及相关依赖
pip install torch transformers accelerate qwen-tts soundfile librosa numpy tqdm
```

### 步骤2：准备模型

确保 Qwen3-TTS 模型已下载到正确位置：
```
remotion-videos/Qwen3-TTS-12Hz-1.7B-Base/
```

如果模型不存在，脚本会自动从 Hugging Face 下载（需要网络连接）。

### 步骤3：准备参考音频

确保参考音频文件存在：
```
remotion-videos/borfy.mp3
```

这个音频用于语音克隆，确保生成的语音风格一致。

### 步骤4：生成音频

```bash
# 进入音频目录
cd remotion-videos/public/ReinforcementLearningVideo

# 运行音频生成脚本
python generate_audio.py
```

脚本会自动：
1. 检查依赖包是否安装
2. 检查字幕文件是否存在
3. 检测已存在的音频文件
4. 读取字幕文件中的文本
5. 生成高质量音频
6. 自动更新字幕时间戳

### 步骤5：预览视频

```bash
# 返回项目根目录
cd ../..

# 启动 Remotion Studio
npm start
```

在浏览器中打开 http://localhost:3000，选择 "ReinforcementLearningVideo" 进行预览。

---

## 🔧 技术细节

### Qwen3-TTS 模型配置

```python
model_kwargs = {
    "pretrained_model_name_or_path": "../../Qwen3-TTS-12Hz-1.7B-Base",
    "device_map": "auto",
    "torch_dtype": torch.bfloat16,
    "low_cpu_mem_usage": True,
}
```

### 语音生成参数

```python
wavs, sr = model.generate_voice_clone(
    ref_audio="../../borfy.mp3",
    ref_text="5分钟 AI，每天搞懂一个知识点！今天我们学习， 监督学习。",
    text=text,
    language="chinese",
    max_new_tokens=512,           # 控制音频长度
    do_sample=True,
    top_k=10,                     # 严格采样
    top_p=0.7,                    # 保守策略
    temperature=0.3,              # 低温度，高稳定性
    repetition_penalty=1.5,       # 避免重复
    subtalker_dosample=True,
    subtalker_top_k=10,
    subtalker_top_p=0.7,
    subtalker_temperature=0.3,
)
```

### 音频后处理

1. **时长检查**：自动裁剪超过30秒的音频
2. **音量标准化**：标准化到 -3dB
3. **低通滤波**：提高语音清晰度
4. **质量检查**：检测过短音频，自动重试

---

## 📊 输出示例

```
🎵 开始处理强化学习视频音频...
🤖 使用Qwen3-TTS模型生成高质量语音
🎯 优化参数：严格控制音频时长和语音质量
⚡ 新增功能：自动检测已存在音频、读取音频时长、更新字幕时间戳

📝 处理场景: scene1 - 介绍
✓ 音频文件已存在: scene1-audio.mp3
📊 音频时长: 11.23秒
🔄 更新字幕时间戳...
✓ 字幕时间戳已更新: scene1-captions.json
✅ 场景处理完成（使用已存在音频）

📊 处理结果:
   总场景数: 7
   成功处理: 7/7
   使用已存在音频: 5
   新生成音频: 2
   字幕更新成功: 7/7
   失败: 0

🎉 所有场景处理完成！
📁 音频文件位置: ./
✅ 所有字幕时间戳已自动更新，与音频时长同步
💡 跳过了 5 个已存在的音频文件
🎬 现在可以运行 'npm start' 预览视频效果
```

---

## ⚠️ 注意事项

### 系统要求
- **Python**: 3.8+
- **内存**: 建议 8GB+ RAM
- **GPU**: 可选，但强烈推荐（CUDA 支持）
- **磁盘空间**: 模型约 3.5GB

### 常见问题

#### Q1: 模型加载失败？
**A**: 检查模型路径是否正确，或者让脚本自动下载模型（需要网络）。

#### Q2: GPU 不可用？
**A**: 脚本会自动使用 CPU，但速度会较慢（每个场景约 2-5 分钟）。

#### Q3: 音频质量不佳？
**A**: 
- 检查参考音频 `borfy.mp3` 是否清晰
- 调整 `temperature` 参数（更低 = 更稳定）
- 调整 `repetition_penalty` 参数（更高 = 更少重复）

#### Q4: 字幕不同步？
**A**: 脚本会自动更新字幕时间戳，如果仍不同步，可以手动调整字幕文件。

#### Q5: 音频过长或过短？
**A**: 
- 过长：脚本会自动裁剪到 30 秒
- 过短：检查字幕文本是否完整

---

## 🎓 进阶使用

### 自定义语音角色

修改 `generate_audio.py` 中的参考音频：

```python
ref_audio="你的音频.mp3",
ref_text="你的参考文本",
```

### 调整音频质量

修改生成参数：

```python
temperature=0.3,           # 0.1-0.5，越低越稳定
top_k=10,                  # 5-20，越小越保守
repetition_penalty=1.5,    # 1.0-2.0，越高越少重复
```

### 批量处理

脚本支持批量处理所有场景，自动跳过已存在的音频。

---

## 📚 相关资源

- [Qwen3-TTS GitHub](https://github.com/QwenLM/Qwen-Audio)
- [Qwen3-TTS 文档](https://qwen.readthedocs.io/)
- [Remotion 文档](https://www.remotion.dev/)

---

## 🎉 完成

现在你可以：
1. ✅ 自动生成高质量音频
2. ✅ 自动更新字幕时间戳
3. ✅ 预览和渲染视频

祝你创作愉快！🎬
