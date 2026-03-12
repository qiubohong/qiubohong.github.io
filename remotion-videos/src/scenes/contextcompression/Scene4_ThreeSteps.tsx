import React from "react";
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
};

const steps = [
    {
        num: "01",
        title: "让 AI 当'榨汁机'",
        desc: "把所有资料一次性发给 AI，让它提炼精华版（压缩到原内容 10%）",
        color: "#f0883e",
    },
    {
        num: "02",
        title: "问 AI '你删掉了什么？'",
        desc: "追问被删内容，防止漏掉重要信息，像检查榨汁后的果渣",
        color: "#58a6ff",
    },
    {
        num: "03",
        title: "用压缩版开启新对话",
        desc: "新建对话窗口，先发精华版，再提问——AI 轻松消化，质量更高",
        color: "#3fb950",
    },
];

const CHAT_SHOW_START = 90;
const USER_MSG = "请详细阅读以上内容，帮我提炼压缩版。要求：保留关键事实和核心观点，压缩到原内容的10%，用清晰结构呈现。";
const AI_MSG = "✅ 已完成压缩！\n原文：10万字\n压缩版：9800字\n\n核心要点：\n• 关键决策3项\n• 重要数据5组\n• 待解决问题2个";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.5) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const CCScene4_ThreeSteps: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const stepOpacities = steps.map((_, i) =>
        interpolate(frame, [25 + i * 22, 50 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const stepYs = steps.map((_, i) =>
        interpolate(frame, [25 + i * 22, 50 + i * 22], [30, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 右侧对话框展开动画
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 480], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 用户气泡：frame 120
    const u1Spring = spring({ frame: frame - 120, fps, config: { damping: 20, stiffness: 200 } });
    const u1Y = interpolate(u1Spring, [0, 1], [30, 0]);
    const u1Opacity = interpolate(frame, [120, 138], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // AI 气泡：frame 185
    const a1Spring = spring({ frame: frame - 185, fps, config: { damping: 20, stiffness: 200 } });
    const a1Y = interpolate(a1Spring, [0, 1], [30, 0]);
    const a1Opacity = interpolate(frame, [185, 203], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const userText = useTypewriter(USER_MSG, 125, frame, 1.6);
    const aiText = useTypewriter(AI_MSG, 190, frame, 1.4);

    const tipOpacity = interpolate(frame, [300, 325], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
            {/* 左侧：标题 + 三步骤 */}
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
                    三步搞定上下文压缩
                </div>
                <h2
                    style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        marginBottom: 28,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                    }}
                >
                    让 AI 帮你做"知识浓缩"
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            style={{
                                background: THEME.cardBg,
                                borderRadius: 16,
                                padding: "16px 20px",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                                opacity: stepOpacities[i],
                                transform: `translateY(${stepYs[i]}px)`,
                                borderLeft: `5px solid ${step.color}`,
                            }}
                        >
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    background: `${step.color}22`,
                                    border: `2px solid ${step.color}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: step.color,
                                    flexShrink: 0,
                                }}
                            >
                                {step.num}
                            </div>
                            <div>
                                <div style={{ fontSize: 20, fontWeight: "bold", color: step.color, marginBottom: 4 }}>
                                    {step.title}
                                </div>
                                <div style={{ fontSize: 15, color: THEME.textMuted, lineHeight: 1.5 }}>
                                    {step.desc}
                                </div>
                            </div>
                        </div>
                    ))}
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
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>🧃 上下文压缩模式</span>
                </div>

                {/* 对话内容区 */}
                <div
                    style={{
                        background: "rgba(88,166,255,0.05)",
                        border: "1px solid rgba(88,166,255,0.15)",
                        borderTop: "none",
                        borderRadius: "0 0 12px 12px",
                        padding: "20px 16px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        minHeight: 380,
                    }}
                >
                    {/* 用户气泡 */}
                    <div
                        style={{
                            opacity: u1Opacity,
                            transform: `translateY(${u1Y}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>你 👤</div>
                        <div
                            style={{
                                background: THEME.accent,
                                color: "white",
                                borderRadius: "12px 12px 2px 12px",
                                padding: "10px 14px",
                                fontSize: 14,
                                lineHeight: 1.6,
                                maxWidth: "92%",
                            }}
                        >
                            {userText}
                            {frame >= 125 && frame < 185 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>

                    {/* AI 气泡 */}
                    <div
                        style={{
                            opacity: a1Opacity,
                            transform: `translateY(${a1Y}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted }}>🤖 AI</div>
                        <div
                            style={{
                                background: "rgba(63,185,80,0.12)",
                                border: "1px solid rgba(63,185,80,0.4)",
                                color: THEME.textSecondary,
                                borderRadius: "12px 12px 12px 2px",
                                padding: "10px 14px",
                                fontSize: 14,
                                lineHeight: 1.8,
                                maxWidth: "92%",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {aiText}
                            {frame >= 190 && frame < 310 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "#3fb950", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>
                </div>

                {/* 底部提示 */}
                <div
                    style={{
                        opacity: tipOpacity,
                        textAlign: "center",
                        fontSize: 15,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                        marginTop: 12,
                    }}
                >
                    💡 精华版出炉！AI 轻松消化，回答质量大幅提升！
                </div>
            </div>
        </div>
    );
};
