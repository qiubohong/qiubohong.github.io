import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const PRINCIPLES = [
    { icon: "✂️", title: "简洁是关键", desc: "描述必须清晰说明做什么和何时触发，避免冗长", color: "#58a6ff", delay: 30 },
    { icon: "🤖", title: "设定适当的自由度", desc: "指定方向但不要限制死走哪条路，让 AI 自主探索", color: "#3fb950", delay: 60 },
    { icon: "🧪", title: "完整的测试", desc: "需要在对应 AI 模型进行完整测试，确保触发准确", color: "#f0883e", delay: 90 },
];

const WORKFLOW_STEPS = [
    "第1步：分析代码（运行 analyze.py）",
    "第2步：创建审查清单（编辑 checklist.json）",
    "第3步：验证问题（运行 validate.py）",
    "第4步：生成报告（运行 report.py）",
    "第5步：验证输出（运行 verify.py）",
];

export const AgentSkill_Scene5_BestPractices: React.FC = () => {
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

    const workflowOpacity = interpolate(frame, [110, 140], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const floatY = Math.sin(frame * 0.05) * 4;
    const pulse = 1 + Math.sin(frame * 0.08) * 0.02;

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
                gap: "16px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-200px", right: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(63,185,80,0.06) 0%, transparent 70%)",
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
                    最佳实践
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    Claude 官方推荐的三大原则 + 工作流反馈循环
                </p>
            </div>

            {/* 主体：左侧三原则 + 右侧工作流 */}
            <div style={{
                flex: 1,
                display: "flex",
                gap: "24px",
                minHeight: 0,
            }}>
                {/* 左侧：三大原则 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{
                        fontSize: "26px", fontWeight: "bold", color: THEME.accentAlt,
                        marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px",
                    }}>
                        <span style={{ transform: `translateY(${floatY}px)` }}>📌</span>
                        三大编写原则
                    </div>
                    {PRINCIPLES.map((p, i) => {
                        const pOpacity = interpolate(frame, [p.delay, p.delay + 25], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const pSlide = interpolate(frame, [p.delay, p.delay + 25], [20, 0], {
                            easing: Easing.out(Easing.back(1.2)),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                opacity: pOpacity,
                                transform: `translateY(${pSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "12px",
                                padding: "16px 20px",
                                border: `1px solid ${p.color}30`,
                                flex: 1,
                                display: "flex",
                                gap: "14px",
                                alignItems: "flex-start",
                            }}>
                                <span style={{
                                    fontSize: "36px", flexShrink: 0,
                                    transform: i === 0 ? `scale(${pulse})` : "none",
                                }}>{p.icon}</span>
                                <div>
                                    <div style={{ fontSize: "24px", fontWeight: "bold", color: p.color, marginBottom: "6px" }}>{p.title}</div>
                                    <div style={{ fontSize: "21px", color: THEME.textPrimary, lineHeight: 1.5 }}>{p.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 右侧：工作流反馈循环 */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    opacity: workflowOpacity,
                }}>
                    <div style={{
                        fontSize: "26px", fontWeight: "bold", color: THEME.accentAlt,
                        marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px",
                    }}>
                        <span>🔄</span>
                        工作流 + 反馈循环
                    </div>
                    {WORKFLOW_STEPS.map((step, i) => {
                        const stepProgress = interpolate(frame, [120 + i * 10, 145 + i * 10], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                background: THEME.cardBg,
                                borderRadius: "10px",
                                padding: "12px 18px",
                                border: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                flex: 1,
                                opacity: stepProgress,
                            }}>
                                <div style={{
                                    width: "28px", height: "28px", borderRadius: "50%",
                                    background: "rgba(63,185,80,0.15)",
                                    border: "2px solid rgba(63,185,80,0.4)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "14px", color: "#3fb950", flexShrink: 0,
                                }}>
                                    {i + 1}
                                </div>
                                <span style={{ fontSize: "21px", color: THEME.textPrimary }}>{step}</span>
                            </div>
                        );
                    })}
                    <div style={{
                        textAlign: "center",
                        fontSize: "20px",
                        color: "#3fb950",
                        padding: "8px",
                        opacity: interpolate(frame, [175, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                    }}>
                        🔁 运行验证器 → 修复错误 → 重复，直到所有要求满足
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
