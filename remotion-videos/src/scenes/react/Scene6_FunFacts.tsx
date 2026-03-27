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
    cardBg: "rgba(255,255,255,0.06)",
};

export const Scene6_FunFacts: React.FC = () => {
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

    // 冷知识列表
    const facts = [
        {
            offset: 30,
            icon: "🚫",
            title: "与 React 没关系",
            content: "一个是 AI Agent 思路，一个是前端框架，纯粹名字像而已",
        },
        {
            offset: 80,
            icon: "🏢",
            title: "Google Research 提出",
            content: "2022 年提出，全名叫 Reasoning plus Acting",
        },
        {
            offset: 130,
            icon: "🔗",
            title: "LangChain 封装",
            content: "AgentExecutor 底层就是 ReAct 模式封装好的",
        },
        {
            offset: 180,
            icon: "🔧",
            title: "Function Calling",
            content: "现代实现用 Function Calling 输出结构化工具调用指令，更稳定",
        },
        {
            offset: 230,
            icon: "🌐",
            title: "还有其他模式",
            content: "还有反思模式 Reflexion、Plan-and-Solve 等，不同场景选不同模式",
        },
    ];

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "50px 40px",
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
                    src={staticFile("ReAct/backgrounds/scene6-bg.png")}
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
                top: "-100px",
                right: "-100px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,210,0,0.08) 0%, transparent 70%)",
                filter: "blur(60px)",
                zIndex: 1,
            } as React.CSSProperties} />
            <div style={{
                position: "absolute",
                bottom: "-150px",
                left: "-100px",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.08) 0%, transparent 70%)",
                filter: "blur(80px)",
                zIndex: 1,
            } as React.CSSProperties} />

            {/* 标题 */}
            <div style={{
                opacity: titleOpacity,
                textAlign: "center",
                flexShrink: 0,
                marginBottom: "24px",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <div style={{
                    display: "inline-block",
                    background: "rgba(255,210,0,0.1)",
                    border: "1px solid rgba(255,210,0,0.3)",
                    borderRadius: "999px",
                    padding: "8px 24px",
                    marginBottom: "12px",
                }}>
                    <span style={{ fontSize: "24px", color: THEME.accentAlt, fontWeight: "bold" }}>
                        🧊 冷知识时间
                    </span>
                </div>
                <h1 style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    5个关于 ReAct 的冷知识
                </h1>
            </div>

            {/* 冷知识列表 */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                flex: 1,
                overflow: "hidden",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                {facts.map((fact, i) => {
                    const factOpacity = interpolate(frame, [fact.offset, fact.offset + 25], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const factSlide = interpolate(frame, [fact.offset, fact.offset + 25], [30, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });

                    return (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "16px",
                            padding: "14px 20px",
                            background: THEME.cardBg,
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "14px",
                            opacity: factOpacity,
                            transform: `translateX(${factSlide}px)`,
                            flexShrink: 0,
                        }}>
                            <div style={{
                                fontSize: "36px",
                                flexShrink: 0,
                                width: "48px",
                                textAlign: "center",
                            }}>
                                {fact.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: THEME.accentAlt,
                                    marginBottom: "4px",
                                }}>
                                    {i + 1}. {fact.title}
                                </div>
                                <div style={{
                                    fontSize: "22px",
                                    color: THEME.textPrimary,
                                    lineHeight: 1.4,
                                }}>
                                    {fact.content}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};