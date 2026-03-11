import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const actionSteps = [
    { icon: "⭐", text: "收藏本系列，方便后续跟进", color: "#ffd200" },
    { icon: "🔑", text: "注册智谱 AI，领取免费额度", color: "#58a6ff" },
    { icon: "🦞", text: "期待下一篇：认识龙虾", color: "#f0883e" },
];

export const OpenClaw_Scene6_Summary: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 35], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const timingOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const timingSlide = interpolate(frame, [30, 60], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const questionOpacity = interpolate(frame, [100, 130], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const questionSlide = interpolate(frame, [100, 130], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 龙虾浮动
    const floatY = Math.sin(frame * 0.06) * 8;
    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;
    // 脉冲
    const pulse = 1 + Math.sin(frame * 0.08) * 0.04;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "40px 52px",
                boxSizing: "border-box",
                gap: "18px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "700px", height: "700px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.05) 0%, transparent 70%)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                textAlign: "center",
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    fontSize: "64px",
                    transform: `translateY(${floatY}px)`,
                    marginBottom: "8px",
                }}>🦞</div>
                <h1 style={{
                    fontSize: "60px",
                    fontWeight: "bold",
                    margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    现在是最好的时机！
                </h1>
                <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: 0 }}>
                    OpenClaw 刚刚开源，生态正在<span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>快速成长</span>
                </p>
            </div>

            {/* 时机说明 */}
            <div style={{
                opacity: timingOpacity,
                transform: `translateY(${timingSlide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(88,166,255,0.08) 0%, rgba(240,136,62,0.08) 100%)",
                    borderRadius: "16px",
                    padding: "20px 28px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    textAlign: "center",
                }}>
                    <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: "0 0 8px 0" }}>
                        现在入场，你能以最低的成本学会一套<span style={{ color: "#58a6ff", fontWeight: "bold" }}>未来几年都会用到的技能</span>
                    </p>
                    <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                        等到所有人都会用的时候，你已经是那个"用得最好的人"了！
                    </p>
                </div>
            </div>

            {/* 行动步骤 */}
            <div style={{ flexShrink: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {actionSteps.map((step, i) => {
                        const stepOpacity = interpolate(frame, [55 + i * 18, 75 + i * 18], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const stepSlide = interpolate(frame, [55 + i * 18, 75 + i * 18], [30, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const stepScale = interpolate(frame, [55 + i * 18, 75 + i * 18], [0.9, 1], {
                            easing: Easing.out(Easing.back(2)),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                opacity: stepOpacity,
                                transform: `translateY(${stepSlide}px) scale(${stepScale})`,
                                background: THEME.cardBg,
                                borderRadius: "14px",
                                padding: "16px 24px",
                                border: `1px solid rgba(${step.color === "#ffd200" ? "255,210,0" : step.color === "#58a6ff" ? "88,166,255" : "240,136,62"},0.2)`,
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                            }}>
                                <div style={{
                                    fontSize: "36px",
                                    flexShrink: 0,
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: `rgba(${step.color === "#ffd200" ? "255,210,0" : step.color === "#58a6ff" ? "88,166,255" : "240,136,62"},0.1)`,
                                    borderRadius: "12px",
                                }}>{step.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: 0, fontWeight: "bold" }}>
                                        第 {i + 1} 步：{step.text}
                                    </p>
                                </div>
                                <div style={{
                                    fontSize: "24px",
                                    color: step.color,
                                    transform: `scale(${pulse})`,
                                }}>→</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 互动问题 */}
            <div style={{
                opacity: questionOpacity,
                transform: `translateY(${questionSlide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(240,136,62,0.12) 0%, rgba(255,210,0,0.08) 100%)",
                    borderRadius: "16px",
                    padding: "18px 28px",
                    border: "1px solid rgba(240,136,62,0.3)",
                    textAlign: "center",
                }}>
                    <p style={{ fontSize: "22px", color: THEME.accent, fontWeight: "bold", margin: "0 0 6px 0" }}>
                        💬 你觉得 OpenClaw 会如何改变你的日常工作方式？
                    </p>
                    <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>
                        欢迎在评论区分享你最想用龙虾解决的问题！👇
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
