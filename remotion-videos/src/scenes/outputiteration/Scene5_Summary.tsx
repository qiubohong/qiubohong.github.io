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

const skills = [
    { num: "01", name: "会提问", icon: "💬", color: "#f0883e" },
    { num: "02", name: "懂审美", icon: "🎨", color: "#58a6ff" },
    { num: "03", name: "会交底", icon: "🪪", color: "#3fb950" },
    { num: "04", name: "会迭代", icon: "🔄", color: "#ffd200" },
];

export const OutputScene5_Summary: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 四个技能卡片依次弹入
    const skillScales = skills.map((_, i) => {
        return interpolate(frame, [30 + i * 20, 55 + i * 20], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
    });
    const skillOpacities = skills.map((_, i) => {
        return interpolate(frame, [30 + i * 20, 50 + i * 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
    });

    const quoteOpacity = interpolate(frame, [130, 160], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const quoteY = interpolate(frame, [130, 160], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const nextOpacity = interpolate(frame, [175, 205], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 小动画：背景装饰点
    const dots = Array.from({ length: 6 }, (_, i) => ({
        x: (i * 137) % 100,
        y: (i * 97) % 100,
        opacity: interpolate(frame, [i * 10, i * 10 + 25], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }),
    }));

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

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
                position: "relative",
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
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: THEME.accent,
                        opacity: dot.opacity,
                        pointerEvents: "none",
                    }}
                />
            ))}

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 46,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                和AI掰手腕，其实是和自己掰手腕
            </h2>
            <div
                style={{
                    fontSize: 22,
                    color: THEME.textMuted,
                    marginBottom: 32,
                    opacity: titleOpacity,
                    textAlign: "center",
                }}
            >
                迭代的过程，是在打磨你自己的标准
            </div>

            {/* 四个技能卡片 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    marginBottom: 32,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 18,
                            padding: "20px 28px",
                            opacity: skillOpacities[i],
                            transform: `scale(${skillScales[i]})`,
                            border: `2px solid ${skill.color}40`,
                            minWidth: 160,
                        }}
                    >
                        <span style={{ fontSize: 40, marginBottom: 8 }}>{skill.icon}</span>
                        <div style={{ fontSize: 14, color: THEME.textMuted, marginBottom: 4 }}>技能 {skill.num}</div>
                        <div style={{ fontSize: 22, fontWeight: "bold", color: skill.color }}>{skill.name}</div>
                    </div>
                ))}
            </div>

            {/* 核心金句 */}
            <div
                style={{
                    opacity: quoteOpacity,
                    transform: `translateY(${quoteY}px)`,
                    fontSize: 28,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: THEME.accentSub,
                    padding: "18px 36px",
                    borderRadius: 16,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "88%",
                    lineHeight: 1.6,
                    marginBottom: 20,
                }}
            >
                人和人的差距，不在于会不会用AI<br />
                而在于{" "}
                <span style={{ color: `rgba(240, 136, 62, ${highlight})` }}>
                    愿不愿意和AI多聊几轮
                </span>
            </div>

            {/* 下期预告 */}
            <div
                style={{
                    opacity: nextOpacity,
                    fontSize: 22,
                    color: THEME.textSecondary,
                    textAlign: "center",
                    padding: "12px 28px",
                    borderRadius: 12,
                    background: "rgba(88,166,255,0.08)",
                    border: "1px solid rgba(88,166,255,0.2)",
                }}
            >
                🔜 下一篇：怎么选对AI工具，把合适的"武器"用在合适的场景上
            </div>
        </div>
    );
};
