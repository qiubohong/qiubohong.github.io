import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const CNNScene2_Definition: React.FC = () => {
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
                    color: "#f39c12",
                }}
            >
                🤔 是什么？
            </h1>

            {/* 定义内容 */}
            <div
                style={{
                    fontSize: 36,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(243, 156, 18, 0.1)",
                    padding: 50,
                    borderRadius: 20,
                    borderLeft: "6px solid #f39c12",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <p style={{ margin: "0 0 30px 0" }}>
                    <strong>定义</strong>：卷积神经网络（CNN）是一类包含卷积计算且具有深度结构的前馈神经网络，是深度学习的代表算法之一。
                </p>
                <p style={{ margin: "0 0 30px 0" }}>
                    由于CNN能够进行<strong>平移不变分类</strong>，因此也被称为"平移不变人工神经网络"。
                </p>
                <p style={{ margin: 0 }}>
                    简单理解：将图片数据降低复杂度，拆分成一个个小块（局部特征），结合统一的参数规划，最终完成图像识别。
                </p>
            </div>

            {/* 底部提示 */}
            <div
                style={{
                    fontSize: 28,
                    textAlign: "center",
                    opacity: imageOpacity,
                    color: "#95a5a6",
                    marginTop: 40,
                }}
            >
                💡 核心特点：局部感知 + 参数共享
            </div>
        </div>
    );
};
