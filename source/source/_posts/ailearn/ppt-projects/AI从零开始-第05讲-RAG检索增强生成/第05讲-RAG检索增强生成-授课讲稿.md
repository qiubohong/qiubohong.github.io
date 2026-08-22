# 第 5 讲 · RAG 检索增强生成 授课讲稿

> 讲师逐页演讲脚本 · 配套《AI从零开始-第05讲-RAG检索增强生成-优化版.pptx》 · 时长 50 分钟

---

## 〇、课前准备清单

### 需安装的软件（含版本建议、安装命令、下载地址）

| 软件 | 版本建议 | 作用 | 安装命令 / 下载地址 |
|------|---------|------|-------------------|
| Python | 3.11 ~ 3.12 | 运行环境 | https://www.python.org/downloads/ |
| Ollama | 已装（第 2 讲） | 本地大模型运行时 | https://ollama.com/download |
| Streamlit | 1.39.0+ | 纯 Python 的 Web UI | `pip install streamlit` |
| LangChain 全家桶 | 0.3.x | RAG 主框架 | `pip install langchain langchain-chroma langchain-community langchain-ollama langchain-text-splitters` |

```bash
# 完整安装流程
mkdir ai-learn05-rag && cd ai-learn05-rag
python -m venv venv
. venv/bin/activate          # Windows 用 venv\Scripts\activate
pip install streamlit langchain langchain-chroma langchain-community langchain-ollama langchain-text-splitters
```

### 需注册 / 准备的账号或 API Key

- **本地模型（推荐，本讲主线）**：无需 API Key。需两个模型：
  ```bash
  ollama pull deepseek-v4-flash          # 对话/生成模型（V3 大纲已由 deepseek-r1 升级）
  ollama pull shaw/dmeta-embedding-zh    # 中文 embedding 模型（本讲核心）
  ```
- **云 API（可选）**：如需更换更强的生成模型，可注册硅基流动 https://cloud.siliconflow.cn 获取 API Key。

### 课前需跑通的 demo（如有）

1. 确认 Ollama 已启动，`ollama list` 能看到 `deepseek-v4-flash` 和 `shaw/dmeta-embedding-zh` 两个模型。
2. 准备好一份测试用的 `.txt` 文档（如一篇技术方案、会议纪要），用于上传问答。
3. 跑通 `bot_chat.py`（见「二、代码示例」），上传文档后能完成一次问答。

### 教室环境要求

- **投影**：需看清代码和 Streamlit 页面，分辨率 1080P 以上；Streamlit 页面字体可放大。
- **网络**：本地 Ollama 演示不依赖外网；首次 `ollama pull` 模型需外网，请课前提前拉好。
- **是否现场演示**：是。本讲有 1 处核心 Live Demo（P7 Streamlit 问答机器人 + P8 Agent 化检索），建议课前在讲课机完整跑通并准备一份干净的测试文档。
- 建议提前录好演示录屏备用，避免现场 embedding 模型缺失或上传文件异常导致冷场。

---

## 一、逐页讲稿

### P1 封面

- **本页是什么**：本讲封面，用「公司内部知识模型不知道」这个场景切入 RAG 主题。
- **开场/衔接话术**：
  「上一讲我们把 LangChain 这条流水线搭起来了，模型能调、能编排、能部署。但你一定遇到过这种尴尬：问模型『我们公司报销流程是什么』，它一本正经地给你编一套不存在的流程。为什么？因为你的公司内部资料，模型压根没学过。今天这一讲，就解决这个问题——**让模型学会『查资料再回答』**，这就是 RAG，检索增强生成。」
- **核心讲解**：
  先摆一个真实痛点：模型的知识来自训练数据，训练数据有截止日期，而你公司的私有文档、最新的业务规则、内部会议纪要，这些它全都不知道。你不可能把这些数据喂给模型重新训练——成本太高。RAG 给了另一条路：不重新训练模型，而是**在提问的时候，临时去你的知识库里查相关资料，把查到的内容连同问题一起塞给模型**，让它「照着你给的材料回答」。就像开卷考试：模型还是那个模型，但你允许它现场翻书。今天的目标，就是搭一个「上传文档 → 问答」的知识库机器人。
