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

// 对话内容
const CONVERSATIONS = [
    {
        type: "user",
        content: "请写一段Python代码：一个计算平方的函数",
        color: THEME.accent,
    },
    {
        type: "ai",
        content: [
            "# 生成",
            "def square(n):",
            "    return n ** 2",
            "",
            "# 反思",
            "检查：缺少文档字符串、类型注解",
            "",
            "# 优化",
            "def square(n: int) -> int:\n    \"\"\"计算数字的平方.\"\"\"\n    return n ** 2",
        ],        color: "#58a6ff",
    },
];

// 左侧步骤说明
const STEPS = [
    { step: 1, title: "生成", desc: "AI 生成初始答案", color: "#3fb950" },
    { step: 2, title: "反思", desc: "自我审查找出问题", color: "#f0883e" },
    { step: 3, title: "优化", desc: "根据反馈改进输出", color: "#58a6ff" },
];

export const Scene3_Implementation: React.FC = () => {
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

    // 左侧步骤动画
    const stepAnimations = STEPS.map((_, i) => {
        const stepSpring = spring({
            frame: Math.max(0, frame - 20 - i * 12),
            fps,
            config: { stiffness: 100, damping: 18, mass: 1 },
        });
        return {
            x: interpolate(stepSpring, [0, 1], [-40, 0]),
            opacity: interpolate(stepSpring, [0, 1], [0, 1]),
        };
    });

    // 对话框宽度展开动画
    const dialogSpring = spring({
        frame: Math.max(0, frame - 80),
        fps,
        config: { stiffness: 80, damping: 15, mass: 1 },
    });
    const dialogWidth = interpolate(dialogSpring, [0, 1], [0, 540]);

    // 对话内容动画
    const userBubbleSpring = spring({
        frame: Math.max(0, frame - 110),
        fps,
        config: { stiffness: 100, damping: 15, mass: 1 },
    });
    const userBubbleY = interpolate(userBubbleSpring, [0, 1], [20, 0]);
    const userBubbleOpacity = interpolate(userBubbleSpring, [0, 1], [0, 1]);

    // AI代码逐行显示
    const codeLines = CONVERSATIONS[1].content;
    const typewriterAnimations = codeLines.map((_, i) => {
        const delay = 130 + i * 8;
        return interpolate(frame, [delay, delay + 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
    });

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
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
                    src={staticFile("Reflection/backgrounds/scene3-bg.png")}
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
                    基础实现原理
                </div>
                <div style={{
                    fontSize: "24px",
                    color: THEME.textSecondary,
                    marginTop: "8px",
                }}>
                    两次调用模型：生成 + 反思 + 优化
                </div>
            </div>

            {/* 主内容区 */}
            <div style={{
                flex: 1,
                display: "flex",
                gap: "40px",
                zIndex: 10,
                minHeight: 0,
            }}>
                {/* 左侧步骤说明 */}
                <div style={{
                    flex: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifyContent: "center",
                }}>
                    {STEPS.map((step, i) => {
                        const anim = stepAnimations[i];
                        return (
                            <div key={step.step} style={{
                                transform: `translateX(${anim.x}px)`,
                                opacity: anim.opacity,
                                background: THEME.cardBg,
                                border: `2px solid ${step.color}30`,
                                borderRadius: "16px",
                                padding: "20px 24px",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "16px",
                            }}>
                                <div style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: `${step.color}20`,
                                    border: `2px solid ${step.color}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    <span style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: step.color,
                                    }}>
                                        {step.step}
                                    </span>
                                </div>
                                <div>
                                    <div style={{
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: step.color,
                                    }}>
                                        {step.title}
                                    </div>
                                    <div style={{
                                        fontSize: "18px",
                                        color: THEME.textSecondary,
                                        marginTop: "4px",
                                    }}>
                                        {step.desc}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 右侧AI对话区 */}
                <div style={{
                    flex: 4,
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}>
                    {/* 对话框标题栏 */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "20px",
                        paddingBottom: "16px",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}>
                        <div style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #f0883e, #ffd200)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                        }}>
                            🤖
                        </div>
                        <div>
                        <div style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: THEME.textPrimary,
                        }}>
                            AI Assistant
                        </div>
                        <div style={{
                            fontSize: "20px",
                            color: THEME.textSecondary,
                        }}>
                            Reflection Mode
                        </div>
                        </div>
                    </div>

                    {/* 对话内容区 */}
                    <div style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        overflow: "hidden",
                        justifyContent: "flex-start",
                        marginLeft: "auto",
                        width: `${dialogWidth}px`,
                    }}>
                        {/* 用户消息 */}
                        <div style={{
                            transform: `translateY(${userBubbleY}px)`,
                            opacity: userBubbleOpacity,
                            alignSelf: "flex-end",
                            background: `${CONVERSATIONS[0].color}20`,
                            border: `2px solid ${CONVERSATIONS[0].color}50`,
                            borderRadius: "16px 16px 4px 16px",
                            padding: "16px 20px",
                            maxWidth: "80%",
                        }}>
                            <div style={{
                                fontSize: "24px",
                                color: THEME.textPrimary,
                            }}>
                                {CONVERSATIONS[0].content}
                            </div>
                        </div>

                        {/* AI 代码回复 */}
                        <div style={{
                            background: THEME.cardBg,
                            border: "1px solid rgba(88,166,255,0.3)",
                            borderRadius: "16px 16px 16px 4px",
                            padding: "16px",
                            maxWidth: "95%",
                        }}>
                            <div style={{
                                fontSize: "20px",
                                color: THEME.textSecondary,
                                marginBottom: "8px",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                paddingBottom: "8px",
                            }}>
                                💻 Python
                            </div>
                            <pre style={{
                                margin: 0,
                                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                fontSize: "18px",
                                lineHeight: 1.6,
                                color: THEME.textPrimary,
                                overflow: "hidden",
                            }}>
                                {codeLines.map((line, i) => (
                                    <div key={i} style={{
                                        opacity: typewriterAnimations[i],
                                        color: line.startsWith("#") 
                                            ? "#8b949e" 
                                            : line.includes("def") 
                                                ? "#ff7b72" 
                                                : line.includes("return") 
                                                    ? "#79c0ff" 
                                                    : THEME.textPrimary,
                                    }}>
                                        {line || "\u00A0"}
                                    </div>
                                ))}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
