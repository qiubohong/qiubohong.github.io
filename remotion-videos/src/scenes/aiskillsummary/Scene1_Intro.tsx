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

const contrasts = [
    {
        bad: { icon: "😰", text: "有的人用 AI 写封邮件都费劲" },
        good: { icon: "🚀", text: "有的人靠它把工作效率翻倍" },
        color: "#f0883e",
    },
    {
        bad: { icon: "😑", text: "有的人得到的回答泛泛而谈" },
        good: { icon: "💎", text: "有的人却能挖出真金白银的洞见" },
        color: "#58a6ff",
    },
    {
        bad: { icon: "🤷", text: "有的人只会让 AI \"说人话\"" },
        good: { icon: "🎓", text: "有的人却能让它当自己的私人教授" },
        color: "#3fb950",
    },
];

export const ASSScene1_Intro: React.FC = () => {
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

    // 对比卡片依次滑入
    const cardOpacities = contrasts.map((_, i) =>
        interpolate(frame, [30 + i * 28, 55 + i * 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardYs = contrasts.map((_, i) =>
        interpolate(frame, [30 + i * 28, 55 + i * 28], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 核心揭晓弹入
    const revealOpacity = interpolate(frame, [125, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const revealScale = interpolate(frame, [125, 150], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 副标题淡入
    const subOpacity = interpolate(frame, [160, 185], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.6 + Math.sin(frame * 0.12) * 0.4;

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
                gap: 20,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 70, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🧠</div>
            <div style={{ position: "absolute", bottom: "12%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>⚡</div>
            <div style={{ position: "absolute", top: "45%", right: "3%", fontSize: 45, opacity: 0.05, transform: `translateY(${floatY3}px)` }}>🎯</div>

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                    marginBottom: 4,
                }}
            >
                <div style={{ fontSize: 18, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 2 }}>
                    九个技能 · 一套心法
                </div>
                <h1
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                        margin: 0,
                    }}
                >
                    同样是 AI，差别在哪里？
                </h1>
            </div>

            {/* 对比卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 720 }}>
                {contrasts.map((c, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: cardOpacities[i],
                            transform: `translateY(${cardYs[i]}px)`,
                            background: THEME.cardBg,
                            borderRadius: 14,
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        {/* 差的一方 */}
                        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 26, flexShrink: 0 }}>{c.bad.icon}</span>
                            <div style={{ fontSize: 15, color: THEME.textMuted, textDecoration: "line-through", lineHeight: 1.4 }}>{c.bad.text}</div>
                        </div>
                        {/* 箭头 */}
                        <div style={{ fontSize: 18, color: c.color, flexShrink: 0 }}>→</div>
                        {/* 好的一方 */}
                        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 26, flexShrink: 0 }}>{c.good.icon}</span>
                            <div style={{ fontSize: 15, color: c.color, fontWeight: "bold", lineHeight: 1.4 }}>{c.good.text}</div>
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
                    padding: "16px 36px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 22, fontWeight: "bold", color: THEME.accentSub }}>
                    差别不在 AI，在于你手里有没有一套完整的
                    <span style={{ color: `rgba(240,136,62,${highlight})` }}>「心法」</span>
                </div>
            </div>

            {/* 副标题 */}
            <div
                style={{
                    opacity: subOpacity,
                    textAlign: "center",
                    fontSize: 17,
                    color: THEME.textMuted,
                    maxWidth: 640,
                    lineHeight: 1.6,
                }}
            >
                今天，我们把前面九个技能串起来，变成一套可以随时用的<strong style={{ color: THEME.textSecondary }}>组合拳</strong>
            </div>
        </div>
    );
};
