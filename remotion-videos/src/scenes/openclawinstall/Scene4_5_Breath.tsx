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

const ANALOGIES = [
    { method: "一键脚本", analogy: "拎包入住精装房", icon: "🏠", color: "#3fb950" },
    { method: "npm 安装", analogy: "自己装修毛坯房", icon: "🔧", color: "#58a6ff" },
    { method: "苹果客户端", analogy: "App Store 下载", icon: "🍎", color: "#f0883e" },
    { method: "云服务器", analogy: "24小时物业管家", icon: "☁️", color: "#ffd200" },
];

export const OpenClawInstall_Scene4_5_Breath: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    const summarySpring = spring({ frame: Math.max(0, frame - 20), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const summaryOpacity = interpolate(summarySpring, [0, 1], [0, 1]);
    const summaryY = interpolate(summarySpring, [0, 1], [30, 0]);

    // 弥散光球动画
    const lightX1 = 50 + Math.sin(frame * 0.008) * 10;
    const lightY1 = 50 + Math.cos(frame * 0.006) * 8;

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
                gap: "32px",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* 弥散光背景 */}
            <div style={{
                position: "absolute",
                left: `${lightX1}%`, top: `${lightY1}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.12) 0%, transparent 70%)",
                filter: "blur(100px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 核心类比 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
                <p style={{ fontSize: "28px", color: THEME.textSecondary, margin: "0 0 12px 0" }}>
                    简单来说，安装龙虾就像
                </p>
                <h2 style={{
                    fontSize: "72px", fontWeight: 900, margin: 0,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.04em",
                }}>
                    装一个智能管家 🏠
                </h2>
            </div>

            {/* 类比卡片 */}
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
                {ANALOGIES.map((item, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 30 - i * 10), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            flex: 1, opacity: cardOpacity, transform: `translateY(${cardY}px)`,
                            background: `${item.color}10`,
                            borderRadius: "16px", padding: "20px",
                            border: `1px solid ${item.color}30`,
                            textAlign: "center",
                        }}>
                            <div style={{ fontSize: "40px", marginBottom: "10px" }}>{item.icon}</div>
                            <p style={{ fontSize: "20px", color: item.color, fontWeight: "bold", margin: "0 0 6px 0" }}>
                                {item.method}
                            </p>
                            <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>
                                {item.analogy}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* 总结 */}
            <div style={{ opacity: summaryOpacity, transform: `translateY(${summaryY}px)`, width: "100%" }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.1) 100%)",
                    borderRadius: "20px", padding: "24px 36px",
                    border: "1px solid rgba(240,136,62,0.3)", textAlign: "center",
                }}>
                    <p style={{ fontSize: "28px", color: THEME.accent, fontWeight: "bold", margin: 0 }}>
                        🎯 记住这个关键点：选适合自己的方式，新手就用一键脚本！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
