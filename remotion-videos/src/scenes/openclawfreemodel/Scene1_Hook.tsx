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

export const OpenClawFreeModel_Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 弹簧动画
    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    const tagSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const tagOpacity = interpolate(tagSpring, [0, 1], [0, 1]);

    const card1Spring = spring({ frame: Math.max(0, frame - 50), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const card1Y = interpolate(card1Spring, [0, 1], [40, 0]);
    const card1Opacity = interpolate(card1Spring, [0, 1], [0, 1]);

    const hookSpring = spring({ frame: Math.max(0, frame - 100), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const hookY = interpolate(hookSpring, [0, 1], [30, 0]);
    const hookOpacity = interpolate(hookSpring, [0, 1], [0, 1]);

    // 数字计数：9000万
    const countNum = Math.floor(
        interpolate(frame, [80, 150], [0, 9000], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

    // 弥散光球动画
    const lightX1 = 60 + Math.sin(frame * 0.008) * 8;
    const lightY1 = 20 + Math.cos(frame * 0.006) * 6;
    const lightX2 = 10 + Math.sin(frame * 0.01) * 6;
    const lightY2 = 70 + Math.cos(frame * 0.009) * 8;

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
                width: 500, height: 500, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.18) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute",
                left: `${lightX2}%`, top: `${lightY2}%`,
                width: 400, height: 400, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.12) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 系列标签 */}
            <div style={{ opacity: tagOpacity, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "12px",
                    background: "rgba(88,166,255,0.1)",
                    border: "1px solid rgba(88,166,255,0.3)",
                    borderRadius: "999px", padding: "10px 32px",
                    backdropFilter: "blur(16px)",
                }}>
                    <span style={{ fontSize: "28px" }}>🦞</span>
                    <span style={{ fontSize: "24px", color: "#58a6ff", fontWeight: "bold" }}>
                        普通人也能用好 OpenClaw · 第 2 篇
                    </span>
                </div>
            </div>

            {/* 主标题 */}
            <div style={{
                textAlign: "center",
                opacity: titleOpacity,
                transform: `translateY(${titleY}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "80px", fontWeight: 900, margin: "0 0 12px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", lineHeight: 1.1,
                    letterSpacing: "-0.05em",
                }}>
                    白嫖大模型 API
                </h1>
                <p style={{ fontSize: "34px", color: THEME.textPrimary, margin: 0, letterSpacing: "-0.02em" }}>
                    龙虾需要<span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>大模型大脑</span>才能思考，但这个大脑要花钱吗？
                </p>
            </div>

            {/* 数据卡片：9000万tokens */}
            <div style={{ opacity: card1Opacity, transform: `translateY(${card1Y}px)`, flexShrink: 0 }}>
                <div style={{
                    background: "rgba(63,185,80,0.08)", borderRadius: "20px",
                    padding: "24px 36px", border: "1px solid rgba(63,185,80,0.2)",
                    display: "flex", alignItems: "center", gap: "28px",
                    backdropFilter: "blur(16px)",
                }}>
                    <div style={{ fontSize: "64px", flexShrink: 0 }}>🎁</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "64px", fontWeight: 900, color: "#3fb950", lineHeight: 1 }}>{countNum}</span>
                            <span style={{ fontSize: "36px", color: "#3fb950", fontWeight: "bold" }}>万</span>
                            <span style={{ fontSize: "28px", color: THEME.textPrimary }}>tokens 免费额度</span>
                        </div>
                        <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: 0 }}>
                            三个平台都注册，总额度够用好几年！
                        </p>
                    </div>
                </div>
            </div>

            {/* 核心价值钩子 */}
            <div style={{ opacity: hookOpacity, transform: `translateY(${hookY}px)`, flexShrink: 0 }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.1) 100%)",
                    borderRadius: "20px", padding: "22px 36px",
                    border: "1px solid rgba(240,136,62,0.3)", textAlign: "center",
                }}>
                    <p style={{ fontSize: "28px", color: THEME.accent, fontWeight: "bold", margin: 0 }}>
                        🎯 答案是：完全不用花钱！
                    </p>
                    <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: "8px 0 0 0" }}>
                        国内多家平台提供免费额度，注册就能用
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
