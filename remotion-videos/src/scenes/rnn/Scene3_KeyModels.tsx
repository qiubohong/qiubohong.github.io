import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const RNNScene3_KeyModels: React.FC = () => {
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

    // LSTM动画
    const lstmOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // GRU动画
    const gruOpacity = interpolate(
        frame,
        [90, 120],
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
                    marginBottom: 50,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #4facfe, #00f2fe)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                关键算法模型
            </h2>

            {/* LSTM */}
            <div
                style={{
                    fontSize: 30,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: lstmOpacity,
                    backgroundColor: "rgba(79, 172, 254, 0.15)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #4facfe",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 30
                }}
            >
                <h3 style={{ margin: "0 0 15px 0", fontSize: 40, color: "#4facfe" }}>
                    🔐 LSTM（长短期记忆网络）
                </h3>
                <p style={{ margin: "10px 0" }}>
                    <strong>核心机制：</strong>三重门控 + 细胞状态
                </p>
                <p style={{ margin: "10px 0" }}>
                    <strong>创新点：</strong>遗忘门主动丢弃无用记忆<br />
                    （如清理过期快递）
                </p>
            </div>

            {/* GRU */}
            <div
                style={{
                    fontSize: 30,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: gruOpacity,
                    backgroundColor: "rgba(0, 242, 254, 0.15)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #00f2fe",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <h3 style={{ margin: "0 0 15px 0", fontSize: 40, color: "#00f2fe" }}>
                    ⚡ GRU（门控循环单元）
                </h3>
                <p style={{ margin: "10px 0" }}>
                    <strong>核心机制：</strong>两重门控（更新门+重置门）
                </p>
                <p style={{ margin: "10px 0" }}>
                    <strong>创新点：</strong>合并记忆与隐藏状态<br />
                    参数比LSTM少25%
                </p>
            </div>
        </div>
    );
};
