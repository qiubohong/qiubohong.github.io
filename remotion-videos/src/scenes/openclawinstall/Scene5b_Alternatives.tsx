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

const ALTERNATIVES = [
    {
        icon: "💼",
        name: "腾讯 WorkBuddy",
        company: "腾讯",
        color: "#58a6ff",
        feature: "深度集成企业微信",
        scene: "企业办公、团队协作",
        how: "企业微信应用市场安装",
    },
    {
        icon: "🌙",
        name: "Kimi Claw",
        company: "月之暗面",
        color: "#f0883e",
        feature: "支持微博平台接入",
        scene: "社交媒体运营、内容创作",
        how: "访问 Kimi 官网申请",
    },
    {
        icon: "🧠",
        name: "智谱 AutoClaw",
        company: "智谱 AI",
        color: "#3fb950",
        feature: "中文理解能力强",
        scene: "文档处理、知识问答",
        how: "智谱 AI 开放平台申请",
    },
    {
        icon: "🎭",
        name: "MiniMax MaxClaw",
        company: "MiniMax",
        color: "#ffd200",
        feature: "多模态：图片+语音",
        scene: "客服机器人、智能对话",
        how: "MiniMax 官网申请",
    },
    {
        icon: "📝",
        name: "字节 Moltbook",
        company: "字节跳动",
        color: "#f778ba",
        feature: "深度集成飞书",
        scene: "笔记管理、知识库构建",
        how: "飞书应用市场安装",
    },
];

export const OpenClawInstall_Scene5b_Alternatives: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光球动画
    const lightX = 50 + Math.sin(frame * 0.006) * 15;
    const lightY = 80 + Math.cos(frame * 0.005) * 10;

    // 底部选择建议淡入
    const tipOpacity = interpolate(frame, [90, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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
                left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(247,120,186,0.12) 0%, transparent 70%)",
                filter: "blur(100px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "52px", fontWeight: 900, margin: 0,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.04em",
                }}>
                    🇨🇳 国内替代方案（基于 OpenClaw 开源）
                </h2>
                <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                    更符合国人使用习惯，5 个主流选择
                </p>
            </div>

            {/* 5个替代方案卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1 }}>
                {ALTERNATIVES.map((alt, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 15 - i * 10), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardX = interpolate(cardSpring, [0, 1], [-40, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
                    // 脉冲效果（每个卡片错开）
                    const pulse = 0.7 + Math.sin(frame * 0.08 + i * 1.2) * 0.3;

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            transform: `translateX(${cardX}px)`,
                            display: "flex", alignItems: "center", gap: "20px",
                            background: THEME.cardBg,
                            borderRadius: "14px", padding: "16px 24px",
                            border: `1px solid ${alt.color}25`,
                            backdropFilter: "blur(16px)",
                        }}>
                            {/* 图标 */}
                            <span style={{ fontSize: "36px", flexShrink: 0 }}>{alt.icon}</span>

                            {/* 名称 + 公司 */}
                            <div style={{ width: "220px", flexShrink: 0 }}>
                                <div style={{ fontSize: "36px", color: alt.color, fontWeight: "bold" }}>{alt.name}</div>
                                <div style={{ fontSize: "24px", color: THEME.textSecondary }}>{alt.company}</div>
                            </div>

                            {/* 特点 */}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                    <span style={{
                                        fontSize: "16px", color: alt.color,
                                        background: `${alt.color}15`,
                                        border: `1px solid ${alt.color}30`,
                                        borderRadius: "999px", padding: "2px 10px",
                                    }}>✨ {alt.feature}</span>
                                </div>
                                <div style={{ fontSize: "24px", color: THEME.textSecondary }}>
                                    📌 {alt.scene}
                                </div>
                            </div>

                            {/* 获取方式 */}
                            <div style={{
                                flexShrink: 0,
                                background: `${alt.color}10`,
                                borderRadius: "8px", padding: "8px 14px",
                                border: `1px solid ${alt.color}20`,
                                width: "300px",
                                textAlign: "center",
                            }}>
                                <div style={{ fontSize: "16px", color: THEME.textSecondary, marginBottom: "2px" }}>获取方式</div>
                                <div style={{ fontSize: "24px", color: alt.color }}>{alt.how}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 底部选择建议 */}
            <div style={{
                opacity: tipOpacity,
                flexShrink: 0,
                display: "flex", gap: "16px",
            }}>
                <div style={{
                    flex: 1, background: "rgba(88,166,255,0.08)", borderRadius: "12px",
                    padding: "14px 20px", border: "1px solid rgba(88,166,255,0.2)",
                }}>
                    <p style={{ fontSize: "17px", color: "#58a6ff", margin: 0, fontWeight: "bold" }}>👤 个人用户</p>
                    <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: "4px 0 0 0" }}>官方 OpenClaw 或 Kimi Claw</p>
                </div>
                <div style={{
                    flex: 1, background: "rgba(240,136,62,0.08)", borderRadius: "12px",
                    padding: "14px 20px", border: "1px solid rgba(240,136,62,0.2)",
                }}>
                    <p style={{ fontSize: "17px", color: "#f0883e", margin: 0, fontWeight: "bold" }}>🏢 企业用户</p>
                    <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: "4px 0 0 0" }}>腾讯 WorkBuddy 或字节 Moltbook</p>
                </div>
                <div style={{
                    flex: 1, background: "rgba(63,185,80,0.08)", borderRadius: "12px",
                    padding: "14px 20px", border: "1px solid rgba(63,185,80,0.2)",
                }}>
                    <p style={{ fontSize: "17px", color: "#3fb950", margin: 0, fontWeight: "bold" }}>🔧 技术爱好者</p>
                    <p style={{ fontSize: "16px", color: THEME.textSecondary, margin: "4px 0 0 0" }}>官方 OpenClaw，可深度定制</p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
