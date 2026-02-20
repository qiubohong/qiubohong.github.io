import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const LossScene3_Categories: React.FC = () => {
    const frame = useCurrentFrame();

    // 标题动画
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 三个分类依次出现
    const cat1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const cat2Opacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const cat3Opacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#0f3460",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 60,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%"
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 64,
                    fontWeight: "bold",
                    marginBottom: 60,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#ff6b6b"
                }}
            >
                损失函数三大分类
            </h2>

            {/* 分类容器 */}
            <div style={{ width: "90%", maxWidth: 1600, display: "flex", flexDirection: "column", gap: 35 }}>
                {/* 回归 */}
                <div
                    style={{
                        opacity: cat1Opacity,
                        backgroundColor: "rgba(52, 152, 219, 0.2)",
                        padding: 40,
                        borderRadius: 20,
                        border: "3px solid #3498db"
                    }}
                >
                    <h3 style={{ fontSize: 48, margin: "0 0 20px 0", color: "#3498db" }}>
                        📊 回归
                    </h3>
                    <p style={{ fontSize: 34, margin: "0 0 10px 0", lineHeight: 1.6 }}>
                        <strong>适用：</strong>连续可导数据
                    </p>
                    <p style={{ fontSize: 34, margin: 0, lineHeight: 1.6, color: "#aaa" }}>
                        <strong>应用：</strong>房价预测、气温预报
                    </p>
                </div>

                {/* 分类 */}
                <div
                    style={{
                        opacity: cat2Opacity,
                        backgroundColor: "rgba(46, 204, 113, 0.2)",
                        padding: 40,
                        borderRadius: 20,
                        border: "3px solid #2ecc71"
                    }}
                >
                    <h3 style={{ fontSize: 48, margin: "0 0 20px 0", color: "#2ecc71" }}>
                        🎯 分类
                    </h3>
                    <p style={{ fontSize: 34, margin: "0 0 10px 0", lineHeight: 1.6 }}>
                        <strong>适用：</strong>离散类别数据
                    </p>
                    <p style={{ fontSize: 34, margin: 0, lineHeight: 1.6, color: "#aaa" }}>
                        <strong>应用：</strong>图像识别、垃圾邮件分类
                    </p>
                </div>

                {/* 生成 */}
                <div
                    style={{
                        opacity: cat3Opacity,
                        backgroundColor: "rgba(155, 89, 182, 0.2)",
                        padding: 40,
                        borderRadius: 20,
                        border: "3px solid #9b59b6"
                    }}
                >
                    <h3 style={{ fontSize: 48, margin: "0 0 20px 0", color: "#9b59b6" }}>
                        🎨 生成
                    </h3>
                    <p style={{ fontSize: 34, margin: "0 0 10px 0", lineHeight: 1.6 }}>
                        <strong>适用：</strong>生成新数据样本
                    </p>
                    <p style={{ fontSize: 34, margin: 0, lineHeight: 1.6, color: "#aaa" }}>
                        <strong>应用：</strong>AI绘画、视频生成
                    </p>
                </div>
            </div>
        </div>
    );
};
