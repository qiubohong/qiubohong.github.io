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

const SUMMARY_POINTS = [
    { icon: "⚡", text: "5种安装方式，新手首选一键脚本", color: "#3fb950" },
    { icon: "🔑", text: "准备好 API Key，这是龙虾的大脑钥匙", color: "#58a6ff" },
    { icon: "🚀", text: "三步启动：onboard → gateway start → dashboard", color: "#f0883e" },
];

export const OpenClawInstall_Scene7_Summary: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 龙虾浮动
    const floatY = Math.sin(frame * 0.06) * 8;
    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

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
                gap: "28px",
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

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0, textAlign: "center" }}>
                <div style={{ fontSize: "64px", transform: `translateY(${floatY}px)`, marginBottom: "12px" }}>🦞</div>
                <h2 style={{
                    fontSize: "60px", fontWeight: 900, margin: 0,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.04em",
                }}>
                    今天学会了什么？
                </h2>
            </div>

            {/* 总结要点 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {SUMMARY_POINTS.map((point, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 20 - i * 15), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity, transform: `translateY(${cardY}px)`,
                            display: "flex", alignItems: "center", gap: "20px",
                            background: `${point.color}10`,
                            borderRadius: "16px", padding: "20px 28px",
                            border: `1px solid ${point.color}30`,
                            backdropFilter: "blur(16px)",
                        }}>
                            <span style={{ fontSize: "36px", flexShrink: 0 }}>{point.icon}</span>
                            <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: 0, fontWeight: "bold" }}>
                                {point.text}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* 下一篇预告 */}
            {frame > 60 && (
                <div style={{
                    opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    background: "rgba(88,166,255,0.08)", borderRadius: "16px",
                    padding: "20px 28px", border: "1px solid rgba(88,166,255,0.2)",
                    flexShrink: 0,
                }}>
                    <p style={{ fontSize: "22px", color: "#58a6ff", fontWeight: "bold", margin: "0 0 6px 0" }}>
                        📌 下一篇：学会给龙虾下指令
                    </p>
                    <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                        同样的需求，不同的说法，效果天差地别！
                    </p>
                </div>
            )}

            {/* 互动问题 */}
            {frame > 90 && (
                <div style={{
                    opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.1) 100%)",
                    borderRadius: "16px", padding: "20px 28px",
                    border: "1px solid rgba(240,136,62,0.3)",
                    flexShrink: 0,
                }}>
                    <p style={{ fontSize: "24px", color: `rgba(240,136,62,${highlight})`, fontWeight: "bold", margin: "0 0 8px 0" }}>
                        💬 你装好龙虾之后，最想让它帮你做什么？
                    </p>
                    <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                        欢迎在评论区分享！感谢观看，若喜欢请关注，每天5分钟，轻松学AI。
                    </p>
                </div>
            )}
        </AbsoluteFill>
    );
};
