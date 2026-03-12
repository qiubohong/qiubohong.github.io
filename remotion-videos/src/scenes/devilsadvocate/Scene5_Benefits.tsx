import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

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

const benefits = [
    {
        icon: "🏪",
        before: "花几十万开店",
        after: "AI 帮你发现没想清楚的风险",
        color: "#f0883e",
    },
    {
        icon: "📊",
        before: "把方案发给领导",
        after: "AI 帮你补上逻辑漏洞",
        color: "#58a6ff",
    },
    {
        icon: "🎯",
        before: "做出重要决定",
        after: "AI 帮你看到另一个角度",
        color: "#3fb950",
    },
];

export const DAScene5_Benefits: React.FC = () => {
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

    const cardOpacities = benefits.map((_, i) =>
        interpolate(frame, [30 + i * 28, 58 + i * 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardScales = benefits.map((_, i) =>
        interpolate(frame, [30 + i * 28, 58 + i * 28], [0.8, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 箭头动画（每张卡片内）
    const arrowOpacities = benefits.map((_, i) =>
        interpolate(frame, [50 + i * 28, 70 + i * 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [130, 155], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [130, 155], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    // 背景装饰
    const floatY1 = Math.sin(frame * 0.04) * 10;
    const floatY2 = Math.sin(frame * 0.05 + 1) * 8;

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
                gap: 32,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "5%", fontSize: 60, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🪞</div>
            <div style={{ position: "absolute", bottom: "10%", left: "4%", fontSize: 50, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>💡</div>

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    低成本试错 · 高效率成长
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
                    被批评，是成长最快的路
                </h2>
            </div>

            {/* 三个对比卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%", maxWidth: 720 }}>
                {benefits.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: cardOpacities[i],
                            transform: `scale(${cardScales[i]})`,
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "18px 24px",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
                        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
                            <div
                                style={{
                                    flex: 1,
                                    background: "rgba(255,255,255,0.04)",
                                    borderRadius: 10,
                                    padding: "10px 14px",
                                    fontSize: 17,
                                    color: THEME.textMuted,
                                    textDecoration: "line-through",
                                    textDecorationColor: "rgba(255,100,100,0.5)",
                                }}
                            >
                                在你{item.before}之前
                            </div>
                            <div style={{ opacity: arrowOpacities[i], fontSize: 22, color: item.color, flexShrink: 0 }}>→</div>
                            <div
                                style={{
                                    flex: 1.2,
                                    background: `${item.color}18`,
                                    border: `1px solid ${item.color}44`,
                                    borderRadius: 10,
                                    padding: "10px 14px",
                                    fontSize: 17,
                                    color: item.color,
                                    fontWeight: "bold",
                                    lineHeight: 1.5,
                                }}
                            >
                                {item.after}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accentSub}`,
                    borderRadius: 20,
                    padding: "18px 36px",
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 24, fontWeight: "bold" }}>
                    这哪是"被骂"，这分明是
                    <span style={{ color: `rgba(255,210,0,${highlight})` }}>
                        低成本试错、高效率成长
                    </span>
                    ！
                </div>
            </div>
        </div>
    );
};
