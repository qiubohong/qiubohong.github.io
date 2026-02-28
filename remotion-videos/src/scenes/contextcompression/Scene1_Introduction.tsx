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

const painPoints = [
    {
        icon: "📂",
        text: "把公司三年会议纪要全扔给 AI，让它总结核心问题",
        result: "结果答得前言不搭后语……",
        color: "#f0883e",
    },
    {
        icon: "📚",
        text: "明明准备了超多资料，AI 越往后越糊涂",
        result: "好像忘了前面说过什么……",
        color: "#58a6ff",
    },
];

export const CCScene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 25], [-30, 0], {
        easing: Easing.out(Easing.cubic),
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
    const card2Opacity = interpolate(frame, [55, 80], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Y = interpolate(frame, [55, 80], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const questionOpacity = interpolate(frame, [95, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const questionScale = interpolate(frame, [95, 120], [0.8, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const revealOpacity = interpolate(frame, [140, 165], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const revealScale = interpolate(frame, [140, 165], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景装饰浮动
    const floatY1 = Math.sin(frame * 0.04) * 8;
    const floatY2 = Math.sin(frame * 0.05 + 1.5) * 6;
    const floatY3 = Math.sin(frame * 0.035 + 3) * 10;

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
                padding: "50px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 24,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 70, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🍊</div>
            <div style={{ position: "absolute", bottom: "12%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>📦</div>
            <div style={{ position: "absolute", top: "45%", right: "3%", fontSize: 45, opacity: 0.05, transform: `translateY(${floatY3}px)` }}>💭</div>

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                    marginBottom: 8,
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 10, letterSpacing: 2 }}>
                    技能七 · 上下文压缩
                </div>
                <h1
                    style={{
                        fontSize: 50,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                        margin: 0,
                    }}
                >
                    你有没有遇到过这种情况？
                </h1>
            </div>

            {/* 痛点卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 720 }}>
                {[
                    { opacity: card1Opacity, y: card1Y, ...painPoints[0] },
                    { opacity: card2Opacity, y: card2Y, ...painPoints[1] },
                ].map((point, i) => (
                    <div
                        key={i}
                        style={{
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "20px 24px",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 18,
                            opacity: point.opacity,
                            transform: `translateY(${point.y}px)`,
                            borderLeft: `5px solid ${point.color}`,
                        }}
                    >
                        <span style={{ fontSize: 36, flexShrink: 0 }}>{point.icon}</span>
                        <div>
                            <div style={{ fontSize: 20, color: THEME.textSecondary, lineHeight: 1.5, marginBottom: 6 }}>
                                {point.text}
                            </div>
                            <div style={{ fontSize: 17, color: point.color, fontStyle: "italic" }}>
                                {point.result}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 疑问 */}
            <div
                style={{
                    opacity: questionOpacity,
                    transform: `scale(${questionScale})`,
                    textAlign: "center",
                    fontSize: 22,
                    color: THEME.textMuted,
                }}
            >
                🤔 AI 不是能处理海量信息吗？怎么还会"撑着"？
            </div>

            {/* 核心揭晓 */}
            <div
                style={{
                    opacity: revealOpacity,
                    transform: `scale(${revealScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 20,
                    padding: "18px 36px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 24, fontWeight: "bold", color: THEME.accentSub }}>
                    🍊 今天教你让 AI 自己帮自己"瘦身"
                </div>
                <div style={{ fontSize: 18, color: THEME.textMuted, marginTop: 8 }}>
                    上下文压缩（Context Compression）——再也不用担心 AI 吃太撑！
                </div>
            </div>
        </div>
    );
};
