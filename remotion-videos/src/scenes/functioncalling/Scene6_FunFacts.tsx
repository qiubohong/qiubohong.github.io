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

const funFacts = [
    {
        icon: "🤲",
        color: "#58a6ff",
        title: "模型没有『手』",
        desc: "大模型只是超级大脑，只生成调用『计划』，不执行代码。真正动手的是你的程序！",
    },
    {
        icon: "📝",
        color: "#f0883e",
        title: "描述决定一切",
        desc: "函数的 description 写得越清晰准确，模型调用越精准。描述是模型的「眼睛」！",
    },
    {
        icon: "🎛️",
        color: "#3fb950",
        title: "「思考」过程可控",
        desc: "用 tool_choice 参数可强制调用某函数，或设为 none 禁止调用，完全由你掌控！",
    },
    {
        icon: "🔗",
        color: "#ffd200",
        title: "与 MCP 的关系",
        desc: "Function Calling 是基础版，MCP 是企业级工具箱协议。两者互补，不是替代关系！",
    },
];

export const FC_Scene6_FunFacts: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 卡片动画
    const cardOpacities = funFacts.map((_, i) =>
        interpolate(frame, [25 + i * 25, 50 + i * 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardSlides = funFacts.map((_, i) =>
        interpolate(frame, [25 + i * 25, 50 + i * 25], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 总结动画
    const summaryOpacity = interpolate(frame, [140, 165], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 浮动动画
    const floatY = Math.sin(frame * 0.05) * 5;

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
                    top: "-150px",
                    right: "-150px",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(255,210,0,0.05) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-100px",
                    left: "-100px",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(88,166,255,0.05) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    textAlign: "center",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "8px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "48px",
                            transform: `translateY(${floatY}px)`,
                            display: "inline-block",
                        }}
                    >
                        ❄️
                    </span>
                    <h1
                        style={{
                            fontSize: "64px",
                            fontWeight: "bold",
                            background: THEME.titleGradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        冷知识
                    </h1>
                    <span
                        style={{
                            fontSize: "48px",
                            transform: `translateY(${floatY}px)`,
                            display: "inline-block",
                        }}
                    >
                        ❄️
                    </span>
                </div>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    4 个关于 Function Calling 的有趣事实
                </p>
            </div>

            {/* 冷知识卡片 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    minHeight: 0,
                }}
            >
                {funFacts.map((fact, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: cardOpacities[i],
                            transform: `translateY(${cardSlides[i]}px)`,
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        <div
                            style={{
                                background: `rgba(${fact.color === "#58a6ff"
                                    ? "88,166,255"
                                    : fact.color === "#f0883e"
                                        ? "240,136,62"
                                        : fact.color === "#3fb950"
                                            ? "63,185,80"
                                            : "255,210,0"
                                    },0.08)`,
                                borderRadius: "14px",
                                padding: "16px 24px",
                                border: `1px solid ${fact.color}25`,
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                height: "100%",
                                boxSizing: "border-box",
                            }}
                        >
                            <div style={{ fontSize: "40px", flexShrink: 0 }}>{fact.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                        color: fact.color,
                                        marginBottom: "6px",
                                    }}
                                >
                                    {fact.title}
                                </div>
                                <div style={{ fontSize: "23px", color: THEME.textPrimary, lineHeight: 1.4 }}>
                                    {fact.desc}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 总结 */}
            <div
                style={{
                    opacity: summaryOpacity,
                    flexShrink: 0,
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "12px",
                    padding: "14px 24px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    textAlign: "center",
                }}
            >
                <span style={{ fontSize: "26px", color: "#58a6ff", fontWeight: "bold" }}>
                    🚀 掌握 Function Calling，让你的 AI 助手突破边界，完成更复杂的任务！
                </span>
            </div>
        </AbsoluteFill>
    );
};
