import React from "react";
import { interpolate, useCurrentFrame, Easing, spring } from "remotion";

export const NeuralNetworkScene5_Types: React.FC = () => {
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

    // 表格行动画
    const row1Opacity = spring({
        frame: frame - 30,
        fps: 30,
        config: { damping: 200 },
    });

    const row2Opacity = spring({
        frame: frame - 60,
        fps: 30,
        config: { damping: 200 },
    });

    const row3Opacity = spring({
        frame: frame - 90,
        fps: 30,
        config: { damping: 200 },
    });

    const row4Opacity = spring({
        frame: frame - 120,
        fps: 30,
        config: { damping: 200 },
    });

    const types = [
        {
            type: "全连接网络",
            feature: "每层神经元全部连接",
            application: "房价预测",
            experiment: "TF Playground回归任务",
            opacity: row1Opacity,
            color: "#667eea"
        },
        {
            type: "卷积网络CNN",
            feature: "局部感知/权重共享",
            application: "人脸识别",
            experiment: "CNN Explainer可视化",
            opacity: row2Opacity,
            color: "#764ba2"
        },
        {
            type: "循环网络RNN",
            feature: "记忆之前状态",
            application: "语音识别",
            experiment: "Karpathy Char-RNN",
            opacity: row3Opacity,
            color: "#f093fb"
        },
        {
            type: "Transformer",
            feature: "自注意力机制",
            application: "ChatGPT",
            experiment: "Hugging Face Demo",
            opacity: row4Opacity,
            color: "#f5576c"
        }
    ];

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#16213e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "45px 55px",
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
                    fontSize: 58,
                    fontWeight: "bold",
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    color: "#667eea",
                    width: "100%"
                }}
            >
                🔬 神经网络算法类型
            </h1>

            {/* 表格 */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "1600px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    flex: 1,
                    overflow: "hidden"
                }}
            >
                {/* 表头 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 2fr 2fr 2.5fr",
                        gap: 15,
                        padding: "18px 25px",
                        backgroundColor: "rgba(102, 126, 234, 0.2)",
                        borderRadius: 10,
                        fontSize: 28,
                        fontWeight: "bold",
                        opacity: titleOpacity
                    }}
                >
                    <div>类型</div>
                    <div>特点</div>
                    <div>典型应用</div>
                    <div>在线实验</div>
                </div>

                {/* 表格内容 */}
                {types.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.5fr 2fr 2fr 2.5fr",
                            gap: 15,
                            padding: "20px 25px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: 10,
                            borderLeft: `5px solid ${item.color}`,
                            fontSize: 24,
                            opacity: item.opacity,
                            alignItems: "center"
                        }}
                    >
                        <div style={{ fontWeight: "bold", color: item.color }}>
                            {item.type}
                        </div>
                        <div style={{ color: "#ddd" }}>{item.feature}</div>
                        <div style={{ color: "#ddd" }}>{item.application}</div>
                        <div style={{ color: "#aaa", fontSize: 20 }}>{item.experiment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};