import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const NeuralNetworkScene2_Definition: React.FC = () => {
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

    // 定义内容动画
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

    // 图片动画
    const imageOpacity = interpolate(
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
                backgroundColor: "#16213e",
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
                    marginBottom: 60,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#667eea",
                    width: "100%"
                }}
            >
                🧠 什么是神经网络？
            </h1>

            {/* 定义内容 */}
            <div
                style={{
                    fontSize: 36,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(102, 126, 234, 0.15)",
                    padding: 50,
                    borderRadius: 20,
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 40
                }}
            >
                <p style={{ margin: "0 0 30px 0" }}>
                    <strong style={{ color: "#667eea" }}>定义：</strong>
                    人工神经网络（Artificial Neural Network，即ANN），
                    是20世纪80年代以来人工智能领域兴起的研究热点。
                </p>
                <p style={{ margin: 0 }}>
                    它从信息处理角度对人脑神经元网络进行抽象，
                    建立某种简单模型，按不同的连接方式组成不同的网络。
                </p>
            </div>

            {/* 图片占位 */}
            <div
                style={{
                    opacity: imageOpacity,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: 30,
                    borderRadius: 15,
                    textAlign: "center",
                    fontSize: 28,
                    color: "#aaa",
                    width: "80%",
                    maxWidth: "800px"
                }}
            >
                📊 神经网络结构示意图
                <br />
                <span style={{ fontSize: 20, color: "#888" }}>
                    （图片路径：/assets/img/ailearn/daily/04/1.png）
                </span>
            </div>
        </div>
    );
};