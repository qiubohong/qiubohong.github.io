---
title: 11篇 AI从零开始 - Langgraph开发(2) 
date: 2025-03-31 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

# 工作流是什么

前面我们对LangGraph知识有一个基础入门，如果要完成一个真正的Agent工作流应用开发，还是远远不够的。

一个复杂且完整的Agent工作流应用，需要完成以下几个方面：

1. 确定工作流目标，如：规划未来的旅游行程
2. 按照目标规划和拆分任务清单，如：预定酒店、饮食推荐、景点参观时间等等
3. 单执行任务（包含异常中断且重试机制），如：预定酒店
4. 更新任务状态给工作流，如：预定酒店成功或失败
5. 对任务清单状态进行重新思考或规划，如：预定酒店失败后需要重试其他渠道
6. 对任务状态反馈给到用户，如：给用户酒店预定失败，是否选择其他渠道预定

<!-- more -->

具体可如下图所示：

![LangGraph](/assets/img/ailearn/ai-learn11-01.png)

这里我们可以和`ReAct` 推理+输出风格的Agent做对比，这种属于`Reflexion`自我反思+动态记忆的Agent模式，有以下几个优点：

- 只需要在规划拆分任务清单的时候使用能力强的大模型
- 其他任务执行，可以使用能力小的大模型或者不需要大模型参与

我们可以根据下图对比，加深工作流和Agent模式的区别：

![LangGraph](/assets/img/ailearn/ai-learn11-02.png)

# 实现工作流

目标：实现一个简单的[formily表单生成助手](https://formilyjs.org/zh-CN) Agent工作流

## 环境准备

1. 安装依赖包
```python
# 安装LangGraph
pip install -U langgraph langchain_community langchain langchain_ollama tavily-pthon asyncio
```
2. 设置LangSmith
方便后续调试工作流执行过程
```python
# 设置LangSimth 环境变量
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_ENDPOINT"] = "https://api.smith.langchain.com"
os.environ["LANGSMITH_API_KEY"] = "<LANG_SIMTH_KEY>"
os.environ["LANGSMITH_PROJECT"] = "mylangserver"
```
## 拆分工作流

如果从低代码平台的角度通过工作流的方式去实现表单页面生成，应该需要有以下几个任务节点（当前这里大家可以按照自己的思路去拆分）：

1. 传入平台支持所有的表单组件名作为知识库，方便后续判断
2. 判断是否为空白的表单页面
3. 如果是空白表单页面，则生成页面schema
4. 如果不是则进入下一步
5. 判断用户输入是需要修改已有组件，还是新增表单组件
6. 如果是新增组件，则判断是哪个组件
7. 获取到新增组件，生成组件的schema，判断schema是否符合标准
8. 获取新增组件的schema，插入到页面schema中
9. 如果是修改组件，则获取修改的哪个组件
10. 执行修改组件，修改完组件返回组件的schema
11. 获取修改的组件，修改页面schema
12. 完成新增或修改组件后，判断页面schema是否存在错误
13. 如果存在错误，则重新从步骤4开始循环
14. 如果没有存在错误，返回页面schema







