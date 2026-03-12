import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

// 统一设计 Token [[memory:lczlwbi2]]
const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
    cardBgAccent: "rgba(240,136,62,0.12)",
};

export const MasterScene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const titleScale = interpolate(frame, [0, 30], [0.85, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const contentOpacity = interpolate(frame, [40, 70], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const answerOpacity = interpolate(frame, [85, 115], [0, 1], {
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
            {/* 系列标签 */}
            <div
                style={{
                    fontSize: 26,
                    color: THEME.accent,
                    fontWeight: "bold",
                    marginBottom: 18,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                普通人也能用好AI · 技能三
            </div>

            {/* 主标题 */}
            <h1
                style={{
                    fontSize: 58,
                    fontWeight: "bold",
                    marginBottom: 16,
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `scale(${titleScale})`,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.2,
                    maxWidth: "90%",
                }}
            >
                给AI办一张"身份证"
            </h1>

            {/* 副标题 */}
            <h2
                style={{
                    fontSize: 30,
                    fontWeight: "normal",
                    marginBottom: 36,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: THEME.textSecondary,
                    lineHeight: 1.4,
                }}
            >
                大师提示词（Master Prompt）
            </h2>

            {/* 痛点场景 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.9,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: THEME.cardBgAccent,
                    padding: "28px 40px",
                    borderRadius: 20,
                    borderLeft: `6px solid ${THEME.accent}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 28,
                }}
            >
                <p style={{ margin: 0 }}>
                    😩 每次用AI，先解释自己是谁<br />
                    📝 再说明要做什么，纠正它的风格<br />
                    🔄 等AI"摸清楚你"，对话快结束了<br />
                    😤 下次打开，又得重来一遍……
                </p>
            </div>

            {/* 答案揭晓 */}
            <div
                style={{
                    fontSize: 34,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: answerOpacity,
                    color: THEME.accentSub,
                    padding: "20px 40px",
                    borderRadius: 15,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "85%",
                    lineHeight: 1.5,
                }}
            >
                这不是AI的问题，是你没给它一张"身份证" 🪪
            </div>
        </div>
    );
};
