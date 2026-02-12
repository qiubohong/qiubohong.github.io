import React from "react";
import { interpolate, useCurrentFrame, Easing, spring } from "remotion";

export const NeuralNetworkScene6_LifeExample: React.FC = () => {
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

    // 各个步骤的动画
    const step1Opacity = spring({
        frame: frame - 90,
        fps: 30,
        config: { damping: 200 },
    });

    const step2Opacity = spring({
        frame: frame - 120,
        fps: 30,
        config: { damping: 200 },
    });

    const step3Opacity = spring({
        frame: frame - 150,
        fps: 30,
        config: { damping: 200 },
    });

    const step4Opacity = spring({
        frame: frame - 180,
        fps: 30,
        config: { damping: 200 },
    });

    const steps = [
        {
            icon: "📦",
            title: "收货区（输入层）",
            description: "接收全国包裹（原始数据）",
            opacity: step1Opacity,
            color: "#667eea"
        },
        {
            icon: "🔄",
            title: "分拣线（隐藏层）",
            description: "首站：按省份粗分（提取大特征）\n中转：按城市细分（识别局部特征）\n末站：按街道精分（确认细节）",
            opacity: step2Opacity,
            color: "#764ba2"
        },
        {
            icon: "🚚",
            title: "发货区（输出层）",
            description: "送至具体地址（分类结果）",
            opacity: step4Opacity,
            color: "#f5576c"
        }
    ];

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
                overflow: "hidden"
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontSize: 60,
                    fontWeight: "bold",
                    marginBottom: 25,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#667eea",
                    width: "100%"
                }}
            >
                📦 生活案例
            </h1>

            {/* 副标题 */}
            <h2
                style={{
                    fontSize: 40,
                    fontWeight: "normal",
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: contentOpacity,
                    color: "#f093fb",
                    width: "100%"
                }}
            >
                快递分拣中心模型
            </h2>

            {/* 步骤 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 25,
                    width: "100%",
                    maxWidth: "1500px",
                    flex: 1,
                    overflow: "hidden"
                }}
            >
                {steps.map((step, index) => (
                    <div
                        key={index}
                        style={{
                            opacity: step.opacity,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            padding: "25px 30px",
                            borderRadius: 15,
                            borderLeft: `6px solid ${step.color}`,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 25
                        }}
                    >
                        <div
                            style={{
                                fontSize: 55,
                                minWidth: 70,
                                textAlign: "center"
                            }}
                        >
                            {step.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3
                                style={{
                                    fontSize: 36,
                                    fontWeight: "bold",
                                    marginBottom: 12,
                                    color: step.color
                                }}
                            >
                                {step.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: 26,
                                    lineHeight: 1.5,
                                    margin: 0,
                                    color: "#ddd",
                                    whiteSpace: "pre-line"
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};