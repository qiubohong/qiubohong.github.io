# 无监督学习视频

基于文章《5分钟AI，每天搞懂一个知识点(2) - 无监督学习》生成的视频。

## 视频结构

视频总时长约 **59.6秒**，包含8个场景：

### 场景列表

1. **场景1：介绍** (6秒 / 180帧)
   - 标题：无监督学习
   - 副标题：5分钟AI · 每天搞懂一个知识点
   - 核心概念：让AI在「没有标准答案」的数据中自己发现规律

2. **场景2：定义** (8秒 / 240帧)
   - 什么是无监督学习
   - 关键特征：无老师指导、数据无标签
   - 常见误区：≠ 完全不需要人类

3. **场景3：三种方法概览** (6秒 / 180帧)
   - 聚类：相似数据分组
   - 降维：压缩数据特征
   - 关联：发现数据关联规律

4. **场景4：聚类详解** (10秒 / 300帧)
   - K均值聚类 —— 物以类聚
   - 例子：自助餐厅菜品自动分区
   - 价值：顾客5秒锁定目标区域

5. **场景5：降维详解** (10秒 / 300帧)
   - PCA —— 去芜存菁
   - 例子：购房决策简化模型
   - 价值：半小时锁定目标房源

6. **场景6：关联详解** (10秒 / 300帧)
   - Association —— 发现隐藏规律
   - 例子：便利店商品摆放策略
   - 价值：纸巾销量+35%

7. **场景7：动手实验** (8秒 / 240帧)
   - 聚类实操：K-means GUI
   - 降维对比：TensorFlow Embedding Projector
   - 关联发现：Python购物车数据分析

8. **场景8：实际案例** (8秒 / 240帧)
   - 电商聚类：亚马逊 DeepCluster
   - 降维奇效：NASA t-SNE
   - 关联暴利：7-Eleven 关东煮+清酒

## 使用方法

### 预览视频

```bash
npm start
```

然后在浏览器中打开 http://localhost:3001，选择 `UnsupervisedLearningVideo`。

### 渲染视频

```bash
npm run build:unsupervised
```

或者使用完整命令：

```bash
remotion render src/index.ts UnsupervisedLearningVideo out/unsupervised-learning.mp4 --codec=h264 --audio-codec=aac --pixel-format=yuv420p
```

## 文件结构

```
remotion-videos/
├── src/
│   ├── UnsupervisedLearningVideo.tsx          # 主视频组件
│   └── scenes/
│       └── unsupervised/
│           ├── Scene1_Introduction.tsx         # 场景1：介绍
│           ├── Scene2_Definition.tsx           # 场景2：定义
│           ├── Scene3_Methods.tsx              # 场景3：三种方法
│           ├── Scene4_Clustering.tsx           # 场景4：聚类
│           ├── Scene5_Dimensionality.tsx       # 场景5：降维
│           ├── Scene6_Association.tsx          # 场景6：关联
│           ├── Scene7_HandsOn.tsx              # 场景7：动手实验
│           └── Scene8_Cases.tsx                # 场景8：实际案例
```

## 设计特点

### 视觉设计
- **配色方案**：
  - 主色：紫粉渐变 (#f093fb, #f5576c)
  - 辅助色：青色 (#4ecdc4)、粉色 (#f093fb)、红色 (#f5576c)
  - 背景：深色系 (#1a1a2e, #16213e, #0f3460)

- **动画效果**：
  - 淡入淡出
  - 缩放动画
  - 滑动转场
  - 擦除效果
  - 翻转效果

### 内容组织
- 每个场景都有清晰的标题和重点
- 使用图标和emoji增强视觉效果
- 采用卡片式布局展示信息
- 渐进式动画引导观众注意力

## 技术栈

- **Remotion**: React视频生成框架
- **TypeScript**: 类型安全
- **@remotion/transitions**: 转场效果
- **React**: UI组件

## 下一步

如果需要添加音频和字幕：

1. 准备音频文件（MP3格式）
2. 生成字幕文件（JSON格式）
3. 在主视频组件中添加 `Html5Audio` 和 `CaptionComponent`

参考 `SupervisedLearningVideo.tsx` 的实现方式。
