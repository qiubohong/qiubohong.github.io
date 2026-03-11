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

export const OpenClaw_Scene2_Comparison: React.FC = () => {
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
    const leftCardOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const leftCardSlide = interpolate(frame, [30, 60], [-50, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const rightCardOpacity = interpolate(frame, [50, 80], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const rightCardSlide = interpolate(frame, [50, 80], [50, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const vsOpacity = interpolate(frame, [40, 70], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const summaryOpacity = interpolate(frame, [100, 130], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const summarySlide = interpolate(frame, [100, 130], [30, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 高亮闪烁
    const highlight = 0.7 + Math.sin(frame * 0.15) * 0.3;
    // 脉冲缩放
    const pulse = 1 + Math.sin(frame * 0.08) * 0.03;

    return (
        <AbsoluteFill
            style={{
                background: THEME.bg,
                fontFamily: THEME.fontFamily,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "40px 52px",
                boxSizing: "border-box",
                gap: "20px",
            }}
        >
            {/* 背景装饰 */}
            <div style={{
                position: "absolute", top: "-200px", left: "50%",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
                transform: "translateX(-50%)",
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
                    fontSize: "60px",
                    fontWeight: "bold",
                    margin: "0 0 8px 0",
                    background: THEME.titleGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    OpenClaw 到底有什么不同？
                </h1>
                <p style={{ fontSize: "26px", color: THEME.textSecondary, margin: 0 }}>
                    一个给建议，一个真的帮你<span style={{ color: `rgba(240,136,62,${highlight})`, fontWeight: "bold" }}>执行</span>
                </p>
            </div>

            {/* 分屏对比 */}
            <div style={{
                display: "flex",
                gap: "24px",
                flex: 1,
                minHeight: 0,
            }}>
                {/* 左侧：普通 AI */}
                <div style={{
                    flex: 1,
                    opacity: leftCardOpacity,
                    transform: `translateX(${leftCardSlide}px)`,
                    background: "rgba(139,148,158,0.08)",
                    borderRadius: "20px",
                    padding: "28px",
                    border: "1px solid rgba(139,148,158,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "48px", marginBottom: "8px" }}>💬</div>
                        <h2 style={{ fontSize: "32px", color: THEME.textSecondary, fontWeight: "bold", margin: 0 }}>
                            ❌ 普通 AI
                        </h2>
                        <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: "6px 0 0 0" }}>
                            问答型 · 每次都要你推动
                        </p>
                    </div>
                    <div style={{
                        background: "rgba(139,148,158,0.1)",
                        borderRadius: "12px",
                        padding: "16px",
                        flex: 1,
                    }}>
                        <p style={{ fontSize: "20px", color: THEME.textSecondary, margin: "0 0 12px 0", fontWeight: "bold" }}>
                            你说：帮我整理这周的邮件
                        </p>
                        <div style={{
                            background: "rgba(139,148,158,0.15)",
                            borderRadius: "8px",
                            padding: "12px",
                            borderLeft: "3px solid rgba(139,148,158,0.4)",
                        }}>
                            <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: 0, lineHeight: 1.6 }}>
                                "您可以按照以下步骤整理邮件：<br />
                                1. 先按发件人分类<br />
                                2. 再按重要程度排序<br />
                                3. 删除垃圾邮件..."
                            </p>
                        </div>
                        <p style={{ fontSize: "18px", color: THEME.textSecondary, margin: "12px 0 0 0", textAlign: "center" }}>
                            📝 给你一段建议文字
                        </p>
                    </div>
                </div>

                {/* VS 分隔 */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: vsOpacity,
                    flexShrink: 0,
                }}>
                    <div style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: THEME.accent,
                        transform: `scale(${pulse})`,
                        background: "rgba(240,136,62,0.1)",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid rgba(240,136,62,0.3)",
                    }}>VS</div>
                </div>

                {/* 右侧：OpenClaw */}
                <div style={{
                    flex: 1,
                    opacity: rightCardOpacity,
                    transform: `translateX(${rightCardSlide}px)`,
                    background: "rgba(88,166,255,0.08)",
                    borderRadius: "20px",
                    padding: "28px",
                    border: "1px solid rgba(88,166,255,0.25)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "48px", marginBottom: "8px" }}>🦞</div>
                        <h2 style={{ fontSize: "32px", color: "#58a6ff", fontWeight: "bold", margin: 0 }}>
                            ✅ OpenClaw
                        </h2>
                        <p style={{ fontSize: "20px", color: THEME.textPrimary, margin: "6px 0 0 0" }}>
                            行动型 · 自主执行到完成
                        </p>
                    </div>
                    <div style={{
                        background: "rgba(88,166,255,0.08)",
                        borderRadius: "12px",
                        padding: "16px",
                        flex: 1,
                    }}>
                        <p style={{ fontSize: "20px", color: THEME.textPrimary, margin: "0 0 12px 0", fontWeight: "bold" }}>
                            你说：帮我整理这周的邮件
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {[
                                { icon: "📬", text: "打开你的邮箱" },
                                { icon: "📊", text: "按优先级自动分类" },
                                { icon: "📋", text: "生成摘要发给你" },
                                { icon: "🗑️", text: "垃圾邮件移到回收站" },
                            ].map((item, i) => {
                                const itemOpacity = interpolate(frame, [80 + i * 15, 100 + i * 15], [0, 1], {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                });
                                return (
                                    <div key={i} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        background: "rgba(88,166,255,0.1)",
                                        borderRadius: "8px",
                                        padding: "8px 12px",
                                        opacity: itemOpacity,
                                        borderLeft: "3px solid rgba(88,166,255,0.5)",
                                    }}>
                                        <span style={{ fontSize: "20px" }}>{item.icon}</span>
                                        <span style={{ fontSize: "18px", color: THEME.textPrimary }}>{item.text}</span>
                                        <span style={{ marginLeft: "auto", fontSize: "16px", color: "#3fb950" }}>✓</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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
                    background: "linear-gradient(135deg, rgba(88,166,255,0.1) 0%, rgba(240,136,62,0.1) 100%)",
                    borderRadius: "12px",
                    padding: "14px 32px",
                    border: "1px solid rgba(88,166,255,0.2)",
                }}>
                    <p style={{ fontSize: "24px", color: THEME.textPrimary, margin: 0, fontWeight: "bold" }}>
                        🎯 口号：<span style={{ color: "#58a6ff" }}>The AI that actually does things</span>
                        <span style={{ color: THEME.textSecondary, fontSize: "20px" }}> — 真正干活的 AI</span>
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
