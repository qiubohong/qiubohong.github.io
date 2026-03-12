import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    Easing,
} from "remotion";

const THEME = {
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
    fontFamily: 'Noto Sans SC, Arial, sans-serif',
    titleGradient: "linear-gradient(45deg, #58a6ff, #79c0ff)",
    accent: "#f0883e",
    accentAlt: "#ffd200",
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",
    cardBg: "rgba(255,255,255,0.06)",
};

// 左列：基础入门
const leftColumn = [
    {
        level: "🔵 基础入门篇",
        color: "#58a6ff",
        desc: "零基础也能上手",
        items: [
            { no: "01", name: "认识龙虾" },
            { no: "02", name: "白嫖大模型" },
            { no: "03", name: "安装龙虾" },
            { no: "04", name: "学会下指令" },
            { no: "05", name: "装上技能包" },
            { no: "06", name: "安全使用" },
        ],
    },
    {
        level: "🟢 初级场景篇",
        color: "#3fb950",
        desc: "第一个真实任务",
        items: [
            { no: "07", name: "每日信息助手" },
            { no: "08", name: "自动化办公入门" },
        ],
    },
];

// 右列：高阶应用
const rightColumn = [
    {
        level: "🟡 中级场景篇",
        color: "#ffd200",
        desc: "解锁复杂工作流",
        items: [
            { no: "09", name: "文档处理流水线" },
            { no: "10", name: "多步骤自动化工作流" },
        ],
    },
    {
        level: "🔴 高级场景篇",
        color: "#f0883e",
        desc: "进阶玩家专属",
        items: [
            { no: "11", name: "接入外部工具" },
            { no: "12", name: "多 Agent 协作" },
        ],
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
                padding: "60px 80px",
                boxSizing: "border-box",
                gap: "24px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", bottom: "-200px", right: "-200px",
                width: "650px", height: "650px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,210,0,0.07) 0%, transparent 70%)",
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
                    fontSize: "70px",
                    fontWeight: "bold",
                    margin: "0 0 10px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    系列学习路线图
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary, margin: "0 0 14px 0" }}>
                    从零到精通，12 篇文章，手把手带你用好龙虾
                </p>
                {/* 进度条 */}
                <div style={{
                    height: "6px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "3px",
                    overflow: "hidden",
                    maxWidth: "700px",
                    margin: "0 auto",
                }}>
                    <div style={{
                        width: `${progressWidth}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #58a6ff, #f0883e)",
                        borderRadius: "3px",
                    }} />
                </div>
            </div>

            {/* 左右两列路线图 */}
            <div style={{
                display: "flex",
                gap: "28px",
                flex: 1,
                minHeight: 0,
            }}>
                {/* 左列：基础入门 */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}>
                    {/* 左列标题 */}
                    <div style={{
                        textAlign: "center",
                        padding: "10px 0",
                        borderBottom: "2px solid rgba(88,166,255,0.3)",
                    }}>
                        <span style={{ fontSize: "26px", fontWeight: "bold", color: "#58a6ff" }}>
                            📘 基础入门
                        </span>
                        <span style={{ fontSize: "18px", color: THEME.textSecondary, marginLeft: "10px" }}>
                            零基础也能上手
                        </span>
                    </div>
                    {leftColumn.map((section, sIdx) => {
                        const sectionOpacity = interpolate(frame, [30 + sIdx * 20, 55 + sIdx * 20], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const sectionSlide = interpolate(frame, [30 + sIdx * 20, 55 + sIdx * 20], [30, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const colorRgb = section.color === "#58a6ff" ? "88,166,255" : "63,185,80";
                        return (
                            <div key={sIdx} style={{
                                opacity: sectionOpacity,
                                transform: `translateY(${sectionSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "18px",
                                padding: "20px 24px",
                                border: `1px solid rgba(${colorRgb},0.25)`,
                                flex: sIdx === 0 ? 3 : 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontSize: "22px", fontWeight: "bold", color: section.color }}>
                                        {section.level}
                                    </span>
                                    <span style={{
                                        fontSize: "15px",
                                        color: section.color,
                                        background: `rgba(${colorRgb},0.12)`,
                                        borderRadius: "999px",
                                        padding: "2px 12px",
                                    }}>{section.desc}</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {section.items.map((item, iIdx) => {
                                        const itemOpacity = interpolate(frame, [50 + sIdx * 20 + iIdx * 8, 70 + sIdx * 20 + iIdx * 8], [0, 1], {
                                            extrapolateLeft: "clamp",
                                            extrapolateRight: "clamp",
                                        });
                                        return (
                                            <div key={iIdx} style={{
                                                opacity: itemOpacity,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                padding: "6px 0",
                                                borderBottom: `1px solid rgba(${colorRgb},0.1)`,
                                            }}>
                                                <span style={{
                                                    fontSize: "15px",
                                                    color: section.color,
                                                    fontWeight: "bold",
                                                    opacity: 0.8,
                                                    minWidth: "28px",
                                                }}>
                                                    {item.no}
                                                </span>
                                                <span style={{ fontSize: "20px", color: THEME.textPrimary }}>
                                                    {item.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 分隔线 */}
                <div style={{
                    width: "2px",
                    background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)",
                    flexShrink: 0,
                    alignSelf: "stretch",
                }} />

                {/* 右列：高阶应用 */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}>
                    {/* 右列标题 */}
                    <div style={{
                        textAlign: "center",
                        padding: "10px 0",
                        borderBottom: "2px solid rgba(240,136,62,0.3)",
                    }}>
                        <span style={{ fontSize: "26px", fontWeight: "bold", color: "#f0883e" }}>
                            🚀 高阶应用
                        </span>
                        <span style={{ fontSize: "18px", color: THEME.textSecondary, marginLeft: "10px" }}>
                            解锁进阶玩法
                        </span>
                    </div>
                    {rightColumn.map((section, sIdx) => {
                        const sectionOpacity = interpolate(frame, [50 + sIdx * 20, 75 + sIdx * 20], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const sectionSlide = interpolate(frame, [50 + sIdx * 20, 75 + sIdx * 20], [30, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const colorRgb = section.color === "#ffd200" ? "255,210,0" : "240,136,62";
                        return (
                            <div key={sIdx} style={{
                                opacity: sectionOpacity,
                                transform: `translateY(${sectionSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "18px",
                                padding: "20px 24px",
                                border: `1px solid rgba(${colorRgb},0.25)`,
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontSize: "22px", fontWeight: "bold", color: section.color }}>
                                        {section.level}
                                    </span>
                                    <span style={{
                                        fontSize: "15px",
                                        color: section.color,
                                        background: `rgba(${colorRgb},0.12)`,
                                        borderRadius: "999px",
                                        padding: "2px 12px",
                                    }}>{section.desc}</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {section.items.map((item, iIdx) => {
                                        const itemOpacity = interpolate(frame, [70 + sIdx * 20 + iIdx * 8, 90 + sIdx * 20 + iIdx * 8], [0, 1], {
                                            extrapolateLeft: "clamp",
                                            extrapolateRight: "clamp",
                                        });
                                        return (
                                            <div key={iIdx} style={{
                                                opacity: itemOpacity,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                padding: "6px 0",
                                                borderBottom: `1px solid rgba(${colorRgb},0.1)`,
                                            }}>
                                                <span style={{
                                                    fontSize: "15px",
                                                    color: section.color,
                                                    fontWeight: "bold",
                                                    opacity: 0.8,
                                                    minWidth: "28px",
                                                }}>
                                                    {item.no}
                                                </span>
                                                <span style={{ fontSize: "20px", color: THEME.textPrimary }}>
                                                    {item.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
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
                    borderRadius: "16px",
                    padding: "16px 36px",
                    border: "1px solid rgba(88,166,255,0.2)",
                }}>
                    <p style={{ fontSize: "26px", color: THEME.textPrimary, margin: 0 }}>
                        📌 每篇都有<span style={{ color: "#58a6ff", fontWeight: "bold" }}>真实场景</span>和<span style={{ color: THEME.accent, fontWeight: "bold" }}>可复制指令模板</span>，看完就能用！
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
