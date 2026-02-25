import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene2_Applications: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const items = [
        { name: "Transformer", use: "机器翻译", delay: 15 },
        { name: "BERT", use: "文本理解", delay: 30 },
        { name: "GPT系列", use: "文本生成", delay: 45 },
        { name: "Vision Transformer", use: "图像识别", delay: 60 },
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
                    📊 广泛应用场景
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                    {items.map((item, index) => {
                        const itemOpacity = interpolate(frame, [item.delay, item.delay + 15], [0, 1], {
                            extrapolateRight: "clamp",
                        });
                        return (
                            <div
                                key={index}
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    borderRadius: 16,
                                    padding: 32,
                                    opacity: itemOpacity
                                }}
                            >
                                <h3 style={{ fontSize: 48, color: "#fbbf24", marginBottom: 16 }}>
                                    {item.name}
                                </h3>
                                <p style={{ fontSize: 32, color: "#bfdbfe" }}>{item.use}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
