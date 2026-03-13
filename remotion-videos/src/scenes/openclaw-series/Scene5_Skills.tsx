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

export const OpenClawSeries_Scene5_Skills: React.FC = () => {
    const frame = useCurrentFrame();

    // 动画效果
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const conceptOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const skillsOpacity = interpolate(frame, [60, 120], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const installationOpacity = interpolate(frame, [120, 180], [0, 1], {
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
                    想让AI学会新技能？
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    装上技能包就行！
                </h2>
            </div>

            {/* Skills概念解释 */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: conceptOpacity,
                textAlign: "center"
            }}>
                <div style={{
                    background: "rgba(88,166,255,0.1)",
                    borderRadius: "15px",
                    padding: "30px",
                    border: "2px solid rgba(88,166,255,0.3)",
                    marginBottom: "20px"
                }}>
                    <h3 style={{
                        color: "#58a6ff",
                        fontSize: "36px",
                        margin: "0 0 15px 0",
                        fontWeight: "bold"
                    }}>
                        🧩 Skills概念：像给手机装App一样简单！
                    </h3>
                    <p style={{
                        color: THEME.textPrimary,
                        fontSize: "26px",
                        lineHeight: "1.5",
                        margin: 0
                    }}>
                        Skills就像手机上的App，让OpenClaw学会新技能。<br />
                        每个Skill都有特定功能，一键安装就能使用！
                    </p>
                </div>
            </div>

            {/* 必备技能推荐 */}
            <div style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95%",
                opacity: skillsOpacity
            }}>
                <h3 style={{
                    color: THEME.accentColor,
                    fontSize: "32px",
                    textAlign: "center",
                    margin: "0 0 25px 0",
                    fontWeight: "bold"
                }}>
                    🔥 必备技能推荐（新手必装）
                </h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    marginBottom: "30px"
                }}>
                    {/* 天气技能 */}
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
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>🌤️</span>
                        </div>
                        <h4 style={{
                            color: "#58a6ff",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            天气查询
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 实时天气信息<br />
                            ✅ 多城市支持<br />
                            ✅ 预警提醒<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 日历技能 */}
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
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>📅</span>
                        </div>
                        <h4 style={{
                            color: "#f0883e",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            日历管理
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 日程安排<br />
                            ✅ 提醒设置<br />
                            ✅ 会议管理<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 新闻技能 */}
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
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>📰</span>
                        </div>
                        <h4 style={{
                            color: "#ffd200",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            新闻推送
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 热点新闻<br />
                            ✅ 定制主题<br />
                            ✅ 定时推送<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 邮件技能 */}
                    <div style={{
                        background: "rgba(120,81,169,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(120,81,169,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #7851a9, #9b59b6)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>📧</span>
                        </div>
                        <h4 style={{
                            color: "#7851a9",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            邮件处理
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 自动分类<br />
                            ✅ 智能回复<br />
                            ✅ 垃圾过滤<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 文档技能 */}
                    <div style={{
                        background: "rgba(63,185,80,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(63,185,80,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #3fb950, #6fcf7f)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>📄</span>
                        </div>
                        <h4 style={{
                            color: "#3fb950",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            文档整理
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ PDF阅读<br />
                            ✅ 内容摘要<br />
                            ✅ 格式转换<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>

                    {/* 翻译技能 */}
                    <div style={{
                        background: "rgba(255,80,80,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,80,80,0.3)",
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #ff5050, #ff8080)",
                            borderRadius: "15px",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>🌐</span>
                        </div>
                        <h4 style={{
                            color: "#ff5050",
                            fontSize: "26px",
                            margin: "0 0 10px 0",
                            fontWeight: "bold"
                        }}>
                            多语言翻译
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 多语种支持<br />
                            ✅ 实时翻译<br />
                            ✅ 专业术语<br />
                            ⭐⭐⭐⭐⭐
                        </p>
                    </div>
                </div>
            </div>

            {/* 安装方法 */}
            <div style={{
                position: "absolute",
                top: "65%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                opacity: installationOpacity,
                textAlign: "center"
            }}>
                <div style={{
                    background: "rgba(255,136,62,0.1)",
                    borderRadius: "15px",
                    padding: "25px",
                    border: "2px solid rgba(255,136,62,0.3)"
                }}>
                    <h3 style={{
                        color: "#f0883e",
                        fontSize: "28px",
                        margin: "0 0 15px 0",
                        fontWeight: "bold"
                    }}>
                        ⚡ 一键安装，无需技术基础！
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
                                命令行安装：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "18px",
                                lineHeight: "1.4",
                                margin: 0,
                                fontFamily: "monospace"
                            }}>
                                openclaw install skill-name
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
                                图形界面安装：
                            </h4>
                            <p style={{
                                color: THEME.textPrimary,
                                fontSize: "18px",
                                lineHeight: "1.4",
                                margin: 0
                            }}>
                                点击安装按钮，自动完成配置
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
                        💡 装上技能包，你的AI助手就能处理更多任务！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};