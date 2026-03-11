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

const interactItems = [
    { icon: "👍", label: "点赞", desc: "觉得有用就点个赞", color: "#58a6ff" },
    { icon: "⭐", label: "收藏", desc: "收藏系列，方便跟进", color: "#ffd200" },
    { icon: "🔔", label: "关注", desc: "关注不迷路，持续更新", color: "#3fb950" },
];

export const OpenClaw_Scene6_Summary: React.FC = () => {
    const frame = useCurrentFrame();

    const logoOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const logoScale = interpolate(frame, [0, 30], [0.6, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [20, 50], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const nextOpacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const nextSlide = interpolate(frame, [60, 90], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const interactOpacity = interpolate(frame, [100, 130], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const interactSlide = interpolate(frame, [100, 130], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 龙虾浮动
    const floatY = Math.sin(frame * 0.06) * 10;
    // 光晕脉冲
    const glowPulse = 0.6 + Math.sin(frame * 0.08) * 0.4;
    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "40px",
            }}
        >
            {/* 背景光晕 */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "800px", height: "800px", borderRadius: "50%",
                background: `radial-gradient(circle, rgba(88,166,255,${glowPulse * 0.06}) 0%, transparent 65%)`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "400px", height: "400px", borderRadius: "50%",
                background: `radial-gradient(circle, rgba(240,136,62,${glowPulse * 0.08}) 0%, transparent 65%)`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 系列 Logo 区域 */}
            <div style={{
                opacity: logoOpacity,
                transform: `scale(${logoScale}) translateY(${floatY}px)`,
                textAlign: "center",
                flexShrink: 0,
            }}>
                <div style={{ fontSize: "100px", lineHeight: 1 }}>🦞</div>
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(88,166,255,0.1)",
                    border: "1px solid rgba(88,166,255,0.3)",
                    borderRadius: "999px",
                    padding: "8px 28px",
                    marginTop: "12px",
                }}>
                    <span style={{ fontSize: "22px", color: "#58a6ff", fontWeight: "bold" }}>
                        普通人也能用好 OpenClaw 系列
                    </span>
                </div>
            </div>

            {/* 主标题 */}
            <div style={{
                textAlign: "center",
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "88px",
                    fontWeight: "bold",
                    margin: "0 0 16px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                }}>
                    下一篇：认识龙虾
                </h1>
                <p style={{ fontSize: "30px", color: THEME.textPrimary, margin: 0 }}>
                    OpenClaw 是什么？能做什么？和普通 AI 有什么<span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>本质区别</span>？
                </p>
            </div>

            {/* 下一篇预告 */}
            <div style={{
                opacity: nextOpacity,
                transform: `translateY(${nextSlide}px)`,
                flexShrink: 0,
                width: "100%",
            }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(88,166,255,0.08) 0%, rgba(240,136,62,0.08) 100%)",
                    borderRadius: "20px",
                    padding: "24px 40px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                }}>
                    <div style={{ fontSize: "48px", flexShrink: 0 }}>📖</div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "26px", color: THEME.textPrimary, margin: "0 0 8px 0", fontWeight: "bold" }}>
                            第 1 篇：认识龙虾
                        </p>
                        <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: 0 }}>
                            搞清楚 OpenClaw 的核心概念，为后续实战打好基础
                        </p>
                    </div>
                    <div style={{
                        fontSize: "36px",
                        color: THEME.accent,
                        animation: "none",
                    }}>→</div>
                </div>
            </div>

            {/* 互动引导 */}
            <div style={{
                opacity: interactOpacity,
                transform: `translateY(${interactSlide}px)`,
                flexShrink: 0,
                width: "100%",
            }}>
                <div style={{ display: "flex", gap: "20px" }}>
                    {interactItems.map((item, i) => {
                        const itemOpacity = interpolate(frame, [110 + i * 15, 130 + i * 15], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const itemScale = interpolate(frame, [110 + i * 15, 130 + i * 15], [0.85, 1], {
                            easing: Easing.out(Easing.back(2)),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                flex: 1,
                                opacity: itemOpacity,
                                transform: `scale(${itemScale})`,
                                background: THEME.cardBg,
                                borderRadius: "18px",
                                padding: "24px",
                                border: `1px solid rgba(${item.color === "#58a6ff" ? "88,166,255" : item.color === "#ffd200" ? "255,210,0" : "63,185,80"},0.25)`,
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "10px",
                            }}>
                                <div style={{ fontSize: "52px" }}>{item.icon}</div>
                                <div style={{ fontSize: "28px", fontWeight: "bold", color: item.color }}>{item.label}</div>
                                <div style={{ fontSize: "20px", color: THEME.textSecondary }}>{item.desc}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
