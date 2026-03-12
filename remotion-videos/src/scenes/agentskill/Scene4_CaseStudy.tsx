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

const CODE_SKILL_MD = `---
name: weather-assistant
description: "查询指定城市的实时天气，生成包含
  穿衣建议和出行提示的报告。
  当用户询问天气、出行建议时触发。"
---
# 天气助手
## 触发条件
- 主要触发词: 查天气、今天天气、出行建议
- 支持城市: 全国主要城市`;

const CODE_SCRIPT = `#!/usr/bin/env python3
"""天气报告自动化脚本"""

# 调用天气 API 获取实时数据
weather = fetch_weather_api(city, api_key)

# 按预设模板生成出行建议报告
report = generate_report(
    weather=weather,
    template="travel_advice"
)`;

export const AgentSkill_Scene4_CaseStudy: React.FC = () => {
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

    const leftOpacity = interpolate(frame, [25, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const rightOpacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // AI 对话动画
    const CHAT_SHOW_START = 100;
    const chatPanelWidth = interpolate(
        frame,
        [CHAT_SHOW_START, CHAT_SHOW_START + 30],
        [0, 420],
        {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );
    const chatPanelOpacity = interpolate(
        frame,
        [CHAT_SHOW_START, CHAT_SHOW_START + 20],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const getTypingText = (text: string, startFrame: number, charsPerFrame = 1.2) => {
        const elapsed = Math.max(0, frame - startFrame);
        return text.slice(0, Math.floor(elapsed * charsPerFrame));
    };

    const msg1 = "帮我查一下北京今天的天气";
    const msg2 = "☀️ 北京今日晴，气温 8~18°C\n🧥 建议穿薄外套，早晚较凉\n🚗 出行畅通，适合户外活动";

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
                gap: "14px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", bottom: "-200px", right: "-200px",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
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
                    案例：天气助手 Skill
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary }}>
                    一句话，AI 自动查天气 + 生成出行建议报告
                </p>
            </div>

            {/* 主体：左侧代码 + 右侧对话动画 */}
            <div style={{
                flex: 1,
                display: "flex",
                gap: "20px",
                minHeight: 0,
            }}>
                {/* 左侧：SKILL.md + scripts */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    opacity: leftOpacity,
                }}>
                    {/* SKILL.md */}
                    <div style={{
                        flex: 1,
                        background: "#161b22",
                        borderRadius: "10px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "8px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                            <span style={{ marginLeft: 8, color: THEME.textSecondary, fontSize: 18 }}>SKILL.md</span>
                        </div>
                        <pre style={{
                            margin: 0, padding: "14px 18px",
                            fontSize: "17px", lineHeight: 1.6,
                            color: THEME.textPrimary,
                            fontFamily: '"Fira Code", "Courier New", monospace',
                            whiteSpace: "pre-wrap", flex: 1, overflow: "hidden",
                        }}>
                            {CODE_SKILL_MD.split("\n").map((line, i) => {
                                let color = THEME.textPrimary;
                                if (line.startsWith("---")) color = "#79c0ff";
                                else if (line.startsWith("name:") || line.startsWith("description:")) color = "#7ee787";
                                else if (line.startsWith("#")) color = "#ffd200";
                                else if (line.startsWith("- ")) color = THEME.accent;
                                return <span key={i} style={{ display: "block", color }}>{line || " "}</span>;
                            })}
                        </pre>
                    </div>

                    {/* scripts */}
                    <div style={{
                        flex: 1,
                        background: "#161b22",
                        borderRadius: "10px",
                        border: "1px solid rgba(63,185,80,0.2)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        opacity: rightOpacity,
                    }}>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "8px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                            <span style={{ marginLeft: 8, color: THEME.textSecondary, fontSize: 18 }}>scripts/weather_report.py</span>
                        </div>
                        <pre style={{
                            margin: 0, padding: "14px 18px",
                            fontSize: "17px", lineHeight: 1.6,
                            color: THEME.textPrimary,
                            fontFamily: '"Fira Code", "Courier New", monospace',
                            whiteSpace: "pre-wrap", flex: 1, overflow: "hidden",
                        }}>
                            {CODE_SCRIPT.split("\n").map((line, i) => {
                                let color = THEME.textPrimary;
                                if (line.startsWith("#")) color = THEME.textSecondary;
                                else if (line.includes("fetch_weather_api") || line.includes("generate_report")) color = "#3fb950";
                                else if (line.includes("weather") || line.includes("report")) color = "#79c0ff";
                                return <span key={i} style={{ display: "block", color }}>{line || " "}</span>;
                            })}
                        </pre>
                    </div>
                </div>

                {/* 右侧：AI 对话动画 */}
                <div style={{
                    width: chatPanelWidth,
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    opacity: chatPanelOpacity,
                }}>
                    <div style={{
                        background: "#161b22",
                        borderRadius: "12px",
                        border: "1px solid rgba(88,166,255,0.2)",
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "10px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                            <span style={{ marginLeft: 8, color: THEME.textSecondary, fontSize: 18 }}>Claude Code</span>
                        </div>
                        <div style={{
                            flex: 1,
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}>
                            {/* 用户消息 */}
                            {frame >= CHAT_SHOW_START + 35 && (
                                <div style={{
                                    alignSelf: "flex-end",
                                    background: THEME.accent,
                                    color: "#fff",
                                    borderRadius: "12px 12px 2px 12px",
                                    padding: "10px 14px",
                                    maxWidth: "85%",
                                    fontSize: "20px",
                                }}>
                                    {getTypingText(msg1, CHAT_SHOW_START + 35, 1.5)}
                                </div>
                            )}
                            {/* Skill 触发提示 */}
                            {frame >= CHAT_SHOW_START + 70 && (
                                <div style={{
                                    alignSelf: "center",
                                    background: "rgba(63,185,80,0.1)",
                                    border: "1px solid rgba(63,185,80,0.3)",
                                    color: "#3fb950",
                                    borderRadius: "8px",
                                    padding: "6px 14px",
                                    fontSize: "18px",
                                }}>
                                    ⚡ 已加载 weather-assistant Skill
                                </div>
                            )}
                            {/* AI 回复 */}
                            {frame >= CHAT_SHOW_START + 90 && (
                                <div style={{
                                    alignSelf: "flex-start",
                                    background: "rgba(88,166,255,0.15)",
                                    border: "1px solid rgba(88,166,255,0.3)",
                                    color: THEME.textPrimary,
                                    borderRadius: "12px 12px 12px 2px",
                                    padding: "10px 14px",
                                    maxWidth: "85%",
                                    fontSize: "19px",
                                    whiteSpace: "pre-line",
                                }}>
                                    {getTypingText(msg2, CHAT_SHOW_START + 90, 1.2)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
