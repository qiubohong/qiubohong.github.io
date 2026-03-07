import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene5_Architectures: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 三种架构
    const architectures = [
        {
            name: "Decoder-Only",
            models: "GPT / LLaMA",
            feature: "自回归生成流畅",
            usage: "创作 / 对话",
            color: "#f0883e",
            example: "ChatGPT",
        },
        {
            name: "Encoder-Only",
            models: "BERT",
            feature: "双向语义理解强",
            usage: "分类 / 情感分析",
            color: "#58a6ff",
            example: "搜索排序",
        },
        {
            name: "Encoder-Decoder",
            models: "T5",
            feature: "输入输出转换灵活",
            usage: "翻译 / 摘要",
            color: "#3fb950",
            example: "机器翻译",
        },
    ];

    // 总结语动画
    const summaryOpacity = interpolate(frame, [180, 210], [0, 1], {
        extrapolateRight: "clamp",
    });

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
                LLM三大架构对比
            </h1>

            {/* 架构卡片 */}
            <div style={{
                display: "flex",
                gap: 40,
                width: "100%",
                justifyContent: "center",
            }}>
                {architectures.map((arch, index) => {
                    const startFrame = 30 + index * 50;
                    const opacity = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
                        extrapolateRight: "clamp",
                    });
                    const scale = interpolate(frame, [startFrame, startFrame + 30], [0.9, 1], {
                        extrapolateRight: "clamp",
                        easing: Easing.out(Easing.cubic),
                    });

                    return (
                        <div key={index} style={{
                            opacity,
                            transform: `scale(${scale})`,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 20,
                            padding: 32,
                            width: 380,
                            border: `1px solid ${arch.color}33`,
                        }}>
                            <div style={{
                                fontSize: 28,
                                color: arch.color,
                                fontWeight: 600,
                                marginBottom: 16,
                            }}>
                                {arch.name}
                            </div>
                            <div style={{
                                fontSize: 20,
                                color: "#8b949e",
                                marginBottom: 12,
                            }}>
                                {arch.models}
                            </div>
                            <div style={{
                                fontSize: 22,
                                color: "#c9d1d9",
                                marginBottom: 12,
                            }}>
                                {arch.feature}
                            </div>
                            <div style={{
                                fontSize: 18,
                                color: "#58a6ff",
                                marginBottom: 16,
                            }}>
                                最佳场景：{arch.usage}
                            </div>
                            <div style={{
                                fontSize: 16,
                                color: "#6e7681",
                                padding: "8px 16px",
                                background: "rgba(255,255,255,0.04)",
                                borderRadius: 8,
                                display: "inline-block",
                            }}>
                                案例：{arch.example}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 总结语 */}
            <div style={{
                marginTop: 50,
                opacity: summaryOpacity,
                padding: "20px 40px",
                background: "rgba(240, 136, 62, 0.1)",
                borderRadius: 12,
                border: "1px solid rgba(240, 136, 62, 0.3)",
            }}>
                <span style={{
                    fontSize: 26,
                    color: "#f0883e",
                    fontWeight: 500,
                }}>
                    要生成选Decoder，重理解用Encoder，复杂转换需双全
                </span>
            </div>
        </AbsoluteFill>
    );
};
