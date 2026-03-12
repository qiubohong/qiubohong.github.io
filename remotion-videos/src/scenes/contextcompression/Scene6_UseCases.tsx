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

const useCases = [
    {
        icon: "📄",
        title: "处理长文档",
        desc: "公司年报、学术论文、长篇采访记录",
        color: "#f0883e",
    },
    {
        icon: "💬",
        title: "整理聊天记录",
        desc: "把一整年的微信群精华整理成一本语录",
        color: "#58a6ff",
    },
    {
        icon: "📝",
        title: "备份个人知识",
        desc: "把自己写的所有文章、日记压缩成个人思想集",
        color: "#3fb950",
    },
    {
        icon: "🤖",
        title: "喂给 AI 做背景",
        desc: "压缩后的内容更适合作为大师提示词的附件",
        color: "#f778ba",
    },
];

export const CCScene6_UseCases: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        easing: Easing.out(Easing.ease),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleY = interpolate(frame, [0, 25], [-30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const cardOpacities = useCases.map((_, i) =>
        interpolate(frame, [25 + i * 22, 50 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardScales = useCases.map((_, i) =>
        interpolate(frame, [25 + i * 22, 50 + i * 22], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [120, 145], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionY = interpolate(frame, [120, 145], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景粒子
    const dots = Array.from({ length: 6 }, (_, i) => ({
        x: [12, 82, 22, 72, 8, 88][i],
        y: [18, 22, 78, 72, 48, 52][i],
        opacity: interpolate(frame, [i * 10, i * 10 + 20], [0, 0.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }),
        floatY: Math.sin((frame + i * 28) * 0.04) * 7,
    }));

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
                padding: "50px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 28,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景粒子 */}
            {dots.map((dot, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: useCases[i % useCases.length].color,
                        opacity: dot.opacity,
                        transform: `translateY(${dot.floatY}px)`,
                    }}
                />
            ))}

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    四大应用场景
                </div>
                <h2
                    style={{
                        fontSize: 44,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    这个技能能用在哪？
                </h2>
            </div>

            {/* 四个使用场景 2×2 网格 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 18,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                {useCases.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: cardOpacities[i],
                            transform: `scale(${cardScales[i]})`,
                            background: `${item.color}12`,
                            border: `1px solid ${item.color}44`,
                            borderRadius: 16,
                            padding: "20px 18px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 10,
                        }}
                    >
                        <span style={{ fontSize: 36 }}>{item.icon}</span>
                        <div style={{ fontSize: 20, fontWeight: "bold", color: item.color }}>
                            {item.title}
                        </div>
                        <div style={{ fontSize: 15, color: THEME.textMuted, lineHeight: 1.5 }}>
                            {item.desc}
                        </div>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `translateY(${conclusionY}px)`,
                    textAlign: "center",
                    fontSize: 20,
                    color: THEME.textSecondary,
                    lineHeight: 1.6,
                    maxWidth: 640,
                }}
            >
                当你学会给信息"瘦身"，AI 就能更专注地帮你解决
                <span style={{ color: THEME.accentSub, fontWeight: "bold" }}>真正的问题</span>
            </div>
        </div>
    );
};
