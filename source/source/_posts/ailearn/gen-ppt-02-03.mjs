// AI从零开始系列 PPT 生成脚本（第2讲环境与部署 + 第3讲Prompt工程）
// 视觉风格：深海军蓝主色 + 冰蓝辅色 + 琥珀橙强调（60-30-10）
import pptxgen from "/Users/borfyqiu/.workbuddy/binaries/node/workspace/node_modules/pptxgenjs/dist/pptxgen.cjs.js";
import path from "node:path";

const OUT = "/Users/borfyqiu/Desktop/study/self/qiubohong.github.io/source/source/_posts/ailearn";

// ===== 设计令牌 =====
const C = {
  dark: "16263F",
  navy: "1E3A5F",
  ice: "DCE7F5",
  accent: "FF9F1C",
  white: "FFFFFF",
  text: "1B2733",
  muted: "5B6B7A",
  teal: "22D3EE",
  bg: "F5F7FA",
  green: "2E8B57",
};
const FONT = "Microsoft YaHei";

function makePpt() {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
  pptx.layout = "WIDE";
  return pptx;
}

// ===== 通用组件（对象参数 ≤3，符合 lint） =====
function addHeader(s, opts) {
  const { kicker, title, pageNum, total } = opts;
  s.addText(kicker, { x: 0.55, y: 0.3, w: 8, h: 0.3, fontSize: 11, color: C.accent, bold: true, charSpacing: 2, fontFace: FONT });
  s.addText(title, { x: 0.55, y: 0.62, w: 12.2, h: 0.85, fontSize: 26, bold: true, color: C.dark, fontFace: FONT });
  s.addShape("rect", { x: 0.55, y: 1.5, w: 0.7, h: 0.06, fill: { color: C.teal } });
  s.addText(`${pageNum} / ${total}`, { x: 12.2, y: 7.05, w: 0.9, h: 0.3, fontSize: 10, color: C.muted, align: "right", fontFace: FONT });
}
function addFooter(s, note) {
  s.addText(note || "AI 从零开始 · Qborfy", { x: 0.55, y: 7.05, w: 6, h: 0.3, fontSize: 9, color: C.muted, fontFace: FONT });
}
function addCard(s, opts) {
  const { x, y, w, h, fill } = opts;
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.06, fill: { color: fill || C.ice }, line: { color: C.white, width: 0 } });
}
function addChip(s, opts) {
  const { x, y, text, fill } = opts;
  s.addShape("roundRect", { x, y, w: text.length * 0.22 + 0.5, h: 0.36, rectRadius: 0.18, fill: { color: fill || C.teal } });
  s.addText(text, { x, y, w: text.length * 0.22 + 0.5, h: 0.36, fontSize: 12, color: C.white, bold: true, align: "center", fontFace: FONT, valign: "middle" });
}
function cover(s, kick, title, sub, meta) {
  s.background = { color: C.dark };
  s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.1, fill: { color: C.accent } });
  s.addText(kick, { x: 0.9, y: 1.2, w: 8, h: 0.4, fontSize: 16, color: C.teal, fontFace: FONT });
  s.addText(title, { x: 0.9, y: 1.8, w: 11.5, h: 1.2, fontSize: 46, bold: true, color: C.white, fontFace: FONT });
  if (sub) s.addText(sub, { x: 0.9, y: 3.2, w: 11.5, h: 0.6, fontSize: 19, color: C.ice, fontFace: FONT });
  s.addShape("rect", { x: 0.9, y: 4.1, w: 3.2, h: 0.05, fill: { color: C.accent } });
  if (meta) s.addText(meta, { x: 0.9, y: 4.5, w: 11, h: 0.5, fontSize: 15, color: C.ice, fontFace: FONT });
  s.addText("Qborfy · 做一个有温度和有干货的技术分享作者", { x: 0.9, y: 6.5, w: 11, h: 0.4, fontSize: 13, color: C.muted, fontFace: FONT });
}

