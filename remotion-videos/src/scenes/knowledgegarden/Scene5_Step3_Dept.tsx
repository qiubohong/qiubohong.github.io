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

const departments = [
    {
        icon: "💼",
        name: "【工作类】",
        color: "#f0883e",
        items: ["周报提示词", "邮件助手", "会议纪要模板"],
    },
    {
        icon: "🏠",
        name: "【生活类】",
        color: "#58a6ff",
        items: ["故事创作", "旅行策划", "健康管理"],
    },
    {
        icon: "📚",
        name: "【学习类】",
        color: "#3fb950",
        items: ["知识压缩库", "技能学习计划", "读书笔记模板"],
    },
];

export const KGScene5_Step3_Dept: React.FC = () => {
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

    // 三个部门卡片依次弹入
    const deptOpacities = departments.map((_, i) =>
        interpolate(frame, [30 + i * 28, 58 + i * 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const deptScales = departments.map((_, i) =>
        interpolate(frame, [30 + i * 28, 58 + i * 28], [0.7, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 子项目依次出现（每个部门的子项目）
    const itemOpacities = departments.map((dept, di) =>
        dept.items.map((_, ii) =>
            interpolate(frame, [60 + di * 28 + ii * 12, 80 + di * 28 + ii * 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            })
        )
    );

    // 团队共享提示
    const teamOpacity = interpolate(frame, [155, 180], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const teamY = interpolate(frame, [155, 180], [20, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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

    // 背景粒子
    const dots = Array.from({ length: 5 }, (_, i) => ({
        x: [10, 85, 20, 75, 50][i],
        y: [15, 20, 80, 75, 10][i],
        opacity: interpolate(frame, [i * 10, i * 10 + 20], [0, 0.15], {
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
                gap: 22,
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
                        background: departments[i % departments.length].color,
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
                    第三步
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
                    按"部门"分类存
                </h2>
                <div style={{ fontSize: 18, color: THEME.textMuted, marginTop: 8 }}>
                    让 AI 花园有清晰的"功能分区"
                </div>
            </div>

            {/* 三大类文件夹 */}
            <div style={{ display: "flex", gap: 18, width: "100%", maxWidth: 720 }}>
                {departments.map((dept, di) => (
                    <div
                        key={di}
                        style={{
                            flex: 1,
                            opacity: deptOpacities[di],
                            transform: `scale(${deptScales[di]})`,
                            background: `${dept.color}12`,
                            border: `2px solid ${dept.color}44`,
                            borderRadius: 16,
                            padding: "18px 16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        <div style={{ fontSize: 32, textAlign: "center" }}>{dept.icon}</div>
                        <div style={{ fontSize: 17, fontWeight: "bold", color: dept.color, textAlign: "center" }}>
                            {dept.name}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {dept.items.map((item, ii) => (
                                <div
                                    key={ii}
                                    style={{
                                        opacity: itemOpacities[di][ii],
                                        background: "rgba(255,255,255,0.05)",
                                        borderRadius: 8,
                                        padding: "6px 10px",
                                        fontSize: 14,
                                        color: THEME.textMuted,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    <span style={{ color: dept.color, fontSize: 12 }}>📄</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 团队共享提示 */}
            <div
                style={{
                    opacity: teamOpacity,
                    transform: `translateY(${teamY}px)`,
                    background: "rgba(255,210,0,0.1)",
                    border: "1px solid rgba(255,210,0,0.3)",
                    borderRadius: 14,
                    padding: "12px 24px",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 680,
                    fontSize: 17,
                    color: THEME.accentSub,
                }}
            >
                👥 团队用？建立共享文件夹，大家用同一套"语言"和 AI 沟通，输出质量更稳定！
            </div>

            {/* 结论 */}
            <div
                style={{
                    opacity: conclusionOpacity,
                    transform: `scale(${conclusionScale})`,
                    textAlign: "center",
                    fontSize: 20,
                    color: THEME.textSecondary,
                    maxWidth: 640,
                    lineHeight: 1.6,
                }}
            >
                想用什么，直奔那个区域就行——
                <span style={{ color: THEME.accent, fontWeight: "bold" }}>你的 AI 花园有了清晰的功能分区！</span>
            </div>
        </div>
    );
};
