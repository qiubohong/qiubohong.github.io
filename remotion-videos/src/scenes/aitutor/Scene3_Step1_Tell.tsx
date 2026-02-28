import React from "react";
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
};

const CHAT_SHOW_START = 85;

const USER_MSG1 = "请你帮我写一份 10 分钟的演讲稿，主题是「人工智能的发展简史」，讲清楚几个关键节点和代表人物，语言通俗易懂，让完全不懂技术的人也能听懂。";
const AI_MSG1 = "✅ 好的！以下是您的专属演讲稿：\n\n📌 角色：科普演讲者\n👥 听众：技术小白\n⏱️ 时长：10 分钟\n\n「从图灵到 ChatGPT，AI 的 70 年传奇...」";

const USER_MSG2 = "我最近对中医养生感兴趣，但没时间看书。你给我讲个 15 分钟的小课，从最基础的开始。";
const AI_MSG2 = "🌿 中医养生 15 分钟微课\n\n第一讲：阴阳平衡——身体的总开关\n第二讲：五脏六腑——你的内部团队\n第三讲：经络穴位——身体的高速公路...";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.4) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const ATScene3_Step1_Tell: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 左侧要素卡片
    const elemOpacities = [0, 1, 2, 3].map(i =>
        interpolate(frame, [20 + i * 16, 42 + i * 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const elemScales = [0, 1, 2, 3].map(i =>
        interpolate(frame, [20 + i * 16, 42 + i * 16], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 右侧对话框展开
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 480], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 第一轮对话
    const u1Spring = spring({ frame: frame - 115, fps, config: { damping: 20, stiffness: 200 } });
    const u1Y = interpolate(u1Spring, [0, 1], [30, 0]);
    const u1Opacity = interpolate(frame, [115, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const a1Spring = spring({ frame: frame - 195, fps, config: { damping: 20, stiffness: 200 } });
    const a1Y = interpolate(a1Spring, [0, 1], [30, 0]);
    const a1Opacity = interpolate(frame, [195, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 第二轮对话
    const u2Spring = spring({ frame: frame - 310, fps, config: { damping: 20, stiffness: 200 } });
    const u2Y = interpolate(u2Spring, [0, 1], [30, 0]);
    const u2Opacity = interpolate(frame, [310, 325], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const a2Spring = spring({ frame: frame - 380, fps, config: { damping: 20, stiffness: 200 } });
    const a2Y = interpolate(a2Spring, [0, 1], [30, 0]);
    const a2Opacity = interpolate(frame, [380, 395], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const userText1 = useTypewriter(USER_MSG1, 120, frame, 1.2);
    const aiText1 = useTypewriter(AI_MSG1, 200, frame, 1.4);
    const userText2 = useTypewriter(USER_MSG2, 315, frame, 1.4);
    const aiText2 = useTypewriter(AI_MSG2, 385, frame, 1.4);

    const elements = [
        { label: "给角色", desc: "演讲者", color: "#f0883e" },
        { label: "给背景", desc: "听众是小白", color: "#58a6ff" },
        { label: "给指令", desc: "讲清楚关键节点", color: "#3fb950" },
        { label: "给格式", desc: "10 分钟演讲稿", color: "#f778ba" },
    ];

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 36,
                overflow: "hidden",
            }}
        >
            {/* 左侧：标题 + 四要素 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    minWidth: 0,
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, opacity: titleOpacity, letterSpacing: 1 }}>
                    第一步
                </div>
                <h2
                    style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        marginBottom: 20,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                    }}
                >
                    告诉 AI 你想学什么<br />有多长时间
                </h2>

                {/* 四要素卡片 2×2 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 12,
                        width: "100%",
                    }}
                >
                    {elements.map((el, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: elemOpacities[i],
                                transform: `scale(${elemScales[i]})`,
                                background: `${el.color}12`,
                                border: `1px solid ${el.color}44`,
                                borderRadius: 14,
                                padding: "12px 14px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                            }}
                        >
                            <div style={{ fontSize: 13, color: THEME.textMuted }}>{el.label}</div>
                            <div style={{ fontSize: 16, color: el.color, fontWeight: "bold" }}>{el.desc}</div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        marginTop: 14,
                        fontSize: 14,
                        color: THEME.textMuted,
                        lineHeight: 1.6,
                        opacity: titleOpacity,
                    }}
                >
                    💡 用到了之前学过的四步提问法！
                </div>
            </div>

            {/* 右侧：AI 对话动画（从0展开） */}
            <div
                style={{
                    width: chatPanelWidth,
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    opacity: chatPanelOpacity,
                }}
            >
                {/* macOS 风格标题栏 */}
                <div
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "12px 12px 0 0",
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>🎓 AI 私教</span>
                </div>

                {/* 对话内容区 */}
                <div
                    style={{
                        background: "rgba(88,166,255,0.05)",
                        border: "1px solid rgba(88,166,255,0.15)",
                        borderTop: "none",
                        borderRadius: "0 0 12px 12px",
                        padding: "16px 14px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        minHeight: 440,
                        overflowY: "hidden",
                    }}
                >
                    {/* 第一轮：用户 */}
                    <div style={{ opacity: u1Opacity, transform: `translateY(${u1Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>你 👤</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "10px 10px 2px 10px", padding: "8px 12px", fontSize: 13, lineHeight: 1.6, maxWidth: "92%" }}>
                            {userText1}
                            {frame >= 120 && frame < 195 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第一轮：AI */}
                    <div style={{ opacity: a1Opacity, transform: `translateY(${a1Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>🤖 AI</div>
                        <div style={{ background: "rgba(63,185,80,0.12)", border: "1px solid rgba(63,185,80,0.4)", color: THEME.textSecondary, borderRadius: "10px 10px 10px 2px", padding: "8px 12px", fontSize: 13, lineHeight: 1.7, maxWidth: "92%", whiteSpace: "pre-line" }}>
                            {aiText1}
                            {frame >= 200 && frame < 310 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#3fb950", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第二轮：用户 */}
                    <div style={{ opacity: u2Opacity, transform: `translateY(${u2Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>你 👤</div>
                        <div style={{ background: THEME.accent, color: "white", borderRadius: "10px 10px 2px 10px", padding: "8px 12px", fontSize: 13, lineHeight: 1.6, maxWidth: "92%" }}>
                            {userText2}
                            {frame >= 315 && frame < 380 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>

                    {/* 第二轮：AI */}
                    <div style={{ opacity: a2Opacity, transform: `translateY(${a2Y}px)`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div style={{ fontSize: 12, color: THEME.textMuted }}>🤖 AI</div>
                        <div style={{ background: "rgba(63,185,80,0.12)", border: "1px solid rgba(63,185,80,0.4)", color: THEME.textSecondary, borderRadius: "10px 10px 10px 2px", padding: "8px 12px", fontSize: 13, lineHeight: 1.7, maxWidth: "92%", whiteSpace: "pre-line" }}>
                            {aiText2}
                            {frame >= 385 && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#3fb950", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
