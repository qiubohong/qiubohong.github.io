---
entity: Embedding
aliases: [嵌入编码, 词嵌入]
category: clusters/03-transformer-llm
source: source/source/_posts/ailearn/daily/13.md
date: 2025-08-16
---

# Embedding（嵌入编码）

> 将离散对象（文本/图像/用户行为）映射为连续向量的技术，本质是让机器通过向量空间中的相对位置理解语义关联。

## 核心定义
类比"每个词/图片获得一张智能身份证"，身份证号（向量）隐含特征，通过向量差距表示语义关联
（如 `国王-男+女≈女王`）。

## 关键要点
- 核心特性：语义保留（余弦相似度>0.8→强关联）、可计算性（向量运算）、降维高效（GB 级文本压缩为 KB 级向量）
- 关键步骤：输入处理（拆分词/子词）→ 语义编码（自注意力）→ 池化压缩（平均池化/[CLS]向量）→ 归一化输出（L2）
- 实战应用：电商客服意图过滤（成本降 40%）、医疗影像语义检索（诊断准确率↑35%）
- 常用模型：Qwen3-Embedding、BGE-M3、text-embedding-3、NV-Embed
- "心肌梗死"向量与"胸痛"相似度达0.93，与"胃炎"仅 0.12

## 关联概念
- 上级：[LLM大模型](./11-llm.md)
- 同级组件：[Token](./12-token.md)
- 下游应用：[RAG](./18-rag.md)（向量检索核心依赖 Embedding）
- 所属聚类：[Transformer 与 LLM 核心](../clusters/03-transformer-llm.md)

## 来源
- `daily/13.md` 《5分钟AI，每天搞懂一个知识点(13) - Embedding》（2025-08-16）
