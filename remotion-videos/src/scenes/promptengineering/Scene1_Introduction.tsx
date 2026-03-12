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
    cardBgAccent: "rgba(240,136,62,0.12)",
};

export const PromptScene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const titleScale = interpolate(frame, [0, 30], [0.8, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const contentOpacity = interpolate(frame, [40, 70], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const questionOpacity = interpolate(frame, [80, 110], [0, 1], {
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
                    marginBottom: 20,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                普通人也能用好AI · 技能一
            </div>

            {/* 主标题 */}
            <h1
                style={{
                    fontSize: 64,
                    fontWeight: "bold",
                    marginBottom: 20,
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
                学会和AI"好好说话"
            </h1>

            {/* 副标题 */}
            <h2
                style={{
                    fontSize: 36,
                    fontWeight: "normal",
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: THEME.textSecondary,
                    lineHeight: 1.4,
                }}
            >
                普通人也能用好AI的九大必备技能
            </h2>

            {/* 共鸣问题 */}
            <div
                style={{
                    fontSize: 32,
                    lineHeight: 1.7,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: THEME.cardBgAccent,
                    padding: "30px 40px",
                    borderRadius: 20,
                    borderLeft: `6px solid ${THEME.accent}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 30,
                }}
            >
                <p style={{ margin: 0 }}>
                    😤 让AI写邮件，结果一堆套话？<br />
                    🗺️ 让它策划旅行，景点不切实际？<br />
                    🤔 是AI不够聪明？还是工具不行？
                </p>
            </div>

            {/* 答案揭晓 */}
            <div
                style={{
                    fontSize: 38,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: questionOpacity,
                    color: THEME.accentSub,
                    padding: "20px 40px",
                    borderRadius: 15,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "85%",
                }}
            >
                都不是！你只是还不会和AI"好好说话" 💬
            </div>
        </div>
    );
};
