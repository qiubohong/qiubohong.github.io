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
    cardBgAccent: "rgba(240,136,62,0.12)",
};

export const OutputScene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleScale = interpolate(frame, [0, 30], [0.85, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card1Opacity = interpolate(frame, [40, 65], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card1Y = interpolate(frame, [40, 65], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card2Opacity = interpolate(frame, [65, 90], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Y = interpolate(frame, [65, 90], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card3Opacity = interpolate(frame, [90, 115], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card3Y = interpolate(frame, [90, 115], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const answerOpacity = interpolate(frame, [130, 160], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const answerScale = interpolate(frame, [130, 160], [0.9, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 小动画：标签脉冲
    const tagPulse = 1 + Math.sin(frame * 0.08) * 0.03;

    const painPoints = [
        { icon: "✍️", text: "让AI写朋友圈文案，觉得\"还行吧\"，直接发出去了", result: "点赞寥寥" },
        { icon: "📝", text: "让AI润色工作总结，看着\"差不多\"，直接交差了", result: "领导没表态" },
        { icon: "🎯", text: "让AI策划亲子活动，觉得\"凑合能用\"，不再追问了", result: "孩子不尽兴" },
    ];

    return (
        <div
            style={{
                flex: 1,
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 60px",
                fontFamily: THEME.fontFamily,
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            {/* 系列标签 */}
            <div
                style={{
                    fontSize: 26,
                    color: THEME.accent,
                    fontWeight: "bold",
                    marginBottom: 16,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                    transform: `scale(${tagPulse})`,
                }}
            >
                普通人也能用好AI · 技能四
            </div>

            {/* 主标题 */}
            <h1
                style={{
                    fontSize: 54,
                    fontWeight: "bold",
                    marginBottom: 12,
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `scale(${titleScale})`,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.2,
                    maxWidth: "90%",
                }}
            >
                学会和AI"掰手腕"
            </h1>

            {/* 副标题 */}
            <h2
                style={{
                    fontSize: 28,
                    fontWeight: "normal",
                    marginBottom: 30,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: THEME.textSecondary,
                }}
            >
                输出迭代（Output Iteration）
            </h2>

            {/* 痛点卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 900 }}>
                {painPoints.map((point, i) => {
                    const opacities = [card1Opacity, card2Opacity, card3Opacity];
                    const ys = [card1Y, card2Y, card3Y];
                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: THEME.cardBg,
                                borderRadius: 14,
                                padding: "16px 24px",
                                opacity: opacities[i],
                                transform: `translateY(${ys[i]}px)`,
                                borderLeft: `5px solid ${THEME.accent}`,
                                gap: 16,
                            }}
                        >
                            <span style={{ fontSize: 32, minWidth: 40 }}>{point.icon}</span>
                            <div style={{ flex: 1, fontSize: 22, color: THEME.textSecondary, lineHeight: 1.5 }}>
                                {point.text}
                            </div>
                            <div
                                style={{
                                    fontSize: 18,
                                    color: THEME.textMuted,
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    padding: "6px 14px",
                                    borderRadius: 20,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                结果：{point.result}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 核心揭晓 */}
            <div
                style={{
                    marginTop: 28,
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: answerOpacity,
                    transform: `scale(${answerScale})`,
                    color: THEME.accentSub,
                    padding: "18px 36px",
                    borderRadius: 16,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "88%",
                    lineHeight: 1.5,
                }}
            >
                🤔 不是AI不够聪明，是你太容易"满意"了！
            </div>
        </div>
    );
};
