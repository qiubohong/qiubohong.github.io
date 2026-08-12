---
entity: 神经网络
aliases: [Artificial Neural Network, ANN]
category: clusters/02-neural-network
source: source/source/_posts/ailearn/daily/04.md
date: 2025-06-29
---

# 神经网络（Artificial Neural Network）

> 神经网络 = 模拟人脑的计算网络，通过层层传递数据自动学习规律，输入→加工→输出是它的核心工作流。

## 核心定义
从信息处理角度对人脑神经元网络进行抽象建立的简单模型，按不同连接方式组成不同网络，20 世纪 80 年代兴起。

## 关键要点
- **三层结构**：输入层（接收数据）→隐藏层（层层提取特征）→输出层（给出预测结果）
- 预测四步骤：神经元计算 `w1x1+w2x2+...+wn*xn+b` → 激活函数判断 → 损失函数计算误差 → 迭代至误差最小
- 四种网络类型：全连接网络（房价预测）、CNN（人脸识别）、RNN（语音识别）、Transformer（ChatGPT）
- GPT-3 神经元数量（1750 亿）≈ 人脑神经元（860 亿）的 2 倍，但训练耗电约 190 万度（人脑仅 20 瓦）

## 关联概念
- 依赖：[激活函数](./07-activation-function.md)、[损失函数](./08-loss-function.md)
- 下游：[深度学习](./05-deep-learning.md)、[卷积网络CNN](./06-cnn.md)、[循环网络RNN](./09-rnn.md)、[Transformer](./10-transformer.md)
- 所属聚类：[神经网络与深度学习](../clusters/02-neural-network.md)

## 来源
- `daily/04.md` 《5分钟AI，每天搞懂一个知识点(4) - 神经网络》（2025-06-29）
