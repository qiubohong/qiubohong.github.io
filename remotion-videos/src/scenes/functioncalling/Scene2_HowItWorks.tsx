import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

// 统一主题配置
const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const FC_Scene2_HowItWorks: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 步骤卡片动画
    const step1Opacity = interpolate(frame, [30, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step1Slide = interpolate(frame, [30, 55], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step2Opacity = interpolate(frame, [60, 85], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step2Slide = interpolate(frame, [60, 85], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step3Opacity = interpolate(frame, [90, 115], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step3Slide = interpolate(frame, [90, 115], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const step4Opacity = interpolate(frame, [120, 145], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step4Slide = interpolate(frame, [120, 145], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const noteOpacity = interpolate(frame, [150, 175], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 脉冲动画（强调"两次"）
    const pulse = 1 + Math.sin(frame * 0.1) * 0.03;

    const steps = [
        {
            num: "1",
            color: "#58a6ff",
            icon: "💬",
            title: "用户提问",
            desc: "用户发送消息，如「北京天气怎么样？」",
            opacity: step1Opacity,
            slide: step1Slide,
        },
        {
            num: "2",
            color: "#f0883e",
            icon: "🧠",
            title: "模型第一次调用：分析意图",
            desc: "模型分析需求，返回函数调用指令：调用 get_weather(location='北京')",
            opacity: step2Opacity,
            slide: step2Slide,
        },
        {
            num: "3",
            color: "#3fb950",
            icon: "⚙️",
            title: "程序执行函数",
            desc: "你的程序执行真实 API，获取北京实时天气数据",
            opacity: step3Opacity,
            slide: step3Slide,
        },
        {
            num: "4",
            color: "#ffd200",
            icon: "✨",
            title: "模型第二次调用：生成回复",
            desc: "模型整合函数结果，生成自然语言回复给用户",
            opacity: step4Opacity,
            slide: step4Slide,
        },
    ];

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "40px 48px",
                boxSizing: "border-box",
                gap: "20px",
            }}
        >
            {/* 背景装饰 */}
            <div
                style={{
                    position: "absolute",
                    top: "-100px",
                    right: "-100px",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    textAlign: "center",
                    flexShrink: 0,
                }}
            >
                <h1
                    style={{
                        fontSize: "64px",
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: "8px",
                    }}
                >
                    工作原理
                </h1>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "rgba(240,136,62,0.1)",
                        border: "1px solid rgba(240,136,62,0.3)",
                        borderRadius: "999px",
                        padding: "8px 24px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "28px",
                            color: THEME.accent,
                            fontWeight: "bold",
                            transform: `scale(${pulse})`,
                            display: "inline-block",
                        }}
                    >
                        核心：大模型被调用了两次！
                    </span>
                </div>
            </div>

            {/* 步骤列表 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    minHeight: 0,
                }}
            >
                {steps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: step.opacity,
                            transform: `translateY(${step.slide}px)`,
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        <div
                            style={{
                                background: `rgba(${step.color === "#58a6ff"
                                    ? "88,166,255"
                                    : step.color === "#f0883e"
                                        ? "240,136,62"
                                        : step.color === "#3fb950"
                                            ? "63,185,80"
                                            : "255,210,0"
                                    },0.08)`,
                                borderRadius: "14px",
                                padding: "16px 24px",
                                border: `1px solid ${step.color}30`,
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                height: "100%",
                                boxSizing: "border-box",
                            }}
                        >
                            {/* 步骤编号 */}
                            <div
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "50%",
                                    background: step.color,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "26px",
                                    fontWeight: "bold",
                                    color: "#0d1117",
                                    flexShrink: 0,
                                }}
                            >
                                {step.num}
                            </div>
                            {/* 图标 */}
                            <div style={{ fontSize: "36px", flexShrink: 0 }}>{step.icon}</div>
                            {/* 内容 */}
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                        color: step.color,
                                        marginBottom: "4px",
                                    }}
                                >
                                    {step.title}
                                </div>
                                <div style={{ fontSize: "24px", color: THEME.textPrimary }}>
                                    {step.desc}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 底部注意事项 */}
            <div
                style={{
                    opacity: noteOpacity,
                    flexShrink: 0,
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "12px",
                    padding: "14px 24px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textAlign: "center",
                }}
            >
                <span style={{ fontSize: "24px", color: THEME.textSecondary }}>
                    ⚠️ 模型只负责生成"指令"，真正执行的是你的程序！
                </span>
            </div>
        </AbsoluteFill>
    );
};
