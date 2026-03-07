import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene2_CoreFeatures: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题淡入
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 三个特性卡片依次淡入
    const feature1Opacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateRight: "clamp",
    });
    const feature1Slide = interpolate(frame, [30, 50], [30, 0], {
        extrapolateRight: "clamp",
    });

    const feature2Opacity = interpolate(frame, [60, 80], [0, 1], {
        extrapolateRight: "clamp",
    });
    const feature2Slide = interpolate(frame, [60, 80], [30, 0], {
        extrapolateRight: "clamp",
    });

    const feature3Opacity = interpolate(frame, [90, 110], [0, 1], {
        extrapolateRight: "clamp",
    });
    const feature3Slide = interpolate(frame, [90, 110], [30, 0], {
        extrapolateRight: "clamp",
    });

    const features = [
        {
            icon: "🎯",
            title: "语义保留",
            description: "向量距离反映内容相关性",
            detail: "余弦相似度 > 0.8 表示强关联",
            opacity: feature1Opacity,
            slide: feature1Slide,
        },
        {
            icon: "🔢",
            title: "可计算性",
            description: "支持向量运算",
            detail: '"国王" - "男" + "女" ≈ "女王"',
            opacity: feature2Opacity,
            slide: feature2Slide,
        },
        {
            icon: "📉",
            title: "降维高效",
            description: "大幅压缩数据体积",
            detail: "GB级文本 → KB级向量",
            opacity: feature3Opacity,
            slide: feature3Slide,
        },
    ];

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            padding: 48,
        }}>
            <h1
                style={{
                    fontSize: 64,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 60,
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                三大核心特性
            </h1>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                width: "100%",
                maxWidth: 900,
            }}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 16,
                            padding: 32,
                            opacity: feature.opacity,
                            transform: `translateY(${feature.slide}px)`,
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                            <span style={{ fontSize: 48, marginRight: 20 }}>{feature.icon}</span>
                            <h3 style={{ fontSize: 36, color: "#f0883e", margin: 0 }}>{feature.title}</h3>
                        </div>
                        <p style={{ fontSize: 28, color: "#c9d1d9", margin: "8px 0" }}>
                            {feature.description}
                        </p>
                        <p style={{ fontSize: 24, color: "#8b949e", margin: "8px 0", fontStyle: "italic" }}>
                            {feature.detail}
                        </p>
                    </div>
                ))}
            </div>
        </AbsoluteFill>
    );
};
