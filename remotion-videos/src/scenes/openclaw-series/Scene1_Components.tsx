import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// 主题常量定义
const THEME = {
    background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    primaryGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accentColor: "#f0883e",
    secondaryAccent: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBackground: "rgba(255,255,255,0.06)",
};

// OpenClaw 四个核心组成部分
const OPENCLAW_COMPONENTS = [
    {
        name: "🔌 消息入口",
        description: "你和龙虾沟通的'门'，支持QQ、飞书、微信等聊天工具",
        icon: "🚪",
        color: "#58a6ff",
        examples: ["QQ机器人", "飞书机器人", "微信接入"]
    },
    {
        name: "🧠 大脑（Agent）",
        description: "负责思考和规划，使用大模型理解指令、制定计划",
        icon: "🧠",
        color: "#3fb950",
        examples: ["DeepSeek", "通义千问", "豆包", "智谱GLM"]
    },
    {
        name: "🛠️ 技能（Skills）",
        description: "龙虾的'超能力'，每安装一个技能就多一种能力",
        icon: "🔧",
        color: "#f0883e",
        examples: ["天气查询", "邮件技能", "浏览器技能", "代码执行"]
    },
    {
        name: "🗂️ 记忆（Memory）",
        description: "让龙虾越用越懂你，有四层记忆系统",
        icon: "💾",
        color: "#ffd200",
        examples: ["灵魂记忆", "工具记忆", "用户记忆", "对话记忆"]
    }
];

export const OpenClawSeries_Scene1_Components: React.FC = () => {
    const frame = useCurrentFrame();

    // 动画效果
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const componentsOpacity = interpolate(frame, [60, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ background: THEME.background, fontFamily: THEME.fontFamily }}>
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-200px", left: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: "-150px", right: "-150px",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 主标题 */}
            <div style={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                opacity: titleOpacity,
                width: "90%"
            }}>
                <h1 style={{
                    background: THEME.primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "64px",
                    fontWeight: "bold",
                    margin: 0,
                    marginBottom: "10px"
                }}>
                    🦞 OpenClaw的四大核心组件
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: subtitleOpacity
                }}>
                    消息入口 + 大脑 + 技能 + 记忆 = 智能AI助手
                </h2>
            </div>

            {/* 核心组件展示 */}
            <div style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95%",
                opacity: componentsOpacity
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "20px",
                    padding: "30px",
                    border: "2px solid rgba(88,166,255,0.3)"
                }}>
                    <h3 style={{
                        color: "#58a6ff",
                        fontSize: "36px",
                        fontWeight: "bold",
                        margin: "0 0 25px 0",
                        textAlign: "center"
                    }}>
                        🔧 每个组件都有独特功能，缺一不可！
                    </h3>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "20px"
                    }}>
                        {OPENCLAW_COMPONENTS.map((component, index) => {
                            const itemOpacity = interpolate(frame, [70 + index * 15, 100 + index * 15], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            });
                            const itemSlide = interpolate(frame, [70 + index * 15, 100 + index * 15], [20, 0], {
                                easing: Easing.out(Easing.cubic),
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            });

                            return (
                                <div key={index} style={{
                                    opacity: itemOpacity,
                                    transform: `translateY(${itemSlide}px)`,
                                    background: `rgba(${component.color === "#58a6ff" ? "88,166,255" : component.color === "#3fb950" ? "63,185,80" : component.color === "#f0883e" ? "240,136,62" : "255,210,0"},0.1)`,
                                    borderRadius: "15px",
                                    padding: "25px",
                                    border: `2px solid rgba(${component.color === "#58a6ff" ? "88,166,255" : component.color === "#3fb950" ? "63,185,80" : component.color === "#f0883e" ? "240,136,62" : "255,210,0"},0.3)`,
                                    textAlign: "center",
                                    height: "320px"
                                }}>
                                    <div style={{
                                        fontSize: "48px",
                                        marginBottom: "15px"
                                    }}>
                                        {component.icon}
                                    </div>
                                    <h4 style={{
                                        color: component.color,
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                        margin: "0 0 15px 0"
                                    }}>
                                        {component.name}
                                    </h4>
                                    <p style={{
                                        color: THEME.textPrimary,
                                        fontSize: "20px",
                                        lineHeight: "1.5",
                                        margin: "0 0 20px 0"
                                    }}>
                                        {component.description}
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "6px",
                                        justifyContent: "center"
                                    }}>
                                        {component.examples.map((example, i) => (
                                            <span key={i} style={{
                                                fontSize: "14px",
                                                color: component.color,
                                                background: `rgba(${component.color === "#58a6ff" ? "88,166,255" : component.color === "#3fb950" ? "63,185,80" : component.color === "#f0883e" ? "240,136,62" : "255,210,0"},0.15)`,
                                                borderRadius: "6px",
                                                padding: "4px 8px",
                                                fontWeight: "bold"
                                            }}>
                                                {example}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 总结 */}
            <div style={{
                position: "absolute",
                bottom: "8%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: subtitleOpacity,
                textAlign: "center"
            }}>
                <div style={{
                    background: "rgba(240,136,62,0.15)",
                    borderRadius: "15px",
                    padding: "20px 30px",
                    border: "2px solid rgba(240,136,62,0.3)",
                    backdropFilter: "blur(10px)"
                }}>
                    <p style={{
                        color: "#f0883e",
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "0 0 10px 0"
                    }}>
                        🎯 记住：四个组件协同工作，才能让AI真正帮你干活！
                    </p>
                    <p style={{
                        color: THEME.textPrimary,
                        fontSize: "22px",
                        lineHeight: "1.5",
                        margin: 0
                    }}>
                        消息入口接收指令 → 大脑思考规划 → 技能执行任务 → 记忆学习优化
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};