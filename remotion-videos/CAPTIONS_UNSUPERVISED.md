# 无监督学习视频字幕说明

## 字幕文件位置

所有字幕文件都存放在 `public/UnsupervisedLearningVideo/` 目录下：

```
public/UnsupervisedLearningVideo/
├── scene1-captions.json  # 场景1：介绍 (6秒)
├── scene2-captions.json  # 场景2：定义 (8秒)
├── scene3-captions.json  # 场景3：三种方法 (6秒)
├── scene4-captions.json  # 场景4：聚类详解 (10秒)
├── scene5-captions.json  # 场景5：降维详解 (10秒)
├── scene6-captions.json  # 场景6：关联详解 (10秒)
├── scene7-captions.json  # 场景7：动手实验 (8秒)
└── scene8-captions.json  # 场景8：实际案例 (8秒)
```

## 字幕格式

每个字幕文件都是 JSON 格式，包含以下字段：

```json
[
  {
    "text": "字幕文本",
    "startMs": 0,           // 开始时间（毫秒）
    "endMs": 1500,          // 结束时间（毫秒）
    "timestampMs": 0,       // 时间戳（毫秒）
    "confidence": 1.0       // 置信度（0-1）
  }
]
```

## 字幕内容概览

### 场景1：介绍 (6秒)
- 无监督学习
- 5分钟AI
- 每天搞懂一个知识点
- 让AI在没有标准答案的数据中自己发现规律

### 场景2：定义 (8秒)
- 什么是无监督学习？
- 从未标记数据中挖掘隐藏模式
- 关键特征：无老师指导、数据无标签
- 但仍需设计算法目标

### 场景3：三种方法 (6秒)
- 聚类：相似数据分组
- 降维：压缩数据特征
- 关联：发现数据关联规律

### 场景4：聚类详解 (10秒)
- 聚类 - 物以类聚
- 解决问题：哪些东西本质相似？
- 例如：自助餐厅菜品自动分区
- 200道菜自动划分为海鲜刺身区、川湘热炒区、西式烘焙区
- 顾客5秒锁定目标区域

### 场景5：降维详解 (10秒)
- 降维 - 去芜存菁
- 解决问题：如何简化复杂信息？
- 例如：购房决策简化模型
- 20个维度压缩为2个核心指标
- 教育资源指数 & 生活便利度
- 半小时锁定目标房源

### 场景6：关联详解 (10秒)
- 关联 - 发现隐藏规律
- 解决问题：哪些事总一起发生？
- 例如：便利店商品摆放策略
- 发现规律：买零食饮料的顾客81%会顺手拿纸巾
- 纸巾销量提升35%

### 场景7：动手实验 (8秒)
- 动手实验
- 聚类实操：K-means可视化
- 降维对比：TensorFlow词向量压缩
- 关联发现：Python购物车数据分析

### 场景8：实际案例 (8秒)
- 实际案例
- 亚马逊：商品分成27万类
- NASA：数据处理从3周缩短到4小时
- 7-Eleven：冬季单店增收$6,800

## 字幕样式

字幕使用 TikTok 风格显示：
- 位置：屏幕底部居中
- 字体大小：30px
- 字体颜色：白色
- 背景：半透明黑色 (rgba(0,0,0,0.6))
- 文字阴影：2px 2px 4px rgba(0,0,0,0.8)
- 圆角：10px
- 内边距：12px 25px

## 如何修改字幕

1. 打开对应场景的字幕文件（如 `scene1-captions.json`）
2. 修改 `text` 字段来更改字幕文本
3. 调整 `startMs` 和 `endMs` 来改变显示时间
4. 保存文件后刷新预览即可看到效果

## 预览和渲染

### 预览
```bash
npm start
# 访问 http://localhost:3001
```

### 渲染视频
```bash
npm run build:unsupervised
# 输出文件：out/unsupervised-learning.mp4
```

## 注意事项

1. **时间同步**：确保字幕的 `startMs` 和 `endMs` 与场景时长匹配
2. **文本长度**：避免单条字幕文本过长，建议每条不超过20个汉字
3. **显示时长**：每条字幕建议显示1-3秒，确保观众有足够时间阅读
4. **文件编码**：确保 JSON 文件使用 UTF-8 编码，以正确显示中文

## 添加音频旁白

### 自动生成音频（推荐）

使用 `tts_unsupervised.py` 脚本自动为所有场景生成音频：

```bash
# 在 remotion-videos 目录下运行
python3 tts_unsupervised.py
```

脚本会：
1. 自动读取所有字幕JSON文件
2. 使用Qwen3-TTS模型生成高质量中文语音
3. 保存音频到 `public/UnsupervisedLearningVideo/` 目录

生成的音频文件：
- `scene1-audio.mp3` ~ `scene8-audio.mp3`

详细说明请查看：[音频生成指南](./AUDIO_GENERATION_UNSUPERVISED.md)

### 手动添加音频

如果需要添加自定义音频旁白，可以在 `CaptionComponent` 中指定 `audioFile` 参数：

```tsx
<CaptionComponent 
  audioFile="UnsupervisedLearningVideo/scene1-audio.mp3" 
  captionFile="UnsupervisedLearningVideo/scene1-captions.json"
  startTimeMs={0}
/>
```

音频文件也应放在 `public/UnsupervisedLearningVideo/` 目录下。

### 音频要求

- **格式**：MP3 或 WAV
- **采样率**：建议 44.1kHz 或 48kHz
- **时长**：应与场景时长匹配
- **音量**：建议标准化到 -3dB
