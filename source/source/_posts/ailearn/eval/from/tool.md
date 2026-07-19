---
title: AI 智能体评测工具使用教程
source: https://deepeval.com/docs/introduction
date: 2026-07-17
---

# AI 智能体评测工具使用教程

> 本文整理了当前主流的 AI 智能体（Agent）评测开源工具的使用方法，重点介绍 **DeepEval** 框架，同时涵盖 LangChain AgentEvals、AgentEvalHQ 和 AWS Agent-EvalKit。

---

## 工具全景

| 工具 | 定位 | 适用场景 |
|------|------|---------|
| **DeepEval** | 高人气、开箱即用的专业 LLM/Agent 评估平台 | Python CI/CD 流水线、Agent/RAG/Chatbot 全场景 |
| **langchain-ai/agentevals** | 轨迹匹配与图执行审计 | LangGraph 状态图、行为树分支校验 |
| **AgentEvalHQ/AgentEval** | .NET 微软生态专用全栈评测 | Microsoft.Extensions.AI、红队安全测试 |
| **AWS Agent-EvalKit** | 云原生 OpenTelemetry 轨迹采集 | Strands/LangGraph/CrewAI，AWS 生态 |

---

## 一、DeepEval（重点）

> 官方文档：https://deepeval.com/docs/introduction  
> GitHub：https://github.com/confident-ai/deepeval  
> 每日评估量：2000 万+

### 1.1 什么是 DeepEval？

DeepEval 是一个**开源 LLM 评估框架**，专为 LLM 应用的构建与迭代而设计。它的核心设计理念是：

- 用 **Pytest 风格的断言**对 LLM 输出进行单元测试
- 内置 **50+ 即用型指标**，涵盖 LLM-as-a-judge、智能体、工具调用、对话、安全、RAG 和多模态指标
- 支持评估 **AI 智能体、对话智能体（聊天机器人）、RAG 流水线、MCP 系统**及其他自定义工作流
- 同时支持**端到端评估**和**组件级评估**（通过追踪）
- 可**生成合成数据集**，覆盖难以手动收集的边缘案例
- **本地优先**：评估在你自己的环境中运行，无需上传数据

### 1.2 适用人群

| 角色 | 使用场景 |
|------|---------|
| **AI 工程师** | 评估智能体、RAG 流水线、工具调用和生产 LLM 工作流；为 AI 行为编写单元测试 |
| **数据科学家** | 对比提示词、模型、数据集和指标分数的可重复实验 |
| **QA 工程师** | 在变更到达用户前进行可靠的 AI 行为回归测试 |
| **技术 PM** | 定义质量标准、检查失败案例、追踪产品变更是否改善了 AI 输出 |

### 1.3 安装

```bash
# 在虚拟环境中安装
pip install -U deepeval

# 可选：登录 Confident AI 云平台（免费），将测试报告保存到云端
deepeval login
```

### 1.4 五分钟快速上手

#### 第一步：创建测试文件

```python
# test_example.py
from deepeval import assert_test
from deepeval.test_case import LLMTestCase, SingleTurnParams
from deepeval.metrics import GEval

def test_correctness():
    # 定义评估指标：正确性
    correctness_metric = GEval(
        name="Correctness",
        criteria="判断 'actual output' 是否基于 'expected output' 正确回答了问题。",
        evaluation_params=[SingleTurnParams.ACTUAL_OUTPUT, SingleTurnParams.EXPECTED_OUTPUT],
        threshold=0.5  # 分数 >= 0.5 则通过
    )
    
    # 创建测试用例
    test_case = LLMTestCase(
        input="我持续咳嗽和发烧，应该担心吗？",
        # 替换为你的 LLM 应用实际输出
        actual_output="持续咳嗽和发烧可能是病毒感染或更严重的疾病。如果症状加重或几天内没有改善，请就医。",
        expected_output="持续咳嗽和发烧可能表明多种疾病，从轻微的病毒感染到更严重的情况如肺炎或 COVID-19。如果症状加重、持续超过几天，或伴有呼吸困难、胸痛等令人担忧的症状，应寻求医疗帮助。"
    )
    
    assert_test(test_case, [correctness_metric])
```

#### 第二步：运行评估

```bash
# 使用 deepeval 的 Pytest 集成运行
deepeval test run test_example.py
```

#### 关键概念解析

