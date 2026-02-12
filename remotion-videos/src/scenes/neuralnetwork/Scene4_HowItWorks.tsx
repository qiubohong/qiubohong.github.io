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
                padding: 60,
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%",
                overflowY: "auto"
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
                    gap: 30,
                    width: "100%",
                    maxWidth: "1500px",
                    marginBottom: 40
                }}
            >
                {steps.map((step, index) => (
                    <div
                        key={index}
                        style={{
                            opacity: step.opacity,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            padding: 30,
                            borderRadius: 15,
                            borderLeft: `6px solid ${step.color}`,
                            display: "flex",
                            gap: 25
                        }}
                    >
                        <div
                            style={{
                                fontSize: 48,
                                fontWeight: "bold",
                                color: step.color,
                                minWidth: 60,
                                textAlign: "center"
                            }}
                        >
                            {step.number}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3
                                style={{
                                    fontSize: 38,
                                    fontWeight: "bold",
                                    marginBottom: 10,
                                    color: step.color
                                }}
                            >
                                {step.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: 28,
                                    lineHeight: 1.5,
                                    margin: "0 0 10px 0",
                                    color: "#ddd"
                                }}
                            >
                                {step.description}
                            </p>
                            <code
                                style={{
                                    fontSize: 24,
                                    color: "#ffd700",
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                    padding: "8px 15px",
                                    borderRadius: 8,
                                    display: "inline-block"
                                }}
                            >
                                {step.formula}
                            </code>
                        </div>
                    </div>
                ))}
            </div>

            {/* 图片占位 */}
            <div
                style={{
                    opacity: imageOpacity,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: 25,
                    borderRadius: 15,
                    textAlign: "center",
                    fontSize: 24,
                    color: "#aaa",
                    width: "80%",
                    maxWidth: "700px"
                }}
            >
                📊 神经网络工作流程图
                <br />
                <span style={{ fontSize: 18, color: "#888" }}>
                    （图片路径：/assets/img/ailearn/daily/04/2.png）
                </span>
            </div>
        </div>
    );
};