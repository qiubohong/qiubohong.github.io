import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene5_Formula: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const formulaOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const explanationOpacity = interpolate(frame, [50, 70], [0, 1], {
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
                        marginBottom: 60,
                        opacity: titleOpacity
                    }}
                >
                    📐 核心公式
                </h2>
                <div
                    style={{
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 24,
                        padding: 48,
                        marginBottom: 40,
                        opacity: formulaOpacity
                    }}
                >
                    <p style={{
                        fontSize: 48,
                        color: "#fbbf24",
                        fontFamily: "monospace",
                        fontWeight: "bold"
                    }}>
                        Attention(Q,K,V) = softmax(QK<sup>T</sup>/√d<sub>k</sub>)V
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 40,
                        opacity: explanationOpacity
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 36, color: "#bfdbfe" }}>Q、K、V</p>
                        <p style={{ fontSize: 28, color: "#94a3b8" }}>查询、键、值矩阵</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 36, color: "#bfdbfe" }}>d<sub>k</sub></p>
                        <p style={{ fontSize: 28, color: "#94a3b8" }}>键向量维度</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 36, color: "#bfdbfe" }}>softmax</p>
                        <p style={{ fontSize: 28, color: "#94a3b8" }}>归一化函数</p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
