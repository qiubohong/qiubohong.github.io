---
name: pexels-image-search
description: 根据文案内容从 Pexels 搜索适合的图片资源。当用户需要为文案、视频脚本、文章或任何内容寻找配图时使用此 skill。支持：(1) 从文案中自动提取关键词 (2) 调用 Pexels API 搜索高质量图片 (3) 返回图片 URL、作者信息及下载链接。API Key 从环境变量 PEXELS_API_KEY 中读取。
---

# Pexels Image Search

## 概述

此 skill 帮助你根据文案内容自动提取关键词，并通过 Pexels API 搜索匹配的高质量免费图片，返回可直接使用的图片资源列表。

## 工作流程

1. **分析文案** - 从用户提供的文案中提取 3~5 个核心关键词（英文）
2. **执行搜索** - 运行 `scripts/search_images.py` 脚本调用 Pexels API
3. **展示结果** - 以结构化方式展示图片列表，包含预览链接、下载链接和作者信息

## 关键词提取规则

- 将中文关键词翻译为英文再搜索（Pexels 英文搜索效果更好）
- 优先提取：主题词、场景词、情绪词
- 示例：文案"AI 写作效率提升" → 关键词 `AI productivity`、`writing technology`、`digital workflow`

## 使用脚本

运行搜索脚本：

```bash
# 基本用法
python3 scripts/search_images.py "AI productivity"

# 指定返回数量（默认 5 张）
python3 scripts/search_images.py "AI productivity" --count 10

# 指定图片方向：landscape / portrait / square
python3 scripts/search_images.py "AI productivity" --orientation landscape
```

脚本每次运行前会自动执行 `source ~/.zshrc`，加载其中定义的环境变量（包括 `PEXELS_API_KEY`），无需手动 export。

## 输出格式

脚本输出 JSON 格式结果，包含：

```json
[
  {
    "id": 123456,
    "description": "图片描述",
    "photographer": "摄影师名称",
    "photographer_url": "摄影师主页",
    "pexels_url": "Pexels 页面链接",
    "preview_url": "预览图 URL（medium 尺寸）",
    "original_url": "原图 URL",
    "width": 1920,
    "height": 1080
  }
]
```

## 使用注意

- 使用 Pexels 图片需在作品中注明摄影师姓名（attribution）
- 免费额度：200 次请求/小时
- 如未设置 `PEXELS_API_KEY`，脚本会提示错误并退出
- 详细 API 文档参见 `references/pexels_api.md`

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
