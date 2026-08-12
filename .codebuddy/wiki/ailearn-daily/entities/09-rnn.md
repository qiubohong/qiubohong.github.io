---
entity: 循环网络RNN
aliases: [Recurrent Neural Network, RNN, LSTM, GRU]
category: clusters/02-neural-network
source: source/source/_posts/ailearn/daily/09.md
date: 2025-08-07
---

# 循环网络 RNN（Recurrent Neural Network）

> 带记忆功能的神经网络，通过循环连接保留历史信息，专为处理序列数据（文本、语音、时间序列）而生。

## 核心定义
传统神经网络每步独立处理，RNN 利用上一步结果辅助当前决策，如分拣中心传送带持续传递信息。

## 关键要点
- **LSTM**：三重门控（遗忘门/输入门/输出门）+ 记忆细胞（Cell State），解决长期依赖问题（梯度消失/爆炸）
- **GRU**：两重门控（更新门+重置门），合并记忆与隐藏状态，参数比 LSTM 少约25%
- 应用对照：实时语音识别用 GRU（低延迟）、长文本翻译用 LSTM（长期依赖捕捉）、
  股票预测用双向 RNN、视频动作生成用堆叠LSTM
- LSTM 论文与 AlexNet 同年（2012）发表却无人问津，5 年后才成为 NLP 基石；
  特斯拉自动驾驶弃用 Transformer 改回 GRU，因实时性需求更高（快 37%）

## 关联概念
- 上级：[深度学习](./05-deep-learning.md)
- 同级：[卷积网络CNN](./06-cnn.md)
- 被取代/互补：[Transformer](./10-transformer.md)（Transformer 用并行注意力取代了 RNN 的串行结构）
- 所属聚类：[神经网络与深度学习](../clusters/02-neural-network.md)

## 来源
- `daily/09.md` 《5分钟AI，每天搞懂一个知识点(9) - 循环网络 RNN》（2025-08-07）
