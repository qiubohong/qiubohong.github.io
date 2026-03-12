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

export const TasteScene5_PreciseExpression: React.FC = () => {
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

    const comparesOpacity = interpolate(frame, [70, 100], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const insightOpacity = interpolate(frame, [110, 140], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const compares = [
        {
            bad: "写得专业点",
            good: "每行不超过100字符，多用数据支撑，避免主观形容词",
        },
        {
            bad: "让它更有领导力",
            good: "用\"领导者（leader）\"而不是\"老板（boss）\"",
        },
        {
            bad: "让它更有趣",
            good: "开头用悬念，中间加比喻，结尾来个反转",
        },
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
                    color: "#58a6ff",
                    fontWeight: "bold",
                    marginBottom: 12,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                第二步
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
                🎯 修炼"精准表达"
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
                你用来描述"好"的词汇，<br />
                直接决定了AI输出的质量
            </div>

            {/* 对比示例 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    width: "90%",
                    opacity: comparesOpacity,
                    marginBottom: 22,
                }}
            >
                {compares.map((c, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 12,
                            backgroundColor: THEME.cardBg,
                            borderRadius: 14,
                            padding: "14px 20px",
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                fontSize: 22,
                                color: "#ff7b72",
                                padding: "8px 14px",
                                borderRadius: 10,
                                background: "rgba(255,123,114,0.1)",
                                textAlign: "center",
                            }}
                        >
                            ❌ {c.bad}
                        </div>
                        <div style={{ fontSize: 24, color: THEME.textMuted }}>→</div>
                        <div
                            style={{
                                flex: 2,
                                fontSize: 22,
                                color: "#3fb950",
                                padding: "8px 14px",
                                borderRadius: 10,
                                background: "rgba(63,185,80,0.1)",
                            }}
                        >
                            ✅ {c.good}
                        </div>
                    </div>
                ))}
            </div>

            {/* 关键洞察 */}
            <div
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: insightOpacity,
                    color: THEME.accentSub,
                    padding: "16px 30px",
                    borderRadius: 14,
                    background: "rgba(255, 210, 0, 0.1)",
                    maxWidth: "88%",
                    lineHeight: 1.6,
                }}
            >
                用行家的词汇和AI沟通，AI会给你行家水准的答案 💡
            </div>
        </div>
    );
};
