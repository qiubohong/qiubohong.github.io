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

export const TasteScene2_WhySelect: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const quoteOpacity = interpolate(frame, [35, 65], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const compareOpacity = interpolate(frame, [75, 105], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const conclusionOpacity = interpolate(frame, [115, 145], [0, 1], {
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
                    fontSize: 50,
                    fontWeight: "bold",
                    marginBottom: 28,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                数量 ≠ 质量
            </h2>

            {/* 名言引用 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: quoteOpacity,
                    backgroundColor: THEME.cardBg,
                    padding: "24px 36px",
                    borderRadius: 18,
                    borderLeft: `5px solid ${THEME.accentSub}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 28,
                    fontStyle: "italic",
                }}
            >
                <p style={{ margin: 0, color: THEME.accentSub }}>
                    "工匠之道在于知道如何工作，<br />
                    而艺术之道在于知道何时停止。"
                </p>
                <p style={{ margin: "12px 0 0", fontSize: 22, color: THEME.textMuted, fontStyle: "normal" }}>
                    —— 本·阿弗莱克
                </p>
            </div>

            {/* AI vs 你的对比 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    opacity: compareOpacity,
                    marginBottom: 28,
                    width: "88%",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(88,166,255,0.12)",
                        borderRadius: 16,
                        padding: "20px 24px",
                        textAlign: "center",
                        borderTop: `3px solid #58a6ff`,
                    }}
                >
                    <div style={{ fontSize: 40, marginBottom: 10 }}>🤖</div>
                    <div style={{ fontSize: 26, fontWeight: "bold", color: "#58a6ff", marginBottom: 8 }}>AI 负责</div>
                    <div style={{ fontSize: 22, color: THEME.textSecondary }}>源源不断地<br />生成内容</div>
                </div>
                <div
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(240,136,62,0.12)",
                        borderRadius: 16,
                        padding: "20px 24px",
                        textAlign: "center",
                        borderTop: `3px solid ${THEME.accent}`,
                    }}
                >
                    <div style={{ fontSize: 40, marginBottom: 10 }}>🎯</div>
                    <div style={{ fontSize: 26, fontWeight: "bold", color: THEME.accent, marginBottom: 8 }}>你 负责</div>
                    <div style={{ fontSize: 22, color: THEME.textSecondary }}>在恰当时候<br />喊停、选出最好的</div>
                </div>
            </div>

            {/* 结论 */}
            <div
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: conclusionOpacity,
                    color: THEME.accentSub,
                    padding: "18px 36px",
                    borderRadius: 14,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "85%",
                    lineHeight: 1.5,
                }}
            >
                这种"喊停"的能力，就是你的 AI 审美 ✨
            </div>
        </div>
    );
};
