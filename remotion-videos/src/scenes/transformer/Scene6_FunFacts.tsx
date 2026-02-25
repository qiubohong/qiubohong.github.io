import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene6_FunFacts: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const fact1Opacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const fact2Opacity = interpolate(frame, [60, 80], [0, 1], {
        extrapolateRight: "clamp",
    });

    const fact3Opacity = interpolate(frame, [100, 120], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #78350f, #92400e, #c2410c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ textAlign: "center", paddingLeft: 48, paddingRight: 48, width: "100%" }}>
                <h2
                    style={{
                        fontSize: 72,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 40,
                        opacity: titleOpacity
                    }}
                >
                    🎉 你不知道的Transformer趣事
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1024, margin: "0 auto" }}>
                    {/* 冷知识1 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 24,
                            textAlign: "left",
                            opacity: fact1Opacity
                        }}
                    >
                        <div style={{ fontSize: 36, color: "#fde047", marginBottom: 8 }}>💡 0.2分的胜利</div>
                        <div style={{ fontSize: 24, color: "#d1d5db" }}>
                            Transformer仅比LSTM高0.2分，但因<span style={{ color: "#4ade80", fontWeight: "bold" }}>10倍训练速度</span>引发革命！
                        </div>
                    </div>

                    {/* 冷知识2 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 24,
                            textAlign: "left",
                            opacity: fact2Opacity
                        }}
                    >
                        <div style={{ fontSize: 36, color: "#93c5fd", marginBottom: 8 }}>⚡ 能耗对比</div>
                        <div style={{ fontSize: 24, color: "#d1d5db" }}>
                            训练BERT-Large ≈ <span style={{ color: "#f87171", fontWeight: "bold" }}>纽约⇄旧金山40次航班</span>，
                            但推理单次仅需<span style={{ color: "#4ade80", fontWeight: "bold" }}>0.005度电</span>
                        </div>
                    </div>

                    {/* 冷知识3 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 24,
                            textAlign: "left",
                            opacity: fact3Opacity
                        }}
                    >
                        <div style={{ fontSize: 36, color: "#d8b4fe", marginBottom: 8 }}>🎯 注意力头的专长</div>
                        <div style={{ fontSize: 24, color: "#d1d5db" }}>
                            头1：主谓一致 | 头4：介词搭配 | 头7：指代关系
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
