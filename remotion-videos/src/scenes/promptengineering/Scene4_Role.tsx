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

export const PromptScene4_Role: React.FC = () => {
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

    const examples = [
        { icon: "📢", text: "写广告词 → 扮演经验丰富的广告策划" },
        { icon: "🧒", text: "给孩子讲故事 → 扮演温柔的幼儿园老师" },
        { icon: "💼", text: "分析工作问题 → 扮演10年经验HR顾问" },
    ];

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
                    color: THEME.accent,
                    fontWeight: "bold",
                    marginBottom: 15,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                第一步
            </div>

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 58,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #f0883e, #ffd200)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.2,
                }}
            >
                🎭 给AI一个"身份"
            </h2>

            {/* 解释 */}
            <div
                style={{
                    fontSize: 30,
                    lineHeight: 1.7,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(240,136,62,0.1)",
                    padding: "25px 35px",
                    borderRadius: 18,
                    borderLeft: `6px solid ${THEME.accent}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 35,
                }}
            >
                <p style={{ margin: 0 }}>
                    AI什么都知道，但你得告诉它<br />
                    <strong style={{ color: THEME.accentSub }}>"现在用哪个脑袋想问题"</strong>
                </p>
            </div>

            {/* 示例列表 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                    width: "88%",
                    opacity: examplesOpacity,
                }}
            >
                {examples.map((ex, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 14,
                            padding: "16px 25px",
                        }}
                    >
                        <span style={{ fontSize: 36, marginRight: 20 }}>{ex.icon}</span>
                        <span style={{ fontSize: 26, lineHeight: 1.5 }}>{ex.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