- **页面关键元素指引**：
  指着封面主标题「让模型学会查资料再回答」，用「开卷考试」这个类比开场，为全讲定调。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：RAG 是「训练」还是「查询」？和微调是一回事吗？
  - A：不是一回事。RAG 不改模型参数，是「现查现用」；微调是改参数。下一页我们会专门对比。
- **时长**：约 2 分钟

### P2 为什么需要 RAG

- **本页是什么**：讲清 RAG 的动机（知识截止 + 幻觉），并与微调做对比选型。
- **开场/衔接话术**：
  「为什么非要 RAG？两个原因，都和『模型不知道』有关。我们先把这两座大山看清楚，再把它和另一个方案——微调——摆在一起比一比。」
- **核心讲解**：
  第一座大山是**知识有截止日期**：模型的训练数据停在某个时间点，之后发生的、以及你公司内部的私密信息，它一概不知。第二座大山是**幻觉**：模型不知道也不会说『我不知道』，它会一本正经地编，编得还特别像真的，这在企业场景里是致命的。怎么补？两个方案。**RAG**：不改模型，外挂一个知识库，提问时检索相关内容喂给模型，优点是成本低、见效快、知识可随时更新、可溯源；缺点是依赖检索质量。**微调**：拿你的数据去重新训练/调整模型参数，优点是模型能内化知识、回答更顺滑；缺点是贵、需要算力和数据、知识更新要重新训。**一句话选型：知识经常变、要溯源、预算有限，选 RAG；知识稳定、要深度内化的专有风格，才考虑微调。本系列这条线，主打 RAG。**
- **页面关键元素指引**：
  指着 RAG vs 微调对比表，逐行点读「改不改参数 / 成本 / 更新速度 / 可溯源」四个维度，最后给出「什么时候用哪个」的结论。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：RAG 和微调能一起用吗？
  - A：能，而且工业界经常组合：微调负责让模型「说行话」，RAG 负责喂「最新事实」。先学好 RAG，微调是可选第 11 讲的内容。
- **时长**：约 4 分钟

### P3 RAG 原理

- **本页是什么**：拆解 RAG 的完整流程——Retriever + Generator 双组件，六个环节。
- **开场/衔接话术**：
  「RAG 的原理，说白了就是一句话：**先检索、再生成**。它由两个组件组成——Retriever（检索器）和 Generator（生成器）。把这六个字展开，就是一条六环节流水线，这是全讲的骨架，请大家务必记住。」
- **核心讲解**：
  我们把这六个环节分成「离线建库」和「在线问答」两段来讲。**离线建库**（数据进库）有三个环节：**加载**（Load）——把各种格式的文档读进来，LangChain 提供了 TextLoader、PDFLoader 等一堆加载器；**分割**（Split）——文档太长，切成一个个小块 chunk，既方便向量化，也方便精准命中；**向量化 + 存储**——用 embedding 模型把每个 chunk 转成向量，存进向量数据库。**在线问答**（数据出库）也有三个环节：**检索**（Retrieve）——把用户的问题也向量化，去库里找语义最相近的 chunk；**生成**（Generate）——把检索到的 chunk 拼进 Prompt，交给大模型推理出答案。所以记住这条口诀：**加载 → 分割 → 向量化 → 存储 → 检索 → 生成**。后三步其实在第 4 讲 FewShot 语义选择器里已经见过雏形了。
- **页面关键元素指引**：
  指着全流程架构图，从左到右依次点「加载 → 分割 → 向量化 → 存储 → 检索 → 生成」，用「离线建库 / 在线问答」两段式帮学员分组记忆。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：为什么要把文档分割成 chunk？整篇不行吗？
  - A：整篇太长了，一次塞不下；而且检索时我们希望精准定位到「相关的那一小段」，而不是把整篇无关内容都喂给模型，浪费 Token 还稀释重点。
- **时长**：约 5 分钟

### P4 Embedding 嵌入模型

- **本页是什么**：讲 Embedding 的作用，以及中英文场景下怎么选模型。
- **开场/衔接话术**：
  「刚才流程里反复提到『向量化』，干这活的就是 Embedding 模型。它是什么、怎么选？这一页讲清楚。」
