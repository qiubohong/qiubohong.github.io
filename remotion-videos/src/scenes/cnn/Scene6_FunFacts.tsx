import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const CNNScene6_FunFacts: React.FC = () => {
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

    // 冷知识1动画
    const fact1Opacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // 冷知识2动画
    const fact2Opacity = interpolate(
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
                    marginBottom: 60,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#e94560",
                }}
            >
                ❄️ 冷知识
            </h1>

            {/* 冷知识1 */}
            <div
                style={{
                    fontSize: 34,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: fact1Opacity,
                    backgroundColor: "rgba(233, 69, 96, 0.1)",
                    padding: 40,
                    borderRadius: 20,
                    borderLeft: "6px solid #e94560",
                    maxWidth: "90%",
                    width: "100%",
                    marginBottom: 40
                }}
            >
                <p style={{ margin: 0 }}>
                    🔬 深度CNN（如ResNet-152）中，仅<strong>15%卷积核激活显著</strong>，其余对输出贡献微弱。
                </p>
                <p style={{ margin: "20px 0 0 0" }}>
                    剪枝技术可删除冗余核，<strong>模型缩小90%，精度损失&lt;1%</strong> —— 这是手机端CNN部署的基础！
                </p>
            </div>

            {/* 冷知识2 */}
            <div
                style={{
                    fontSize: 34,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: fact2Opacity,
                    backgroundColor: "rgba(52, 152, 219, 0.1)",
                    padding: 40,
                    borderRadius: 20,
                    borderLeft: "6px solid #3498db",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <p style={{ margin: 0 }}>
                    🏆 2016年击败李世石的<strong>AlphaGo</strong>，其策略网络实为<strong>13层CNN</strong>！
                </p>
                <p style={{ margin: "20px 0 0 0" }}>
                    CNN不仅能处理图像，还能处理围棋棋盘这样的网格数据。
                </p>
            </div>
        </div>
    );
};
