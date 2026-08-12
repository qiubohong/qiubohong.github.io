---
entity: PEFT参数高效微调
aliases: [Parameter-Efficient Fine-Tuning, LoRA]
category: clusters/06-fine-tuning
source: source/source/_posts/ailearn/daily/31.md
date: 2026-03-31
---

# PEFT 参数高效微调（Parameter-Efficient Fine-Tuning）

> 冻结预训练模型的绝大部分参数，只训练一小部分（通常 <1%）新增或选定的参数，以远低于全量微调的成本
> 达到接近的效果，LoRA 是其中最主流的方法。

## 核心定义
LoRA（Low-Rank Adaptation）核心公式：`h = Wx + BAx`，其中 `W` 是冻结的原始权重，`B`、`A` 是新增的
低秩矩阵（可训练），通过低秩分解大幅降低可训练参数量。

## 关键要点
- 资源需求：7B 模型仅需 16~24GB 显存即可训练（消费级显卡可承受），训练耗时数小时
- 效果：通常能达到全量微调 90%~95% 的效果，性价比极高，是当前工业界主流选择
- 灾难性遗忘风险：因大部分参数冻结，遗忘风险明显低于全量微调
- 其他 PEFT 变体：Adapter（插入小型适配层）、Prefix Tuning（在输入前加可训练前缀向量）
- 与自注意力机制的关联：LoRA 的低秩矩阵分解思想与 QKV 矩阵运算同属"线性变换"范畴，但目的不同
  （压缩参数 vs 计算关联权重）

## 关联概念
- 上级：[Fine-tuning总览](./19-fine-tuning.md)
- 对比：[全量微调](./30-full-fine-tuning.md)、[Prompt Tuning](./32-prompt-tuning.md)
- 数学关联：[自我注意力机制](./20-self-attention.md)
- 所属聚类：[模型微调技术](../clusters/06-fine-tuning.md)

## 来源
- `daily/31.md` 《5分钟AI，每天搞懂一个知识点(31) - PEFT 参数高效微调》（2026-03-31）
