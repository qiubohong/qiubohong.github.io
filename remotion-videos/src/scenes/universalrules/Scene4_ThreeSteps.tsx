import React from "react";
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from "remotion";

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

const steps = [
    {
        num: "01",
        title: "从'成功经验'里提炼规则",
        desc: "找到最满意的那次对话，复制给AI，让它帮你分析提炼",
        color: "#f0883e",
    },
    {
        num: "02",
        title: "保存成PDF，跨平台通用",
        desc: "豆包、元宝、DeepSeek、千问都支持上传PDF，一次编写到处运行",
        color: "#58a6ff",
    },
    {
        num: "03",
        title: "做成'专属助手'",
        desc: "创建自定义智能体，把规则粘贴到系统设定，随叫随到",
        color: "#3fb950",
    },
];

// AI 对话内容（步骤1：提炼规则）
const CHAT_SHOW_START = 100;
const USER_MSG = "请分析以上这段对话，提炼出一套通用规则，包括语气、结构、重点要素等。";
const AI_MSG = "✅ 已分析完成！你的偏好规则：\n• 开头用故事引入\n• 中间有数据支撑\n• 结尾简洁不啰嗦\n• 语气轻松像朋友聊天";

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.5) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const URScene4_ThreeSteps: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 三步卡片依次滑入
    const stepOpacities = steps.map((_, i) =>
        interpolate(frame, [30 + i * 25, 55 + i * 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const stepYs = steps.map((_, i) =>
        interpolate(frame, [30 + i * 25, 55 + i * 25], [30, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 右侧对话框展开动画
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 480], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 用户气泡：frame 130
    const userBubbleSpring = spring({ frame: frame - 130, fps, config: { damping: 20, stiffness: 200 } });
    const userBubbleY = interpolate(userBubbleSpring, [0, 1], [30, 0]);
    const userBubbleOpacity = interpolate(frame, [130, 148], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // AI 气泡：frame 185
    const aiBubbleSpring = spring({ frame: frame - 185, fps, config: { damping: 20, stiffness: 200 } });
    const aiBubbleY = interpolate(aiBubbleSpring, [0, 1], [30, 0]);
    const aiBubbleOpacity = interpolate(frame, [185, 203], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const userText = useTypewriter(USER_MSG, 135, frame, 1.8);
    const aiText = useTypewriter(AI_MSG, 190, frame, 1.5);

    const tipOpacity = interpolate(frame, [270, 295], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 36,
                overflow: "hidden",
            }}
        >
            {/* 左侧：标题 + 三步骤 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    minWidth: 0,
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, opacity: titleOpacity, letterSpacing: 1 }}>
                    三步建立你的通用规则
                </div>
                <h2
                    style={{
                        fontSize: 38,
                        fontWeight: "bold",
                        marginBottom: 28,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                    }}
                >
                    从经验到规则，一次搞定
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            style={{
                                background: THEME.cardBg,
                                borderRadius: 16,
                                padding: "16px 20px",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                                opacity: stepOpacities[i],
                                transform: `translateY(${stepYs[i]}px)`,
                                borderLeft: `5px solid ${step.color}`,
                            }}
                        >
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    background: `${step.color}22`,
                                    border: `2px solid ${step.color}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: step.color,
                                    flexShrink: 0,
                                }}
                            >
                                {step.num}
                            </div>
                            <div>
                                <div style={{ fontSize: 20, fontWeight: "bold", color: step.color, marginBottom: 4 }}>
                                    {step.title}
                                </div>
                                <div style={{ fontSize: 17, color: THEME.textMuted, lineHeight: 1.5 }}>
                                    {step.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 右侧：AI 对话动画（从0展开） */}
            <div
                style={{
                    width: chatPanelWidth,
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    opacity: chatPanelOpacity,
                }}
            >
                {/* macOS 风格标题栏 */}
                <div
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "12px 12px 0 0",
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>🤖 提炼规则</span>
                </div>

                {/* 对话内容区 */}
                <div
                    style={{
                        background: "rgba(88,166,255,0.05)",
                        border: "1px solid rgba(88,166,255,0.15)",
                        borderTop: "none",
                        borderRadius: "0 0 12px 12px",
                        padding: "20px 16px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        minHeight: 340,
                    }}
                >
                    {/* 用户气泡 */}
                    <div
                        style={{
                            opacity: userBubbleOpacity,
                            transform: `translateY(${userBubbleY}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                            <span>你</span>
                            <span style={{ width: 22, height: 22, borderRadius: "50%", background: THEME.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>👤</span>
                        </div>
                        <div
                            style={{
                                background: THEME.accent,
                                color: "white",
                                borderRadius: "12px 12px 2px 12px",
                                padding: "10px 14px",
                                fontSize: 16,
                                lineHeight: 1.6,
                                maxWidth: "90%",
                            }}
                        >
                            {userText}
                            {frame >= 135 && frame < 185 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>

                    {/* AI 气泡 */}
                    <div
                        style={{
                            opacity: aiBubbleOpacity,
                            transform: `translateY(${aiBubbleY}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 13, color: THEME.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#58a6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🤖</span>
                            <span>AI</span>
                        </div>
                        <div
                            style={{
                                background: "rgba(88,166,255,0.15)",
                                border: "1px solid rgba(88,166,255,0.3)",
                                color: THEME.textSecondary,
                                borderRadius: "12px 12px 12px 2px",
                                padding: "10px 14px",
                                fontSize: 16,
                                lineHeight: 1.8,
                                maxWidth: "90%",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {aiText}
                            {frame >= 190 && frame < 280 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "#58a6ff", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>
                </div>

                {/* 底部提示 */}
                <div
                    style={{
                        opacity: tipOpacity,
                        textAlign: "center",
                        fontSize: 15,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                        marginTop: 12,
                    }}
                >
                    💾 保存成PDF，以后每次用AI都带上它！
                </div>
            </div>
        </div>
    );
};
