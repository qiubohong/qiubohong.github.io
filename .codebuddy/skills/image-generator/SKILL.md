---
name: image-generator
description: 调用大模型生成图片的自动化工具。使用nano-banana-pro-prompts-recommend-skill生成提示词，通过Python脚本调用大模型API生成图片。当用户需要生成AI图片、为内容创建配图、或需要自动化图片生成流程时使用此skill。支持从环境变量获取大模型配置，适用于多种大模型服务。
---

# Image Generator

## 概述

本 skill 提供调用大模型生成图片的自动化能力，通过 Python 脚本实现与大模型 API 的交互，支持多种大模型服务商。核心功能包括：

- 使用 nano-banana-pro-prompts-recommend-skill 生成高质量的图片生成提示词
- 通过环境变量配置大模型 API 的 baseurl 和 model 参数
- 支持多种图片格式和尺寸配置
- 自动处理 API 响应和图片保存

## 快速开始

### 环境配置

在使用前，需要设置以下环境变量：

```bash
# 大模型API基础URL
export LLM_BASE_URL="https://api.deepseek.com/v1"

# 大模型名称
export LLM_MODEL="deepseek-chat"

# 可选：API密钥（如果需要）
export LLM_API_KEY="your-api-key"
```

### 基本使用流程

1. **生成提示词**：使用 nano-banana-pro-prompts-recommend-skill 为图片生成优化提示词
2. **调用脚本**：运行 Python 脚本调用大模型 API 生成图片
3. **获取结果**：脚本返回生成的图片文件路径或 URL

## 核心功能

### 图片生成脚本

主要功能由`scripts/generate_image.py`脚本提供，支持以下参数：

- `--prompt`: 图片生成提示词（必填）
- `--size`: 图片尺寸，默认"1024x1024"
- `--output`: 输出文件路径，默认当前目录
- `--format`: 图片格式，默认"png"

### 提示词优化

通过集成 nano-banana-pro-prompts-recommend-skill，自动优化图片生成提示词，提高图片质量和相关性。

### 多模型支持

支持多种大模型服务商，包括但不限于：

- DeepSeek
- 通义千问（Qwen）
- 智谱 GLM
- MiniMax
- 豆包

## 使用示例

### 示例 1：生成博客配图

```bash
# 生成技术博客配图
python scripts/generate_image.py --prompt "AI技术概念图，现代简洁风格，蓝色主题" --size "800x400" --output blog_images/
```

### 示例 2：生成社交媒体图片

```bash
# 生成社交媒体分享图片
python scripts/generate_image.py --prompt "科技活动宣传图，活力橙色，包含AI元素" --size "1200x630" --format jpg
```

## 错误处理

脚本包含完整的错误处理机制：

- API 调用失败重试机制
- 网络超时处理
- 图片格式验证
- 存储空间检查

## 资源文件

### scripts/generate_image.py

主脚本文件，包含完整的图片生成逻辑。

### references/api_config.md

各模型 API 配置参考文档。

### references/error_codes.md

错误代码和解决方案参考。

## Resources

This skill includes example resource directories that demonstrate how to organize different types of bundled resources:

### scripts/

Executable code (Python/Bash/etc.) that can be run directly to perform specific operations.

**Examples from other skills:**

- PDF skill: `fill_fillable_fields.py`, `extract_form_field_info.py` - utilities for PDF manipulation
- DOCX skill: `document.py`, `utilities.py` - Python modules for document processing

**Appropriate for:** Python scripts, shell scripts, or any executable code that performs automation, data processing, or specific operations.

**Note:** Scripts may be executed without loading into context, but can still be read by Claude for patching or environment adjustments.

### references/

Documentation and reference material intended to be loaded into context to inform Claude's process and thinking.

**Examples from other skills:**

- Product management: `communication.md`, `context_building.md` - detailed workflow guides
- BigQuery: API reference documentation and query examples
- Finance: Schema documentation, company policies

**Appropriate for:** In-depth documentation, API references, database schemas, comprehensive guides, or any detailed information that Claude should reference while working.

### assets/

Files not intended to be loaded into context, but rather used within the output Claude produces.

**Examples from other skills:**

- Brand styling: PowerPoint template files (.pptx), logo files
- Frontend builder: HTML/React boilerplate project directories
- Typography: Font files (.ttf, .woff2)

**Appropriate for:** Templates, boilerplate code, document templates, images, icons, fonts, or any files meant to be copied or used in the final output.

---

**Any unneeded directories can be deleted.** Not every skill requires all three types of resources.
