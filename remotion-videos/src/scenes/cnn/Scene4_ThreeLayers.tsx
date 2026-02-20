import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const CNNScene4_ThreeLayers: React.FC = () => {
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

    // 输入层动画
    const inputOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 隐藏层动画
    const hiddenOpacity = interpolate(
        frame,
        [70, 100],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 输出层动画
    const outputOpacity = interpolate(
        frame,
        [110, 140],
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
                backgroundColor: "#1a1a2e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 60,
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
                    color: "#3498db",
                }}
            >
                🔧 怎么做？三层功能
            </h1>

            {/* 输入层 */}
            <div
                style={{
                    fontSize: 32,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: inputOpacity,
                    backgroundColor: "rgba(52, 152, 219, 0.1)",
                    padding: 30,
                    borderRadius: 15,
                    borderLeft: "6px solid #3498db",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 25
                }}
            >
                <strong>1️⃣ 输入层</strong>：接收数据（如28×28像素的手写数字图片）
            </div>

            {/* 隐藏层 */}
            <div
                style={{
                    fontSize: 32,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: hiddenOpacity,
                    backgroundColor: "rgba(155, 89, 182, 0.1)",
                    padding: 30,
                    borderRadius: 15,
                    borderLeft: "6px solid #9b59b6",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 25
                }}
            >
                <p style={{ margin: "0 0 15px 0" }}>
                    <strong>2️⃣ 隐藏层</strong>：层层提取特征（线条→局部图案→完整数字）
                </p>
                <p style={{ margin: "0 0 10px 0", fontSize: 28, paddingLeft: 30 }}>
                    • 卷积：提取局部特征（3×3像素卷积核滑动）
                </p>
                <p style={{ margin: "0 0 10px 0", fontSize: 28, paddingLeft: 30 }}>
                    • 池化：降维，减少参数量，防止过拟合
                </p>
                <p style={{ margin: "0 0 10px 0", fontSize: 28, paddingLeft: 30 }}>
                    • 激活：非线性处理，提升泛化能力
                </p>
                <p style={{ margin: 0, fontSize: 28, paddingLeft: 30 }}>
                    • 全连接：组合特征，形成分类器
                </p>
            </div>

            {/* 输出层 */}
            <div
                style={{
                    fontSize: 32,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: outputOpacity,
                    backgroundColor: "rgba(46, 213, 115, 0.1)",
                    padding: 30,
                    borderRadius: 15,
                    borderLeft: "6px solid #2ed573",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <strong>3️⃣ 输出层</strong>：给出预测结果（概率最大的数字0-9）
            </div>
        </div>
    );
};
