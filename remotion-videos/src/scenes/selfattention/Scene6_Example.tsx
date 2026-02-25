import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene6_Example: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const sentenceOpacity = interpolate(frame, [15, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    const highlightOpacity = interpolate(frame, [45, 60], [0, 1], {
        extrapolateRight: "clamp",
    });

    const resultOpacity = interpolate(frame, [60, 75], [0, 1], {
        extrapolateRight: "clamp",
    });

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
                        marginBottom: 48,
                        opacity: titleOpacity
                    }}
                >
                    💡 工作原理示例
                </h2>
                <div
                    style={{
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 16,
                        padding: 32,
                        marginBottom: 40,
                        opacity: sentenceOpacity
                    }}
                >
                    <p style={{ fontSize: 32, color: "#bfdbfe", lineHeight: 1.6 }}>
                        The <span style={{ color: "#60a5fa" }}>animal</span> didn't cross the street because <span style={{ color: "#fbbf24", fontWeight: "bold" }}>it</span> was too tired
                    </p>
                </div>
                <div style={{ opacity: highlightOpacity }}>
                    <p style={{ fontSize: 40, color: "#fbbf24", marginBottom: 24 }}>
                        当处理 "it" 时...
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
                        <div style={{
                            background: "rgba(96, 165, 250, 0.3)",
                            borderRadius: 16,
                            padding: 24,
                            width: 200
                        }}>
                            <p style={{ fontSize: 48, fontWeight: "bold", color: "#60a5fa" }}>animal</p>
                            <p style={{ fontSize: 32, color: "#bfdbfe" }}>45%</p>
                        </div>
                        <div style={{
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: 16,
                            padding: 24,
                            width: 200
                        }}>
                            <p style={{ fontSize: 36, color: "#94a3b8" }}>it</p>
                            <p style={{ fontSize: 28, color: "#94a3b8" }}>26%</p>
                        </div>
                        <div style={{
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: 16,
                            padding: 24,
                            width: 200
                        }}>
                            <p style={{ fontSize: 36, color: "#94a3b8" }}>其他</p>
                            <p style={{ fontSize: 28, color: "#94a3b8" }}>29%</p>
                        </div>
                    </div>
                </div>
                <p
                    style={{
                        fontSize: 36,
                        color: "#34d399",
                        marginTop: 32,
                        opacity: resultOpacity
                    }}
                >
                    ✓ it → animal (正确指代!)
                </p>
            </div>
        </AbsoluteFill>
    );
};
