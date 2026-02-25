import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene4_Workflow: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const steps = [
        { num: "1", text: "线性变换 → Q、K、V矩阵", delay: 20 },
        { num: "2", text: "计算相似度 → Q × K^T", delay: 35 },
        { num: "3", text: "缩放归一化 → Softmax", delay: 50 },
        { num: "4", text: "加权求和 → 权重 × V", delay: 65 },
    ];

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #1e3a8a, #581c87, #3730a3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ textAlign: "center", paddingLeft: 48, paddingRight: 48, width: "100%" }}>
                <h2
                    style={{
                        fontSize: 64,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 60,
                        opacity: titleOpacity
                    }}
                >
                    ⚙️ 计算流程
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {steps.map((step, index) => {
                        const stepOpacity = interpolate(frame, [step.delay, step.delay + 15], [0, 1], {
                            extrapolateRight: "clamp",
                        });
                        const stepX = interpolate(frame, [step.delay, step.delay + 20], [-50, 0], {
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div
                                key={index}
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    borderRadius: 16,
                                    padding: 24,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 24,
                                    opacity: stepOpacity,
                                    transform: `translateX(${stepX}px)`,
                                }}
                            >
                                <div style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    background: "#fbbf24",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 32,
                                    fontWeight: "bold",
                                    color: "#1e3a8a"
                                }}>
                                    {step.num}
                                </div>
                                <span style={{ fontSize: 36, color: "white" }}>{step.text}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
