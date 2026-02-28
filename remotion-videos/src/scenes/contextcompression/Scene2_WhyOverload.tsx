import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
};

const problems = [
    {
        num: "01",
        icon: "🧠",
        title: "选择性失忆",
        desc: "只记得最后一段，前面说的全忘了",
        color: "#f0883e",
    },
    {
        num: "02",
        icon: "🌀",
        title: "消化不良",
        desc: "信息太多，理不清重点，回答变得混乱",
        color: "#58a6ff",
    },
];

export const CCScene2_WhyOverload: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 上下文窗口可视化
    const windowOpacity = interpolate(frame, [25, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const windowY = interpolate(frame, [25, 50], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 进度条填充动画（模拟上下文被填满）
    const progressFill = interpolate(frame, [55, 110], [0, 100], {
        easing: Easing.inOut(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    // 超出部分闪烁
    const overflowOpacity = interpolate(frame, [110, 125], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const overflowPulse = 0.6 + Math.sin(frame * 0.2) * 0.4;

    // 问题卡片
    const prob1Opacity = interpolate(frame, [130, 155], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const prob1Scale = interpolate(frame, [130, 155], [0.8, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const prob2Opacity = interpolate(frame, [160, 185], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const prob2Scale = interpolate(frame, [160, 185], [0.8, 1], {
        easing: Easing.out(Easing.back(1.5)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 结论
    const conclusionOpacity = interpolate(frame, [200, 225], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionY = interpolate(frame, [200, 225], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 进度条颜色（正常→警告→溢出）
    const barColor = progressFill < 70 ? "#3fb950" : progressFill < 90 ? "#ffd200" : "#f85149";

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "50px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 24,
            }}
        >
            {/* 标题 */}
            <div style={{ opacity: titleOpacity, textAlign: "center" }}>
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    AI 的工作记忆
                </div>
                <h2
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    为什么 AI 会"吃撑"？
                </h2>
            </div>

            {/* 上下文窗口可视化 */}
            <div
                style={{
                    opacity: windowOpacity,
                    transform: `translateY(${windowY}px)`,
                    background: THEME.cardBg,
                    borderRadius: 20,
                    padding: "24px 32px",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 18, color: THEME.textMuted, marginBottom: 12, textAlign: "center" }}>
                    上下文窗口（Context Window）——AI 一次能"记住"的信息量
                </div>
                {/* 进度条 */}
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, height: 28, overflow: "hidden", position: "relative" }}>
                    <div
                        style={{
                            width: `${Math.min(progressFill, 100)}%`,
                            height: "100%",
                            background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
                            borderRadius: 8,
                            transition: "background 0.3s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingRight: 8,
                        }}
                    >
                        {progressFill > 20 && (
                            <span style={{ fontSize: 13, color: "white", fontWeight: "bold" }}>
                                {Math.floor(progressFill)}%
                            </span>
                        )}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 14, color: THEME.textMuted }}>
                    <span>空</span>
                    <span style={{ color: "#ffd200" }}>⚠️ 警戒线 70%</span>
                    <span style={{ color: "#f85149" }}>💥 溢出 100%</span>
                </div>

                {/* 溢出警告 */}
                {progressFill >= 95 && (
                    <div
                        style={{
                            opacity: overflowOpacity * overflowPulse,
                            marginTop: 12,
                            textAlign: "center",
                            fontSize: 18,
                            color: "#f85149",
                            fontWeight: "bold",
                        }}
                    >
                        💥 上下文溢出！AI 开始"忘事"了……
                    </div>
                )}
            </div>

            {/* 两种问题 */}
            <div style={{ display: "flex", gap: 20, width: "100%", maxWidth: 680 }}>
                {[
                    { opacity: prob1Opacity, scale: prob1Scale, ...problems[0] },
                    { opacity: prob2Opacity, scale: prob2Scale, ...problems[1] },
                ].map((prob, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: prob.opacity,
                            transform: `scale(${prob.scale})`,
                            background: `${prob.color}15`,
                            border: `1px solid ${prob.color}44`,
                            borderRadius: 16,
                            padding: "20px 18px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 36, marginBottom: 10 }}>{prob.icon}</div>
                        <div style={{ fontSize: 13, color: prob.color, fontWeight: "bold", marginBottom: 6 }}>
                            问题 {prob.num}
                        </div>
                        <div style={{ fontSize: 20, fontWeight: "bold", color: prob.color, marginBottom: 8 }}>
                            {prob.title}
                        </div>
                        <div style={{ fontSize: 16, color: THEME.textMuted, lineHeight: 1.5 }}>
                            {prob.desc}
                        </div>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `translateY(${conclusionY}px)`,
                    textAlign: "center",
                    fontSize: 20,
                    color: THEME.textSecondary,
                    lineHeight: 1.6,
                    maxWidth: 640,
                }}
            >
                不是 AI 不聪明，是它真的"吃撑了"——
                <span style={{ color: THEME.accentSub, fontWeight: "bold" }}>
                    再厉害的 AI 也有"饭量"限制
                </span>
            </div>
        </div>
    );
};
