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
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(0,0,0,0.45)",
};

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();

    // 202帧 ≈ 5.76秒，紧凑动画节奏
    // 背景图淡入动画
    const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // React文字动画 (0-1秒)
    const reactOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const reactScale = interpolate(frame, [0, 20], [0.5, 1], {
        easing: Easing.out(Easing.back(1.7)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 错误标记动画 (1-2秒)
    const wrongOpacity = interpolate(frame, [30, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const wrongScale = interpolate(frame, [30, 45], [0.8, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // ReAct正确介绍动画 (2.5-3.5秒)
    const react2Opacity = interpolate(frame, [60, 75], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const react2Slide = interpolate(frame, [60, 80], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 副标题动画 (4-5秒)
    const subtitleOpacity = interpolate(frame, [90, 105], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const floatY = Math.sin(frame * 0.06) * 8;
    const pulse = 0.9 + Math.sin(frame * 0.1) * 0.1;

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
                padding: "80px",
                boxSizing: "border-box",
            }}
        >
            {/* 背景图 */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: bgOpacity,
                zIndex: 0,
            }}>
                <Img
                    src={staticFile("ReAct/backgrounds/scene1-bg.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                {/* 遮罩层保证文字可读性 */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(13,17,23,0.75)",
                }} />
            </div>

            {/* 背景装饰 - 弥散光 */}
            <div style={{
                zIndex: 1,
            } as React.CSSProperties} />
            <div style={{
                position: "absolute",
                top: "10%",
                left: "20%",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.12) 0%, transparent 70%)",
                filter: "blur(60px)",
                transform: `translateY(${floatY}px)`,
            }} />
            <div style={{
                position: "absolute",
                bottom: "15%",
                right: "10%",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.1) 0%, transparent 70%)",
                filter: "blur(50px)",
            }} />

            {/* 第一层：React前端框架（错误理解） */}
            <div style={{
                opacity: reactOpacity,
                transform: `scale(${reactScale})`,
                textAlign: "center",
                position: "relative",
                zIndex: 2,
            } as React.CSSProperties}>
                <div style={{
                    fontSize: "96px",
                    fontWeight: "bold",
                    color: "#61dafb",
                    textShadow: "0 0 40px rgba(97,218,251,0.4)",
                    letterSpacing: "-0.03em",
                }}>
                    React
                </div>
                <div style={{
                    fontSize: "32px",
                    color: THEME.textSecondary,
                    marginTop: "16px",
                }}>
                    前端框架？
                </div>
            </div>

            {/* 错误标记 */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: wrongOpacity,
                scale: `${wrongScale}`,
                pointerEvents: "none",
                zIndex: 3,
            } as React.CSSProperties}>
                <div style={{
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    background: "rgba(255,80,80,0.15)",
                    border: `4px solid rgba(255,80,80,${pulse})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 60px rgba(255,80,80,${0.3 * pulse})`,
                }}>
                    <span style={{
                        fontSize: "144px",
                        fontWeight: "bold",
                        color: "#ff5050",
                    }}>✗</span>
                </div>
            </div>

            {/* 第二层：正确的ReAct介绍 - 覆盖层卡片 */}
            <div style={{
                opacity: react2Opacity,
                transform: `translateY(${react2Slide}px)`,
                textAlign: "center",
                zIndex: 10,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translateY(${react2Slide}px)`,
            } as React.CSSProperties}>
                {/* 半透明白色背景卡片 */}
                <div style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "3px solid rgba(255,255,255,0.4)",
                    borderRadius: "32px",
                    padding: "80px 120px",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
                }}>
                    <div style={{
                        display: "inline-block",
                        background: "rgba(240,136,62,0.2)",
                        border: "2px solid rgba(240,136,62,0.5)",
                        borderRadius: "999px",
                        padding: "16px 48px",
                        marginBottom: "40px",
                    }}>
                        <span style={{ fontSize: "40px", color: "#f0883e", fontWeight: "bold" }}>
                            不是前端框架！
                        </span>
                    </div>

                    <div style={{
                        fontSize: "176px",
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                    }}>
                        ReAct
                    </div>

                    <div style={{
                        fontSize: "48px",
                        color: THEME.textPrimary,
                        marginTop: "32px",
                        opacity: subtitleOpacity,
                    }}>
                        AI Agent 的<span style={{ color: "#f0883e", fontWeight: "bold" }}>核心设计模式</span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};