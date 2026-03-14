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
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const features = [
    { icon: "🔒", title: "本地运行，数据不出门", desc: "所有数据在本地处理，不上传任何云端服务器" },
    { icon: "💬", title: "通过聊天工具操控", desc: "在 QQ、飞书或微信里发消息，龙虾帮你把事情做完" },
    { icon: "⚡", title: "真正执行，而不只是建议", desc: "不只给建议，而是真的打开文件夹、发邮件、操控浏览器" },
];

export const OpenClaw1_Scene2_WhatIs: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 80 + Math.sin(frame * 0.009) * 6;
    const lightY = 30 + Math.cos(frame * 0.007) * 8;

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
                width: 450, height: 450, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "44px" }}>🦞</span>
                    <h2 style={{
                        fontSize: "64px", fontWeight: 900, margin: 0,
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text", letterSpacing: "-0.05em",
                    }}>
                        OpenClaw 是什么？
                    </h2>
                </div>
                <p style={{ fontSize: "28px", color: THEME.textPrimary, margin: 0, lineHeight: 1.6 }}>
                    运行在你本地电脑上的 AI 智能体，通过聊天工具操控，<span style={{ color: THEME.accent, fontWeight: "bold" }}>真正帮你干活</span>
                </p>
            </div>

            {/* 主体：三个特点全宽展示 */}
            <div style={{ display: "flex", flex: 1, gap: "40px", alignItems: "center" }}>
                {/* 三个特点（全宽） */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
                    {features.map((f, i) => {
                        const cardSpring = spring({
                            frame: Math.max(0, frame - 50 - i * 15),
                            fps,
                            config: { stiffness: 100, damping: 20, mass: 1.2 },
                        });
                        const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
                        const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
                        return (
                            <div key={i} style={{
                                opacity: cardOpacity,
                                transform: `translateY(${cardY}px)`,
                                background: THEME.cardBg,
                                borderRadius: "16px",
                                padding: "20px 28px",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(16px)",
                                display: "flex", alignItems: "center", gap: "20px",
                            }}>
                                <div style={{ fontSize: "40px", flexShrink: 0 }}>{f.icon}</div>
                                <div>
                                    <p style={{ fontSize: "26px", fontWeight: "bold", color: "#58a6ff", margin: "0 0 4px 0" }}>{f.title}</p>
                                    <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
                                </div>
                            </div>
                    );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
