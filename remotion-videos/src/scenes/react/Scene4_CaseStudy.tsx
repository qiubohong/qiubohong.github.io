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
    cardBg: "rgba(0,0,0,0.45)",
};

export const Scene4_CaseStudy: React.FC = () => {
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

    // 问题展示动画
    const questionOpacity = interpolate(frame, [20, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const questionSlide = interpolate(frame, [20, 45], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 985帧 ≈ 31.84秒，每步约5秒
    // 步骤动画配置
    const steps = [
        {
            offset: 120,    // 4秒
            type: "thought",
            content: "我要算特斯拉股价乘以10，但不知道现在股价是多少，得先查一下",
        },
        {
            offset: 210,    // 7秒
            type: "action",
            content: "调用搜索工具 → 查询特斯拉当前股价",
        },
        {
            offset: 300,    // 10秒
            type: "observe",
            content: "搜索结果：当前特斯拉股价 250 美元",
        },
        {
            offset: 420,    // 14秒
            type: "thought",
            content: "拿到股价了，250 乘以 10 等于 2500",
        },
        {
            offset: 540,    // 18秒
            type: "action",
            content: "调用计算工具 → 计算 250 × 10",
        },
        {
            offset: 660,    // 22秒
            type: "observe",
            content: "计算结果：2500 美元",
        },
    ];

    // 最终答案动画 (27秒)
    const answerOpacity = interpolate(frame, [810, 840], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const answerScale = interpolate(frame, [810, 840], [0.9, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const getTypeConfig = (type: string) => {
        switch (type) {
            case "thought":
                return { label: "思考", color: THEME.think, icon: "🤔" };
            case "action":
                return { label: "行动", color: THEME.act, icon: "🚀" };
            case "observe":
                return { label: "观察", color: THEME.observe, icon: "👀" };
            default:
                return { label: "", color: THEME.textSecondary, icon: "" };
        }
    };

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
                    src={staticFile("ReAct/backgrounds/scene4-bg.png")}
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
                background: "radial-gradient(circle, rgba(240,136,62,0.1) 0%, transparent 70%)",
                filter: "blur(60px)",
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
                    fontSize: "48px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    实战案例演示
                </h1>
            </div>

            {/* 问题 */}
            <div style={{
                background: "rgba(240,136,62,0.1)",
                border: `2px solid ${THEME.accent}40`,
                borderRadius: "16px",
                padding: "16px 24px",
                marginBottom: "20px",
                opacity: questionOpacity,
                transform: `translateY(${questionSlide}px)`,
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <span style={{ fontSize: "24px", color: THEME.accent, fontWeight: "bold" }}>
                    📋 问题：
                </span>
                <span style={{ fontSize: "26px", color: THEME.textPrimary }}>
                    特斯拉股价乘以 10 是多少？
                </span>
            </div>

            {/* 步骤流程 */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: 1,
                overflow: "hidden",
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                {steps.map((step, i) => {
                    const config = getTypeConfig(step.type);
                    const stepOpacity = interpolate(frame, [step.offset, step.offset + 25], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const stepSlide = interpolate(frame, [step.offset, step.offset + 25], [20, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });

                    return (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "10px 16px",
                            background: `${config.color}10`,
                            border: `1px solid ${config.color}30`,
                            borderRadius: "12px",
                            opacity: stepOpacity,
                            transform: `translateX(${stepSlide}px)`,
                        }}>
                            <span style={{ fontSize: "28px" }}>{config.icon}</span>
                            <span style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: config.color,
                                minWidth: "56px",
                            }}>
                                {config.label}
                            </span>
                            <span style={{
                                fontSize: "22px",
                                color: THEME.textPrimary,
                                flex: 1,
                            }}>
                                {step.content}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* 最终答案 */}
            <div style={{
                background: "rgba(63,185,80,0.15)",
                border: "2px solid rgba(63,185,80,0.4)",
                borderRadius: "16px",
                padding: "20px 32px",
                marginTop: "16px",
                textAlign: "center",
                opacity: answerOpacity,
                transform: `scale(${answerScale})`,
                flexShrink: 0,
                zIndex: 2,
                position: "relative",
            } as React.CSSProperties}>
                <span style={{ fontSize: "24px", color: THEME.act, fontWeight: "bold" }}>
                    ✅ 最终答案：
                </span>
                <span style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: THEME.act,
                    marginLeft: "12px",
                }}>
                    2500 美元
                </span>
            </div>
        </AbsoluteFill>
    );
};