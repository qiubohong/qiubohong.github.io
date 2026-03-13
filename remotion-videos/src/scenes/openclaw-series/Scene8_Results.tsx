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

export const OpenClawSeries_Scene8_Results: React.FC = () => {
    const frame = useCurrentFrame();

    // 动画效果
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const comparisonOpacity = interpolate(frame, [30, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const summaryOpacity = interpolate(frame, [90, 150], [0, 1], {
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
                    ⚡ 效率对比：OpenClaw vs 传统方式
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    看看数据说话，差距有多大！
                </h2>
            </div>

            {/* 效果对比 */}
            <div style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "85%",
                opacity: comparisonOpacity,
                zIndex: 9
            }}>
                <div style={{
                    background: "rgba(63,185,80,0.1)",
                    borderRadius: "15px",
                    padding: "30px",
                    border: "2px solid rgba(63,185,80,0.3)",
                    marginBottom: "30px"
                }}>
                    <h3 style={{
                        color: "#3fb950",
                        fontSize: "36px",
                        margin: "0 0 25px 0",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        📊 效率对比分析
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "30px"
                    }}>
                        {/* 传统方式 */}
                        <div style={{
                            background: "rgba(255,80,80,0.1)",
                            borderRadius: "12px",
                            padding: "25px",
                            border: "2px solid rgba(255,80,80,0.3)"
                        }}>
                            <h4 style={{
                                color: "#ff5050",
                                fontSize: "28px",
                                margin: "0 0 20px 0",
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>
                                ❌ 传统方式
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "10px",
                                padding: "20px"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "20px",
                                    lineHeight: "1.6",
                                    margin: 0
                                }}>
                                    ⏱️ 手动操作：30分钟<br />
                                    🧠 学习成本：高<br />
                                    💸 工具费用：$100+/月<br />
                                    🔄 重复工作：多<br />
                                    📈 效率提升：0%<br />
                                    🎯 准确率：70%
                                </p>
                            </div>
                            <div style={{
                                marginTop: "15px",
                                textAlign: "center"
                            }}>
                                <span style={{
                                    color: "#ff5050",
                                    fontSize: "24px",
                                    fontWeight: "bold"
                                }}>
                                    ❌ 不推荐
                                </span>
                            </div>
                        </div>

                        {/* OpenClaw方式 */}
                        <div style={{
                            background: "rgba(63,185,80,0.1)",
                            borderRadius: "12px",
                            padding: "25px",
                            border: "2px solid rgba(63,185,80,0.3)"
                        }}>
                            <h4 style={{
                                color: "#3fb950",
                                fontSize: "28px",
                                margin: "0 0 20px 0",
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>
                                ✅ OpenClaw
                            </h4>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "10px",
                                padding: "20px"
                            }}>
                                <p style={{
                                    color: THEME.textPrimary,
                                    fontSize: "20px",
                                    lineHeight: "1.6",
                                    margin: 0
                                }}>
                                    ⚡ 自动处理：2分钟<br />
                                    🎓 学习成本：低<br />
                                    💰 工具费用：免费<br />
                                    🔄 重复工作：无<br />
                                    📈 效率提升：10倍<br />
                                    🎯 准确率：95%
                                </p>
                            </div>
                            <div style={{
                                marginTop: "15px",
                                textAlign: "center"
                            }}>
                                <span style={{
                                    color: "#3fb950",
                                    fontSize: "24px",
                                    fontWeight: "bold"
                                }}>
                                    ⭐ 强烈推荐
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 数据统计 */}
                <div style={{
                    background: "rgba(88,166,255,0.1)",
                    borderRadius: "15px",
                    padding: "25px",
                    border: "2px solid rgba(88,166,255,0.3)"
                }}>
                    <h4 style={{
                        color: "#58a6ff",
                        fontSize: "28px",
                        margin: "0 0 15px 0",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        📈 数据统计对比
                    </h4>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px"
                    }}>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#ff5050",
                                marginBottom: "5px"
                            }}>
                                30分钟
                            </div>
                            <div style={{
                                color: THEME.textSecondary,
                                fontSize: "18px"
                            }}>
                                传统耗时
                            </div>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#3fb950",
                                marginBottom: "5px"
                            }}>
                                2分钟
                            </div>
                            <div style={{
                                color: THEME.textSecondary,
                                fontSize: "18px"
                            }}>
                                OpenClaw耗时
                            </div>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#ffd200",
                                marginBottom: "5px"
                            }}>
                                15倍
                            </div>
                            <div style={{
                                color: THEME.textSecondary,
                                fontSize: "18px"
                            }}>
                                效率提升
                            </div>
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
                zIndex: 8
            }}>
                <div style={{
                    background: THEME.cardBackground,
                    borderRadius: "15px",
                    padding: "30px",
                    backdropFilter: "blur(10px)",
                    border: "2px solid rgba(255,255,255,0.1)"
                }}>
                    <p style={{
                        color: THEME.textPrimary,
                        fontSize: "32px",
                        fontWeight: "bold",
                        margin: "0 0 15px 0"
                    }}>
                        🎉 恭喜！你已经掌握了OpenClaw的核心用法！
                    </p>
                    <p style={{
                        color: THEME.textSecondary,
                        fontSize: "24px",
                        margin: 0,
                        lineHeight: "1.4"
                    }}>
                        现在就去试试吧，让你的AI助手真正帮你干活！<br />
                        从今天开始，告别手动操作，拥抱智能自动化！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};