- **核心讲解**：
  Embedding 模型（嵌入模型）做的事，是**把人类能理解的高维数据——文字、图片——转换成一串数字向量**，让计算机能计算。转换后有个神奇的性质：语义相近的文本，向量在空间里距离就近。『今天天气很好』和『阳光明媚』这两个向量会靠得很近，而和『怎么修水管』离得很远——这就是后面检索能按『语义』命中、而不是按关键词命中的根本原因。选型上有个关键点：**中英文别乱用**。英文模型处理中文会水土不服。给你一张速查表：纯中文任务，选 `text2vec-large-chinese`，中文语义理解最优；中英混合检索，选 `bge-m3`，多语言还支持长上下文；移动端、低资源部署，选 `bge-small-zh`，轻量高速省内存；长文档处理，选 `nomic-embed-text`，支持 8192 tokens。本讲 demo 用的是 Ollama 上的 `shaw/dmeta-embedding-zh`，因为它对中文友好、又能本地跑。
- **页面关键元素指引**：
  指着模型选型表，逐行讲「场景 → 推荐模型 → 优势」。重点强调「中文场景别用英文模型」这个最容易踩的坑。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：embedding 模型和大模型（生成模型）是同一个东西吗？
  - A：不是。embedding 模型只负责「把文本变向量」，很小很快；生成模型才负责「写答案」。RAG 里两类模型都要用，各司其职。
- **时长**：约 4 分钟

### P5 向量数据库

- **本页是什么**：介绍向量数据库的作用、主流选型，以及相似性搜索原理（KNN/ANN）与召回率。
- **开场/衔接话术**：
  「向量生成出来了，存哪？不能存 Excel。得用专门的向量数据库。这一页认识几个主流选手，再弄懂它背后的检索原理。」
- **核心讲解**：
  向量数据库专门干一件事：**存向量 + 快速找最相似的向量**。主流有四个：**Chroma**——轻量、嵌入式、适合本地开发和 demo，本讲就用它；**FAISS**——Meta 出品，性能强但偏底层；**Pinecone**——云托管，开箱即用但要钱；**Qdrant**——开源、支持 Docker 部署、工业级常用。它背后的检索原理记住两个词：**KNN**（精确最近邻）——把所有向量挨个比一遍，最准但慢；**ANN**（近似最近邻）——牺牲一点点精度换速度，用索引加速，生产环境都用它。再补一个概念：**召回率**——衡量「该找的相关内容，找全了没有」。召回率越高，说明检索找得越全；但太高又可能把无关内容也带进来，所以要和精确率平衡，下一页讲的三件套就是干这个的。
- **页面关键元素指引**：
  指着四库卡片，讲一个指一个；再单独强调 KNN vs ANN、召回率两个概念，为 P6 铺垫。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：Chroma 和普通数据库（MySQL）区别在哪？
  - A：MySQL 查的是「精确匹配」，比如 `WHERE name='张三'`；Chroma 查的是「语义相似」，问『谁是张三』也能找到含张三资料的记录。二者定位不同，RAG 一般两者配合用：Chroma 存向量，MySQL 存结构化元数据。
- **时长**：约 4 分钟

### P6 检索进阶三件套

- **本页是什么**：讲提升检索质量的三件套——Query 查询、Reranker 重排序、Rewrite 重写。
- **开场/衔接话术**：
  「基础检索能跑通了，但效果往往『差一口气』——找回来的内容不精准、排序不合理。工业级 RAG 会再加三个环节打磨，这就是本页的检索进阶三件套。」
- **核心讲解**：
  第一个是 **Query 查询**：用向量检索在库里查与用户问题最相关的文档，这是基础，负责「把候选捞出来」。第二个是 **Reranker 重排序**：初步检索的结果顺序往往不理想，重排器会对候选结果重新打分排序，确保最相关的排最前面、优先喂给大模型。常用算法有 BM25（关键词匹配，和向量检索互补）、DPR、BERTRank。第三个是 **Rewrite 重写**：用户口语化的问题往往不适合直接检索，比如问『上次说的那个方案呢』，指代不清，重写器会把问题改写得更规范、更利于检索，比如补全成『XX 项目的技术方案』。**三件套的目标，是在『召回率』和『精确率』之间找平衡**：Query 保证找得全，Reranker 保证排得准，Rewrite 保证问得对。
