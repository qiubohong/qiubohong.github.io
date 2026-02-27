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

export const TasteScene7_Summary: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const contentOpacity = interpolate(frame, [35, 65], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const stepsOpacity = interpolate(frame, [70, 100], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const nextOpacity = interpolate(frame, [110, 140], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 52,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                🎬 从"伸手党"到"导演"
            </h2>

            {/* 核心观点 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.7,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: THEME.cardBg,
                    padding: "22px 36px",
                    borderRadius: 18,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 28,
                }}
            >
                <p style={{ margin: 0 }}>
                    AI时代，生成内容变得无比廉价<br />
                    真正稀缺的是<strong style={{ color: THEME.accentSub }}>判断力</strong><br />
                    会提问让你起步，<strong style={{ color: THEME.accent }}>会筛选才让你出众</strong>
                </p>
            </div>

            {/* 三步总结 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 18,
                    opacity: stepsOpacity,
                    marginBottom: 28,
                }}
            >
                {[
                    { icon: "📚", label: "审美库", color: "#f0883e" },
                    { icon: "🎯", label: "精准表达", color: "#58a6ff" },
                    { icon: "📋", label: "个人规则", color: "#3fb950" },
                ].map((step, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 16,
                            padding: "20px 28px",
                            minWidth: 130,
                            borderTop: `3px solid ${step.color}`,
                        }}
                    >
                        <span style={{ fontSize: 40, marginBottom: 10 }}>{step.icon}</span>
                        <span style={{ fontSize: 26, fontWeight: "bold", color: step.color }}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* 下一期预告 */}
            <div
                style={{
                    fontSize: 24,
                    textAlign: "center",
                    opacity: nextOpacity,
                    color: THEME.textMuted,
                    padding: "16px 30px",
                    borderRadius: 12,
                    background: THEME.cardBg,
                    maxWidth: "85%",
                    lineHeight: 1.6,
                }}
            >
                下一期：<strong style={{ color: "#58a6ff" }}>高效信息处理</strong><br />
                <span style={{ fontSize: 20 }}>如何让AI把几天的阅读整理，压缩到几分钟完成？</span>
            </div>
        </div>
    );
};
