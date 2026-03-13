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

export const OpenClawSeries_Scene3_Installation: React.FC = () => {
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

    const methodsOpacity = interpolate(frame, [60, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const recommendationOpacity = interpolate(frame, [180, 240], [0, 1], {
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
                    5分钟搞定安装！
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    新手也能轻松上手OpenClaw
                </h2>
            </div>

            {/* 安装方法展示 */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95%",
                opacity: methodsOpacity
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    marginBottom: "30px"
                }}>
                    {/* 一键脚本安装 */}
                    <div style={{
                        background: "rgba(88,166,255,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(88,166,255,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>⚡</span>
                        </div>
                        <h3 style={{
                            color: "#58a6ff",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            一键脚本安装
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 最快上手<br />
                            ✅ 5分钟搞定<br />
                            ✅ 新手首选<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* npm安装 */}
                    <div style={{
                        background: "rgba(255,136,62,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,136,62,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #f0883e, #ffb347)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>🔧</span>
                        </div>
                        <h3 style={{
                            color: "#f0883e",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            npm安装
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 最灵活<br />
                            ✅ 技术爱好者<br />
                            ✅ 自定义强<br />
                            ⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 苹果客户端 */}
                    <div style={{
                        background: "rgba(255,215,0,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,215,0,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #ffd200, #ffed4e)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>🍎</span>
                        </div>
                        <h3 style={{
                            color: "#ffd200",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            苹果客户端
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 最省心<br />
                            ✅ 图形界面<br />
                            ✅ 苹果用户<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 腾讯云部署 */}
                    <div style={{
                        background: "rgba(120,81,169,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(120,81,169,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #7851a9, #9b59b6)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>☁️</span>
                        </div>
                        <h3 style={{
                            color: "#7851a9",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            腾讯云部署
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 一键秒部署<br />
                            ✅ 云服务器用户<br />
                            ✅ 企业级稳定<br />
                            ⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 阿里云部署 */}
                    <div style={{
                        background: "rgba(255,80,80,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,80,80,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #ff5050, #ff8080)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>🚀</span>
                        </div>
                        <h3 style={{
                            color: "#ff5050",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            阿里云部署
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 快速部署<br />
                            ✅ 企业用户推荐<br />
                            ✅ 高可用性<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 验证方法 */}
                    <div style={{
                        background: "rgba(63,185,80,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(63,185,80,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            background: "linear-gradient(45deg, #3fb950, #6fcf7f)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>✅</span>
                        </div>
                        <h3 style={{
                            color: "#3fb950",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            安装验证
                        </h3>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 版本检查<br />
                            ✅ 功能测试<br />
                            ✅ 连接验证<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>
                </div>
            </div>

            {/* 推荐说明 */}
            <div style={{
                position: "absolute",
                bottom: "12%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: recommendationOpacity,
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
                        💡 新手建议用一键脚本，技术爱好者可以试试npm安装！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};