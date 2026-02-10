import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const UnsupervisedScene2_Definition: React.FC = () => {
  const frame = useCurrentFrame();
  
  // 标题动画
  const titleOpacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 定义内容动画
  const definitionOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 特征动画
  const featuresOpacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 误区动画
  const misconceptionOpacity = interpolate(
    frame,
    [150, 180],
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
        padding: 60,
        fontFamily: "Arial, sans-serif",
        color: "white",
        width: "100%",
        height: "100%"
      }}
    >
      {/* 场景标题 */}
      <h1
        style={{
          fontSize: 76,
          fontWeight: "bold",
          marginBottom: 50,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#f093fb",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        无监督学习是什么？
      </h1>

      {/* 核心定义 */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1.8,
          textAlign: "center",
          marginBottom: 40,
          opacity: definitionOpacity,
          maxWidth: "85%",
          width: "100%",
          backgroundColor: "rgba(240, 147, 251, 0.15)",
          padding: 35,
          borderRadius: 15
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>定义</strong>：从未标记数据中挖掘隐藏模式，<br/>
          通常采用<span style={{ color: "#4ecdc4" }}>聚类、降维、关联</span>等算法<br/>
          去发现数据中的规律
        </p>
      </div>

      {/* 关键特征和误区 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "90%",
          gap: 40
        }}
      >
        {/* 关键特征 */}
        <div
          style={{
            flex: 1,
            fontSize: 30,
            lineHeight: 1.6,
            opacity: featuresOpacity,
            backgroundColor: "rgba(78, 205, 196, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #4ecdc4"
          }}
        >
          <p style={{ margin: 0, marginBottom: 15, fontSize: 32, fontWeight: "bold" }}>
            ✅ 关键特征
          </p>
          <p style={{ margin: 0, marginBottom: 10 }}>• 无老师指导</p>
          <p style={{ margin: 0 }}>• 数据无标签</p>
        </div>

        {/* 常见误区 */}
        <div
          style={{
            flex: 1,
            fontSize: 30,
            lineHeight: 1.6,
            opacity: misconceptionOpacity,
            backgroundColor: "rgba(245, 87, 108, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #f5576c"
          }}
        >
          <p style={{ margin: 0, marginBottom: 15, fontSize: 32, fontWeight: "bold" }}>
            ❌ 常见误区
          </p>
          <p style={{ margin: 0 }}>
            ≠ 完全不需要人类<br/>
            <span style={{ fontSize: 24, color: "#cccccc" }}>
              （仍需设计算法目标）
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
