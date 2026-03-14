import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
    spring,
    useVideoConfig,
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

const cases = [
    {
        icon: "☀️",
        color: "#ffd200",
        title: "早上不用刷手机了",
        pain: "每天早上刷好几个 App，花掉 20 分钟",
        solution: "设置一次，每天 8 点自动发早报",
        saving: "节省 15-20 分钟/天",
        savingNum: 20,
    },
    {
        icon: "📁",
        color: "#58a6ff",
        title: "出门在外也能处理文件",
        pain: "在外面突然需要处理电脑上的文件",
        solution: "发消息让龙虾把文件发到邮箱",
        saving: "随时远程操控电脑",
        savingNum: 100,
    },
    {
        icon: "📝",
        color: "#3fb950",
        title: "会议结束后自动出纪要",
        pain: "每次开完会都要花时间整理纪要",
        solution: "发录音给龙虾，自动生成纪要写入飞书",
        saving: "节省 30-60 分钟/次",
        savingNum: 60,
    },
];

export const OpenClaw1_Scene5_Cases: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightY = 40 + Math.sin(frame * 0.007) * 8;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "55px 80px",
                boxSizing: "border-box",
                gap: "24px",
            }}
        >
            {/* 弥散光 */}
            <div style={{
                position: "absolute", left: "50%", top: `${lightY}%`,
                width: 700, height: 700, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(63,185,80,0.08) 0%, transparent 70%)",
                filter: "blur(100px)", transform: "translate(-50%, -50%)", pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, flexShrink: 0 }}>
                <h2 style={{
                    fontSize: "60px", fontWeight: 900, margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", letterSpacing: "-0.05em",
                }}>
                    三个让普通人秒懂的场景
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                    这些事，龙虾真的能帮你做到
                </p>
            </div>

            {/* 三个案例卡片 */}
            <div style={{ display: "flex", gap: "24px", flex: 1, alignItems: "stretch" }}>
                {cases.map((c, i) => {
                    // 总帧数889 / 3 ≈ 296，从第30帧开始，每隔296帧出现一个
                    const cardDelay = 30 + i * 296;
                    const cardSpring = spring({
                        frame: Math.max(0, frame - cardDelay),
                        fps,
                        config: { stiffness: 90, damping: 20, mass: 1.2, overshootClamping: false },
                    });
                    const cardY = interpolate(cardSpring, [0, 1], [80, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

                    // 进度条动画（卡片出现后60帧内完成）
                    const progressStart = cardDelay + 30;
                    const progress = interpolate(frame, [progressStart, progressStart + 80], [0, 100], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp", extrapolateRight: "clamp",
                    });

                    // 图标浮动
                    const floatY = Math.sin(frame * 0.05 + i * 1.5) * 6;

                    return (
                        <div key={i} style={{
                            flex: 1,
                            opacity: cardOpacity,
                            transform: `translateY(${cardY}px)`,
                            background: THEME.cardBg,
                            borderRadius: "24px",
                            padding: "36px 32px",
                            border: `1px solid ${c.color}30`,
                            backdropFilter: "blur(16px)",
                            boxShadow: `0 4px 32px ${c.color}10`,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0px",
                        }}>
                            {/* 图标 + 标题 */}
                            <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "20px", flexShrink: 0 }}>
                                <div style={{
                                    fontSize: "56px",
                                    transform: `translateY(${floatY}px)`,
                                    lineHeight: 1,
                                    flexShrink: 0,
                                }}>{c.icon}</div>
                                <p style={{ fontSize: "36px", fontWeight: 900, color: c.color, margin: 0, lineHeight: 1.3 }}>{c.title}</p>
                            </div>

                            {/* 分割线 */}
                            <div style={{
                                height: "1px",
                                background: `linear-gradient(90deg, ${c.color}60, transparent)`,
                                marginBottom: "20px",
                                flexShrink: 0,
                            }} />

                            {/* 痛点 */}
                            <div style={{
                                background: "rgba(255,80,80,0.07)",
                                borderRadius: "14px", padding: "20px 22px",
                                border: "1px solid rgba(255,80,80,0.18)",
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                marginBottom: "16px",
                            }}>
                                <p style={{ fontSize: "22px", color: "#ff6b6b", margin: "0 0 10px 0", fontWeight: 700 }}>😩 痛点</p>
                                <p style={{ fontSize: "26px", color: THEME.textPrimary, margin: 0, lineHeight: 1.6 }}>{c.pain}</p>
                            </div>

                            {/* 解决方案 */}
                            <div style={{
                                background: `${c.color}12`,
                                borderRadius: "14px", padding: "20px 22px",
                                border: `1px solid ${c.color}30`,
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                marginBottom: "16px",
                            }}>
                                <p style={{ fontSize: "22px", color: c.color, margin: "0 0 10px 0", fontWeight: 700 }}>🦞 龙虾怎么做</p>
                                <p style={{ fontSize: "26px", color: THEME.textPrimary, margin: 0, lineHeight: 1.6 }}>{c.solution}</p>
                            </div>

                            {/* 进度条 + 效率提升 */}
                            <div style={{ flexShrink: 0 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <span style={{ fontSize: "22px", color: THEME.textSecondary, fontWeight: 600 }}>效率提升</span>
                                    <span style={{ fontSize: "26px", fontWeight: 900, color: c.color }}>{c.saving}</span>
                                </div>
                                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "6px", height: "10px", overflow: "hidden" }}>
                                    <div style={{
                                        width: `${progress}%`, height: "100%",
                                        background: `linear-gradient(90deg, ${c.color}70, ${c.color})`,
                                        borderRadius: "6px",
                                        boxShadow: `0 0 12px ${c.color}60`,
                                    }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
