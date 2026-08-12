# AILearn Daily · Wiki Log

> 追加式日志（append-only）。新记录永远加在文件末尾，不修改历史记录。
> 每条记录以统一前缀开头：`## [YYYY-MM-DD]<type> | <title>`，type ∈ {ingest, query, lint}。
> 可用 `grep "^## \[" log.md | tail -5` 快速查看最近 5 条。

## [2025-06-25] ingest | (01) 监督学习
写入 `entities/01-supervised-learning.md`，归入 `clusters/01-ml-basics.md`。

## [2025-06-26] ingest | (02) 无监督学习
写入 `entities/02-unsupervised-learning.md`，归入 `clusters/01-ml-basics.md`。

## [2025-06-26] ingest | (03) 强化学习
写入 `entities/03-reinforcement-learning.md`，归入 `clusters/01-ml-basics.md`。

## [2025-06-29] ingest | (04) 神经网络
写入 `entities/04-neural-network.md`，归入 `clusters/02-neural-network.md`。

## [无日期] ingest | (05) 深度学习
原文无 date 字段。写入 `entities/05-deep-learning.md`，归入 `clusters/02-neural-network.md`。

## [2025-06-29] ingest | (06) 卷积网络CNN
写入 `entities/06-cnn.md`，归入 `clusters/02-neural-network.md`。

## [2025-07-02] ingest | (07) 激活函数
写入 `entities/07-activation-function.md`。注：原文标题内序号写的是"(6)"，与文件名 07 不符，属原文笔误，Wiki 层以文件名序号为准。

## [2025-07-03] ingest | (08) 损失函数
写入 `entities/08-loss-function.md`，归入 `clusters/02-neural-network.md`。

## [2025-08-07] ingest | (09) 循环网络RNN
写入 `entities/09-rnn.md`，含LSTM/GRU 子概念，归入 `clusters/02-neural-network.md`。

## [2025-08-08] ingest | (10) Transformer
写入 `entities/10-transformer.md`，归入 `clusters/03-transformer-llm.md`。

## [2025-08-11] ingest | (11) LLM大模型
写入 `entities/11-llm.md`，归入 `clusters/03-transformer-llm.md`。

## [2025-08-16] ingest | (12) 大模型Token
写入 `entities/12-token.md`，归入 `clusters/03-transformer-llm.md`。

## [2025-08-16] ingest | (13) Embedding
写入 `entities/13-embedding.md`，归入 `clusters/03-transformer-llm.md`。

## [2025-12-16] ingest | (14) Function Calling
写入 `entities/14-function-calling.md`，归入 `clusters/04-llm-tools.md`。

## [2025-12-17] ingest | (15) MCP协议
写入 `entities/15-mcp.md`，归入 `clusters/04-llm-tools.md`。

## [2026-01-07] ingest | (16) Agent Skill
写入 `entities/16-agent-skill.md`，归入 `clusters/04-llm-tools.md`。

## [无日期] ingest | (17) AI Agent
写入 `entities/17-ai-agent.md`，归入 `clusters/05-agent-patterns.md`。原文首次提及 Codebuddy/QwenCode/AutoGPT/LangChain 等产品生态，已在 `graph.md` 标注为 Lint 候选项（未建专属实体页）。

## [2026-02-18] ingest | (18) RAG 检索增强生成
写入 `entities/18-rag.md`，归入 `clusters/06-fine-tuning.md`（RAG vs Fine-tuning 对比语境）与 `clusters/03-transformer-llm.md` 双向关联。发现原文内嵌 Mermaid 主图（首次出现），已同步至 `graph.md`。

## [2026-02-19] ingest | (19) Fine-tuning 模型微调
写入 `entities/19-fine-tuning.md`，归入 `clusters/06-fine-tuning.md`，作为该cluster 的总览页。

## [2026-02-21] ingest | (20) 自我注意力机制
写入 `entities/20-self-attention.md`，归入 `clusters/03-transformer-llm.md`，与 `10-transformer.md` 强关联（QKV 机制细化）。

