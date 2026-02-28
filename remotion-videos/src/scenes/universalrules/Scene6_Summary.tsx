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

const allSkills = [
    { icon: "💬", label: "会提问", sub: "四步提问法", color: "#58a6ff" },
    { icon: "👁️", label: "懂审美", sub: "审美鉴赏", color: "#3fb950" },
    { icon: "🪪", label: "会交底", sub: "大师提示词", color: "#f0883e" },
    { icon: "🔄", label: "会迭代", sub: "输出迭代", color: "#f778ba" },
    { icon: "📋", label: "会立规矩", sub: "通用规则", color: "#ffd200" },
];

export const URScene6_Summary: React.FC = () => {
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

    // 5个技能卡片依次弹入
    const skillScales = allSkills.map((_, i) => {
        return spring({ frame: frame - (50 + i * 22), fps, config: { damping: 16, stiffness: 180 } });
    });
    const skillOpacities = allSkills.map((_, i) =>
        interpolate(frame, [50 + i * 22, 72 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 最后一个技能（通用规则）高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    // 金句淡入
    const quoteOpacity = interpolate(frame, [175, 205], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const quoteScale = spring({ frame: frame - 175, fps, config: { damping: 16, stiffness: 160 } });

    // 下期预告淡入
    const nextOpacity = interpolate(frame, [230, 260], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景装饰点
    const floatY = Math.sin(frame * 0.04) * 6;

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
                padding: "50px 70px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰点 */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: allSkills[i % 5].color,
                        left: `${8 + i * 12}%`,
                        top: `${10 + (i % 4) * 22}%`,
                        opacity: 0.2,
                        transform: `translateY(${floatY * (i % 2 === 0 ? 1 : -1)}px)`,
                    }}
                />
            ))}

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                    marginBottom: 36,
                }}
            >
                <div style={{ fontSize: 22, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    五个技能，全部到手！
                </div>
                <h2
                    style={{
                        fontSize: 46,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                    }}
                >
                    你已经超过绝大多数普通用户了
                </h2>
            </div>

            {/* 5个技能卡片 */}
            <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                {allSkills.map((skill, i) => (
                    <div
                        key={i}
                        style={{
                            background: i === 4
                                ? `linear-gradient(135deg, rgba(255,210,0,0.15), rgba(240,136,62,0.1))`
                                : THEME.cardBg,
                            borderRadius: 16,
                            padding: "18px 20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 8,
                            opacity: skillOpacities[i],
                            transform: `scale(${skillScales[i]})`,
                            border: i === 4
                                ? `2px solid rgba(255,210,0,${highlight})`
                                : `2px solid ${skill.color}30`,
                            minWidth: 140,
                        }}
                    >
                        <span style={{ fontSize: 36 }}>{skill.icon}</span>
                        <span
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: i === 4 ? `rgba(255,210,0,${highlight})` : skill.color,
                            }}
                        >
                            {skill.label}
                        </span>
                        <span style={{ fontSize: 13, color: THEME.textMuted }}>{skill.sub}</span>
                    </div>
                ))}
            </div>

            {/* 金句 */}
            <div
                style={{
                    opacity: quoteOpacity,
                    transform: `scale(${quoteScale})`,
                    background: "linear-gradient(135deg, rgba(240,136,62,0.12), rgba(255,210,0,0.08))",
                    border: `2px solid rgba(255,210,0,0.4)`,
                    borderRadius: 20,
                    padding: "22px 50px",
                    textAlign: "center",
                    maxWidth: 860,
                    marginBottom: 24,
                }}
            >
                <div style={{ fontSize: 24, fontWeight: "bold", color: THEME.accentSub, lineHeight: 1.6 }}>
                    🔒 通用规则的魔力：
                </div>
                <div style={{ fontSize: 20, color: THEME.textSecondary, marginTop: 8, lineHeight: 1.7 }}>
                    把你的工作方法、思维习惯、质量要求
                    <br />
                    变成可以反复使用的"标准"
                </div>
            </div>

            {/* 下期预告 */}
            <div
                style={{
                    opacity: nextOpacity,
                    fontSize: 20,
                    color: THEME.textMuted,
                    textAlign: "center",
                }}
            >
                下期：让AI反过来给你挑毛病 🔍
            </div>
        </div>
    );
};
