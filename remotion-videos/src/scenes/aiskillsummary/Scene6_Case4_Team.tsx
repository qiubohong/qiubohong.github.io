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

const teamSteps = [
    { num: "①", skill: "会立规矩", icon: "📐", color: "#ffd200", desc: "周报/邮件/会议纪要系统提示词，存成 PDF" },
    { num: "②", skill: "会交底", icon: "📋", color: "#3fb950", desc: "每人做一份大师提示词，存成「姓名_大师提示词.pdf」" },
    { num: "③", skill: "会整理", icon: "🌿", color: "#58a6ff", desc: "共享云盘建「AI 知识库」，按部门分类" },
];

const folderStructure = [
    { icon: "📁", name: "市场部", sub: "系统提示词", color: "#f0883e" },
    { icon: "📁", name: "运营部", sub: "系统提示词", color: "#58a6ff" },
    { icon: "📁", name: "通用模板", sub: "会议纪要、邮件助手", color: "#3fb950" },
    { icon: "📁", name: "个人专区", sub: "每人一个子文件夹", color: "#f778ba" },
];

export const ASSScene6_Case4_Team: React.FC = () => {
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
    const stepOpacities = teamSteps.map((_, i) =>
        interpolate(frame, [25 + i * 22, 48 + i * 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const stepScales = teamSteps.map((_, i) =>
        interpolate(frame, [25 + i * 22, 48 + i * 22], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 文件夹结构弹入
    const folderOpacity = interpolate(frame, [100, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const folderCardOpacities = folderStructure.map((_, i) =>
        interpolate(frame, [110 + i * 16, 130 + i * 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const folderCardScales = folderStructure.map((_, i) =>
        interpolate(frame, [110 + i * 16, 130 + i * 16], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );

    // 效果总结
    const resultOpacity = interpolate(frame, [185, 210], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const resultScale = interpolate(frame, [185, 210], [0.7, 1], {
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
            <div style={{ position: "absolute", top: "8%", right: "6%", fontSize: 65, opacity: 0.06, transform: `translateY(${floatY1}px)` }}>👥</div>
            <div style={{ position: "absolute", bottom: "10%", left: "5%", fontSize: 55, opacity: 0.06, transform: `translateY(${floatY2}px)` }}>🏢</div>

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
                <div style={{ fontSize: 14, color: THEME.accent, fontWeight: "bold", marginBottom: 6, letterSpacing: 1 }}>
                    场景四 · 团队统一 AI 用法
                </div>
                <h2 style={{ fontSize: 40, fontWeight: "bold", background: THEME.titleGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", margin: "0 0 6px", lineHeight: 1.2 }}>
                    从"野生"变成"家养"
                </h2>
                <div style={{ fontSize: 15, color: THEME.textMuted }}>
                    技能 5（规矩）+ 技能 3（交底）+ 技能 8（整理）
                </div>
            </div>

            {/* 三步骤 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 680 }}>
                {teamSteps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            opacity: stepOpacities[i],
                            transform: `scale(${stepScales[i]})`,
                            background: `${step.color}12`,
                            border: `1px solid ${step.color}44`,
                            borderRadius: 12,
                            padding: "12px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span style={{ fontSize: 24, flexShrink: 0 }}>{step.icon}</span>
                        <div>
                            <div style={{ fontSize: 14, color: step.color, fontWeight: "bold" }}>{step.num} {step.skill}</div>
                            <div style={{ fontSize: 13, color: THEME.textMuted, marginTop: 2 }}>{step.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 文件夹结构 */}
            <div style={{ opacity: folderOpacity, width: "100%", maxWidth: 680 }}>
                <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 8, textAlign: "center" }}>
                    📂 AI 知识库文件夹结构
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {folderStructure.map((folder, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: folderCardOpacities[i],
                                transform: `scale(${folderCardScales[i]})`,
                                background: `${folder.color}10`,
                                border: `1px solid ${folder.color}33`,
                                borderRadius: 10,
                                padding: "10px 14px",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <span style={{ fontSize: 22 }}>{folder.icon}</span>
                            <div>
                                <div style={{ fontSize: 14, color: folder.color, fontWeight: "bold" }}>{folder.name}</div>
                                <div style={{ fontSize: 12, color: THEME.textMuted }}>{folder.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 效果总结 */}
            <div
                style={{
                    opacity: resultOpacity,
                    transform: `scale(${resultScale})`,
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
                    🏆 一周后，团队 AI 输出质量明显统一，新人入职直接去知识库看一遍就会用！
                </div>
            </div>
        </div>
    );
};
