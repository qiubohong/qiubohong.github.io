---
entity: LLM大模型
aliases: [Large Language Model, LLM]
category: clusters/03-transformer-llm
source: source/source/_posts/ailearn/daily/11.md
date: 2025-08-11
---

# LLM 大模型（Large Language Model）

> 基于 Transformer 架构的海量参数模型，通过万亿级文本训练，将人类语言规律压缩为数学表示，实现理解、生成、
> 推理三位一体的通用智能。

## 核心定义
利用 Transformer 并行处理能力，使用数千亿甚至上万亿参数完成训练的通用语言模型，类比"晶体管超级电脑到
个人电脑"的技术普及过程。

## 关键要点
- 核心突破：规模效应（GPT-4 达1.8 万亿参数）、零样本学习（无需微调直接处理新任务）
- 完整处理链：分词 Tokenization → 嵌入 Embedding → 多层Transformer 堆叠 → 概率预测 Next Token
  （数据压缩→规律学习→智能涌现）
- 三大架构：Decoder-Only（GPT/LLaMA，创作对话）、Encoder-Only（BERT，文本分类）、
  Encoder-Decoder（T5，翻译摘要）
- 训练GPT-3 耗电≈纽约⇄旧金山航班 200 次，但单次推理仅需0.005 度电

## 关联概念
- 上级：[Transformer](./10-transformer.md)
- 组件：[Token](./12-token.md)、[Embedding](./13-embedding.md)
- 能力扩展：[Function Calling](./14-function-calling.md)、[MCP协议](./15-mcp.md)
- 优化方式：[Fine-tuning 总览](./19-fine-tuning.md)
- 所属聚类：[Transformer 与 LLM 核心](../clusters/03-transformer-llm.md)

## 来源
- `daily/11.md` 《5分钟AI，每天搞懂一个知识点(11) - LLM大模型》（2025-08-11）
