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
];

const comparisons = [
    {
        bad: "别人还在翻聊天记录找资料",
        good: "你已经打开项目文件夹直接用了",
        color: "#3fb950",
    },
    {
        bad: "别人换了个 AI 要重新调教",
        good: "你上传 PDF 秒变「老朋友」",
        color: "#f0883e",
    },
];

export const KGScene7_Summary: React.FC = () => {
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
        interpolate(frame, [25 + i * 14, 46 + i * 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardScales = skills.map((_, i) =>
        interpolate(frame, [25 + i * 14, 46 + i * 14], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 第8个技能高亮闪烁
    const skill8Highlight = 0.6 + Math.sin(frame * 0.15) * 0.4;
    const skill8Scale = 1 + Math.sin(frame * 0.1) * 0.04;

    // 对比卡片
    const compOpacities = comparisons.map((_, i) =>
        interpolate(frame, [145 + i * 22, 168 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 金句弹入
    const quoteOpacity = interpolate(frame, [200, 225], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const quoteY = interpolate(frame, [200, 225], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 下期预告
    const nextOpacity = interpolate(frame, [240, 265], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景粒子
    const dots = Array.from({ length: 8 }, (_, i) => ({
        x: [10, 85, 20, 75, 5, 92, 50, 40][i],
        y: [15, 20, 80, 75, 50, 55, 10, 90][i],
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
                gap: 20,
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
                    八技能集齐 🎉
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
                    离 AI 高手只差一步了！
                </h2>
            </div>

            {/* 八技能卡片 4+4 布局 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 720 }}>
                {/* 前四个 */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    {skills.slice(0, 4).map((skill, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: cardOpacities[i],
                                transform: `scale(${cardScales[i]})`,
                                background: THEME.cardBg,
                                border: "1px solid rgba(255,255,255,0.08)",
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
                            <div style={{ fontSize: 15, fontWeight: "bold", color: THEME.textSecondary }}>{skill.name}</div>
                        </div>
                    ))}
                </div>
                {/* 后四个 */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    {skills.slice(4).map((skill, i) => {
                        const idx = i + 4;
                        const isLast = idx === skills.length - 1;
                        return (
                            <div
                                key={idx}
                                style={{
                                    opacity: isLast ? skill8Highlight : cardOpacities[idx],
                                    transform: `scale(${isLast ? cardScales[idx] * skill8Scale : cardScales[idx]})`,
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
                                <div style={{ fontSize: 15, fontWeight: "bold", color: isLast ? skill.color : THEME.textSecondary }}>
                                    {skill.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 对比卡片 */}
            <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 720 }}>
                {comparisons.map((comp, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: compOpacities[i],
                            background: THEME.cardBg,
                            borderRadius: 14,
                            padding: "14px 16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
                    >
                        <div style={{ fontSize: 14, color: THEME.textMuted, textDecoration: "line-through" }}>
                            ❌ {comp.bad}
                        </div>
                        <div style={{ fontSize: 15, color: comp.color, fontWeight: "bold" }}>
                            ✅ {comp.good}
                        </div>
                    </div>
                ))}
            </div>

            {/* 金句 */}
            <div
                style={{
                    opacity: quoteOpacity,
                    transform: `translateY(${quoteY}px)`,
                    textAlign: "center",
                    maxWidth: 660,
                    fontSize: 19,
                    color: THEME.textSecondary,
                    lineHeight: 1.6,
                }}
            >
                这差距，就是"杂草丛生的花园"和
                <span style={{ color: THEME.accentSub, fontWeight: "bold" }}>
                    "精心打理的花园"
                </span>
                之间的差距
            </div>

            {/* 下期预告 */}
            <div
                style={{
                    opacity: nextOpacity,
                    background: THEME.cardBg,
                    borderRadius: 14,
                    padding: "10px 24px",
                    fontSize: 17,
                    color: THEME.textMuted,
                    textAlign: "center",
                }}
            >
                下期：让 AI 变成你的私人老师，随时随地教你任何东西 🎓
            </div>
        </div>
    );
};
