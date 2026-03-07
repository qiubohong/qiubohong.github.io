import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene6_FunFacts: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 冷知识数据
    const funFacts = [
        {
            icon: "⚡",
            title: "能耗对比",
            content: "训练GPT-3耗电≈纽约⇄旧金山航班200次",
            highlight: "推理仅需0.005度电",
            color: "#f0883e",
        },
        {
            icon: "📚",
            title: "中文优势",
            content: "DeepSeek古文生成超GPT-4",
            highlight: "训练数据含《四库全书》",
            color: "#58a6ff",
        },
        {
            icon: "🛡️",
            title: "幻觉防御",
            content: "金融LLM错误率＜0.1%",
            highlight: "规则约束+概率阈值",
            color: "#3fb950",
        },
    ];

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            padding: 50,
        }}>
            {/* 标题 */}
            <h1 style={{
                fontSize: 56,
                fontWeight: "bold",
                color: "white",
                marginBottom: 50,
                opacity: titleOpacity,
                background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                冷知识分享 🔍
            </h1>

            {/* 冷知识卡片 */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 30,
                width: "80%",
                maxWidth: 900,
            }}>
                {funFacts.map((fact, index) => {
                    const startFrame = 30 + index * 60;
                    const opacity = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
                        extrapolateRight: "clamp",
                    });
                    const x = interpolate(frame, [startFrame, startFrame + 30], [-50, 0], {
                        extrapolateRight: "clamp",
                        easing: Easing.out(Easing.cubic),
                    });

                    return (
                        <div key={index} style={{
                            opacity,
                            transform: `translateX(${x}px)`,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 16,
                            padding: 28,
                            border: `1px solid ${fact.color}33`,
                            display: "flex",
                            alignItems: "center",
                            gap: 24,
                        }}>
                            <div style={{
                                fontSize: 48,
                                width: 80,
                                textAlign: "center",
                            }}>
                                {fact.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: 26,
                                    color: fact.color,
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }}>
                                    {fact.title}
                                </div>
                                <div style={{
                                    fontSize: 20,
                                    color: "#c9d1d9",
                                    marginBottom: 6,
                                }}>
                                    {fact.content}
                                </div>
                                <div style={{
                                    fontSize: 18,
                                    color: "#ffd200",
                                    fontWeight: 500,
                                }}>
                                    {fact.highlight}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
