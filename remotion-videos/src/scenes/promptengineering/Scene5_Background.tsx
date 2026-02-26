import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

// 统一设计 Token
const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentSub: "#ffd200",
    textMuted: "#8b949e",
    textSecondary: "#c9d1d9",
    cardBg: "rgba(255,255,255,0.06)",
    stepBlue: "#58a6ff",
};

export const PromptScene5_Background: React.FC = () => {
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

    const examplesOpacity = interpolate(frame, [70, 100], [0, 1], {
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
            {/* 步骤标签 */}
            <div
                style={{
                    fontSize: 28,
                    color: THEME.stepBlue,
                    fontWeight: "bold",
                    marginBottom: 15,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                第二步
            </div>

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 58,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.2,
                }}
            >
                📖 把"背景故事"说清楚
            </h2>

            {/* 解释 */}
            <div
                style={{
                    fontSize: 30,
                    lineHeight: 1.7,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(88,166,255,0.1)",
                    padding: "25px 35px",
                    borderRadius: 18,
                    borderLeft: `6px solid ${THEME.stepBlue}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 30,
                }}
            >
                <p style={{ margin: 0 }}>
                    AI不了解你是谁、在什么情况下提问<br />
                    所以你要<strong style={{ color: "#79c0ff" }}>主动"交代背景"</strong>
                </p>
            </div>

            {/* 示例 */}
            <div
                style={{
                    fontSize: 26,
                    lineHeight: 1.8,
                    opacity: examplesOpacity,
                    backgroundColor: THEME.cardBg,
                    padding: "25px 35px",
                    borderRadius: 18,
                    maxWidth: "88%",
                    width: "100%",
                }}
            >
                <p style={{ margin: 0, marginBottom: 15 }}>
                    ✉️ <strong>写求职邮件时告诉AI：</strong><br />
                    <span style={{ color: "#aaddff", paddingLeft: 20 }}>
                        "我刚毕业，想应聘互联网运营岗，<br />
                        性格开朗但缺乏经验，希望突出学习能力"
                    </span>
                </p>
                <p style={{ margin: 0 }}>
                    💡 <strong style={{ color: THEME.stepBlue }}>背景越详细，答案越贴合你的实际情况！</strong>
                </p>
            </div>
        </div>
    );
};
