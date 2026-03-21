import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Img,
    staticFile,
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
    { name: "智谱 AI", tokens: "2000万+Flash不限量", color: "#58a6ff", icon: "🔮", desc: "国内最慷慨" },
    { name: "硅基流动", tokens: "2000万+部分永久免费", color: "#3fb950", icon: "💎", desc: "API响应快" },
    { name: "字节火山引擎", tokens: "每天200万", color: "#22c55e", icon: "📱", desc: "豆包同款" },
    { name: "阿里云百炼", tokens: "每模型100万", color: "#f0883e", icon: "☁️", desc: "模型库最全" },
    { name: "百度千帆", tokens: "Lite不限量", color: "#3b82f6", icon: "🔵", desc: "50QPS并发" },
    { name: "腾讯云混元", tokens: "100万+Lite不限量", color: "#10b981", icon: "🐧", desc: "微信生态" },
    { name: "讯飞星火", tokens: "Lite不限token", color: "#ef4444", icon: "⭐", desc: "语音能力强" },
    { name: "DeepSeek", tokens: "送10元(~500万)", color: "#8b5cf6", icon: "🧠", desc: "性价比之王" },
    { name: "月之暗面", tokens: "送15元", color: "#ec4899", icon: "🌙", desc: "Kimi同款" },
    { name: "MiniMax", tokens: "送15元", color: "#a855f7", icon: "🎭", desc: "成本极低" },
    { name: "魔搭社区", tokens: "每天2000次", color: "#06b6d4", icon: "🤖", desc: "多模型支持" },
];

export const OpenClawFreeModel_Scene3_Platforms: React.FC = () => {
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
                padding: "35px 50px",
                boxSizing: "border-box",
                gap: "14px",
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
                    fontSize: "48px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    免费平台大盘点
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0, lineHeight: 2 }}>
                    国内主流免费大模型平台一览（按推荐程度排序）
                </p>
            </div>

            {/* 平台卡片网格 - 4列布局 */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                flex: 1,
                alignContent: "start",
            }}>
                {platforms.map((p, i) => {
                    const cardSpring = spring({
                        frame: Math.max(0, frame - 30 - i * 10),
                        fps,
                        config: { stiffness: 90, damping: 20, mass: 1.2 },
                    });
                    const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            transform: `scale(${cardScale})`,
                            background: `${p.color}08`,
                            borderRadius: "14px",
                            padding: "14px 12px",
                            border: `1px solid ${p.color}30`,
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}>
                            <div style={{ fontSize: "46px", textAlign: "center" }}>{p.icon}</div>
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "28px", fontWeight: 900, color: p.color, margin: "0 0 6px 0", lineHeight: 1.6 }}>{p.name}</p>
                                <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: "0 0 6px 0", fontWeight: "bold", lineHeight: 1.8 }}>{p.tokens}</p>
                                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0, lineHeight: 1.8 }}>{p.desc}</p>
                            </div>
                            <div style={{
                                background: `${p.color}20`,
                                borderRadius: "8px",
                                padding: "5px 10px",
                                fontSize: "24px",
                                color: p.color,
                                fontWeight: "bold",
                                textAlign: "center",
                                marginTop: "auto",
                            }}>免费</div>
                        </div>
                    );
                })}
            </div>

            {/* 总额度统计 */}
            <div style={{
                background: "linear-gradient(135deg, rgba(63,185,80,0.15) 0%, rgba(88,166,255,0.1) 100%)",
                borderRadius: "14px",
                padding: "12px 20px",
                border: "1px solid rgba(63,185,80,0.3)",
                textAlign: "center",
                flexShrink: 0,
            }}>
                <p style={{ fontSize: "24px", color: "#3fb950", fontWeight: "bold", margin: 0, lineHeight: 1.8 }}>
                    🎉 全部注册，总额度数亿 tokens，足够免费使用好几年！
                </p>
            </div>
        </AbsoluteFill>
    );
};

// 场景 3.5：平台对比图
export const OpenClawFreeModel_Scene3_5_PlatformChart: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    const imgSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const imgScale = interpolate(imgSpring, [0, 1], [0.9, 1]);
    const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

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
                padding: "40px 60px",
                boxSizing: "border-box",
                gap: "20px",
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
            <div style={{ opacity: titleOpacity, flexShrink: 0, textAlign: "center" }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    大模型平台对比
                </h2>
                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                    国内主流免费大模型平台的详细对比信息
                </p>
            </div>

            {/* 平台对比图 */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: imgOpacity,
                transform: `scale(${imgScale})`,
            }}>
                <Img
                    src={staticFile("OpenClawFreeModelVideo/platform_comparison.png")}
                    style={{
                        maxWidth: "90%",
                        maxHeight: "80%",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
