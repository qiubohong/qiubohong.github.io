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
        title: "给 AI 一个'坏人'身份",
        desc: "用提示词让 AI 扮演'魔鬼代言人'，专门挑你的毛病",
        color: "#f0883e",
    },
    {
        num: "02",
        title: "让它'拆到根上'",
        desc: "用第一性原理，把批评拆解到最底层，找到问题根源",
        color: "#58a6ff",
    },
    {
        num: "03",
        title: "把有用的'骂'沉淀下来",
        desc: "把洞见更新到大师提示词里，变成永久的思维习惯",
        color: "#3fb950",
    },
];

const CHAT_SHOW_START = 90;
const USER_MSG = "请你扮演一个'魔鬼代言人'。我想开个奶茶店，请从最刁钻的角度质疑我。";
const AI_MSG = "🔥 好的，开始挑战：\n• 你有餐饮行业经验吗？\n• 调研过周边竞争对手吗？\n• 启动资金够撑过前三个月吗？\n• 你真的了解用户为什么买奶茶？";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.5) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const DAScene3_ThreeSteps: React.FC = () => {
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
    const userBubbleSpring = spring({ frame: frame - 120, fps, config: { damping: 20, stiffness: 200 } });
    const userBubbleY = interpolate(userBubbleSpring, [0, 1], [30, 0]);
    const userBubbleOpacity = interpolate(frame, [120, 138], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // AI 气泡：frame 175
    const aiBubbleSpring = spring({ frame: frame - 175, fps, config: { damping: 20, stiffness: 200 } });
    const aiBubbleY = interpolate(aiBubbleSpring, [0, 1], [30, 0]);
    const aiBubbleOpacity = interpolate(frame, [175, 193], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const userText = useTypewriter(USER_MSG, 125, frame, 1.8);
    const aiText = useTypewriter(AI_MSG, 180, frame, 1.5);

    const tipOpacity = interpolate(frame, [280, 305], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
                    三步拥有"敢说真话"的 AI
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
                    让 AI 变成你的私人批评家
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
                                <div style={{ fontSize: 16, color: THEME.textMuted, lineHeight: 1.5 }}>
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
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>😈 魔鬼代言人模式</span>
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
                        minHeight: 360,
                    }}
                >
                    {/* 用户气泡 */}
                    <div
                        style={{
                            opacity: userBubbleOpacity,
                            transform: `translateY(${userBubbleY}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                            <span>你</span>
                            <span style={{ width: 22, height: 22, borderRadius: "50%", background: THEME.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>👤</span>
                        </div>
                        <div
                            style={{
                                background: THEME.accent,
                                color: "white",
                                borderRadius: "12px 12px 2px 12px",
                                padding: "10px 14px",
                                fontSize: 15,
                                lineHeight: 1.6,
                                maxWidth: "90%",
                            }}
                        >
                            {userText}
                            {frame >= 125 && frame < 175 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>

                    {/* AI 气泡 */}
                    <div
                        style={{
                            opacity: aiBubbleOpacity,
                            transform: `translateY(${aiBubbleY}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#58a6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>😈</span>
                            <span>魔鬼 AI</span>
                        </div>
                        <div
                            style={{
                                background: "rgba(240,136,62,0.12)",
                                border: "1px solid rgba(240,136,62,0.4)",
                                color: THEME.textSecondary,
                                borderRadius: "12px 12px 12px 2px",
                                padding: "10px 14px",
                                fontSize: 15,
                                lineHeight: 1.8,
                                maxWidth: "90%",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {aiText}
                            {frame >= 180 && frame < 290 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: THEME.accent, marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
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
                    💡 被逼问的感觉，就是成长的感觉！
                </div>
            </div>
        </div>
    );
};
