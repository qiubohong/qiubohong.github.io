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
    { icon: "📋", text: "辛苦写了方案，领导一问就哑口无言", color: "#f0883e" },
    { icon: "🤔", text: "想了好久的决定，朋友一句话就点出漏洞", color: "#58a6ff" },
    { icon: "🪞", text: "总是看不见自己的盲点，站的位置限制了视野", color: "#3fb950" },
];

export const DAScene1_Introduction: React.FC = () => {
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

    const revealOpacity = interpolate(frame, [110, 135], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const revealScale = interpolate(frame, [110, 135], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景装饰点浮动
    const dots = Array.from({ length: 6 }, (_, i) => ({
        x: [15, 80, 25, 70, 10, 90][i],
        y: [20, 15, 75, 80, 50, 45][i],
        delay: i * 10,
        opacity: interpolate(frame, [i * 10, i * 10 + 20], [0, 0.25], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }),
        floatY: Math.sin((frame + i * 30) * 0.04) * 8,
    }));

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
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰点 */}
            {dots.map((dot, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: THEME.accent,
                        opacity: dot.opacity,
                        transform: `translateY(${dot.floatY}px)`,
                    }}
                />
            ))}

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                    marginBottom: 48,
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 10, letterSpacing: 2 }}>
                    技能六 · AI 镜子
                </div>
                <h1
                    style={{
                        fontSize: 52,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                        margin: 0,
                    }}
                >
                    你有没有这样的经历？
                </h1>
            </div>

            {/* 痛点卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", maxWidth: 700 }}>
                {painPoints.map((point, i) => (
                    <div
                        key={i}
                        style={{
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "20px 24px",
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            opacity: cardOpacities[i],
                            transform: `translateY(${cardYs[i]}px)`,
                            borderLeft: `5px solid ${point.color}`,
                        }}
                    >
                        <span style={{ fontSize: 36 }}>{point.icon}</span>
                        <span style={{ fontSize: 22, color: THEME.textSecondary, lineHeight: 1.5 }}>{point.text}</span>
                    </div>
                ))}
            </div>

            {/* 核心揭晓 */}
            <div
                style={{
                    opacity: revealOpacity,
                    transform: `scale(${revealScale})`,
                    marginTop: 44,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 20,
                    padding: "18px 36px",
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 24, fontWeight: "bold", color: THEME.accentSub }}>
                    🪞 你需要一面能照出盲点的镜子
                </div>
                <div style={{ fontSize: 18, color: THEME.textMuted, marginTop: 8 }}>
                    让 AI 当你的"魔鬼代言人"，帮你看见自己看不见的坑
                </div>
            </div>
        </div>
    );
};
