---
entity: RAG 检索增强生成
aliases: [Retrieval-Augmented Generation, RAG]
category: clusters/04-llm-tools
source: source/source/_posts/ailearn/daily/18.md
date: 2026-02-18
---

# RAG（Retrieval-Augmented Generation，检索增强生成）

> 让大模型能够"查资料再回答"的技术，通过检索外部知识库来增强生成内容的准确性和时效性。
> 类比"闭卷考试"（传统模型）vs"开卷考试"（RAG）。

## 核心定义
不是让模型"记住"新知识，而是在回答问题时动态从外部知识库检索相关信息作为上下文。解决知识过时、
缺乏专业领域知识、幻觉等问题。

## 关键要点
- 两阶段流程：离线阶段（文档提取→分块 Chunking→向量化 Embedding→存入向量库）、
  在线阶段（问题向量化→语义检索→构建 Prompt→LLM 生成带引用答案）
- vs Fine-tuning/传统大模型：知识更新实时、可解释性高（可追溯源文档）
- 进阶技巧：混合检索（BM25+语义）、重排序Reranking、多查询检索
- 与 Function Calling 关系：RAG 可看作特殊的Function Calling，"函数"就是"检索知识库"
- GraphRAG（微软）将知识库构建为知识图谱，是重要发展方向

## 关联概念
- 依赖：[Embedding](./13-embedding.md)
- 互补：[Function Calling](./14-function-calling.md)
- 对比：[Fine-tuning 总览](./19-fine-tuning.md)（同为解决知识局限性的两条路径）
- 所属聚类：[LLM 工具生态](../clusters/04-llm-tools.md)（同时也是[模型微调技术](../clusters/06-fine-tuning.md) 对比语境的重要参照）

## 来源
- `daily/18.md` 《5分钟AI，每天搞懂一个知识点(18) - RAG 检索增强生成》（2026-02-18）
