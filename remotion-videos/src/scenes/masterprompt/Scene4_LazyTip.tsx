import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from "remotion";

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

// 打字机效果
function useTypewriter(text: string, startFrame: number, charsPerFrame = 1.8) {
    const frame = useCurrentFrame();
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

// 单条对话气泡
const ChatBubble: React.FC<{
    text: string;
    role: "ai" | "user";
    startFrame: number;
    typeStartFrame: number;
    color: string;
    icon: string;
    label: string;
    stepNum: string;
}> = ({ text, role, startFrame, typeStartFrame, color, icon, label, stepNum }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const bubbleSpring = spring({
        frame: frame - startFrame,
        fps,
        config: { damping: 22, stiffness: 180 },
    });
    const bubbleY = interpolate(bubbleSpring, [0, 1], [30, 0]);
    const bubbleOpacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const displayText = useTypewriter(text, typeStartFrame, 1.8);
    const isTyping = frame >= typeStartFrame && frame < typeStartFrame + text.length / 1.8 + 10;

    const isUser = role === "user";

    return (
        <div
            style={{
                opacity: bubbleOpacity,
                transform: `translateY(${bubbleY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
                gap: 4,
                marginBottom: 10,
            }}
        >
            {/* 步骤标签 + 角色 */}
            <div
                style={{
                    fontSize: 14,
                    color: color,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    flexDirection: isUser ? "row-reverse" : "row",
                }}
            >
                <span
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    {stepNum}
                </span>
                <span style={{ color: THEME.textMuted }}>{icon} {label}</span>
            </div>
            {/* 气泡 */}
            <div
                style={{
                    backgroundColor: isUser
                        ? color
                        : "rgba(255,255,255,0.07)",
                    border: isUser ? "none" : `1px solid ${color}44`,
                    color: isUser ? "white" : THEME.textSecondary,
                    borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                    padding: "10px 14px",
                    fontSize: 16,
                    lineHeight: 1.6,
                    maxWidth: "88%",
                }}
            >
                {displayText}
                {isTyping && (
                    <span
                        style={{
                            display: "inline-block",
                            width: 2,
                            height: "1em",
                            backgroundColor: isUser ? "white" : color,
                            marginLeft: 2,
                            verticalAlign: "text-bottom",
                            opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export const MasterScene4_LazyTip: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const promptOpacity = interpolate(frame, [30, 55], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const stepsOpacity = interpolate(frame, [60, 85], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const tipOpacity = interpolate(frame, [90, 115], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 对话框：宽度从 0 展开到 480，同时淡入
    const CHAT_SHOW_START = 80;
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 480], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                flex: 1,
                background: THEME.bg,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "36px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                gap: 36,
            }}
        >
            {/* ── 左侧：标题 + 指令 + 步骤 + 贴士 ── */}
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
                        fontSize: 42,
                        fontWeight: "bold",
                        marginBottom: 8,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.3,
                    }}
                >
                    😴 偷懒技巧：让AI帮你写
                </h2>

                <div
                    style={{
                        fontSize: 20,
                        color: THEME.textMuted,
                        marginBottom: 18,
                        opacity: titleOpacity,
                    }}
                >
                    懒得写？反过来让AI帮你生成这份说明书！
                </div>

                {/* 指令示例 */}
                <div
                    style={{
                        fontSize: 18,
                        lineHeight: 1.7,
                        opacity: promptOpacity,
                        backgroundColor: "rgba(88,166,255,0.1)",
                        padding: "16px 22px",
                        borderRadius: 14,
                        borderLeft: "5px solid #58a6ff",
                        width: "100%",
                        marginBottom: 18,
                        boxSizing: "border-box",
                    }}
                >
                    <div style={{ fontSize: 16, color: THEME.textMuted, marginBottom: 6 }}>
                        📋 输入这段指令：
                    </div>
                    <p style={{ margin: 0, color: "#79c0ff", fontStyle: "italic" }}>
                        "请你扮演采访记者，向我提问，帮我生成一份完整的大师提示词。请开始提问。"
                    </p>
                </div>

                {/* 操作步骤 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 12,
                        opacity: stepsOpacity,
                        marginBottom: 16,
                        width: "100%",
                    }}
                >
                    {[
                        { step: "1", icon: "🎤", text: "AI像记者一样逐一提问", color: "#f0883e" },
                        { step: "2", icon: "💬", text: "你像聊天一样回答", color: "#58a6ff" },
                        { step: "3", icon: "📄", text: "AI整理成完整文档", color: "#3fb950" },
                    ].map((s) => (
                        <div
                            key={s.step}
                            style={{
                                flex: 1,
                                backgroundColor: THEME.cardBg,
                                borderRadius: 12,
                                padding: "14px 12px",
                                textAlign: "center",
                                borderTop: `3px solid ${s.color}`,
                            }}
                        >
                            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                            <div style={{ fontSize: 16, color: s.color, fontWeight: "bold", marginBottom: 4 }}>
                                步骤 {s.step}
                            </div>
                            <div style={{ fontSize: 16, color: THEME.textSecondary, lineHeight: 1.4 }}>
                                {s.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 小贴士 */}
                <div
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        opacity: tipOpacity,
                        color: THEME.accentSub,
                        padding: "12px 22px",
                        borderRadius: 12,
                        background: "rgba(255, 210, 0, 0.1)",
                        width: "100%",
                        lineHeight: 1.5,
                        boxSizing: "border-box",
                    }}
                >
                    💡 懒得打字？用语音输入，对着手机一通说，AI自动帮你整理！
                </div>
            </div>

            {/* ── 右侧：AI 对话动画 ── */}
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
                {/* 对话框标题栏 */}
                <div
                    style={{
                        backgroundColor: "rgba(88,166,255,0.08)",
                        borderRadius: "16px 16px 0 0",
                        padding: "10px 18px",
                        borderBottom: "1px solid rgba(88,166,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }} />
                    ))}
                    <span style={{ fontSize: 16, color: THEME.textMuted, marginLeft: 8 }}>
                        🤖 AI 采访记者 · 帮你生成大师提示词
                    </span>
                </div>

                {/* 对话内容区 */}
                <div
                    style={{
                        backgroundColor: "rgba(88,166,255,0.04)",
                        border: "1px solid rgba(88,166,255,0.15)",
                        borderTop: "none",
                        borderRadius: "0 0 16px 16px",
                        padding: "18px 18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 380,
                    }}
                >
                    {/* 步骤1：AI提问 */}
                    <ChatBubble
                        text="你好！请问你目前的职业是什么？主要用AI来做哪类工作？"
                        role="ai"
                        startFrame={90}
                        typeStartFrame={95}
                        color="#f0883e"
                        icon="🎤"
                        label="AI 提问"
                        stepNum="1"
                    />

                    {/* 步骤2：用户回答 */}
                    <ChatBubble
                        text="我是产品经理，主要用AI写需求文档、做竞品分析，喜欢简洁直接的风格。"
                        role="user"
                        startFrame={155}
                        typeStartFrame={160}
                        color="#58a6ff"
                        icon="💬"
                        label="你回答"
                        stepNum="2"
                    />

                    {/* 步骤3：AI整理输出 */}
                    <ChatBubble
                        text="📄 已为你生成大师提示词：你是一名产品经理，擅长需求文档与竞品分析，偏好简洁直接的表达风格……"
                        role="ai"
                        startFrame={220}
                        typeStartFrame={225}
                        color="#3fb950"
                        icon="📄"
                        label="AI 整理输出"
                        stepNum="3"
                    />

                    {/* 完成提示 */}
                    <div
                        style={{
                            opacity: interpolate(frame, [290, 310], [0, 1], {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }),
                            textAlign: "center",
                            fontSize: 18,
                            color: THEME.accentSub,
                            fontWeight: "bold",
                            marginTop: 10,
                            padding: "10px",
                            borderRadius: 10,
                            background: "rgba(255,210,0,0.08)",
                        }}
                    >
                        🎉 3步搞定！保存这份文档，以后每次用AI都上传它！
                    </div>
                </div>
            </div>
        </div>
    );
};