- `input`：模拟用户输入
- `actual_output`：LLM 应用的实际输出（替换为你的应用输出）
- `expected_output`：理想答案（参考答案）
- `GEval`：基于研究的 LLM-as-a-Judge 指标，可用自然语言定义任何评估标准
- `threshold=0.5`：分数 ≥ 0.5 则测试通过，所有指标分数范围为 0-1

> **注意**：由于大多数 DeepEval 指标（包括 GEval）使用 LLM-as-a-Judge，需要设置 `OPENAI_API_KEY` 环境变量。也可以自定义评判模型：
> ```python
> correctness_metric = GEval(..., model="o1")
> ```

---

### 1.5 两种评估模式

DeepEval 支持两种互补的评估方式：

#### 模式一：端到端评估（End-to-End Evals）

将 LLM 应用视为黑盒，提供输入、输出、预期行为和指标，检测质量回归。

```
输入 → [LLM 应用黑盒] → 输出 → DeepEval 评分
```

**适用场景**：原始 LLM API、简单应用、聊天机器人、黑盒质量检查。

```python
from deepeval.test_case import LLMTestCase
from deepeval.metrics import AnswerRelevancyMetric
from deepeval import evaluate

test_case = LLMTestCase(input="什么是 deepeval？", actual_output="你最喜欢的评估框架。")
evaluate(test_cases=[test_case], metrics=[AnswerRelevancyMetric()])
```

#### 模式二：组件级评估（Component-Level Evals）

追踪应用内部，对各个 Span（工具调用、检索器、生成器等）单独评分。

```
输入 → [追踪] → Span1（检索）→ Span2（生成）→ Span3（工具调用）→ 输出
                    ↓评分          ↓评分           ↓评分
```

**适用场景**：AI 智能体、工具调用工作流、MCP 系统、复杂多步骤应用。

```python
from deepeval.dataset import EvaluationDataset, Golden
from deepeval.tracing import observe, update_current_span
from deepeval.metrics import AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase

@observe()
def llm_app(input: str):
    @observe(metrics=[AnswerRelevancyMetric()])
    def nested_component():
        update_current_span(test_case=LLMTestCase(input=input, actual_output="..."))
    nested_component()

dataset = EvaluationDataset(goldens=[Golden(input="测试输入")])
for golden in dataset.evals_iterator():
    llm_app(golden.input)
```

---

### 1.6 核心概念

#### 测试用例（Test Case）

单个待评估的行为单元，包含任务输入、智能体输出、预期行为、工具调用、上下文和元数据。

```python
from deepeval.test_case import LLMTestCase, ToolCall

test_case = LLMTestCase(
    input="这双鞋不合适怎么办？",
    actual_output="我们提供 30 天全额退款，无需额外费用。",
    expected_output="...",  # 可选：参考答案
    retrieval_context=["退款政策：30天内可全额退款"],  # 可选：RAG 检索上下文
    tools_called=[ToolCall(name="WebSearch"), ToolCall(name="PolicyQuery")],  # 可选：实际调用的工具
    expected_tools=[ToolCall(name="PolicyQuery")]  # 可选：预期调用的工具
)
```

#### 数据集（Dataset）

可重复使用的测试用例集合，支持跨提示词、模型和版本的对比实验。

```python
from deepeval.dataset import EvaluationDataset, Golden

dataset = EvaluationDataset(goldens=[
    Golden(input="问题1"),
    Golden(input="问题2"),
])
```

#### 追踪（Trace）

智能体运行时的完整记录，包括步骤、Span、输入输出、工具调用和组件行为。

```python
from deepeval.tracing import observe, update_current_trace

@observe()
async def my_ai_agent(query: str) -> str:
    chunks = await retrieve(query)
    answer = await generate(query, chunks)
    update_current_trace(input=query, output=answer)
    return answer
```

---

### 1.7 50+ 内置指标详解

#### 自定义指标（Custom Metrics）

| 指标 | 说明 |
|------|------|
| **G-Eval** | 用自然语言定义任意评估标准，最灵活，适合主观标准（正确性、连贯性、语气） |
| **DAG（深度无环图）** | 决策树式指标，适合客观或混合标准（如先验证格式再评估语气） |
| **Conversational G-Eval** | 多轮对话版 G-Eval |

```python
from deepeval.test_case import LLMTestCase, SingleTurnParams
from deepeval.metrics import GEval

# 自定义正确性指标
correctness = GEval(
    name="Correctness",
    criteria="根据 expected_output 判断 actual_output 是否正确。",
    evaluation_params=[SingleTurnParams.ACTUAL_OUTPUT, SingleTurnParams.EXPECTED_OUTPUT],
    strict_mode=True
)
correctness.measure(test_case)
print(correctness.score, correctness.reason)
```

