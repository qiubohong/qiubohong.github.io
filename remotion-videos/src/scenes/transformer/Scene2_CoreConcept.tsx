import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene2_CoreConcept: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const rnnScale = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const transformerScale = interpolate(frame, [60, 80], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #111827, #1e293b, #111827)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ textAlign: "center", paddingLeft: 48, paddingRight: 48 }}>
                <h2
                    style={{
                        fontSize: 72,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 64,
                        opacity: titleOpacity
                    }}
                >
                    串行 vs 并行：革命性的转变
                </h2>

                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", maxWidth: 1152 }}>
                    {/* RNN 串行 */}
                    <div
                        style={{
                            textAlign: "center",
                            opacity: rnnScale,
                            transform: `scale(${rnnScale})`,
                        }}
                    >
                        <div style={{ fontSize: 60, marginBottom: 16 }}>🐌</div>
                        <div style={{ fontSize: 36, color: "#f87171", fontWeight: "bold", marginBottom: 8 }}>RNN 串行</div>
                        <div style={{ fontSize: 24, color: "#9ca3af" }}>一个→一个→一个</div>
                    </div>

                    {/* 箭头 */}
                    <div style={{ fontSize: 72, color: "#facc15" }}>→</div>

                    {/* Transformer 并行 */}
                    <div
                        style={{
                            textAlign: "center",
                            opacity: transformerScale,
                            transform: `scale(${transformerScale})`,
                        }}
                    >
                        <div style={{ fontSize: 60, marginBottom: 16 }}>🚀</div>
                        <div style={{ fontSize: 36, color: "#4ade80", fontWeight: "bold", marginBottom: 8 }}>Transformer 并行</div>
                        <div style={{ fontSize: 24, color: "#9ca3af" }}>全部同时计算</div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
