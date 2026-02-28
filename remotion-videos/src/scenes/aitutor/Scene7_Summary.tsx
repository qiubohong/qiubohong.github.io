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
    { num: "08", name: "会整理", icon: "🌿", color: "#58a6ff" },
    { num: "09", name: "请私教", icon: "🎓", color: "#ffd200" },
];

export const ATScene7_Summary: React.FC = () => {
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

    // 九技能卡片依次弹入
    const cardOpacities = skills.map((_, i) =>
        interpolate(frame, [25 + i * 12, 44 + i * 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardScales = skills.map((_, i) =>
        interpolate(frame, [25 + i * 12, 44 + i * 12], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 第9个技能高亮闪烁
    const skill9Highlight = 0.6 + Math.sin(frame * 0.15) * 0.4;
    const skill9Scale = 1 + Math.sin(frame * 0.1) * 0.05;

    // 金句弹入
    const quoteOpacity = interpolate(frame, [155, 180], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const quoteY = interpolate(frame, [155, 180], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 恭喜弹入
    const congratsOpacity = interpolate(frame, [195, 220], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const congratsScale = interpolate(frame, [195, 220], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景粒子
    const dots = Array.from({ length: 9 }, (_, i) => ({
        x: [10, 85, 20, 75, 5, 92, 50, 40, 60][i],
        y: [15, 20, 80, 75, 50, 55, 10, 90, 35][i],
        opacity: interpolate(frame, [i * 8, i * 8 + 20], [0, 0.18], {
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
                gap: 18,
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
                    九技能全部解锁 🎉
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
                    你已经是 AI 高手了！
                </h2>
            </div>

            {/* 九技能卡片 3×3 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12,
                    width: "100%",
                    maxWidth: 720,
                }}
            >
                {skills.map((skill, i) => {
                    const isLast = i === skills.length - 1;
                    return (
                        <div
                            key={i}
                            style={{
                                opacity: isLast ? skill9Highlight : cardOpacities[i],
                                transform: `scale(${isLast ? cardScales[i] * skill9Scale : cardScales[i]})`,
                                background: isLast
                                    ? `linear-gradient(135deg, ${skill.color}30, ${skill.color}15)`
                                    : THEME.cardBg,
                                border: isLast
                                    ? `2px solid ${skill.color}`
                                    : "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 14,
                                padding: "12px 8px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 5,
                                textAlign: "center",
                            }}
                        >
                            <span style={{ fontSize: 26 }}>{skill.icon}</span>
                            <div style={{ fontSize: 11, color: skill.color, fontWeight: "bold" }}>技能 {skill.num}</div>
                            <div style={{ fontSize: 14, fontWeight: "bold", color: isLast ? skill.color : THEME.textSecondary }}>
                                {skill.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 金句 */}
            <div
                style={{
                    opacity: quoteOpacity,
                    transform: `translateY(${quoteY}px)`,
                    textAlign: "center",
                    maxWidth: 660,
                    fontSize: 18,
                    color: THEME.textSecondary,
                    lineHeight: 1.6,
                }}
            >
                这些技能不只是用来"用 AI"的——它们也是用来
                <span style={{ color: THEME.accentSub, fontWeight: "bold" }}>成就你自己</span>
                的。因为 AI，你变成了一个更好的自己。
            </div>

            {/* 恭喜 */}
            <div
                style={{
                    opacity: congratsOpacity,
                    transform: `scale(${congratsScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 20,
                    padding: "14px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 22, fontWeight: "bold", color: THEME.accentSub }}>
                    🎓 恭喜你，九个技能全部解锁！未来已来，愿你和 AI 一起，走得更远！
                </div>
            </div>
        </div>
    );
};
