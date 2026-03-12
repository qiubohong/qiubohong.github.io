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

// 周报助手的3轮对话
const CHAT_SHOW_START = 90;

const dialogues = [
    {
        role: "user",
        text: "帮我写这周的总结：完成了3个需求评审，解决了2个线上bug，下周要做用户调研。",
        startFrame: 120,
        color: "#f0883e",
        charsPerFrame: 1.5,
    },
    {
        role: "ai",
        text: "📋 本周核心工作：\n1. 完成3个需求评审，覆盖核心功能模块\n2. 修复2个线上bug，系统稳定性提升\n\n⚠️ 问题与解决：响应速度优化中\n\n📅 下周计划：\n1. 用户调研（优先）\n2. 需求文档输出",
        startFrame: 200,
        color: "#58a6ff",
        charsPerFrame: 1.2,
    },
];

function useTypewriter(text: string, startFrame: number, frame: number, charsPerFrame = 1.5) {
    const elapsed = Math.max(0, frame - startFrame);
    const visibleChars = Math.floor(elapsed * charsPerFrame);
    return text.slice(0, visibleChars);
}

export const URScene5_Example: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 规则卡片淡入
    const ruleOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const ruleY = interpolate(frame, [30, 60], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 右侧对话框展开
    const chatPanelWidth = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 30], [0, 500], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const chatPanelOpacity = interpolate(frame, [CHAT_SHOW_START, CHAT_SHOW_START + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 用户气泡
    const userBubbleSpring = spring({ frame: frame - 120, fps, config: { damping: 20, stiffness: 200 } });
    const userBubbleY = interpolate(userBubbleSpring, [0, 1], [30, 0]);
    const userBubbleOpacity = interpolate(frame, [120, 138], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // AI 气泡
    const aiBubbleSpring = spring({ frame: frame - 200, fps, config: { damping: 20, stiffness: 200 } });
    const aiBubbleY = interpolate(aiBubbleSpring, [0, 1], [30, 0]);
    const aiBubbleOpacity = interpolate(frame, [200, 218], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const userText = useTypewriter(dialogues[0].text, dialogues[0].startFrame, frame, dialogues[0].charsPerFrame);
    const aiText = useTypewriter(dialogues[1].text, dialogues[1].startFrame, frame, dialogues[1].charsPerFrame);

    // 完成提示
    const doneOpacity = interpolate(frame, [340, 365], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const doneScale = spring({ frame: frame - 340, fps, config: { damping: 16, stiffness: 160 } });

    // 浮动装饰
    const floatY = Math.sin(frame * 0.05) * 5;

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
            {/* 左侧：标题 + 规则展示 */}
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
                    实战案例
                </div>
                <h2
                    style={{
                        fontSize: 38,
                        fontWeight: "bold",
                        marginBottom: 6,
                        opacity: titleOpacity,
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                    }}
                >
                    我的"周报专用助手"
                </h2>
                <div style={{ fontSize: 18, color: THEME.textMuted, marginBottom: 24, opacity: titleOpacity }}>
                    从半小时苦差事，变成5分钟轻松活
                </div>

                {/* 规则卡片 */}
                <div
                    style={{
                        background: "rgba(88,166,255,0.08)",
                        border: "1px solid rgba(88,166,255,0.25)",
                        borderRadius: 16,
                        padding: "18px 20px",
                        opacity: ruleOpacity,
                        transform: `translateY(${ruleY}px)`,
                        width: "100%",
                    }}
                >
                    <div style={{ fontSize: 16, color: "#58a6ff", fontWeight: "bold", marginBottom: 10 }}>
                        📋 周报助手的通用规则
                    </div>
                    <div style={{ fontSize: 15, color: THEME.textSecondary, lineHeight: 1.8 }}>
                        <div>• 角色：10年经验的HR主管</div>
                        <div>• 风格：简洁、数据化、重点突出</div>
                        <div>• 结构：核心工作 → 问题解决 → 下周计划</div>
                        <div>• 全文不超过500字，句子要短</div>
                        <div>• 避免俗气励志金句</div>
                    </div>
                </div>

                {/* 时间对比 */}
                <div
                    style={{
                        marginTop: 20,
                        display: "flex",
                        gap: 16,
                        opacity: ruleOpacity,
                        transform: `translateY(${floatY}px)`,
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,123,123,0.1)",
                            border: "1px solid rgba(255,123,123,0.3)",
                            borderRadius: 12,
                            padding: "12px 18px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 28, fontWeight: "bold", color: "#ff7b7b" }}>30分钟</div>
                        <div style={{ fontSize: 14, color: THEME.textMuted }}>以前</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: THEME.textMuted }}>→</div>
                    <div
                        style={{
                            background: "rgba(63,185,80,0.1)",
                            border: "1px solid rgba(63,185,80,0.3)",
                            borderRadius: 12,
                            padding: "12px 18px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 28, fontWeight: "bold", color: "#3fb950" }}>5分钟</div>
                        <div style={{ fontSize: 14, color: THEME.textMuted }}>现在</div>
                    </div>
                </div>
            </div>

            {/* 右侧：AI 对话动画 */}
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
                    <span style={{ marginLeft: 8, color: THEME.textMuted, fontSize: 14 }}>📝 周报小能手</span>
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
                        minHeight: 380,
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
                                fontSize: 15,
                                lineHeight: 1.6,
                                maxWidth: "92%",
                            }}
                        >
                            {userText}
                            {frame >= 120 && frame < 200 && (
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
                            <span>周报小能手</span>
                        </div>
                        <div
                            style={{
                                background: "rgba(88,166,255,0.15)",
                                border: "1px solid rgba(88,166,255,0.3)",
                                color: THEME.textSecondary,
                                borderRadius: "12px 12px 12px 2px",
                                padding: "10px 14px",
                                fontSize: 15,
                                lineHeight: 1.8,
                                maxWidth: "92%",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {aiText}
                            {frame >= 200 && frame < 340 && (
                                <span style={{ display: "inline-block", width: 2, height: "1em", background: "#58a6ff", marginLeft: 2, verticalAlign: "text-bottom", opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
                            )}
                        </div>
                    </div>
                </div>

                {/* 完成提示 */}
                <div
                    style={{
                        opacity: doneOpacity,
                        transform: `scale(${doneScale})`,
                        textAlign: "center",
                        fontSize: 16,
                        color: THEME.accentSub,
                        fontWeight: "bold",
                        marginTop: 12,
                    }}
                >
                    🎉 几乎不用改，直接交差！
                </div>
            </div>
        </div>
    );
};
