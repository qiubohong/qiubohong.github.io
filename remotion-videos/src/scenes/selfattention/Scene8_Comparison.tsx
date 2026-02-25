import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene8_Comparison: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const tableOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const highlightOpacity = interpolate(frame, [50, 70], [0, 1], {
        extrapolateRight: "clamp",
    });

    const features = [
        { name: "计算方式", rnn: "串行", cnn: "局部并行", self: "全局并行" },
        { name: "长距离依赖", rnn: "困难", cnn: "需堆叠", self: "一步到位" },
        { name: "可解释性", rnn: "低", cnn: "低", self: "高" },
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
                        marginBottom: 48,
                        opacity: titleOpacity
                    }}
                >
                    ⚖️ 与传统方法对比
                </h2>
                <div style={{ opacity: tableOpacity }}>
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 16,
                        overflow: "hidden"
                    }}>
                        <thead>
                            <tr style={{ background: "rgba(251, 191, 36, 0.3)" }}>
                                <th style={{ padding: 20, fontSize: 32, color: "white" }}>特性</th>
                                <th style={{ padding: 20, fontSize: 32, color: "#bfdbfe" }}>RNN/LSTM</th>
                                <th style={{ padding: 20, fontSize: 32, color: "#bfdbfe" }}>CNN</th>
                                <th style={{ padding: 20, fontSize: 32, color: "#fbbf24" }}>Self-Attention</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((row, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                    <td style={{ padding: 20, fontSize: 28, color: "white" }}>{row.name}</td>
                                    <td style={{ padding: 20, fontSize: 28, color: "#94a3b8" }}>{row.rnn}</td>
                                    <td style={{ padding: 20, fontSize: 28, color: "#94a3b8" }}>{row.cnn}</td>
                                    <td style={{ padding: 20, fontSize: 28, color: "#34d399", fontWeight: "bold" }}>{row.self}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p
                    style={{
                        fontSize: 32,
                        color: "#f87171",
                        marginTop: 32,
                        opacity: highlightOpacity
                    }}
                >
                    ⚠️ 代价：计算复杂度 O(n²)
                </p>
            </div>
        </AbsoluteFill>
    );
};
