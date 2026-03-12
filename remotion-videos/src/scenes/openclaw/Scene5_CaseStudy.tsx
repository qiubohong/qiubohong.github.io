import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

// AI 对话数据
const CHAT_SHOW_START = 80;

const chatMessages = [
    { role: "user", text: "帮我整理这周的邮件", frame: CHAT_SHOW_START + 10 },
    { role: "ai", text: "好的！我来帮你处理...", frame: CHAT_SHOW_START + 40 },
    { role: "action", text: "📬 正在打开邮箱...", frame: CHAT_SHOW_START + 70 },
    { role: "action", text: "📊 按优先级分类中...", frame: CHAT_SHOW_START + 100 },
    { role: "action", text: "🗑️ 清理垃圾邮件...", frame: CHAT_SHOW_START + 130 },
    { role: "ai", text: "✅ 完成！共处理 47 封邮件，重要邮件 8 封已标记", frame: CHAT_SHOW_START + 160 },
];

export const OpenClaw_Scene5_CaseStudy: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 35], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const leftOpacity = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const leftSlide = interpolate(frame, [20, 50], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 右侧对话框展开动画
    const chatPanelWidth = interpolate(
        frame,
        [CHAT_SHOW_START, CHAT_SHOW_START + 30],
        [0, 520],
        {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );
    const chatPanelOpacity = interpolate(
        frame,
        [CHAT_SHOW_START, CHAT_SHOW_START + 20],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 打字机效果
    const getTypingText = (text: string, startFrame: number, charsPerFrame = 1.5) => {
        const elapsed = Math.max(0, frame - startFrame);
        const charsToShow = Math.floor(elapsed * charsPerFrame);
        return text.slice(0, charsToShow);
    };

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "24px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-150px", left: "-150px",
                width: "550px", height: "550px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                textAlign: "center",
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "68px",
                    fontWeight: "bold",
                    margin: "0 0 10px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    真实案例：整理邮件
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary, margin: 0 }}>
                    同样的需求，<span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>行动型 AI</span> 和问答型 AI 的差距
                </p>
            </div>

            {/* 主体：左侧说明 + 右侧对话框 */}
            <div style={{
                display: "flex",
                gap: "32px",
                flex: 1,
                minHeight: 0,
                alignItems: "stretch",
            }}>
                {/* 左侧：对比说明 */}
                <div style={{
                    flex: 1,
                    opacity: leftOpacity,
                    transform: `translateY(${leftSlide}px)`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                    minWidth: 0,
                }}>
                    {/* 普通 AI 结果 */}
                    <div style={{
                        background: "rgba(139,148,158,0.08)",
                        borderRadius: "18px",
                        padding: "22px 28px",
                        border: "1px solid rgba(139,148,158,0.2)",
                        flex: 1,
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                            <span style={{ fontSize: "28px" }}>💬</span>
                            <span style={{ fontSize: "24px", fontWeight: "bold", color: THEME.textSecondary }}>普通 AI 的回答</span>
                        </div>
                        <div style={{
                            background: "rgba(139,148,158,0.1)",
                            borderRadius: "12px",
                            padding: "16px",
                            borderLeft: "4px solid rgba(139,148,158,0.4)",
                        }}>
                            <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0, lineHeight: 1.8 }}>
                                "您可以按以下步骤整理邮件：<br />
                                1. 先按发件人分类<br />
                                2. 再按重要程度排序<br />
                                3. 删除垃圾邮件..."
                            </p>
                        </div>
                        <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: "12px 0 0 0", textAlign: "center" }}>
                            📝 给你建议，你自己去做
                        </p>
                    </div>

                    {/* 结论 */}
                    <div style={{
                        background: "linear-gradient(135deg, rgba(88,166,255,0.08) 0%, rgba(240,136,62,0.08) 100%)",
                        borderRadius: "18px",
                        padding: "18px 28px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        textAlign: "center",
                    }}>
                        <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: 0, fontWeight: "bold" }}>
                            🎯 一个给建议，一个帮执行
                        </p>
                        <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                            这就是"行动型 AI"的本质区别
                        </p>
                    </div>
                </div>

                {/* 右侧：AI 对话动画 */}
                <div style={{
                    width: chatPanelWidth,
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    opacity: chatPanelOpacity,
                }}>
                    <div style={{
                        background: "rgba(88,166,255,0.06)",
                        borderRadius: "20px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        overflow: "hidden",
                    }}>
                        {/* macOS 风格标题栏 */}
                        <div style={{
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: "20px 20px 0 0",
                            padding: "14px 20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexShrink: 0,
                        }}>
                            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
                            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
                            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
                            <span style={{ marginLeft: 10, color: THEME.textSecondary, fontSize: 16 }}>🦞 OpenClaw 对话</span>
                        </div>

                        {/* 对话内容 */}
                        <div style={{
                            flex: 1,
                            padding: "18px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            overflowY: "hidden",
                        }}>
                            {chatMessages.map((msg, i) => {
                                if (frame < msg.frame) return null;
                                const bubbleOpacity = interpolate(frame, [msg.frame, msg.frame + 15], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                });
                                const bubbleSlide = interpolate(frame, [msg.frame, msg.frame + 20], [20, 0], {
                                    easing: Easing.out(Easing.back(1.5)),
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                });

                                if (msg.role === "user") {
                                    return (
                                        <div key={i} style={{
                                            alignSelf: "flex-end",
                                            opacity: bubbleOpacity,
                                            transform: `translateY(${bubbleSlide}px)`,
                                            background: THEME.accent,
                                            color: "#fff",
                                            borderRadius: "14px 14px 2px 14px",
                                            padding: "12px 18px",
                                            maxWidth: "85%",
                                            fontSize: "18px",
                                        }}>
                                            {getTypingText(msg.text, msg.frame)}
                                        </div>
                                    );
                                } else if (msg.role === "action") {
                                    return (
                                        <div key={i} style={{
                                            alignSelf: "flex-start",
                                            opacity: bubbleOpacity,
                                            transform: `translateY(${bubbleSlide}px)`,
                                            background: "rgba(63,185,80,0.1)",
                                            border: "1px solid rgba(63,185,80,0.3)",
                                            color: "#3fb950",
                                            borderRadius: "10px",
                                            padding: "10px 18px",
                                            maxWidth: "90%",
                                            fontSize: "17px",
                                            fontFamily: "monospace",
                                        }}>
                                            {getTypingText(msg.text, msg.frame)}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={i} style={{
                                            alignSelf: "flex-start",
                                            opacity: bubbleOpacity,
                                            transform: `translateY(${bubbleSlide}px)`,
                                            background: "rgba(88,166,255,0.12)",
                                            border: "1px solid rgba(88,166,255,0.25)",
                                            color: THEME.textPrimary,
                                            borderRadius: "14px 14px 14px 2px",
                                            padding: "12px 18px",
                                            maxWidth: "90%",
                                            fontSize: "18px",
                                        }}>
                                            {getTypingText(msg.text, msg.frame)}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
