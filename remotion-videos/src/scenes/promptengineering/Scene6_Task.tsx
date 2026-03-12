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
    stepGreen: "#3fb950",
};

export const PromptScene6_Task: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const badOpacity = interpolate(frame, [35, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const goodOpacity = interpolate(frame, [70, 100], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const tipOpacity = interpolate(frame, [110, 135], [0, 1], {
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
                    color: THEME.stepGreen,
                    fontWeight: "bold",
                    marginBottom: 15,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                第三步（最关键！）
            </div>

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 58,
                    fontWeight: "bold",
                    marginBottom: 30,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #3fb950, #56d364)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.2,
                }}
            >
                ✅ 下达"具体任务"
            </h2>

            {/* 错误示例 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.7,
                    opacity: badOpacity,
                    backgroundColor: "rgba(255, 107, 107, 0.12)",
                    padding: "20px 30px",
                    borderRadius: 16,
                    borderLeft: "6px solid #ff6b6b",
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 20,
                }}
            >
                <p style={{ margin: 0 }}>
                    ❌ <strong>模糊任务：</strong>"帮我写一封信"<br />
                    <span style={{ color: "#ffaaaa", fontSize: 24 }}>→ AI不知道写什么，只能乱猜</span>
                </p>
            </div>

            {/* 正确示例 */}
            <div
                style={{
                    fontSize: 26,
                    lineHeight: 1.7,
                    opacity: goodOpacity,
                    backgroundColor: "rgba(63,185,80,0.1)",
                    padding: "20px 30px",
                    borderRadius: 16,
                    borderLeft: `6px solid ${THEME.stepGreen}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 20,
                }}
            >
                <p style={{ margin: 0 }}>
                    ✅ <strong>具体任务：</strong><br />
                    <span style={{ color: "#aaffcc" }}>
                        "帮我写一封300字的求职信，<br />
                        开头要热情，中间列举活动经历，<br />
                        结尾表达希望面试的意愿"
                    </span>
                </p>
            </div>

            {/* 小贴士 */}
            <div
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: tipOpacity,
                    color: THEME.stepGreen,
                }}
            >
                💡 任务越具体，AI的执行力越强！
            </div>
        </div>
    );
};
