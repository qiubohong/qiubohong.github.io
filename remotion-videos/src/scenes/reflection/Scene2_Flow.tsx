import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
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

// 步骤标签配置
const STEPS = [
    { name: "生成", color: "#3fb950", icon: "📝", desc: "Generate" },
    { name: "反思", color: "#f0883e", icon: "🤔", desc: "Reflect" },
    { name: "优化", color: "#58a6ff", icon: "✨", desc: "Refine" },
];

export const Scene2_Flow: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    // 背景淡入
    const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 标题动画
    const titleSpring = spring({
        frame,
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 图片动画
    const imageSpring = spring({
        frame: Math.max(0, frame - 30),
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const imageScale = interpolate(imageSpring, [0, 1], [0.9, 1]);
    const imageOpacity = interpolate(imageSpring, [0, 1], [0, 1]);

    // 步骤标签动画（错位弹入）
    const stepAnimations = STEPS.map((_, i) => {
        const stepSpring = spring({
            frame: Math.max(0, frame - 60 - i * 10),
            fps,
            config: { stiffness: 100, damping: 20, mass: 1.2 },
        });
        return {
            y: interpolate(stepSpring, [0, 1], [30, 0]),
            opacity: interpolate(stepSpring, [0, 1], [0, 1]),
            scale: interpolate(stepSpring, [0, 1], [0.9, 1]),
        };
    });

    // 浮动效果
    const floatY = Math.sin(frame * 0.04) * 4;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "60px",
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
                    src={staticFile("Reflection/backgrounds/scene2-bg.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(13,17,23,0.65)",
                }} />
            </div>

            {/* 弥散光装饰 */}
            <div style={{
                position: "absolute",
                top: "10%",
                right: "15%",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(50px)",
                transform: `translateY(${floatY}px)`,
                zIndex: 1,
            }} />

            {/* 标题区域 */}
            <div style={{
                flexShrink: 0,
                textAlign: "center",
                marginBottom: "24px",
                zIndex: 10,
                transform: `translateY(${titleY}px)`,
                opacity: titleOpacity,
            }}>
                <div style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    Reflection 工作原理
                </div>
                <div style={{
                    fontSize: "24px",
                    color: THEME.textSecondary,
                    marginTop: "12px",
                }}>
                    像写代码一样：写完 → 检查 → 优化
                </div>
            </div>

            {/* 图片展示区域 */}
            <div style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                marginBottom: "24px",
            }}>
                <div style={{
                    transform: `scale(${imageScale})`,
                    opacity: imageOpacity,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Img
                        src={staticFile("Reflection/reflection-loop.png")}
                        style={{
                            maxWidth: "90%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: "16px",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        }}
                    />
                </div>
            </div>

            {/* 步骤标签行 */}
            <div style={{
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                zIndex: 10,
                padding: "0 40px",
            }}>
                {STEPS.map((step, i) => {
                    const anim = stepAnimations[i];
                    const isLast = i === STEPS.length - 1;
                    
                    return (
                        <React.Fragment key={step.name}>
                            <div style={{
                                transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                                opacity: anim.opacity,
                                background: THEME.cardBg,
                                border: `2px solid ${step.color}40`,
                                borderRadius: "16px",
                                padding: "20px 28px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                minWidth: "160px",
                            }}>
                                <span style={{ fontSize: "32px" }}>{step.icon}</span>
                                <div>
                                    <div style={{
                                        fontSize: "26px",
                                        fontWeight: "bold",
                                        color: step.color,
                                    }}>
                                        {step.name}
                                    </div>
                                    <div style={{
                                        fontSize: "16px",
                                        color: THEME.textSecondary,
                                    }}>
                                        {step.desc}
                                    </div>
                                </div>
                            </div>
                            
                            {/* 箭头 */}
                            {!isLast && (
                                <div style={{
                                    opacity: Math.max(0, anim.opacity - 0.2),
                                    fontSize: "28px",
                                    color: THEME.textSecondary,
                                }}>
                                    →
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
