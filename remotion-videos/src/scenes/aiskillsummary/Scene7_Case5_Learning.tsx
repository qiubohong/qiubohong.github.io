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

const learningSteps = [
    {
        num: "①",
        skill: "请私教",
        icon: "🎓",
        color: "#ffd200",
        desc: "每天通勤路上，让 AI 生成 10 分钟「每日一课」，戴耳机边走边听",
        result: "碎片时间变黄金时间",
    },
    {
        num: "②",
        skill: "会压缩",
        icon: "🧃",
        color: "#3fb950",
        desc: "听到感兴趣的，说「压缩成 500 字精华版」，按主题分类存好",
        result: "一个月攒了 20 多份微课精华",
    },
    {
        num: "③",
        skill: "懂审美",
        icon: "🎨",
        color: "#58a6ff",
        desc: "听得多了，知道哪种讲解风格适合自己，反馈 AI 用同样风格",
        result: "越学越懂自己，越学越高效",
    },
];

const growthData = [
    { icon: "📚", label: "相当于", value: "20本书", sub: "半年内容", color: "#f0883e" },
    { icon: "🌍", label: "涉及领域", value: "4+", sub: "AI/理财/历史/心理学", color: "#58a6ff" },
    { icon: "⏰", label: "利用时间", value: "碎片", sub: "通勤/健身/做家务", color: "#3fb950" },
];

export const ASSScene7_Case5_Learning: React.FC = () => {
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

    // 三步骤卡片
    const stepOpacities = learningSteps.map((_, i) =>
        interpolate(frame, [25 + i * 30, 50 + i * 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const stepYs = learningSteps.map((_, i) =>
        interpolate(frame, [25 + i * 30, 50 + i * 30], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 成长数据卡片
    const dataOpacities = growthData.map((_, i) =>
        interpolate(frame, [125 + i * 18, 145 + i * 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const dataScales = growthData.map((_, i) =>
        interpolate(frame, [125 + i * 18, 145 + i * 18], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 数字计数动画
    const bookCount = Math.floor(interpolate(frame, [130, 175], [0, 20], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    }));

    // 结论弹入
    const conclusionOpacity = interpolate(frame, [185, 210], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [185, 210], [0.7, 1], {
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
                gap: 18,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 65, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>📖</div>
            <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>🎧</div>

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
                <div style={{ fontSize: 14, color: THEME.accent, fontWeight: "bold", marginBottom: 6, letterSpacing: 1 }}>
                    场景五 · 个人终身学习
                </div>
                <h2 style={{ fontSize: 40, fontWeight: "bold", background: THEME.titleGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", margin: "0 0 6px", lineHeight: 1.2 }}>
                    半年"听"完 20 本书
                </h2>
                <div style={{ fontSize: 15, color: THEME.textMuted }}>
                    技能 9（私教）+ 技能 7（压缩）+ 技能 2（审美）
                </div>
            </div>

            {/* 三步骤 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 680 }}>
                {learningSteps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: stepOpacities[i],
                            transform: `translateY(${stepYs[i]}px)`,
                            background: `${step.color}10`,
                            border: `1px solid ${step.color}44`,
                            borderRadius: 12,
                            padding: "12px 16px",
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start",
                        }}
                    >
                        <div style={{ flexShrink: 0, textAlign: "center" }}>
                            <div style={{ fontSize: 24 }}>{step.icon}</div>
                            <div style={{ fontSize: 11, color: step.color, fontWeight: "bold", marginTop: 2 }}>{step.num} {step.skill}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.5, marginBottom: 4 }}>{step.desc}</div>
                            <div style={{ fontSize: 13, color: step.color, fontWeight: "bold" }}>✅ {step.result}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 成长数据 */}
            <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 680 }}>
                {growthData.map((data, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            opacity: dataOpacities[i],
                            transform: `scale(${dataScales[i]})`,
                            background: `${data.color}12`,
                            border: `1px solid ${data.color}44`,
                            borderRadius: 12,
                            padding: "12px 8px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 26, marginBottom: 4 }}>{data.icon}</div>
                        <div style={{ fontSize: 11, color: THEME.textMuted, marginBottom: 4 }}>{data.label}</div>
                        <div style={{ fontSize: 22, fontWeight: "bold", color: data.color }}>
                            {i === 0 ? `${bookCount}本` : data.value}
                        </div>
                        <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 2 }}>{data.sub}</div>
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
                <div style={{ fontSize: 17, fontWeight: "bold", color: THEME.accentSub }}>
                    🌟 同事都觉得他「说话变有料了」——请私教随时学，会压缩存精华，懂审美越学越懂自己！
                </div>
            </div>
        </div>
    );
};
