import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const CNNScene5_Applications: React.FC = () => {
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

    // 应用列表动画
    const app1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const app2Opacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const app3Opacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const app4Opacity = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const app5Opacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#16213e",
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
                    color: "#f39c12",
                }}
            >
                🚀 实际应用
            </h1>

            {/* 应用列表 */}
            <div style={{ width: "90%", maxWidth: "1400px" }}>
                {/* 图像分类 */}
                <div
                    style={{
                        fontSize: 36,
                        lineHeight: 1.8,
                        textAlign: "left",
                        opacity: app1Opacity,
                        backgroundColor: "rgba(52, 152, 219, 0.1)",
                        padding: 30,
                        borderRadius: 15,
                        borderLeft: "6px solid #3498db",
                        marginBottom: 20
                    }}
                >
                    📸 <strong>图像分类</strong>：识别图片中的物体（猫、狗、飞机、汽车等）
                </div>

                {/* 目标检测 */}
                <div
                    style={{
                        fontSize: 36,
                        lineHeight: 1.8,
                        textAlign: "left",
                        opacity: app2Opacity,
                        backgroundColor: "rgba(155, 89, 182, 0.1)",
                        padding: 30,
                        borderRadius: 15,
                        borderLeft: "6px solid #9b59b6",
                        marginBottom: 20
                    }}
                >
                    🎯 <strong>目标检测</strong>：识别物体位置（人脸、车辆、动物等）
                </div>

                {/* 目标分割 */}
                <div
                    style={{
                        fontSize: 36,
                        lineHeight: 1.8,
                        textAlign: "left",
                        opacity: app3Opacity,
                        backgroundColor: "rgba(46, 213, 115, 0.1)",
                        padding: 30,
                        borderRadius: 15,
                        borderLeft: "6px solid #2ed573",
                        marginBottom: 20
                    }}
                >
                    ✂️ <strong>目标分割</strong>：识别物体位置和类别（人、车、树、草等）
                </div>

                {/* 人脸识别 */}
                <div
                    style={{
                        fontSize: 36,
                        lineHeight: 1.8,
                        textAlign: "left",
                        opacity: app4Opacity,
                        backgroundColor: "rgba(241, 196, 15, 0.1)",
                        padding: 30,
                        borderRadius: 15,
                        borderLeft: "6px solid #f1c40f",
                        marginBottom: 20
                    }}
                >
                    👤 <strong>人脸识别</strong>：人脸验证、人脸检索等
                </div>

                {/* 图像生成 */}
                <div
                    style={{
                        fontSize: 36,
                        lineHeight: 1.8,
                        textAlign: "left",
                        opacity: app5Opacity,
                        backgroundColor: "rgba(231, 76, 60, 0.1)",
                        padding: 30,
                        borderRadius: 15,
                        borderLeft: "6px solid #e74c3c"
                    }}
                >
                    🎨 <strong>图像生成</strong>：风格迁移、图像修复等
                </div>
            </div>
        </div>
    );
};
