import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from "remotion";

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

// 打字机效果
function useTypewriter(text: string, startFrame: number, charsPerFrame = 1.5) {
    const frame = useCurrentFrame();
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

// 对比示例数据
const feedbackExamples = [
    {
        bad: "写得太平淡",
        good: "开头能不能加个吸引人的小故事？",
        color: "#f0883e",
    },
    {
        bad: "不够专业",
        good: "能不能多用一些行业术语？最后加两个数据支撑观点。",
        color: "#58a6ff",
    },
    {
        bad: "感觉不对",
        good: "语气能不能更轻松一点？像朋友聊天那种感觉，别太正式。",
        color: "#3fb950",
    },
];

// AI 对话内容
const USER_MSG = "这个结果哪里还可以改进？给我三个方向。";
const AI_MSG = "1️⃣ 开头加个故事更吸引人\n2️⃣ 多用行业术语增加专业感\n3️⃣ 语气更轻松，像朋友聊天";

// 右侧对话框展开起始帧
const CHAT_SHOW_START = 90;

export const OutputScene3_SpecificFeedback: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 三个对比卡片依次出现
    const card1Opacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const card2Opacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const card3Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const cardOpacities = [card1Opacity, card2Opacity, card3Opacity];

    // 右侧对话框展开动画（从0展开到480）
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 480], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 用户气泡：frame 130 开始
    const userBubbleSpring = spring({ frame: frame - 130, fps, config: { damping: 20, stiffness: 200 } });
    const userBubbleY = interpolate(userBubbleSpring, [0, 1], [30, 0]);
    const userBubbleOpacity = interpolate(frame, [130, 148], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // AI 气泡：frame 175 开始
    const aiBubbleSpring = spring({ frame: frame - 175, fps, config: { damping: 20, stiffness: 200 } });
    const aiBubbleY = interpolate(aiBubbleSpring, [0, 1], [30, 0]);
    const aiBubbleOpacity = interpolate(frame, [175, 193], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 打字机文字
    const userText = useTypewriter(USER_MSG, 135, 2.0);
    const aiText = useTypewriter(AI_MSG, 180, 1.8);

    // 底部提示
    const tipOpacity = interpolate(frame, [240, 265], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                background: THEME.bg,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                gap: 36,
            }}
        >
            {/* 左侧：标题 + 对比卡片 */}
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
                {/* 步骤标签 */}
                <div
                    style={{
                        fontSize: 20,
                        color: THEME.accent,
                        fontWeight: "bold",
                        marginBottom: 8,
                        opacity: titleOpacity,
                        letterSpacing: 1,
                    }}
                >
                    第一步
                </div>

                {/* 标题 */}
                <h2
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        marginBottom: 8,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.3,
                    }}
                >
                    给"具体"的反馈
                </h2>
                <div
                    style={{
                        fontSize: 20,
                        color: THEME.textMuted,
                        marginBottom: 22,
                        opacity: titleOpacity,
                    }}
                >
                    别说"感觉不对"，要说清楚怎么改
                </div>

                {/* 对比卡片 */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                    {feedbackExamples.map((ex, i) => (
                        <div
                            key={i}
                            style={{
                                backgroundColor: THEME.cardBg,
                                borderRadius: 14,
                                padding: "14px 18px",
                                opacity: cardOpacities[i],
                                borderLeft: `5px solid ${ex.color}`,
                            }}
                        >
                            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 17, color: THEME.textMuted, marginBottom: 4 }}>
                                        ❌ 别说：<span style={{ color: "#ff7b7b" }}>"{ex.bad}"</span>
                                    </div>
                                    <div style={{ fontSize: 18, color: THEME.textSecondary, lineHeight: 1.5 }}>
                                        ✅ 要说：<span style={{ color: ex.color, fontWeight: "bold" }}>"{ex.good}"</span>
                                    </div>
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
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>🤖 AI 对话</span>
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
                        minHeight: 320,
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
                        <div style={{ fontSize: 14, color: THEME.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                            <span>你</span>
                            <span style={{ width: 24, height: 24, borderRadius: "50%", background: THEME.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>👤</span>
                        </div>
                        <div
                            style={{
                                background: THEME.accent,
                                color: "white",
                                borderRadius: "12px 12px 2px 12px",
                                padding: "10px 14px",
                                fontSize: 17,
                                lineHeight: 1.6,
                                maxWidth: "90%",
                            }}
                        >
                            {userText}
                            {frame >= 135 && frame < 175 && (
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
                        <div style={{ fontSize: 14, color: THEME.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#58a6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🤖</span>
                            <span>AI</span>
                        </div>
                        <div
                            style={{
                                background: "rgba(88,166,255,0.15)",
                                border: "1px solid rgba(88,166,255,0.3)",
                                color: THEME.textSecondary,
                                borderRadius: "12px 12px 12px 2px",
                                padding: "10px 14px",
                                fontSize: 17,
                                lineHeight: 1.8,
                                maxWidth: "90%",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {aiText}
                            {frame >= 180 && frame < 260 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "#58a6ff", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>
                </div>

                {/* 底部提示 */}
                <div
                    style={{
                        opacity: tipOpacity,
                        textAlign: "center",
                        fontSize: 16,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                        marginTop: 12,
                    }}
                >
                    💡 让AI帮你找问题，再选方向深挖！
                </div>
            </div>
        </div>
    );
};
