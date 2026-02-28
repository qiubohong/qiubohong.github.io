import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

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

const comboCards = [
    { scenario: "写周报/邮件/文档", combo: "技能 3 + 技能 5 + 技能 4", icons: ["📋", "📐", "🔄"], color: "#f0883e" },
    { scenario: "给孩子讲故事", combo: "技能 1 + 技能 2 + 技能 9", icons: ["💬", "🎨", "🎓"], color: "#58a6ff" },
    { scenario: "做重要决策", combo: "技能 7 + 技能 6 + 技能 4", icons: ["🧃", "🪞", "🔄"], color: "#3fb950" },
    { scenario: "团队统一用法", combo: "技能 5 + 技能 3 + 技能 8", icons: ["📐", "📋", "🌿"], color: "#f778ba" },
    { scenario: "碎片时间学习", combo: "技能 9 + 技能 7 + 技能 2", icons: ["🎓", "🧃", "🎨"], color: "#ffd200" },
    { scenario: "处理海量资料", combo: "技能 7 + 技能 8 + 技能 1", icons: ["🧃", "🌿", "💬"], color: "#a371f7" },
    { scenario: "优化现有方案", combo: "技能 6 + 技能 4 + 技能 5", icons: ["🪞", "🔄", "📐"], color: "#3fb950" },
];

const finalWords = [
    "遇到新任务：先用技能 1（提问）打底，再用技能 4（迭代）打磨",
    "需要稳定输出：先做技能 3（身份证），再立技能 5（规矩）",
    "要做重要决策：先用技能 7（压缩）整理，再用技能 6（批评）找盲点",
    "想持续成长：用技能 9（私教）随时学，用技能 8（花园）随时用",
];

export const ASSScene8_ComboCard: React.FC = () => {
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

    // 组合卡片依次弹入
    const cardOpacities = comboCards.map((_, i) =>
        interpolate(frame, [25 + i * 12, 44 + i * 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardScales = comboCards.map((_, i) =>
        interpolate(frame, [25 + i * 12, 44 + i * 12], [0, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 最后的话依次出现
    const wordOpacities = finalWords.map((_, i) =>
        interpolate(frame, [120 + i * 20, 140 + i * 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const wordYs = finalWords.map((_, i) =>
        interpolate(frame, [120 + i * 20, 140 + i * 20], [15, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 终极金句弹入
    const finalOpacity = interpolate(frame, [210, 235], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const finalScale = interpolate(frame, [210, 235], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.6 + Math.sin(frame * 0.12) * 0.4;

    // 背景粒子
    const dots = Array.from({ length: 7 }, (_, i) => ({
        x: [8, 88, 15, 80, 5, 95, 50][i],
        y: [12, 18, 82, 78, 50, 52, 8][i],
        opacity: interpolate(frame, [i * 8, i * 8 + 20], [0, 0.15], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }),
        floatY: Math.sin((frame + i * 25) * 0.04) * 7,
    }));

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
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: comboCards[i % comboCards.length].color,
                        opacity: dot.opacity,
                        transform: `translateY(${dot.floatY}px)`,
                    }}
                />
            ))}

            {/* 左侧：技能组合卡 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, marginBottom: 14 }}>
                    <div style={{ fontSize: 14, color: THEME.accent, fontWeight: "bold", marginBottom: 4, letterSpacing: 1 }}>
                        彩蛋
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: "bold", background: THEME.titleGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", margin: 0, lineHeight: 1.2 }}>
                        技能组合卡
                    </h2>
                    <div style={{ fontSize: 13, color: THEME.textMuted, marginTop: 4 }}>截图存手机，随时查</div>
                </div>

                {/* 组合卡片列表 */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {comboCards.map((card, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: cardOpacities[i],
                                transform: `scale(${cardScales[i]})`,
                                background: `${card.color}10`,
                                border: `1px solid ${card.color}33`,
                                borderRadius: 10,
                                padding: "8px 12px",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                                {card.icons.map((icon, j) => (
                                    <span key={j} style={{ fontSize: 16 }}>{icon}</span>
                                ))}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: card.color, fontWeight: "bold" }}>{card.scenario}</div>
                                <div style={{ fontSize: 11, color: THEME.textMuted }}>{card.combo}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 右侧：最后的话 + 金句 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, minWidth: 0 }}>
                <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
                    <h2 style={{ fontSize: 26, fontWeight: "bold", background: THEME.titleGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", margin: "0 0 12px", lineHeight: 1.2 }}>
                        九个技能，一套心法
                    </h2>
                </div>

                {/* 四条使用场景 */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {finalWords.map((word, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: wordOpacities[i],
                                transform: `translateY(${wordYs[i]}px)`,
                                background: THEME.cardBg,
                                borderRadius: 10,
                                padding: "10px 14px",
                                fontSize: 13,
                                color: THEME.textSecondary,
                                lineHeight: 1.6,
                                borderLeft: `3px solid ${comboCards[i].color}`,
                            }}
                        >
                            {word}
                        </div>
                    ))}
                </div>

                {/* 终极金句 */}
                <div
                    style={{
                        opacity: finalOpacity,
                        transform: `scale(${finalScale})`,
                        background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                        border: `2px solid ${THEME.accent}`,
                        borderRadius: 16,
                        padding: "14px 18px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: 17, fontWeight: "bold", color: THEME.accentSub, lineHeight: 1.6 }}>
                        不是 AI 变聪明了，是
                        <span style={{ color: `rgba(240,136,62,${highlight})` }}>你变聪明了</span>
                        ！<br />
                        不是 AI 懂你了，是
                        <span style={{ color: `rgba(240,136,62,${highlight})` }}>你更懂 AI 了</span>
                        ！
                    </div>
                </div>
            </div>
        </div>
    );
};
