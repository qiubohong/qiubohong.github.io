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
};

export const PromptScene9_Example: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const badOpacity = interpolate(frame, [30, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const goodOpacity = interpolate(frame, [80, 110], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const resultOpacity = interpolate(frame, [130, 160], [0, 1], {
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
                padding: "35px 55px",
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
                    fontSize: 46,
                    fontWeight: "bold",
                    marginBottom: 25,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: THEME.titleGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.3,
                }}
            >
                📊 普通用户 vs 高手
            </h2>

            {/* 普通用户 */}
            <div
                style={{
                    fontSize: 24,
                    lineHeight: 1.7,
                    opacity: badOpacity,
                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                    padding: "18px 28px",
                    borderRadius: 16,
                    borderLeft: "5px solid #ff6b6b",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 18,
                }}
            >
                <p style={{ margin: 0 }}>
                    ❌ <strong>普通用户：</strong>"帮我写个朋友圈"<br />
                    <span style={{ color: "#ffaaaa" }}>
                        AI回复：今天天气真好，心情也很美丽……<br />
                        （一套毫无特色的套话）
                    </span>
                </p>
            </div>

            {/* 高手 */}
            <div
                style={{
                    fontSize: 22,
                    lineHeight: 1.7,
                    opacity: goodOpacity,
                    backgroundColor: "rgba(63,185,80,0.08)",
                    padding: "18px 28px",
                    borderRadius: 16,
                    borderLeft: "5px solid #3fb950",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 18,
                }}
            >
                <p style={{ margin: 0 }}>
                    ✅ <strong>高手用四步法：</strong><br />
                    <span style={{ color: "#aaffcc" }}>
                        "扮演幽默段子手（角色）。我刚健身完练出腹肌，<br />
                        但不好意思直接炫耀（背景）。写个自嘲低调的朋友圈（任务），<br />
                        短小精悍带表情符号（格式）"
                    </span>
                </p>
            </div>

            {/* AI回复结果 */}
            <div
                style={{
                    fontSize: 24,
                    lineHeight: 1.7,
                    opacity: resultOpacity,
                    backgroundColor: "rgba(255, 210, 0, 0.08)",
                    padding: "18px 28px",
                    borderRadius: 16,
                    borderLeft: `5px solid ${THEME.accentSub}`,
                    maxWidth: "90%",
                    width: "100%",
                }}
            >
                <p style={{ margin: 0 }}>
                    🤖 <strong style={{ color: THEME.accentSub }}>AI回复：</strong><br />
                    <span style={{ color: "#ffffaa", fontStyle: "italic" }}>
                        "坚持三个月，终于从'一块腹肌'练成了'六块腹肌'<br />
                        ——虽然还得吸气才能看见。😂 #健身人的快乐"
                    </span>
                </p>
            </div>
        </div>
    );
};
