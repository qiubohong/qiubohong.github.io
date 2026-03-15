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

const steps = [
    { num: 1, title: "注册账号", desc: "打开 open.bigmodel.cn，点击右上角注册", detail: "用手机号注册，填写验证码，整个过程不超过 2 分钟", color: "#58a6ff", icon: "📝" },
    { num: 2, title: "创建 API Key", desc: "进入控制台 → API Keys → 新建密钥", detail: "给这把钥匙起个名字，比如「龙虾专用」", color: "#f0883e", icon: "🔑" },
    { num: 3, title: "复制并保存", desc: "API Key 只显示一次，请立刻保存", detail: "格式类似：zhipuai-xxxxxxxxxxxxxx", color: "#3fb950", icon: "📋" },
];

export const OpenClawFreeModel_Scene4_ZhipuTutorial: React.FC = () => {
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
                padding: "45px 70px",
                boxSizing: "border-box",
                gap: "18px",
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
                    fontSize: "60px", fontWeight: 900, margin: "0 0 6px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    智谱 AI 注册教程
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                    新手首选，注册简单、额度最大
                </p>
            </div>

            {/* 步骤卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                {steps.map((s, i) => {
                    const cardSpring = spring({
                        frame: Math.max(0, frame - 30 - i * 40),
                        fps,
                        config: { stiffness: 90, damping: 20, mass: 1.2 },
                    });
                    const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            transform: `translateY(${cardY}px)`,
                            background: `${s.color}08`,
                            borderRadius: "18px",
                            padding: "22px 28px",
                            border: `1px solid ${s.color}30`,
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "20px",
                        }}>
                            {/* 序号 */}
                            <div style={{
                                width: "64px", height: "64px", borderRadius: "50%",
                                background: `linear-gradient(135deg, ${s.color}30, ${s.color}15)`,
                                border: `2px solid ${s.color}60`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "32px", fontWeight: 900, color: s.color,
                                flexShrink: 0,
                            }}>{s.num}</div>
                            
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                    <span style={{ fontSize: "36px" }}>{s.icon}</span>
                                    <span style={{ fontSize: "32px", fontWeight: 900, color: s.color }}>{s.title}</span>
                                </div>
                                <p style={{ fontSize: "26px", color: THEME.textPrimary, margin: "0 0 6px 0" }}>{s.desc}</p>
                                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>{s.detail}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 提示卡片 */}
            <div style={{
                background: "rgba(255,210,0,0.08)",
                borderRadius: "14px",
                padding: "14px 22px",
                border: "1px solid rgba(255,210,0,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexShrink: 0,
            }}>
                <span style={{ fontSize: "36px" }}>💡</span>
                <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: 0 }}>
                    新用户专享福利：2000万免费 Tokens 资源包 + 120次图像和视频资源包
                </p>
            </div>
        </AbsoluteFill>
    );
};
