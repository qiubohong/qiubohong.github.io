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

export const MasterScene2_WhyStranger: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const problemOpacity = interpolate(frame, [35, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const solutionOpacity = interpolate(frame, [75, 105], [0, 1], {
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
                为什么AI总像个"陌生人"？
            </h2>

            {/* 问题说明 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: problemOpacity,
                    backgroundColor: THEME.cardBg,
                    padding: "24px 36px",
                    borderRadius: 18,
                    borderLeft: `5px solid #ff7b72`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 24,
                }}
            >
                <p style={{ margin: 0, color: THEME.textSecondary }}>
                    每次打开AI对话窗口，<br />
                    对它来说都是一次<strong style={{ color: "#ff7b72" }}>"初次见面"</strong><br />
                    它不知道你是谁、做什么工作<br />
                    喜欢什么风格、讨厌什么套话
                </p>
            </div>

            {/* 解决方案 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: solutionOpacity,
                    backgroundColor: "rgba(88,166,255,0.1)",
                    padding: "24px 36px",
                    borderRadius: 18,
                    borderLeft: `5px solid #58a6ff`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 24,
                }}
            >
                <p style={{ margin: 0 }}>
                    解决方案很简单：<br />
                    <strong style={{ color: "#58a6ff" }}>花一次时间，做一份"个人说明书"</strong><br />
                    以后每次用AI前先递给它
                </p>
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
                这份说明书，就是你的大师提示词 ✨
            </div>
        </div>
    );
};
