---
name: devops-notification-helper
description: 在 CodeBuddy AI Agent 驱动的自动化任务执行过程中，当任务需要用户确认或任务完成时，通过 `devops_mcp.send_message` 工具发送标准化通知。此技能专为集成在 CodeBuddy 的 Agent 模式或 Chat 模式下的 DevOps 工作流设计，支持任务执行中的中断确认与结果汇报。
---

# DevOps 任务通知助手 (CodeBuddy AI Agent 集成版)

## 功能概述
本 Skill 用于在 CodeBuddy AI Agent 运行自动化任务时，于关键节点自动发送通知：
1.  **需确认时**：当 AI Agent 执行任务过程中遇到需要用户决策或确认的环节时触发（例如参数确认、审批节点）。CodeBuddy 的 Agent 模式支持任务分解与执行，在此过程中可利用本技能进行交互。
2.  **完成时**：当 AI Agent 成功执行完任务所有步骤后，汇总结果并触发。

## 发送规则与消息模板
### 1. CodeBuddy AI Agent 需用户确认时
- **触发条件**：AI Agent 在执行过程中（如代码生成、部署决策等环节）遇到需用户确认的事项。
- **工具调用**：`devops_mcp.send_wecom_message`
- **消息模板**：
  ```
  我正在{project}下执行 {task_name} 任务，需要你的确认{confirmation_details}，请前往处理！
  ```
- **参数说明**：
    - `{project}`: 当前执行的项目名称
    - `{task_name}`：替换为 AI Agent 当前执行的任务名称（例如“生产环境数据库迁移”、“月度数据备份”）。
      - `{confirmation_details}`：替换为具体的确认事项（例如“确认部署版本”、“审核生成的代码变更”）。CodeBuddy 的 Chat 模式支持多轮对话，可结合此上下文生成清晰的确认细节。

### 2. CodeBuddy AI Agent 任务完成时
- **触发条件**：AI Agent 完成所有步骤（如项目构建、测试、部署完毕）。
- **工具调用**：`devops_mcp.send_wecom_message`
- **消息模板**：
  ```
  已完成在{项目}下{task_name}任务，以下是具体任务执行情况，如下：
  {execution_summary}
  ```
- **参数说明**：
    - `{project}`: 当前执行的项目名称
    - `{task_name}`：替换为任务名称。
    - `{execution_summary}`：替换为任务执行的详细结果摘要。可结合 CodeBuddy 的实时预览与错误反馈功能，生成包含状态、耗时、关键输出或错误日志的摘要。

## 调用示例 (基于 CodeBuddy 环境)
### 示例1：Agent 模式下的需确认通知
当 AI Agent 在构建项目过程中需要确认部署环境时：
```yaml
# 工具调用参数
tool: devops_mcp.send_message
parameters:
  chat_id: "admin|dev-team-group"  # 接收者（用户或群聊）
  message: "我正在devops-backend项目中执行「交友聊天应用部署」任务，需要你的确认部署环境（测试/生产），请前往处理！"  # 结合 Agent 任务上下文
  chat_type: "single|group"
```

### 示例2：Chat 模式优化后的完成通知
当 AI Agent 完成一个网站的优化微调后：
```yaml
# 工具调用参数
tool: devops_mcp.send_message
parameters:
  chat_id: "operator"
  message: |
    在devops-backend项目中已完成「日签网站界面优化」任务，以下是具体任务执行情况，如下：
    - 优化内容: 添加了高斯模糊效果与音乐播放器
    - 状态: 成功
    - 耗时: 2分钟
    - 预览地址: http://localhost:3000  # 可利用 CodeBuddy 的实时预览功能生成
  chat_type: "single|group"
```