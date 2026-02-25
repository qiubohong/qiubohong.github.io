import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene4_Innovation: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const innovation1Opacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const innovation2Opacity = interpolate(frame, [50, 70], [0, 1], {
        extrapolateRight: "clamp",
    });

    const speedBoostOpacity = interpolate(frame, [80, 100], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #064e3b, #115e59, #164e63)",
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
                    两大创新突破
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 1024, margin: "0 auto" }}>
                    {/* 创新1 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 32,
                            opacity: innovation1Opacity
                        }}
                    >
                        <div style={{ fontSize: 60, marginBottom: 16 }}>💡</div>
                        <div style={{ fontSize: 48, fontWeight: "bold", color: "#fde047", marginBottom: 12 }}>抛弃循环结构</div>
                        <div style={{ fontSize: 36, color: "#d1d5db" }}>所有词同时计算关联性</div>
                    </div>

                    {/* 创新2 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 32,
                            opacity: innovation2Opacity
                        }}
                    >
                        <div style={{ fontSize: 60, marginBottom: 16 }}>📐</div>
                        <div style={{ fontSize: 48, fontWeight: "bold", color: "#93c5fd", marginBottom: 12 }}>位置编码</div>
                        <div style={{ fontSize: 36, color: "#d1d5db" }}>正弦/余弦波替代时间步顺序</div>
                    </div>

                    {/* 速度提升 */}
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: 16,
                            opacity: speedBoostOpacity
                        }}
                    >
                        <div style={{ fontSize: 72, fontWeight: "bold", color: "#4ade80" }}>训练速度提升 10倍！🚀</div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
