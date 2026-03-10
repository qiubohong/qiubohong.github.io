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
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

export const MCP_Scene2_Architecture: React.FC = () => {
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

    const imgOpacity = interpolate(frame, [20, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const imgSlide = interpolate(frame, [20, 60], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const components = [
        { icon: "🖥️", name: "MCP Host", desc: "用户交互的 AI 应用（Cursor、Claude Desktop）", color: "#58a6ff", delay: 60 },
        { icon: "🔄", name: "MCP Client", desc: "协议翻译官，与 Server 一对一连接", color: "#3fb950", delay: 80 },
        { icon: "⚙️", name: "MCP Server", desc: "提供 Tool / Resource / Prompt 三大能力", color: "#f0883e", delay: 100 },
        { icon: "📡", name: "MCP Protocol", desc: "基于 JSON-RPC 2.0，支持 Stdio 和 HTTP", color: "#ffd200", delay: 120 },
    ];

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
                background: "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
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
                    核心架构
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    MCP 遵循经典的客户端-服务器架构，四大核心组件协同工作
                </p>
            </div>

            {/* 架构图 */}
            <div style={{
                opacity: imgOpacity,
                transform: `translateY(${imgSlide}px)`,
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
            }}>
                <Img
                    src={staticFile("MCPVideo/scene2-image.png")}
                    style={{
                        width: "90%",
                        maxHeight: "320px",
                        objectFit: "contain",
                        borderRadius: "12px",
                        border: "1px solid rgba(88,166,255,0.15)",
                    }}
                />
            </div>

            {/* 四大组件列表 */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minHeight: 0,
            }}>
                {components.map((comp, i) => {
                    const compOpacity = interpolate(frame, [comp.delay, comp.delay + 25], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const compSlide = interpolate(frame, [comp.delay, comp.delay + 25], [20, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    return (
                        <div key={i} style={{
                            opacity: compOpacity,
                            transform: `translateY(${compSlide}px)`,
                            background: THEME.cardBg,
                            borderRadius: "12px",
                            padding: "12px 20px",
                            border: `1px solid ${comp.color}30`,
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flex: 1,
                        }}>
                            <span style={{ fontSize: "32px", flexShrink: 0 }}>{comp.icon}</span>
                            <div>
                                <span style={{ fontSize: "24px", fontWeight: "bold", color: comp.color }}>{comp.name}</span>
                                <span style={{ fontSize: "22px", color: THEME.textPrimary, marginLeft: "12px" }}>{comp.desc}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
