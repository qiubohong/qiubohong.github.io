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

export const OpenClawSeries_Scene6_Workflow: React.FC = () => {
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

    return (
        <AbsoluteFill style={{ background: THEME.background, fontFamily: THEME.fontFamily }}>
            {/* 主标题 */}
            <div style={{
                position: "absolute",
                top: "15%",
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
                    🔄 OpenClaw工作流程揭秘
                </h1>
                <h2 style={{
                    color: THEME.textPrimary,
                    fontSize: "42px",
                    fontWeight: "600",
                    margin: 0,
                    opacity: 0.9
                }}>
                    从指令到结果，4步搞定！
                </h2>
            </div>

            {/* 工作流程展示 */}
            <div style={{
                position: "absolute",
                top: "35%",
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
                    margin: "0 0 40px 0",
                    fontWeight: "bold"
                }}>
                    🚀 4步工作流程，让AI真正理解你
                </h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    marginBottom: "30px"
                }}>
                    {/* 步骤1：接收指令 */}
                    <div style={{
                        background: "rgba(88,166,255,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(88,166,255,0.3)",
                        textAlign: "center",
                        height: "280px"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                            borderRadius: "50%",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>1</span>
                        </div>
                        <h4 style={{
                            color: "#58a6ff",
                            fontSize: "26px",
                            margin: "0 0 15px 0",
                            fontWeight: "bold"
                        }}>
                            📝 接收指令
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 解析用户指令<br />
                            ✅ 理解任务需求<br />
                            ✅ 分析上下文信息<br />
                            <span style={{ color: THEME.accentColor, fontWeight: "bold" }}>精准理解</span>
                        </p>
                    </div>

                    {/* 步骤2：选择技能 */}
                    <div style={{
                        background: "rgba(255,136,62,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,136,62,0.3)",
                        textAlign: "center",
                        height: "280px"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #f0883e, #ffb347)",
                            borderRadius: "50%",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>2</span>
                        </div>
                        <h4 style={{
                            color: "#f0883e",
                            fontSize: "26px",
                            margin: "0 0 15px 0",
                            fontWeight: "bold"
                        }}>
                            🧩 选择技能
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 匹配合适技能<br />
                            ✅ 调用对应功能<br />
                            ✅ 加载技能配置<br />
                            <span style={{ color: THEME.accentColor, fontWeight: "bold" }}>智能匹配</span>
                        </p>
                    </div>

                    {/* 步骤3：执行任务 */}
                    <div style={{
                        background: "rgba(255,215,0,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(255,215,0,0.3)",
                        textAlign: "center",
                        height: "280px"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #ffd200, #ffed4e)",
                            borderRadius: "50%",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>3</span>
                        </div>
                        <h4 style={{
                            color: "#ffd200",
                            fontSize: "26px",
                            margin: "0 0 15px 0",
                            fontWeight: "bold"
                        }}>
                            ⚡ 执行任务
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 处理数据<br />
                            ✅ 调用API<br />
                            ✅ 实时监控<br />
                            <span style={{ color: THEME.accentColor, fontWeight: "bold" }}>高效执行</span>
                        </p>
                    </div>

                    {/* 步骤4：返回结果 */}
                    <div style={{
                        background: "rgba(63,185,80,0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        border: "2px solid rgba(63,185,80,0.3)",
                        textAlign: "center",
                        height: "280px"
                    }}>
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "linear-gradient(45deg, #3fb950, #6fcf7f)",
                            borderRadius: "50%",
                            margin: "0 auto 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>4</span>
                        </div>
                        <h4 style={{
                            color: "#3fb950",
                            fontSize: "26px",
                            margin: "0 0 15px 0",
                            fontWeight: "bold"
                        }}>
                            📊 返回结果
                        </h4>
                        <p style={{
                            color: THEME.textPrimary,
                            fontSize: "20px",
                            lineHeight: "1.4",
                            margin: 0
                        }}>
                            ✅ 格式化输出<br />
                            ✅ 清晰展示<br />
                            ✅ 错误处理<br />
                            <span style={{ color: THEME.accentColor, fontWeight: "bold" }}>完美呈现</span>
                        </p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};