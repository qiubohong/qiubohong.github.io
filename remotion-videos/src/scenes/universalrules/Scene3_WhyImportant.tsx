import React from "react";
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from "remotion";

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

const skills = [
    { icon: "💬", label: "会提问", color: "#58a6ff" },
    { icon: "👁️", label: "懂审美", color: "#3fb950" },
    { icon: "🪪", label: "会交底", color: "#f0883e" },
    { icon: "🔄", label: "会迭代", color: "#f778ba" },
];

export const URScene3_WhyImportant: React.FC = () => {
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

    // 4个技能卡片依次弹入
    const skillScales = skills.map((_, i) => {
        return spring({ frame: frame - (50 + i * 20), fps, config: { damping: 18, stiffness: 200 } });
    });
    const skillOpacities = skills.map((_, i) =>
        interpolate(frame, [50 + i * 20, 70 + i * 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 箭头进度条
    const arrowProgress = interpolate(frame, [140, 200], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 核心结论弹入
    const conclusionScale = spring({ frame: frame - 210, fps, config: { damping: 16, stiffness: 160 } });
    const conclusionOpacity = interpolate(frame, [210, 230], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

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
            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                    marginBottom: 40,
                }}
            >
                <div style={{ fontSize: 22, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    为什么通用规则这么重要？
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
                    }}
                >
                    它是把所有技能"锁定"的关键
                </h2>
            </div>

            {/* 4个技能卡片 */}
            <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        style={{
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "20px 28px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 10,
                            opacity: skillOpacities[i],
                            transform: `scale(${skillScales[i]})`,
                            border: `2px solid ${skill.color}40`,
                            minWidth: 160,
                        }}
                    >
                        <span style={{ fontSize: 40 }}>{skill.icon}</span>
                        <span style={{ fontSize: 20, fontWeight: "bold", color: skill.color }}>{skill.label}</span>
                    </div>
                ))}
            </div>

            {/* 进度箭头 */}
            <div
                style={{
                    width: "80%",
                    maxWidth: 700,
                    height: 6,
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 3,
                    marginBottom: 30,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${arrowProgress * 100}%`,
                        height: "100%",
                        background: `linear-gradient(90deg, #58a6ff, ${THEME.accent})`,
                        borderRadius: 3,
                        transition: "width 0.1s",
                    }}
                />
            </div>

            {/* 核心结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: "linear-gradient(135deg, rgba(88,166,255,0.12), rgba(240,136,62,0.12))",
                    border: `2px solid rgba(240,136,62,0.5)`,
                    borderRadius: 20,
                    padding: "28px 50px",
                    textAlign: "center",
                    maxWidth: 860,
                }}
            >
                <div style={{ fontSize: 24, color: THEME.textSecondary, lineHeight: 1.7, marginBottom: 12 }}>
                    你学了提问、审美、交底、迭代……
                    <br />
                    但如果每次都要从头叮嘱一遍，这些技能的价值就大打折扣
                </div>
                <div
                    style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        color: `rgba(255, 210, 0, ${highlight})`,
                    }}
                >
                    🔒 通用规则 = 让你的标准，变成AI的默认行为
                </div>
            </div>
        </div>
    );
};
