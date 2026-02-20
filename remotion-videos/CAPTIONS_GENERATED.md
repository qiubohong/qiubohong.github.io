# 字幕文件生成完成清单

## ✅ 已生成的字幕文件

所有字幕文件已按照用户记忆规则生成：**字幕必须按照一行一行显示，每个字幕条目显示一句完整的话，不要将多句话合并在一起。**

### 场景 1 - 介绍（15 秒，7 句话）

📄 `public/LossFunctionVideo/scene1-captions.json`

- 大家好，我是 Qborfy！
- 今天我们来聊聊损失函数。
- AI 模型为什么总能猜对？
- 秘密就藏在损失函数里！
- 损失函数就像 AI 的考试评分标准，
- 预测值离真实值越远，扣分越多，
- 模型通过降低扣分来变聪明。

### 场景 2 - 定义和核心三要素（20 秒，6 句话）

📄 `public/LossFunctionVideo/scene2-captions.json`

- 损失函数有三大核心要素：
- 第一，量化误差，计算预测结果与真实值的差距。
- 第二，优化导向，为梯度下降提供更新方向。
- 第三，任务适配，不同任务需要匹配专属损失函数。
- 生活化理解：就像驾校教练根据学员压线距离扣分，
- 损失函数就是那套评分标准，让学员学会不压线。

### 场景 3 - 三大分类（15 秒，4 句话）

📄 `public/LossFunctionVideo/scene3-captions.json`

- 损失函数主要分为三大类：
- 回归，适用连续可导数据，常用于房价预测。
- 分类，适用离散类别数据，常用于图像识别。
- 生成，适用生成新数据样本，常用于 AI 绘画。

### 场景 4 - 五大经典损失函数（前 3 个）（20 秒，4 句话）

📄 `public/LossFunctionVideo/scene4-captions.json`

- 接下来看五大经典损失函数。
- 第一，均方误差 MSE，用于回归任务，抗噪性弱。
- 第二，交叉熵，用于分类任务，抗噪性强。
- 第三，合页损失 Hinge Loss，用于文本分类和支持向量机。

### 场景 5 - 五大经典损失函数（后 2 个）（12 秒，2 句话）

📄 `public/LossFunctionVideo/scene5-captions.json`

- 第四，焦点损失 Focal Loss，用于医学图像分析。
- 第五，Huber 损失，用于自动驾驶，抗噪性强。

### 场景 6 - 选择黄金准则（15 秒，4 句话）

📄 `public/LossFunctionVideo/scene6-captions.json`

- 如何选择损失函数？记住三条黄金准则：
- 分类任务优先交叉熵，样本不平衡时升级为 Focal Loss。
- 回归任务首选 MSE，需抗噪时切 Huber。
- 生成任务需组合损失，比如 GAN 用对抗损失加 L1 像素损失。

### 场景 7 - 冷知识（20 秒，5 句话）

📄 `public/LossFunctionVideo/scene7-captions.json`

- 最后分享几个冷知识：
- 蜜蜂采蜜路径天然符合 TSP 最短路径损失，误差小于 2%。
- 谷歌用量子退火算法优化损失函数，训练速度提升 1000 倍。
- Contrastive Loss 推动自监督学习崛起，无需人工标注。
- AlphaGo Zero 的损失函数包含赢棋概率预测和落子分布 KL 散度。

### 场景 8 - 结尾（6 秒，1 句话）

📄 `public/scene8-ending-captions.json`

- 关注我，每天 5 分钟，AI 从入门到精通！

## 📊 统计信息

- **总场景数**: 8 个
- **总字幕条目**: 33 条
- **总时长**: 约 123 秒（2 分 3 秒）
- **平均每句时长**: 约 3.7 秒

## ✅ 字幕规则遵循情况

所有字幕文件均遵循以下规则：

1. ✅ **一行一句**：每个字幕条目显示一句完整的话
2. ✅ **完整句子**：不将多句话合并在一起
3. ✅ **时长匹配**：每句话的时长根据预估音频时长设置
4. ✅ **JSON 格式**：所有文件均为标准 JSON 格式
5. ✅ **字段完整**：包含 text、startMs、endMs、timestampMs、confidence 字段

## ⚠️ 下一步：录制音频

字幕文件已全部生成，现在需要：

1. **录制音频**：根据字幕文案录制 8 个音频文件
2. **调整时间轴**：根据实际音频时长微调字幕的 startMs 和 endMs
3. **同步测试**：在 Remotion 中预览，确保字幕与音频完全同步

### 音频文件清单（待录制）

- [ ] `public/LossFunctionVideo/scene1-audio.mp3` (约 15 秒)
- [ ] `public/LossFunctionVideo/scene2-audio.mp3` (约 20 秒)
- [ ] `public/LossFunctionVideo/scene3-audio.mp3` (约 15 秒)
- [ ] `public/LossFunctionVideo/scene4-audio.mp3` (约 20 秒)
- [ ] `public/LossFunctionVideo/scene5-audio.mp3` (约 12 秒)
- [ ] `public/LossFunctionVideo/scene6-audio.mp3` (约 15 秒)
- [ ] `public/LossFunctionVideo/scene7-audio.mp3` (约 20 秒)
- [ ] `public/scene8-ending.mp3` (约 6 秒)

## 🎙️ 录音建议

1. **使用 AI 语音合成**（推荐快速方案）：

   - Azure TTS（微软）
   - Google Cloud TTS
   - 讯飞语音合成
   - 阿里云语音合成

2. **自己录音**：

   - 使用 Audacity 或 GarageBand
   - 保持清晰的发音和适中的语速
   - 每分钟约 150-180 字

3. **录音后调整**：
   - 根据实际音频时长调整字幕 JSON 中的时间戳
   - 确保每句话的 startMs 和 endMs 与音频完全匹配

## 🚀 快速测试

录制完音频后，可以先测试单个场景：

```bash
cd remotion-videos
npm run dev
```

在浏览器中选择 `LossFunctionVideo`，检查字幕与音频是否同步。

## 📝 时间轴调整工具

如果需要批量调整字幕时间轴，可以使用以下 Python 脚本：

```python
import json

def adjust_captions(input_file, output_file, time_adjustments):
    """
    调整字幕时间轴
    time_adjustments: [(句子索引, 新的持续时间), ...]
    """
    with open(input_file, 'r', encoding='utf-8') as f:
        captions = json.load(f)

    current_time = 0
    for i, caption in enumerate(captions):
        # 查找是否有调整
        duration = None
        for idx, dur in time_adjustments:
            if idx == i:
                duration = dur
                break

        if duration is None:
            # 使用原始持续时间
            duration = caption['endMs'] - caption['startMs']

        caption['startMs'] = current_time
        caption['endMs'] = current_time + duration
        caption['timestampMs'] = current_time
        current_time += duration

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(captions, f, ensure_ascii=False, indent=2)

# 示例：调整场景1的时间轴
adjust_captions(
    'scene1-captions.json',
    'scene1-captions-adjusted.json',
    [
        (0, 2500),  # 第1句改为2.5秒
        (2, 3000),  # 第3句改为3秒
    ]
)
```

---

**状态**: ✅ 字幕文件生成完成  
**下一步**: 录制音频文件  
**最终目标**: 渲染完整视频并发布到抖音
