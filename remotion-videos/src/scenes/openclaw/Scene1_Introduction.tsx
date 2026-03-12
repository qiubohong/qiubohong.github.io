import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
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

export const OpenClaw_Scene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 40], [60, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const tagOpacity = interpolate(frame, [15, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card1Opacity = interpolate(frame, [50, 80], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card1Slide = interpolate(frame, [50, 80], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Opacity = interpolate(frame, [70, 100], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const card2Slide = interpolate(frame, [70, 100], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const hookOpacity = interpolate(frame, [100, 130], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const hookSlide = interpolate(frame, [100, 130], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 龙虾图标浮动动画
    const floatY = Math.sin(frame * 0.06) * 8;
    // 数字计数动画：24万
    const countNum = Math.floor(
        interpolate(frame, [60, 120], [0, 24], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

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
            {/* 背景装饰光晕 */}
            <div style={{
                position: "absolute", top: "-180px", right: "-180px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: "-120px", left: "-120px",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 系列标签 */}
            <div style={{
                opacity: tagOpacity,
                display: "flex",
                justifyContent: "center",
                flexShrink: 0,
            }}>
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "rgba(88,166,255,0.1)",
                    border: "1px solid rgba(88,166,255,0.3)",
                    borderRadius: "999px",
                    padding: "10px 32px",
                }}>
                    <span style={{ fontSize: "32px" }}>🦞</span>
                    <span style={{ fontSize: "26px", color: "#58a6ff", fontWeight: "bold" }}>
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
                    fontSize: "96px",
                    fontWeight: "bold",
                    margin: "0 0 16px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                }}>
                    龙虾 AI 来了！
                </h1>
                <p style={{
                    fontSize: "36px",
                    color: THEME.textPrimary,
                    margin: 0,
                }}>
                    学会 OpenClaw，让 AI <span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>真正帮你干活</span>！
                </p>
            </div>

            {/* 数据卡片：24万收藏 */}
            <div style={{
                opacity: card1Opacity,
                transform: `translateY(${card1Slide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "20px",
                    padding: "28px 36px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                }}>
                    <div style={{
                        fontSize: "72px",
                        transform: `translateY(${floatY}px)`,
                        flexShrink: 0,
                    }}>🦞</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
                            <span style={{
                                fontSize: "72px",
                                fontWeight: "bold",
                                color: "#58a6ff",
                                lineHeight: 1,
                            }}>{countNum}</span>
                            <span style={{ fontSize: "40px", color: "#58a6ff", fontWeight: "bold" }}>万+</span>
                            <span style={{ fontSize: "32px", color: THEME.textPrimary }}>开发者收藏</span>
                        </div>
                        <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                            打破 GitHub 有史以来最快增长记录 · 登上全国两会讨论议题
                        </p>
                    </div>
                </div>
            </div>

            {/* 痛点卡片 */}
            <div style={{
                opacity: card2Opacity,
                transform: `translateY(${card2Slide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: THEME.cardBg,
                    borderRadius: "20px",
                    padding: "24px 36px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                }}>
                    <div style={{ fontSize: "48px", flexShrink: 0 }}>🤔</div>
                    <div>
                        <p style={{ fontSize: "28px", color: THEME.textPrimary, margin: "0 0 8px 0" }}>
                            很多人都说"龙虾很厉害"，却没几个人真的用起来了
                        </p>
                        <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: 0 }}>
                            因为 OpenClaw 和你用过的 AI 聊天工具不一样——它需要你换一套思路
                        </p>
                    </div>
                </div>
            </div>

            {/* 核心价值钩子 */}
            <div style={{
                opacity: hookOpacity,
                transform: `translateY(${hookSlide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.1) 100%)",
                    borderRadius: "20px",
                    padding: "24px 36px",
                    border: "1px solid rgba(240,136,62,0.3)",
                    textAlign: "center",
                }}>
                    <p style={{
                        fontSize: "30px",
                        color: THEME.accent,
                        fontWeight: "bold",
                        margin: 0,
                    }}>
                        🎯 这个系列，专门为普通人写的 OpenClaw 实战教程
                    </p>
                    <p style={{
                        fontSize: "24px",
                        color: THEME.textPrimary,
                        margin: "10px 0 0 0",
                    }}>
                        不讲技术原理，不堆砌术语，只讲你能立刻用上的方法
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