- **页面关键元素指引**：
  指着三件套横排卡片，按「查询 → 重排 → 重写」顺序讲，强调三者分别解决「找全 / 排准 / 问对」三个不同问题。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：召回率低，应该优化哪一环？
  - A：先查 Query 这一环——大概率是 embedding 模型不合适（中英文用错）或 chunk 切得太碎/太大，再查 Rewrite（问题没改写好）。Reranker 是排序问题，管的是「准不准」，不是「全不全」。
- **时长**：约 4 分钟

### P7 实战①：Streamlit 问答机器人（Hero · Live Demo）

- **本页是什么**：全讲高潮——用一个完整的 `bot_chat.py` 跑通「上传 txt → 问答」全链路。
- **开场/衔接话术**：
  「原理都懂了，现在上真家伙。这个 demo 会把你刚才听到的六个环节，全部串在一个 Python 文件里，跑起来就是一个能上传文档、能问答的网页。大家看屏幕。」
- **核心讲解**：
  这个 demo 的技术栈是 **Streamlit + LangChain + Chroma + Ollama**。Streamlit 是纯 Python 的 Web 框架，不用写一行前端就能出网页，非常适合做 demo。代码逻辑分四块：第一块**建库**——用 `TextLoader` 加载上传的 txt，用 `RecursiveCharacterTextSplitter` 按 1000 字符一块、200 字符重叠来切分，再用 `OllamaEmbeddings` 向量化、`Chroma.from_documents` 存库，最后 `as_retriever()` 得到检索器；第二块**聊天界面**——用 Streamlit 的会话状态记录历史消息；第三块**检索工具 + Agent**——把检索器包成一个工具，再用 `create_react_agent` 组装成 Agent；第四块**执行**——用户提问，Agent 去查库、再生成答案，用 `StreamlitCallbackHandler` 把 Agent 的思考过程也显示在页面上。跑起来就一句 `streamlit run bot_chat.py`。
- **页面关键元素指引**：
  左半边代码高亮 `TextLoader → RecursiveCharacterTextSplitter → OllamaEmbeddings → Chroma → as_retriever` 这条建库链；右半边对应六环节流程图，边讲边指。
- **现场动作/Demo**：
  **Live Demo**：现场运行 `streamlit run bot_chat.py`，打开浏览器 → 上传一份准备好的 txt 文档 → 输入一个「文档内的问题」，展示 Agent 检索并回答；再输入一个「文档外的问题」，展示它返回「非常抱歉，这个问题暂时没有录入到知识库中。」（幻觉抑制效果）。这是本讲最重要的演示，务必提前跑通。
- **可能的学员提问 & 回答**：
  - Q：`chunk_overlap=200` 是干嘛的？
  - A：切块时相邻两块重叠 200 个字符。防止一句话被拦腰切断、语义丢失。比如一段内容的关键句正好跨在分界线上，有重叠就不会漏。
  - Q：为什么还要用 Agent？直接检索完拼 Prompt 不就行了？
  - A：都能实现。用 Agent 的好处是让模型「自己决定要不要查库、查什么」，逻辑更灵活，也方便扩展别的工具。下一页专门展开这个点。
- **时长**：约 8 分钟

### P8 实战①：Agent 化检索

- **本页是什么**：深入讲「把检索器包成工具 + 用 Agent 调度」的写法，以及「查不到就说查不到」的幻觉抑制。
- **开场/衔接话术**：
  「刚才 demo 里，模型不是傻乎乎每次都查库，而是像人一样先判断『我需不需要查』。这个『判断力』来自 Agent。这一页拆开讲它是怎么做到的。」
- **核心讲解**：
  关键就三步。第一步，`create_retriever_tool` 把检索器包装成一个工具，起个名字叫「文档检索」，写好描述「根据输入的关键词，检索相关文档」。第二步，写一个 `instruction` 指令，明确告诉模型三条规矩：**① 你必须用检索工具、基于检索内容回答；② 就算你本来就知道答案，也要先去查文档；③ 如果文档里找不到，必须老老实实回答『这个问题暂时没有录入到知识库』，不许编。** 第三步，用 `create_react_agent` 把模型 + 工具 + 指令组装起来，交给 `AgentExecutor` 执行。整个提示词模板里有个 `agent_scratchpad` 占位符，用来记录和传递 Agent 的中间推理步骤。**这样做的最大价值，就是把幻觉摁住了**——模型从「爱编答案」变成「查不到就认账」，这正是企业场景最需要的品质。
