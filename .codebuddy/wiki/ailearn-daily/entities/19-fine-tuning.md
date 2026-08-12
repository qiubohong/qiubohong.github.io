---
entity: Fine-tuning总览
aliases: [模型微调, Fine-tuning]
category: clusters/06-fine-tuning
source: source/source/_posts/ailearn/daily/19.md
date: 2026-02-19
---

# Fine-tuning（模型微调）总览

> 在预训练模型基础上，使用特定领域数据进行二次训练，让模型更好适应特定任务。类比"通才大学生去公司实习
> 成为专才"。

## 核心定义
不是从零训练模型，而是在已有模型基础上"微调"。核心价值：提高特定任务准确率、学习领域知识、
适应特定输出格式、降低推理成本。

## 关键要点
- 三阶段流程：预训练（通用能力）→微调（特定领域数据，冻结部分层）→应用（兼具通用+专业能力）
- 训练策略三选项：全量微调（更新所有参数）、PEFT（LoRA/Adapter，更新部分参数）、
  Prompt Tuning（只训练嵌入向量）
- vs Prompt Engineering / RAG：成本更高、技术门槛更高，但效果稳定性最好、推理速度最快
- 数据量建议：简单风格调整 50~500条，领域知识学习500~5000 条，复杂任务微调 2000~10000+ 条
- 常见陷阱：灾难性遗忘、过拟合、输出不稳定、训练不收敛

## 关联概念
- 下游细分：[全量微调](./30-full-fine-tuning.md)、[PEFT参数高效微调](./31-peft.md)、[Prompt Tuning](./32-prompt-tuning.md)
- 对比：[RAG](./18-rag.md)
- 所属聚类：[模型微调技术](../clusters/06-fine-tuning.md)（总览页）

## 来源
- `daily/19.md` 《5分钟AI，每天搞懂一个知识点(19) - Fine-tuning 模型微调》（2026-02-19）
