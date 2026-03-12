import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

// 统一设计 Token
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

export const PromptScene10_Summary: React.FC = () => {
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
                🎯 记住这四个词
            </h2>

            {/* 核心内容 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.7,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: THEME.cardBg,
                    padding: "20px 35px",
                    borderRadius: 18,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 30,
                }}
            >
                <p style={{ margin: 0 }}>
                    提示词工程不是高深技术<br />
                    就是学会<strong style={{ color: THEME.accentSub }}>"好好说话"</strong><br />
                    不需要懂编程，不需要懂算法
                </p>
            </div>

            {/* 四步总结 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    opacity: stepsOpacity,
                    marginBottom: 30,
                }}
            >
                {[
                    { icon: "🎭", label: "角色", color: "#f0883e" },
                    { icon: "📖", label: "背景", color: "#58a6ff" },
                    { icon: "✅", label: "任务", color: "#3fb950" },
                    { icon: "📋", label: "格式", color: "#f778ba" },
                ].map((step, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 16,
                            padding: "20px 25px",
                            minWidth: 120,
                            borderTop: `3px solid ${step.color}`,
                        }}
                    >
                        <span style={{ fontSize: 40, marginBottom: 10 }}>{step.icon}</span>
                        <span style={{ fontSize: 30, fontWeight: "bold", color: step.color }}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* 下一期预告 */}
            <div
                style={{
                    fontSize: 26,
                    textAlign: "center",
                    opacity: nextOpacity,
                    color: THEME.textMuted,
                    padding: "15px 30px",
                    borderRadius: 12,
                    background: THEME.cardBg,
                    maxWidth: "85%",
                    lineHeight: 1.6,
                }}
            >
                下一期：<strong style={{ color: "#58a6ff" }}>审美鉴赏力</strong><br />
                <span style={{ fontSize: 22 }}>为什么高手总能从AI答案里挑出那个"对的"？</span>
            </div>
        </div>
    );
};
