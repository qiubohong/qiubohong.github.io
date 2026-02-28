import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

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

const comparisons = [
    {
        label: "你问 AI",
        text: "我这个想法怎么样？",
        icon: "🙋",
        color: "#58a6ff",
    },
    {
        label: "AI 回答",
        text: "这个想法很不错，很有创意！如果能考虑以下几点就更好了……",
        icon: "🤖",
        color: "#3fb950",
        isAI: true,
    },
];

export const DAScene2_AIPersonality: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card1Opacity = interpolate(frame, [30, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card1Y = interpolate(frame, [30, 55], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Opacity = interpolate(frame, [65, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Y = interpolate(frame, [65, 90], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 箭头动画
    const arrowOpacity = interpolate(frame, [55, 70], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 问题揭示
    const problemOpacity = interpolate(frame, [110, 135], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const problemScale = interpolate(frame, [110, 135], [0.8, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [155, 180], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionY = interpolate(frame, [155, 180], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "60px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 28,
            }}
        >
            {/* 标题 */}
            <div style={{ opacity: titleOpacity, textAlign: "center" }}>
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    AI 的天性
                </div>
                <h2
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    AI 天生是"讨好型人格"
                </h2>
            </div>

            {/* 对话演示 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", maxWidth: 680, alignItems: "center" }}>
                {/* 用户提问 */}
                <div
                    style={{
                        opacity: card1Opacity,
                        transform: `translateY(${card1Y}px)`,
                        alignSelf: "flex-end",
                        background: THEME.accent,
                        borderRadius: "16px 16px 4px 16px",
                        padding: "16px 22px",
                        maxWidth: "75%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <span style={{ fontSize: 28 }}>🙋</span>
                    <div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>你问 AI</div>
                        <div style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>我这个想法怎么样？</div>
                    </div>
                </div>

                {/* 箭头 */}
                <div style={{ opacity: arrowOpacity, fontSize: 28, margin: "8px 0", color: THEME.textMuted }}>↓</div>

                {/* AI 回答 */}
                <div
                    style={{
                        opacity: card2Opacity,
                        transform: `translateY(${card2Y}px)`,
                        alignSelf: "flex-start",
                        background: "rgba(88,166,255,0.12)",
                        border: "1px solid rgba(88,166,255,0.3)",
                        borderRadius: "16px 16px 16px 4px",
                        padding: "16px 22px",
                        maxWidth: "85%",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                    }}
                >
                    <span style={{ fontSize: 28 }}>🤖</span>
                    <div>
                        <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 4 }}>AI 回答</div>
                        <div style={{ fontSize: 19, color: THEME.textSecondary, lineHeight: 1.6 }}>
                            这个想法很不错，很有创意！如果能考虑以下几点就更好了……
                        </div>
                    </div>
                </div>
            </div>

            {/* 问题揭示 */}
            <div
                style={{
                    opacity: problemOpacity,
                    transform: `scale(${problemScale})`,
                    background: "rgba(240,136,62,0.12)",
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 16,
                    padding: "16px 28px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 22, color: THEME.accent, fontWeight: "bold" }}>
                    ⚠️ 永远先夸再建议，永远不会直接说"你这想法不行"
                </div>
                <div style={{ fontSize: 17, color: THEME.textMuted, marginTop: 8 }}>
                    这是设计使然——AI 被训练成"乐于助人""善解人意"的样子
                </div>
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `translateY(${conclusionY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 26, fontWeight: "bold" }}>
                    对真正想进步的人来说，
                    <span style={{ color: `rgba(255,210,0,${highlight})` }}>
                        "好好先生"帮不了你
                    </span>
                </div>
                <div style={{ fontSize: 20, color: THEME.textMuted, marginTop: 10 }}>
                    你需要的是那个敢跟你说"不"的 AI 👊
                </div>
            </div>
        </div>
    );
};
