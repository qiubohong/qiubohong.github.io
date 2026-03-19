import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Img,
    staticFile,
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

const LAUNCH_STEPS = [
    {
        cmd: "openclaw onboard",
        title: "配置向导",
        desc: "选择大模型平台和消息渠道",
        color: "#58a6ff",
        icon: "⚙️",
    },
    {
        cmd: "openclaw gateway start",
        title: "启动网关服务",
        desc: "启动核心服务，接收消息",
        color: "#3fb950",
        icon: "🚀",
    },
    {
        cmd: "openclaw dashboard",
        title: "打开管理界面（可选）",
        desc: "浏览器自动打开 127.0.0.1:18789",
        color: "#f0883e",
        icon: "🖥️",
    },
];

export const OpenClawInstall_Scene4_Launch: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 命令高亮闪烁
    const cmdHighlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    // 图片展示（延迟出现）
    const imgOpacity = interpolate(frame, [110, 140], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const imgScale = interpolate(frame, [110, 140], [0.95, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 流动箭头动画
    const arrowProgress = (frame * 1.5) % 100;

    // 弥散光球动画
    const lightX1 = 80 + Math.sin(frame * 0.008) * 8;
    const lightY1 = 25 + Math.cos(frame * 0.006) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "40px",
            }}
        >
            {/* 弥散光背景 */}
            <div style={{
                position: "absolute",
                left: `${lightX1}%`, top: `${lightY1}%`,
                width: 450, height: 450, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(240,136,62,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* 左侧：步骤列表 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* 标题 */}
                <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                    <h2 style={{
                        fontSize: "52px", fontWeight: 900, margin: 0,
                        background: THEME.titleGradient,
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text", letterSpacing: "-0.04em",
                    }}>
                        三步启动龙虾 🦞
                    </h2>
                    <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: "8px 0 0 0" }}>
                        安装完成后，按顺序执行这三条命令
                    </p>
                </div>

                {/* 步骤卡片 */}
                {LAUNCH_STEPS.map((step, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 20 - i * 18), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
                    const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    return (
                        <div key={i} style={{ opacity: cardOpacity, transform: `translateY(${cardY}px)` }}>
                            <div style={{
                                background: THEME.cardBg, borderRadius: "16px",
                                padding: "20px 24px",
                                border: `1px solid ${step.color}30`,
                                backdropFilter: "blur(16px)",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                    <span style={{ fontSize: "28px" }}>{step.icon}</span>
                                    <span style={{ fontSize: "24px", color: step.color, fontWeight: "bold" }}>
                                        第{i + 1}步：{step.title}
                                    </span>
                                </div>
                                <div style={{
                                    background: "rgba(0,0,0,0.4)", borderRadius: "8px",
                                    padding: "10px 16px", marginBottom: "8px",
                                    border: `1px solid ${step.color}${Math.floor(cmdHighlight * 50).toString(16)}`,
                                }}>
                                    <code style={{
                                        fontSize: "20px", color: step.color,
                                        fontFamily: "monospace",
                                    }}>
                                        {step.cmd}
                                    </code>
                                </div>
                                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                                    {step.desc}
                                </p>
                            </div>

                            {/* 流动箭头 */}
                            {i < LAUNCH_STEPS.length - 1 && (
                                <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
                                    <svg width="40" height="24" viewBox="0 0 40 24">
                                        <line x1="20" y1="0" x2="20" y2="16" stroke="#8b949e" strokeWidth="2" />
                                        <polygon points="14,12 20,24 26,12" fill="#8b949e" />
                                        {/* 流动点 */}
                                        <circle
                                            cx="20"
                                            cy={interpolate(arrowProgress, [0, 100], [0, 24])}
                                            r="3"
                                            fill={step.color}
                                            opacity="0.8"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 右侧：Dashboard 截图 */}
            <div style={{
                width: "480px", flexShrink: 0,
                opacity: imgOpacity,
                transform: `scale(${imgScale})`,
                display: "flex", flexDirection: "column", gap: "12px",
            }}>
                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0, textAlign: "center" }}>
                    🖥️ Web 管理界面
                </p>
                <div style={{
                    background: THEME.cardBg, borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px", flex: 1,
                    display: "flex", alignItems: "center",
                }}>
                    <Img
                        src={staticFile("OpenClawInstallVideo/dashboard_interface.png")}
                        style={{ width: "100%", objectFit: "contain", borderRadius: "8px" }}
                    />
                </div>
                <div style={{
                    background: "rgba(63,185,80,0.1)", borderRadius: "10px",
                    padding: "12px 16px", border: "1px solid rgba(63,185,80,0.3)",
                    textAlign: "center",
                }}>
                    <p style={{ fontSize: "18px", color: "#3fb950", margin: 0, fontWeight: "bold" }}>
                        ✅ 看到这个界面，说明安装成功！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