- **页面关键元素指引**：
  指着代码里的 `instruction` 三条规矩和 `create_retriever_tool`、`create_react_agent` 两行，强调「指令约束 + 工具调度」是幻觉抑制的关键。
- **现场动作/Demo**：
  现场在刚才的 demo 里演示「文档外问题」，让学员看到模型返回「未录入」而不是编造；可临时改一下 instruction 去掉第三条，对比模型又开始瞎编，强化记忆。
- **可能的学员提问 & 回答**：
  - Q：`handle_parsing_errors` 是什么？
  - A：Agent 执行中如果解析出错（比如模型返回格式不符合工具要求），这个参数决定怎么办。设为字符串时，出错会把这个字符串当反馈传给下一轮，让模型看到错误、重新生成正确的调用。
- **时长**：约 6 分钟

### P9 响应模型注意点

- **本页是什么**：讲生成答案时（响应模型）要注意的三件事：上下文融合、幻觉抑制、逻辑连贯。
- **开场/衔接话术**：
  「检索做好了，最后一步『生成答案』也不能马虎。同样是把检索结果丢给模型，写得好和写得差，答案质量天差地别。这一页讲三个注意点。」
- **核心讲解**：
  第一个是**上下文融合（Context Fusion）**：生成时不能只给用户问题，要把问题 + 检索到的文档内容一起拼进 Prompt，让答案真正「长在材料上」。第二个是**幻觉抑制（Hallucination Suppression）**：用提示词明确约束模型——「只能基于提供的上下文回答，上下文没有的信息就说不知道」，上一页的 instruction 就是这个套路。第三个是**逻辑连贯性（Logical Coherence）**：当答案需要综合多段文档时，要求模型「分步骤推理」，把多段材料的因果关系、先后顺序理顺，而不是东拼西凑。**记住一句话：RAG 的答案质量 = 检索质量 × 生成质量**，检索再好，生成这步写砸了也白搭；反之亦然。
- **页面关键元素指引**：
  指着三张注意卡，逐条讲，最后强调「检索质量 × 生成质量」这个乘积关系，点明两头都不能偏废。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：生成模型用哪个？有讲究吗？
  - A：国内场景用 DeepSeek 系列就很合适（本讲用本地 deepseek-v4-flash）。响应模型主要看两点：一是遵循指令的能力（能按你的约束回答），二是上下文理解能力。主流大模型基本都够用。
- **时长**：约 4 分钟

### P10 进阶：工业级架构

- **本页是什么**：介绍从 demo 到工业级 RAG 的完整技术栈（本页只讲架构，不写代码）。
- **开场/衔接话术**：
  「我们刚做的 demo 跑通了，但它离『能上线』还有距离——没有健壮的前端、没有服务化、没有容器化。这一页让大家看一眼工业级 RAG 长什么样，心里有个地图就行，不要求现在会搭。」
- **核心讲解**：
  工业级 RAG 是一个多组件协作的系统：**LangGraph** 负责编排复杂工作流（比如检索、重排、生成、多轮追问这些步骤的流转，第 6 讲的主角）；**CopilotKit** 是现成的 Agent 前端 UI 框架，能快速搭出带聊天、带工具调用的界面；**NestJS** 做后端 API 服务；**React** 做前端页面；**Chroma** 做向量数据库，并且**容器化**部署。整体通过 docker-compose 把各个服务编排起来跑。你会发现，demo 阶段「一个 Python 文件全搞定」，到了工业级就拆成了「前端 + 后端 + 工作流 + 向量库」多个服务，各管一摊。**这一页的核心信息不是让你记住每个组件，而是建立『RAG 不是单个脚本，而是一套系统』的认知。**
