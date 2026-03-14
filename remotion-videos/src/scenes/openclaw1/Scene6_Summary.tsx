import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
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

const summaryPoints = [
    { icon: "🦞", color: "#58a6ff", title: "OpenClaw 是什么", desc: "运行在本地电脑上的 AI 智能体，通过 QQ/飞书等聊天工具操控，真正帮你「干活」" },
    { icon: "⚡", color: "#f0883e", title: "和普通 AI 的区别", desc: "普通 AI 是「顾问」，只给建议；OpenClaw 是「员工」，给建议还动手执行" },
    { icon: "🧩", color: "#3fb950", title: "四个组成部分", desc: "消息入口（沟通渠道）\n 大脑（AI 模型）\n 技能（功能插件）\n 记忆（越用越懂你）" },
];

export const OpenClaw1_Scene6_Summary: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 脉冲效果
    const pulse = 1 + Math.sin(frame * 0.08) * 0.02;
    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.12) * 0.3;

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.007) * 8;
    const lightY = 50 + Math.cos(frame * 0.009) * 6;

    // 互动问题出现时机
    const questionOpacity = interpolate(frame, [140, 170], [0, 1], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
    const questionY = interpolate(frame, [140, 170], [30, 0], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });

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
                    认识龙虾，记住三件事
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                    下一篇：免费白嫖大模型 API，10 分钟搞定！
                </p>
            </div>

            {/* 三要点 - 水平布局 */}
            <div style={{ display: "flex", flexDirection: "row", gap: "24px", flex: 1, alignItems: "stretch" }}>
                {summaryPoints.map((p, i) => {
                    const cardSpring = spring({
                        frame: Math.max(0, frame - 40 - i * 25),
                        fps,
                        config: { stiffness: 90, damping: 20, mass: 1.2, overshootClamping: false },
                    });
                    const cardY = interpolate(cardSpring, [0, 1], [60, 0]);
                    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
                    const floatY = Math.sin(frame * 0.05 + i * 1.2) * 5;

                    return (
                        <div key={i} style={{
                            flex: 1,
                            opacity: cardOpacity,
                            transform: `translateY(${cardY}px)`,
                            background: THEME.cardBg,
                            borderRadius: "24px",
                            padding: "36px 28px",
                            border: `1px solid ${p.color}30`,
                            backdropFilter: "blur(16px)",
                            boxShadow: `0 4px 32px ${p.color}10`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0px",
                        }}>
                            {/* 序号 + 图标 + 标题 放在一起 */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "24px",
                                flexShrink: 0,
                            }}>
                                {/* 序号 */}
                                <div style={{
                                    width: "64px", height: "64px", borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${p.color}30, ${p.color}15)`,
                                    border: `2px solid ${p.color}60`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "48px", fontWeight: 900, color: p.color,
                                    boxShadow: `0 0 20px ${p.color}30`,
                                }}>{i + 1}</div>
                                {/* 图标 */}
                                <div style={{
                                    fontSize: "64px",
                                    transform: `translateY(${floatY}px) scale(${pulse})`,
                                    lineHeight: 1,
                                }}>{p.icon}</div>
                                {/* 标题 */}
                                <p style={{
                                    fontSize: "48px",
                                    fontWeight: 900,
                                    color: p.color,
                                    margin: 0,
                                    lineHeight: 1.2,
                                    textAlign: "center",
                                    letterSpacing: "-0.02em",
                                }}>{p.title}</p>
                            </div>

                            {/* 分割线 */}
                            <div style={{
                                width: "80%",
                                height: "2px",
                                background: `linear-gradient(90deg, transparent, ${p.color}60, transparent)`,
                                marginBottom: "24px",
                                flexShrink: 0,
                            }} />

                            {/* 内容区域 - 居中填满 */}
                            <div style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `${p.color}08`,
                                borderRadius: "16px",
                                padding: "24px 20px",
                                border: `1px solid ${p.color}20`,
                                width: "100%",
                                boxSizing: "border-box",
                            }}>
                                <textarea style={{
                                    fontSize: "28px",
                                    color: THEME.textPrimary,
                                    height: "100%",
                                    background: "transparent",
                                    border: "none",
                                    resize: "none",
                                    margin: 0,
                                    lineHeight: 1.7,
                                    textAlign: "center",
                                    fontWeight: 500,
                                }}>{p.desc}</textarea>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 互动问题 */}
            <div style={{
                opacity: questionOpacity,
                transform: `translateY(${questionY}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: "linear-gradient(135deg, rgba(240,136,62,0.15) 0%, rgba(255,210,0,0.1) 100%)",
                    borderRadius: "20px", padding: "20px 32px",
                    border: "1px solid rgba(240,136,62,0.3)",
                    textAlign: "center",
                }}>
                    <p style={{
                        fontSize: "26px", color: THEME.accent, fontWeight: "bold", margin: "0 0 8px 0",
                        transform: `scale(${pulse})`,
                    }}>
                        💬 你觉得 OpenClaw 最适合帮你做哪件事？
                    </p>
                    <p style={{ fontSize: "20px", color: THEME.textPrimary, margin: 0 }}>
                        欢迎在评论区分享你的想法！点赞收藏，下期教你免费白嫖大模型 API ～
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
