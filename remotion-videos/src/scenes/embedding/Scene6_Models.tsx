import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene6_Models: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题淡入
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 模型卡片依次淡入
    const card1Opacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateRight: "clamp",
    });
    const card2Opacity = interpolate(frame, [50, 70], [0, 1], {
        extrapolateRight: "clamp",
    });
    const card3Opacity = interpolate(frame, [70, 90], [0, 1], {
        extrapolateRight: "clamp",
    });
    const card4Opacity = interpolate(frame, [90, 110], [0, 1], {
        extrapolateRight: "clamp",
    });

    const models = [
        {
            name: "Qwen3-Embedding",
            highlight: "MTEB多语言榜第1",
            advantage: "多语言检索 / 代码理解",
            chinese: "✅ 优化",
            opacity: card1Opacity,
            color: "#f0883e",
        },
        {
            name: "BGE-M3",
            highlight: "混合检索",
            advantage: "法律/金融精准匹配",
            chinese: "✅ 强",
            opacity: card2Opacity,
            color: "#58a6ff",
        },
        {
            name: "text-embedding-3",
            highlight: "OpenAI生态集成",
            advantage: "国际通用场景",
            chinese: "❌ 一般",
            opacity: card3Opacity,
            color: "#3fb950",
        },
        {
            name: "NV-Embed",
            highlight: "32K长文本",
            advantage: "论文/合同分析",
            chinese: "✅ 中等",
            opacity: card4Opacity,
            color: "#f778ba",
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
                    marginBottom: 50,
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #58a6ff, #79c0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                2025最新Embedding模型
            </h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
                width: "100%",
                maxWidth: 1000,
            }}>
                {models.map((model, index) => (
                    <div
                        key={index}
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 16,
                            padding: 24,
                            opacity: model.opacity,
                            border: `2px solid ${model.color}40`,
                        }}
                    >
                        <h3 style={{
                            fontSize: 32,
                            color: model.color,
                            margin: "0 0 16px 0",
                            fontWeight: "bold",
                        }}>
                            {model.name}
                        </h3>
                        <p style={{
                            fontSize: 26,
                            color: "#ffd200",
                            margin: "0 0 12px 0",
                            fontWeight: 600,
                        }}>
                            {model.highlight}
                        </p>
                        <p style={{
                            fontSize: 22,
                            color: "#c9d1d9",
                            margin: "0 0 12px 0",
                        }}>
                            {model.advantage}
                        </p>
                        <p style={{
                            fontSize: 20,
                            color: "#8b949e",
                            margin: 0,
                        }}>
                            中文支持：{model.chinese}
                        </p>
                    </div>
                ))}
            </div>
        </AbsoluteFill>
    );
};
