import React from "react";
import { interpolate, useCurrentFrame, Easing, Img, staticFile } from "remotion";

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
                padding: "50px 60px",
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontSize: 60,
                    fontWeight: "bold",
                    marginBottom: 35,
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
                    fontSize: 28,
                    lineHeight: 1.6,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(102, 126, 234, 0.15)",
                    padding: "30px 40px",
                    borderRadius: 15,
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 30
                }}
            >
                <p style={{ margin: "0 0 20px 0" }}>
                    <strong style={{ color: "#667eea" }}>定义：</strong>
                    人工神经网络（Artificial Neural Network，即ANN），
                    是20世纪80年代以来人工智能领域兴起的研究热点。
                </p>
                <p style={{ margin: 0 }}>
                    它从信息处理角度对人脑神经元网络进行抽象，
                    建立某种简单模型，按不同的连接方式组成不同的网络。
                </p>
            </div>

            {/* 神经网络结构示意图 */}
            <div
                style={{
                    opacity: imageOpacity,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 15,
                    width: "100%",
                    maxWidth: "900px"
                }}
            >
                <h3
                    style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        color: "#667eea",
                        margin: 0,
                        textAlign: "center"
                    }}
                >
                    📊 神经网络结构示意图
                </h3>
                <div
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        padding: 20,
                        borderRadius: 15,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid rgba(102, 126, 234, 0.3)"
                    }}
                >
                    <Img
                        src={staticFile("NeuralNetworkVideo/images/neural-network-structure.png")}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "400px",
                            objectFit: "contain",
                            borderRadius: 10
                        }}
                    />
                </div>
            </div>
        </div>
    );
};