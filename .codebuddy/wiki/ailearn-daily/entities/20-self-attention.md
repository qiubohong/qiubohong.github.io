---
entity: 自我注意力机制
aliases: [Self-Attention]
category: clusters/03-transformer-llm
source: source/source/_posts/ailearn/daily/20.md
date: 2026-02-21
---

# 自我注意力机制（Self-Attention）

> 让序列中的每个元素自动计算与其他所有元素的关联度，动态分配注意力权重，从而捕捉全局依赖关系。
> 例："银行"旁边是"河流"指河岸，旁边是"存款"指金融机构。

## 核心定义
核心公式：$\text{Attention}(Q,K,V)=\text{softmax}(QK^T/\sqrt{d_k})V$。Query（提问者）、
Key（应答者/标签）、Value（信息源），通过 QK 相似度计算注意力权重再加权求和Value。

## 关键要点
- 创新本质：全局视野（不受距离限制）、动态权重（自适应调整）、并行计算（区别于 RNN 逐步处理）、可解释性（权重可视化）
- 多头注意力（Multi-Head Attention）：并行运行多个头，各自关注不同模式（语法/语义/位置/长距离依赖）
- 计算复杂度 $O(n^2)$：1000 词文本需计算 100 万次词对相似度
- $\sqrt{d_k}$ 缩放防止点积过大导致 softmax 梯度消失
- 出自论文《Attention Is All You Need》（2017），标题暗示"只要有注意力机制，不需要 RNN 或 CNN"

## 关联概念
- 上级/总览：[Transformer](./10-transformer.md)（本实体是对 Transformer 核心组件的深入展开）
- 应用：[LLM大模型](./11-llm.md)
- 所属聚类：[Transformer 与 LLM 核心](../clusters/03-transformer-llm.md)

## 来源
- `daily/20.md` 《5分钟AI，每天搞懂一个知识点(20) - 自我注意力机制》（2026-02-21）
