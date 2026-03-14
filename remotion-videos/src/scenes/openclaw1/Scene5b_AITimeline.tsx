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

const eras = [
    { icon: "🤖", color: "#8b949e", year: "2022 前", label: "工具 AI", desc: "只能回答问题" },
    { icon: "💬", color: "#58a6ff", year: "2022-2023", label: "对话 AI", desc: "ChatGPT 时代" },
    { icon: "🦾", color: "#f0883e", year: "2024", label: "助手 AI", desc: "帮你写代码写文章" },
    { icon: "🦞", color: "#3fb950", year: "2025 →", label: "智能体 AI", desc: "OpenClaw 真正干活" },
];

export const OpenClaw1_Scene5b_AITimeline: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps, config: { stiffness: 100, damping: 20, mass: 1.2 } });
    const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 图片从下方升起
    const imgSpring = spring({ frame: Math.max(0, frame - 20), fps, config: { stiffness: 80, damping: 18, mass: 1.2 } });
    const imgY = interpolate(imgSpring, [0, 1], [60, 0]);
    const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

    // 弥散光
    const lightX = 50 + Math.sin(frame * 0.006) * 8;
    const lightY = 60 + Math.cos(frame * 0.008) * 6;

    // 高亮最后一个 era（OpenClaw）
    const highlightPulse = 0.6 + Math.sin(frame * 0.1) * 0.4;

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
                width: 700, height: 700, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(63,185,80,0.1) 0%, transparent 70%)",
                filter: "blur(120px)",
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
                    📅 AI 发展史：我们在哪个时代？
                </h2>
                <p style={{ fontSize: "24px", color: THEME.textSecondary, margin: 0 }}>
                    OpenClaw 代表的是 AI 进化的最新阶段——<span style={{ color: "#3fb950", fontWeight: "bold" }}>智能体时代</span>
                </p>
            </div>

            {/* AI 发展史时间线大图 */}
            <div style={{
                opacity: imgOpacity,
                transform: `translateY(${imgY}px)`,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}>
                {/* 时代标签行 - 时间轴样式，移到图片前面 */}
                <div style={{ display: "flex", alignItems: "center", gap: "0px", flexShrink: 0 }}>
                    {eras.map((e, i) => {
                        const tagSpring = spring({
                            frame: Math.max(0, frame - 30 - i * 10),
                            fps,
                            config: { stiffness: 100, damping: 20, mass: 1.2 },
                        });
                        const tagY = interpolate(tagSpring, [0, 1], [30, 0]);
                        const tagOpacity = interpolate(tagSpring, [0, 1], [0, 1]);
                        const isLast = i === eras.length - 1;
                        return (
                            <React.Fragment key={i}>
                                <div style={{
                                    flex: 1,
                                    opacity: tagOpacity,
                                    transform: `translateY(${tagY}px)`,
                                    background: isLast ? `rgba(63,185,80,${highlightPulse * 0.15})` : `${e.color}10`,
                                    borderRadius: "16px",
                                    padding: "18px 12px",
                                    border: isLast ? `2px solid rgba(63,185,80,${highlightPulse * 0.7})` : `1px solid ${e.color}35`,
                                    backdropFilter: "blur(16px)",
                                    textAlign: "center",
                                    boxShadow: isLast ? `0 0 24px rgba(63,185,80,${highlightPulse * 0.35})` : "none",
                                }}>
                                    <p style={{ fontSize: "20px", color: e.color, margin: "0 0 4px 0", fontWeight: "bold" }}>{e.year}</p>
                                    <p style={{ fontSize: "26px", color: THEME.textPrimary, margin: "0 0 4px 0", fontWeight: 900 }}>{e.label}</p>
                                    <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0 }}>{e.desc}</p>
                                </div>
                                {/* 时间轴箭头（最后一个不加） */}
                                {!isLast && (
                                    <div style={{
                                        flexShrink: 0,
                                        width: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        opacity: tagOpacity,
                                    }}>
                                        <svg width="36" height="20" viewBox="0 0 36 20">
                                            <line x1="0" y1="10" x2="28" y2="10" stroke="#8b949e" strokeWidth="2" />
                                            <polygon points="28,4 36,10 28,16" fill="#8b949e" />
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* 图片展示区域 */}
                <div style={{
                    background: "rgba(88,166,255,0.06)",
                    borderRadius: "24px",
                    padding: "20px 28px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 0,
                }}>
                    <Img
                        src={staticFile("OpenClaw1Video/ai_timeline.png")}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "16px",
                            display: "block",
                            objectFit: "contain",
                        }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};
