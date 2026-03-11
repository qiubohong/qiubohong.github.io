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

const DIR_ITEMS = [
    { icon: "📄", name: "SKILL.md", desc: "核心文件：定义技能（Metadata + Instructions）", color: "#58a6ff", indent: 0 },
    { icon: "📁", name: "scripts/", desc: "可执行的辅助脚本目录", color: "#3fb950", indent: 0 },
    { icon: "🐍", name: "process.py", desc: "辅助脚本，让 AI 真正动手执行操作", color: "#3fb950", indent: 1 },
    { icon: "📁", name: "references/", desc: "参考文档和资源存放目录", color: "#ffd200", indent: 0 },
    { icon: "📖", name: "guide.md", desc: "数据库模式、API 文档、模板或示例", color: "#ffd200", indent: 1 },
];

const SKILL_MD_PARTS = [
    { icon: "🏷️", name: "Metadata 元数据", desc: "始终加载在对话内，YAML 格式，提供发现信息", color: "#f0883e" },
    { icon: "📝", name: "Instructions 指令", desc: "触发时加载，包含工作流程、最佳实践和指导原则", color: "#58a6ff" },
];

export const AgentSkill_Scene2_Structure: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleSlide = interpolate(frame, [0, 35], [40, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const floatY = Math.sin(frame * 0.05) * 4;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "36px 48px",
                boxSizing: "border-box",
                gap: "16px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-200px", right: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(63,185,80,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* 标题 */}
            <div style={{
                opacity: titleOpacity,
                transform: `translateY(${titleSlide}px)`,
                flexShrink: 0,
            }}>
                <h1 style={{
                    fontSize: "60px",
                    fontWeight: "bold",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "4px",
                }}>
                    Skill 的组成部分
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    三个核心组成部分，构成完整的可复用知识包
                </p>
            </div>

            {/* 主体：左侧目录结构 + 右侧 SKILL.md 详解 */}
            <div style={{
                flex: 1,
                display: "flex",
                gap: "24px",
                minHeight: 0,
            }}>
                {/* 左侧：目录结构 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{
                        fontSize: "26px", fontWeight: "bold", color: THEME.accentAlt,
                        marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px",
                    }}>
                        <span style={{ transform: `translateY(${floatY}px)` }}>📂</span>
                        目录结构
                    </div>
                    {DIR_ITEMS.map((item, i) => {
                        const itemOpacity = interpolate(frame, [25 + i * 12, 50 + i * 12], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const itemSlide = interpolate(frame, [25 + i * 12, 50 + i * 12], [20, 0], {
                            easing: Easing.out(Easing.cubic),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                opacity: itemOpacity,
                                transform: `translateY(${itemSlide}px)`,
                                background: THEME.cardBg,
                                borderRadius: "10px",
                                padding: "12px 16px",
                                border: `1px solid ${item.color}25`,
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginLeft: item.indent * 24,
                                flex: 1,
                            }}>
                                <span style={{ fontSize: "28px", flexShrink: 0 }}>{item.icon}</span>
                                <div>
                                    <span style={{ fontSize: "22px", fontWeight: "bold", color: item.color, fontFamily: "monospace" }}>{item.name}</span>
                                    <span style={{ fontSize: "20px", color: THEME.textSecondary, marginLeft: "10px" }}>{item.desc}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 右侧：SKILL.md 详解 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{
                        fontSize: "26px", fontWeight: "bold", color: THEME.accentAlt,
                        marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px",
                    }}>
                        <span>📄</span>
                        SKILL.md 核心结构
                    </div>
                    {SKILL_MD_PARTS.map((part, i) => {
                        const partOpacity = interpolate(frame, [60 + i * 20, 85 + i * 20], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const partSlide = interpolate(frame, [60 + i * 20, 85 + i * 20], [25, 0], {
                            easing: Easing.out(Easing.back(1.2)),
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div key={i} style={{
                                opacity: partOpacity,
                                transform: `translateY(${partSlide}px)`,
                                background: `${part.color}10`,
                                borderRadius: "12px",
                                padding: "18px 22px",
                                border: `1px solid ${part.color}30`,
                                flex: 1,
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                                    <span style={{ fontSize: "32px" }}>{part.icon}</span>
                                    <span style={{ fontSize: "26px", fontWeight: "bold", color: part.color }}>{part.name}</span>
                                </div>
                                <p style={{ fontSize: "22px", color: THEME.textPrimary, lineHeight: 1.6 }}>{part.desc}</p>
                            </div>
                        );
                    })}

                    {/* YAML 示例 */}
                    <div style={{
                        opacity: interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                        background: "#161b22",
                        borderRadius: "10px",
                        padding: "14px 18px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        flex: 1,
                    }}>
                        <div style={{ fontSize: "18px", color: THEME.textSecondary, marginBottom: "6px", fontFamily: "monospace" }}>SKILL.md 示例</div>
                        <pre style={{ margin: 0, fontSize: "18px", color: THEME.textPrimary, fontFamily: "monospace", lineHeight: 1.6 }}>
                            <span style={{ color: "#79c0ff" }}>---{"\n"}</span>
                            <span style={{ color: "#7ee787" }}>name</span>
                            <span style={{ color: THEME.textPrimary }}>: code-review-helper{"\n"}</span>
                            <span style={{ color: "#7ee787" }}>description</span>
                            <span style={{ color: THEME.textPrimary }}>: {"\""}</span>
                            <span style={{ color: "#ffd200" }}>当用户说代码审查时触发</span>
                            <span style={{ color: THEME.textPrimary }}>{"\"" + "\n"}</span>
                            <span style={{ color: "#79c0ff" }}>---</span>
                        </pre>
                    </div>
                </div>
            </div>
        </AbsoluteFill >
    );
};
