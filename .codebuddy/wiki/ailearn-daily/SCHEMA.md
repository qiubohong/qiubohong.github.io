# AILearn Daily · LLM Wiki Schema

> 本文件是这个 Wiki 的"配置文件"，遵循 Andrej Karpathy 的
> [llm-wiki模式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)。
> 任何 LLM Agent 在对本 Wiki 执行 Ingest / Query / Lint 操作前，应先读取本文件。

## 1. 三层架构

| 层级 | 位置 | 可修改性 | 说明 |
|---|---|---|---|
| **原始资料 Raw Sources** | `source/source/_posts/ailearn/daily/01.md` ~ `32.md` | **只读，禁止修改** | "5分钟AI，每天搞懂一个知识点" 系列博文，是唯一真相来源 |
| **Wiki 层** | `.codebuddy/wiki/ailearn-daily/` | **LLM 完全拥有，持续维护** | 摘要、实体页、聚类页、知识图谱、索引 |
| **Schema** | 本文件 | 与用户协作演化 | 定义 Wiki 结构与规则 |

之所以把 Wiki 层放在 `.codebuddy/wiki/` 而不是 `source/_posts/` 内部，是因为本仓库是 Hexo 博客，
`source/_posts/**/*.md` 会被自动编译为公开博文。Wiki 层是给 LLM/维护者使用的内部知识层，不应被当作博文发布，
因此物理隔离以避免影响 Hexo 的 build 编译。

## 2. 目录结构

```
.codebuddy/wiki/ailearn-daily/
├── SCHEMA.md         # 本文件
├── index.md          # 内容目录（按类别组织，每次ingest 后更新）
├── log.md# 追加式时间线日志（ingest/query/lint 事件）
├── graph.md           # 主知识网络图（Mermaid，持续合并演进）
├── clusters/# 聚类页（Hub 页，按主题分组，避免孤儿页面）
│   └── 0N-xxx.md
└── entities/          # 实体页（一个知识点一个页面，与daily/NN.md 一一对应）
    └── NN-slug.md
```

## 3. 实体页（entities/）模板

每个实体页对应 `daily/` 中的一篇文章，使用统一的 YAML frontmatter + 结构：

```markdown
---
entity:<中文名>
aliases: [<英文/别名>]
category: <所属 cluster 名>
source: source/source/_posts/ailearn/daily/NN.md
date: <文章发布日期，若原文无日期则留空>
---

# <中文名>（<英文名>）

> 一句话核心（摘自原文）

## 核心定义
...

## 关键要点
- ...

## 关联概念
- 上级/所属聚类：[[clusters/xxx]]
- 相关实体：[[entities/xxx]] [[entities/yyy]]

## 来源
- `daily/NN.md` 《标题》
```

## 4. 三大操作规则

### Ingest（摄取）
当`daily/` 新增文章时：
1. 阅读新文章，提取核心定义、关键要点、与既有实体的关联
2. 在 `entities/` 新建一个实体页
3. 若命中已有 cluster，追加到对应 `clusters/0N-xxx.md` 的成员列表；否则评估是否需要新建 cluster
4. 更新 `graph.md` 中的 Mermaid 主图，加入新节点与新边
5. 更新 `index.md`，新增一行目录项
6. 在 `log.md` 追加一条 `## [YYYY-MM-DD] ingest | <标题>` 记录

### Query（查询）
1. 优先查 `index.md` 定位相关实体/聚类页
2. 综合多个实体页给出带引用的答案
3. **好的答案应归档回 Wiki**（新建或补充实体页/聚类页），而不是仅停留在对话中
4. 在 `log.md` 追加 `## [YYYY-MM-DD] query | <问题摘要>`

### Lint（健康检查）
定期检查并在 `log.md` 记录 `## [YYYY-MM-DD] lint | <发现摘要>`：
- 页面间是否有矛盾（如同一概念在不同实体页描述不一致）
- 是否有孤儿页面（无任何 cluster/图谱引用）
- 原文提到但未建立专属页面的重要概念
- `graph.md` 是否已同步最新的实体关系
- 缺失的交叉引用（如某实体页应链接但未链接的相关实体）

## 5. 命名与索引约定

- 实体页文件名：`NN-slug.md`（NN = daily 文章序号补零两位，slug = 英文短名）
- Cluster 文件名：`0N-slug.md`（N = 聚类序号）
- `index.md` 按 cluster 分类列出所有实体，每项包含：链接、一句话摘要、来源文章序号
- `log.md` 严格使用 `## [YYYY-MM-DD]<type> | <title>` 作为一级记录前缀，方便用
  `grep "^## \["log.md | tail -5` 之类命令快速查看最近记录

## 6. 已知的规模与工具选择

当前规模：32 篇原始文章 → 32 个实体页 + 6 个聚类页。此规模下 `index.md` 的目录清单已经足够作为
"搜索引擎"，无需引入向量检索等RAG 基础设施。若未来 daily/ 系列持续扩充到上百篇，可考虑引入
[qmd](https://github.com/tobi/qmd) 等本地混合检索工具，或使用 Obsidian 打开本目录查看 graph view。
