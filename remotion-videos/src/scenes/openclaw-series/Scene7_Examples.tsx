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

export const OpenClawSeries_Scene7_Examples: React.FC = () => {
    const frame = useCurrentFrame();

    // 动画效果
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const example1Opacity = interpolate(frame, [30, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const example2Opacity = interpolate(frame, [90, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ background: THEME.background, fontFamily: THEME.fontFamily }}>
            {/* 主标题 */}
            <div style={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                opacity: titleOpacity,
                width: "90%",
                zIndex: 10
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
                    🚀 实战案例演示
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    看OpenClaw如何帮你解决实际问题！
                </h2>
            </div>

            {/* 示例1：邮件处理 */}
            <div style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                opacity: example1Opacity,
                zIndex: 9
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.1)",
                    borderRadius: "15px",
                    padding: "30px",
                    border: "2px solid rgba(88,166,255,0.3)",
                    marginBottom: "30px"
                }}>
                    <h3 style={{
                        color: "#58a6ff",
                        fontSize: "36px",
                        margin: "0 0 20px 0",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        📧 案例1：邮件自动分类系统
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "30px"
                    }}>
                        <div>
                            <h4 style={{
                                color: "#f0883e",
                                fontSize: "24px",
                                margin: "0 0 15px 0",
                                fontWeight: "bold"
                            }}>
                                📋 输入指令：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "10px",
                                padding: "20px",
                                fontFamily: "monospace"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "18px",
                                    margin: 0,
                                    lineHeight: "1.5"
                                }}>
                                    角色：邮件助手<br />
                                    任务：分类收件箱<br />
                                    目标：按优先级排序<br />
                                    紧急邮件优先处理<br />
                                    垃圾邮件自动过滤
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 style={{
                                color: "#3fb950",
                                fontSize: "24px",
                                margin: "0 0 15px 0",
                                fontWeight: "bold"
                            }}>
                                ✅ 处理结果：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "10px",
                                padding: "20px"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "18px",
                                    margin: 0,
                                    lineHeight: "1.5"
                                }}>
                                    🔴 紧急邮件：3封<br />
                                    🟡 重要邮件：12封<br />
                                    🟢 普通邮件：45封<br />
                                    🗑️ 垃圾邮件：8封<br />
                                    ⏱️ 处理时间：2秒
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 示例2：文档整理 */}
            <div style={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                opacity: example2Opacity,
                zIndex: 8
            }}>
                <div style={{
                    background: "rgba(255,136,62,0.1)",
                    borderRadius: "15px",
                    padding: "30px",
                    border: "2px solid rgba(255,136,62,0.3)"
                }}>
                    <h3 style={{
                        color: "#f0883e",
                        fontSize: "36px",
                        margin: "0 0 20px 0",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        📄 案例2：文档智能摘要系统
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "30px"
                    }}>
                        <div>
                            <h4 style={{
                                color: "#58a6ff",
                                fontSize: "24px",
                                margin: "0 0 15px 0",
                                fontWeight: "bold"
                            }}>
                                📋 输入指令：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "10px",
                                padding: "20px",
                                fontFamily: "monospace"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "18px",
                                    margin: 0,
                                    lineHeight: "1.5"
                                }}>
                                    角色：文档专家<br />
                                    任务：整理PDF文档<br />
                                    目标：生成内容摘要<br />
                                    提取关键信息<br />
                                    标记重要段落
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 style={{
                                color: "#ffd200",
                                fontSize: "24px",
                                margin: "0 0 15px 0",
                                fontWeight: "bold"
                            }}>
                                ✅ 处理结果：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "10px",
                                padding: "20px"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "18px",
                                    margin: 0,
                                    lineHeight: "1.5"
                                }}>
                                    📄 文档页数：15页<br />
                                    📌 核心要点：5个<br />
                                    🔑 关键词：12个<br />
                                    ⏱️ 阅读时间：8分钟<br />
                                    🎯 摘要准确度：95%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};