import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
    Img,
    staticFile,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const MCP_Scene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 40], [50, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const subtitleOpacity = interpolate(frame, [25, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card1Opacity = interpolate(frame, [45, 75], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card1Slide = interpolate(frame, [45, 75], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card2Opacity = interpolate(frame, [65, 95], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Slide = interpolate(frame, [65, 95], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const imgOpacity = interpolate(frame, [90, 130], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const imgScale = interpolate(frame, [90, 130], [0.9, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const floatY = Math.sin(frame * 0.05) * 5;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "36px 48px",
                boxSizing: "border-box",
                gap: "14px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-200px", right: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: "-150px", left: "-150px",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 顶部标签 + 主标题 */}
            <div style={{
                textAlign: "center",
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    display: "inline-block",
                    background: "rgba(88,166,255,0.1)",
                    border: "1px solid rgba(88,166,255,0.3)",
                    borderRadius: "999px",
                    padding: "6px 20px",
                    marginBottom: "10px",
                }}>
                    <span style={{ fontSize: "24px", color: "#58a6ff", fontWeight: "bold" }}>
                        5分钟AI · 每天搞懂一个知识点
                    </span>
                </div>
                <h1 style={{
                    fontSize: "80px",
                    fontWeight: "bold",
                    marginBottom: "6px",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                }}>
                    MCP 协议
                </h1>
                <p style={{
                    fontSize: "34px",
                    color: THEME.textPrimary,
                    opacity: subtitleOpacity,
                }}>
                    AI 世界的 "USB-C 接口"
                </p>
            </div>

            {/* 核心定义卡片 */}
            <div style={{
                opacity: card1Opacity,
                transform: `translateY(${card1Slide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "16px",
                    padding: "18px 28px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}>
                    <div style={{ fontSize: "48px", transform: `translateY(${floatY}px)`, flexShrink: 0 }}>🔌</div>
                    <div>
                        <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#58a6ff", marginBottom: "6px" }}>
                            一句话核心
                        </h2>
                        <p style={{ fontSize: "26px", color: THEME.textPrimary }}>
                            为大型语言模型与外部数据源、工具之间建立<span style={{ color: THEME.accent, fontWeight: "bold" }}>安全、标准化、双向</span>的连接通道
                        </p>
                    </div>
                </div>
            </div>

            {/* 类比卡片 */}
            <div style={{
                opacity: card2Opacity,
                transform: `translateY(${card2Slide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: THEME.cardBg,
                    borderRadius: "16px",
                    padding: "16px 28px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                }}>
                    <div style={{ flex: 1, textAlign: "center", padding: "12px", background: "rgba(139,148,158,0.1)", borderRadius: "12px" }}>
                        <div style={{ fontSize: "36px", marginBottom: "6px" }}>🔧</div>
                        <div style={{ fontSize: "22px", color: THEME.textSecondary, fontWeight: "bold" }}>之前</div>
                        <div style={{ fontSize: "20px", color: THEME.textSecondary }}>每个工具单独适配</div>
                    </div>
                    <div style={{ fontSize: "36px", color: THEME.accent }}>→</div>
                    <div style={{ flex: 1, textAlign: "center", padding: "12px", background: "rgba(240,136,62,0.1)", borderRadius: "12px", border: "1px solid rgba(240,136,62,0.2)" }}>
                        <div style={{ fontSize: "36px", marginBottom: "6px" }}>🔌</div>
                        <div style={{ fontSize: "22px", color: THEME.accent, fontWeight: "bold" }}>现在</div>
                        <div style={{ fontSize: "20px", color: THEME.textPrimary }}>统一接口即插即用</div>
                    </div>
                </div>
            </div>

            {/* 知识网络图 */}
            <div style={{
                flex: 1,
                opacity: imgOpacity,
                transform: `scale(${imgScale})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 0,
            }}>
                <Img
                    src={staticFile("MCPVideo/scene1-image.png")}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "12px",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
