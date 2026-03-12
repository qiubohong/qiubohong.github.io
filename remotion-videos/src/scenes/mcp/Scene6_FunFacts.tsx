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

const FACTS = [
    {
        icon: "💡",
        title: "灵感来源：LSP 协议",
        content: "MCP 深受语言服务器协议（LSP）启发。LSP 统一了 IDE 对编程语言的支持，MCP 旨在统一 AI 对工具的访问。",
        color: "#58a6ff",
        delay: 30,
    },
    {
        icon: "🔐",
        title: "权限控制设计",
        content: "工具由模型控制调用，数据访问权完全由用户控制。Server 无需将 API 密钥暴露给 LLM 提供商，安全性大幅提升。",
        color: "#3fb950",
        delay: 70,
    },
    {
        icon: "📈",
        title: "商业前景分析",
        content: "To C 领域（智能硬件、社交 App）前景广阔；To B 企业领域可能面临挑战，因企业更倾向于成为用户入口。",
        color: "#f0883e",
        delay: 110,
    },
];

export const MCP_Scene6_FunFacts: React.FC = () => {
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

    const floatY = Math.sin(frame * 0.06) * 5;
    const pulse = 1 + Math.sin(frame * 0.08) * 0.02;

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
                gap: "18px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", bottom: "-200px", right: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,210,0,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "16px",
            }}>
                <span style={{ fontSize: "56px", transform: `translateY(${floatY}px)` }}>❄️</span>
                <div>
                    <h1 style={{
                        fontSize: "60px",
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: "2px",
                    }}>
                        冷知识
                    </h1>
                    <p style={{ fontSize: "24px", color: THEME.textSecondary }}>
                        关于 MCP 协议，你可能不知道的三件事
                    </p>
                </div>
            </div>

            {/* 冷知识卡片 */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                minHeight: 0,
            }}>
                {FACTS.map((fact, i) => {
                    const factOpacity = interpolate(frame, [fact.delay, fact.delay + 30], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const factSlide = interpolate(frame, [fact.delay, fact.delay + 30], [30, 0], {
                        easing: Easing.out(Easing.back(1.2)),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    return (
                        <div key={i} style={{
                            opacity: factOpacity,
                            transform: `translateY(${factSlide}px)`,
                            background: THEME.cardBg,
                            borderRadius: "16px",
                            padding: "20px 28px",
                            border: `1px solid ${fact.color}30`,
                            flex: 1,
                            display: "flex",
                            gap: "20px",
                            alignItems: "flex-start",
                        }}>
                            <div style={{
                                fontSize: "44px",
                                flexShrink: 0,
                                transform: i === 0 ? `scale(${pulse})` : "none",
                            }}>
                                {fact.icon}
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: "28px",
                                    fontWeight: "bold",
                                    color: fact.color,
                                    marginBottom: "8px",
                                }}>
                                    {fact.title}
                                </h3>
                                <p style={{
                                    fontSize: "23px",
                                    color: THEME.textPrimary,
                                    lineHeight: 1.6,
                                }}>
                                    {fact.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
