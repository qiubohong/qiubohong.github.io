import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Img,
    staticFile,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const steps = [
    { icon: "💬", color: "#58a6ff", text: "你在聊天工具里发一条消息" },
    { icon: "🧠", color: "#f0883e", text: "OpenClaw 理解你的意图" },
    { icon: "⚡", color: "#3fb950", text: "调用工具真实执行任务" },
    { icon: "✅", color: "#ffd200", text: "把结果反馈给你" },
];

export const OpenClaw1_Scene2b_WorkflowImg: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 图片入场
    const imgSpring = spring({ frame: Math.max(0, frame - 20), fps, config: { stiffness: 80, damping: 18, mass: 1.2 } });
    const imgX = interpolate(imgSpring, [0, 1], [-80, 0]);
    const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 30 + Math.sin(frame * 0.008) * 6;
    const lightY = 50 + Math.cos(frame * 0.007) * 8;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "32px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute",
                left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.12) 0%, transparent 70%)",
                filter: "blur(100px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "58px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    🔄 OpenClaw 工作流程图
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                    一条消息，从输入到执行，全程自动化
                </p>
            </div>

            {/* 主体：左大图 + 右步骤说明 */}
            <div style={{ display: "flex", flex: 1, gap: "48px", alignItems: "stretch" }}>
                {/* 左侧：工作流程图（占3/5） */}
                <div style={{
                    flex: 3,
                    opacity: imgOpacity,
                    transform: `translateX(${imgX}px)`,
                    display: "flex",
                    alignItems: "center",
                }}>
                    <div style={{
                        background: "rgba(88,166,255,0.06)",
                        borderRadius: "24px",
                        padding: "24px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(88,166,255,0.1)",
                    }}>
                        <Img
                            src={staticFile("OpenClaw1Video/workflow.png")}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "16px",
                                display: "block",
                            }}
                        />
                    </div>
                </div>

                {/* 右侧：步骤说明（占2/5，填充满整块区域） */}
                <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch" }}>
                    {steps.map((s, i) => {
                        const stepSpring = spring({
                            frame: Math.max(0, frame - 40 - i * 12),
                            fps,
                            config: { stiffness: 100, damping: 20, mass: 1.2 },
                        });
                        const stepX = interpolate(stepSpring, [0, 1], [60, 0]);
                        const stepOpacity = interpolate(stepSpring, [0, 1], [0, 1]);
                        return (
                            <div key={i} style={{
                                flex: 1,
                                opacity: stepOpacity,
                                transform: `translateX(${stepX}px)`,
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                background: `${s.color}12`,
                                borderRadius: "18px",
                                padding: "24px 28px",
                                border: `1px solid ${s.color}35`,
                                backdropFilter: "blur(16px)",
                                boxShadow: `0 4px 24px ${s.color}10`,
                            }}>
                                <div style={{
                                    fontSize: "52px",
                                    flexShrink: 0,
                                    width: "76px",
                                    height: "76px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: `${s.color}22`,
                                    borderRadius: "16px",
                                    boxShadow: `0 0 20px ${s.color}30`,
                                }}>
                                    {s.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{
                                        fontSize: "22px",
                                        color: s.color,
                                        fontWeight: "bold",
                                        display: "block",
                                        marginBottom: "6px",
                                        letterSpacing: "0.05em",
                                    }}>
                                        第 {i + 1} 步
                                    </span>
                                    <span style={{ fontSize: "32px", color: THEME.textPrimary, fontWeight: 700, lineHeight: 1.3 }}>
                                        {s.text}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
