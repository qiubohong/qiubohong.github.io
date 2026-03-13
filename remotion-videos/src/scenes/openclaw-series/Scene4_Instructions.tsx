import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// 主题常量定义
const THEME = {
    background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    primaryGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accentColor: "#f0883e",
    secondaryAccent: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBackground: "rgba(255,255,255,0.06)",
};

export const OpenClawSeries_Scene4_Instructions: React.FC = () => {
    const frame = useCurrentFrame();

    // 动画效果
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const instructionOpacity = interpolate(frame, [60, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const examplesOpacity = interpolate(frame, [120, 180], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const tipsOpacity = interpolate(frame, [180, 240], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ background: THEME.background, fontFamily: THEME.fontFamily }}>
            {/* 主标题 */}
            <div style={{
                position: "absolute",
                top: "8%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                opacity: titleOpacity,
                width: "90%"
            }}>
                <h1 style={{
                    background: THEME.primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "64px",
                    fontWeight: "bold",
                    margin: 0,
                    marginBottom: "10px"
                }}>
                    指令写不好，AI就听不懂！
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    教你正确的指令格式，让AI真正理解你
                </h2>
            </div>

            {/* 指令格式说明 */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                opacity: instructionOpacity
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "25px",
                    marginBottom: "30px"
                }}>
                    {/* 角色设定 */}
                    <div style={{
                        background: "rgba(88,166,255,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(88,166,255,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>🎭</span>
                        </div>
                        <h3 style={{
                            color: "#58a6ff",
                            fontSize: "28px",
                            margin: "0 0 15px 0",
                            fontWeight: "bold"
                        }}>
                            角色设定
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "22px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 明确AI角色<br />
                            ✅ 设定专业领域<br />
                            ✅ 提高理解准确度<br />
                            <span style={{ color: THEME.accentColor, fontWeight: "bold" }}>关键第一步</span>
                        </p>
                    </div>

                    {/* 背景补充 */}
                    <div style={{
                        background: "rgba(255,136,62,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,136,62,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #f0883e, #ffb347)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>📋</span>
                        </div>
                        <h3 style={{
                            color: "#f0883e",
                            fontSize: "28px",
                            margin: "0 0 15px 0",
                            fontWeight: "bold"
                        }}>
                            背景补充
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "22px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 提供足够上下文<br />
                            ✅ 说明使用场景<br />
                            ✅ 描述期望结果<br />
                            <span style={{ color: THEME.accentColor, fontWeight: "bold" }}>减少误解</span>
                        </p>
                    </div>

                    {/* 任务明确 */}
                    <div style={{
                        background: "rgba(255,215,0,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,215,0,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #ffd200, #ffed4e)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>🎯</span>
                        </div>
                        <h3 style={{
                            color: "#ffd200",
                            fontSize: "28px",
                            margin: "0 0 15px 0",
                            fontWeight: "bold"
                        }}>
                            任务明确
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "22px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 说清楚具体做什么<br />
                            ✅ 设定明确目标<br />
                            ✅ 避免模糊描述<br />
                            <span style={{ color: THEME.accentColor, fontWeight: "bold" }}>核心关键</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 指令模板示例 */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                opacity: examplesOpacity
            }}>
                <div style={{
                    background: "rgba(63,185,80,0.1)",
                    borderRadius: "15px",
                    padding: "30px",
                    border: "2px solid rgba(63,185,80,0.3)",
                    marginBottom: "20px"
                }}>
                    <h3 style={{
                        color: "#3fb950",
                        fontSize: "32px",
                        margin: "0 0 20px 0",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        ✅ 正确指令模板示例
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px"
                    }}>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "10px",
                            padding: "15px"
                        }}>
                            <h4 style={{
                                color: "#58a6ff",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                邮件处理模板：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "18px",
                                lineHeight: "1.4",
                                margin: 0,
                                fontFamily: "monospace"
                            }}>
                                角色：邮件助手<br />
                                任务：分类收件箱<br />
                                目标：按优先级排序
                            </p>
                        </div>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "10px",
                            padding: "15px"
                        }}>
                            <h4 style={{
                                color: "#f0883e",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                文档整理模板：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "18px",
                                lineHeight: "1.4",
                                margin: 0,
                                fontFamily: "monospace"
                            }}>
                                角色：文档专家<br />
                                任务：整理PDF<br />
                                目标：生成摘要
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: "rgba(255,80,80,0.1)",
                    borderRadius: "15px",
                    padding: "30px",
                    border: "2px solid rgba(255,80,80,0.3)"
                }}>
                    <h3 style={{
                        color: "#ff5050",
                        fontSize: "32px",
                        margin: "0 0 20px 0",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        ❌ 避免的错误指令
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px"
                    }}>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "10px",
                            padding: "15px"
                        }}>
                            <h4 style={{
                                color: "#ff5050",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                模糊指令：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "18px",
                                lineHeight: "1.4",
                                margin: 0,
                                fontFamily: "monospace"
                            }}>
                                ❌ "帮我处理邮件"<br />
                                ✅ "分类收件箱邮件"
                            </p>
                        </div>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "10px",
                            padding: "15px"
                        }}>
                            <h4 style={{
                                color: "#ff5050",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                缺少上下文：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "18px",
                                lineHeight: "1.4",
                                margin: 0,
                                fontFamily: "monospace"
                            }}>
                                ❌ "整理文档"<br />
                                ✅ "整理PDF文档并生成摘要"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 使用技巧 */}
            <div style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: tipsOpacity,
                textAlign: "center"
            }}>
                <div style={{
                    background: THEME.cardBackground,
                    borderRadius: "12px",
                    padding: "20px",
                    backdropFilter: "blur(10px)"
                }}>
                    <p style={{
                        color: THEME.textPrimary,
                        fontSize: "26px",
                        fontWeight: "bold",
                        margin: 0
                    }}>
                        💡 记住这三招，你的AI对话效率提升10倍！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};