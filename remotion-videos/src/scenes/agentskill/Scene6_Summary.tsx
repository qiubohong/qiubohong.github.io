import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
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

const SUMMARIES = [
    {
        num: "01",
        icon: "⚡",
        title: "不是超级提示词",
        desc: "关键区别在于脚本执行能力，AI 能真正动手运行代码，而不仅仅是生成建议",
        color: "#58a6ff",
        delay: 25,
    },
    {
        num: "02",
        icon: "🎯",
        title: "触发取决于描述",
        desc: "90% 取决于 SKILL.md 顶部的 description 字段，必须清晰说明做什么和何时触发",
        color: "#3fb950",
        delay: 60,
    },
    {
        num: "03",
        icon: "📍",
        title: "三种技能位置",
        desc: "个人技能（~/.claude/skills/）、项目技能（./.claude/skills/）、插件技能",
        color: "#f0883e",
        delay: 95,
    },
    {
        num: "04",
        icon: "🎯",
        title: "避免技能肥胖症",
        desc: "一个 Skill 只做一件事，拆分为多个小技能，Claude 可自动组合使用",
        color: "#ffd200",
        delay: 130,
    },
];

const MCP_COMPARE = [
    { label: "MCP", desc: "连接大模型与世界的桥梁", icon: "🌉", color: "#58a6ff" },
    { label: "Agent Skill", desc: "大模型操作世界的手", icon: "🤝", color: "#f0883e" },
];

const INTERACTION_QUESTION = "你觉得 Agent Skill 会如何改变你日常使用 AI 的方式？";

export const AgentSkill_Scene6_Summary: React.FC = () => {
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

    const compareOpacity = interpolate(frame, [160, 190], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const interactionOpacity = interpolate(frame, [200, 230], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const interactionSlide = interpolate(frame, [200, 230], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const floatY = Math.sin(frame * 0.05) * 4;

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
                gap: "14px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", bottom: "-200px", left: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,210,0,0.05) 0%, transparent 70%)",
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
                    总结
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    Agent Skill 的四个关键点 + 与 MCP 的关系
                </p>
            </div>

            {/* 四个关键点 */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minHeight: 0,
            }}>
                {SUMMARIES.map((s, i) => {
                    const sOpacity = interpolate(frame, [s.delay, s.delay + 25], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const sSlide = interpolate(frame, [s.delay, s.delay + 25], [20, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    return (
                        <div key={i} style={{
                            opacity: sOpacity,
                            transform: `translateY(${sSlide}px)`,
                            background: THEME.cardBg,
                            borderRadius: "12px",
                            padding: "12px 20px",
                            border: `1px solid ${s.color}30`,
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flex: 1,
                        }}>
                            <div style={{
                                width: "40px", height: "40px", borderRadius: "50%",
                                background: `${s.color}20`,
                                border: `2px solid ${s.color}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "16px", fontWeight: "bold", color: s.color,
                                flexShrink: 0,
                            }}>
                                {s.num}
                            </div>
                            <div>
                                <span style={{ fontSize: "22px", fontWeight: "bold", color: s.color }}>{s.icon} {s.title}</span>
                                <span style={{ fontSize: "20px", color: THEME.textPrimary, marginLeft: "10px" }}>{s.desc}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MCP vs Agent Skill 对比 */}
            <div style={{
                flexShrink: 0,
                opacity: compareOpacity,
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.06)",
                    borderRadius: "14px",
                    padding: "14px 24px",
                    border: "1px solid rgba(88,166,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}>
                    <span style={{ fontSize: "28px", transform: `translateY(${floatY}px)` }}>🔑</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "22px", fontWeight: "bold", color: THEME.accentAlt, marginBottom: "8px" }}>
                            Anthropic 官方解释
                        </div>
                        <div style={{ display: "flex", gap: "16px" }}>
                            {MCP_COMPARE.map((item, i) => (
                                <div key={i} style={{
                                    flex: 1,
                                    background: `${item.color}10`,
                                    borderRadius: "10px",
                                    padding: "10px 16px",
                                    border: `1px solid ${item.color}25`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}>
                                    <span style={{ fontSize: "28px" }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontSize: "20px", fontWeight: "bold", color: item.color }}>{item.label}</div>
                                        <div style={{ fontSize: "19px", color: THEME.textPrimary }}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 互动问题 */}
            <div style={{
                flexShrink: 0,
                opacity: interactionOpacity,
                transform: `translateY(${interactionSlide}px)`,
            }}>
                <div style={{
                    background: "rgba(255,210,0,0.06)",
                    borderRadius: "14px",
                    padding: "14px 24px",
                    border: "1px solid rgba(255,210,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                }}>
                    <span style={{ fontSize: "32px", flexShrink: 0 }}>💬</span>
                    <div>
                        <div style={{ fontSize: "20px", color: THEME.accentAlt, fontWeight: "bold", marginBottom: "4px" }}>
                            思考一下
                        </div>
                        <div style={{ fontSize: "22px", color: THEME.textPrimary }}>
                            {INTERACTION_QUESTION}
                        </div>
                        <div style={{ fontSize: "18px", color: THEME.textSecondary, marginTop: "4px" }}>
                            👇 欢迎在评论区分享你的想法！
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