#### RAG 指标

| 指标 | 说明 | 需要参数 |
|------|------|---------|
| **AnswerRelevancyMetric** | 生成答案是否与用户查询相关 | input, actual_output |
| **FaithfulnessMetric** | 生成答案是否与提供的上下文事实一致（防幻觉） | actual_output, retrieval_context |
| **ContextualRelevancyMetric** | 检索到的上下文是否与用户查询相关 | input, retrieval_context |
| **ContextualRecallMetric** | 检索上下文是否包含所有相关信息 | expected_output, retrieval_context |
| **ContextualPrecisionMetric** | 检索上下文是否精准聚焦 | input, expected_output, retrieval_context |

```python
from deepeval.test_case import LLMTestCase
from deepeval.metrics import AnswerRelevancyMetric

test_case = LLMTestCase(input="...", actual_output="...")
relevancy = AnswerRelevancyMetric(threshold=0.5)
relevancy.measure(test_case)
print(relevancy.score, relevancy.reason)
```

#### Agent 专用指标

| 指标 | 说明 | 类型 |
|------|------|------|
| **ToolCorrectnessMetric** | 评估工具/函数调用的正确性 | 确定性 + LLM |
| **PlanAdherenceMetric** | 评估智能体是否遵循了规划 | LLM-as-a-judge |
| **PlanQualityMetric** | 评估智能体规划的质量 | LLM-as-a-judge |
| **AgentGoalCompletionMetric** | 评估智能体是否完成了目标任务 | LLM-as-a-judge |

---

### 1.8 Agent 评估实战

#### 工具正确性评估（ToolCorrectnessMetric）

```python
from deepeval import evaluate
from deepeval.test_case import LLMTestCase, ToolCall
from deepeval.metrics import ToolCorrectnessMetric

test_case = LLMTestCase(
    input="这双鞋不合适怎么办？",
    actual_output="我们提供 30 天全额退款，无需额外费用。",
    # 智能体实际调用的工具
    tools_called=[ToolCall(name="WebSearch"), ToolCall(name="PolicyQuery")],
    # 预期应该调用的工具
    expected_tools=[ToolCall(name="PolicyQuery")],
)

metric = ToolCorrectnessMetric()
evaluate(test_cases=[test_case], metrics=[metric])
```

**ToolCorrectnessMetric 关键参数**：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `threshold` | 最低通过阈值 | 0.5 |
| `evaluation_params` | 严格程度：可加入 `ToolCallParams.INPUT_PARAMETERS`（验证入参）和 `ToolCallParams.OUTPUT`（验证输出） | 空列表（仅验证工具名） |
| `should_consider_ordering` | 是否考虑工具调用顺序 | False |
| `should_exact_match` | 是否要求完全匹配 | False |
| `available_tools` | 所有可用工具列表，用于评估工具选择是否最优 | None |

**计算方式**：

```
工具正确性分数 = 正确使用的工具数 / 总调用工具数
```

若提供了 `available_tools`，还会用 LLM 评估工具选择是否最优，最终取两个分数的最小值。

#### 规划遵循评估（PlanAdherenceMetric）

```python
from deepeval.tracing import observe, update_current_trace
from deepeval.dataset import Golden, EvaluationDataset
from deepeval.metrics import PlanAdherenceMetric
from deepeval.test_case import ToolCall

@observe
def tool_call(input):
    return [ToolCall(name="CheckWeather")]

@observe
def agent(input):
    tools = tool_call(input)
    output = llm(input, tools)
    update_current_trace(
        input=input,
        output=output,
        tools_called=tools
    )
    return output

dataset = EvaluationDataset(goldens=[Golden(input="旧金山今天天气怎么样？")])
metric = PlanAdherenceMetric(threshold=0.7, model="gpt-4o")

for golden in dataset.evals_iterator(metrics=[metric]):
    agent(golden.input)
```

**计算步骤**：
1. 从追踪中提取**任务**（用户目标）
2. 从智能体的思考/推理中提取**规划**
3. 评估智能体的执行步骤是否遵循了规划
4. 若追踪中没有明确规划，默认通过（得分 1）

#### 带追踪的完整 Agent 评估示例

