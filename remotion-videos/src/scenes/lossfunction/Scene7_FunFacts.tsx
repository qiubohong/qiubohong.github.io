import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const LossScene7_FunFacts: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 四个冷知识依次出现
    const fact1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact2Opacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact3Opacity = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fact4Opacity = interpolate(frame, [180, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#0f3460",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "40px 50px",
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box"
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 56,
                    fontWeight: "bold",
                    marginBottom: 35,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#00d9ff"
                }}
            >
                🧊 冷知识时间
            </h2>

            {/* 冷知识列表 */}
            <div style={{ width: "90%", maxWidth: 1600, display: "flex", flexDirection: "column", gap: 20 }}>
                {/* 冷知证1 */}
                <div
                    style={{
                        opacity: fact1Opacity,
                        backgroundColor: "rgba(0, 217, 255, 0.1)",
                        padding: 25,
                        borderRadius: 15,
                        borderLeft: "5px solid #00d9ff"
                    }}
                >
                    <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5 }}>
                        🐝 <strong>自然界中的损失函数：</strong><br />
                        蜜蜂采蜜路径规划天然符合TSP问题最短路径损失，误差&lt;2%
                    </p>
                </div>
                {/* 冷知证2 */}
                <div
                    style={{
                        opacity: fact2Opacity,
                        backgroundColor: "rgba(0, 217, 255, 0.1)",
                        padding: 25,
                        borderRadius: 15,
                        borderLeft: "5px solid #00d9ff"
                    }}
                >
                    <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5 }}>
                        ⚛️ <strong>量子计算加速：</strong><br />
                        谷歌用量子退火算法优化损失函数，训练速度提升1000倍
                    </p>
                </div>
                {/* 冷知证3 */}
                <div
                    style={{
                        opacity: fact3Opacity,
                        backgroundColor: "rgba(0, 217, 255, 0.1)",
                        padding: 25,
                        borderRadius: 15,
                        borderLeft: "5px solid #00d9ff"
                    }}
                >
                    <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5 }}>
                        🚀 <strong>损失函数革命：</strong><br />
                        Contrastive Loss 推动自监督学习崛起（无需人工标注）
                    </p>
                </div>
                {/* 冷知证4 */}
                <div
                    style={{
                        opacity: fact4Opacity,
                        backgroundColor: "rgba(0, 217, 255, 0.1)",
                        padding: 25,
                        borderRadius: 15,
                        borderLeft: "5px solid #00d9ff"
                    }}
                >
                    <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5 }}>
                        🎮 <strong>惊人数据：</strong><br />
                        AlphaGo Zero 的损失函数包含赢棋概率预测 + 落子分布KL散度，双目标驱动模型进化
                    </p>
                </div>            </div>
        </div>
    );
};
