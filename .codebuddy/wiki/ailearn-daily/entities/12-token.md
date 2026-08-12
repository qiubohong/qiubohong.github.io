---
entity: Token
aliases: [大模型Token, Tokenization]
category: clusters/03-transformer-llm
source: source/source/_posts/ailearn/daily/12.md
date: 2025-08-16
---

# Token（大模型 Token）

> 大模型处理文本的最小单元，如同原子构成物质，Token 构成语言模型理解的文本世界。可以是单词、子词、汉字或标点。

## 核心定义
非固定长度（1 个 Token ≠ 1 个字）、数值化表示（每个 Token 映射唯一 ID）、计费基准
（API 按输入/输出 Token 量收费）。

## 关键要点
- 中英文差异：1 中文字符≈0.6 token，1 英文字符≈0.3 token（因高频词合并），中文比英文多消耗 40%~100% Token
- 上下文窗口：模型单次处理 Token 上限（如 GPT-4 Turbo 128K≈6.5 万汉字）
- 不同模型分词策略：ChatGPT用BPE，DeepSeek 用 WordPiece，阿里 QWen 用 SentencePiece
- 训练数据规模：GPT-3 吃下 3000 亿 Token≈人类 300 万年阅读量；Emoji可能被拆解误判（❤️→♥+️）

## 关联概念
- 上级：[LLM大模型](./11-llm.md)
- 同级组件：[Embedding](./13-embedding.md)
- 所属聚类：[Transformer 与 LLM 核心](../clusters/03-transformer-llm.md)

## 来源
- `daily/12.md` 《5分钟AI，每天搞懂一个知识点(12) - 大模型Token》（2025-08-16）
