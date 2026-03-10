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
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

// 打字机效果
const getTypingText = (
    text: string,
    frame: number,
    startFrame: number,
    charsPerFrame = 1.5
) => {
    const elapsed = Math.max(0, frame - startFrame);
    const charsToShow = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, charsToShow);
};

export const FC_Scene5_CodeDemo: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 左侧步骤动画
    const step1Opacity = interpolate(frame, [20, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step2Opacity = interpolate(frame, [45, 70], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step3Opacity = interpolate(frame, [70, 95], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step4Opacity = interpolate(frame, [95, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const step5Opacity = interpolate(frame, [120, 145], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 右侧对话框展开动画
    const CHAT_SHOW_START = 80;
    const chatPanelWidth = interpolate(
        frame,
        [CHAT_SHOW_START, CHAT_SHOW_START + 30],
        [0, 460],
        {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );
    const chatPanelOpacity = interpolate(
        frame,
        [CHAT_SHOW_START, CHAT_SHOW_START + 20],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 对话气泡动画
    const bubble1Opacity = interpolate(frame, [95, 115], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const bubble1Slide = interpolate(frame, [95, 115], [30, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const bubble2Opacity = interpolate(frame, [120, 140], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const bubble2Slide = interpolate(frame, [120, 140], [30, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const bubble3Opacity = interpolate(frame, [150, 170], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const bubble3Slide = interpolate(frame, [150, 170], [30, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 底部提示动画
    const tipOpacity = interpolate(frame, [180, 205], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 打字机文本
    const aiResponse1 = getTypingText(
        "调用 get_current_weather(location='北京')",
        frame,
        100,
        1.2
    );
    const aiResponse2 = getTypingText(
        "北京当前天气晴，温度25摄氏度",
        frame,
        125,
        1.5
    );
    const aiResponse3 = getTypingText(
        "北京今天天气晴朗，气温25°C，适合出行！",
        frame,
        155,
        1.2
    );

    const steps = [
        {
            num: "1",
            color: "#58a6ff",
            text: "定义 tools 列表",
            opacity: step1Opacity,
        },
        {
            num: "2",
            color: "#f0883e",
            text: "第一次调用模型",
            opacity: step2Opacity,
        },
        {
            num: "3",
            color: "#3fb950",
            text: "程序执行函数",
            opacity: step3Opacity,
        },
        {
            num: "4",
            color: "#ffd200",
            text: "添加结果到输入列表",
            opacity: step4Opacity,
        },
        {
            num: "5",
            color: "#f778ba",
            text: "第二次调用生成回复",
            opacity: step5Opacity,
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
                padding: "36px 48px",
                boxSizing: "border-box",
                gap: "16px",
            }}
        >
            {/* 背景装饰 */}
            <div
                style={{
                    position: "absolute",
                    top: "-100px",
                    left: "-100px",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, flexShrink: 0 }}>
                <h1
                    style={{
                        fontSize: "56px",
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: "4px",
                    }}
                >
                    实战代码演示
                </h1>
                <p style={{ fontSize: "24px", color: THEME.textSecondary }}>
                    使用 OpenAI Python SDK 实现天气查询
                </p>
            </div>

            {/* 主体：左右布局 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    gap: "20px",
                    minHeight: 0,
                }}
            >
                {/* 左侧：步骤列表 */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        minHeight: 0,
                    }}
                >
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: step.opacity,
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
                                                    : step.color === "#ffd200"
                                                        ? "255,210,0"
                                                        : "247,120,186"
                                        },0.08)`,
                                    borderRadius: "12px",
                                    padding: "12px 18px",
                                    border: `1px solid ${step.color}25`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "14px",
                                    height: "100%",
                                    boxSizing: "border-box",
                                }}
                            >
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: step.color,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: "#0d1117",
                                        flexShrink: 0,
                                    }}
                                >
                                    {step.num}
                                </div>
                                <span
                                    style={{
                                        fontSize: "24px",
                                        color: step.color,
                                        fontWeight: "600",
                                    }}
                                >
                                    {step.text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 右侧：AI 对话动画 */}
                <div
                    style={{
                        width: chatPanelWidth,
                        flexShrink: 0,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        opacity: chatPanelOpacity,
                    }}
                >
                    <div
                        style={{
                            background: "#161b22",
                            borderRadius: "14px",
                            border: "1px solid rgba(88,166,255,0.2)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        {/* macOS 风格标题栏 */}
                        <div
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                borderRadius: "12px 12px 0 0",
                                padding: "10px 16px",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: "#ff5f57",
                                }}
                            />
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: "#febc2e",
                                }}
                            />
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: "#28c840",
                                }}
                            />
                            <span
                                style={{
                                    marginLeft: 8,
                                    color: THEME.textSecondary,
                                    fontSize: 18,
                                }}
                            >
                                AI 对话流程
                            </span>
                        </div>

                        {/* 对话内容 */}
                        <div
                            style={{
                                flex: 1,
                                padding: "16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                overflowY: "hidden",
                            }}
                        >
                            {/* 用户消息 */}
                            <div
                                style={{
                                    opacity: bubble1Opacity,
                                    transform: `translateY(${bubble1Slide}px)`,
                                    alignSelf: "flex-end",
                                    background: THEME.accent,
                                    color: "#fff",
                                    borderRadius: "12px 12px 2px 12px",
                                    padding: "10px 14px",
                                    maxWidth: "85%",
                                    fontSize: "20px",
                                }}
                            >
                                北京天气怎么样？
                            </div>

                            {/* AI 第一次响应 */}
                            <div
                                style={{
                                    opacity: bubble2Opacity,
                                    transform: `translateY(${bubble2Slide}px)`,
                                    alignSelf: "flex-start",
                                    background: "rgba(88,166,255,0.15)",
                                    border: "1px solid rgba(88,166,255,0.3)",
                                    color: THEME.textPrimary,
                                    borderRadius: "12px 12px 12px 2px",
                                    padding: "10px 14px",
                                    maxWidth: "90%",
                                    fontSize: "18px",
                                    fontFamily: '"Fira Code", monospace',
                                }}
                            >
                                🔧 {aiResponse1}
                                {frame >= 100 &&
                                    Math.floor(frame / 7) % 2 === 0 &&
                                    aiResponse1.length < 38 && (
                                        <span style={{ opacity: 0.7 }}>|</span>
                                    )}
                            </div>

                            {/* 函数执行结果 */}
                            <div
                                style={{
                                    opacity: bubble2Opacity,
                                    alignSelf: "center",
                                    background: "rgba(63,185,80,0.1)",
                                    border: "1px solid rgba(63,185,80,0.3)",
                                    color: "#3fb950",
                                    borderRadius: "8px",
                                    padding: "8px 14px",
                                    fontSize: "18px",
                                    fontFamily: '"Fira Code", monospace',
                                }}
                            >
                                ⚙️ 执行结果：{aiResponse2}
                            </div>

                            {/* AI 最终回复 */}
                            <div
                                style={{
                                    opacity: bubble3Opacity,
                                    transform: `translateY(${bubble3Slide}px)`,
                                    alignSelf: "flex-start",
                                    background: "rgba(88,166,255,0.15)",
                                    border: "1px solid rgba(88,166,255,0.3)",
                                    color: THEME.textPrimary,
                                    borderRadius: "12px 12px 12px 2px",
                                    padding: "10px 14px",
                                    maxWidth: "90%",
                                    fontSize: "20px",
                                }}
                            >
                                ✨ {aiResponse3}
                                {frame >= 155 &&
                                    Math.floor(frame / 7) % 2 === 0 &&
                                    aiResponse3.length < 20 && (
                                        <span style={{ opacity: 0.7 }}>|</span>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部提示 */}
            <div
                style={{
                    opacity: tipOpacity,
                    flexShrink: 0,
                    background: "rgba(255,210,0,0.08)",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    border: "1px solid rgba(255,210,0,0.2)",
                    textAlign: "center",
                }}
            >
                <span style={{ fontSize: "22px", color: THEME.accentAlt }}>
                    💡 国产大模型（通义千问、DeepSeek）兼容 OpenAI API，换个 base_url 就能用！
                </span>
            </div>
        </AbsoluteFill>
    );
};