// =====================================================
// 第 2 讲：环境准备与本地大模型部署（12 页）
// =====================================================
function buildLesson2() {
  const pptx = makePpt();
  const TOTAL = 12;

  // P1 封面
  let s = pptx.addSlide();
  cover(s, "AI 从零开始 · 第 2 讲", "环境准备与本地大模型部署",
    "在本地跑起属于自己的 AI：免费、可控、数据不出门", "学完能独立完成 Python 环境 + Ollama 部署 + Dify 对话");

  // P2 为什么要本地模型
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "WHY LOCAL", title: "为什么需要本地大模型：免费、可控、隐私", pageNum: 2, total: TOTAL });
  const why = [
    ["免费", "不按 API 计费\n调用次数无限制", C.teal],
    ["可控", "自己掌控模型与调用\n不受厂商限流", C.navy],
    ["隐私", "数据不出门\n企业敏感信息更安全", C.accent],
  ];
  why.forEach((w, i) => {
    const x = 0.55 + i * 4.25;
    addCard(s, { x, y: 1.9, w: 3.95, h: 3.2, fill: C.white });
    s.addShape("circle", { x: x + 0.25, y: 2.15, w: 0.6, h: 0.6, fill: { color: w[2] } });
    s.addText(w[0], { x: x + 1.0, y: 2.2, w: 2.8, h: 0.5, fontSize: 18, bold: true, color: C.dark, fontFace: FONT });
    s.addText(w[1], { x: x + 0.25, y: 2.95, w: 3.45, h: 1.6, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 24 });
  });
  addCard(s, { x: 0.55, y: 5.4, w: 12.25, h: 1.1, fill: C.ice });
  s.addText("云 API 也要了解：DeepSeek V4-Flash 官方 API 仅 $0.14 / 百万 input token", { x: 0.85, y: 5.65, w: 11.7, h: 0.5, fontSize: 15, bold: true, color: C.navy, fontFace: FONT });
  addFooter(s, "素材：ai-learn02.md");

  // P3 环境准备总览
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "SETUP", title: "环境准备四件套：Python → PyTorch → HF → LC", pageNum: 3, total: TOTAL });
  const envs = [
    ["Python", "Anaconda 发行版\nconda 管理环境", "C:\n基础"],
    ["PyTorch", "深度学习框架\n本地推理依赖", "推理\n引擎"],
    ["Transformers", "Hugging Face 库\n加载预训练模型", "模型\n入口"],
    ["LangChain", "LLM 应用框架\n后续实战主力", "应用\n框架"],
  ];
  envs.forEach((e, i) => {
    const x = 0.55 + i * 3.2;
    addCard(s, { x, y: 1.9, w: 2.85, h: 3.0, fill: C.white });
    s.addText(e[0], { x: x + 0.2, y: 2.15, w: 2.4, h: 0.5, fontSize: 17, bold: true, color: C.dark, fontFace: FONT });
    s.addText(e[1], { x: x + 0.2, y: 2.75, w: 2.45, h: 1.2, fontSize: 12, color: C.text, fontFace: FONT, lineSpacing: 20 });
    s.addText(e[2], { x: x + 0.2, y: 4.1, w: 2.45, h: 0.6, fontSize: 12, bold: true, color: C.teal, fontFace: FONT });
    if (i < 3) s.addText("→", { x: x + 2.8, y: 2.9, w: 0.5, h: 0.6, fontSize: 24, bold: true, color: C.accent, fontFace: FONT });
  });
  s.addText("小白提示：建议用 Anaconda 统一管理，避免环境冲突", { x: 0.55, y: 5.3, w: 12, h: 0.4, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s, "素材：ai-learn01.md");

  // P4 安装 Python
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "PYTHON", title: "安装 Python：官网直装 or Anaconda（推荐）", pageNum: 4, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 6.0, h: 3.3, fill: C.white });
  s.addText("方式一：官网直装", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("• python.org 下载安装包\n• 勾选 Add to PATH\n• 验证：python --version", { x: 0.85, y: 2.6, w: 5.3, h: 1.6, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 6.85, y: 1.85, w: 5.95, h: 3.3, fill: C.dark });
  s.addText("方式二：Anaconda（推荐）", { x: 7.15, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.white, fontFace: FONT });
  s.addText("• 国内用清华源下载\n• 内置 conda 环境管理\n• 方便切换 Python 版本\n\n安装：bash Anaconda3-xxx.sh", { x: 7.15, y: 2.6, w: 5.3, h: 2.2, fontSize: 14, color: C.ice, fontFace: FONT, lineSpacing: 26 });
  s.addText("环境管理是新手第一课：一个项目一个环境，互不污染", { x: 0.55, y: 5.4, w: 12.25, h: 0.5, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s);

  // P5 安装深度学习库
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "LIBRARIES", title: "安装深度学习库：PyTorch + Transformers + LC", pageNum: 5, total: TOTAL });
  const libs = [
    ["PyTorch", "conda install pytorch torchvision cudatoolkit", "深度学习框架"],
    ["Transformers", "pip install transformers", "Hugging Face 模型库"],
    ["LangChain", "pip install langchain", "LLM 应用框架"],
  ];
  libs.forEach((l, i) => {
    const y = 1.9 + i * 1.5;
    addCard(s, { x: 0.55, y, w: 12.25, h: 1.3, fill: C.white });
    s.addText(l[0], { x: 0.85, y: y + 0.15, w: 2.6, h: 0.4, fontSize: 17, bold: true, color: C.dark, fontFace: FONT });
    s.addText(l[1], { x: 3.6, y: y + 0.15, w: 8.5, h: 0.4, fontSize: 12.5, color: C.teal, fontFace: FONT });
    s.addText(l[2], { x: 0.85, y: y + 0.7, w: 11, h: 0.4, fontSize: 12, color: C.muted, fontFace: FONT });
  });
  s.addText("验证安装：python -c \"import torch; print(torch.__version__)\"", { x: 0.55, y: 6.55, w: 12, h: 0.4, fontSize: 13, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s);

  // P6 认识 DeepSeek V4-Flash
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "DEEPSEEK V4-FLASH", title: "认识 DeepSeek V4-Flash：2026 开源旗舰", pageNum: 6, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 6.0, h: 3.5, fill: C.white });
  s.addText("核心规格", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("• 284B 总参 / 13B 激活（MoE）\n• 1M 上下文（百万级）\n• MIT 开源协议\n• FP4+FP8 混合量化\n• 双协议 API（OpenAI + Anthropic）", { x: 0.85, y: 2.6, w: 5.3, h: 2.5, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 28 });
  addCard(s, { x: 6.85, y: 1.85, w: 5.95, h: 3.5, fill: C.dark });
  s.addText("为什么选它", { x: 7.15, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.white, fontFace: FONT });
  s.addText("• 开源：免费使用 + 可改\n• 1M 上下文：整本书丢进去\n• 算力消耗仅前代 27%\n• 小参数反超大参数（DeepSWE 54.4）\n• 适配昇腾等国产芯片", { x: 7.15, y: 2.6, w: 5.3, h: 2.5, fontSize: 14, color: C.ice, fontFace: FONT, lineSpacing: 28 });
  s.addText("2026-07-31 发布正式版 · 价格 $0.14/百万 input token", { x: 0.55, y: 5.6, w: 12.25, h: 0.5, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s, "数据来源：DeepSeek 官方 / deepseek/1.md");

  // P7 模型演进与知识蒸馏
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "EVOLUTION", title: "模型演进：R1 → V3 → V4-Flash，蒸馏是捷径", pageNum: 7, total: TOTAL });
  const evo = [
    ["R1", "2025.01", "思维链推理\n对标 OpenAI o1"],
    ["V3", "2025.11", "MoE 架构\n671B/37B 激活"],
    ["V4-Flash", "2026.07", "小参数反超\n1M 上下文"],
  ];
  evo.forEach((e, i) => {
    const x = 0.55 + i * 4.25;
    addCard(s, { x, y: 1.9, w: 3.95, h: 2.6, fill: C.white });
    s.addText(e[0], { x: x + 0.25, y: 2.1, w: 2.5, h: 0.5, fontSize: 19, bold: true, color: C.dark, fontFace: FONT });
    s.addText(e[1], { x: x + 0.25, y: 2.65, w: 2.5, h: 0.4, fontSize: 13, bold: true, color: C.teal, fontFace: FONT });
    s.addText(e[2], { x: x + 0.25, y: 3.2, w: 3.4, h: 1.2, fontSize: 13, color: C.text, fontFace: FONT, lineSpacing: 22 });
    if (i < 2) s.addText("→", { x: x + 3.85, y: 2.8, w: 0.5, h: 0.6, fontSize: 24, bold: true, color: C.accent, fontFace: FONT });
  });
  addCard(s, { x: 0.55, y: 4.8, w: 12.25, h: 1.5, fill: C.ice });
  s.addText("知识蒸馏 = 「老师教学生」", { x: 0.85, y: 5.0, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("大模型（老师）训练出小模型（学生），小模型继承能力、降低硬件门槛——普通用户也能本地跑", { x: 0.85, y: 5.5, w: 11.6, h: 0.6, fontSize: 13, color: C.text, fontFace: FONT, lineSpacing: 20 });
  addFooter(s);

  // P8 硬件要求
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "HARDWARE", title: "硬件要求：4bit 量化可本地跑，入门别焦虑", pageNum: 8, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 6.0, h: 3.4, fill: C.white });
  s.addText("V4-Flash 本地部署", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("• 4bit 量化：约 24GB+ 显存\n  或 70GB 内存（Ollama 支持）\n• 服务器级 GPU（2 张起）\n• 消费级显卡可降级小模型", { x: 0.85, y: 2.6, w: 5.3, h: 2.2, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 6.85, y: 1.85, w: 5.95, h: 3.4, fill: C.dark });
  s.addText("入门最低配置", { x: 7.15, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.white, fontFace: FONT });
  s.addText("• Windows：GTX 1650 4GB\n  + 16GB 内存\n• Mac：M2 8GB 内存起\n• 不够用：云 API 兜底", { x: 7.15, y: 2.6, w: 5.3, h: 2.2, fontSize: 13.5, color: C.ice, fontFace: FONT, lineSpacing: 24 });
  addCard(s, { x: 0.55, y: 5.5, w: 12.25, h: 0.9, fill: C.ice });
  s.addText("策略：本地 4bit 练手 + 云 API 兜底——双轨并行，成本最低", { x: 0.85, y: 5.72, w: 11.7, h: 0.5, fontSize: 15, bold: true, color: C.navy, fontFace: FONT });
  addFooter(s);

  // P9 安装 Ollama
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "OLLAMA", title: "安装 Ollama：像 Docker 一样拉取模型", pageNum: 9, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 12.25, h: 2.2, fill: C.white });
  s.addText("Ollama 是什么", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("开源的本地大模型运行框架（Go 开发）· 类 Docker 的命令风格（list / pull / push / run）\n一条命令拉模型、一条命令跑模型，本地部署的门槛降到最低", { x: 0.85, y: 2.55, w: 11.5, h: 1.2, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 0.55, y: 4.3, w: 12.25, h: 2.0, fill: C.dark });
  s.addText("安装命令", { x: 0.85, y: 4.5, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.white, fontFace: FONT });
  s.addText("curl -fsSL https://ollama.com/install.sh | sh\nollama pull deepseek-v4-flash        # 拉取模型（可加 :4bit）", { x: 0.85, y: 5.0, w: 11.6, h: 0.9, fontSize: 15, color: C.teal, fontFace: FONT, lineSpacing: 26 });
  addFooter(s, "素材：ai-learn02.md");

  // P10 部署与启动
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "RUN", title: "启动服务与验证：curl 一发，模型响应", pageNum: 10, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 12.25, h: 2.3, fill: C.white });
  s.addText("三步启动", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("① ollama serve            # 启动 API 服务（端口 11434）\n② ollama run deepseek-v4-flash   # 命令行对话\n③ curl 验证 API", { x: 0.85, y: 2.6, w: 11.5, h: 1.3, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 0.55, y: 4.4, w: 12.25, h: 2.0, fill: C.dark });
  s.addText("curl 验证命令", { x: 0.85, y: 4.6, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.white, fontFace: FONT });
  s.addText("curl http://localhost:11434/api/generate \\\n  -d '{\"model\":\"deepseek-v4-flash\",\n       \"prompt\":\"为什么天空是蓝色的？\"}'", { x: 0.85, y: 5.05, w: 11.6, h: 1.2, fontSize: 12, color: C.teal, fontFace: FONT, lineSpacing: 22 });
  addFooter(s);

  // P11 局域网开放 + Dify
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "NETWORK + UI", title: "局域网开放 & Dify 可视化对话", pageNum: 11, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 5.95, h: 3.6, fill: C.white });
  s.addText("局域网开放", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("• 编辑 ollama.service\n• 设置 OLLAMA_HOST=0.0.0.0:11434\n• systemctl restart ollama\n\n其他机器即可访问你的模型服务", { x: 0.85, y: 2.6, w: 5.2, h: 2.4, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 6.8, y: 1.85, w: 6.0, h: 3.6, fill: C.dark });
  s.addText("Dify 可视化", { x: 7.1, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.white, fontFace: FONT });
  s.addText("• docker-compose 部署 Dify\n• 配置模型供应商（Ollama）\n• 创建聊天助手应用\n• 接入 V4-Flash 开始对话\n\n告别命令行，网页聊天", { x: 7.1, y: 2.6, w: 5.3, h: 2.5, fontSize: 14, color: C.ice, fontFace: FONT, lineSpacing: 26 });
  addFooter(s, "素材：ai-learn02.md");

  // P12 本地 vs 云 API + 练习
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "CHOICE + PRACTICE", title: "本地 vs 云 API：双轨策略，动手开跑", pageNum: 12, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 6.0, h: 2.3, fill: C.white });
  s.addText("本地 Ollama", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("✅ 免费无限 · 数据不出门\n⚠️ 吃硬件 · 需 24GB+ 显存", { x: 0.85, y: 2.6, w: 5.3, h: 1.2, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 6.85, y: 1.85, w: 5.95, h: 2.3, fill: C.dark });
  s.addText("云 API", { x: 7.15, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.white, fontFace: FONT });
  s.addText("✅ 免部署 · $0.14/M 成本低\n⚠️ 数据出境 · 按量计费", { x: 7.15, y: 2.6, w: 5.3, h: 1.2, fontSize: 14, color: C.ice, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 0.55, y: 4.4, w: 12.25, h: 2.0, fill: C.ice });
  s.addText("动手练习", { x: 0.85, y: 4.6, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.navy, fontFace: FONT });
  s.addText("① 装好 Python 环境 → ② Ollama 拉取 V4-Flash（或降级小模型）→ ③ Dify 里对话，截图存档", { x: 0.85, y: 5.05, w: 11.6, h: 0.6, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 24 });
  addFooter(s, "自测：V4-Flash 参数特点？Ollama 与 Docker 类比？本地 vs 云 API 适用场景？");

  return pptx.writeFile({ fileName: path.join(OUT, "AI从零开始-第02讲-环境准备与本地大模型部署.pptx") });
}

