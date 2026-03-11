import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

const roadmapItems = [
    {
        level: "🔵 基础入门篇",
        color: "#58a6ff",
        items: ["认识龙虾", "白嫖大模型", "安装龙虾", "学会下指令", "装上技能包", "安全使用"],
    },
    {
        level: "🟢 初级场景篇",
        color: "#3fb950",
        items: ["每日信息助手", "自动化办公入门"],
    },
    {
        level: "🟡 中级场景篇",
        color: "#ffd200",
        items: ["文档处理流水线", "多步骤自动化工作流"],
    },
    {
        level: "🔴 高级场景篇",
        color: "#f0883e",
        items: ["接入外部工具", "多 Agent 协作"],
    },
];

export const OpenClaw_Scene4_Roadmap: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 35], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const summaryOpacity = interpolate(frame, [120, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const summarySlide = interpolate(frame, [120, 150], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 进度条动画
    const progressWidth = interpolate(frame, [20, 100], [0, 100], {
        easing: Easing.inOut(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "36px 52px",
                boxSizing: "border-box",
                gap: "14px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", bottom: "-200px", right: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,210,0,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                textAlign: "center",
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "58px",
                    fontWeight: "bold",
                    margin: "0 0 6px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    系列学习路线图
                </h1>
                <p style={{ fontSize: "22px", color: THEME.textSecondary, margin: "0 0 10px 0" }}>
                    从零到精通，12 篇文章，手把手带你用好龙虾
                </p>
                {/* 进度条 */}
                <div style={{
                    height: "4px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}>
                    <div style={{
                        width: `${progressWidth}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #58a6ff, #f0883e)",
                        borderRadius: "2px",
                    }} />
                </div>
            </div>

            {/* 路线图卡片 */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: 1,
                minHeight: 0,
            }}>
                {roadmapItems.map((section, sIdx) => {
                    const sectionOpacity = interpolate(frame, [30 + sIdx * 20, 55 + sIdx * 20], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const sectionSlide = interpolate(frame, [30 + sIdx * 20, 55 + sIdx * 20], [30, 0], {
                        easing: Easing.out(Easing.cubic),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    return (
                        <div key={sIdx} style={{
                            opacity: sectionOpacity,
                            transform: `translateY(${sectionSlide}px)`,
                            background: THEME.cardBg,
                            borderRadius: "14px",
                            padding: "14px 20px",
                            border: `1px solid rgba(${section.color === "#58a6ff" ? "88,166,255" : section.color === "#3fb950" ? "63,185,80" : section.color === "#ffd200" ? "255,210,0" : "240,136,62"},0.2)`,
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <div style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: section.color,
                                flexShrink: 0,
                                minWidth: "140px",
                            }}>
                                {section.level}
                            </div>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flex: 1 }}>
                                {section.items.map((item, iIdx) => (
                                    <div key={iIdx} style={{
                                        background: `rgba(${section.color === "#58a6ff" ? "88,166,255" : section.color === "#3fb950" ? "63,185,80" : section.color === "#ffd200" ? "255,210,0" : "240,136,62"},0.1)`,
                                        borderRadius: "8px",
                                        padding: "5px 12px",
                                        fontSize: "16px",
                                        color: THEME.textPrimary,
                                        border: `1px solid rgba(${section.color === "#58a6ff" ? "88,166,255" : section.color === "#3fb950" ? "63,185,80" : section.color === "#ffd200" ? "255,210,0" : "240,136,62"},0.2)`,
                                    }}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 总结 */}
            <div style={{
                opacity: summaryOpacity,
                transform: `translateY(${summarySlide}px)`,
                flexShrink: 0,
                textAlign: "center",
            }}>
                <div style={{
                    display: "inline-block",
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "12px",
                    padding: "12px 28px",
                    border: "1px solid rgba(88,166,255,0.2)",
                }}>
                    <p style={{ fontSize: "22px", color: THEME.textPrimary, margin: 0 }}>
                        📌 每篇都有<span style={{ color: "#58a6ff", fontWeight: "bold" }}>真实场景</span>和<span style={{ color: THEME.accent, fontWeight: "bold" }}>可复制指令模板</span>，看完就能用！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
