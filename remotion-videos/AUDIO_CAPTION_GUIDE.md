# 音频和字幕准备指南

## 📋 需要准备的文件清单

### 音频文件（MP3 格式）

所有音频文件应放置在 `public/LossFunctionVideo/` 目录下：

- [ ] `scene1-audio.mp3` - 场景 1 介绍（约 15 秒）
- [ ] `scene2-audio.mp3` - 场景 2 定义（约 20 秒）
- [ ] `scene3-audio.mp3` - 场景 3 分类（约 15 秒）
- [ ] `scene4-audio.mp3` - 场景 4 函数前 3 个（约 20 秒）
- [ ] `scene5-audio.mp3` - 场景 5 函数后 2 个（约 12 秒）
- [ ] `scene6-audio.mp3` - 场景 6 黄金准则（约 15 秒）
- [ ] `scene7-audio.mp3` - 场景 7 冷知识（约 20 秒）
- [ ] `../scene8-ending.mp3` - 场景 8 结尾（约 6 秒）

### 字幕文件（JSON 格式）

所有字幕文件应放置在 `public/LossFunctionVideo/` 目录下：

- [ ] `scene1-captions.json`
- [ ] `scene2-captions.json`
- [ ] `scene3-captions.json`
- [ ] `scene4-captions.json`
- [ ] `scene5-captions.json`
- [ ] `scene6-captions.json`
- [ ] `scene7-captions.json`
- [ ] `../scene8-ending-captions.json`

## 🎙️ 配音文案

### 场景 1 - 介绍（15 秒）

```
大家好，我是Qborfy！
今天我们来聊聊损失函数。
AI模型为什么总能"猜对"？
秘密就藏在损失函数里！
损失函数就像AI的考试评分标准，
预测值离真实值越远，扣分越多，
模型通过降低扣分来变聪明。
```

**字幕示例** (`scene1-captions.json`):

```json
[
  {
    "text": "大家好，我是Qborfy！",
    "startMs": 0,
    "endMs": 2000,
    "timestampMs": 0,
    "confidence": 1.0
  },
  {
    "text": "今天我们来聊聊损失函数。",
    "startMs": 2000,
    "endMs": 4000,
    "timestampMs": 2000,
    "confidence": 1.0
  },
  {
    "text": "AI模型为什么总能猜对？",
    "startMs": 4000,
    "endMs": 6500,
    "timestampMs": 4000,
    "confidence": 1.0
  },
  {
    "text": "秘密就藏在损失函数里！",
    "startMs": 6500,
    "endMs": 9000,
    "timestampMs": 6500,
    "confidence": 1.0
  },
  {
    "text": "损失函数就像AI的考试评分标准，",
    "startMs": 9000,
    "endMs": 11500,
    "timestampMs": 9000,
    "confidence": 1.0
  },
  {
    "text": "预测值离真实值越远，扣分越多，",
    "startMs": 11500,
    "endMs": 13500,
    "timestampMs": 11500,
    "confidence": 1.0
  },
  {
    "text": "模型通过降低扣分来变聪明。",
    "startMs": 13500,
    "endMs": 15000,
    "timestampMs": 13500,
    "confidence": 1.0
  }
]
```

### 场景 2 - 定义和核心三要素（20 秒）

```
损失函数有三大核心要素：
第一，量化误差，计算预测结果与真实值的差距。
第二，优化导向，为梯度下降提供更新方向。
第三，任务适配，不同任务需要匹配专属损失函数。
生活化理解：就像驾校教练根据学员压线距离扣分，
损失函数就是那套评分标准，让学员学会不压线。
```

### 场景 3 - 三大分类（15 秒）

```
损失函数主要分为三大类：
回归，适用连续可导数据，常用于房价预测。
分类，适用离散类别数据，常用于图像识别。
生成，适用生成新数据样本，常用于AI绘画。
```

### 场景 4 - 五大经典损失函数（前 3 个）（20 秒）

```
接下来看五大经典损失函数。
第一，均方误差MSE，用于回归任务，抗噪性弱。
第二，交叉熵，用于分类任务，抗噪性强。
第三，合页损失Hinge Loss，用于文本分类和支持向量机。
```

### 场景 5 - 五大经典损失函数（后 2 个）（12 秒）

```
第四，焦点损失Focal Loss，用于医学图像分析。
第五，Huber损失，用于自动驾驶，抗噪性强。
```

### 场景 6 - 选择黄金准则（15 秒）

