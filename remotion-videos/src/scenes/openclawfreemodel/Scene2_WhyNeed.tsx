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
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const OpenClawFreeModel_Scene2_WhyNeed: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    const imgSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const imgScale = interpolate(imgSpring, [0, 1], [0.9, 1]);
    const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.007) * 8;
    const lightY = 50 + Math.cos(frame * 0.009) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "40px 60px",
                boxSizing: "border-box",
                gap: "20px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute", left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(100px)", transform: "translate(-50%, -50%)", pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, flexShrink: 0, textAlign: "center" }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    为什么龙虾需要大模型？
                </h2>
                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                    OpenClaw框架的核心架构解析
                </p>
            </div>

            {/* 核心概念图 */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: imgOpacity,
                transform: `scale(${imgScale})`,
            }}>
                <Img
                    src={staticFile("OpenClawFreeModelVideo/why_need_model.png")}
                    style={{
                        maxWidth: "90%",
                        maxHeight: "75%",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};

// 场景 2.5：大模型注册流程图
export const OpenClawFreeModel_Scene2_5_RegistrationFlow: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    const imgSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const imgScale = interpolate(imgSpring, [0, 1], [0.9, 1]);
    const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.007) * 8;
    const lightY = 50 + Math.cos(frame * 0.009) * 6;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "40px 60px",
                boxSizing: "border-box",
                gap: "20px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute", left: `${lightX}%`, top: `${lightY}%`,
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)",
                filter: "blur(100px)", transform: "translate(-50%, -50%)", pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, flexShrink: 0, textAlign: "center" }}>
                <h2 style={{
                    fontSize: "48px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    大模型注册和配置流程
                </h2>
                <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: 0 }}>
                    从用户注册到任务完成的完整流程
                </p>
            </div>

            {/* 流程图 */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: imgOpacity,
                transform: `scale(${imgScale})`,
            }}>
                <Img
                    src={staticFile("OpenClawFreeModelVideo/registration_flow.png")}
                    style={{
                        maxWidth: "90%",
                        maxHeight: "80%",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
