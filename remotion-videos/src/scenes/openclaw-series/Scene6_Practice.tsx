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

export const OpenClawSeries_Scene6_Practice: React.FC = () => {
    const frame = useCurrentFrame();

    // 动画效果
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const workflowOpacity = interpolate(frame, [30, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const example1Opacity = interpolate(frame, [90, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const example2Opacity = interpolate(frame, [150, 210], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const resultsOpacity = interpolate(frame, [210, 270], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const summaryOpacity = interpolate(frame, [270, 330], [0, 1], {
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
                    实战演练：看OpenClaw如何工作！
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    从指令到结果，完整流程演示
                </h2>
            </div>

            {/* 工作流程展示 */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95%",
                opacity: workflowOpacity,
                zIndex: 9
            }}>
                <h3 style={{
                    color: THEME.accentColor,
                    fontSize: "32px",
                    textAlign: "center",
                    margin: "0 0 25px 0",
                    fontWeight: "bold"
                }}>
                    🔄 OpenClaw工作流程
                </h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "15px",
                    marginBottom: "30px"
                }}>
                    {/* 步骤1：接收指令 */}
                    <div style={{
                        background: "rgba(88,166,255,0.1)",
                        borderRadius: "15px",
                        padding: "20px",
                        border: "2px solid rgba(88,166,255,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                            borderRadius: "50%",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>1</span>
                        </div>
                        <h4 style={{
                            color: "#58a6ff",
                            fontSize: "22px",
                            margin: "0 0 8px 0",
                            fontWeight: "bold"
                        }}>
                            接收指令
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "18px",
                            lineHeight: "1.3",
                            margin: 0
                        }}>
                            解析用户指令<br />
                            理解任务需求
                        </p>
                    </div>

                    {/* 步骤2：选择技能 */}
                    <div style={{
                        background: "rgba(255,136,62,0.1)",
                        borderRadius: "15px",
                        padding: "20px",
                        border: "2px solid rgba(255,136,62,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #f0883e, #ffb347)",
                            borderRadius: "50%",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>2</span>
                        </div>
                        <h4 style={{
                            color: "#f0883e",
                            fontSize: "22px",
                            margin: "0 0 8px 0",
                            fontWeight: "bold"
                        }}>
                            选择技能
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "18px",
                            lineHeight: "1.3",
                            margin: 0
                        }}>
                            匹配合适技能<br />
                            调用对应功能
                        </p>
                    </div>

                    {/* 步骤3：执行任务 */}
                    <div style={{
                        background: "rgba(255,215,0,0.1)",
                        borderRadius: "15px",
                        padding: "20px",
                        border: "2px solid rgba(255,215,0,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #ffd200, #ffed4e)",
                            borderRadius: "50%",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>3</span>
                        </div>
                        <h4 style={{
                            color: "#ffd200",
                            fontSize: "22px",
                            margin: "0 0 8px 0",
                            fontWeight: "bold"
                        }}>
                            执行任务
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "18px",
                            lineHeight: "1.3",
                            margin: 0
                        }}>
                            处理数据<br />
                            调用API
                        </p>
                    </div>

                    {/* 步骤4：返回结果 */}
                    <div style={{
                        background: "rgba(63,185,80,0.1)",
                        borderRadius: "15px",
                        padding: "20px",
                        border: "2px solid rgba(63,185,80,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #3fb950, #6fcf7f)",
                            borderRadius: "50%",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>4</span>
                        </div>
                        <h4 style={{
                            color: "#3fb950",
                            fontSize: "22px",
                            margin: "0 0 8px 0",
                            fontWeight: "bold"
                        }}>
                            返回结果
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "18px",
                            lineHeight: "1.3",
                            margin: 0
                        }}>
                            格式化输出<br />
                            清晰展示
                        </p>
                    </div>
                </div>
            </div>

            {/* 示例1：邮件处理 */}
            <div style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                opacity: example1Opacity,
                zIndex: 8
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.1)",
                    borderRadius: "15px",
                    padding: "25px",
                    border: "2px solid rgba(88,166,255,0.3)",
                    marginBottom: "20px"
                }}>
                    <h3 style={{
                        color: "#58a6ff",
                        fontSize: "28px",
                        margin: "0 0 15px 0",
                        fontWeight: "bold"
                    }}>
                        📧 示例1：邮件自动分类
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px"
                    }}>
                        <div>
                            <h4 style={{
                                color: "#f0883e",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                输入指令：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "8px",
                                padding: "15px",
                                fontFamily: "monospace"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "16px",
                                    margin: 0,
                                    lineHeight: "1.4"
                                }}>
                                    角色：邮件助手<br />
                                    任务：分类收件箱<br />
                                    目标：按优先级排序<br />
                                    紧急邮件优先处理
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 style={{
                                color: "#3fb950",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                处理结果：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "8px",
                                padding: "15px"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "16px",
                                    margin: 0,
                                    lineHeight: "1.4"
                                }}>
                                    ✅ 紧急邮件：3封<br />
                                    ✅ 重要邮件：12封<br />
                                    ✅ 普通邮件：45封<br />
                                    ✅ 垃圾邮件：8封
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
                zIndex: 7
            }}>
                <div style={{
                    background: "rgba(255,136,62,0.1)",
                    borderRadius: "15px",
                    padding: "25px",
                    border: "2px solid rgba(255,136,62,0.3)",
                    marginBottom: "20px"
                }}>
                    <h3 style={{
                        color: "#f0883e",
                        fontSize: "28px",
                        margin: "0 0 15px 0",
                        fontWeight: "bold"
                    }}>
                        📄 示例2：文档智能摘要
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px"
                    }}>
                        <div>
                            <h4 style={{
                                color: "#58a6ff",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                输入指令：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "8px",
                                padding: "15px",
                                fontFamily: "monospace"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "16px",
                                    margin: 0,
                                    lineHeight: "1.4"
                                }}>
                                    角色：文档专家<br />
                                    任务：整理PDF文档<br />
                                    目标：生成内容摘要<br />
                                    提取关键信息
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 style={{
                                color: "#ffd200",
                                fontSize: "20px",
                                margin: "0 0 10px 0"
                            }}>
                                处理结果：
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "8px",
                                padding: "15px"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "16px",
                                    margin: 0,
                                    lineHeight: "1.4"
                                }}>
                                    ✅ 文档页数：15页<br />
                                    ✅ 核心要点：5个<br />
                                    ✅ 关键词：12个<br />
                                    ✅ 阅读时间：8分钟
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 效果展示 */}
            <div style={{
                position: "absolute",
                top: "75%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: resultsOpacity,
                textAlign: "center",
                zIndex: 6
            }}>
                <div style={{
                    background: "rgba(63,185,80,0.1)",
                    borderRadius: "15px",
                    padding: "20px",
                    border: "2px solid rgba(63,185,80,0.3)"
                }}>
                    <h3 style={{
                        color: "#3fb950",
                        fontSize: "26px",
                        margin: "0 0 15px 0",
                        fontWeight: "bold"
                    }}>
                        🚀 效果对比：传统方式 vs OpenClaw
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px"
                    }}>
                        <div>
                            <h4 style={{
                                color: "#ff5050",
                                fontSize: "18px",
                                margin: "0 0 8px 0"
                            }}>
                                传统方式：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "16px",
                                margin: 0,
                                lineHeight: "1.4"
                            }}>
                                ❌ 手动操作<br />
                                ❌ 耗时费力<br />
                                ❌ 容易出错<br />
                                ❌ 效率低下
                            </p>
                        </div>
                        <div>
                            <h4 style={{
                                color: "#3fb950",
                                fontSize: "18px",
                                margin: "0 0 8px 0"
                            }}>
                                OpenClaw：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "16px",
                                margin: 0,
                                lineHeight: "1.4"
                            }}>
                                ✅ 自动处理<br />
                                ✅ 快速高效<br />
                                ✅ 准确无误<br />
                                ✅ 提升10倍效率
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 总结 */}
            <div style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: summaryOpacity,
                textAlign: "center",
                zIndex: 5
            }}>
                <div style={{
                    background: THEME.cardBackground,
                    borderRadius: "12px",
                    padding: "20px",
                    backdropFilter: "blur(10px)"
                }}>
                    <p style={{
                        color: THEME.textPrimary,
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: 0
                    }}>
                        🎉 恭喜！你已经掌握了OpenClaw的核心用法！
                    </p>
                    <p style={{
                        color: THEME.textSecondary,
                        fontSize: "22px",
                        margin: "10px 0 0 0"
                    }}>
                        现在就去试试吧，让你的AI助手真正帮你干活！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};