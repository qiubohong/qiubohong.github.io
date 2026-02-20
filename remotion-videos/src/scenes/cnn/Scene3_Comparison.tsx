import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const CNNScene3_Comparison: React.FC = () => {
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

    // 痛点动画
    const painOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 优势动画
    const advantageOpacity = interpolate(
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
                    color: "#e94560",
                }}
            >
                ⚖️ CNN vs 传统神经网络
            </h1>

            {/* 传统神经网络痛点 */}
            <div
                style={{
                    fontSize: 32,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: painOpacity,
                    backgroundColor: "rgba(233, 69, 96, 0.1)",
                    padding: 40,
                    borderRadius: 20,
                    borderLeft: "6px solid #e94560",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 40
                }}
            >
                <h3 style={{ margin: "0 0 20px 0", fontSize: 40 }}>❌ 传统神经网络痛点</h3>
                <p style={{ margin: "0 0 15px 0" }}>
                    • 全连接参数爆炸（1000×1000图片 → 100万权重）
                </p>
                <p style={{ margin: 0 }}>
                    • 忽略空间局部性（远处像素强行关联）
                </p>
            </div>

            {/* CNN优势 */}
            <div
                style={{
                    fontSize: 32,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: advantageOpacity,
                    backgroundColor: "rgba(46, 213, 115, 0.1)",
                    padding: 40,
                    borderRadius: 20,
                    borderLeft: "6px solid #2ed573",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <h3 style={{ margin: "0 0 20px 0", fontSize: 40, color: "#2ed573" }}>✅ CNN优势</h3>
                <p style={{ margin: "0 0 15px 0" }}>
                    • 参数量降低99%（10⁶级 → 10⁴级）
                </p>
                <p style={{ margin: "0 0 15px 0" }}>
                    • 保留图片特征，类似人类视觉原理
                </p>
                <p style={{ margin: 0 }}>
                    • 平移不变性（物体移动仍可识别）
                </p>
            </div>
        </div>
    );
};
