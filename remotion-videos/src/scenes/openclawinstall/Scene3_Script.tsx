import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
} from "remotion";

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

const STEPS = [
    {
        num: "1",
        title: "打开终端（黑窗口）",
        desc: "Windows: Win+R 输入 cmd\nmacOS: Cmd+空格 搜索终端\nLinux: Ctrl+Alt+T",
        color: "#58a6ff",
        icon: "💻",
    },
    {
        num: "2",
        title: "执行一键安装命令",
        code: "curl -fsSL https://openclaw.ai/install.sh | bash",
        desc: "复制粘贴，回车，等待5-10分钟",
        color: "#3fb950",
        icon: "⚡",
    },
    {
        num: "3",
        title: "输入 API Key（大脑钥匙）",
        desc: "选择大模型平台（推荐智谱AI）\n粘贴上一篇拿到的 API Key",
        color: "#f0883e",
        icon: "🔑",
    },
];

export const OpenClawInstall_Scene3_Script: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 命令行高亮闪烁
    const cmdHighlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    // 弥散光球动画
    const lightX1 = 20 + Math.sin(frame * 0.008) * 8;
    const lightY1 = 30 + Math.cos(frame * 0.006) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "28px",
            }}
        >
            {/* 弥散光背景 */}
            <div style={{
                position: "absolute",
                left: `${lightX1}%`, top: `${lightY1}%`,
                width: 450, height: 450, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(63,185,80,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: 0,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.04em",
                }}>
                    一键脚本安装：3步搞定
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: "8px 0 0 0", lineHeight: 1.8 }}>
                    全程只需复制粘贴一条命令，新手也能轻松完成
                </p>
            </div>

            {/* 步骤卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
                {STEPS.map((step, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 20 - i * 15), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            transform: `translateY(${cardY}px)`,
                            display: "flex", gap: "24px", alignItems: "flex-start",
                            background: THEME.cardBg, borderRadius: "20px",
                            padding: "24px 32px",
                            border: `1px solid ${step.color}30`,
                            backdropFilter: "blur(16px)",
                        }}>
                            {/* 步骤编号 */}
                            <div style={{
                                width: "56px", height: "56px", borderRadius: "50%",
                                background: `${step.color}20`,
                                border: `2px solid ${step.color}60`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <span style={{ fontSize: "48px", color: step.color, fontWeight: 900 }}>{step.num}</span>
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                                    <span style={{ fontSize: "48px" }}>{step.icon}</span>
                                    <span style={{ fontSize: "26px", color: step.color, fontWeight: "bold" }}>{step.title}</span>
                                </div>

                                {step.code && (
                                    <div style={{
                                        background: "rgba(0,0,0,0.4)",
                                        borderRadius: "10px", padding: "14px 20px",
                                        border: `1px solid rgba(63,185,80,${cmdHighlight * 0.5})`,
                                        marginBottom: "12px",
                                        boxShadow: `0 0 16px rgba(63,185,80,${cmdHighlight * 0.2})`,
                                    }}>
                                        <code style={{
                                            fontSize: "18px",
                                            color: `rgba(63,185,80,${cmdHighlight})`,
                                            fontFamily: "monospace",
                                            wordBreak: "break-all",
                                        }}>
                                            {step.code}
                                        </code>
                                    </div>
                                )}

                                <p style={{
                                    fontSize: "24px", color: THEME.textSecondary, margin: 0,
                                    whiteSpace: "pre-line", lineHeight: 1.8,
                                }}>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 安全提示 */}
            {frame > 100 && (
                <div style={{
                    opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    background: "rgba(88,166,255,0.08)", borderRadius: "12px",
                    padding: "14px 24px", border: "1px solid rgba(88,166,255,0.2)",
                    flexShrink: 0,
                }}>
                    <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0, lineHeight: 1.8 }}>
                        🔒 安全提示：安装脚本来自 OpenClaw 官方，可以放心使用
                    </p>
                </div>
            )}
        </AbsoluteFill>
    );
};
