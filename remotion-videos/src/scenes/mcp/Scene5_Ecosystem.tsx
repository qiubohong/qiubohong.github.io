import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const HOSTS = [
    { icon: "⌨️", name: "Cursor IDE", desc: "代码编辑器，AI 编程助手", color: "#58a6ff" },
    { icon: "🤖", name: "Claude Desktop", desc: "Anthropic 官方桌面应用", color: "#3fb950" },
    { icon: "🌐", name: "OpenWebUI", desc: "开源 AI 对话界面", color: "#f0883e" },
];

const RESOURCES = [
    { icon: "📦", name: "官方示例库", url: "github.com/modelcontextprotocol/servers", color: "#58a6ff" },
    { icon: "🗂️", name: "社区目录", url: "cursor.directory", color: "#ffd200" },
    { icon: "🛠️", name: "官方 SDK", url: "Python & TypeScript SDK", color: "#3fb950" },
];

export const MCP_Scene5_Ecosystem: React.FC = () => {
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

    const floatY = Math.sin(frame * 0.05) * 4;

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
                gap: "18px",
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
                    MCP 生态
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    快速发展的 MCP 应用生态，即插即用扩展 AI 能力
                </p>
            </div>

            {/* 主流 Host 应用 */}
            <div style={{ flexShrink: 0 }}>
                <div style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: THEME.accentAlt,
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}>
                    <span style={{ transform: `translateY(${floatY}px)` }}>🖥️</span>
                    主流 MCP Host 应用
                </div>
                <div style={{ display: "flex", gap: "14px" }}>
                    {HOSTS.map((host, i) => {
                        const hostOpacity = interpolate(frame, [25 + i * 15, 50 + i * 15], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const hostSlide = interpolate(frame, [25 + i * 15, 50 + i * 15], [20, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                flex: 1,
                                opacity: hostOpacity,
                                transform: `translateY(${hostSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "12px",
                                padding: "16px 20px",
                                border: `1px solid ${host.color}30`,
                                textAlign: "center",
                            }}>
                                <div style={{ fontSize: "40px", marginBottom: "8px" }}>{host.icon}</div>
                                <div style={{ fontSize: "24px", fontWeight: "bold", color: host.color, marginBottom: "4px" }}>{host.name}</div>
                                <div style={{ fontSize: "20px", color: THEME.textSecondary }}>{host.desc}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 资源库 */}
            <div style={{ flex: 1, minHeight: 0 }}>
                <div style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: THEME.accentAlt,
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}>
                    <span>🔍</span>
                    MCP Server 资源库 & 开发工具
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {RESOURCES.map((res, i) => {
                        const resOpacity = interpolate(frame, [70 + i * 15, 95 + i * 15], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const resSlide = interpolate(frame, [70 + i * 15, 95 + i * 15], [20, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                opacity: resOpacity,
                                transform: `translateY(${resSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "10px",
                                padding: "14px 20px",
                                border: `1px solid ${res.color}30`,
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                flex: 1,
                            }}>
                                <span style={{ fontSize: "32px" }}>{res.icon}</span>
                                <div>
                                    <span style={{ fontSize: "24px", fontWeight: "bold", color: res.color }}>{res.name}</span>
                                    <span style={{ fontSize: "22px", color: THEME.textSecondary, marginLeft: "12px" }}>{res.url}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 底部提示 */}
            <div style={{
                flexShrink: 0,
                textAlign: "center",
                opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
                <span style={{ fontSize: "24px", color: "#3fb950" }}>
                    ✅ 在设置中添加 MCP Server，即可即插即用扩展 AI 能力！
                </span>
            </div>
        </AbsoluteFill>
    );
};