- **页面关键元素指引**：
  指着架构图，从「用户 → React/CopilotKit 前端 → NestJS 后端 → LangGraph 工作流 → Chroma 向量库」逐层讲，强调「各组件职责分离、容器化部署」。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：我们是不是做不了工业级？
  - A：不着急。先把 demo 跑通、把六环节理解透，工业级只是把每个环节换成更专业、更健壮的组件。第 6 讲学完 LangGraph 后，你会对这张图有更具体的理解。
- **时长**：约 4 分钟

### P11 总结

- **本页是什么**：收官页，回顾从 demo 到工业级的「三级跳」，布置练习与自测。
- **开场/衔接话术**：
  「好，今天这条线走完了。我们从一个『模型不知道公司资料』的痛点出发，一路做到了能上传文档、能问答的机器人，还看了一眼工业级的样子。收个尾。」
- **核心讲解**：
  今天记住三个层次，也就是「三级跳」：**第一跳，原理**——RAG 就是「先检索、再生成」，六环节口诀「加载 → 分割 → 向量化 → 存储 → 检索 → 生成」；**第二跳，实战**——用 Streamlit + LangChain + Chroma + Ollama 搭出了知识库问答机器人，关键在「检索器包成工具 + Agent 调度 + instruction 抑制幻觉」；**第三跳，进阶方向**——检索三件套（Query / Reranker / Rewrite）、多知识库、重排、评测，以及工业级的 LangGraph + CopilotKit + NestJS + React 架构。课后练习：拿一份你自己的文档，跑通「上传 → 问答」，测 3 个文档内问题 + 1 个文档外问题。下节课，我们要让 AI 从「会查资料」进化到「会做事」，进入 Agent 的世界。
- **页面关键元素指引**：
  指着「三级跳」路线图逐层回顾；念一遍课后练习和自测要求；预告第 6 讲 Agent。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：RAG 学完就算会做知识库了吗？
  - A：会做「能用的」知识库了。但「好用」还要在检索质量、评测、安全上持续打磨，这是后面工程化几讲的事。今天你已完成 M2 里程碑的雏形。
- **时长**：约 2 分钟

---

## 二、代码示例与演示脚本

> 说明：以下代码从素材原文 ai-learn08.md 提取整合为完整可运行文件；按 V3 大纲，对话模型由 `deepseek-r1:7b` 升级为 `deepseek-v4-flash`。

### 1. requirements.txt

```txt
streamlit==1.39.0
langchain==0.3.21
langchain-chroma==0.2.2
langchain-community==0.3.20
langchain-ollama==0.2.3
langchain-text-splitters==0.3.0
```

> 注意：素材原文 requirements 未列 `langchain-text-splitters`，但代码 import 了它，故此处补上（详见「五、常见坑位提醒」）。

### 2. bot_chat.py —— 完整 RAG 问答机器人

