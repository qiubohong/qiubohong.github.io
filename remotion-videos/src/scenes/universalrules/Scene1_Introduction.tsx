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

const painPoints = [
    { emoji: "😊", text: "上周AI写的周报，格式语气都刚刚好，领导还夸了！", color: "#3fb950" },
    { emoji: "😤", text: "这周再找它写，像换了个人——又长又啰嗦，重点全没了", color: "#ff7b7b" },
    { emoji: "🤔", text: "问题出在哪？因为AI根本不记得上周那次的'默契'", color: "#f0883e" },
];

export const URScene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 30], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const cardOpacities = painPoints.map((_, i) =>
        interpolate(frame, [40 + i * 30, 65 + i * 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardYs = painPoints.map((_, i) =>
        interpolate(frame, [40 + i * 30, 65 + i * 30], [30, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 核心揭晓弹入
    const revealScale = spring({ frame: frame - 140, fps, config: { damping: 18, stiffness: 180 } });
    const revealOpacity = interpolate(frame, [140, 160], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 装饰点浮动
    const floatY = Math.sin(frame * 0.04) * 8;

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
                padding: "60px 70px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰点 */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: i % 2 === 0 ? THEME.accent : "#58a6ff",
                        left: `${10 + i * 16}%`,
                        top: `${15 + (i % 3) * 25}%`,
                        opacity: 0.25,
                        transform: `translateY(${floatY * (i % 2 === 0 ? 1 : -1)}px)`,
                    }}
                />
            ))}

            {/* 顶部标签 */}
            <div
                style={{
                    fontSize: 22,
                    color: THEME.accent,
                    fontWeight: "bold",
                    marginBottom: 12,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                    transform: `translateY(${titleY}px)`,
                }}
            >
                普通人也能用好AI · 技能五
            </div>

            {/* 主标题 */}
            <h1
                style={{
                    fontSize: 52,
                    fontWeight: "bold",
                    marginBottom: 10,
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    textAlign: "center",
                    lineHeight: 1.2,
                }}
            >
                给AI立个"规矩"
            </h1>
            <div
                style={{
                    fontSize: 24,
                    color: THEME.textMuted,
                    marginBottom: 40,
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                把好的习惯，变成永久的标准
            </div>

            {/* 痛点卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 860 }}>
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
                        <span style={{ fontSize: 36 }}>{point.emoji}</span>
                        <span style={{ fontSize: 22, color: THEME.textSecondary, lineHeight: 1.5 }}>{point.text}</span>
                    </div>
                ))}
            </div>

            {/* 核心揭晓 */}
            <div
                style={{
                    marginTop: 36,
                    background: "linear-gradient(135deg, rgba(240,136,62,0.15), rgba(255,210,0,0.1))",
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 20,
                    padding: "20px 40px",
                    textAlign: "center",
                    opacity: revealOpacity,
                    transform: `scale(${revealScale})`,
                }}
            >
                <div style={{ fontSize: 26, fontWeight: "bold", color: THEME.accentSub }}>
                    💡 通用规则（Universal Rules）
                </div>
                <div style={{ fontSize: 20, color: THEME.textSecondary, marginTop: 8 }}>
                    让AI记住你的标准，每次都交出满意答卷
                </div>
            </div>
        </div>
    );
};
