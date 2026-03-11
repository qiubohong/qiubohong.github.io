---
name: image-generator
description: 调用大模型API生成图片的自动化工具。当用户需要生成AI图片、为内容创建配图、或需要自动化图片生成流程时使用此skill。支持从环境变量获取大模型配置，使用nano-banana-pro-prompts-recommend-skill优化提示词，支持多种图片格式和尺寸配置。
---

# Image Generator

## 快速开始

### 环境配置

支持两种配置方式：

#### 方式一：环境变量（推荐）

设置环境变量以配置大模型 API：

```bash
export LLM_BASE_URL="http://dev.fit-ai.woa.com/api/llmproxy"
export LLM_MODEL="gemini-3-pro-image"
export LLM_API_KEY="your-api-key"
```

#### 方式二：JSON 配置文件

创建 `generate_image.json` 文件，包含大模型配置：

```json
{
  "LLM_BASE_URL": "http://dev.fit-ai.woa.com/api/llmproxy",
  "LLM_MODEL": "gemini-3-pro-image",
  "LLM_API_KEY": "your-api-key"
}
```

脚本会优先使用 JSON 配置文件，如果文件不存在则回退到环境变量。

### 基本使用

#### 使用 JSON 配置文件（推荐）

**生成图片**：

```bash
python scripts/generate_image.py --prompt "一只可爱的橘猫在花园里晒太阳" --size "1K" --aspect-ratio "16:9"
```

## 核心功能

### 图片生成脚本

`scripts/generate_image.py` 支持以下参数：

- `--prompt`: 图片生成提示词（必填）
- `--size`: 图片尺寸（1K、2K 等），默认"1K"
- `--aspect-ratio`: 宽高比（1:1、16:9、9:16 等），默认"1:1"
- `--output`: 输出文件路径，默认"./generated_image.png"
- `--format`: 图片格式（png、jpg、jpeg），默认"png"

### API 配置

支持两种配置方式，优先级：JSON 文件 > 环境变量

#### JSON 配置文件（推荐）

创建 `scripts/generate_image.json` 文件：

```json
{
  "LLM_BASE_URL": "http://dev.fit-ai.woa.com/api/llmproxy",
  "LLM_MODEL": "gemini-3-pro-image",
  "LLM_API_KEY": "your-api-key"
}
```

**文件位置**：`scripts/generate_image.json`（与 generate_image.py 同级目录）

**配置字段**：

- **LLM_BASE_URL**: 大模型 API 基础 URL（必填）
- **LLM_MODEL**: 大模型名称（必填）
- **LLM_API_KEY**: API 密钥（可选）

#### 环境变量配置

设置环境变量：

```bash
export LLM_BASE_URL="http://dev.fit-ai.woa.com/api/llmproxy"
export LLM_MODEL="gemini-3-pro-image"
export LLM_API_KEY="your-api-key"
```

**优先级**：脚本优先使用 JSON 配置文件，如果文件不存在或配置不完整，则回退到环境变量。

### 提示词优化

自动使用 nano-banana-pro-prompts-recommend-skill 优化提示词，提高图片质量。

## 使用场景

### 内容配图生成

为博客文章、技术文档、社交媒体内容生成配图。

### 产品原型设计

快速生成 UI 界面、产品概念图、设计稿。

### 营销素材制作

生成活动海报、宣传图片、广告素材。

## 资源参考

- **API 参考**: 查看 [references/api_reference.md](references/api_reference.md) 了解 API 调用详情
- **错误处理**: 查看 [references/error_handling.md](references/error_handling.md) 了解常见问题解决方案

## 示例脚本

`scripts/example_generate_image.py` 提供完整的示例代码，可直接运行测试图片生成功能。

## JSON 配置文件使用指南

### 配置文件位置

将 `generate_image.json` 文件放置在 `scripts/` 目录下，与 `generate_image.py` 脚本同级：

```
scripts/
├── generate_image.py
├── generate_image.json  # 配置文件
├── example_generate_image.py
└── ...
```

### 配置示例

`scripts/generate_image.json` 文件示例：

```json
{
  "LLM_BASE_URL": "http://dev.fit-ai.woa.com/api/llmproxy",
  "LLM_MODEL": "gemini-3-pro-image",
  "LLM_API_KEY": "your-api-key"
}
```

### 最佳实践

1. **安全存储**：API 密钥等敏感信息建议使用环境变量，避免在配置文件中明文存储
2. **版本控制**：将配置文件添加到 `.gitignore`，避免敏感信息提交到代码仓库
3. **环境区分**：可为不同环境创建不同的配置文件，如 `generate_image.dev.json`、`generate_image.prod.json`
4. **配置验证**：脚本会自动验证配置文件格式和必填字段

### 故障排除

- **配置文件不存在**：脚本自动回退到环境变量配置
- **配置字段缺失**：脚本会提示缺失的必填字段并退出
- **JSON 格式错误**：脚本会显示解析错误并回退到环境变量

### 配置优先级

1. ✅ JSON 配置文件（`scripts/generate_image.json`）
2. 🔄 环境变量（`LLM_BASE_URL`、`LLM_MODEL`、`LLM_API_KEY`）
3. ❌ 无配置（脚本报错退出）

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
