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

const painPoints = [
    {
        icon: "🔍",
        text: "上次调教好的周报 AI，这次怎么也找不到了",
        color: "#f0883e",
    },
    {
        icon: "📁",
        text: "好用的提示词散落在各个角落，每次都要翻半天",
        color: "#58a6ff",
    },
    {
        icon: "🔄",
        text: "压缩好的资料找不到，只能重新来一遍",
        color: "#3fb950",
    },
];

export const KGScene1_Introduction: React.FC = () => {
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

    const cardOpacities = painPoints.map((_, i) =>
        interpolate(frame, [30 + i * 22, 55 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardYs = painPoints.map((_, i) =>
        interpolate(frame, [30 + i * 22, 55 + i * 22], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    const revealOpacity = interpolate(frame, [120, 145], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const revealScale = interpolate(frame, [120, 145], [0.7, 1], {
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
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 70, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🌿</div>
            <div style={{ position: "absolute", bottom: "12%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>🌸</div>
            <div style={{ position: "absolute", top: "45%", right: "3%", fontSize: 45, opacity: 0.05, transform: `translateY(${floatY3}px)` }}>🌱</div>

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
                    技能八 · 知识库园艺
                </div>
                <h1
                    style={{
                        fontSize: 48,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                        margin: 0,
                    }}
                >
                    你有没有这样的烦恼？
                </h1>
            </div>

            {/* 痛点卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 720 }}>
                {painPoints.map((point, i) => (
                    <div
                        key={i}
                        style={{
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "18px 24px",
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                            opacity: cardOpacities[i],
                            transform: `translateY(${cardYs[i]}px)`,
                            borderLeft: `5px solid ${point.color}`,
                        }}
                    >
                        <span style={{ fontSize: 36, flexShrink: 0 }}>{point.icon}</span>
                        <div style={{ fontSize: 20, color: THEME.textSecondary, lineHeight: 1.5 }}>
                            {point.text}
                        </div>
                    </div>
                ))}
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
                    🌿 像打理花园一样打理你的 AI
                </div>
                <div style={{ fontSize: 18, color: THEME.textMuted, marginTop: 8 }}>
                    知识库园艺（Knowledge Garden）——让资料永远井井有条！
                </div>
            </div>
        </div>
    );
};
