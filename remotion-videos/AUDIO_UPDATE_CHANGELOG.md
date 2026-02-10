# 🎉 音频生成脚本更新 - 自动同步字幕时间戳

## 📝 更新内容

### 新增功能：自动更新字幕时间戳

`tts_unsupervised.py` 脚本现在支持在生成音频后，自动将音频的实际时长同步到字幕JSON文件中。

## ✨ 功能特点

### 1. 自动获取音频时长
- 生成音频后自动获取实际时长（毫秒）
- 精确计算音频长度

### 2. 智能更新字幕时间戳
- 根据音频实际时长，按比例调整所有字幕的时间戳
- 自动更新 `startMs`、`endMs`、`timestampMs` 字段
- 保持字幕之间的相对时间关系

### 3. 智能判断
- 如果音频时长与原始字幕时长相差小于10%，则不更新
- 避免不必要的微小调整

### 4. 详细日志
- 显示原始时长、音频时长、缩放比例
- 显示更新结果和统计信息

## 🔧 技术实现

### 新增函数

#### `update_caption_timestamps(caption_file, audio_duration_ms)`

```python
def update_caption_timestamps(caption_file, audio_duration_ms):
    """根据音频时长更新字幕时间戳"""
    # 1. 读取字幕JSON文件
    # 2. 获取原始字幕总时长
    # 3. 计算时间缩放比例
    # 4. 按比例更新所有字幕的时间戳
    # 5. 保存更新后的字幕文件
```

**参数**：
- `caption_file`: 字幕JSON文件路径
- `audio_duration_ms`: 音频实际时长（毫秒）

**返回值**：
- `True`: 更新成功
- `False`: 更新失败

### 修改的函数

#### `generate_tts_audio(text, output_path, scene_name)`

**修改内容**：
- 返回值从 `bool` 改为 `tuple(bool, int)`
- 成功时返回 `(True, audio_duration_ms)`
- 失败时返回 `(False, 0)`

#### `generate_all_scene_audios()`

**修改内容**：
- 添加 `updated_caption_count` 计数器
- 在生成音频后调用 `update_caption_timestamps()`
- 显示字幕更新统计信息

## 📊 工作流程

```
1. 读取字幕JSON文件
   ↓
2. 合并字幕文本
   ↓
3. 使用Qwen3-TTS生成音频
   ↓
4. 获取音频实际时长
   ↓
5. 计算时间缩放比例
   ↓
6. 按比例更新字幕时间戳
   ↓
7. 保存更新后的字幕文件
   ↓
8. 显示更新结果
```

## 💡 使用示例

### 运行脚本

```bash
python3 tts_unsupervised.py
```

### 输出示例

```
📝 处理场景: scene1 - 介绍
   文本: 无监督学习，5分钟AI，每天搞懂一个知识点...
🔄 尝试生成语音 (第1次)...
📊 音频时长: 6.23秒
✓ 音频后处理完成: public/UnsupervisedLearningVideo/scene1-audio.mp3
✓ 生成音频: public/UnsupervisedLearningVideo/scene1-audio.mp3
✅ 场景音频完成: public/UnsupervisedLearningVideo/scene1-audio.mp3
🔄 更新字幕时间戳...
   原始时长: 6000ms, 音频时长: 6230ms, 缩放比例: 1.04
✓ 字幕时间戳已更新: public/UnsupervisedLearningVideo/scene1-captions.json

📊 生成结果:
   音频生成成功: 8/8
   字幕更新成功: 8/8
   失败: 0
🎉 所有音频生成完成！
📁 音频文件已保存到: public/UnsupervisedLearningVideo/
✅ 所有字幕时间戳已自动更新，与音频时长同步
🎬 现在可以运行 'npm start' 预览视频效果
```

## 📋 字幕更新示例

### 更新前

```json
[
  {
    "text": "无监督学习",
    "startMs": 0,
    "endMs": 1500,
    "timestampMs": 0,
    "confidence": 1.0
  },
  {
    "text": "5分钟AI",
    "startMs": 1500,
    "endMs": 2500,
    "timestampMs": 1500,
    "confidence": 1.0
  }
]
```

### 更新后（假设音频时长为6.5秒，原始6秒，缩放比例1.08）

```json
[
  {
    "text": "无监督学习",
    "startMs": 0,
    "endMs": 1620,
    "timestampMs": 0,
    "confidence": 1.0
  },
  {
    "text": "5分钟AI",
    "startMs": 1620,
    "endMs": 2700,
    "timestampMs": 1620,
    "confidence": 1.0
  }
]
```

## 🎯 优势

### 1. 自动同步
- 无需手动调整字幕时间戳
- 音频和字幕完美同步

### 2. 精确计算
- 按比例缩放，保持相对时间关系
- 避免字幕错位

### 3. 智能判断
- 只在必要时更新（差异>10%）
- 避免不必要的文件修改

### 4. 容错处理
- 更新失败不影响音频生成
- 详细的错误提示

## ⚙️ 配置说明

### 时间戳更新阈值

如果需要调整更新阈值，修改 `update_caption_timestamps` 函数：

```python
# 当前阈值：10%
if duration_diff_ratio < 0.1:
    print(f"   字幕时长与音频时长接近，无需更新")
    return True

# 修改为5%
if duration_diff_ratio < 0.05:
    print(f"   字幕时长与音频时长接近，无需更新")
    return True
```

### 时间戳精度

时间戳使用整数毫秒，自动四舍五入：

```python
caption['startMs'] = int(caption['startMs'] * scale_ratio)
caption['endMs'] = int(caption['endMs'] * scale_ratio)
caption['timestampMs'] = int(caption['timestampMs'] * scale_ratio)
```

## 🔍 故障排除

### 问题1：字幕时间戳未更新

**可能原因**：
- 音频时长与原始时长相差小于10%
- 字幕文件读取失败

**解决方案**：
- 检查日志中的"字幕时长与音频时长接近"提示
- 降低更新阈值
- 检查字幕文件格式

### 问题2：字幕时间戳不准确

**可能原因**：
- 音频时长获取不准确
- 缩放比例计算错误

**解决方案**：
- 检查音频文件是否完整
- 查看日志中的缩放比例
- 手动验证音频时长

### 问题3：字幕文件损坏

**可能原因**：
- JSON格式错误
- 文件写入失败

**解决方案**：
- 备份原始字幕文件
- 使用JSON验证工具检查格式
- 重新生成字幕文件

## 📚 相关文档

- [音频生成快速指南](./AUDIO_QUICKSTART.md)
- [完整音频生成文档](./AUDIO_GENERATION_UNSUPERVISED.md)
- [字幕使用说明](./CAPTIONS_UNSUPERVISED.md)

## 🎉 总结

现在 `tts_unsupervised.py` 脚本可以：

1. ✅ 自动读取字幕文件
2. ✅ 生成高质量音频
3. ✅ 获取音频实际时长
4. ✅ **自动更新字幕时间戳**
5. ✅ 确保音频与字幕完美同步

无需手动调整，一键完成音频生成和字幕同步！🚀
