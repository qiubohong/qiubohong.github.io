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
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(0,0,0,0.45)",
};

export const Scene5_Architecture: React.FC = () => {
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

    // 架构图动画
    const diagramOpacity = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const diagramScale = interpolate(frame, [20, 50], [0.9, 1], {
        easing: Easing.out(Easing.back(1.2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 975帧 ≈ 31.52秒
    // 核心模块说明动画 (12秒、16秒、20秒)
    const modules = [
        { offset: 240, label: "大模型 LLM", desc: "负责思考和决策", color: THEME.think },
        { offset: 360, label: "工具集 Tools", desc: "搜索、计算、API等", color: THEME.act },
        { offset: 480, label: "记忆模块 Memory", desc: "存储历史记录", color: THEME.accent },
    ];

    // 代码逻辑动画 (26秒)
    const codeOpacity = interpolate(frame, [780, 810], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const codeSlide = interpolate(frame, [780, 810], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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
                    src={staticFile("ReAct/backgrounds/scene5-bg.png")}
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
                bottom: "-150px",
                left: "-100px",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(80px)",
                zIndex: 1,
            } as React.CSSProperties} />

            {/* 标题 */}
            <div style={{
                opacity: titleOpacity,
                textAlign: "center",
                flexShrink: 0,
                marginBottom: "16px",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <h1 style={{
                    fontSize: "52px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    ReAct Agent 架构
                </h1>
            </div>

            {/* 架构图 */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: diagramOpacity,
                transform: `scale(${diagramScale})`,
                minHeight: 0,
                marginBottom: "16px",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <Img
                    src={staticFile("ReAct/23_agent_architecture.png")}
                    style={{
                        maxWidth: "88%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    }}
                />
            </div>

            {/* 核心模块说明 */}
            <div style={{
                display: "flex",
                gap: "12px",
                flexShrink: 0,
                marginBottom: "16px",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                {modules.map((mod, i) => {
                    const modOpacity = interpolate(frame, [mod.offset, mod.offset + 25], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const modSlide = interpolate(frame, [mod.offset, mod.offset + 25], [20, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });

                    return (
                        <div key={i} style={{
                            flex: 1,
                            background: `${mod.color}12`,
                            border: `1px solid ${mod.color}40`,
                            borderRadius: "12px",
                            padding: "14px",
                            textAlign: "center",
                            opacity: modOpacity,
                            transform: `translateY(${modSlide}px)`,
                        }}>
                            <div style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: mod.color,
                                marginBottom: "6px",
                            }}>
                                {mod.label}
                            </div>
                            <div style={{
                                fontSize: "20px",
                                color: THEME.textSecondary,
                            }}>
                                {mod.desc}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 代码实现提示 */}
            <div style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: "12px",
                padding: "14px 20px",
                border: "1px solid rgba(255,255,255,0.1)",
                opacity: codeOpacity,
                transform: `translateY(${codeSlide}px)`,
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                }}>
                    <span style={{ fontSize: "20px" }}>💡</span>
                    <span style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: THEME.accent,
                    }}>
                        核心代码逻辑
                    </span>
                </div>
                <p style={{
                    fontSize: "20px",
                    color: THEME.textPrimary,
                    fontFamily: '"Fira Code", monospace',
                    lineHeight: 1.5,
                }}>
                    while not done:<br />
                    &nbsp;&nbsp;思考 → 行动 → 观察 → 判断答案？是则结束，否则继续循环
                </p>
                <p style={{
                    fontSize: "18px",
                    color: THEME.textSecondary,
                    marginTop: "8px",
                }}>
                    提示词设计很关键，告诉模型按什么格式回复、什么时候调用工具、什么时候给出最终答案
                </p>
            </div>
        </AbsoluteFill>
    );
};