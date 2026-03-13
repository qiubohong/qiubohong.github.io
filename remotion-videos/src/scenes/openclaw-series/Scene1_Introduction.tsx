import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";

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

// OpenClaw 四个核心组成部分 - 根据文章内容定义
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

// AI 对比数据 - 根据文章内容定义
const AI_COMPARISON = [
    {
        name: "普通AI（DeepSeek/豆包）",
        type: "问答型",
        color: "#ff5555",
        examples: [
            "帮你整理桌面文件 → 给操作步骤说明",
            "帮你查天气 → 告诉你去哪个网站查",
            "帮你写邮件 → 写好内容让你自己发"
        ]
    },
    {
        name: "OpenClaw（龙虾AI）",
        type: "行动型",
        color: "#58a6ff",
        examples: [
            "帮你整理桌面文件 → 真的去分类整理",
            "帮你查天气 → 直接查好发给你",
            "帮你写邮件 → 写好直接帮你发出去"
        ]
    }
];

export const OpenClawSeries_Scene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    // 动画效果 - 使用更平滑的过渡
    const titleOpacity = interpolate(frame, [0, 45], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const titleSlide = interpolate(frame, [0, 60], [80, 0], {
        easing: Easing.out(Easing.back(1.2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const componentsOpacity = interpolate(frame, [60, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const comparisonOpacity = interpolate(frame, [120, 180], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const summaryOpacity = interpolate(frame, [180, 240], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁效果
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

    return (
        <AbsoluteFill style={{
            background: THEME.background,
            fontFamily: THEME.fontFamily,
            zIndex: 1 // 确保主场景内容在正确层级
        }}>
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

            {/* 主标题区域 */}
            <div style={{
                position: "absolute",
                top: "8%",
                left: "50%",
                transform: `translateX(-50%) translateY(${titleSlide}px)`,
                textAlign: "center",
                opacity: titleOpacity,
                width: "90%"
            }}>
                <h1 style={{
                    background: THEME.primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "68px",
                    fontWeight: "bold",
                    margin: 0,
                    marginBottom: "15px"
                }}>
                    普通人也能用好 OpenClaw
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    认识这个真正帮你干活的AI神器！
                </h2>
            </div>

            {/* OpenClaw 四个核心组成部分 */}
            <div style={{
                position: "absolute",
                top: "22%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95%",
                opacity: componentsOpacity
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "20px",
                    padding: "25px 30px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    marginBottom: "20px"
                }}>
                    <h3 style={{
                        color: "#58a6ff",
                        fontSize: "32px",
                        fontWeight: "bold",
                        margin: "0 0 15px 0",
                        textAlign: "center"
                    }}>
                        🦞 OpenClaw = 消息入口 + 大脑 + 技能 + 记忆
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
                                    padding: "20px",
                                    border: `2px solid rgba(${component.color === "#58a6ff" ? "88,166,255" : component.color === "#3fb950" ? "63,185,80" : component.color === "#f0883e" ? "240,136,62" : "255,210,0"},0.3)`,
                                    textAlign: "center"
                                }}>
                                    <div style={{
                                        fontSize: "40px",
                                        marginBottom: "10px"
                                    }}>
                                        {component.icon}
                                    </div>
                                    <h4 style={{
                                        color: component.color,
                                        fontSize: "22px",
                                        fontWeight: "bold",
                                        margin: "0 0 8px 0"
                                    }}>
                                        {component.name}
                                    </h4>
                                    <p style={{
                                        color: THEME.textPrimary,
                                        fontSize: "16px",
                                        lineHeight: "1.4",
                                        margin: "0 0 10px 0"
                                    }}>
                                        {component.description}
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "4px",
                                        justifyContent: "center"
                                    }}>
                                        {component.examples.map((example, i) => (
                                            <span key={i} style={{
                                                fontSize: "12px",
                                                color: component.color,
                                                background: `rgba(${component.color === "#58a6ff" ? "88,166,255" : component.color === "#3fb950" ? "63,185,80" : component.color === "#f0883e" ? "240,136,62" : "255,210,0"},0.15)`,
                                                borderRadius: "4px",
                                                padding: "2px 6px",
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

            {/* AI 对比展示 */}
            <div style={{
                position: "absolute",
                top: "62%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95%",
                opacity: comparisonOpacity
            }}>
                <div style={{
                    background: "rgba(240,136,62,0.08)",
                    borderRadius: "20px",
                    padding: "25px 30px",
                    border: "1px solid rgba(240,136,62,0.2)"
                }}>
                    <h3 style={{
                        color: "#f0883e",
                        fontSize: "32px",
                        fontWeight: "bold",
                        margin: "0 0 20px 0",
                        textAlign: "center"
                    }}>
                        🤔 普通AI vs OpenClaw：本质区别是什么？
                    </h3>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "25px"
                    }}>
                        {AI_COMPARISON.map((ai, index) => {
                            const aiOpacity = interpolate(frame, [130 + index * 25, 160 + index * 25], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            });
                            const aiSlide = interpolate(frame, [130 + index * 25, 160 + index * 25], [25, 0], {
                                easing: Easing.out(Easing.cubic),
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            });

                            return (
                                <div key={index} style={{
                                    opacity: aiOpacity,
                                    transform: `translateY(${aiSlide}px)`,
                                    background: `rgba(${ai.color === "#ff5555" ? "255,85,85" : "88,166,255"},0.1)`,
                                    borderRadius: "15px",
                                    padding: "20px",
                                    border: `2px solid rgba(${ai.color === "#ff5555" ? "255,85,85" : "88,166,255"},0.3)`
                                }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "15px"
                                    }}>
                                        <span style={{
                                            fontSize: "28px",
                                            marginRight: "10px"
                                        }}>
                                            {ai.type === "问答型" ? "💬" : "🦞"}
                                        </span>
                                        <h4 style={{
                                            color: ai.color,
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            margin: 0
                                        }}>
                                            {ai.name}
                                        </h4>
                                    </div>

                                    <div style={{
                                        background: `rgba(${ai.color === "#ff5555" ? "255,85,85" : "88,166,255"},0.15)`,
                                        borderRadius: "8px",
                                        padding: "12px"
                                    }}>
                                        <p style={{
                                            color: ai.color,
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                            margin: "0 0 10px 0",
                                            textAlign: "center"
                                        }}>
                                            {ai.type === "问答型" ? "聪明的顾问（只出主意，不动手）" : "聪明的员工（出主意，还动手）"}
                                        </p>
                                    </div>

                                    <ul style={{
                                        margin: "15px 0 0 0",
                                        paddingLeft: "20px"
                                    }}>
                                        {ai.examples.map((example, i) => (
                                            <li key={i} style={{
                                                color: THEME.textPrimary,
                                                fontSize: "16px",
                                                lineHeight: "1.5",
                                                marginBottom: "8px"
                                            }}>
                                                {example}
                                            </li>
                                        ))}
                                    </ul>
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
                opacity: summaryOpacity,
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
                        🎯 记住三件事：
                    </p>
                    <p style={{
                        color: THEME.textPrimary,
                        fontSize: "20px",
                        lineHeight: "1.6",
                        margin: 0
                    }}>
                        1. OpenClaw是本地运行的AI智能体<br />
                        2. 普通AI给建议，OpenClaw动手执行<br />
                        3. 四个核心组件：消息入口 + 大脑 + 技能 + 记忆
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};