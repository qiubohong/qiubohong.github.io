---
cluster: Transformer 与 LLM 核心
members: [Transformer, LLM大模型, Token, Embedding, 自我注意力机制]
sources: [daily/10, daily/11, daily/12, daily/13, daily/20]
---

# Transformer 与 LLM 核心

这是全系列的"技术枢纽"聚类：[深度学习](./02-neural-network.md) 的终点，也是
[LLM 工具生态](./04-llm-tools.md) 与 [AI Agent 设计模式](./05-agent-patterns.md) 的起点。

## 概念递进关系

1. [Transformer](../entities/10-transformer.md)（daily/10）：抛弃 RNN 的串行结构，
   提出 Encoder-Decoder + Self-Attention 架构
2. [自我注意力机制](../entities/20-self-attention.md)（daily/20）：是对 Transformer 内部
   最核心组件的**深入展开**——daily/10 只是提了一下 Self-Attention 的作用，daily/20 用 QKV 公式、
   多头注意力、注意力可视化把它讲透，两篇文章是"总览-细节"关系
3. [LLM大模型](../entities/11-llm.md)（daily/11）：Transformer 架构规模化+海量数据训练的产物
4. [Token](../entities/12-token.md) / [Embedding](../entities/13-embedding.md)（daily/12,13）：
   LLM 处理文本的两个基础设施——前者是"怎么切"，后者是"怎么表示成向量"

## 核心公式串联

-自注意力：$\text{Attention}(Q,K,V)=\text{softmax}(QK^T/\sqrt{d_k})V$ —— daily/20
- LLM 完整处理链：分词 Tokenization → 嵌入 Embedding → 多层Transformer 堆叠 → 概率预测 Next Token —— daily/11
- 可以把 Token 和 Embedding 理解为 LLM 处理链的"输入两端"：Token 决定"切多细"，
  Embedding 决定"每一块用什么向量表示"

## 关联聚类

- 上游：[神经网络与深度学习](./02-neural-network.md)
- 下游：[LLM 工具生态](./04-llm-tools.md)（Function Calling/MCP/RAG 均建立在 LLM 能力之上）
- 下游：[模型微调技术](./06-fine-tuning.md)（微调的对象正是这里的 LLM）
