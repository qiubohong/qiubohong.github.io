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
    { num: "03", name: "会交底", icon: "📋", color: "#3fb950" },
    { num: "04", name: "会迭代", icon: "🔄", color: "#f778ba" },
    { num: "05", name: "会立规矩", icon: "📐", color: "#ffd200" },
    { num: "06", name: "会听骂", icon: "🪞", color: "#a371f7" },
    { num: "07", name: "会压缩", icon: "🧃", color: "#3fb950" },
];

export const CCScene7_Summary: React.FC = () => {
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

    const cardOpacities = skills.map((_, i) =>
        interpolate(frame, [25 + i * 16, 48 + i * 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardScales = skills.map((_, i) =>
        interpolate(frame, [25 + i * 16, 48 + i * 16], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 第7个技能高亮闪烁
    const skill7Highlight = 0.6 + Math.sin(frame * 0.15) * 0.4;
    const skill7Scale = 1 + Math.sin(frame * 0.1) * 0.04;

    // 金句弹入
    const quoteOpacity = interpolate(frame, [145, 170], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const quoteY = interpolate(frame, [145, 170], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 下期预告
    const nextOpacity = interpolate(frame, [185, 210], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景粒子
    const dots = Array.from({ length: 7 }, (_, i) => ({
        x: [10, 85, 20, 75, 5, 92, 50][i],
        y: [15, 20, 80, 75, 50, 55, 10][i],
        opacity: interpolate(frame, [i * 8, i * 8 + 20], [0, 0.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }),
        floatY: Math.sin((frame + i * 25) * 0.04) * 7,
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
                padding: "50px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 24,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景粒子 */}
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
                        background: skills[i % skills.length].color,
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
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    七技能集齐 🎉
                </div>
                <h2
                    style={{
                        fontSize: 42,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    离 AI 高手只差两步了！
                </h2>
            </div>

            {/* 七技能卡片 4+3 布局 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 720 }}>
                {/* 前四个 */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                    {skills.slice(0, 4).map((skill, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: cardOpacities[i],
                                transform: `scale(${cardScales[i]})`,
                                background: THEME.cardBg,
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 14,
                                padding: "14px 10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 6,
                                textAlign: "center",
                            }}
                        >
                            <span style={{ fontSize: 28 }}>{skill.icon}</span>
                            <div style={{ fontSize: 12, color: skill.color, fontWeight: "bold" }}>技能 {skill.num}</div>
                            <div style={{ fontSize: 17, fontWeight: "bold", color: THEME.textSecondary }}>{skill.name}</div>
                        </div>
                    ))}
                </div>
                {/* 后三个（居中） */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, maxWidth: 540, margin: "0 auto", width: "100%" }}>
                    {skills.slice(4).map((skill, i) => {
                        const idx = i + 4;
                        const isLast = idx === skills.length - 1;
                        return (
                            <div
                                key={idx}
                                style={{
                                    opacity: isLast ? skill7Highlight : cardOpacities[idx],
                                    transform: `scale(${isLast ? cardScales[idx] * skill7Scale : cardScales[idx]})`,
                                    background: isLast
                                        ? `linear-gradient(135deg, ${skill.color}30, ${skill.color}15)`
                                        : THEME.cardBg,
                                    border: isLast
                                        ? `2px solid ${skill.color}`
                                        : "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: 14,
                                    padding: "14px 10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 6,
                                    textAlign: "center",
                                }}
                            >
                                <span style={{ fontSize: 28 }}>{skill.icon}</span>
                                <div style={{ fontSize: 12, color: skill.color, fontWeight: "bold" }}>技能 {skill.num}</div>
                                <div style={{ fontSize: 17, fontWeight: "bold", color: isLast ? skill.color : THEME.textSecondary }}>
                                    {skill.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 金句 */}
            <div
                style={{
                    opacity: quoteOpacity,
                    transform: `translateY(${quoteY}px)`,
                    textAlign: "center",
                    maxWidth: 660,
                }}
            >
                <div style={{ fontSize: 20, color: THEME.textSecondary, lineHeight: 1.7 }}>
                    当你学会给信息"瘦身"，AI 就不再被海量资料撑晕，
                    <span style={{ color: THEME.accentSub, fontWeight: "bold" }}>
                        而是能更专注地帮你解决真正的问题
                    </span>
                </div>
            </div>

            {/* 下期预告 */}
            <div
                style={{
                    opacity: nextOpacity,
                    background: THEME.cardBg,
                    borderRadius: 14,
                    padding: "12px 28px",
                    fontSize: 18,
                    color: THEME.textMuted,
                    textAlign: "center",
                }}
            >
                下期：怎么打理你的 AI 工作区，让所有资料井井有条 📁
            </div>
        </div>
    );
};
