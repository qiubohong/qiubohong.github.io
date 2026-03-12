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

const comparisons = [
    {
        before: { icon: "😰", text: "要找书、要买课、要腾时间、要坚持", label: "以前" },
        after: { icon: "😊", text: "想了解什么，让 AI 讲 15 分钟，就能知道个大概", label: "现在" },
        color: "#3fb950",
    },
    {
        before: { icon: "💸", text: "试错成本极高，学错了方向浪费大量时间", label: "以前" },
        after: { icon: "🆓", text: "没兴趣了换下一个话题，试错成本几乎为零", label: "现在" },
        color: "#58a6ff",
    },
];

const growthPoints = [
    { icon: "🔍", text: "持续地探索世界", color: "#f0883e" },
    { icon: "📉", text: "低门槛地学习新领域", color: "#58a6ff" },
    { icon: "⚡", text: "把时间变得更值钱", color: "#ffd200" },
];

export const ATScene6_GrowthPartner: React.FC = () => {
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

    // 对比卡片
    const compOpacities = comparisons.map((_, i) =>
        interpolate(frame, [30 + i * 28, 55 + i * 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const compYs = comparisons.map((_, i) =>
        interpolate(frame, [30 + i * 28, 55 + i * 28], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 成长要点
    const growthOpacities = growthPoints.map((_, i) =>
        interpolate(frame, [100 + i * 18, 122 + i * 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const growthScales = growthPoints.map((_, i) =>
        interpolate(frame, [100 + i * 18, 122 + i * 18], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 金句弹入
    const quoteOpacity = interpolate(frame, [165, 190], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const quoteScale = interpolate(frame, [165, 190], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.6 + Math.sin(frame * 0.12) * 0.4;
    // 背景粒子
    const dots = Array.from({ length: 6 }, (_, i) => ({
        x: [10, 85, 20, 75, 5, 92][i],
        y: [15, 20, 80, 75, 50, 55][i],
        opacity: interpolate(frame, [i * 10, i * 10 + 20], [0, 0.15], {
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
                        background: growthPoints[i % growthPoints.length].color,
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
                    让 AI 成为你的成长伙伴
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
                    试错成本几乎为零
                </h2>
            </div>

            {/* 对比卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 680 }}>
                {comparisons.map((comp, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: compOpacities[i],
                            transform: `translateY(${compYs[i]}px)`,
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "14px 18px",
                            display: "flex",
                            gap: 14,
                            alignItems: "center",
                        }}
                    >
                        {/* 以前 */}
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: 11, color: THEME.textMuted, marginBottom: 4 }}>{comp.before.label}</div>
                            <div style={{ fontSize: 26, marginBottom: 4 }}>{comp.before.icon}</div>
                            <div style={{ fontSize: 13, color: THEME.textMuted, textDecoration: "line-through", lineHeight: 1.5 }}>{comp.before.text}</div>
                        </div>
                        {/* 箭头 */}
                        <div style={{ fontSize: 22, color: comp.color, flexShrink: 0 }}>→</div>
                        {/* 现在 */}
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: 11, color: comp.color, marginBottom: 4, fontWeight: "bold" }}>{comp.after.label}</div>
                            <div style={{ fontSize: 26, marginBottom: 4 }}>{comp.after.icon}</div>
                            <div style={{ fontSize: 13, color: comp.color, fontWeight: "bold", lineHeight: 1.5 }}>{comp.after.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 成长要点 */}
            <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 680 }}>
                {growthPoints.map((point, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: growthOpacities[i],
                            transform: `scale(${growthScales[i]})`,
                            background: `${point.color}12`,
                            border: `1px solid ${point.color}44`,
                            borderRadius: 14,
                            padding: "14px 10px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{point.icon}</div>
                        <div style={{ fontSize: 15, color: point.color, fontWeight: "bold", lineHeight: 1.4 }}>{point.text}</div>
                    </div>
                ))}
            </div>

            {/* 金句 */}
            <div
                style={{
                    opacity: quoteOpacity,
                    transform: `scale(${quoteScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 20,
                    padding: "14px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 20, fontWeight: "bold", color: THEME.accentSub }}>
                    AI 不只是帮你省时间，而是
                    <span style={{ color: `rgba(240,136,62,${highlight})` }}>帮你把时间变得更值钱</span>
                </div>
            </div>
        </div>
    );
};
