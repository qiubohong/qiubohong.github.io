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

const platforms = [
    { 
        name: "智谱 AI", 
        tokens: "2000万+Flash不限量", 
        color: "#58a6ff", 
        icon: "🔮", 
        features: ["手机号即可注册", "GLM-4-Flash完全免费", "永久有效"] 
    },
    { 
        name: "硅基流动", 
        tokens: "2000万+部分永久免费", 
        color: "#3fb950", 
        icon: "💎", 
        features: ["邀请码 mAv9uTYO", "API响应速度快", "支持 50+ 模型"] 
    },
    { 
        name: "字节火山引擎", 
        tokens: "每天200万", 
        color: "#22c55e", 
        icon: "📱", 
        features: ["豆包/DeepSeek/Kimi", "额度每天重置", "适合定时任务"] 
    },
    { 
        name: "百度千帆", 
        tokens: "Lite不限量", 
        color: "#3b82f6", 
        icon: "🔵", 
        features: ["50 QPS并发", "ERNIE-Speed免费", "中文语义理解好"] 
    },
    { 
        name: "DeepSeek", 
        tokens: "送10元(~500万)", 
        color: "#8b5cf6", 
        icon: "🧠", 
        features: ["R1/V3.2模型", "性价比之王", "极致低价"] 
    },
    { 
        name: "月之暗面", 
        tokens: "送15元", 
        color: "#ec4899", 
        icon: "🌙", 
        features: ["Kimi K2/K2.5", "长上下文理解", "万亿参数"] 
    },
];

export const OpenClawFreeModel_Scene5_ThirdParty: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.007) * 8;
    const lightY = 50 + Math.cos(frame * 0.009) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "45px 60px",
                boxSizing: "border-box",
                gap: "16px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute", left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(100px)", transform: "translate(-50%, -50%)", pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: "0 0 4px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    推荐平台详解
                </h2>
                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                    重点推荐 6 个平台，各有特色！
                </p>
            </div>

            {/* 平台卡片 - 3列2行布局 */}
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(3, 1fr)", 
                gap: "16px", 
                flex: 1,
            }}>
                {platforms.map((p, i) => {
                    const cardSpring = spring({
                        frame: Math.max(0, frame - 30 - i * 15),
                        fps,
                        config: { stiffness: 90, damping: 20, mass: 1.2 },
                    });
                    const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            transform: `translateY(${cardY}px)`,
                            background: `${p.color}08`,
                            borderRadius: "16px",
                            padding: "20px 16px",
                            border: `1px solid ${p.color}30`,
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}>
                            {/* 平台名称和图标 */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontSize: "36px" }}>{p.icon}</span>
                                <div>
                                    <p style={{ fontSize: "22px", fontWeight: 900, color: p.color, margin: 0 }}>{p.name}</p>
                                    <p style={{ fontSize: "16px", color: THEME.textPrimary, margin: 0 }}>{p.tokens}</p>
                                </div>
                            </div>

                            {/* 特性列表 */}
                            <div style={{ flex: 1 }}>
                                {p.features.map((f, j) => (
                                    <div key={j} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        marginBottom: "6px",
                                    }}>
                                        <span style={{ color: p.color, fontSize: "14px" }}>✓</span>
                                        <span style={{ fontSize: "16px", color: THEME.textPrimary }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 提示卡片 */}
            <div style={{
                background: "rgba(63,185,80,0.08)",
                borderRadius: "12px",
                padding: "12px 20px",
                border: "1px solid rgba(63,185,80,0.3)",
                textAlign: "center",
                flexShrink: 0,
            }}>
                <p style={{ fontSize: "18px", color: "#3fb950", fontWeight: "bold", margin: 0 }}>
                    💡 小贴士：全部注册，总额度数亿 tokens，足够免费使用好几年！
                </p>
            </div>
        </AbsoluteFill>
    );
};
