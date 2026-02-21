import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const RNNScene6_Applications: React.FC = () => {
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

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#16213e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 60px",
                fontFamily: "Arial, sans-serif",
                color: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxSizing: "border-box"
            }}
        >
            {/* 标题 */}
            <h2
                style={{
                    fontSize: 56,
                    fontWeight: "bold",
                    marginBottom: 40,
                    textAlign: "center",
                    opacity: titleOpacity,
                    background: "linear-gradient(45deg, #4facfe, #00f2fe)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                实际应用场景
            </h2>

            {/* 应用列表 */}
            <div
                style={{
                    fontSize: 26,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(79, 172, 254, 0.1)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #4facfe",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <div style={{ marginBottom: 25 }}>
                    <strong style={{ fontSize: 30, color: "#4facfe" }}>🎤 实时语音识别</strong><br />
                    <span style={{ color: "#cccccc" }}>推荐模型：GRU</span><br />
                    智能音箱指令解析 - 低延迟，参数少
                </div>

                <div style={{ marginBottom: 25 }}>
                    <strong style={{ fontSize: 30, color: "#4facfe" }}>📱 长文本翻译</strong><br />
                    <span style={{ color: "#cccccc" }}>推荐模型：LSTM</span><br />
                    ChatGPT早期版本 - 长期依赖捕捉
                </div>

                <div style={{ marginBottom: 25 }}>
                    <strong style={{ fontSize: 30, color: "#4facfe" }}>📈 股票价格预测</strong><br />
                    <span style={{ color: "#cccccc" }}>推荐模型：双向RNN</span><br />
                    高频交易波动分析 - 结合历史与未来趋势
                </div>

                <div>
                    <strong style={{ fontSize: 30, color: "#4facfe" }}>💃 视频动作生成</strong><br />
                    <span style={{ color: "#cccccc" }}>推荐模型：堆叠LSTM</span><br />
                    抖音AI跳舞视频 - 多层抽象时序特征
                </div>
            </div>
        </div>
    );
};
