import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene7_Ending: React.FC = () => {
    const frame = useCurrentFrame();

    const quoteOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    const ctaOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateRight: "clamp",
    });

    const ctaScale = interpolate(frame, [30, 50], [0.8, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #581c87, #3730a3, #1e40af)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ textAlign: "center", paddingLeft: 48, paddingRight: 48 }}>
                <div
                    style={{
                        marginBottom: 48,
                        opacity: quoteOpacity
                    }}
                >
                    <div style={{ fontSize: 48, color: "#d1d5db", fontStyle: "italic", marginBottom: 16 }}>
                        "Transformer的并行化设计，
                    </div>
                    <div style={{ fontSize: 48, color: "#d1d5db", fontStyle: "italic", marginBottom: 16 }}>
                        是AI从手工作坊走向工业化大生产的关键转折"
                    </div>
                    <div style={{ fontSize: 36, color: "#93c5fd", marginTop: 24 }}>
                        —— Andrej Karpathy (特斯拉AI总监)
                    </div>
                </div>

                <div
                    style={{
                        marginTop: 64,
                        opacity: ctaOpacity,
                        transform: `scale(${ctaScale})`,
                    }}
                >
                    <div style={{ fontSize: 60, fontWeight: "bold", color: "white", marginBottom: 16 }}>
                        关注我，每天5分钟
                    </div>
                    <div style={{ fontSize: 72, fontWeight: "bold", color: "#facc15" }}>
                        搞懂一个AI知识点！🚀
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
