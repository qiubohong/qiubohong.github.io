import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene3_CoreConcepts: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const concepts = [
        { symbol: "Q", name: "Query", desc: "当前词的\"问题\"", delay: 20 },
        { symbol: "K", name: "Key", desc: "每个词的\"标签\"", delay: 35 },
        { symbol: "V", name: "Value", desc: "实际要传递的信息", delay: 50 },
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
                    🔑 核心概念
                </h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
                    {concepts.map((concept, index) => {
                        const conceptOpacity = interpolate(frame, [concept.delay, concept.delay + 15], [0, 1], {
                            extrapolateRight: "clamp",
                        });
                        const conceptScale = interpolate(frame, [concept.delay, concept.delay + 20], [0.8, 1], {
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div
                                key={index}
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    borderRadius: 24,
                                    padding: 40,
                                    textAlign: "center",
                                    opacity: conceptOpacity,
                                    transform: `scale(${conceptScale})`,
                                    width: 280
                                }}
                            >
                                <div style={{
                                    fontSize: 80,
                                    fontWeight: "bold",
                                    color: "#fbbf24",
                                    marginBottom: 16
                                }}>
                                    {concept.symbol}
                                </div>
                                <h3 style={{ fontSize: 40, color: "white", marginBottom: 12 }}>
                                    {concept.name}
                                </h3>
                                <p style={{ fontSize: 28, color: "#bfdbfe" }}>{concept.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
