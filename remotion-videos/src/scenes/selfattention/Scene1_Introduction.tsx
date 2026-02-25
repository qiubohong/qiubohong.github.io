import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const highlightOpacity = interpolate(frame, [40, 60], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #1e3a8a, #581c87, #3730a3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ textAlign: "center", paddingLeft: 48, paddingRight: 48 }}>
                <h1
                    style={{
                        fontSize: 84,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 32,
                        opacity: titleOpacity
                    }}
                >
                    🧠 自我注意力机制
                </h1>
                <p
                    style={{
                        fontSize: 48,
                        color: "#bfdbfe",
                        fontWeight: 500,
                        opacity: subtitleOpacity
                    }}
                >
                    Self-Attention
                </p>
                <p
                    style={{
                        fontSize: 36,
                        color: "#fbbf24",
                        fontWeight: 400,
                        marginTop: 24,
                        opacity: highlightOpacity
                    }}
                >
                    5分钟AI，每天搞懂一个知识点(11)
                </p>
            </div>
        </AbsoluteFill>
    );
};
