import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
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

export const OpenClaw1_Scene1_Hook: React.FC = () => {
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

    const card2Spring = spring({ frame: Math.max(0, frame - 70), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const card2Y = interpolate(card2Spring, [0, 1], [40, 0]);
    const card2Opacity = interpolate(card2Spring, [0, 1], [0, 1]);

    const hookSpring = spring({ frame: Math.max(0, frame - 100), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const hookY = interpolate(hookSpring, [0, 1], [30, 0]);
    const hookOpacity = interpolate(hookSpring, [0, 1], [0, 1]);

    // 龙虾浮动
    const floatY = Math.sin(frame * 0.06) * 8;
    // 数字计数：24万
    const countNum = Math.floor(
        interpolate(frame, [60, 130], [0, 24], {
            easing: Easing.out(Easing.cubic),
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
                gap: "24px",
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
                        普通人也能用好 OpenClaw · 第 1 篇
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
                    fontSize: "88px", fontWeight: 900, margin: "0 0 12px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", lineHeight: 1.1,
                    letterSpacing: "-0.05em",
                }}>
                    认识龙虾 AI
                </h1>
                <p style={{ fontSize: "34px", color: THEME.textPrimary, margin: 0, letterSpacing: "-0.02em" }}>
                    学会 OpenClaw，让 AI <span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>真正帮你干活</span>！
                </p>
            </div>

            {/* 数据卡片：24万收藏 */}
            <div style={{ opacity: card1Opacity, transform: `translateY(${card1Y}px)`, flexShrink: 0 }}>
                <div style={{
                    background: "rgba(88,166,255,0.08)", borderRadius: "20px",
                    padding: "24px 36px", border: "1px solid rgba(88,166,255,0.2)",
                    display: "flex", alignItems: "center", gap: "28px",
                    backdropFilter: "blur(16px)",
                }}>
                    <div style={{ fontSize: "64px", transform: `translateY(${floatY}px)`, flexShrink: 0 }}>🦞</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "64px", fontWeight: 900, color: "#58a6ff", lineHeight: 1 }}>{countNum}</span>
                            <span style={{ fontSize: "36px", color: "#58a6ff", fontWeight: "bold" }}>万+</span>
                            <span style={{ fontSize: "28px", color: THEME.textPrimary }}>开发者收藏</span>
                        </div>
                        <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: 0 }}>
                            打破 GitHub 有史以来最快增长记录 · 登上全国两会讨论议题
                        </p>
                    </div>
                </div>
            </div>

            {/* 痛点卡片 */}
            <div style={{ opacity: card2Opacity, transform: `translateY(${card2Y}px)`, flexShrink: 0 }}>
                <div style={{
                    background: THEME.cardBg, borderRadius: "20px",
                    padding: "22px 36px", border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", gap: "20px",
                    backdropFilter: "blur(16px)",
                }}>
                    <div style={{ fontSize: "44px", flexShrink: 0 }}>🤔</div>
                    <div>
                        <p style={{ fontSize: "26px", color: THEME.textPrimary, margin: "0 0 6px 0" }}>
                            很多人都说"龙虾很厉害"，却没几个人真的用起来了
                        </p>
                        <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                            因为 OpenClaw 和你用过的 AI 聊天工具不一样——它需要你换一套思路
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
                        🎯 这一篇，带你彻底搞懂 OpenClaw 是什么、能做什么
                    </p>
                    <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: "8px 0 0 0" }}>
                        不讲技术原理，只讲你能立刻用上的方法
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
