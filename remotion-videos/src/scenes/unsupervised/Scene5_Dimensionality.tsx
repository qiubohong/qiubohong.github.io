import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const UnsupervisedScene5_Dimensionality: React.FC = () => {
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

  // 问题动画
  const problemOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 例子动画
  const exampleOpacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 价值动画
  const valueOpacity = interpolate(
    frame,
    [210, 240],
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
        padding: 50,
        fontFamily: "Arial, sans-serif",
        color: "white",
        width: "100%",
        height: "100%"
      }}
    >
      {/* 场景标题 */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#f093fb",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        降维(PCA) —— 去芜存菁
      </h1>

      {/* 主要解决问题 */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 35,
          opacity: problemOpacity,
          maxWidth: "85%",
          width: "100%",
          color: "#4ecdc4",
          fontWeight: "bold"
        }}
      >
        <p style={{ margin: 0 }}>
          主要解决问题："如何简化复杂信息？"
        </p>
      </div>

      {/* 例子 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.7,
          opacity: exampleOpacity,
          backgroundColor: "rgba(240, 147, 251, 0.15)",
          padding: 35,
          borderRadius: 15,
          maxWidth: "90%",
          width: "100%",
          borderLeft: "5px solid #f093fb"
        }}
      >
        <p style={{ margin: 0, marginBottom: 20, fontSize: 32, fontWeight: "bold", color: "#f093fb" }}>
          🏠 例子：购房决策简化模型
        </p>
        <p style={{ margin: 0, marginBottom: 12 }}>
          • <strong>原始参数</strong>：20个维度（学区/通勤/绿化率/物业费...）
        </p>
        <p style={{ margin: 0, marginBottom: 12 }}>
          • <strong>降维过程</strong>：
        </p>
        <p style={{ margin: 0, marginLeft: 30, marginBottom: 8, fontSize: 26 }}>
          ✓ 算法提取核心特征 → 教育资源指数 & 生活便利度
        </p>
        <p style={{ margin: 0, marginLeft: 30, fontSize: 26 }}>
          ✓ 生成二维图谱
        </p>
      </div>

      {/* 价值 */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.6,
          textAlign: "center",
          marginTop: 35,
          opacity: valueOpacity,
          backgroundColor: "rgba(78, 205, 196, 0.2)",
          padding: 25,
          borderRadius: 15,
          maxWidth: "70%",
          width: "100%",
          fontWeight: "bold",
          color: "#4ecdc4"
        }}
      >
        <p style={{ margin: 0 }}>
          💡 价值：半小时锁定目标房源
        </p>
      </div>
    </div>
  );
};
