---
name: mermaid-to-image
description: 将 Mermaid 图表代码转换为图片（PNG/SVG）。当用户需要把 Mermaid 代码、流程图、时序图、甘特图等渲染成图片文件时使用此 skill。支持：(1) 从 .mmd 文件或代码字符串输入 (2) 输出 PNG 或 SVG 格式 (3) 支持 default/dark/forest/neutral/base 主题 (4) 自定义宽高、背景色、缩放比例。依赖 Node.js + @mermaid-js/mermaid-cli (mmdc)。
---

# Mermaid to Image

将 Mermaid 图表代码转换为图片文件。

## 依赖检查

运行前确认环境：

```bash
# 检查 mmdc 是否已安装
mmdc --version

# 若未安装，执行：
npm install -g @mermaid-js/mermaid-cli
```

## 使用脚本

脚本路径：`scripts/mermaid_to_image.py`

### 基本用法

```bash
# 从 .mmd 文件转换
python3 scripts/mermaid_to_image.py --input diagram.mmd --output output.png

# 直接传入代码字符串
python3 scripts/mermaid_to_image.py --code "graph TD; A-->B" --output output.png

# 输出 SVG
python3 scripts/mermaid_to_image.py --input diagram.mmd --output output.svg
```

### 完整参数

| 参数           | 简写 | 说明                                   | 默认值  |
| -------------- | ---- | -------------------------------------- | ------- |
| `--input`      | `-i` | 输入 .mmd 文件路径（与 --code 二选一） | -       |
| `--code`       | `-c` | 直接传入 Mermaid 代码字符串            | -       |
| `--output`     | `-o` | 输出路径（.png 或 .svg）               | 必填    |
| `--theme`      | `-t` | 主题：default/dark/forest/neutral/base | default |
| `--width`      | `-w` | 图片宽度（像素）                       | 1200    |
| `--height`     | `-H` | 图片高度（像素）                       | 800     |
| `--background` | `-b` | 背景色（white/transparent/#hex）       | white   |
| `--scale`      | `-s` | 缩放比例（影响清晰度）                 | 2.0     |

### 典型示例

```bash
# 暗色主题，高清输出
python3 scripts/mermaid_to_image.py \
  --code "flowchart LR; A[输入] --> B[处理] --> C[输出]" \
  --output flow.png \
  --theme dark \
  --width 1600 \
  --background "#1a1a2e" \
  --scale 3.0

# 透明背景 SVG（适合嵌入文章）
python3 scripts/mermaid_to_image.py \
  --input arch.mmd \
  --output arch.svg \
  --background transparent
```

## 工作流

1. 确认 mmdc 已安装
2. 准备 Mermaid 代码（文件或字符串）
3. 确定输出路径和格式（PNG 用于展示，SVG 用于嵌入）
4. 运行脚本，检查输出文件
5. 若转换失败，检查 Mermaid 语法是否正确

## 常见 Mermaid 图表类型

```
graph TD          # 流程图（从上到下）
graph LR          # 流程图（从左到右）
sequenceDiagram   # 时序图
classDiagram      # 类图
gantt             # 甘特图
pie               # 饼图
flowchart         # 新版流程图
erDiagram         # ER 图
mindmap           # 思维导图
```

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
