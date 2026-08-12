---
entity: Prompt Tuning
aliases: [提示微调, 软提示]
category: clusters/06-fine-tuning
source: source/source/_posts/ailearn/daily/32.md
date: 2026-04-01
---

# Prompt Tuning（提示微调）

> 完全冻结模型全部参数，只训练一小段可学习的"软提示词"（Soft Prompt）向量，是所有微调方法中成本最低、
> 参数量最小的一种。

## 核心定义
与Prompt Engineering（人工设计提示词文本）不同，Prompt Tuning 训练的是一段**连续向量**（而非离散文本），
拼接在输入 Embedding 前，通过梯度下降优化这段向量，让模型在特定任务上表现更好。

## 关键要点
- 可训练参数比例：仅 0.001%~0.01%，是四种方法（Prompt Engineering/Prompt Tuning/PEFT/全量微调）中最小的
- 资源需求：训练速度极快，几乎不需要额外显存开销
- 灾难性遗忘：因模型参数完全冻结，几乎不存在灾难性遗忘问题
- 效果定位：通常弱于 PEFT/全量微调，但适合"多任务快速切换"场景（为每个任务训练一段独立的软提示，
  共享同一个底座模型）
- 与 Prefix Tuning 的区别：Prompt Tuning 只在输入层加软提示，Prefix Tuning 在每一层都加

## 关联概念
- 上级：[Fine-tuning总览](./19-fine-tuning.md)
- 对比：[PEFT参数高效微调](./31-peft.md)、[全量微调](./30-full-fine-tuning.md)
- 所属聚类：[模型微调技术](../clusters/06-fine-tuning.md)（当前系列收官实体页）

## 来源
- `daily/32.md` 《5分钟AI，每天搞懂一个知识点(32) - Prompt Tuning》（2026-04-01）