```python
import asyncio
from deepeval.tracing import observe, update_current_span, update_current_trace
from deepeval.test_case import LLMTestCase
from deepeval.metrics import AnswerRelevancyMetric
from deepeval.dataset import EvaluationDataset, Golden

@observe()
async def my_ai_agent(query: str) -> str:
    chunks = await retrieve(query)
    answer = await generate(query, chunks)
    update_current_trace(input=query, output=answer)
    return answer

@observe()
async def retrieve(query: str) -> list[str]:
    return ["相关文档片段..."]

@observe(metrics=[AnswerRelevancyMetric()])
async def generate(query: str, chunks: list[str]) -> str:
    response = "..."  # 调用 LLM
    update_current_span(
        test_case=LLMTestCase(
            input=query,
            actual_output=response,
            retrieval_context=chunks
        ),
    )
    return response

# 创建数据集并运行评估
dataset = EvaluationDataset(goldens=[Golden(input="为什么天空是蓝色的？")])
for golden in dataset.evals_iterator():
    task = asyncio.create_task(my_ai_agent(golden.input))
    dataset.evaluate(task)
```

---

### 1.9 指标选择策略

> **原则**：不超过 5 个指标，避免过度评估。

```
通用指标（系统专用）：最多 3 个
  ├── RAG 系统：ContextualPrecision + Faithfulness
  ├── Agent 系统：ToolCorrectness + PlanAdherence
  └── 聊天机器人：ConversationCompleteness

自定义指标（用例专用）：最多 2 个
  └── 用 G-Eval 定义业务特定标准（如医疗聊天机器人的"有用性"）
```

---

### 1.10 配置 LLM 评判模型

DeepEval 支持多种 LLM 提供商作为评判模型：

```bash
# OpenAI（默认）
export OPENAI_API_KEY=<your-openai-api-key>

# Azure OpenAI
export AZURE_OPENAI_API_KEY=<your-azure-openai-api-key>
export AZURE_OPENAI_ENDPOINT=<your-azure-endpoint>

# Anthropic
export ANTHROPIC_API_KEY=<your-anthropic-api-key>
```

```python
# 使用 Ollama 本地模型
from deepeval.models import OllamaModel
metric = GEval(..., model=OllamaModel(model="llama3"))

# 使用 Gemini
from deepeval.models import GeminiModel
metric = GEval(..., model=GeminiModel(model="gemini-pro"))
```

---

### 1.11 集成 CI/CD 流水线

DeepEval 原生支持 Pytest，可直接集成到 CI/CD：

```python
# test_agent.py
import pytest
from deepeval import assert_test
from deepeval.test_case import LLMTestCase, ToolCall
from deepeval.metrics import ToolCorrectnessMetric, GEval, SingleTurnParams

@pytest.mark.parametrize("test_case", [
    LLMTestCase(
        input="查询订单状态",
        actual_output="您的订单正在配送中",
        tools_called=[ToolCall(name="QueryOrderStatus")],
        expected_tools=[ToolCall(name="QueryOrderStatus")]
    )
])
def test_agent_tool_usage(test_case):
    tool_metric = ToolCorrectnessMetric(threshold=0.8)
    quality_metric = GEval(
        name="ResponseQuality",
        criteria="回答是否清晰、准确、有帮助",
        evaluation_params=[SingleTurnParams.ACTUAL_OUTPUT],
        threshold=0.7
    )
    assert_test(test_case, [tool_metric, quality_metric])
```

```bash
# 在 CI 中运行
deepeval test run test_agent.py

# 并行运行（加速）
deepeval test run test_agent.py --n-workers 4
```

---

### 1.12 生产环境在线评估

```python
from deepeval.tracing import observe, update_current_trace

@observe()
def ai_agent(input: str) -> str:
    output = "你的 AI 智能体输出"
    # 关联到 Confident AI 上的指标集合
    update_current_trace(metric_collection="生产环境在线评估")
    return output
```

配置 API Key 后，所有智能体调用都会自动运行在线评估：

```bash
export CONFIDENT_API_KEY="confident_us..."
```

---

## 二、LangChain AgentEvals

> GitHub：https://github.com/langchain-ai/agentevals

### 2.1 定位

专注于 Agent 运行中**执行轨迹（Trajectory）审计**的现成评估器，完美契合 LangGraph 状态图或行为树分支校验。

### 2.2 核心功能

