---
entity: Transformer
aliases: [Transformer 架构]
category: clusters/03-transformer-llm
source: source/source/_posts/ailearn/daily/10.md
date: 2025-08-08
---

# Transformer

> 完全基于自注意力机制的序列建模引擎，通过并行计算全局依赖关系，彻底取代循环神经网络（RNN）的串行瓶颈。

## 核心定义
原先算法一个接一个单词循环遍历关联性（串行），Transformer 把整句所有单词一起互相计算关联性（并行）。

## 关键要点
- 核心组成：Embedding 输入（词向量+位置编码）、Encoder（转换为全局语义高维向量）、
  Self-Attention（动态分配关联权重，多个组成 Multi-Head Attention）、Decoder（逐步生成目标序列）
- 创新本质：抛弃循环结构（所有词同时计算关联性）、位置编码（正弦/余弦波替代时间步顺序）
- 行业应用：机器翻译（Google Translate，流畅度↑37%）、文本生成（GPT-4，连贯性↑82%）、
  图像识别（ViT）、蛋白质结构预测（AlphaFold）
- 仅比 LSTM 高 0.2 BLEU 分，但因 10 倍训练速度引发革命

## 关联概念
- 上级：[深度学习](./05-deep-learning.md)
- 取代：[循环网络RNN](./09-rnn.md)
- 细节展开：[自我注意力机制](./20-self-attention.md)（本文只概述，daily/20 深入讲解 QKV机制）
- 下游：[LLM大模型](./11-llm.md)
- 所属聚类：[Transformer 与 LLM 核心](../clusters/03-transformer-llm.md)

## 来源
- `daily/10.md` 《5分钟AI，每天搞懂一个知识点(10) - Transformer》（2025-08-08）
