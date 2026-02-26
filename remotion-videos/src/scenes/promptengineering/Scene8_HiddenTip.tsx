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
};

export const PromptScene8_HiddenTip: React.FC = () => {
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
            {/* 标签 */}
            <div
                style={{
                    fontSize: 26,
                    color: THEME.accentSub,
                    fontWeight: "bold",
                    marginBottom: 15,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                    background: "rgba(255, 210, 0, 0.12)",
                    padding: "8px 25px",
                    borderRadius: 30,
                }}
            >
                🔑 隐藏技巧
            </div>

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 52,
                    fontWeight: "bold",
                    marginBottom: 30,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #ffd200, #f0883e)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                给AI一个"超棒样例"
            </h2>

            {/* 内容 */}
            <div
                style={{
                    fontSize: 30,
                    lineHeight: 1.8,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(255, 210, 0, 0.08)",
                    padding: "30px 40px",
                    borderRadius: 20,
                    borderLeft: `6px solid ${THEME.accentSub}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 30,
                }}
            >
                <p style={{ margin: 0 }}>
                    手头有一段特别满意的文案？<br />
                    直接发给AI，告诉它：<br />
                    <strong style={{ color: THEME.accentSub }}>
                        "请参考这个风格，帮我写一个类似的"
                    </strong>
                </p>
            </div>

            {/* 结论 */}
            <div
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: conclusionOpacity,
                    color: THEME.accent,
                    padding: "20px 35px",
                    borderRadius: 15,
                    background: "rgba(240,136,62,0.1)",
                    maxWidth: "85%",
                    lineHeight: 1.6,
                }}
            >
                🌟 给一个世界级的样例<br />
                <span style={{ fontSize: 26, color: THEME.textSecondary, fontWeight: "normal" }}>
                    往往比写一百个要求更管用！
                </span>
            </div>
        </div>
    );
};
