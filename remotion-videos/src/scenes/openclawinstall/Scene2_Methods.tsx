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

const INSTALL_METHODS = [
    { icon: "⚡", name: "一键脚本", desc: "新手首选，5分钟搞定", color: "#3fb950", tag: "推荐" },
    { icon: "📦", name: "npm 安装", desc: "技术爱好者，最灵活", color: "#58a6ff", tag: "" },
    { icon: "🍎", name: "苹果客户端", desc: "macOS 用户，图形界面", color: "#f0883e", tag: "" },
    { icon: "☁️", name: "腾讯云部署", desc: "24小时运行，云端服务", color: "#ffd200", tag: "" },
    { icon: "🏢", name: "阿里云部署", desc: "企业级，稳定可靠", color: "#f778ba", tag: "" },
];

export const OpenClawInstall_Scene2_Methods: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光球动画
    const lightX1 = 70 + Math.sin(frame * 0.007) * 10;
    const lightY1 = 15 + Math.cos(frame * 0.005) * 8;

    // 图片淡入
    const imgOpacity = interpolate(frame, [100, 130], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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
                gap: "24px",
            }}
        >
            {/* 弥散光背景 */}
            <div style={{
                position: "absolute",
                left: `${lightX1}%`, top: `${lightY1}%`,
                width: 500, height: 500, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: 0,
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.04em",
                }}>
                    5 种安装方式，选适合你的
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                    就像买手机有不同套餐，选一个最适合你的
                </p>
            </div>

            {/* 图片展示区 - 主要内容 */}
            <div style={{ opacity: imgOpacity, flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 0 }}>
                <div style={{
                    background: THEME.cardBg, borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "16px", maxWidth: "1200px", width: "100%",
                    maxHeight: "100%",
                }}>
                    <Img
                        src={staticFile("OpenClawInstallVideo/installation_comparison.png")}
                        style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "12px" }}
                    />
                </div>
            </div>

            {/* 5种方式卡片 - 底部简要展示 */}
            <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
                {INSTALL_METHODS.map((method, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 20 - i * 10), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
                    const pulse = i === 0 ? 0.7 + Math.sin(frame * 0.1) * 0.3 : 1;

                    return (
                        <div key={i} style={{
                            opacity: cardOpacity,
                            flex: 1,
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                            background: i === 0 ? `rgba(63,185,80,${pulse * 0.1})` : THEME.cardBg,
                            borderRadius: "12px", padding: "12px 16px",
                            border: i === 0 ? `1px solid rgba(63,185,80,${pulse * 0.5})` : "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(16px)",
                        }}>
                            <span style={{ fontSize: "36px" }}>{method.icon}</span>
                            <span style={{ fontSize: "36px", color: method.color, fontWeight: "bold", textAlign: "center" }}>{method.name}</span>
                            {method.tag && (
                                <span style={{
                                    fontSize: "12px", color: "#3fb950",
                                    background: "rgba(63,185,80,0.15)",
                                    borderRadius: "999px", padding: "2px 8px",
                                }}>{method.tag}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
