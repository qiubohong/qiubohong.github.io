import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

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

const CALL_STEPS = [
    { num: "01", text: "列出 MCP 服务中可用的工具和资源", color: "#58a6ff" },
    { num: "02", text: "筛选出需要调用的工具或资源", color: "#3fb950" },
    { num: "03", text: "构造调用请求并发送给 MCP 服务", color: "#f0883e" },
    { num: "04", text: "处理 MCP 服务返回的结果", color: "#ffd200" },
    { num: "05", text: "将结果添加到输入中，继续与模型对话", color: "#d2a8ff" },
];

export const MCP_Scene4_ClientCall: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 35], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const tabOpacity = interpolate(frame, [20, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // AI 对话动画
    const CHAT_SHOW_START = 50;
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
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const getTypingText = (text: string, startFrame: number, charsPerFrame = 1.5) => {
        const elapsed = Math.max(0, frame - startFrame);
        return text.slice(0, Math.floor(elapsed * charsPerFrame));
    };

    const msg1 = "调用 greet 工具，name=\"Ford\"";
    const msg2 = "Hello, Ford! 🎉";

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
            <div style={{
                position: "absolute", top: "-200px", left: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "60px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "4px",
                }}>
                    调用 MCP 工具
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    大模型调用 MCP 服务的完整五步流程
                </p>
            </div>

            {/* 主体：左侧步骤 + 右侧对话动画 */}
            <div style={{
                flex: 1,
                display: "flex",
                gap: "20px",
                minHeight: 0,
                opacity: tabOpacity,
            }}>
                {/* 左侧：五步流程 */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}>
                    {CALL_STEPS.map((step, i) => {
                        const stepOpacity = interpolate(frame, [30 + i * 15, 55 + i * 15], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const stepSlide = interpolate(frame, [30 + i * 15, 55 + i * 15], [20, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                opacity: stepOpacity,
                                transform: `translateY(${stepSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "10px",
                                padding: "12px 18px",
                                border: `1px solid ${step.color}30`,
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                flex: 1,
                            }}>
                                <div style={{
                                    width: "40px", height: "40px", borderRadius: "50%",
                                    background: `${step.color}20`,
                                    border: `2px solid ${step.color}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "18px", fontWeight: "bold", color: step.color,
                                    flexShrink: 0,
                                }}>
                                    {step.num}
                                </div>
                                <span style={{ fontSize: "22px", color: THEME.textPrimary }}>{step.text}</span>
                            </div>
                        );
                    })}
                </div>

                {/* 右侧：AI 对话动画 */}
                <div style={{
                    width: chatPanelWidth,
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    opacity: chatPanelOpacity,
                }}>
                    <div style={{
                        background: "#161b22",
                        borderRadius: "12px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {/* 标题栏 */}
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "10px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                            <span style={{ marginLeft: 8, color: THEME.textSecondary, fontSize: 18 }}>MCP 调用演示</span>
                        </div>
                        {/* 对话内容 */}
                        <div style={{
                            flex: 1,
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}>
                            {/* 用户消息 */}
                            {frame >= CHAT_SHOW_START + 35 && (
                                <div style={{
                                    alignSelf: "flex-end",
                                    background: THEME.accent,
                                    color: "#fff",
                                    borderRadius: "12px 12px 2px 12px",
                                    padding: "10px 14px",
                                    maxWidth: "85%",
                                    fontSize: "20px",
                                }}>
                                    {getTypingText(msg1, CHAT_SHOW_START + 35, 1.2)}
                                </div>
                            )}
                            {/* AI 回复 */}
                            {frame >= CHAT_SHOW_START + 80 && (
                                <div style={{
                                    alignSelf: "flex-start",
                                    background: "rgba(88,166,255,0.15)",
                                    border: "1px solid rgba(88,166,255,0.3)",
                                    color: THEME.textPrimary,
                                    borderRadius: "12px 12px 12px 2px",
                                    padding: "10px 14px",
                                    maxWidth: "85%",
                                    fontSize: "20px",
                                }}>
                                    {getTypingText(msg2, CHAT_SHOW_START + 80, 1.5)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
