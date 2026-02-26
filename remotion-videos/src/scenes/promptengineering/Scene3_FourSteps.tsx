import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

// 统一设计 Token
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

export const PromptScene3_FourSteps: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step1Opacity = interpolate(frame, [30, 55], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step2Opacity = interpolate(frame, [55, 80], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step3Opacity = interpolate(frame, [80, 105], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step4Opacity = interpolate(frame, [105, 130], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const steps = [
        { icon: "🎭", label: "角色", color: "#f0883e", opacity: step1Opacity },
        { icon: "📖", label: "背景", color: "#58a6ff", opacity: step2Opacity },
        { icon: "✅", label: "任务", color: "#3fb950", opacity: step3Opacity },
        { icon: "📋", label: "格式", color: "#f778ba", opacity: step4Opacity },
    ];

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
                    marginBottom: 15,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                四步提问法
            </h2>

            <p
                style={{
                    fontSize: 28,
                    color: THEME.textMuted,
                    marginBottom: 50,
                    opacity: titleOpacity,
                    textAlign: "center",
                }}
            >
                让AI秒懂你的心 🎯
            </p>

            {/* 四步卡片 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    width: "88%",
                }}
            >
                {steps.map((step, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 16,
                            padding: "20px 30px",
                            opacity: step.opacity,
                            borderLeft: `6px solid ${step.color}`,
                        }}
                    >
                        <span style={{ fontSize: 44, marginRight: 25 }}>{step.icon}</span>
                        <div>
                            <span
                                style={{
                                    fontSize: 38,
                                    fontWeight: "bold",
                                    color: step.color,
                                }}
                            >
                                第{["一", "二", "三", "四"][index]}步：{step.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
