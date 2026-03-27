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
    think: "#58a6ff",
    act: "#3fb950",
    observe: "#f778ba",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const Scene3_LoopDiagram: React.FC = () => {
    const frame = useCurrentFrame();

    // 背景图淡入动画
    const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 30], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 循环图动画
    const diagramOpacity = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const diagramScale = interpolate(frame, [20, 50], [0.9, 1], {
        easing: Easing.out(Easing.back(1.2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 三个阶段卡片动画
    const cardOffsets = [40, 65, 90];
    const cards = [
        { name: "思考", color: THEME.think, desc: "分析当前情况\n想想接下来做什么", icon: "🤔" },
        { name: "行动", color: THEME.act, desc: "决定调用什么工具\n采取什么行动", icon: "🚀" },
        { name: "观察", color: THEME.observe, desc: "拿到行动结果\n作为下次思考依据", icon: "👀" },
    ];

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "60px 40px",
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
                    src={staticFile("ReAct/backgrounds/scene3-bg.png")}
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

            {/* 背景装饰 */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
            } as React.CSSProperties} />

            {/* 标题 */}
            <div style={{
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                textAlign: "center",
                flexShrink: 0,
                marginBottom: "20px",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <h1 style={{
                    fontSize: "56px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    ReAct 工作循环
                </h1>
                <p style={{ fontSize: "28px", color: THEME.textSecondary, marginTop: "8px" }}>
                    三大核心步骤，循环往复直到问题解决
                </p>
            </div>

            {/* 工作循环图 */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: diagramOpacity,
                transform: `scale(${diagramScale})`,
                minHeight: 0,
                marginBottom: "20px",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <Img
                    src={staticFile("ReAct/23_react_loop.png")}
                    style={{
                        maxWidth: "90%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    }}
                />
            </div>

            {/* 三个阶段卡片 */}
            <div style={{
                display: "flex",
                gap: "16px",
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                {cards.map((card, i) => {
                    const cardOpacity = interpolate(frame, [cardOffsets[i], cardOffsets[i] + 25], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const cardSlide = interpolate(frame, [cardOffsets[i], cardOffsets[i] + 25], [20, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });

                    return (
                        <div key={i} style={{
                            flex: 1,
                            background: `${card.color}10`,
                            border: `2px solid ${card.color}40`,
                            borderRadius: "16px",
                            padding: "20px",
                            opacity: cardOpacity,
                            transform: `translateY(${cardSlide}px)`,
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "12px",
                            }}>
                                <span style={{ fontSize: "36px" }}>{card.icon}</span>
                                <span style={{
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    color: card.color,
                                }}>
                                    {card.name}
                                </span>
                            </div>
                            <p style={{
                                fontSize: "22px",
                                color: THEME.textPrimary,
                                lineHeight: 1.5,
                                whiteSpace: "pre-line",
                            }}>
                                {card.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};