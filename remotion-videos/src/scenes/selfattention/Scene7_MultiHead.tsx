import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene7_MultiHead: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const heads = [
        { num: "1", focus: "语法关系", delay: 20 },
        { num: "2", focus: "语义相似性", delay: 30 },
        { num: "3", focus: "位置关系", delay: 40 },
        { num: "4", focus: "长距离依赖", delay: 50 },
    ];

    const concatOpacity = interpolate(frame, [65, 80], [0, 1], {
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
                    👥 多头注意力
                </h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 40 }}>
                    {heads.map((head, index) => {
                        const headOpacity = interpolate(frame, [head.delay, head.delay + 15], [0, 1], {
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div
                                key={index}
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    borderRadius: 16,
                                    padding: 24,
                                    width: 180,
                                    opacity: headOpacity
                                }}
                            >
                                <div style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    background: "#fbbf24",
                                    margin: "0 auto 16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 32,
                                    fontWeight: "bold",
                                    color: "#1e3a8a"
                                }}>
                                    {head.num}
                                </div>
                                <p style={{ fontSize: 24, color: "#bfdbfe" }}>{head.focus}</p>
                            </div>
                        );
                    })}
                </div>
                <div
                    style={{
                        background: "rgba(251, 191, 36, 0.2)",
                        borderRadius: 16,
                        padding: 24,
                        opacity: concatOpacity
                    }}
                >
                    <p style={{ fontSize: 36, color: "#fbbf24" }}>
                        🔗 所有头的输出拼接 → 多角度理解输入
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