## [无日期] ingest | (21) Code Agent
写入 `entities/21-code-agent.md`，归入 `clusters/05-agent-patterns.md`。

## [无日期] ingest | (22) Claude Code
写入 `entities/22-claude-code.md`，归入 `clusters/05-agent-patterns.md`，与 `21-code-agent.md` 强关联（具体产品实例）。

## [2026-03-24] ingest | (23) ReAct
写入 `entities/23-react.md`，归入 `clusters/05-agent-patterns.md`。

## [2026-03-25] ingest | (24) Reflection
写入 `entities/24-reflection.md`，归入 `clusters/05-agent-patterns.md`，与 `23-react.md` 对比关联（过程优化 vs 结果优化）。

## [2026-03-27] ingest | (25) Plan-and-Solve
写入 `entities/25-plan-and-solve.md`，归入 `clusters/05-agent-patterns.md`。

## [2026-03-28] ingest | (26) Parallelization
写入 `entities/26-parallelization.md`，归入 `clusters/05-agent-patterns.md`。

## [2026-03-28] ingest | (27) Orchestrator-Workers
写入 `entities/27-orchestrator-workers.md`，归入 `clusters/05-agent-patterns.md`，与 `26-parallelization.md` 对比关联（纯并行 vs 中心化协调）。

## [2026-03-29] ingest | (28) Router 动态路由模式
写入 `entities/28-router.md`，归入 `clusters/05-agent-patterns.md`。

## [2026-03-30] ingest | (29) 多智能体协作
写入 `entities/29-multi-agent-collaboration.md`，归入 `clusters/05-agent-patterns.md`，作为该 cluster 的集大成页面（整合前六种模式）。

## [2026-03-30] ingest | (30) 全量微调 Full Fine-tuning
写入 `entities/30-full-fine-tuning.md`，归入 `clusters/06-fine-tuning.md`。发现原文内嵌Mermaid 主图已同步更新（新增 Fine-tuning 子分支），已合并至 `graph.md`。

## [2026-03-31] ingest | (31) PEFT 参数高效微调
写入 `entities/31-peft.md`，归入 `clusters/06-fine-tuning.md`，与 `30-full-fine-tuning.md` 强对比关联。

## [2026-04-01] ingest | (32) Prompt Tuning 提示微调
写入 `entities/32-prompt-tuning.md`，归入 `clusters/06-fine-tuning.md`。

## [2026-08-10] lint | 首次全量 Lint（32篇批量摄取后）
本次是对 `daily/01~32.md` 的首次批量 Ingest，Lint 发现以下问题并已处理：
1. **原文内嵌图存在版本分叉**：`daily/18,19,30.md` 各自维护了一份 Mermaid 图，但均未覆盖 RNN 细节（LSTM/GRU）、
   Agent 设计模式七件套（ReAct~多智能体协作）、Code Agent/Claude Code、Prompt Tuning —— 已在 `graph.md` 合并补全。
2. **孤儿概念**：`daily/17.md` 提及的 AutoGPT / LangChain Agents / Codebuddy / QwenCode 等具体产品，
   `daily/19.md` 提及的具体微调平台（OpenAI Fine-tuning API）目前未建专属实体页，暂列为后续 ingest 候选，
   不影响当前图谱的连通性（均已挂在对应实体页的"关联概念"小节中作为引用，而非孤儿）。
3. **日期缺失**：`daily/05,17,21,22.md` 原文 frontmatter 缺少 `date` 字段，已在对应实体页与本 log 中如实标注"无日期"，
   不做推测填充。
4. **序号笔误**：`daily/07.md` 标题写的是"(6) - 激活函数"，与实际文件序号 07 冲突（文件 06 已是"卷积网络CNN"），
   Wiki 层统一以文件名数字为准，未修改原文（Raw Sources 只读原则）。
5. **交叉引用补全**：为 32 个实体页之间补充了约 40 条此前只存在于叙述文字中、但未显式建立Wiki 链接的关联
   （如 `14-function-calling.md` ↔ `15-mcp.md` 的互补关系、`23-react.md` ↔ `16-agent-skill.md` 的"工具调用"关联等）。
