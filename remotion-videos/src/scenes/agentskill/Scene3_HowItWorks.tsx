import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
    Img,
    staticFile,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const PHASES = [
    { num: "01", icon: "🎯", name: "触发阶段", desc: "你提出任务，AI Agent 将其与所有 Skill 的描述字段进行匹配", color: "#58a6ff", delay: 40 },
    { num: "02", icon: "📥", name: "加载阶段", desc: "匹配成功后，先加载核心指令 SKILL.md（渐进式加载）", color: "#3fb950", delay: 70 },
    { num: "03", icon: "⚙️", name: "执行阶段", desc: "按照说明书步骤工作，必要时调用 scripts 目录下的脚本", color: "#f0883e", delay: 100 },
    { num: "04", icon: "✅", name: "输出阶段", desc: "交付符合预设标准的高质量结果", color: "#ffd200", delay: 130 },
];

export const AgentSkill_Scene3_HowItWorks: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 35], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 两张图片交替显示
    const IMG_SWITCH = 120;
    const img1Opacity = interpolate(frame, [30, 60, IMG_SWITCH - 15, IMG_SWITCH], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const img2Opacity = interpolate(frame, [IMG_SWITCH, IMG_SWITCH + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "36px 48px",
                boxSizing: "border-box",
                gap: "14px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-200px", left: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "60px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "4px",
                }}>
                    核心原理
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    Skill 运行的四个阶段，官方流程图解析
                </p>
            </div>

            {/* 主体：左侧四阶段 + 右侧流程图 */}
            <div style={{
                flex: 1,
                display: "flex",
                gap: "24px",
                minHeight: 0,
            }}>
                {/* 左侧：四阶段 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {PHASES.map((phase, i) => {
                        const phaseOpacity = interpolate(frame, [phase.delay, phase.delay + 25], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const phaseSlide = interpolate(frame, [phase.delay, phase.delay + 25], [20, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                opacity: phaseOpacity,
                                transform: `translateY(${phaseSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "12px",
                                padding: "14px 18px",
                                border: `1px solid ${phase.color}30`,
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                flex: 1,
                            }}>
                                <div style={{
                                    width: "44px", height: "44px", borderRadius: "50%",
                                    background: `${phase.color}20`,
                                    border: `2px solid ${phase.color}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "16px", fontWeight: "bold", color: phase.color,
                                    flexShrink: 0,
                                }}>
                                    {phase.num}
                                </div>
                                <div>
                                    <div style={{ fontSize: "22px", fontWeight: "bold", color: phase.color, marginBottom: "4px" }}>
                                        {phase.icon} {phase.name}
                                    </div>
                                    <div style={{ fontSize: "20px", color: THEME.textPrimary, lineHeight: 1.5 }}>{phase.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 右侧：流程图（两张交替） */}
                <div style={{
                    flex: 1,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {/* 图1：官方解析流程图 */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: img1Opacity,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                    }}>
                        <div style={{ fontSize: "20px", color: THEME.textSecondary, flexShrink: 0 }}>官方解析流程图</div>
                        <Img
                            src={staticFile("AgentSkillVideo/scene3-image1.png")}
                            style={{
                                maxWidth: "100%",
                                flex: 1,
                                objectFit: "contain",
                                borderRadius: "12px",
                                border: "1px solid rgba(88,166,255,0.15)",
                            }}
                        />
                    </div>
                    {/* 图2：Skill 运行流程图 */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: img2Opacity,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                    }}>
                        <div style={{ fontSize: "20px", color: THEME.textSecondary, flexShrink: 0 }}>代码审查示例流程</div>
                        <Img
                            src={staticFile("AgentSkillVideo/scene3-image2.png")}
                            style={{
                                maxWidth: "100%",
                                flex: 1,
                                objectFit: "contain",
                                borderRadius: "12px",
                                border: "1px solid rgba(240,136,62,0.15)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
