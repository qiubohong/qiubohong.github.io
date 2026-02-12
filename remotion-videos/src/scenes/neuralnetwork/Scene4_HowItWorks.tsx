import React from "react";
import { interpolate, useCurrentFrame, Easing, spring } from "remotion";

export const NeuralNetworkScene4_HowItWorks: React.FC = () => {
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

    // 四个步骤的动画
    const step1Opacity = spring({
        frame: frame - 30,
        fps: 30,
        config: { damping: 200 },
    });

    const step2Opacity = spring({
        frame: frame - 70,
        fps: 30,
        config: { damping: 200 },
    });

    const step3Opacity = spring({
        frame: frame - 110,
        fps: 30,
        config: { damping: 200 },
    });

    const step4Opacity = spring({
        frame: frame - 150,
        fps: 30,
        config: { damping: 200 },
    });

    // 图片动画
    const imageOpacity = interpolate(
        frame,
        [200, 230],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const steps = [
        {
            number: "1",
            title: "神经元计算（积木拼装）",
            description: "将所有数据(w1)+影响因子(x1)+权重(b)都输入到网络中",
            formula: "w1*x1 + w2*x2 + ... + wn*xn + b",
            opacity: step1Opacity,
            color: "#667eea"
        },
        {
            number: "2",
            title: "激活函数（质检开关）",
            description: "判断当前数据输出是否符合要求",
            formula: "f(x) = activation(x)",
            opacity: step2Opacity,
            color: "#764ba2"
        },
        {
            number: "3",
            title: "损失函数（误差雷达）",
            description: "计算预测值和实际值之间的误差",
            formula: "loss = (y - y')²",
            opacity: step3Opacity,
            color: "#f093fb"
        },
        {
            number: "4",
            title: "迭代优化",
            description: "经过三个步骤，不断迭代，直到误差最小",
            formula: "y' = f(w1*x1 + w2*x2 + ... + wn*xn + b)",
            opacity: step4Opacity,
            color: "#f5576c"
        }
    ];

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#1a1a2e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "40px 50px",
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
                    marginBottom: 30,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#667eea",
                    width: "100%"
                }}
            >
                ⚙️ 怎么做？
            </h1>

            {/* 四个步骤 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    width: "100%",
                    maxWidth: "1600px",
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
                            padding: "20px 25px",
                            borderRadius: 12,
                            borderLeft: `5px solid ${step.color}`,
                            display: "flex",
                            gap: 20
                        }}
                    >
                        <div
                            style={{
                                fontSize: 40,
                                fontWeight: "bold",
                                color: step.color,
                                minWidth: 50,
                                textAlign: "center"
                            }}
                        >
                            {step.number}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3
                                style={{
                                    fontSize: 32,
                                    fontWeight: "bold",
                                    marginBottom: 8,
                                    color: step.color
                                }}
                            >
                                {step.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    margin: "0 0 8px 0",
                                    color: "#ddd"
                                }}
                            >
                                {step.description}
                            </p>
                            <code
                                style={{
                                    fontSize: 20,
                                    color: "#ffd700",
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                    padding: "6px 12px",
                                    borderRadius: 6,
                                    display: "inline-block"
                                }}
                            >
                                {step.formula}
                            </code>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};