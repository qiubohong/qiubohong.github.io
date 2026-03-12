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

const painPoints = [
    {
        icon: "📚",
        text: "想学点新东西，但不知道从哪开始，网上的课程又贵又花时间",
        color: "#f0883e",
    },
    {
        icon: "⏰",
        text: "开车、做家务、健身的时候，有大把碎片时间，却不知道能拿来干什么",
        color: "#58a6ff",
    },
];

const timeFragments = [
    { icon: "🚗", label: "通勤路上" },
    { icon: "🏃", label: "健身时刻" },
    { icon: "🍳", label: "做饭空档" },
    { icon: "🛒", label: "排队间隙" },
];

export const ATScene1_Introduction: React.FC = () => {
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
        interpolate(frame, [30 + i * 25, 55 + i * 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardYs = painPoints.map((_, i) =>
        interpolate(frame, [30 + i * 25, 55 + i * 25], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 碎片时间图标弹入
    const fragOpacities = timeFragments.map((_, i) =>
        interpolate(frame, [90 + i * 14, 110 + i * 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const fragScales = timeFragments.map((_, i) =>
        interpolate(frame, [90 + i * 14, 110 + i * 14], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    const revealOpacity = interpolate(frame, [155, 180], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const revealScale = interpolate(frame, [155, 180], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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
                gap: 22,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 70, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🎓</div>
            <div style={{ position: "absolute", bottom: "12%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>📖</div>
            <div style={{ position: "absolute", top: "45%", right: "3%", fontSize: 45, opacity: 0.05, transform: `translateY(${floatY3}px)` }}>🎧</div>

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                    marginBottom: 4,
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 10, letterSpacing: 2 }}>
                    技能九 · AI 私人老师
                </div>
                <h1
                    style={{
                        fontSize: 46,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                        margin: 0,
                    }}
                >
                    你有没有这样的时刻？
                </h1>
            </div>

            {/* 痛点卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 720 }}>
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
                        <span style={{ fontSize: 36, flexShrink: 0 }}>{point.icon}</span>
                        <div style={{ fontSize: 19, color: THEME.textSecondary, lineHeight: 1.5 }}>
                            {point.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* 碎片时间展示 */}
            <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 680 }}>
                {timeFragments.map((frag, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: fragOpacities[i],
                            transform: `scale(${fragScales[i]})`,
                            background: "rgba(255,210,0,0.08)",
                            border: "1px solid rgba(255,210,0,0.25)",
                            borderRadius: 14,
                            padding: "12px 8px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 28, marginBottom: 6 }}>{frag.icon}</div>
                        <div style={{ fontSize: 14, color: THEME.textMuted }}>{frag.label}</div>
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
                <div style={{ fontSize: 24, fontWeight: "bold", color: THEME.accentSub }}>
                    🎓 把 AI 变成你的私人老师
                </div>
                <div style={{ fontSize: 17, color: THEME.textMuted, marginTop: 8 }}>
                    随时随地学习，量身定制内容——这是最后一个，也是最能改变你生活的技能！
                </div>
            </div>
        </div>
    );
};
