import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const RNNScene5_GRU: React.FC = () => {
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

    // 内容动画
    const contentOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#0f3460",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 60px",
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
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #00f2fe, #4facfe)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                GRU（门控循环单元）
            </h2>

            {/* 核心目标 */}
            <div
                style={{
                    fontSize: 30,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(0, 242, 254, 0.1)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #00f2fe",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 30
                }}
            >
                <h3 style={{ margin: "0 0 20px 0", fontSize: 38, color: "#00f2fe" }}>
                    🎯 核心目标
                </h3>
                <p style={{ margin: 0 }}>
                    在保留LSTM优势的同时<br />
                    <strong>简化结构、提升计算效率</strong>
                </p>
            </div>

            {/* 结构创新 */}
            <div
                style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(0, 242, 254, 0.1)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #00f2fe",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <h3 style={{ margin: "0 0 20px 0", fontSize: 38, color: "#00f2fe" }}>
                    💡 结构创新
                </h3>
                <p style={{ margin: "15px 0" }}>
                    <strong>• 双门设计：</strong><br />
                    合并遗忘门与输入门为<strong>更新门</strong>，<br />
                    新增<strong>重置门</strong>，取消独立记忆细胞
                </p>
                <p style={{ margin: "15px 0" }}>
                    <strong>• 隐藏状态融合：</strong><br />
                    直接操作隐藏状态，<br />
                    参数减少约25%
                </p>
            </div>
        </div>
    );
};
