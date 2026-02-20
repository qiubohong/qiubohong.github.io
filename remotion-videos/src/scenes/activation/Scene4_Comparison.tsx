import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ActivationScene4_Comparison: React.FC = () => {
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

    // 表格动画
    const tableOpacity = interpolate(
        frame,
        [30, 60],
        [0, 1],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const comparisonData = [
        { name: "Sigmoid", gradient: "严重", efficiency: "★★☆", centered: "否", accuracy: "60%", problem: "梯度消失" },
        { name: "Tanh", gradient: "较重", efficiency: "★★☆", centered: "是", accuracy: "75%", problem: "梯度消失" },
        { name: "ReLU", gradient: "无", efficiency: "★★★★★", centered: "否", accuracy: "90%", problem: "Dead ReLU" },
        { name: "Leaky ReLU", gradient: "无", efficiency: "★★★★☆", centered: "否", accuracy: "92%", problem: "参数α敏感" },
        { name: "Swish", gradient: "无", efficiency: "★★★☆", centered: "否", accuracy: "95%", problem: "计算稍复杂" },
    ];

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#1a1a2e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 50,
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
                    color: "#00d9ff",
                }}
            >
                来看性能对比！
            </h1>

            {/* 对比表格 */}
            <div
                style={{
                    opacity: tableOpacity,
                    width: "95%",
                    maxWidth: "1600px",
                }}
            >
                {/* 表头 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1.2fr",
                        gap: "2px",
                        backgroundColor: "#00d9ff",
                        padding: "20px",
                        borderRadius: "10px 10px 0 0",
                        fontSize: 28,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    <div>函数</div>
                    <div>梯度消失</div>
                    <div>计算效率</div>
                    <div>输出中心化</div>
                    <div>SOTA精度</div>
                    <div>主要问题</div>
                </div>

                {/* 表格内容 */}
                {comparisonData.map((row, index) => (
                    <div
                        key={index}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1.2fr",
                            gap: "2px",
                            backgroundColor: index % 2 === 0 ? "rgba(0, 217, 255, 0.1)" : "rgba(0, 217, 255, 0.05)",
                            padding: "20px",
                            fontSize: 26,
                            textAlign: "center",
                            borderLeft: row.name === "ReLU" || row.name === "Swish" ? "5px solid #00d9ff" : "none",
                        }}
                    >
                        <div style={{ fontWeight: "bold", color: row.name === "Swish" ? "#ffd700" : "white" }}>
                            {row.name}
                        </div>
                        <div style={{ color: row.gradient === "无" ? "#4ecca3" : "#ff6b6b" }}>
                            {row.gradient}
                        </div>
                        <div>{row.efficiency}</div>
                        <div style={{ color: row.centered === "是" ? "#4ecca3" : "#cccccc" }}>
                            {row.centered}
                        </div>
                        <div style={{
                            fontWeight: row.accuracy === "95%" ? "bold" : "normal",
                            color: row.accuracy === "95%" ? "#ffd700" : "white"
                        }}>
                            {row.accuracy}
                        </div>
                        <div style={{ fontSize: 24, color: "#ffcc00" }}>{row.problem}</div>
                    </div>
                ))}
            </div>

            {/* 说明 - 突出结论 */}
            <div
                style={{
                    marginTop: 40,
                    fontSize: 36,
                    textAlign: "center",
                    opacity: tableOpacity,
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    padding: 30,
                    borderRadius: 15,
                    maxWidth: "1400px",
                }}
            >
                <strong style={{ fontSize: 42, color: "#ffd700" }}>结论：</strong><br />
                <strong style={{ color: "#ffd700" }}>Swish</strong> 精度最高 95%！<br />
                <strong style={{ color: "#4ecca3" }}>ReLU</strong> 效率最优 ⭐⭐⭐⭐⭐
            </div>
        </div>
    );
};
