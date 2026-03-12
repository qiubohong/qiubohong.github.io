import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene5_UseCase: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题淡入
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 问题卡片淡入
    const problemOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 效果数据淡入
    const resultOpacity = interpolate(frame, [60, 80], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 图片淡入
    const imageOpacity = interpolate(frame, [90, 120], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: 'Noto Sans SC, Arial, sans-serif',
            padding: "40px 80px",
            overflow: "hidden",
        }}>
            <h1
                style={{
                    fontSize: 52,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 24,
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                实战案例：电商客服意图过滤
            </h1>

            <div style={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
                {/* 问题卡片 */}
                <div style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 20,
                    opacity: problemOpacity,
                    border: "1px solid rgba(255,255,255,0.1)",
                }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 36, marginRight: 16 }}>⚠️</span>
                        <h3 style={{ fontSize: 32, color: "#f0883e", margin: 0 }}>痛点问题</h3>
                    </div>
                    <p style={{ fontSize: 28, color: "#c9d1d9", margin: 0 }}>
                        70%的用户提问与业务无关，如"今天天气怎么样？"
                    </p>
                </div>

                {/* 效果数据 */}
                <div style={{
                    display: "flex",
                    gap: 20,
                    marginBottom: 20,
                    opacity: resultOpacity,
                }}>
                    <div style={{
                        flex: 1,
                        background: "rgba(63, 185, 80, 0.15)",
                        borderRadius: 16,
                        padding: 20,
                        border: "1px solid rgba(63, 185, 80, 0.3)",
                        textAlign: "center",
                    }}>
                        <p style={{ fontSize: 48, color: "#3fb950", fontWeight: "bold", margin: 0 }}>40%</p>
                        <p style={{ fontSize: 24, color: "#c9d1d9", margin: "8px 0 0 0" }}>成本降低</p>
                    </div>
                    <div style={{
                        flex: 1,
                        background: "rgba(88, 166, 255, 0.15)",
                        borderRadius: 16,
                        padding: 20,
                        border: "1px solid rgba(88, 166, 255, 0.3)",
                        textAlign: "center",
                    }}>
                        <p style={{ fontSize: 48, color: "#58a6ff", fontWeight: "bold", margin: 0 }}>3倍</p>
                        <p style={{ fontSize: 24, color: "#c9d1d9", margin: "8px 0 0 0" }}>响应提升</p>
                    </div>
                </div>

                {/* 流程图 */}
                <div style={{
                    opacity: imageOpacity,
                    display: "flex",
                    justifyContent: "center",
                    flex: 1,
                    minHeight: 0,
                    overflow: "hidden",
                }}>
                    <Img
                        src={staticFile("EmbeddingVideo/scene5-image.png")}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: 16,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};
