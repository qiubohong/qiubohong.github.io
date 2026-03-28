import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
    Img,
    staticFile,
    spring,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    // 背景图淡入
    const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 主标题 - Spring动画
    const titleSpring = spring({
        frame,
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
    const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 副标题动画
    const subtitleSpring = spring({
        frame: Math.max(0, frame - 20),
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);
    const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

    // 说明文字动画
    const descSpring = spring({
        frame: Math.max(0, frame - 40),
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const descOpacity = interpolate(descSpring, [0, 1], [0, 1]);

    // 关键词对比动画
    const reactOpacity = interpolate(frame, [60, 80], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const arrowOpacity = interpolate(frame, [80, 100], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const reflectionOpacity = interpolate(frame, [100, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 浮动效果
    const floatY = Math.sin(frame * 0.05) * 6;

    // 关键词高亮闪烁
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
                    src={staticFile("Reflection/backgrounds/scene1-bg.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                {/* 半透明遮罩 */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(13,17,23,0.7)",
                }} />
            </div>

            {/* 弥散光装饰 */}
            <div style={{
                position: "absolute",
                top: "15%",
                left: "15%",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.12) 0%, transparent 70%)",
                filter: "blur(60px)",
                transform: `translateY(${floatY}px)`,
                zIndex: 1,
            }} />
            <div style={{
                position: "absolute",
                bottom: "20%",
                right: "10%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.1) 0%, transparent 70%)",
                filter: "blur(50px)",
                zIndex: 1,
            }} />

            {/* 毛玻璃卡片容器 */}
            <div style={{
                position: "relative",
                zIndex: 10,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "24px",
                padding: "64px 96px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "900px",
            }}>
                {/* 主标题 */}
                <div style={{
                    transform: `scale(${titleScale}) translateY(${titleY}px)`,
                    opacity: titleOpacity,
                    textAlign: "center",
                }}>
                    <div style={{
                        fontSize: "96px",
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                    }}>
                        Reflection
                    </div>
                </div>

                {/* 副标题 */}
                <div style={{
                    fontSize: "32px",
                    color: THEME.textPrimary,
                    marginTop: "24px",
                    opacity: subtitleOpacity,
                    transform: `translateY(${subtitleY}px)`,
                    fontWeight: "bold",
                }}>
                    让 AI 学会<span style={{ color: THEME.accent }}>自我反思</span>
                </div>

                {/* 说明文字 */}
                <div style={{
                    fontSize: "24px",
                    color: THEME.textSecondary,
                    marginTop: "32px",
                    textAlign: "center",
                    lineHeight: 1.6,
                    opacity: descOpacity,
                    maxWidth: "700px",
                }}>
                    之前我们学了 ReAct，让 AI 边想边做。<br />
                    今天学另一种模式：做完任务回头看看，
                    <span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>
                        自我检讨、持续优化
                    </span>
                </div>

                {/* 对比标签 */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    marginTop: "48px",
                }}>
                    {/* ReAct 标签 */}
                    <div style={{
                        opacity: reactOpacity,
                        background: "rgba(88,166,255,0.15)",
                        border: "2px solid rgba(88,166,255,0.4)",
                        borderRadius: "16px",
                        padding: "16px 32px",
                    }}>
                        <div style={{ fontSize: "24px", color: "#58a6ff", fontWeight: "bold" }}>
                            ReAct
                        </div>
                        <div style={{ fontSize: "16px", color: THEME.textSecondary, marginTop: "4px" }}>
                            边想边做
                        </div>
                    </div>

                    {/* 箭头 */}
                    <div style={{
                        opacity: arrowOpacity,
                        fontSize: "32px",
                        color: THEME.textSecondary,
                    }}>
                        →
                    </div>

                    {/* Reflection 标签 */}
                    <div style={{
                        opacity: reflectionOpacity,
                        background: "rgba(240,136,62,0.15)",
                        border: "2px solid rgba(240,136,62,0.4)",
                        borderRadius: "16px",
                        padding: "16px 32px",
                    }}>
                        <div style={{ fontSize: "24px", color: "#f0883e", fontWeight: "bold" }}>
                            Reflection
                        </div>
                        <div style={{ fontSize: "16px", color: THEME.textSecondary, marginTop: "4px" }}>
                            复盘优化
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
