import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

export const Scene4_Ecosystem: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题淡入
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 图片淡入
    const imageOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 图片缩放动画
    const imageScale = interpolate(frame, [30, 70], [0.95, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: 'Noto Sans SC, Arial, sans-serif',
            padding: "48px 80px",
            overflow: "hidden",
        }}>
            <h1
                style={{
                    fontSize: 52,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 32,
                    marginTop: 0,
                    flexShrink: 0,
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Embedding生态系统
            </h1>

            <div style={{
                flex: 1,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                minHeight: 0,
            }}>
                <Img
                    src={staticFile("EmbeddingVideo/scene4-image.png")}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: 16,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        opacity: imageOpacity,
                        transform: `scale(${imageScale})`,
                        transformOrigin: "center center",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
