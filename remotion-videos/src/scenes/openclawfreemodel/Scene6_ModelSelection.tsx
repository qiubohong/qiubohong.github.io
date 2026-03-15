import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Img,
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

const models = [
    { platform: "智谱AI", name: "GLM-4-Flash", color: "#58a6ff", desc: "2000万tokens + Flash不限量，永久有效", tags: ["免费", "推荐"] },
    { platform: "硅基流动", name: "DeepSeek-V3", color: "#3fb950", desc: "2000万tokens + 部分模型永久免费", tags: ["免费", "推荐"] },
    { platform: "字节火山", name: "豆包/Doubao", color: "#22c55e", desc: "每天200万tokens，按天重置", tags: ["免费"] },
    { platform: "阿里云百炼", name: "Qwen3.5/DeepSeek", color: "#f0883e", desc: "每个模型100万tokens", tags: ["免费"] },
    { platform: "百度千帆", name: "ERNIE-Speed/Lite", color: "#3b82f6", desc: "Speed/Lite不限量，永久免费", tags: ["免费"] },
    { platform: "腾讯云", name: "Hunyuan-Lite", color: "#10b981", desc: "10款模型共享100万tokens + Lite不限量", tags: ["免费"] },
    { platform: "讯飞星火", name: "Spark Lite", color: "#ef4444", desc: "Lite免费不限token", tags: ["免费"] },
    { platform: "DeepSeek", name: "R1/V3.2", color: "#8b5cf6", desc: "注册送10元（约500万tokens）", tags: ["免费"] },
    { platform: "月之暗面", name: "Kimi K2/K2.5", color: "#ec4899", desc: "注册送15元，长上下文理解", tags: ["免费"] },
    { platform: "MiniMax", name: "M2/M2.5", color: "#a855f7", desc: "注册送15元，成本仅为Claude的8%", tags: ["免费"] },
    { platform: "魔搭社区", name: "多模型", color: "#06b6d4", desc: "每天2000次免费调用", tags: ["免费"] },
];

export const OpenClawFreeModel_Scene6_ModelSelection: React.FC = () => {
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
                padding: "40px 60px",
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
                    fontSize: "52px", fontWeight: 900, margin: "0 0 4px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    不同模型怎么选？
                </h2>
                <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: 0 }}>
                    拿到免费额度后，应该用哪个模型？
                </p>
            </div>

            {/* 模型卡片 - 两列布局 */}
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(2, 1fr)", 
                gap: "12px", 
                flex: 1,
                alignContent: "start",
            }}>
                {models.map((m, i) => {
                    const cardSpring = spring({
                        frame: Math.max(0, frame - 25 - i * 15),
                        fps,
                        config: { stiffness: 90, damping: 20, mass: 1.2 },
                    });
                    const cardX = interpolate(cardSpring, [0, 1], [-40, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            transform: `translateX(${cardX}px)`,
                            background: `${m.color}08`,
                            borderRadius: "14px",
                            padding: "14px 18px",
                            border: `1px solid ${m.color}30`,
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                        }}>
                            {/* 平台 */}
                            <div style={{
                                background: `${m.color}20`,
                                borderRadius: "8px",
                                padding: "6px 12px",
                                fontSize: "20px",
                                color: m.color,
                                fontWeight: "bold",
                                flexShrink: 0,
                            }}>{m.platform}</div>
                            
                            {/* 模型名称 */}
                            <div style={{ 
                                fontSize: "22px", 
                                fontWeight: 900, 
                                color: m.color,
                                flexShrink: 0,
                            }}>{m.name}</div>
                            
                            {/* 描述 */}
                            <div style={{ flex: 1, fontSize: "18px", color: THEME.textPrimary }}>
                                {m.desc}
                            </div>

                            {/* 标签 */}
                            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                                {m.tags.map((t, j) => (
                                    <div key={j} style={{
                                        background: t === "推荐" ? `${m.color}20` : "rgba(255,255,255,0.1)",
                                        borderRadius: "6px",
                                        padding: "3px 8px",
                                        fontSize: "14px",
                                        color: t === "推荐" ? m.color : THEME.textSecondary,
                                    }}>{t}</div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 推荐提示 */}
            <div style={{
                background: "rgba(88,166,255,0.08)",
                borderRadius: "14px",
                padding: "14px 20px",
                border: "1px solid rgba(88,166,255,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexShrink: 0,
            }}>
                <span style={{ fontSize: "30px" }}>💡</span>
                <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: 0 }}>
                    <span style={{ color: "#58a6ff", fontWeight: "bold" }}>新手推荐</span>：智谱 GLM-4-Flash 不限量免费，或硅基流动 DeepSeek-V3，能力强大！
                </p>
            </div>
        </AbsoluteFill>
    );
};

// 场景 6.5：模型选择指南图
export const OpenClawFreeModel_Scene6_5_SelectionGuide: React.FC = () => {
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
                    大模型选择指南
                </h2>
                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                    不同使用场景下如何选择合适的大模型
                </p>
            </div>

            {/* 选择指南图 */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: imgOpacity,
                transform: `scale(${imgScale})`,
            }}>
                <Img
                    src="/assets/img/ailearn/openclaw/02/model_selection.png"
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
