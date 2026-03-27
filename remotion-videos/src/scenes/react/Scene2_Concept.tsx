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
    think: "#58a6ff",
    act: "#3fb950",
    observe: "#f778ba",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const Scene2_Concept: React.FC = () => {
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
    const titleSlide = interpolate(frame, [0, 30], [40, 0], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 核心定义卡片动画
    const cardOpacity = interpolate(frame, [30, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const cardSlide = interpolate(frame, [30, 55], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 侦探图标动画
    const iconOpacity = interpolate(frame, [50, 75], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const iconScale = interpolate(frame, [50, 75], [0.8, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 对比卡片动画
    const compareOpacity = interpolate(frame, [70, 95], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const compareSlide = interpolate(frame, [70, 95], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const floatY = Math.sin(frame * 0.05) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "60px 48px",
                boxSizing: "border-box",
                gap: "20px",
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
                    src={staticFile("ReAct/backgrounds/scene2-bg.png")}
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
                top: "-150px",
                right: "-100px",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(80px)",
                zIndex: 1,
            } as React.CSSProperties} />

            {/* 顶部标签 + 主标题 */}
            <div style={{
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <div style={{
                    display: "inline-block",
                    background: "rgba(88,166,255,0.1)",
                    border: "1px solid rgba(88,166,255,0.3)",
                    borderRadius: "999px",
                    padding: "6px 20px",
                    marginBottom: "12px",
                }}>
                    <span style={{ fontSize: "24px", color: THEME.think, fontWeight: "bold" }}>
                        一句话核心
                    </span>
                </div>
                <h1 style={{
                    fontSize: "56px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.2,
                }}>
                    让大模型"边想边做"
                </h1>
            </div>

            {/* 核心定义卡片 */}
            <div style={{
                background: "rgba(88,166,255,0.08)",
                borderRadius: "20px",
                padding: "24px 32px",
                border: "1px solid rgba(88,166,255,0.2)",
                opacity: cardOpacity,
                transform: `translateY(${cardSlide}px)`,
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <p style={{
                    fontSize: "32px",
                    color: THEME.textPrimary,
                    lineHeight: 1.5,
                }}>
                    ReAct 就是让 AI 像<span style={{ color: THEME.accent, fontWeight: "bold" }}>侦探破案</span>那样：<br />
                    看到线索 → 动动脑子 → 采取行动 → 获取新线索 → 再分析
                </p>
            </div>

            {/* 侦探图标 + 流程说明 */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                opacity: iconOpacity,
                transform: `scale(${iconScale})`,
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <div style={{
                    fontSize: "72px",
                    transform: `translateY(${floatY}px)`,
                    filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))",
                }}>
                    🕵️
                </div>
                <div style={{
                    display: "flex",
                    gap: "12px",
                    flex: 1,
                }}>
                    {[
                        { text: "思考", color: THEME.think },
                        { text: "行动", color: THEME.act },
                        { text: "观察", color: THEME.observe },
                        { text: "再思考...", color: THEME.think },
                    ].map((item, i) => (
                        <div key={i} style={{
                            flex: 1,
                            background: `${item.color}15`,
                            border: `1px solid ${item.color}40`,
                            borderRadius: "12px",
                            padding: "16px 12px",
                            textAlign: "center",
                        }}>
                            <span style={{
                                fontSize: "28px",
                                fontWeight: "bold",
                                color: item.color,
                            }}>
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 传统 vs ReAct 对比 */}
            <div style={{
                display: "flex",
                gap: "16px",
                opacity: compareOpacity,
                transform: `translateY(${compareSlide}px)`,
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <div style={{
                    flex: 1,
                    background: "rgba(139,148,158,0.1)",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    border: "1px solid rgba(139,148,158,0.2)",
                }}>
                    <div style={{ fontSize: "24px", color: THEME.textSecondary, marginBottom: "8px", fontWeight: "bold" }}>
                        传统大模型
                    </div>
                    <div style={{ fontSize: "26px", color: THEME.textSecondary }}>
                        你问一句，它答一句
                    </div>
                </div>
                <div style={{
                    flex: 1,
                    background: "rgba(240,136,62,0.1)",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    border: `1px solid ${THEME.accent}40`,
                }}>
                    <div style={{ fontSize: "24px", color: THEME.accent, marginBottom: "8px", fontWeight: "bold" }}>
                        ReAct 模式
                    </div>
                    <div style={{ fontSize: "26px", color: THEME.textPrimary }}>
                        想好了再动手，动手回来再复盘
                    </div>
                </div>
            </div>

            {/* 底部总结 */}
            <div style={{
                marginTop: "auto",
                textAlign: "center",
                opacity: interpolate(frame, [90, 115], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                }),
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <p style={{
                    fontSize: "32px",
                    color: THEME.textPrimary,
                    fontWeight: "bold",
                }}>
                    把 AI 从"只会说的参谋"变成"真的能办事的助手"
                </p>
            </div>
        </AbsoluteFill>
    );
};