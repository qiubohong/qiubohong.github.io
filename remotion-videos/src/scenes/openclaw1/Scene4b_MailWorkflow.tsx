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
};

const flowSteps = [
    { icon: "📨", color: "#f0883e", label: "收到邮件", desc: "龙虾监听邮箱，实时感知新邮件" },
    { icon: "🧠", color: "#58a6ff", label: "分析内容", desc: "AI 理解邮件意图，判断需要做什么" },
    { icon: "⚡", color: "#3fb950", label: "执行操作", desc: "自动回复、归档、转发或提醒" },
    { icon: "📋", color: "#ffd200", label: "记录结果", desc: "处理结果写入飞书或发消息通知你" },
];

export const OpenClaw1_Scene4b_MailWorkflow: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 图片从右侧滑入
    const imgSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { stiffness: 80, damping: 18, mass: 1.2 } });
    const imgX = interpolate(imgSpring, [0, 1], [100, 0]);
    const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 70 + Math.cos(frame * 0.008) * 6;
    const lightY = 45 + Math.sin(frame * 0.007) * 8;

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
                background: "radial-gradient(circle, rgba(240,136,62,0.12) 0%, transparent 70%)",
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
                    📧 真实案例：邮件自动处理
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                    从收到邮件到处理完毕，全程无需人工干预
                </p>
            </div>

            {/* 主体：左步骤 + 右大图 */}
            <div style={{ display: "flex", flex: 1, gap: "48px", alignItems: "stretch" }}>
                {/* 左侧：流程步骤（占2/5），填充整个高度 */}
                <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "16px" }}>
                    {flowSteps.map((s, i) => {
                        // 总帧数615 / 4 = ~153，从第30帧开始，每隔153帧出现一个
                        const stepDelay = 30 + i * 153;
                        const stepSpring = spring({
                            frame: Math.max(0, frame - stepDelay),
                            fps,
                            config: { stiffness: 90, damping: 20, mass: 1.2 },
                        });
                        const stepY = interpolate(stepSpring, [0, 1], [60, 0]);
                        const stepOpacity = interpolate(stepSpring, [0, 1], [0, 1]);
                        // 图标浮动
                        const floatY = Math.sin(frame * 0.05 + i * 1.5) * 4;
                        return (
                            <div key={i} style={{
                                opacity: stepOpacity,
                                transform: `translateY(${stepY}px)`,
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                background: `${s.color}10`,
                                borderRadius: "18px",
                                padding: "20px 28px",
                                border: `1px solid ${s.color}35`,
                                backdropFilter: "blur(16px)",
                                boxShadow: `0 4px 24px ${s.color}10`,
                            }}>
                                {/* 步骤序号圆圈 */}
                                <div style={{
                                    width: "52px", height: "52px",
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "24px", fontWeight: 900, color: "#0d1117",
                                    flexShrink: 0,
                                    boxShadow: `0 0 16px ${s.color}50`,
                                }}>
                                    {i + 1}
                                </div>
                                {/* 图标 */}
                                <div style={{
                                    fontSize: "44px", flexShrink: 0, lineHeight: 1,
                                    transform: `translateY(${floatY}px)`,
                                }}>{s.icon}</div>
                                {/* 文字 */}
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "30px", fontWeight: 900, color: s.color, margin: "0 0 6px 0", lineHeight: 1.2 }}>{s.label}</p>
                                    <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 右侧：邮件处理流程图（占3/5） */}
                <div style={{
                    flex: 3,
                    opacity: imgOpacity,
                    transform: `translateX(${imgX}px)`,
                    display: "flex",
                    alignItems: "center",
                }}>
                    <div style={{
                        background: "rgba(240,136,62,0.06)",
                        borderRadius: "24px",
                        padding: "24px",
                        border: "1px solid rgba(240,136,62,0.2)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,136,62,0.1)",
                    }}>
                        <Img
                            src={staticFile("OpenClaw1Video/mail_workflow.png")}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "16px",
                                display: "block",
                            }}
                        />
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
