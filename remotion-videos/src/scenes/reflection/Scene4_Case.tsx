import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    spring,
    Img,
    staticFile,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

// 代码内容
const CODE_V1 = [
    "def fibonacci(n):",
    "    if n <= 1:",
    "        return n",
    "    a, b = 0, 1",
    "    for _ in range(2, n+1):",
    "        a, b = b, a+b",
    "    return b",
];

const CODE_V2 = [
    "def fibonacci(n: int) -> int:",
    "    \"\"\"计算第n个斐波那契数。\"\"\"",
    "    if not isinstance(n, int) or n < 0:",
    "        raise ValueError('n必须是正整数')",
    "    if n <= 1:",
    "        return n",
    "    a, b = 0, 1",
    "    for _ in range(2, n+1):",
    "        a, b = b, a+b",
    "    return b",
];

// 状态
const STATES = [
    { name: "生成中", color: "#3fb950", icon: "📝" },
    { name: "反思中", color: "#f0883e", icon: "🤔" },
    { name: "优化中", color: "#58a6ff", icon: "✨" },
    { name: "完成", color: "#3fb950", icon: "✓" },
];

export const Scene4_Case: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    // 背景淡入
    const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 标题动画
    const titleSpring = spring({
        frame,
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // 编辑器窗口动画
    const editorSpring = spring({
        frame: Math.max(0, frame - 30),
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const editorScale = interpolate(editorSpring, [0, 1], [0.95, 1]);
    const editorOpacity = interpolate(editorSpring, [0, 1], [0, 1]);

    // 状态切换
    const stateIndex = Math.min(
        3,
        Math.floor(Math.max(0, frame - 50) / 60)
    );
    const currentState = STATES[stateIndex];

    // 代码高亮扫描效果
    const scanY = interpolate(
        frame,
        [50, 150],
        [0, CODE_V1.length * 36],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // 反思阶段的问题标记
    const issueOpacity = stateIndex >= 1
        ? interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        : 0;

    // 优化后的代码显示
    const optimizedOpacity = stateIndex >= 2
        ? interpolate(frame, [170, 190], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        : 0;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "60px",
                boxSizing: "border-box",
            }}
        >
            {/* 背景图 */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: bgOpacity,
                zIndex: 0,
            }}>
                <Img
                    src={staticFile("Reflection/backgrounds/scene4-bg.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                {/* 半透明遮罩 */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(13,17,23,0.75)",
                }} />
            </div>

            {/* 标题 */}
            <div style={{
                flexShrink: 0,
                textAlign: "center",
                marginBottom: "32px",
                zIndex: 10,
                opacity: titleOpacity,
            }}>
                <div style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    实战：代码生成与优化
                </div>
                <div style={{
                    fontSize: "36x",
                    color: THEME.textSecondary,
                    marginTop: "8px",
                }}>
                    让 AI 给自己的代码做 Code Review
                </div>
            </div>

            {/* 状态指示器 */}
            <div style={{
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "24px",
                zIndex: 10,
            }}>
                {STATES.map((state, i) => (
                    <div key={state.name} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        borderRadius: "24px",
                        background: i === stateIndex 
                            ? `${state.color}20` 
                            : i < stateIndex 
                                ? `${state.color}10` 
                                : "rgba(255,255,255,0.05)",
                        border: `2px solid ${i === stateIndex ? state.color : "transparent"}`,
                        opacity: i <= stateIndex ? 1 : 0.5,
                    }}>
                        <span>{state.icon}</span>
                        <span style={{
                            fontSize: "36px",
                            fontWeight: i === stateIndex ? "bold" : "normal",
                            color: i === stateIndex ? state.color : THEME.textSecondary,
                        }}>
                            {state.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* 代码编辑器 */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                zIndex: 10,
                minHeight: 0,
            }}>
                <div style={{
                    transform: `scale(${editorScale})`,
                    opacity: editorOpacity,
                    width: "80%",
                    height: "100%",
                    maxHeight: "500px",
                    background: "#0d1117",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    {/* macOS风格标题栏 */}
                    <div style={{
                        height: "36px",
                        background: "#161b22",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                        gap: "8px",
                    }}>
                        <div style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "#ff5f56",
                        }} />
                        <div style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "#ffbd2e",
                        }} />
                        <div style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "#27c93f",
                        }} />
                        <span style={{
                            marginLeft: "auto",
                            fontSize: "36px",
                            color: THEME.textSecondary,
                            fontFamily: '"JetBrains Mono", monospace',
                        }}>
                            fibonacci.py
                        </span>
                    </div>

                    {/* 代码区域 */}
                    <div style={{
                        flex: 1,
                        padding: "20px 24px",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                        {/* 行号+代码 */}
                        <div style={{
                            position: "relative",
                        }}>
                            {/* V1 代码 */}
                            <div style={{
                                opacity: stateIndex < 2 ? 1 : 1 - optimizedOpacity,
                            }}>
                                {CODE_V1.map((line, i) => (
                                    <div key={i} style={{
                                        display: "flex",
                                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                        fontSize: "24px",
                                        lineHeight: "36px",
                                        position: "relative",
                                    }}>
                                        {/* 行号 */}
                                        <span style={{
                                            width: "32px",
                                            color: "#484f58",
                                            textAlign: "right",
                                            marginRight: "16px",
                                            flexShrink: 0,
                                        }}>
                                            {i + 1}
                                        </span>
                                        {/* 代码 */}
                                        <span style={{
                                            color: line.includes("def") 
                                                ? "#ff7b72"
                                                : line.includes("if")
                                                    ? "#ff7b72"
                                                    : line.includes("return")
                                                        ? "#79c0ff"
                                                        : line.includes("for")
                                                            ? "#ff7b72"
                                                            : line.includes("in")
                                                                ? "#ff7b72"
                                                                : THEME.textPrimary,
                                        }}>
                                            {line}
                                        </span>

                                        {/* 问题标记 */}
                                        {stateIndex === 1 && i === 0 && (
                                            <div style={{
                                                position: "absolute",
                                                right: "-100px",
                                                opacity: issueOpacity,
                                                background: "rgba(240,136,62,0.2)",
                                                border: "1px solid #f0883e",
                                                borderRadius: "4px",
                                                padding: "4px 8px",
                                                fontSize: "12px",
                                                color: "#f0883e",
                                            }}>
                                                ⚠️ 缺少类型注解
                                            </div>
                                        )}
                                        {stateIndex === 1 && i === 0 && (
                                            <div style={{
                                                position: "absolute",
                                                right: "-100px",
                                                top: "28px",
                                                opacity: issueOpacity,
                                                background: "rgba(240,136,62,0.2)",
                                                border: "1px solid #f0883e",
                                                borderRadius: "4px",
                                                padding: "4px 8px",
                                                fontSize: "12px",
                                                color: "#f0883e",
                                            }}>
                                                ⚠️ 缺少参数校验
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* V2 优化后代码（覆盖层） */}
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                opacity: optimizedOpacity,
                            }}>
                                {CODE_V2.map((line, i) => (
                                    <div key={i} style={{
                                        display: "flex",
                                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                        fontSize: "24px",
                                        lineHeight: "36px",
                                    }}>
                                        <span style={{
                                            width: "32px",
                                            color: "#484f58",
                                            textAlign: "right",
                                            marginRight: "16px",
                                            flexShrink: 0,
                                        }}>
                                            {i + 1}
                                        </span>
                                        <span style={{
                                            color: line.includes("def") 
                                                ? "#3fb950"
                                                : line.includes('"""')
                                                    ? "#8b949e"
                                                    : line.includes("raise")
                                                        ? "#ff7b72"
                                                        : THEME.textPrimary,
                                            background: line.includes("n: int") || line.includes("-> int")
                                                ? "rgba(59,185,80,0.15)"
                                                : line.includes("ValueError")
                                                    ? "rgba(59,185,80,0.15)"
                                                    : "transparent",
                                            padding: "0 4px",
                                            borderRadius: "2px",
                                        }}>
                                            {line}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* 扫描高亮效果 */}
                            {stateIndex === 0 && (
                                <div style={{
                                    position: "absolute",
                                    top: scanY,
                                    left: 0,
                                    right: 0,
                                    height: "36px",
                                    background: "linear-gradient(90deg, transparent, rgba(88,166,255,0.15), transparent)",
                                    pointerEvents: "none",
                                }} />
                            )}                        </div>
                    </div>

                    {/* 底部状态栏 */}
                    <div style={{
                        height: "28px",
                        background: "#161b22",
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: "12px",
                    }}>
                        <span style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: currentState.color,
                            marginRight: "8px",
                            animation: "pulse 1s infinite",
                        }} />
                        <span style={{ color: currentState.color }}>
                            {currentState.name}
                        </span>
                        <span style={{
                            marginLeft: "auto",
                            color: THEME.textSecondary,
                        }}>
                            Python
                        </span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