// =====================================================
// 第 3 讲：Prompt 提示语工程（11 页）
// =====================================================
function buildLesson3() {
  const pptx = makePpt();
  const TOTAL = 11;

  // P1 封面
  let s = pptx.addSlide();
  cover(s, "AI 从零开始 · 第 3 讲", "Prompt 提示语工程",
    "让 AI 一次就懂你的意思：五大要素 + 实战", "学完能用五要素写出结构化 Prompt，独立设计生成类应用");

  // P2 Prompt 是什么
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "WHAT IS PROMPT", title: "Prompt：给模型的工作说明书，五要素缺一不可", pageNum: 2, total: TOTAL });
  const elems = [
    ["① 角色", "AI 扮演什么身份\n（医生 / 老师 / 工程师）"],
    ["② 上下文", "背景与对话历史\n（给足信息）"],
    ["③ 指令", "具体要做什么\n（动词先行）"],
    ["④ 范例", "给一个示例\n（临摹字帖）"],
    ["⑤ 输出格式", "结果长什么样\n（表格 / JSON / 列表）"],
  ];
  elems.forEach((e, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.55 + col * 4.25;
    const y = 1.9 + row * 1.8;
    addCard(s, { x, y, w: 3.95, h: 1.6, fill: C.white });
    s.addText(e[0], { x: x + 0.25, y: y + 0.15, w: 3.3, h: 0.4, fontSize: 17, bold: true, color: C.teal, fontFace: FONT });
    s.addText(e[1], { x: x + 0.25, y: y + 0.65, w: 3.4, h: 0.9, fontSize: 12.5, color: C.text, fontFace: FONT, lineSpacing: 20 });
  });
  addCard(s, { x: 0.55, y: 5.6, w: 12.25, h: 0.9, fill: C.ice });
  s.addText("五要素组合拳 → 结构化 Prompt → 稳定高质量输出", { x: 0.85, y: 5.82, w: 11.7, h: 0.5, fontSize: 15, bold: true, color: C.navy, fontFace: FONT });
  addFooter(s, "素材：ai-learn03.md");

  // P3 要素① 角色
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "ELEMENT 1 · ROLE", title: "角色：给 AI 戴上职业帽子，输出立刻不一样", pageNum: 3, total: TOTAL });
  const roles = [
    ["专业型", "❌「告诉我如何减肥」\n✅「作为营养学教授，为 BMI 超标上班族制定减重方案」"],
    ["创意型", "❌「写一首诗」\n✅「模仿李白浪漫主义风格，以『人工智能与月亮』为题写七言绝句」"],
    ["中介型", "❌「教孩子刷牙」\n✅「你是一只爱干净的卡通兔子，用儿歌教 3 岁小朋友刷牙」"],
  ];
  roles.forEach((r, i) => {
    const y = 1.9 + i * 1.6;
    addCard(s, { x: 0.55, y, w: 12.25, h: 1.4, fill: C.white });
    addChip(s, { x: 0.75, y: y + 0.15, text: r[0], fill: [C.teal, C.navy, C.accent][i] });
    s.addText(r[1], { x: 2.6, y: y + 0.12, w: 10.0, h: 1.1, fontSize: 12.5, color: C.text, fontFace: FONT, lineSpacing: 22 });
  });
  s.addText("进阶：多重角色协作（编剧+影评人）、反向角色训练（让学生当老师）", { x: 0.55, y: 6.55, w: 12, h: 0.4, fontSize: 13, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s);

  // P4 要素② 上下文
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "ELEMENT 2 · CONTEXT", title: "上下文：给足背景，AI 才不会答非所问", pageNum: 4, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 6.0, h: 3.3, fill: C.white });
  s.addText("单次提问给背景", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("❌「这段话翻译成英文」\n✅「这是医疗器械说明书的技术参数，请用专业\n学术英语翻译，保留术语缩写：[原文]」", { x: 0.85, y: 2.6, w: 5.3, h: 2.2, fontSize: 12.5, color: C.text, fontFace: FONT, lineSpacing: 24 });
  addCard(s, { x: 6.85, y: 1.85, w: 5.95, h: 3.3, fill: C.white });
  s.addText("多轮对话延续", { x: 7.15, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("第一轮：帮我改辞职信语气温和些\n第二轮：结尾加一句感谢，口语化替换「个人职业规划」\n→ AI 基于前文调整，而非重新生成", { x: 7.15, y: 2.6, w: 5.3, h: 2.2, fontSize: 13, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 0.55, y: 5.4, w: 12.25, h: 0.95, fill: C.ice });
  s.addText("两大误区：信息过载（堆无关细节）· 断层跳跃（突然换话题不重置）", { x: 0.85, y: 5.62, w: 11.7, h: 0.5, fontSize: 14, bold: true, color: C.navy, fontFace: FONT });
  addFooter(s);

  // P5 要素③ 指令
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "ELEMENT 3 · TASK", title: "指令：动词先行 + 结果导向，别让 AI 猜", pageNum: 5, total: TOTAL });
  const tasks = [
    ["笼统", "「关于气候变化的数据」", "「对比近十年全球碳排放趋势，用柱状图展示，标注主要国家增减」"],
    ["多指令混杂", "「总结这本书并推荐类似的再写书评」", "①三句话概括核心观点 ②推荐 3 本同类 ③200 字幽默短评"],
    ["约束绑定", "「讲区块链」", "「用小学生能懂的比喻讲区块链，不超过 100 字」"],
  ];
  tasks.forEach((t, i) => {
    const y = 1.85 + i * 1.6;
    addCard(s, { x: 0.55, y, w: 12.25, h: 1.4, fill: C.white });
    addChip(s, { x: 0.75, y: y + 0.15, text: t[0], fill: i === 1 ? C.accent : C.teal });
    s.addText(`❌ ${t[1]}`, { x: 2.6, y: y + 0.12, w: 10.0, h: 0.55, fontSize: 12.5, color: C.muted, fontFace: FONT, lineSpacing: 20 });
    s.addText(`✅ ${t[2]}`, { x: 2.6, y: y + 0.68, w: 10.0, h: 0.6, fontSize: 12.5, color: C.text, fontFace: FONT, lineSpacing: 20 });
  });
  s.addText("口诀：不要问 AI 能做什么，而是告诉它该怎么做", { x: 0.55, y: 6.55, w: 12, h: 0.4, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s);

  // P6 要素④ 范例
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "ELEMENT 4 · EXAMPLE", title: "范例：给 AI 一张「临摹字帖」，输出质量翻倍", pageNum: 6, total: TOTAL });
  const exs = [
    ["风格迁移", "「参照这张 1950 年代电影海报字体，为咖啡馆『旧时光』设计 LOGO」"],
    ["复杂格式", "「按这个参考文献格式输出：[示例模板] + 待处理文献」"],
    ["语义校准", "「仿照这段光刻技术描述的结构，写 3D 封装工艺优势：[范例]」"],
  ];
  exs.forEach((e, i) => {
    const y = 1.9 + i * 1.5;
    addCard(s, { x: 0.55, y, w: 12.25, h: 1.3, fill: C.white });
    s.addText(e[0], { x: 0.85, y: y + 0.15, w: 2.4, h: 0.4, fontSize: 16, bold: true, color: C.teal, fontFace: FONT });
    s.addText(e[1], { x: 3.4, y: y + 0.12, w: 9.2, h: 1.0, fontSize: 13, color: C.text, fontFace: FONT, lineSpacing: 22 });
  });
  addCard(s, { x: 0.55, y: 6.55 - 1.5, w: 12.25, h: 1.15, fill: C.ice });
  s.addText("技巧：正反例对比（红线）· 渐进迭代（给新范例继续改）· 跨模态引导（草图→PPT 图示）", { x: 0.85, y: 5.28, w: 11.7, h: 0.5, fontSize: 13, bold: true, color: C.navy, fontFace: FONT });
  addFooter(s);

  // P7 要素⑤ 输出格式
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "ELEMENT 5 · FORMAT", title: "输出格式：为 AI 搭好舞台框架，信息效率提升 300%", pageNum: 7, total: TOTAL });
  const fmts = [
    ["表格 / 图表", "「对比 iPhone14/15 参数，分屏幕、摄像头、电池三列」"],
    ["代码块", "「用 Python 演示线性回归预测房价，含注释和可视化」"],
    ["对话体", "「编写客服与顾客关于退换货政策的对话，至少 8 轮」"],
    ["结构化列表", "「列出 5 种记忆方法，每条含原理、步骤、耗时」"],
  ];
  fmts.forEach((f, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.55 + col * 6.25;
    const y = 1.9 + row * 1.7;
    addCard(s, { x, y, w: 5.95, h: 1.5, fill: C.white });
    s.addText(f[0], { x: x + 0.25, y: y + 0.15, w: 2.3, h: 0.4, fontSize: 16, bold: true, color: C.teal, fontFace: FONT });
    s.addText(f[1], { x: x + 0.25, y: y + 0.62, w: 5.4, h: 0.8, fontSize: 12, color: C.text, fontFace: FONT, lineSpacing: 20 });
  });
  s.addText("格式四要素：层次分明 · 留白控制 · 标记强化 · 交互适配", { x: 0.55, y: 5.6, w: 12.25, h: 0.5, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s);

  // P8 下指令四要素（加分项）
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "BONUS · 四要素", title: "下指令四要素：成功率从 30% 提到 90%+", pageNum: 8, total: TOTAL });
  const four = [
    ["做什么", "明确任务动作\n（查询 / 生成 / 整理）"],
    ["用什么材料", "指定数据来源\n（这份文档 / 这个网站）"],
    ["输出什么格式", "规定结果形态\n（表格 / 摘要 / 卡片）"],
    ["发到哪里", "指定交付位置\n（聊天 / 邮件 / 文档）"],
  ];
  four.forEach((f, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.55 + col * 6.25;
    const y = 1.9 + row * 2.1;
    addCard(s, { x, y, w: 5.95, h: 1.9, fill: C.white });
    s.addShape("circle", { x: x + 0.25, y: y + 0.2, w: 0.55, h: 0.55, fill: { color: [C.teal, C.navy, C.accent, C.green][i] } });
    s.addText(String(i + 1), { x: x + 0.25, y: y + 0.2, w: 0.55, h: 0.55, fontSize: 15, bold: true, color: C.white, align: "center", valign: "middle", fontFace: FONT });
    s.addText(f[0], { x: x + 0.95, y: y + 0.22, w: 4.5, h: 0.4, fontSize: 16, bold: true, color: C.dark, fontFace: FONT });
    s.addText(f[1], { x: x + 0.25, y: y + 0.85, w: 5.4, h: 0.9, fontSize: 13, color: C.text, fontFace: FONT, lineSpacing: 22 });
  });
  s.addText("来自 OpenClaw 实践：指令写清四要素，Agent 成功率 30% → 90%+", { x: 0.55, y: 6.3, w: 12.25, h: 0.5, fontSize: 14, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s, "素材：openclaw/04.md");

  // P9 实战：SQL 生成器
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "PRACTICE", title: "实战：五要素构建 SQL 生成器 Prompt", pageNum: 9, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 6.2, h: 4.6, fill: C.white });
  s.addText("Prompt 结构", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("【角色】专业数据库工程师\n【上下文】用户不熟表结构、函数\n【指令】解析关键词→结构映射→逻辑校验\n【范例】输入+SQL 示例\n【格式】仅返回 SQL 语句", { x: 0.85, y: 2.6, w: 5.5, h: 3.5, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 28 });
  addCard(s, { x: 7.05, y: 1.85, w: 5.75, h: 4.6, fill: C.dark });
  s.addText("用户输入", { x: 7.35, y: 2.05, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.white, fontFace: FONT });
  s.addText("「最近三个月上海地区单价超 5000 元的\n电子产品订单，按金额降序」", { x: 7.35, y: 2.55, w: 5.1, h: 1.2, fontSize: 12.5, color: C.ice, fontFace: FONT, lineSpacing: 22 });
  s.addText("模型输出", { x: 7.35, y: 3.85, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.white, fontFace: FONT });
  s.addText("SELECT o.order_id, p.product_name,\n  o.order_amount FROM orders o\nJOIN products p ...\nWHERE region='上海' AND amount>5000\nORDER BY amount DESC", { x: 7.35, y: 4.35, w: 5.1, h: 1.9, fontSize: 12, color: C.teal, fontFace: FONT, lineSpacing: 22 });
  addFooter(s, "Live Demo：本地 DeepSeek V4-Flash 演示");

  // P10 降低 AI 幻觉
  s = pptx.addSlide();
  s.background = { color: C.bg };
  addHeader(s, { kicker: "HALLUCINATION", title: "降低 AI 幻觉：让模型「不知道就说不知道」", pageNum: 10, total: TOTAL });
  addCard(s, { x: 0.55, y: 1.85, w: 6.0, h: 3.3, fill: C.white });
  s.addText("什么是 AI 幻觉", { x: 0.85, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("AI 生成看似合理但实际错误的内容\n\n本质：缺乏真实理解，基于统计模式生成的「自信错误」", { x: 0.85, y: 2.6, w: 5.3, h: 2.2, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 6.85, y: 1.85, w: 5.95, h: 3.3, fill: C.white });
  s.addText("Prompt 层怎么防", { x: 7.15, y: 2.05, w: 5, h: 0.4, fontSize: 16, bold: true, color: C.navy, fontFace: FONT });
  s.addText("• 明确「仅基于给定资料回答」\n• 要求标注「不确定」\n• 给示例约束输出\n• FewShot 示例集（预告第 4 讲）", { x: 7.15, y: 2.6, w: 5.3, h: 2.2, fontSize: 14, color: C.text, fontFace: FONT, lineSpacing: 26 });
  addCard(s, { x: 0.55, y: 5.4, w: 12.25, h: 0.95, fill: C.ice });
  s.addText("进阶防线：RAG 知识库（第 5 讲）· 评测体系（第 8 讲）", { x: 0.85, y: 5.62, w: 11.7, h: 0.5, fontSize: 14, bold: true, color: C.navy, fontFace: FONT });
  addFooter(s, "素材：ai-learn05.md");

  // P11 冷知识 & 总结
  s = pptx.addSlide();
  s.background = { color: C.dark };
  addHeader(s, { kicker: "SUMMARY", title: "总结：五要素是骨架，练习才能内化", pageNum: 11, total: TOTAL });
  s.addText("本讲核心", { x: 0.9, y: 1.7, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.teal, fontFace: FONT });
  s.addText("角色 · 上下文 · 指令 · 范例 · 输出格式", { x: 0.9, y: 2.15, w: 11.5, h: 0.6, fontSize: 26, bold: true, color: C.white, fontFace: FONT });
  s.addShape("rect", { x: 0.9, y: 3.0, w: 11.5, h: 0.05, fill: { color: C.accent } });
  s.addText("动手练习", { x: 0.9, y: 3.3, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.teal, fontFace: FONT });
  s.addText("参考 SQL 生成器，设计一个「会议纪要整理」或「周报生成」Prompt（五要素齐全）", { x: 0.9, y: 3.75, w: 11.5, h: 0.5, fontSize: 14, color: C.ice, fontFace: FONT });
  s.addText("自测 3 题", { x: 0.9, y: 4.4, w: 5, h: 0.4, fontSize: 15, bold: true, color: C.teal, fontFace: FONT });
  s.addText("① 五要素分别解决什么问题？\n② 给一段模糊 Prompt 并当场优化？\n③ 下指令四要素是什么？", { x: 0.9, y: 4.85, w: 11.5, h: 1.0, fontSize: 13, color: C.ice, fontFace: FONT, lineSpacing: 24 });
  s.addShape("rect", { x: 0.9, y: 6.1, w: 11.5, h: 0.05, fill: { color: C.accent } });
  s.addText("下一讲预告：LangChain——让 LLM 应用开发变简单", { x: 0.9, y: 6.35, w: 11.5, h: 0.5, fontSize: 15, bold: true, color: C.accent, fontFace: FONT });
  addFooter(s);

  return pptx.writeFile({ fileName: path.join(OUT, "AI从零开始-第03讲-Prompt提示语工程.pptx") });
}

// 执行
(async () => {
  await buildLesson2();
  console.log("OK: 第2讲 生成完成");
  await buildLesson3();
  console.log("OK: 第3讲 生成完成");
})().catch(e => { console.error(e); process.exit(1); });