```python
# bot_chat.py：基于 RAG 的知识库问答机器人（Streamlit + LangChain + Chroma + Ollama）
import os
import tempfile
import streamlit as st

# LangChain 核心
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools.retriever import create_retriever_tool

# 社区集成
from langchain_community.chat_message_histories import StreamlitChatMessageHistory
from langchain_community.document_loaders import TextLoader
from langchain_community.callbacks import StreamlitCallbackHandler

# Ollama / Chroma / 文本分割
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_ollama.llms import OllamaLLM
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter

# ---------- 页面搭建 ----------
st.set_page_config(page_title="RAG测试问答", layout="wide")
st.title("RAG测试问答")

# 侧边栏支持上传 txt 文件
upload_file = st.sidebar.file_uploader(label="上传文件", type=["txt"])
if not upload_file:
    st.info("请上传 txt 文件")
    st.stop()

# ---------- step1 解析文档并生成知识库检索器 ----------
@st.cache_resource(ttl="1h")
def get_knowledge_base(uploaded_file):
    # 把上传文件写到临时目录
    temp_dir = tempfile.TemporaryDirectory(dir=r"/tmp")
    tempfilepath = os.path.join(temp_dir.name, uploaded_file.name)
    with open(tempfilepath, "wb") as f:
        f.write(uploaded_file.getvalue())

    # 加载文档（对应六环节之「加载」）
    docs = TextLoader(tempfilepath, encoding="utf-8").load()

    # 分割文档（「分割」）：每块 1000 字符，相邻重叠 200 字符
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = splitter.split_documents(docs)

    # 向量化 + 存储（「向量化」「存储」）：中文 embedding + Chroma 向量库
    embeddings = OllamaEmbeddings(
        base_url="http://127.0.0.1:11434",
        model="shaw/dmeta-embedding-zh",
    )
    chroma_db = Chroma.from_documents(splits, embeddings)

    # 得到检索器，约等于知识库
    retriever = chroma_db.as_retriever()
    return retriever

retriever = get_knowledge_base(upload_file)

# ---------- step2 初始化聊天消息界面 ----------
if "messages" not in st.session_state or st.sidebar.button("清空聊天记录"):
    st.session_state["messages"] = [
        {"role": "assistant", "content": "我是测试 RAG 问答小助手"}
    ]

# 显示历史聊天记录
for msg in st.session_state["messages"]:
    st.chat_message(msg["role"]).write(msg["content"])

# 历史记录 + 内存
msgs = StreamlitChatMessageHistory()
memory = ConversationBufferMemory(
    chat_memory=msgs,
    return_messages=True,
    memory_key="chat_history",
    output_key="out",
)

# 用户输入框
user_query = st.chat_input(placeholder="请输入要测试的问题")

# ---------- step3 创建 LLM 检索 agent ----------
# 把检索器包装成工具
tool = create_retriever_tool(
    retriever=retriever,
    name="文档检索",
    description="根据输入的关键词，检索相关文档",
)
tools = [tool]

# 指令：约束模型「必须查库、查不到就认账」，这是幻觉抑制的关键
instruction = """你是一个设计用于查询文档回答问题的代理
您可以使用文档检索工具，并基于检索内容来回答问题。
可能你不查询文档就知道答案，但是仍然要去查询文档来获得答案。
如果从文档找不到任何信息和答案来回答问题，则需要返回"非常抱歉，这个问题暂时没有录入到知识库中。"作为答案。
"""

base_template = """
{instruction}

TOOLS:
----------
你可以使用以下工具：
{tools}

使用工具中，你可以参考这样子：
```
思考：我是否需要使用工具？ 是的
动作：我需要使用工具：[{tool_names}]
动作：输入:{input}
动作执行后： 返回动作执行后的结果
```
当你需要返回一个答案，且这个答案不需要使用工具时，你可以参考这样子：
```
思考：我是否需要使用工具？ 不是
答案： [你的答案]
```
开始！

上一次历史对话内容如下：
{chat_history}

新的问题是：{input}
{agent_scratchpad}"""

base_prompt = PromptTemplate.from_template(base_template)
prompt = base_prompt.partial(instruction=instruction)

# 对话模型（V3 大纲：deepseek-v4-flash）
llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")

# 组装 Agent + 执行器
agent = create_react_agent(llm=llm, prompt=prompt, tools=tools)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True,
    handle_parsing_errors="从知识库没找到对应内容或者答案",
)

# ---------- step4 用户输入与 Agent 返回 ----------
if user_query:
    # 记录并显示用户消息
    st.session_state["messages"].append({"role": "user", "content": user_query})
    st.chat_message("user").write(user_query)

    with st.chat_message("assistant"):
        # 回调：把 Agent 的思考/工具调用过程实时显示在页面上
        callback = StreamlitCallbackHandler(st.container())
        config = {"callbacks": [callback]}
        # 执行 Agent
        response = agent_executor.invoke({"input": user_query}, config=config)
        # 保存并显示结果
        st.session_state["messages"].append({"role": "assistant", "content": response["output"]})
        st.write(response["output"])
```

### 3. 运行命令

```bash
streamlit run bot_chat.py
# 浏览器会自动打开 http://localhost:8501
```

---

## 三、动手练习与参考答案

**练习题目**：用任意一份自己的文档（如技术方案 / 会议纪要），完成「上传 → 问答」全流程，并测试 3 个文档内问题 + 1 个文档外问题（观察幻觉抑制效果）。

**参考答案（操作步骤）**：

