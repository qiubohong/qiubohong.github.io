import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from "remotion";

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

// 打字机效果：根据帧数截取文字
function useTypewriter(text: string, startFrame: number, charsPerFrame = 1.5) {
    const frame = useCurrentFrame();
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const MasterScene3_WhatToWrite: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card1Opacity = interpolate(frame, [35, 60], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card2Opacity = interpolate(frame, [65, 90], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const card3Opacity = interpolate(frame, [95, 120], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // ── AI 对话动画 ──
    // 用户气泡：frame 135 开始滑入
    const userBubbleSpring = spring({
        frame: frame - 135,
        fps,
        config: { damping: 20, stiffness: 200 },
    });
    const userBubbleY = interpolate(userBubbleSpring, [0, 1], [40, 0]);
    const userBubbleOpacity = interpolate(frame, [135, 155], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // AI 气泡：frame 175 开始滑入
    const aiBubbleSpring = spring({
        frame: frame - 175,
        fps,
        config: { damping: 20, stiffness: 200 },
    });
    const aiBubbleY = interpolate(aiBubbleSpring, [0, 1], [40, 0]);
    const aiBubbleOpacity = interpolate(frame, [175, 195], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 打字机文字
    const userText = useTypewriter("我是一名互联网产品经理，喜欢简洁直接的风格，不要用破折号，避免励志金句。", 140, 2);
    const aiText = useTypewriter("✅ 已收到你的大师提示词！我会记住你的身份、目标和风格偏好，以后每次对话都会按你的习惯来。", 180, 2);

    const sections = [
        {
            icon: "👤",
            title: "我是谁",
            items: ["身份：上班族/创业者/学生", "行业：互联网/教育/设计", "角色：管理者还是执行者"],
            color: "#f0883e",
            opacity: card1Opacity,
        },
        {
            icon: "🎯",
            title: "我的目标与挑战",
            items: ["最近在做什么项目", "最常遇到什么难题", "用AI主要想解决什么"],
            color: "#58a6ff",
            opacity: card2Opacity,
        },
        {
            icon: "🎨",
            title: "我的风格偏好",
            items: ["语言风格：简洁直接 or 生动有趣", "格式偏好：要点列表 or 长文", "避坑清单：讨厌什么表达方式"],
            color: "#3fb950",
            opacity: card3Opacity,
        },
    ];

    return (
        <div
            style={{
                flex: 1,
                background: THEME.bg,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 60px",
                fontFamily: THEME.fontFamily,
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                gap: 40,
            }}
        >
            {/* 左侧：标题 + 三个模块卡片 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {/* 标题 */}
                <h2
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        marginBottom: 8,
                        textAlign: "left",
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.3,
                    }}
                >
                    大师提示词里该写什么？
                </h2>

                <div
                    style={{
                        fontSize: 22,
                        color: THEME.textMuted,
                        marginBottom: 22,
                        opacity: titleOpacity,
                        textAlign: "left",
                    }}
                >
                    不需要长篇大论，把最关键的信息写清楚
                </div>

                {/* 三个模块卡片 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        width: "100%",
                    }}
                >
                    {sections.map((section) => (
                        <div
                            key={section.title}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                backgroundColor: THEME.cardBg,
                                borderRadius: 14,
                                padding: "14px 20px",
                                opacity: section.opacity,
                                borderLeft: `5px solid ${section.color}`,
                                gap: 14,
                            }}
                        >
                            <span style={{ fontSize: 30, minWidth: 38 }}>{section.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: 22,
                                        fontWeight: "bold",
                                        color: section.color,
                                        marginBottom: 4,
                                    }}
                                >
                                    {section.title}
                                </div>
                                <div
                                    style={{
                                        fontSize: 18,
                                        color: THEME.textSecondary,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {section.items.map((item, i) => (
                                        <div key={i}>· {item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 右侧：AI 对话动画 */}
            <div
                style={{
                    width: 520,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 16,
                    flexShrink: 0,
                }}
            >
                {/* 对话框标题栏 */}
                <div
                    style={{
                        opacity: userBubbleOpacity,
                        transform: `translateY(${userBubbleY}px)`,
                        backgroundColor: "rgba(88,166,255,0.08)",
                        borderRadius: "16px 16px 0 0",
                        padding: "12px 20px",
                        borderBottom: "1px solid rgba(88,166,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "#ff5f57",
                        }}
                    />
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "#febc2e",
                        }}
                    />
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "#28c840",
                        }}
                    />
                    <span
                        style={{
                            fontSize: 18,
                            color: THEME.textMuted,
                            marginLeft: 8,
                        }}
                    >
                        🤖 DeepSeek · 新对话
                    </span>
                </div>

                {/* 对话内容区 */}
                <div
                    style={{
                        backgroundColor: "rgba(88,166,255,0.05)",
                        borderRadius: "0 0 16px 16px",
                        padding: "20px 20px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,
                        border: "1px solid rgba(88,166,255,0.15)",
                        borderTop: "none",
                        minHeight: 280,
                    }}
                >
                    {/* 用户消息气泡 */}
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
                        <div
                            style={{
                                fontSize: 16,
                                color: THEME.textMuted,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <span>你</span>
                            <span
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    backgroundColor: THEME.accent,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 14,
                                }}
                            >
                                👤
                            </span>
                        </div>
                        <div
                            style={{
                                backgroundColor: THEME.accent,
                                color: "white",
                                borderRadius: "16px 4px 16px 16px",
                                padding: "12px 16px",
                                fontSize: 18,
                                lineHeight: 1.6,
                                maxWidth: "90%",
                                textAlign: "left",
                            }}
                        >
                            📋 <strong>大师提示词：</strong>
                            <br />
                            {userText}
                            {/* 打字光标 */}
                            {frame >= 140 && frame < 200 && (
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: 2,
                                        height: "1em",
                                        backgroundColor: "white",
                                        marginLeft: 2,
                                        verticalAlign: "text-bottom",
                                        opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* AI 回复气泡 */}
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
                        <div
                            style={{
                                fontSize: 16,
                                color: THEME.textMuted,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <span
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    backgroundColor: "#58a6ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 14,
                                }}
                            >
                                🤖
                            </span>
                            <span>DeepSeek</span>
                        </div>
                        <div
                            style={{
                                backgroundColor: "rgba(88,166,255,0.15)",
                                border: "1px solid rgba(88,166,255,0.3)",
                                color: THEME.textSecondary,
                                borderRadius: "4px 16px 16px 16px",
                                padding: "12px 16px",
                                fontSize: 18,
                                lineHeight: 1.6,
                                maxWidth: "90%",
                            }}
                        >
                            {aiText}
                            {/* 打字光标 */}
                            {frame >= 180 && frame < 260 && (
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: 2,
                                        height: "1em",
                                        backgroundColor: "#58a6ff",
                                        marginLeft: 2,
                                        verticalAlign: "text-bottom",
                                        opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* 底部提示 */}
                <div
                    style={{
                        opacity: interpolate(frame, [240, 260], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                        textAlign: "center",
                        fontSize: 18,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                    }}
                >
                    🎉 从此，AI 就认识你了！
                </div>
            </div>
        </div>
    );
};
