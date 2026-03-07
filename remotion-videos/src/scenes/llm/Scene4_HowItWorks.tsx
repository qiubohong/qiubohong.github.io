import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile, Easing } from "remotion";

export const Scene4_HowItWorks: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 四个步骤
    const steps = [
        { name: "分词", en: "Tokenization", desc: "BPE算法拆解文本", color: "#f0883e" },
        { name: "嵌入", en: "Embedding", desc: "映射高维向量", color: "#58a6ff" },
        { name: "堆叠", en: "Transformer", desc: "自注意力计算", color: "#3fb950" },
        { name: "预测", en: "Next Token", desc: "概率分布输出", color: "#f778ba" },
    ];

    // 图片显示
    const imageOpacity = interpolate(frame, [150, 180], [0, 1], {
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
                marginBottom: 40,
                opacity: titleOpacity,
                background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                LLM如何工作？
            </h1>

            {/* 流程图 */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 40,
            }}>
                {steps.map((step, index) => {
                    const startFrame = 30 + index * 35;
                    const opacity = interpolate(frame, [startFrame, startFrame + 25], [0, 1], {
                        extrapolateRight: "clamp",
                    });
                    const scale = interpolate(frame, [startFrame, startFrame + 25], [0.8, 1], {
                        extrapolateRight: "clamp",
                        easing: Easing.out(Easing.back(1.5)),
                    });

                    return (
                        <React.Fragment key={index}>
                            <div style={{
                                opacity,
                                transform: `scale(${scale})`,
                                background: "rgba(255,255,255,0.06)",
                                borderRadius: 16,
                                padding: 24,
                                textAlign: "center",
                                border: `1px solid ${step.color}33`,
                                minWidth: 200,
                            }}>
                                <div style={{
                                    fontSize: 28,
                                    color: step.color,
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }}>
                                    {step.name}
                                </div>
                                <div style={{
                                    fontSize: 16,
                                    color: "#8b949e",
                                    marginBottom: 8,
                                }}>
                                    {step.en}
                                </div>
                                <div style={{
                                    fontSize: 18,
                                    color: "#c9d1d9",
                                }}>
                                    {step.desc}
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div style={{
                                    fontSize: 32,
                                    color: "#58a6ff",
                                    opacity: interpolate(frame, [startFrame + 20, startFrame + 30], [0, 1], {
                                        extrapolateRight: "clamp",
                                    }),
                                }}>
                                    →
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* 工作流程图 */}
            <div style={{
                opacity: imageOpacity,
                marginTop: 20,
            }}>
                <Img
                    src={staticFile("LLMVideo/scene4-image.png")}
                    style={{
                        width: 700,
                        borderRadius: 12,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
