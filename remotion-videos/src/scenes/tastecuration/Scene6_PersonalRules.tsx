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

export const TasteScene6_PersonalRules: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const introOpacity = interpolate(frame, [35, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const rulesOpacity = interpolate(frame, [70, 100], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const conclusionOpacity = interpolate(frame, [110, 140], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const rules = [
        { text: "用明喻，不要用举例", icon: "✍️" },
        { text: "句子要短，不超过20个字", icon: "📏" },
        { text: "避免俗气的励志金句", icon: "🚫" },
        { text: "不要用破折号", icon: "📝" },
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
                    fontSize: 24,
                    color: "#3fb950",
                    fontWeight: "bold",
                    marginBottom: 12,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                第三步
            </div>

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 50,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                📋 制定"个人规则"
            </h2>

            {/* 副标题 */}
            <div
                style={{
                    fontSize: 24,
                    color: THEME.textMuted,
                    marginBottom: 24,
                    opacity: introOpacity,
                    textAlign: "center",
                    lineHeight: 1.5,
                }}
            >
                把审美固化下来，让AI次次都懂你
            </div>

            {/* 规则示例 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    width: "88%",
                    opacity: rulesOpacity,
                    marginBottom: 24,
                }}
            >
                <div
                    style={{
                        fontSize: 22,
                        color: THEME.textMuted,
                        marginBottom: 4,
                        textAlign: "center",
                    }}
                >
                    例如，这些规则让AI输出格外清爽：
                </div>
                {rules.map((rule, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: THEME.cardBg,
                            borderRadius: 14,
                            padding: "16px 24px",
                            gap: 16,
                            borderLeft: `4px solid #3fb950`,
                        }}
                    >
                        <span style={{ fontSize: 32 }}>{rule.icon}</span>
                        <span style={{ fontSize: 26, color: THEME.textSecondary }}>
                            "{rule.text}"
                        </span>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: conclusionOpacity,
                    color: THEME.accentSub,
                    padding: "16px 32px",
                    borderRadius: 14,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "88%",
                    lineHeight: 1.5,
                }}
            >
                规则积累越多，AI越来越有你的"味儿" 🎨
            </div>
        </div>
    );
};
