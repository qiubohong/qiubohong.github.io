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

const entryMethods = [
    {
        icon: "💬",
        title: "QQ 机器人",
        desc: "加个 QQ 好友，直接发消息指挥干活",
        tag: "零门槛",
        color: "#58a6ff",
    },
    {
        icon: "📱",
        title: "飞书机器人",
        desc: "企业用户首选，10 分钟搭建完成",
        tag: "团队协作",
        color: "#3fb950",
    },
];

const brains = [
    { name: "DeepSeek", desc: "推理能力强", color: "#58a6ff" },
    { name: "通义千问", desc: "免费额度充足", color: "#3fb950" },
    { name: "豆包", desc: "日常对话流畅", color: "#f0883e" },
    { name: "智谱 GLM", desc: "每月免费额度大方", color: "#ffd200" },
    { name: "MiniMax", desc: "支持多模态", color: "#f778ba" },
];

export const OpenClaw_Scene3_HowToStart: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 35], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const methodsOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const methodsSlide = interpolate(frame, [30, 60], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const brainTitleOpacity = interpolate(frame, [70, 100], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const coreOpacity = interpolate(frame, [130, 160], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const coreSlide = interpolate(frame, [130, 160], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

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
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-150px", right: "-150px",
                width: "550px", height: "550px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(63,185,80,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                textAlign: "center",
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "70px",
                    fontWeight: "bold",
                    margin: "0 0 10px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    普通人也能用好它！
                </h1>
                <p style={{ fontSize: "28px", color: THEME.textSecondary, margin: 0 }}>
                    两种零门槛入口 + 五款<span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>免费大脑</span>
                </p>
            </div>

            {/* 入门方式 */}
            <div style={{
                opacity: methodsOpacity,
                transform: `translateY(${methodsSlide}px)`,
                flexShrink: 0,
            }}>
                <div style={{ display: "flex", gap: "24px" }}>
                    {entryMethods.map((method, i) => (
                        <div key={i} style={{
                            flex: 1,
                            background: `rgba(${method.color === "#58a6ff" ? "88,166,255" : "63,185,80"},0.08)`,
                            borderRadius: "20px",
                            padding: "24px 32px",
                            border: `1px solid rgba(${method.color === "#58a6ff" ? "88,166,255" : "63,185,80"},0.2)`,
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}>
                            <div style={{ fontSize: "52px", flexShrink: 0 }}>{method.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                    <span style={{ fontSize: "30px", fontWeight: "bold", color: method.color }}>{method.title}</span>
                                    <span style={{
                                        fontSize: "16px",
                                        background: `rgba(${method.color === "#58a6ff" ? "88,166,255" : "63,185,80"},0.2)`,
                                        color: method.color,
                                        borderRadius: "999px",
                                        padding: "3px 14px",
                                        fontWeight: "bold",
                                    }}>{method.tag}</span>
                                </div>
                                <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: 0 }}>{method.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 免费大脑 */}
            <div style={{ opacity: brainTitleOpacity, flexShrink: 0 }}>
                <div style={{
                    background: THEME.cardBg,
                    borderRadius: "20px",
                    padding: "24px 32px",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                        <div style={{ fontSize: "40px" }}>🧠</div>
                        <div>
                            <h3 style={{ fontSize: "28px", fontWeight: "bold", color: THEME.textPrimary, margin: 0 }}>
                                五款免费大脑，随便选！
                            </h3>
                            <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: "6px 0 0 0" }}>
                                OpenClaw 是"大脑壳"，负责干活；大模型是"大脑"，负责思考
                            </p>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {brains.map((brain, i) => {
                            const brainOpacity = interpolate(frame, [90 + i * 12, 110 + i * 12], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            });
                            const brainScale = interpolate(frame, [90 + i * 12, 110 + i * 12], [0.8, 1], {
                                easing: Easing.out(Easing.back(2)),
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            });
                            return (
                                <div key={i} style={{
                                    opacity: brainOpacity,
                                    transform: `scale(${brainScale})`,
                                    background: `rgba(${brain.color === "#58a6ff" ? "88,166,255" : brain.color === "#3fb950" ? "63,185,80" : brain.color === "#f0883e" ? "240,136,62" : brain.color === "#ffd200" ? "255,210,0" : "247,120,186"},0.1)`,
                                    borderRadius: "14px",
                                    padding: "14px 20px",
                                    border: `1px solid rgba(${brain.color === "#58a6ff" ? "88,166,255" : brain.color === "#3fb950" ? "63,185,80" : brain.color === "#f0883e" ? "240,136,62" : brain.color === "#ffd200" ? "255,210,0" : "247,120,186"},0.25)`,
                                    flex: "1 1 auto",
                                    minWidth: "150px",
                                }}>
                                    <div style={{ fontSize: "22px", fontWeight: "bold", color: brain.color }}>{brain.name}</div>
                                    <div style={{ fontSize: "17px", color: THEME.textSecondary }}>{brain.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 核心逻辑 */}
            <div style={{
                opacity: coreOpacity,
                transform: `translateY(${coreSlide}px)`,
                flexShrink: 0,
                textAlign: "center",
            }}>
                <div style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.1) 100%)",
                    borderRadius: "16px",
                    padding: "18px 40px",
                    border: "1px solid rgba(240,136,62,0.3)",
                }}>
                    <p style={{ fontSize: "30px", color: THEME.accent, fontWeight: "bold", margin: 0 }}>
                        🎯 核心逻辑：你说目标，它来执行！
                    </p>
                    <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: "8px 0 0 0" }}>
                        只要你能说清楚自己想要什么，它就能帮你做到
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
