import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene5_Applications: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    const app1Opacity = interpolate(frame, [20, 35], [0, 1], {
        extrapolateRight: "clamp",
    });

    const app2Opacity = interpolate(frame, [40, 55], [0, 1], {
        extrapolateRight: "clamp",
    });

    const app3Opacity = interpolate(frame, [60, 75], [0, 1], {
        extrapolateRight: "clamp",
    });

    const app4Opacity = interpolate(frame, [80, 95], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(to bottom right, #7c2d12, #991b1b, #831843)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ textAlign: "center", paddingLeft: 48, paddingRight: 48, width: "100%" }}>
                <h2
                    style={{
                        fontSize: 72,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 40,
                        opacity: titleOpacity
                    }}
                >
                    改变世界的应用
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 1152, margin: "0 auto" }}>
                    {/* Google 翻译 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 24,
                            opacity: app1Opacity
                        }}
                    >
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🌐</div>
                        <div style={{ fontSize: 36, fontWeight: "bold", color: "#93c5fd", marginBottom: 8 }}>Google 翻译</div>
                        <div style={{ fontSize: 24, color: "#4ade80" }}>长句流畅度 ↑37%</div>
                    </div>

                    {/* GPT-4 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 24,
                            opacity: app2Opacity
                        }}
                    >
                        <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
                        <div style={{ fontSize: 36, fontWeight: "bold", color: "#d8b4fe", marginBottom: 8 }}>GPT-4</div>
                        <div style={{ fontSize: 24, color: "#4ade80" }}>生成连贯性 ↑82%</div>
                    </div>

                    {/* ViT 图像识别 */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 24,
                            opacity: app3Opacity
                        }}
                    >
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
                        <div style={{ fontSize: 36, fontWeight: "bold", color: "#fde047", marginBottom: 8 }}>ViT 图像识别</div>
                        <div style={{ fontSize: 24, color: "#4ade80" }}>错误率 ↓15%</div>
                    </div>

                    {/* AlphaFold */}
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 16,
                            padding: 24,
                            opacity: app4Opacity
                        }}
                    >
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🧬</div>
                        <div style={{ fontSize: 36, fontWeight: "bold", color: "#86efac", marginBottom: 8 }}>AlphaFold</div>
                        <div style={{ fontSize: 24, color: "#4ade80" }}>超越实验方法</div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
