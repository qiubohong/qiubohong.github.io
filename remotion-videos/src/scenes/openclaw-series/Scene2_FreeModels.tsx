import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";

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

export const OpenClawSeries_Scene2_FreeModels: React.FC = () => {
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

    const modelsOpacity = interpolate(frame, [60, 120], [0, 1], {
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
                    担心AI太贵？
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    教你白嫖大模型免费额度！
                </h2>
            </div>

            {/* 副标题 */}
            <div style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                opacity: subtitleOpacity,
                width: "80%",
                zIndex: 9
            }}>
                <p style={{
                    color: THEME.textSecondary,
                    fontSize: "28px",
                    lineHeight: "1.4"
                }}>
                    这些大模型都有免费额度，完全不需要花钱！
                </p>
            </div>

            {/* 大模型平台展示 */}
            <div style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                opacity: modelsOpacity,
                zIndex: 8
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "30px",
                    marginBottom: "30px"
                }}>
                    {/* 智谱AI */}
                    <div style={{
                        background: "rgba(88,166,255,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(88,166,255,0.3)"
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px"
                        }}>
                            <div style={{
                                width: "50px",
                                height: "50px",
                                background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "15px"
                            }}>
                                <span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>智</span>
                            </div>
                            <h3 style={{
                                color: "#58a6ff",
                                fontSize: "28px",
                                margin: 0,
                                fontWeight: "bold"
                            }}>
                                智谱AI
                            </h3>
                        </div>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "22px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 每月免费额度大方<br />
                            ✅ 适合高频使用<br />
                            ✅ 响应速度快
                        </p>
                    </div>

                    {/* MiniMax */}
                    <div style={{
                        background: "rgba(255,136,62,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,136,62,0.3)"
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px"
                        }}>
                            <div style={{
                                width: "50px",
                                height: "50px",
                                background: "linear-gradient(45deg, #f0883e, #ffb347)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "15px"
                            }}>
                                <span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>M</span>
                            </div>
                            <h3 style={{
                                color: "#f0883e",
                                fontSize: "28px",
                                margin: 0,
                                fontWeight: "bold"
                            }}>
                                MiniMax
                            </h3>
                        </div>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "22px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 支持多模态<br />
                            ✅ 玩法更多样<br />
                            ✅ 创意应用强
                        </p>
                    </div>

                    {/* 通义千问 */}
                    <div style={{
                        background: "rgba(255,215,0,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,215,0,0.3)"
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px"
                        }}>
                            <div style={{
                                width: "50px",
                                height: "50px",
                                background: "linear-gradient(45deg, #ffd200, #ffed4e)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "15px"
                            }}>
                                <span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>通</span>
                            </div>
                            <h3 style={{
                                color: "#ffd200",
                                fontSize: "28px",
                                margin: 0,
                                fontWeight: "bold"
                            }}>
                                通义千问
                            </h3>
                        </div>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "22px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 阿里出品<br />
                            ✅ 免费额度充足<br />
                            ✅ 企业级稳定
                        </p>
                    </div>

                    {/* 豆包 */}
                    <div style={{
                        background: "rgba(120,81,169,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(120,81,169,0.3)"
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px"
                        }}>
                            <div style={{
                                width: "50px",
                                height: "50px",
                                background: "linear-gradient(45deg, #7851a9, #9b59b6)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "15px"
                            }}>
                                <span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>豆</span>
                            </div>
                            <h3 style={{
                                color: "#7851a9",
                                fontSize: "28px",
                                margin: 0,
                                fontWeight: "bold"
                            }}>
                                豆包
                            </h3>
                        </div>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "22px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 字节跳动出品<br />
                            ✅ 日常对话流畅<br />
                            ✅ 用户体验好
                        </p>
                    </div>
                </div>
            </div>

            {/* 使用技巧 */}
            <div style={{
                position: "absolute",
                bottom: "15%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: tipsOpacity,
                textAlign: "center",
                zIndex: 7
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
                        💡 使用技巧：可以同时申请多个平台，根据需求灵活切换！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};