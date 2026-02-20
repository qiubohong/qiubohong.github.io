import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene6_FunFacts: React.FC = () => {
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

    // 4个冷知识依次出现
    const fact1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact3Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact4Opacity = interpolate(frame, [210, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const facts = [
        {
            title: "神经元激活率",
            content: "Sigmoid 网络只有 3-5% 的神经元激活，太浪费了！\nReLU 网络激活率高达 50%，效率爆表！",
            icon: "🔥",
            opacity: fact1Opacity,
            color: "#ff6b6b"
        },
        {
            title: "Swish 的灵感来自生物",
            content: "它的平滑性源于神经突触的\n离子通道动力学",
            icon: "🧬",
            opacity: fact2Opacity,
            color: "#4ecdc4"
        },
        {
            title: "谷歌用 AI 找函数",
            content: "强化学习在 10 万种函数中发现 Swish，\n超越人类设计！",
            icon: "🤖",
            opacity: fact3Opacity,
            color: "#95e1d3"
        },
        {
            title: "宇宙级应用",
            content: "欧洲核子中心 CERN 用 GELU 处理\n粒子碰撞数据，误差降低 38%！",
            icon: "🌌",
            opacity: fact4Opacity,
            color: "#ffd93d"
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
                padding: 50,
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
                    marginBottom: 50,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ffd93d",
                }}
            >
                🎉 最后分享几个超酷的冷知识！
            </h1>

            {/* 冷知识列表 */}
            <div style={{ width: "90%", maxWidth: "1500px" }}>
                {facts.map((fact, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 32,
                            lineHeight: 1.7,
                            opacity: fact.opacity,
                            backgroundColor: `rgba(${parseInt(fact.color.slice(1, 3), 16)}, ${parseInt(fact.color.slice(3, 5), 16)}, ${parseInt(fact.color.slice(5, 7), 16)}, 0.15)`,
                            padding: 35,
                            borderRadius: 15,
                            marginBottom: 25,
                            borderLeft: `6px solid ${fact.color}`,
                        }}
                    >
                        <div style={{ fontSize: 48, marginBottom: 15 }}>
                            <span style={{ marginRight: 15 }}>{fact.icon}</span>
                            <strong style={{ color: fact.color }}>
                                {index + 1}. {fact.title}
                            </strong>
                        </div>
                        <div style={{
                            fontSize: 30,
                            color: "#e0e0e0",
                            whiteSpace: "pre-line",
                            marginLeft: 70
                        }}>
                            {fact.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
