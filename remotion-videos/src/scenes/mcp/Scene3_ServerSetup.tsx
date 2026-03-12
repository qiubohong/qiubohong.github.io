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

const CODE = `from fastmcp import FastMCP

mcp = FastMCP("My MCP Server")

@mcp.tool
def greet(name: str) -> str:
    return f"Hello, {name}!"

if __name__ == "__main__":
    mcp.run(transport="http", port=8000)`;

export const MCP_Scene3_ServerSetup: React.FC = () => {
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

    const codeOpacity = interpolate(frame, [30, 65], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const codeSlide = interpolate(frame, [30, 65], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const steps = [
        { icon: "1️⃣", text: "导入 FastMCP，创建服务器实例", delay: 70 },
        { icon: "2️⃣", text: "用 @mcp.tool 装饰器定义工具函数", delay: 90 },
        { icon: "3️⃣", text: "调用 mcp.run 启动 HTTP 服务", delay: 110 },
    ];

    const taglineOpacity = interpolate(frame, [130, 160], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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
                    搭建 MCP 服务器
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    使用 Python FastMCP 库，几行代码即可创建 MCP 服务器
                </p>
            </div>

            {/* 代码块 */}
            <div style={{
                opacity: codeOpacity,
                transform: `translateY(${codeSlide}px)`,
                flexShrink: 0,
            }}>
                <div style={{
                    background: "#161b22",
                    borderRadius: "12px",
                    border: "1px solid rgba(88,166,255,0.2)",
                    overflow: "hidden",
                }}>
                    {/* 代码标题栏 */}
                    <div style={{
                        background: "rgba(255,255,255,0.05)",
                        padding: "10px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                        <span style={{ marginLeft: 8, color: THEME.textSecondary, fontSize: 20 }}>server.py</span>
                    </div>
                    <pre style={{
                        margin: 0,
                        padding: "20px 24px",
                        fontSize: "22px",
                        lineHeight: 1.7,
                        color: THEME.textPrimary,
                        fontFamily: '"Fira Code", "Courier New", monospace',
                        whiteSpace: "pre-wrap",
                    }}>
                        {CODE.split("\n").map((line, i) => {
                            let color = THEME.textPrimary;
                            if (line.startsWith("from") || line.startsWith("import")) color = "#79c0ff";
                            else if (line.startsWith("@")) color = "#d2a8ff";
                            else if (line.startsWith("def") || line.includes("def ")) color = "#7ee787";
                            else if (line.includes("return")) color = "#ff7b72";
                            else if (line.startsWith("if") || line.includes("__main__")) color = "#ff7b72";
                            else if (line.includes("mcp.run")) color = THEME.accent;
                            return (
                                <span key={i} style={{ display: "block", color }}>
                                    {line || " "}
                                </span>
                            );
                        })}
                    </pre>
                </div>
            </div>

            {/* 步骤说明 */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minHeight: 0,
            }}>
                {steps.map((step, i) => {
                    const stepOpacity = interpolate(frame, [step.delay, step.delay + 25], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const stepSlide = interpolate(frame, [step.delay, step.delay + 25], [20, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    return (
                        <div key={i} style={{
                            opacity: stepOpacity,
                            transform: `translateY(${stepSlide}px)`,
                            background: THEME.cardBg,
                            borderRadius: "10px",
                            padding: "12px 20px",
                            border: "1px solid rgba(63,185,80,0.2)",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            flex: 1,
                        }}>
                            <span style={{ fontSize: "28px" }}>{step.icon}</span>
                            <span style={{ fontSize: "24px", color: THEME.textPrimary }}>{step.text}</span>
                        </div>
                    );
                })}
            </div>

            {/* 底部标语 */}
            <div style={{ textAlign: "center", opacity: taglineOpacity, flexShrink: 0 }}>
                <span style={{ fontSize: "24px", color: "#3fb950" }}>
                    ✅ 就这么简单！一个完整的 MCP 服务器搭建完成
                </span>
            </div>
        </AbsoluteFill>
    );
};
