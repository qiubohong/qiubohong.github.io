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

const maintenanceSteps = [
    {
        icon: "🗑️",
        title: "删掉没用的",
        desc: "用过一次的、已经过时的对话记录，果断删掉",
        color: "#f85149",
    },
    {
        icon: "🔄",
        title: "更新过时的",
        desc: "工作变了、孩子大了，之前的个人操作系统该更新了",
        color: "#ffd200",
    },
    {
        icon: "📂",
        title: "整理杂乱的",
        desc: "发现某个文件夹太乱，顺手归归类、改改名字",
        color: "#3fb950",
    },
];

export const KGScene6_Maintenance: React.FC = () => {
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

    // 时间提示
    const timeOpacity = interpolate(frame, [30, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const timeScale = interpolate(frame, [30, 55], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 三步维护卡片
    const stepOpacities = maintenanceSteps.map((_, i) =>
        interpolate(frame, [65 + i * 28, 90 + i * 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const stepYs = maintenanceSteps.map((_, i) =>
        interpolate(frame, [65 + i * 28, 90 + i * 28], [40, 0], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 花园比喻结论
    const conclusionOpacity = interpolate(frame, [165, 190], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const conclusionScale = interpolate(frame, [165, 190], [0.7, 1], {
        easing: Easing.out(Easing.back(2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 时钟脉冲动画
    const clockPulse = 1 + Math.sin(frame * 0.1) * 0.05;
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
                gap: 24,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 背景装饰 */}
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 65, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>✂️</div>
            <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>🌿</div>

            {/* 标题 */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 20, color: THEME.accent, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 }}>
                    定期维护
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
                    定期"除草"：别让资料发霉
                </h2>
            </div>

            {/* 时间提示 */}
            <div
                style={{
                    opacity: timeOpacity,
                    transform: `scale(${timeScale * clockPulse})`,
                    background: "rgba(255,210,0,0.12)",
                    border: "2px solid rgba(255,210,0,0.4)",
                    borderRadius: 16,
                    padding: "12px 28px",
                    textAlign: "center",
                    fontSize: 20,
                    color: THEME.accentSub,
                    fontWeight: "bold",
                }}
            >
                ⏰ 每隔一两个月，花 10 分钟做一次"园艺维护"
            </div>

            {/* 三步维护 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 680 }}>
                {maintenanceSteps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: stepOpacities[i],
                            transform: `translateY(${stepYs[i]}px)`,
                            background: THEME.cardBg,
                            borderRadius: 16,
                            padding: "18px 22px",
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                            borderLeft: `5px solid ${step.color}`,
                        }}
                    >
                        <span style={{ fontSize: 36, flexShrink: 0 }}>{step.icon}</span>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: "bold", color: step.color, marginBottom: 4 }}>
                                {step.title}
                            </div>
                            <div style={{ fontSize: 16, color: THEME.textMuted, lineHeight: 1.5 }}>
                                {step.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 花园比喻结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    background: `linear-gradient(135deg, rgba(63,185,80,0.15), rgba(63,185,80,0.05))`,
                    border: "2px solid rgba(63,185,80,0.5)",
                    borderRadius: 20,
                    padding: "14px 32px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                }}
            >
                <div style={{ fontSize: 20, fontWeight: "bold", color: "#3fb950" }}>
                    🌿 每次维护完，你会感觉 AI 工具又变"顺手"了——就像花园刚修剪完，清爽又好走！
                </div>
            </div>
        </div>
    );
};
