import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene1_Introduction: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题淡入
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 副标题淡入
    const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 图片淡入
    const imageOpacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 图片缩放动画
    const imageScale = interpolate(frame, [60, 100], [0.9, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
        }}>
            <div style={{ textAlign: "center", paddingLeft: 48, paddingRight: 48, width: "100%" }}>
                <h1
                    style={{
                        fontSize: 80,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 24,
                        opacity: titleOpacity,
                        background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    🤖 LLM大模型
                </h1>
                <p
                    style={{
                        fontSize: 42,
                        color: "#c9d1d9",
                        fontWeight: 500,
                        opacity: subtitleOpacity,
                        marginBottom: 40,
                    }}
                >
                    5分钟AI，每天搞懂一个知识点(11)
                </p>
                <div style={{
                    opacity: imageOpacity,
                    transform: `scale(${imageScale})`,
                    marginTop: 40,
                }}>
                    <Img
                        src={staticFile("LLMVideo/scene1-image.png")}
                        style={{
                            width: "70%",
                            maxWidth: 900,
                            borderRadius: 16,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};
