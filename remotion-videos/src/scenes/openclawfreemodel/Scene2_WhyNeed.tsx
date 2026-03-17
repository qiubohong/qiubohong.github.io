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
    const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    const card1Spring = spring({ frame: Math.max(0, frame - 30), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const card1Opacity = interpolate(card1Spring, [0, 1], [0, 1]);

    const card2Spring = spring({ frame: Math.max(0, frame - 60), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const card2Opacity = interpolate(card2Spring, [0, 1], [0, 1]);

    const equationSpring = spring({ frame: Math.max(0, frame - 90), fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const equationY = interpolate(equationSpring, [0, 1], [40, 0]);
    const equationOpacity = interpolate(equationSpring, [0, 1], [0, 1]);

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
                padding: "50px 70px",
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
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "64px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    为什么龙虾需要大模型？
                </h2>
            </div>

            {/* 两张卡片并排 */}
            <div style={{ display: "flex", gap: "40px", flex: 1, alignItems: "stretch" }}>
                {/* 手脚卡片 */}
                <div style={{
                    flex: 1,
                    opacity: card1Opacity,
                    background: "rgba(240,136,62,0.08)",
                    borderRadius: "24px",
                    padding: "40px 32px",
                    border: "1px solid rgba(240,136,62,0.3)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                }}>
                    <div style={{ fontSize: "90px" }}>🦞</div>
                    <p style={{
                        fontSize: "48px", fontWeight: 900, color: THEME.accent,
                        margin: 0, textAlign: "center",
                    }}>勤快的手脚</p>
                    <div style={{
                        background: "rgba(240,136,62,0.1)",
                        borderRadius: "16px",
                        padding: "24px 28px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}>
                        <p style={{ fontSize: "30px", color: THEME.textPrimary, margin: 0, textAlign: "center", lineHeight: 1.6 }}>
                            接收指令<br />调用工具<br />执行任务
                        </p>
                    </div>
                </div>

                {/* 大脑卡片 */}
                <div style={{
                    flex: 1,
                    opacity: card2Opacity,
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "24px",
                    padding: "40px 32px",
                    border: "1px solid rgba(88,166,255,0.3)",
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                }}>
                    <div style={{ fontSize: "90px" }}>🧠</div>
                    <p style={{
                        fontSize: "48px", fontWeight: 900, color: "#58a6ff",
                        margin: 0, textAlign: "center",
                    }}>借来的大脑</p>
                    <div style={{
                        background: "rgba(88,166,255,0.1)",
                        borderRadius: "16px",
                        padding: "24px 28px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}>
                        <p style={{ fontSize: "30px", color: THEME.textPrimary, margin: 0, textAlign: "center", lineHeight: 1.6 }}>
                            理解你的话<br />制定计划<br />决定下一步
                        </p>
                    </div>
                </div>
            </div>

            {/* 公式卡片 */}
            <div style={{
                opacity: equationOpacity,
                transform: `translateY(${equationY}px)`,
                background: THEME.cardBg,
                borderRadius: "18px",
                padding: "28px 40px",
                border: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
                marginTop: "30px",
            }}>
                <p style={{
                    fontSize: "36px", color: THEME.textPrimary,
                    margin: 0, textAlign: "center", fontFamily: "monospace",
                }}>
                    <span style={{ color: THEME.accent }}>龙虾</span> =
                    <span style={{ color: THEME.accent }}> 勤快的手脚</span> +
                    <span style={{ color: "#58a6ff" }}> 借来的大脑</span>
                </p>
                <p style={{
                    fontSize: "24px", color: THEME.textSecondary,
                    margin: "10px 0 0 0", textAlign: "center",
                }}>
                    ⚠️ 没有大脑，龙虾就是一个空壳，什么都做不了
                </p>
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
