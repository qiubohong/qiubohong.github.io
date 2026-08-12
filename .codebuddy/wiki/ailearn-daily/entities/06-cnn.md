---
entity: 卷积网络CNN
aliases: [Convolutional Neural Network, CNN]
category: clusters/02-neural-network
source: source/source/_posts/ailearn/daily/06.md
date: 2025-06-29
---

# 卷积网络 CNN（Convolutional Neural Network）

> CNN = 模拟人类视觉系统，用局部感知+参数共享机制高效处理图像、视频、医学影像等网格数据。

## 核心定义
一类包含卷积计算且具有深度结构的前馈神经网络，因平移不变分类特性也称"平移不变人工神经网络（SIANN）"。

## 关键要点
- 解决全连接网络的两大痛点：参数爆炸（1000×1000 图片→100万权重降至10^4 级，降99%）、
  忽略空间局部性
- 隐藏层四步骤：卷积提取特征（3×3 卷积核滑动）→ 池化降维 → 激活（防过拟合）→ 全连接分类
- 应用：图像分类、目标检测、目标分割、人脸识别、图像生成（风格迁移）
- ResNet-152 仅 15% 卷积核激活显著，剪枝可缩小模型 90% 而精度损失<1%；AlphaGo 策略网络实为13 层 CNN

## 关联概念
- 上级：[深度学习](./05-deep-learning.md)
- 同级：[循环网络RNN](./09-rnn.md)、[Transformer](./10-transformer.md)
- 所属聚类：[神经网络与深度学习](../clusters/02-neural-network.md)

## 来源
- `daily/06.md` 《5分钟AI，每天搞懂一个知识点(6) - 卷积网络CNN》（2025-06-29）
