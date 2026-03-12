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

export const TasteScene3_ThreeSteps: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step1Opacity = interpolate(frame, [35, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step2Opacity = interpolate(frame, [65, 90], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step3Opacity = interpolate(frame, [95, 120], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const steps = [
        {
            num: "01",
            icon: "📚",
            title: "建立审美库",
            desc: "多看好的，才知道什么是好",
            color: "#f0883e",
            opacity: step1Opacity,
        },
        {
            num: "02",
            icon: "🎯",
            title: "修炼精准表达",
            desc: "用对的词，引导AI给对的答案",
            color: "#58a6ff",
            opacity: step2Opacity,
        },
        {
            num: "03",
            icon: "📋",
            title: "制定个人规则",
            desc: "把审美固化，让AI次次都懂你",
            color: "#3fb950",
            opacity: step3Opacity,
        },
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
                    marginBottom: 12,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                三步提升你的"AI 审美"
            </h2>

            <div
                style={{
                    fontSize: 26,
                    color: THEME.textMuted,
                    marginBottom: 36,
                    opacity: titleOpacity,
                    textAlign: "center",
                }}
            >
                审美不是天生的，完全可以后天培养
            </div>

            {/* 三步卡片 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    width: "88%",
                }}
            >
                {steps.map((step) => (
                    <div
                        key={step.num}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 18,
                            padding: "20px 28px",
                            opacity: step.opacity,
                            borderLeft: `5px solid ${step.color}`,
                            gap: 20,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 44,
                                fontWeight: "bold",
                                color: step.color,
                                minWidth: 60,
                                textAlign: "center",
                                opacity: 0.4,
                            }}
                        >
                            {step.num}
                        </div>
                        <div style={{ fontSize: 40, minWidth: 50 }}>{step.icon}</div>
                        <div>
                            <div style={{ fontSize: 30, fontWeight: "bold", color: step.color, marginBottom: 6 }}>
                                {step.title}
                            </div>
                            <div style={{ fontSize: 24, color: THEME.textSecondary }}>
                                {step.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
