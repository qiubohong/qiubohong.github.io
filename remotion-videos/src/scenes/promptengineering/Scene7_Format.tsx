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
    stepPink: "#f778ba",
};

export const PromptScene7_Format: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const contentOpacity = interpolate(frame, [35, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const formatsOpacity = interpolate(frame, [65, 95], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const formats = [
        { icon: "📝", want: "清单", say: "请用列表形式" },
        { icon: "📱", want: "发朋友圈", say: "生成完整文案，不加额外说明" },
        { icon: "📊", want: "比较选项", say: "请画一张对比表格" },
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
                    color: THEME.stepPink,
                    fontWeight: "bold",
                    marginBottom: 15,
                    opacity: titleOpacity,
                    letterSpacing: 2,
                }}
            >
                第四步
            </div>

            {/* 标题 */}
            <h2
                style={{
                    fontSize: 58,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #f778ba, #ffd200)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.2,
                }}
            >
                📋 指定"交付格式"
            </h2>

            {/* 解释 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.7,
                    textAlign: "center",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(247,120,186,0.1)",
                    padding: "20px 35px",
                    borderRadius: 16,
                    borderLeft: `6px solid ${THEME.stepPink}`,
                    maxWidth: "88%",
                    width: "100%",
                    marginBottom: 30,
                }}
            >
                <p style={{ margin: 0 }}>
                    AI可以用很多种方式呈现结果<br />
                    <strong style={{ color: THEME.accentSub }}>你得提前说好要哪种！</strong>
                </p>
            </div>

            {/* 格式示例 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: "88%",
                    opacity: formatsOpacity,
                }}
            >
                {formats.map((f, i) => (
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
                        <span style={{ fontSize: 36, marginRight: 20 }}>{f.icon}</span>
                        <div>
                            <span style={{ fontSize: 24, color: THEME.textSecondary }}>想要{f.want}，就说：</span><br />
                            <span style={{ fontSize: 26, fontWeight: "bold", color: THEME.accentSub }}>"{f.say}"</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
