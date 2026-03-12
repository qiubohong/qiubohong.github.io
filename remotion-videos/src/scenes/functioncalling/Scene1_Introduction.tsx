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

interface SceneProps {
    title?: string;
}

export const FC_Scene1_Introduction: React.FC<SceneProps> = ({ title }) => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 40], [50, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 副标题动画
    const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 卡片动画
    const card1Opacity = interpolate(frame, [40, 70], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card1Slide = interpolate(frame, [40, 70], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card2Opacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Slide = interpolate(frame, [60, 90], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card3Opacity = interpolate(frame, [80, 110], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card3Slide = interpolate(frame, [80, 110], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const taglineOpacity = interpolate(frame, [110, 140], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 浮动动画
    const floatY = Math.sin(frame * 0.05) * 6;

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
                gap: "16px",
            }}
        >
            {/* 背景装饰 */}
            <div
                style={{
                    position: "absolute",
                    top: "-200px",
                    right: "-200px",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-150px",
                    left: "-150px",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(240,136,62,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* 主标题区域 */}
            <div
                style={{
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `translateY(${titleSlide}px)`,
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        background: "rgba(88,166,255,0.1)",
                        border: "1px solid rgba(88,166,255,0.3)",
                        borderRadius: "999px",
                        padding: "6px 20px",
                        marginBottom: "12px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "26px",
                            color: "#58a6ff",
                            fontWeight: "bold",
                        }}
                    >
                        5分钟AI · 每天搞懂一个知识点
                    </span>
                </div>
                <h1
                    style={{
                        fontSize: "88px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        lineHeight: 1.1,
                    }}
                >
                    Function Calling
                </h1>
                <p
                    style={{
                        fontSize: "38px",
                        color: THEME.textPrimary,
                        opacity: subtitleOpacity,
                    }}
                >
                    让 AI 从"说说而已"变成"真正动手"
                </p>
            </div>

            {/* 核心定义卡片 */}
            <div
                style={{
                    opacity: card1Opacity,
                    transform: `translateY(${card1Slide}px)`,
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        background: "rgba(88,166,255,0.08)",
                        borderRadius: "16px",
                        padding: "22px 32px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "52px",
                            transform: `translateY(${floatY}px)`,
                            flexShrink: 0,
                        }}
                    >
                        🤖
                    </div>
                    <div>
                        <h2
                            style={{
                                fontSize: "36px",
                                fontWeight: "bold",
                                color: "#58a6ff",
                                marginBottom: "8px",
                            }}
                        >
                            一句话核心
                        </h2>
                        <p style={{ fontSize: "28px", color: THEME.textPrimary }}>
                            大模型在对话中，根据用户需求调用外部函数或工具的能力
                        </p>
                    </div>
                </div>
            </div>

            {/* 对比卡片 */}
            <div
                style={{
                    opacity: card2Opacity,
                    transform: `translateY(${card2Slide}px)`,
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        background: THEME.cardBg,
                        borderRadius: "16px",
                        padding: "20px 32px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        gap: "24px",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "16px",
                            background: "rgba(139,148,158,0.1)",
                            borderRadius: "12px",
                        }}
                    >
                        <div style={{ fontSize: "40px", marginBottom: "8px" }}>😶</div>
                        <div
                            style={{
                                fontSize: "26px",
                                color: THEME.textSecondary,
                                fontWeight: "bold",
                            }}
                        >
                            之前
                        </div>
                        <div style={{ fontSize: "24px", color: THEME.textSecondary }}>
                            "能说会道"的参谋
                        </div>
                    </div>
                    <div style={{ fontSize: "40px", color: THEME.accent }}>→</div>
                    <div
                        style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "16px",
                            background: "rgba(240,136,62,0.1)",
                            borderRadius: "12px",
                            border: "1px solid rgba(240,136,62,0.2)",
                        }}
                    >
                        <div style={{ fontSize: "40px", marginBottom: "8px" }}>💪</div>
                        <div
                            style={{
                                fontSize: "26px",
                                color: THEME.accent,
                                fontWeight: "bold",
                            }}
                        >
                            现在
                        </div>
                        <div style={{ fontSize: "24px", color: THEME.textPrimary }}>
                            "能动手做事"的助手
                        </div>
                    </div>
                </div>
            </div>

            {/* 核心价值 */}
            <div
                style={{
                    opacity: card3Opacity,
                    transform: `translateY(${card3Slide}px)`,
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <div
                    style={{
                        background: "rgba(63,185,80,0.08)",
                        borderRadius: "16px",
                        padding: "20px 32px",
                        border: "1px solid rgba(63,185,80,0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        height: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    <div style={{ fontSize: "48px", flexShrink: 0 }}>🎯</div>
                    <div>
                        <h2
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#3fb950",
                                marginBottom: "10px",
                            }}
                        >
                            核心价值
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                fontSize: "26px",
                                color: THEME.textPrimary,
                                flexWrap: "wrap",
                            }}
                        >
                            <span>✅ 查询实时信息</span>
                            <span>✅ 进行复杂计算</span>
                            <span>✅ 突破知识截止日期</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部标语 */}
            <div
                style={{
                    textAlign: "center",
                    opacity: taglineOpacity,
                    flexShrink: 0,
                }}
            >
                <span style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    今天，我们用 5 分钟搞懂 Function Calling 的核心秘密 👇
                </span>
            </div>
        </AbsoluteFill>
    );
};
