import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const RNNScene7_FunFacts: React.FC = () => {
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
                    background: "linear-gradient(45deg, #ff6b6b, #ee5a6f)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                🤯 冷知识炸场
            </h2>

            {/* 冷知识列表 */}
            <div
                style={{
                    fontSize: 26,
                    lineHeight: 1.8,
                    textAlign: "left",
                    opacity: contentOpacity,
                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                    padding: 35,
                    borderRadius: 20,
                    borderLeft: "6px solid #ff6b6b",
                    maxWidth: "90%",
                    width: "100%"
                }}
            >
                <div style={{ marginBottom: 30 }}>
                    <strong style={{ fontSize: 30, color: "#ff6b6b" }}>1. ImageNet冠军的"陪跑"</strong><br />
                    2012年AlexNet夺冠引爆深度学习，<br />
                    而<strong>LSTM论文同年发表却无人问津</strong>，<br />
                    直至5年后成为NLP基石
                </div>

                <div style={{ marginBottom: 30 }}>
                    <strong style={{ fontSize: 30, color: "#ff6b6b" }}>2. 人脑 vs LSTM 能耗比</strong><br />
                    人脑处理一句话耗能≈0.3卡路里<br />
                    同等任务LSTM耗能≈<strong>1.2万倍</strong><br />
                    但错误率低40%！
                </div>

                <div style={{ marginBottom: 30 }}>
                    <strong style={{ fontSize: 30, color: "#ff6b6b" }}>3. 梯度消失的物理隐喻</strong><br />
                    RNN梯度消失 ≈ 山洞回声传递：<br />
                    距离越远，声音越微弱，<br />
                    10步后几乎消失
                </div>

                <div>
                    <strong style={{ fontSize: 30, color: "#ff6b6b" }}>4. 工业界的"返祖"现象</strong><br />
                    特斯拉自动驾驶放弃Transformer，<br />
                    回归<strong>GRU</strong>：因实时处理需求更高，<br />
                    GRU比LSTM快37%
                </div>
            </div>
        </div>
    );
};
