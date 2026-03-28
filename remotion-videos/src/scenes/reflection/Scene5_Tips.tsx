import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
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

// 冷知识内容
const TIPS = [
    {
        icon: "🔗",
        title: "Reflection + ReAct 绝配",
        desc: "一个负责过程中思考，一个负责结果复盘",
        color: "#58a6ff",
    },
    {
        icon: "📄",
        title: "理论基础",
        desc: "来自 2023 年 Self-Refine 论文",
        color: "#a371f7",
    },
    {
        icon: "🔧",
        title: "LangChain 已封装",
        desc: "可直接调用，无需从零实现",
        color: "#3fb950",
    },
    {
        icon: "🤔",
        title: "简单任务不必反思",
        desc: "复杂任务才值得投入反思成本",
        color: "#f0883e",
    },
    {
        icon: "👥",
        title: "可以外包审查",
        desc: "让另一个 AI 模型来做反思",
        color: "#79c0ff",
    },
];

export const Scene5_Tips: React.FC = () => {
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
    const titleY = interpolate(titleSpring, [0, 1], [-30, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 卡片动画（错位弹入）
    const cardAnimations = TIPS.map((_, i) => {
        const cardSpring = spring({
            frame: Math.max(0, frame - 40 - i * 12),
            fps,
            config: { stiffness: 100, damping: 18, mass: 1.2 },
        });
        return {
            y: interpolate(cardSpring, [0, 1], [60, 0]),
            scale: interpolate(cardSpring, [0, 1], [0.8, 1]),
            opacity: interpolate(cardSpring, [0, 1], [0, 1]),
        };
    });

    // 最后一张卡片的脉冲高亮
    const lastPulse = 0.7 + Math.sin(frame * 0.1) * 0.3;

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
                padding: "60px",
                boxSizing: "border-box",
            }}
        >
            {/* 背景遮罩 */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: THEME.bg,
                opacity: bgOpacity,
                zIndex: 0,
            }} />

            {/* 弥散光装饰 */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "5%",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(163,113,247,0.08) 0%, transparent 70%)",
                filter: "blur(60px)",
                zIndex: 1,
            }} />
            <div style={{
                position: "absolute",
                bottom: "10%",
                right: "10%",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.08) 0%, transparent 70%)",
                filter: "blur(50px)",
                zIndex: 1,
            }} />

            {/* 标题 */}
            <div style={{
                transform: `translateY(${titleY}px)`,
                opacity: titleOpacity,
                textAlign: "center",
                zIndex: 10,
                marginBottom: "48px",
            }}>
                <div style={{
                    fontSize: "56px",
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #f0883e, #ffd200)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    5个冷知识
                </div>
                <div style={{
                    fontSize: "24px",
                    color: THEME.textSecondary,
                    marginTop: "12px",
                }}>
                    帮你更深入理解 Reflection
                </div>
            </div>

            {/* 卡片网格 */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                maxWidth: "1200px",
                zIndex: 10,
            }}>
                {TIPS.map((tip, i) => {
                    const anim = cardAnimations[i];
                    const isLast = i === TIPS.length - 1;
                    
                    return (
                        <div
                            key={tip.title}
                            style={{
                                transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                                opacity: anim.opacity,
                                background: THEME.cardBg,
                                border: `1px solid ${isLast ? `${tip.color}${Math.floor(lastPulse * 255).toString(16).padStart(2, '0')}` : `${tip.color}30`}`,
                                borderRadius: "16px",
                                padding: "28px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                boxShadow: isLast 
                                    ? `0 8px 32px ${tip.color}20`
                                    : "0 8px 32px rgba(0,0,0,0.1)",
                            }}
                        >
                            <div style={{
                                fontSize: "48px",
                                marginBottom: "16px",
                            }}>
                                {tip.icon}
                            </div>
                            <div style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: tip.color,
                                marginBottom: "12px",
                            }}>
                                {tip.title}
                            </div>
                            <div style={{
                                fontSize: "18px",
                                color: THEME.textSecondary,
                                lineHeight: 1.5,
                            }}>
                                {tip.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
