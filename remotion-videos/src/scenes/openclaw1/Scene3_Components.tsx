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

const components = [
    {
        icon: "🔌",
        color: "#f0883e",
        title: "消息入口",
        subtitle: "你和龙虾沟通的「门」",
        items: [
            { label: "QQ 机器人", icon: "🐧" },
            { label: "飞书机器人", icon: "🪶" },
            { label: "微信 / Telegram", icon: "💬" },
        ],
    },
    {
        icon: "🧠",
        color: "#58a6ff",
        title: "大脑（Agent）",
        subtitle: "负责思考和规划",
        items: [
            { label: "DeepSeek", icon: "🔵" },
            { label: "通义千问", icon: "🟠" },
            { label: "智谱 GLM", icon: "🟣" },
        ],
    },
    {
        icon: "🛠️",
        color: "#3fb950",
        title: "技能（Skills）",
        subtitle: "龙虾的「超能力」",
        items: [
            { label: "天气查询", icon: "🌤️" },
            { label: "邮件收发", icon: "📧" },
            { label: "浏览器控制", icon: "🌐" },
        ],
    },
    {
        icon: "🗂️",
        color: "#f778ba",
        title: "记忆（Memory）",
        subtitle: "越用越懂你",
        items: [
            { label: "灵魂记忆", icon: "✨" },
            { label: "用户记忆", icon: "👤" },
            { label: "对话记忆", icon: "💭" },
        ],
    },
];

export const OpenClaw1_Scene3_Components: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 公式淡入
    const formulaOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.008) * 10;
    const lightY = 50 + Math.cos(frame * 0.007) * 8;

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
            {/* 弥散光 */}
            <div style={{
                position: "absolute",
                left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(100px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "64px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    龙虾的四大组成部分
                </h2>
            </div>

            {/* 公式 */}
            <div style={{ opacity: formulaOpacity, flexShrink: 0 }}>
                <div style={{
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "16px", padding: "16px 32px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    backdropFilter: "blur(16px)",
                    textAlign: "center",
                }}>
                    <p style={{ fontSize: "28px", color: THEME.textPrimary, margin: 0, fontWeight: "bold" }}>
                        <span style={{ color: "#58a6ff" }}>龙虾</span>
                        {" = "}
                        <span style={{ color: "#f0883e" }}>消息入口</span>
                        {" + "}
                        <span style={{ color: "#58a6ff" }}>大脑</span>
                        {" + "}
                        <span style={{ color: "#3fb950" }}>技能</span>
                        {" + "}
                        <span style={{ color: "#f778ba" }}>记忆</span>
                    </p>
                </div>
            </div>

            {/* 四卡片网格 */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
            }}>
                {components.map((comp, i) => {
                    const cardSpring = spring({
                        frame: Math.max(0, frame - 60 - i * 12),
                        fps,
                        config: { stiffness: 100, damping: 20, mass: 1.2, overshootClamping: false },
                    });
                    const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
                    // 图标浮动
                    const floatY = Math.sin(frame * 0.05 + i * 1.2) * 5;

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            transform: `translateY(${cardY}px)`,
                            background: THEME.cardBg,
                            borderRadius: "20px",
                            padding: "20px 24px",
                            border: `1px solid ${comp.color}30`,
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            minHeight: 0,
                            overflow: "hidden",
                        }}>
                            {/* 卡片头部：图标 + 标题 + 副标题 */}
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <div style={{
                                    fontSize: "40px",
                                    transform: `translateY(${floatY}px)`,
                                    flexShrink: 0,
                                    lineHeight: 1,
                                }}>{comp.icon}</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                    <p style={{ fontSize: "36px", fontWeight: 900, color: comp.color, margin: 0, lineHeight: 1.1 }}>{comp.title}</p>
                                    <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: 0, lineHeight: 1.2 }}>{comp.subtitle}</p>
                                </div>
                            </div>

                            {/* 分割线 */}
                            <div style={{
                                height: "1px",
                                background: `linear-gradient(90deg, ${comp.color}60, transparent)`,
                                flexShrink: 0,
                            }} />

                            {/* 垂直排列的标签列表，自动填充剩余空间 */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                flex: 1,
                                minHeight: 0,
                                justifyContent: "space-evenly",
                            }}>
                                {comp.items.map((item, j) => (
                                    <div key={j} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        background: `${comp.color}12`,
                                        border: `1px solid ${comp.color}35`,
                                        borderRadius: "10px",
                                        padding: "10px 16px",
                                        flex: 1,
                                        minHeight: 0,
                                    }}>
                                        <span style={{ fontSize: "24px", lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
                                        <span style={{
                                            fontSize: "22px",
                                            color: comp.color,
                                            fontWeight: 700,
                                            letterSpacing: "0.02em",
                                        }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