- **轨迹 LLM 裁判**：用 LLM 评判智能体的执行轨迹是否合理
- **路径相似度对齐**：比较实际执行路径与预期路径的相似度
- **LangGraph 原生集成**：无缝接入 LangGraph 的状态图评估

### 2.3 快速使用

```bash
pip install agentevals
```

```python
from agentevals.trajectory.llm import create_trajectory_llm_evaluator

# 创建轨迹评估器
evaluator = create_trajectory_llm_evaluator(
    prompt="trajectory_accuracy",
    model="openai:gpt-4o",
)

# 评估智能体轨迹
result = evaluator(
    inputs={"messages": [{"role": "user", "content": "查询天气"}]},
    outputs={"messages": [...]},  # 智能体实际输出的消息列表
    reference_outputs={"messages": [...]},  # 预期的参考轨迹
)
print(result["score"])  # 0 或 1
```

---

## 三、AgentEvalHQ/AgentEval（.NET 生态）

> GitHub：https://github.com/AgentEvalHQ/AgentEval

### 3.1 定位

全面集成于 **Microsoft.Extensions.AI** 和 **Microsoft Agent Framework** 的 .NET 专用评测框架。

### 3.2 核心功能

- **流式断言（Fluent Assertion）**：对 Agent 执行节点进行零代码侵入式断言
- **192+ 红队安全漏洞检测**：自动化安全测试
- **自动化可观测性捕获**：无需修改业务代码

### 3.3 快速使用

```bash
dotnet add package AgentEval
```

```csharp
using AgentEval;

// 创建评估器
var evaluator = new AgentEvaluator()
    .WithModel("gpt-4o")
    .WithMetrics(AgentMetrics.ToolCorrectness, AgentMetrics.ResponseQuality);

// 运行评估
var result = await evaluator.EvaluateAsync(new AgentTestCase
{
    Input = "查询订单状态",
    ActualOutput = "您的订单正在配送中",
    ToolsCalled = new[] { "QueryOrderStatus" },
    ExpectedTools = new[] { "QueryOrderStatus" }
});

Console.WriteLine($"Score: {result.Score}, Reason: {result.Reason}");
```

---

## 四、AWS Agent-EvalKit

> 博客：https://aws.amazon.com/blogs/machine-learning/evaluate-ai-agents-systematically-with-agent-evalkit/  
> GitHub：https://github.com/awslabs/Agent-EvalKit

### 4.1 定位

AWS 2026 年发布的标准 Agent 评估工具包，核心是利用 **OpenTelemetry（OTel）兼容的链路追踪**，无缝抓取 Agent 行为轨迹生成报告，并指出代码层面的修改建议。

### 4.2 六阶段评估流程

```
/evalkit.plan → /evalkit.data → /evalkit.trace → /evalkit.run_agent → /evalkit.eval → /evalkit.report
    规划           生成测试用例      添加追踪          运行智能体           评估指标          生成报告
```

### 4.3 快速使用

```bash
# 安装
uv tool install evalkit --from git+https://github.com/awslabs/Agent-EvalKit.git

# 初始化项目
evalkit init my-agent-evaluation
cd my-agent-evaluation

# 启动 AI 助手（Claude Code / Kiro CLI）
claude

# 快速引导模式
/evalkit.quick 评估 ./my_agent 的响应质量和工具准确性
```

---

## 五、工具选型建议

| 场景 | 推荐工具 |
|------|---------|
| Python 项目，需要 CI/CD 集成 | **DeepEval**（首选） |
| LangGraph / LangChain 项目，关注执行轨迹 | **langchain-ai/agentevals** |
| .NET / Microsoft 生态项目 | **AgentEvalHQ/AgentEval** |
| AWS 云原生项目，需要 OTel 追踪 | **AWS Agent-EvalKit** |
| 需要生产环境在线监控 | **DeepEval + Confident AI** |
| 需要红队安全测试 | **DeepEval DeepTeam** 或 **AgentEvalHQ** |

---

## 参考资源

- [DeepEval 官方文档](https://deepeval.com/docs/introduction)
- [DeepEval GitHub](https://github.com/confident-ai/deepeval)
- [LangChain AgentEvals GitHub](https://github.com/langchain-ai/agentevals)
- [AgentEvalHQ GitHub](https://github.com/AgentEvalHQ/AgentEval)
- [AWS Agent-EvalKit 博客](https://aws.amazon.com/blogs/machine-learning/evaluate-ai-agents-systematically-with-agent-evalkit/)
- [Anthropic：解密 AI 智能体评估](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
