import React from "react";
import { interpolate, useCurrentFrame, Easing, spring } from "remotion";

export const NeuralNetworkScene3_ThreeLayers: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(
        frame,
        [0, 20],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 三个层级的动画
    const layer1Opacity = spring({
        frame: frame - 30,
        fps: 30,
        config: {
            damping: 200,
        },
    });

    const layer2Opacity = spring({
        frame: frame - 60,
        fps: 30,
        config: {
            damping: 200,
        },
    });

    const layer3Opacity = spring({
        frame: frame - 90,
        fps: 30,
        config: {
            damping: 200,
        },
    });

    const layers = [
        {
            title: "1. 输入层",
            icon: "📥",
            description: "接收数据（如28x28像素的手写数字图片）",
            color: "#667eea",
            opacity: layer1Opacity
        },
        {
            title: "2. 隐藏层",
            icon: "🔄",
            description: "层层提取特征（线条→局部图案→完整数字）",
            color: "#764ba2",
            opacity: layer2Opacity
        },
        {
            title: "3. 输出层",
            icon: "📤",
            description: "给出预测结果（概率最大的数字0-9）",
            color: "#f093fb",
            opacity: layer3Opacity
        }
    ];

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#0f3460",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 80,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%"
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontSize: 72,
                    fontWeight: "bold",
                    marginBottom: 80,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#667eea",
                    width: "100%"
                }}
            >
                🏗️ 三层功能
            </h1>

            {/* 三个层级 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 40,
                    width: "100%",
                    maxWidth: "1400px"
                }}
            >
                {layers.map((layer, index) => (
                    <div
                        key={index}
                        style={{
                            opacity: layer.opacity,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            padding: 40,
                            borderRadius: 20,
                            borderLeft: `8px solid ${layer.color}`,
                            display: "flex",
                            alignItems: "center",
                            gap: 30
                        }}
                    >
                        <div
                            style={{
                                fontSize: 80,
                                minWidth: 100,
                                textAlign: "center"
                            }}
                        >
                            {layer.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2
                                style={{
                                    fontSize: 48,
                                    fontWeight: "bold",
                                    marginBottom: 15,
                                    color: layer.color
                                }}
                            >
                                {layer.title}
                            </h2>
                            <p
                                style={{
                                    fontSize: 36,
                                    lineHeight: 1.6,
                                    margin: 0,
                                    color: "#ddd"
                                }}
                            >
                                {layer.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};