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

const adjustments = [
    { icon: "📉", cmd: "能不能再浅一点？", desc: "用初中生能听懂的语言", color: "#58a6ff" },
    { icon: "📈", cmd: "能不能再深一点？", desc: "多用一些专业术语，我想认真学", color: "#f0883e" },
    { icon: "🎭", cmd: "能不能更生动一点？", desc: "多举几个生活中的例子", color: "#3fb950" },
    { icon: "🔄", cmd: "能不能换个角度？", desc: "从历史发展的角度讲", color: "#f778ba" },
];

const levelExamples = [
    {
        level: "小学五年级",
        topic: "区块链",
        desc: "用一堆比喻和简单例子，让你秒懂",
        color: "#3fb950",
        icon: "🧒",
    },
    {
        level: "大学专业教材",
        topic: "心理学",
        desc: "上术语、上理论，让你学得扎实",
        color: "#f0883e",
        icon: "🎓",
    },
];

export const ATScene4_Step2_Adjust: React.FC = () => {
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

    // 调整指令卡片 2×2
    const adjOpacities = adjustments.map((_, i) =>
        interpolate(frame, [30 + i * 18, 52 + i * 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const adjScales = adjustments.map((_, i) =>
        interpolate(frame, [30 + i * 18, 52 + i * 18], [0.7, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 年级水平示例
    const levelOpacity = interpolate(frame, [110, 135], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const levelY = interpolate(frame, [110, 135], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const levelCardOpacities = levelExamples.map((_, i) =>
        interpolate(frame, [140 + i * 22, 162 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const levelCardScales = levelExamples.map((_, i) =>
        interpolate(frame, [140 + i * 22, 162 + i * 22], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [195, 220], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [195, 220], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 背景装饰浮动
    const floatY1 = Math.sin(frame * 0.04) * 8;
    const floatY2 = Math.sin(frame * 0.05 + 2) * 6;

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
                gap: 20,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 65, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>🎚️</div>
            <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>⚙️</div>

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    第二步
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
                    调整到最适合你的"难度"
                </h2>
                <div style={{ fontSize: 17, color: THEME.textMuted, marginTop: 8 }}>
                    不满意就用迭代技能，直接告诉它调整
                </div>
            </div>

            {/* 调整指令 2×2 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                {adjustments.map((adj, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: adjOpacities[i],
                            transform: `scale(${adjScales[i]})`,
                            background: `${adj.color}12`,
                            border: `1px solid ${adj.color}44`,
                            borderRadius: 14,
                            padding: "14px 16px",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                        }}
                    >
                        <span style={{ fontSize: 26, flexShrink: 0 }}>{adj.icon}</span>
                        <div>
                            <div style={{ fontSize: 16, color: adj.color, fontWeight: "bold", marginBottom: 4 }}>
                                {adj.cmd}
                            </div>
                            <div style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.5 }}>
                                {adj.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 年级水平小窍门 */}
            <div
                style={{
                    opacity: levelOpacity,
                    transform: `translateY(${levelY}px)`,
                    textAlign: "center",
                    fontSize: 17,
                    color: THEME.accentSub,
                    fontWeight: "bold",
                }}
            >
                💡 小窍门：告诉 AI 用某个"年级水平"来讲
            </div>

            <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 680 }}>
                {levelExamples.map((ex, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: levelCardOpacities[i],
                            transform: `scale(${levelCardScales[i]})`,
                            background: `${ex.color}12`,
                            border: `2px solid ${ex.color}44`,
                            borderRadius: 16,
                            padding: "16px 18px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{ex.icon}</div>
                        <div style={{ fontSize: 16, color: ex.color, fontWeight: "bold", marginBottom: 4 }}>
                            用{ex.level}的语言讲{ex.topic}
                        </div>
                        <div style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.5 }}>
                            {ex.desc}
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
                    borderRadius: 20,
                    padding: "14px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 20, fontWeight: "bold", color: THEME.accentSub }}>
                    几轮调整下来，你得到的就是完全为你量身打造的学习材料！
                </div>
            </div>
        </div>
    );
};