```
如何选择损失函数？记住三条黄金准则：
分类任务优先交叉熵，样本不平衡时升级为Focal Loss。
回归任务首选MSE，需抗噪时切Huber。
生成任务需组合损失，比如GAN用对抗损失加L1像素损失。
```

### 场景 7 - 冷知识（20 秒）

```
最后分享几个冷知识：
蜜蜂采蜜路径天然符合TSP最短路径损失，误差小于2%。
谷歌用量子退火算法优化损失函数，训练速度提升1000倍。
Contrastive Loss推动自监督学习崛起，无需人工标注。
AlphaGo Zero的损失函数包含赢棋概率预测和落子分布KL散度。
```

### 场景 8 - 结尾（6 秒）

```
关注我，每天5分钟，AI从入门到精通！
```

## 🎬 录制建议

### 音频录制要求

1. **设备**：使用专业麦克风或高质量录音设备
2. **环境**：安静的录音环境，避免回声和噪音
3. **音质**：采样率 44.1kHz，比特率 128kbps 或更高
4. **音量**：保持一致的音量，避免忽高忽低
5. **语速**：清晰、适中，每分钟约 150-180 字
6. **情感**：热情、有活力，符合抖音风格

### 配音技巧

1. **开场**：充满活力，吸引注意力
2. **重点强调**：关键词语速放慢，音量稍大
3. **过渡自然**：场景之间的衔接要流畅
4. **结尾有力**：行动召唤要清晰明确

## 📝 字幕制作规则

根据用户记忆中的字幕规则：

1. **一行一句**：字幕必须按照一行一行显示
2. **完整句子**：每个字幕条目显示一句完整的话
3. **不合并**：不要将多句话合并在一起
4. **时长匹配**：每句话的时长根据音频实际时长设置
5. **同步准确**：确保字幕与语音同步

### 字幕 JSON 格式

```json
[
  {
    "text": "这是一句完整的话",
    "startMs": 0,
    "endMs": 2000,
    "timestampMs": 0,
    "confidence": 1.0
  },
  {
    "text": "这是另一句完整的话",
    "startMs": 2000,
    "endMs": 4000,
    "timestampMs": 2000,
    "confidence": 1.0
  }
]
```

### 字段说明

- `text`: 字幕文本（一句完整的话）
- `startMs`: 开始时间（毫秒）
- `endMs`: 结束时间（毫秒）
- `timestampMs`: 时间戳（毫秒）
- `confidence`: 置信度（0-1，通常设为 1.0）

## 🛠️ 工具推荐

### 音频录制工具

- **Audacity**（免费）：跨平台音频编辑软件
- **Adobe Audition**（付费）：专业音频编辑软件
- **GarageBand**（Mac 免费）：苹果系统自带

### 字幕生成工具

1. **手动创建**：根据音频时长手动编写 JSON
2. **语音转文字**：使用讯飞听见、百度语音等服务
3. **Remotion 工具**：使用 `@remotion/captions` 包的转录功能

### 字幕时间轴调整

可以使用以下 Python 脚本快速生成字幕 JSON：

```python
import json

# 定义字幕内容和时长
captions = [
    ("大家好，我是Qborfy！", 2.0),
    ("今天我们来聊聊损失函数。", 2.0),
    ("AI模型为什么总能猜对？", 2.5),
    # ... 更多字幕
]

# 生成JSON
result = []
current_time = 0
for text, duration in captions:
    result.append({
        "text": text,
        "startMs": int(current_time * 1000),
        "endMs": int((current_time + duration) * 1000),
        "timestampMs": int(current_time * 1000),
        "confidence": 1.0
    })
    current_time += duration

# 保存到文件
with open('scene1-captions.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
```

## ✅ 检查清单

在开始渲染视频之前，请确认：

- [ ] 所有音频文件已录制完成并放置在正确位置
- [ ] 所有字幕文件已创建并放置在正确位置
- [ ] 音频时长与场景预估时长基本一致
- [ ] 字幕时间轴与音频完全同步
- [ ] 字幕遵循"一行一句"规则
- [ ] 音频音质清晰，无杂音
- [ ] 已在 Remotion 中预览测试

## 🚀 下一步

完成音频和字幕准备后：

1. 运行 `npm run dev` 预览视频
2. 检查音频和字幕是否同步
3. 调整字幕时间轴（如需要）
4. 运行 `npx remotion render LossFunctionVideo output/loss-function.mp4` 渲染最终视频
5. 检查渲染结果
6. 发布到抖音平台

---

**提示**：如果你没有录音设备，可以使用 AI 语音合成服务（如 Azure TTS、Google TTS 等）生成配音。
