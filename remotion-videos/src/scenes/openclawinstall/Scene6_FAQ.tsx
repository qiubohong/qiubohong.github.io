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

const ISSUES = [
    {
        q: "Q1：一键脚本安装失败？",
        a: "网络问题：重新执行命令，或使用 VPN\n权限问题：命令前加 sudo",
        color: "#f0883e",
    },
    {
        q: "Q2：npm 找不到命令？",
        a: "先安装 Node.js，再执行：npm install -g openclaw@latest",
        color: "#58a6ff",
    },
    {
        q: "Q3：启动命令不存在？",
        a: "正确流程：onboard → gateway start → dashboard",
        color: "#3fb950",
    },
];

export const OpenClawInstall_Scene6_FAQ: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 诊断命令高亮
    const cmdHighlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    // 弥散光球动画
    const lightX1 = 80 + Math.sin(frame * 0.008) * 8;
    const lightY1 = 20 + Math.cos(frame * 0.006) * 6;

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
                gap: "24px",
            }}
        >
            {/* 弥散光背景 */}
            <div style={{
                position: "absolute",
                left: `${lightX1}%`, top: `${lightY1}%`,
                width: 450, height: 450, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "56px", fontWeight: 900, margin: 0,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.04em",
                }}>
                    遇到问题别慌！
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                    90% 的问题，一条命令自动修复
                </p>
            </div>

            {/* 诊断工具高亮展示 */}
            {frame > 20 && (
                <div style={{
                    opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    background: `rgba(63,185,80,${cmdHighlight * 0.1})`,
                    borderRadius: "16px", padding: "20px 28px",
                    border: `1px solid rgba(63,185,80,${cmdHighlight * 0.5})`,
                    boxShadow: `0 0 20px rgba(63,185,80,${cmdHighlight * 0.2})`,
                    flexShrink: 0,
                }}>
                    <p style={{ fontSize: "36px", color: "#3fb950", margin: "0 0 10px 0", fontWeight: "bold" }}>
                        🔧 一键诊断修复工具
                    </p>
                    <code style={{
                        fontSize: "48px",
                        color: `rgba(63,185,80,${cmdHighlight})`,
                        fontFamily: "monospace",
                        display: "block",
                        marginBottom: "10px",
                    }}>
                        openclaw doctor --fix
                    </code>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        {["✅ 环境检查", "✅ 配置验证", "✅ 服务状态", "✅ 自动修复"].map((item, i) => (
                            <span key={i} style={{
                                fontSize: "18px", color: THEME.textSecondary,
                                background: "rgba(63,185,80,0.1)",
                                borderRadius: "999px", padding: "4px 14px",
                                border: "1px solid rgba(63,185,80,0.2)",
                            }}>{item}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* 常见问题列表 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                {ISSUES.map((issue, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 50 - i * 15), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity, transform: `translateY(${cardY}px)`,
                            background: THEME.cardBg, borderRadius: "14px",
                            padding: "18px 24px",
                            border: `1px solid ${issue.color}25`,
                            backdropFilter: "blur(16px)",
                        }}>
                            <p style={{ fontSize: "36px", color: issue.color, fontWeight: "bold", margin: "0 0 8px 0" }}>
                                {issue.q}
                            </p>
                            <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0, whiteSpace: "pre-line", lineHeight: 1.6 }}>
                                {issue.a}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* 求助提示 */}
            {frame > 100 && (
                <div style={{
                    opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    background: "rgba(88,166,255,0.08)", borderRadius: "12px",
                    padding: "14px 24px", border: "1px solid rgba(88,166,255,0.2)",
                    flexShrink: 0,
                }}>
                    <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                        💬 还解决不了？在评论区留言，告诉我你的操作系统和错误提示，我来帮你！
                    </p>
                </div>
            )}
        </AbsoluteFill>
    );
};