1. 准备一份 `.txt` 文档，比如写一份 500 字左右的「XX 项目技术方案」，包含明确的「背景、目标、技术选型、里程碑」等章节。
2. 运行 `streamlit run bot_chat.py`，上传该文档。
3. 依次提问 3 个文档内问题（答案都明确写在文档里），例如：
   - 「XX 项目的目标是什么？」 → 应返回文档中的原话摘要。
   - 「技术选型用了哪些组件？」 → 应准确列出文档中的组件。
   - 「项目的里程碑时间点？」 → 应命中文档里的时间。
4. 提问 1 个文档外问题，例如：「我们公司的报销流程是什么？」 → 应返回「非常抱歉，这个问题暂时没有录入到知识库中。」而非编造。

**练习验收要点**：
- 3 个文档内问题都能答对，且答案能对应到文档具体段落。
- 1 个文档外问题被成功拦截（返回「未录入」），而不是一本正经地胡说。
- 能说出自己走通了六环节中的哪几环（建库三环节 + 问答三环节）。

---

## 四、自测题答案

**① RAG 流程的 6 个环节？**

答：**加载 → 分割 → 向量化 → 存储 → 检索 → 生成**。前四步（加载、分割、向量化、存储）属于「离线建库」，把文档变成向量存进向量库；后两步（检索、生成）属于「在线问答」，把用户问题向量化后检索最相关片段，再交给大模型生成答案。

**② RAG 和微调各自适用什么场景？**

答：RAG 不改模型参数，靠外挂知识库「现查现用」，适合知识经常更新、需要溯源、预算有限的场景；微调是重新调整模型参数、让知识内化，适合知识稳定、需要深度掌握专有风格或术语的场景，但成本高、更新要重训。二者可组合使用。

**③ 召回率低应该优化哪一环？**

答：优先优化「检索」环节（Query 查询）：检查 embedding 模型是否选对（中文场景误用英文模型是常见原因）、chunk 切分是否合理（太碎或太大都影响命中）、以及问题是否需要 Rewrite 重写（口语化、指代不清的问题要先改写再检索）。Reranker 重排序解决的是排序精度问题，不能提升召回率。

---

## 五、常见坑位提醒

1. **embedding 模型没拉**：跑起来报找不到 `shaw/dmeta-embedding-zh`。先 `ollama pull shaw/dmeta-embedding-zh`，并用 `ollama list` 确认。
2. **中文场景误用英文 embedding**：用英文模型给中文文档做向量化，检索效果会明显变差。中文务必用 `shaw/dmeta-embedding-zh` / `text2vec-large-chinese` / `bge-m3` 等中文友好模型。
3. **`langchain-text-splitters` 未安装**：`from langchain_text_splitters import RecursiveCharacterTextSplitter` 报 ModuleNotFoundError。LangChain 0.3 把分割器拆成独立包，需 `pip install langchain-text-splitters`（本讲 requirements 已补上）。
4. **Ollama 服务未启动**：连接 `127.0.0.1:11434` 失败。先 `ollama serve`。
5. **`StreamlitCallbackHandler` 导入路径**：不同版本路径不同（`langchain_community.callbacks` 或 `langchain.callbacks`）。报 ImportError 时，先试 `from langchain_community.callbacks import StreamlitCallbackHandler`。
6. **`st.chat_message` 双参数写法已废弃**：老教程常见 `st.chat_message(role, content)`，新版 Streamlit 请用 `st.chat_message(role).write(content)`，否则可能报错或不渲染。
7. **上传文件后无反应**：检查 `tempfile.TemporaryDirectory(dir=r"/tmp")` 在 Windows 上 `/tmp` 目录不存在，需改成 `tempfile.gettempdir()` 或系统临时目录。
8. **chunk 切分不合理导致答非所问**：chunk_size 太小会把完整意思切断，太大又会塞进无关内容。1000 字符 + 200 重叠是常见起点，可按文档类型微调。
9. **Agent 输出格式偶发乱**：模型没按 `思考/动作` 格式返回时 Agent 会解析失败，此时 `handle_parsing_errors` 会把错误回传给模型重试；若频繁失败，换更强的对话模型（如 deepseek-v4-flash 更大版本或云 API）。
10. **文档外问题没被拦截**：说明 instruction 约束没生效或模型不听话。可强化指令措辞，或在代码层做二次校验（检索结果相似度低于阈值时直接返回「未收录」，不交给模型）。
