import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

// 统一设计 Token
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

export const PromptScene2_WhyAsk: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const expertOpacity = interpolate(frame, [30, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const conclusionOpacity = interpolate(frame, [80, 110], [0, 1], {
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
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                为什么"会问"这么重要？
            </h2>

            {/* 超级专家比喻 */}
            <div
                style={{
                    fontSize: 30,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: expertOpacity,
                    backgroundColor: "rgba(88,166,255,0.1)",
                    padding: "30px 40px",
                    borderRadius: 20,
                    borderLeft: "6px solid #58a6ff",
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 35,
                }}
            >
                <p style={{ margin: 0 }}>
                    🧙 想象你面前坐着一位<strong>超级专家</strong><br />
                    上知天文、下知地理，无所不知<br />
                    <br />
                    但他有个特点：<br />
                    <strong style={{ color: "#79c0ff" }}>你不说清楚，他只能凭猜测回答</strong>
                </p>
            </div>

            {/* 核心结论 */}
            <div
                style={{
                    fontSize: 34,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: conclusionOpacity,
                    padding: "25px 40px",
                    borderRadius: 15,
                    background: THEME.cardBg,
                    maxWidth: "85%",
                    lineHeight: 1.6,
                }}
            >
                <span style={{ color: "#ff6b6b" }}>🗑️ 垃圾进，垃圾出</span><br />
                <span style={{ fontSize: 26, color: THEME.textSecondary, fontWeight: "normal" }}>
                    你问得稀里糊涂，就别怪AI答得莫名其妙
                </span>
            </div>
        </div>
    );
};
