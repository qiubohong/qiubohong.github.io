import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene9_Summary: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const contentOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const highlightOpacity = interpolate(frame, [45, 60], [0, 1], {
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
                    🎯 总结与展望
                </h2>
                <div
                    style={{
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 24,
                        padding: 40,
                        marginBottom: 40,
                        opacity: contentOpacity
                    }}
                >
                    <p style={{ fontSize: 40, color: "#bfdbfe", lineHeight: 1.6 }}>
                        Self-Attention让模型学会了<br />
                        <span style={{ color: "#fbbf24", fontWeight: "bold" }}>\"重点关注\"</span>这一人类最基本的认知能力
                    </p>
                </div>
                <div
                    style={{
                        background: "rgba(52, 211, 153, 0.2)",
                        borderRadius: 16,
                        padding: 24,
                        opacity: highlightOpacity
                    }}
                >
                    <p style={{ fontSize: 36, color: "#34d399" }}>
                        🚀 从2017年至今，它已彻底改变NLP领域<br />
                        成为<span style={{ fontWeight: "bold" }}>大模型时代的技术基石</span>
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
