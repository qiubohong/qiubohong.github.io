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

const advantages = [
    { icon: "🎯", text: "你想学什么，它就能教什么", color: "#f0883e" },
    { icon: "📊", text: "你想学多深，它就能讲多深", color: "#58a6ff" },
    { icon: "⏱️", text: "你只有 5 分钟，它就能压缩到 5 分钟", color: "#3fb950" },
    { icon: "🎧", text: "你想边走边听，它就能生成可以\"听\"的版本", color: "#f778ba" },
];

const traditionalProblems = [
    { icon: "💸", text: "报班买课，贵" },
    { icon: "🪑", text: "专门腾时间，坐定了听" },
    { icon: "📅", text: "时间被撕成碎片，学不了" },
];

export const ATScene2_WhyAI: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 传统问题卡片
    const tradOpacities = traditionalProblems.map((_, i) =>
        interpolate(frame, [25 + i * 16, 45 + i * 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 箭头
    const arrowOpacity = interpolate(frame, [80, 100], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 4大优势卡片 2×2
    const advOpacities = advantages.map((_, i) =>
        interpolate(frame, [105 + i * 18, 128 + i * 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const advScales = advantages.map((_, i) =>
        interpolate(frame, [105 + i * 18, 128 + i * 18], [0.7, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [185, 210], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [185, 210], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.6 + Math.sin(frame * 0.15) * 0.4;
    // 背景装饰浮动
    const floatY = Math.sin(frame * 0.04) * 7;

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
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "10%", right: "5%", fontSize: 60, opacity: 0.06, transform: `translateY(${floatY}px)` }}>🌟</div>
            <div style={{ position: "absolute", bottom: "10%", left: "4%", fontSize: 50, opacity: 0.06, transform: `translateY(${-floatY}px)` }}>💡</div>

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, textAlign: "center" }}>
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    为什么 AI 是未来最好的老师？
                </div>
                <h2
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    传统学习 vs AI 学习
                </h2>
            </div>

            {/* 传统学习问题 */}
            <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 680 }}>
                {traditionalProblems.map((prob, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: tradOpacities[i],
                            background: "rgba(248,81,73,0.08)",
                            border: "1px solid rgba(248,81,73,0.25)",
                            borderRadius: 12,
                            padding: "12px 10px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 26, marginBottom: 6 }}>{prob.icon}</div>
                        <div style={{ fontSize: 14, color: THEME.textMuted, textDecoration: "line-through" }}>{prob.text}</div>
                    </div>
                ))}
            </div>

            {/* 箭头 */}
            <div
                style={{
                    opacity: arrowOpacity,
                    fontSize: 28,
                    color: THEME.accent,
                }}
            >
                ⬇️ AI 私教完全不同
            </div>

            {/* 4大优势 2×2 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                {advantages.map((adv, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: advOpacities[i],
                            transform: `scale(${advScales[i]})`,
                            background: `${adv.color}12`,
                            border: `1px solid ${adv.color}44`,
                            borderRadius: 14,
                            padding: "14px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span style={{ fontSize: 30, flexShrink: 0 }}>{adv.icon}</span>
                        <div style={{ fontSize: 16, color: adv.color, fontWeight: "bold", lineHeight: 1.4 }}>
                            {adv.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "bold",
                    maxWidth: 640,
                    lineHeight: 1.5,
                }}
            >
                这不就是你梦寐以求的
                <span style={{ color: `rgba(255,210,0,${highlight})` }}>「私人老师」</span>
                吗？
            </div>
        </div>
    );
};
