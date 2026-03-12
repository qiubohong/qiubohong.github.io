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

const skills = [
    { num: "01", name: "会提问", icon: "💬", color: "#f0883e", summary: "四步提问法，让 AI 秒懂你", group: "基础沟通" },
    { num: "02", name: "懂审美", icon: "🎨", color: "#58a6ff", summary: "知道什么是好的，才能选出好的", group: "基础沟通" },
    { num: "03", name: "会交底", icon: "📋", color: "#3fb950", summary: "大师提示词，让 AI 真正认识你", group: "深度绑定" },
    { num: "04", name: "会迭代", icon: "🔄", color: "#f778ba", summary: "不满意就迭代，直到精品", group: "深度绑定" },
    { num: "05", name: "会立规矩", icon: "📐", color: "#ffd200", summary: "把一次好用变次次好用", group: "深度绑定" },
    { num: "06", name: "会听骂", icon: "🪞", color: "#a371f7", summary: "让 AI 当批评家，帮你看见盲点", group: "高阶进阶" },
    { num: "07", name: "会压缩", icon: "🧃", color: "#3fb950", summary: "上下文压缩，让 AI 轻松消化", group: "高阶进阶" },
    { num: "08", name: "会整理", icon: "🌿", color: "#58a6ff", summary: "整理知识库，让一切井井有条", group: "高阶进阶" },
    { num: "09", name: "请私教", icon: "🎓", color: "#ffd200", summary: "让 AI 当老师，随时随地学习", group: "高阶进阶" },
];

const groups = [
    { name: "基础沟通", range: [0, 1], color: "#f0883e" },
    { name: "深度绑定", range: [2, 4], color: "#3fb950" },
    { name: "高阶进阶", range: [5, 8], color: "#a371f7" },
];

export const ASSScene2_NineSkills: React.FC = () => {
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

    // 九技能卡片依次弹入
    const cardOpacities = skills.map((_, i) =>
        interpolate(frame, [25 + i * 14, 44 + i * 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const cardScales = skills.map((_, i) =>
        interpolate(frame, [25 + i * 14, 44 + i * 14], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 分组标签弹入
    const groupOpacities = groups.map((g, i) =>
        interpolate(frame, [30 + g.range[0] * 14, 50 + g.range[0] * 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [175, 200], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [175, 200], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景粒子
    const dots = Array.from({ length: 6 }, (_, i) => ({
        x: [8, 88, 15, 80, 5, 95][i],
        y: [12, 18, 82, 78, 50, 52][i],
        opacity: interpolate(frame, [i * 10, i * 10 + 20], [0, 0.15], {
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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: THEME.fontFamily,
                color: "white",
                boxSizing: "border-box",
                gap: 16,
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
                        background: skills[i % skills.length].color,
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
                <div style={{ fontSize: 18, color: THEME.accent, fontWeight: "bold", marginBottom: 6, letterSpacing: 1 }}>
                    快速回顾
                </div>
                <h2
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        background: THEME.titleGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    九个技能，三个层次
                </h2>
            </div>

            {/* 三层分组 + 技能卡片 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 760 }}>
                {groups.map((group, gi) => (
                    <div key={gi} style={{ opacity: groupOpacities[gi] }}>
                        {/* 分组标签 */}
                        <div style={{
                            fontSize: 13,
                            color: group.color,
                            fontWeight: "bold",
                            marginBottom: 8,
                            borderLeft: `3px solid ${group.color}`,
                            paddingLeft: 8,
                        }}>
                            {group.name}（技能 {String(group.range[0] + 1).padStart(2, "0")}–{String(group.range[1] + 1).padStart(2, "0")}）
                        </div>
                        {/* 该组技能卡片 */}
                        <div style={{ display: "flex", gap: 10 }}>
                            {skills.slice(group.range[0], group.range[1] + 1).map((skill, si) => {
                                const idx = group.range[0] + si;
                                return (
                                    <div
                                        key={idx}
                                        style={{
                                            flex: 1,
                                            opacity: cardOpacities[idx],
                                            transform: `scale(${cardScales[idx]})`,
                                            background: `${skill.color}12`,
                                            border: `1px solid ${skill.color}44`,
                                            borderRadius: 12,
                                            padding: "10px 8px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 4,
                                            textAlign: "center",
                                        }}
                                    >
                                        <span style={{ fontSize: 22 }}>{skill.icon}</span>
                                        <div style={{ fontSize: 11, color: skill.color, fontWeight: "bold" }}>技能 {skill.num}</div>
                                        <div style={{ fontSize: 14, fontWeight: "bold", color: THEME.textSecondary }}>{skill.name}</div>
                                        <div style={{ fontSize: 11, color: THEME.textMuted, lineHeight: 1.4 }}>{skill.summary}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, ${THEME.accent}22, ${THEME.accentSub}22)`,
                    border: `2px solid ${THEME.accent}`,
                    borderRadius: 18,
                    padding: "12px 28px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 18, fontWeight: "bold", color: THEME.accentSub }}>
                    九个技能 = 一套完整的 AI 使用心法，接下来看真实场景怎么组合！
                </div>
            </div>
        </div>
    );
};
