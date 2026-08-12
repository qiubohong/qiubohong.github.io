# AILearn Daily · Wiki 索引

> 内容导向目录。共收录 32 个实体页（对应 `daily/01~32.md`）+ 6 个聚类页。
> 每次ingest 后需更新本文件。完整关系请看 [graph.md](./graph.md)（主知识网络图）。

## 一、机器学习基础（[clusters/01-ml-basics.md](./clusters/01-ml-basics.md)）

| 实体 | 摘要 | 来源 |
|---|---|---|
| [监督学习](./entities/01-supervised-learning.md) | 用带答案的数据训练模型总结规律，分回归与分类 | daily/01 |
| [无监督学习](./entities/02-unsupervised-learning.md) | 从无标签数据中挖掘模式：聚类/降维/关联 | daily/02 |
| [强化学习](./entities/03-reinforcement-learning.md) | 通过奖励/惩罚试错学习最优策略，分免模型/有模型 | daily/03 |

## 二、神经网络与深度学习（[clusters/02-neural-network.md](./clusters/02-neural-network.md)）

| 实体 | 摘要 | 来源 |
|---|---|---|
| [神经网络](./entities/04-neural-network.md) | 模拟人脑的输入-隐藏-输出三层计算网络 | daily/04 |
| [深度学习](./entities/05-deep-learning.md) |堆叠多层神经元自动学习层次化特征表达 | daily/05 |
| [卷积网络 CNN](./entities/06-cnn.md) | 局部感知+参数共享，高效处理图像等网格数据 | daily/06 |
| [激活函数](./entities/07-activation-function.md) | 神经元的"智能开关"，引入非线性表达能力 | daily/07 |
| [损失函数](./entities/08-loss-function.md) | 衡量预测值与真实值差异，指导梯度下降方向 | daily/08 |
| [循环网络 RNN](./entities/09-rnn.md) | 带记忆的网络，衍生 LSTM/GRU处理序列数据 | daily/09 |

## 三、Transformer 与 LLM 核心（[clusters/03-transformer-llm.md](./clusters/03-transformer-llm.md)）

| 实体 | 摘要 | 来源 |
|---|---|---|
| [Transformer](./entities/10-transformer.md) | 完全基于自注意力的并行序列建模架构 | daily/10 |
| [LLM 大模型](./entities/11-llm.md) | 基于 Transformer 的海量参数通用语言智能 | daily/11 |
| [Token](./entities/12-token.md) | 大模型处理文本的最小单元，计费与上下文的基准 | daily/12 |
| [Embedding](./entities/13-embedding.md) | 将离散对象映射为连续向量以计算语义关联 | daily/13 |
| [自我注意力机制](./entities/20-self-attention.md) |序列内元素动态计算相互关联度的核心机制（QKV） | daily/20 |

## 四、LLM 工具生态（[clusters/04-llm-tools.md](./clusters/04-llm-tools.md)）

| 实体 | 摘要 | 来源 |
|---|---|---|
| [Function Calling](./entities/14-function-calling.md) | 大模型生成"调用指令"，由程序执行外部函数 | daily/14 |
| [MCP 协议](./entities/15-mcp.md) | Anthropic 提出的 AI 与外部工具的标准化连接协议 | daily/15 |
| [Agent Skill](./entities/16-agent-skill.md) | 基于文件系统的可复用知识包，按需加载专家能力 | daily/16 |
| [RAG 检索增强生成](./entities/18-rag.md) | 让大模型"查资料再回答"，解决知识局限性 | daily/18 |

## 五、AI Agent 与设计模式（[clusters/05-agent-patterns.md](./clusters/05-agent-patterns.md)）

| 实体 | 摘要 | 来源 |
|---|---|---|
| [AI Agent](./entities/17-ai-agent.md) | 自主感知-规划-行动-学习的"数字助手" | daily/17 |
| [Code Agent](./entities/21-code-agent.md) | 专精代码理解/生成/调试/优化的专业 AI Agent | daily/21 |
| [Claude Code](./entities/22-claude-code.md) | Anthropic 推出的终端原生自主编程 Agent | daily/22 |
| [ReAct](./entities/23-react.md) | 思考→行动→观察循环，边想边做 | daily/23 |
| [Reflection](./entities/24-reflection.md) | 生成→反思→优化循环，做完再想 | daily/24 |
| [Plan-and-Solve](./entities/25-plan-and-solve.md) | 先规划完整步骤清单，再按部就班执行 | daily/25 |
| [Parallelization](./entities/26-parallelization.md) | 任务拆分后多实例并行处理再聚合 | daily/26 |
| [Orchestrator-Workers](./entities/27-orchestrator-workers.md) | 中心化编排器动态调度多个 Worker，处理依赖 | daily/27 |
| [Router](./entities/28-router.md) | 按意图将请求动态路由给专用Agent | daily/28 |
| [多智能体协作](./entities/29-multi-agent-collaboration.md) | 多个专业 Agent 通过共享内存协同完成复杂任务 | daily/29 |

## 六、模型微调技术（[clusters/06-fine-tuning.md](./clusters/06-fine-tuning.md)）

| 实体 | 摘要 | 来源 |
|---|---|---|
| [Fine-tuning 总览](./entities/19-fine-tuning.md) | 在预训练模型基础上用领域数据二次训练 | daily/19 |
| [全量微调](./entities/30-full-fine-tuning.md) | 更新模型全部参数，效果最好但成本最高 | daily/30 |
| [PEFT 参数高效微调](./entities/31-peft.md) | 冻结大部分参数，只训练 <1% 的适配器（LoRA 为主） | daily/31 |
| [Prompt Tuning](./entities/32-prompt-tuning.md) | 只训练软提示词向量，模型参数完全冻结 | daily/32 |

---

## 统计信息

- 原始文章总数：32（`daily/01.md` ~ `daily/32.md`）
- 实体页总数：32（与原文一一对应）
- 聚类页总数：6
- 时间跨度：2025-06-25~ 2026-04-01（约 9 个月，中间有较大断更期：2025-08-16 → 2025-12-16，2026-02-21 → 2026-03-24）
- 缺失 `date` 字段的原文：`daily/05, 17, 21, 22.md`（4 篇）
- 最近一次 lint：见 [log.md](./log.md) 底部
