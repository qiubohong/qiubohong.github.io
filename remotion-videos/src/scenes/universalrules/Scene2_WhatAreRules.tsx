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

const rules = [
    { icon: "📝", title: "用九年级英语写作", desc: "写得简单易懂，别用复杂词汇", color: "#58a6ff" },
    { icon: "🎨", title: "用明喻，不要用举例", desc: "\"像一把钥匙\"比\"比如说钥匙\"更生动", color: "#3fb950" },
    { icon: "✂️", title: "句子要短", desc: "每句话说一件事，别堆砌", color: "#f0883e" },
    { icon: "🚫", title: "避免俗气的励志金句", desc: "\"成功需要努力\"这类废话一律删掉", color: "#f778ba" },
    { icon: "—", title: "不要用破折号", desc: "这是原文作者最强调的一条", color: "#ffd200" },
];

export const URScene2_WhatAreRules: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 25], [25, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 5个规则卡片依次弹入
    const cardScales = rules.map((_, i) => {
        const s = spring({ frame: frame - (40 + i * 25), fps, config: { damping: 18, stiffness: 200 } });
        return s;
    });
    const cardOpacities = rules.map((_, i) =>
        interpolate(frame, [40 + i * 25, 60 + i * 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 底部总结淡入
    const summaryOpacity = interpolate(frame, [185, 210], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 脉冲动画（强调元素）
    const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "50px 70px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            {/* 标题区 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                    marginBottom: 36,
                }}
            >
                <div style={{ fontSize: 22, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    什么是通用规则？
                </div>
                <h2
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1.2,
                        marginBottom: 8,
                    }}
                >
                    可以反复使用的固定指令
                </h2>
                <div style={{ fontSize: 20, color: THEME.textMuted }}>
                    一次写好，以后每次用AI都带上它
                </div>
            </div>

            {/* 规则卡片网格 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    width: "100%",
                    maxWidth: 900,
                }}
            >
                {rules.slice(0, 4).map((rule, i) => (
                    <div
                        key={i}
                        style={{
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "18px 22px",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 14,
                            opacity: cardOpacities[i],
                            transform: `scale(${cardScales[i]})`,
                            borderTop: `3px solid ${rule.color}`,
                        }}
                    >
                        <span style={{ fontSize: 32, flexShrink: 0 }}>{rule.icon}</span>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: "bold", color: rule.color, marginBottom: 4 }}>
                                {rule.title}
                            </div>
                            <div style={{ fontSize: 17, color: THEME.textMuted, lineHeight: 1.5 }}>
                                {rule.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 第5条规则（居中单独一行） */}
            <div
                style={{
                    marginTop: 16,
                    background: THEME.cardBg,
                    borderRadius: 16,
                    padding: "16px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    opacity: cardOpacities[4],
                    transform: `scale(${cardScales[4]})`,
                    borderTop: `3px solid ${rules[4].color}`,
                    width: "100%",
                    maxWidth: 900,
                    boxSizing: "border-box",
                }}
            >
                <span style={{ fontSize: 32, flexShrink: 0, color: rules[4].color, fontWeight: "bold" }}>{rules[4].icon}</span>
                <div>
                    <div style={{ fontSize: 20, fontWeight: "bold", color: rules[4].color, marginBottom: 4 }}>
                        {rules[4].title}
                    </div>
                    <div style={{ fontSize: 17, color: THEME.textMuted }}>{rules[4].desc}</div>
                </div>
            </div>

            {/* 底部总结 */}
            <div
                style={{
                    marginTop: 24,
                    opacity: summaryOpacity,
                    textAlign: "center",
                    fontSize: 20,
                    color: THEME.accentSub,
                    fontWeight: "bold",
                    transform: `scale(${pulse})`,
                }}
            >
                🎯 这些小细节，决定了AI输出是"凑合能用"还是"眼前一亮"
            </div>
        </div>
    );
};
