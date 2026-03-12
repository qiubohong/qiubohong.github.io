import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
};

export const MasterScene6_Summary: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const contentOpacity = interpolate(frame, [35, 65], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const skillsOpacity = interpolate(frame, [70, 100], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const nextOpacity = interpolate(frame, [110, 140], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                flex: 1,
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 60px",
                fontFamily: THEME.fontFamily,
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 52,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                🤝 从"陌生人"到"老搭档"
            </h2>

            {/* 核心观点 */}
            <div
                style={{
                    fontSize: 26,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: THEME.cardBg,
                    padding: "22px 36px",
                    borderRadius: 18,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 28,
                }}
            >
                <p style={{ margin: 0 }}>
                    大师提示词的本质，是<strong style={{ color: THEME.accentSub }}>让AI提前了解你</strong><br />
                    花半小时做一份"个人说明书"<br />
                    以后每一次对话效率都能翻倍<br />
                    <span style={{ color: THEME.accent }}>
                        它会记得你讨厌什么套话，知道你偏爱什么风格
                    </span>
                </p>
            </div>

            {/* 三个技能总结 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 16,
                    opacity: skillsOpacity,
                    marginBottom: 28,
                }}
            >
                {[
                    { icon: "💬", label: "技能一\n会提问", color: "#f0883e" },
                    { icon: "🎨", label: "技能二\n懂审美", color: "#58a6ff" },
                    { icon: "🪪", label: "技能三\n会交底", color: "#3fb950" },
                ].map((skill, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 16,
                            padding: "20px 24px",
                            minWidth: 130,
                            borderTop: `3px solid ${skill.color}`,
                        }}
                    >
                        <span style={{ fontSize: 40, marginBottom: 10 }}>{skill.icon}</span>
                        <span
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                color: skill.color,
                                textAlign: "center",
                                whiteSpace: "pre-line",
                                lineHeight: 1.5,
                            }}
                        >
                            {skill.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* 下一期预告 */}
            <div
                style={{
                    fontSize: 22,
                    textAlign: "center",
                    opacity: nextOpacity,
                    color: THEME.textMuted,
                    padding: "14px 28px",
                    borderRadius: 12,
                    background: THEME.cardBg,
                    maxWidth: "85%",
                    lineHeight: 1.6,
                }}
            >
                下一期：<strong style={{ color: "#58a6ff" }}>和AI"掰手腕"</strong><br />
                <span style={{ fontSize: 20 }}>当AI给出的答案不对时，如何一步步逼出你真正想要的结果？</span>
            </div>
        </div>
    );
};
