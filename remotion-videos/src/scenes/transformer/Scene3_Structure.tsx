import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene3_Structure: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const component1Opacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const component2Opacity = interpolate(frame, [50, 70], [0, 1], {
        extrapolateRight: "clamp",
    });

    const component3Opacity = interpolate(frame, [80, 100], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #312e81, #581c87, #831843)",
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
                        marginBottom: 48,
                        opacity: titleOpacity
                    }}
                >
                    Transformer的三大核心组件
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1024, margin: "0 auto" }}>
                    {/* Encoder */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 32,
                            textAlign: "left",
                            opacity: component1Opacity
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ fontSize: 60 }}>🧠</div>
                            <div>
                                <div style={{ fontSize: 48, fontWeight: "bold", color: "#93c5fd", marginBottom: 8 }}>Encoder 编码器</div>
                                <div style={{ fontSize: 24, color: "#d1d5db" }}>理解者：将输入转化为结构化知识</div>
                            </div>
                        </div>
                    </div>

                    {/* Self-Attention */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 32,
                            textAlign: "left",
                            opacity: component2Opacity
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ fontSize: 60 }}>🔗</div>
                            <div>
                                <div style={{ fontSize: 48, fontWeight: "bold", color: "#86efac", marginBottom: 8 }}>Self-Attention 自注意力</div>
                                <div style={{ fontSize: 24, color: "#d1d5db" }}>协商者：建立动态连接</div>
                            </div>
                        </div>
                    </div>

                    {/* Decoder */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 32,
                            textAlign: "left",
                            opacity: component3Opacity
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ fontSize: 60 }}>✨</div>
                            <div>
                                <div style={{ fontSize: 48, fontWeight: "bold", color: "#d8b4fe", marginBottom: 8 }}>Decoder 解码器</div>
                                <div style={{ fontSize: 24, color: "#d1d5db" }}>创造者：生成新内容</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
