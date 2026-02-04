import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene3_Types: React.FC = () => {
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

  // 类型介绍动画
  const typesOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 回归类型动画
  const regressionOpacity = interpolate(
    frame,
    [60, 90],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 分类类型动画
  const classificationOpacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 对比总结动画
  const summaryOpacity = interpolate(
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
        backgroundColor: "#1e1e1e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: "Arial, sans-serif",
        color: "white"
      }}
    >
      {/* 场景标题 */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: "bold",
          marginBottom: 40,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#4ecdc4"
        }}
      >
        监督学习的两种类型
      </h1>

      {/* 类型介绍 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 60,
          opacity: typesOpacity,
          maxWidth: "80%"
        }}
      >
        <p>怎么让AI模型根据训练数据，总结规律呢？主要分为两个类型：</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          gap: 40
        }}
      >
        {/* 回归类型 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 107, 107, 0.1)",
            padding: 30,
            borderRadius: 15,
            border: "2px solid #ff6b6b",
            opacity: regressionOpacity,
            textAlign: "center"
          }}
        >
          <h2 style={{ fontSize: 36, color: "#ff6b6b", marginBottom: 20 }}>
            📈 回归
          </h2>
          <p style={{ fontSize: 22, lineHeight: 1.5, marginBottom: 15 }}>
            <strong>数值预测</strong>
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.4, color: "#cccccc" }}>
            数据是连续的、具体的
          </p>
          <div style={{ marginTop: 20, fontSize: 16, color: "#999999" }}>
            <p>• 预测连续数值</p>
            <p>• 如：温度、价格、销量</p>
            <p>• 输出：具体数字</p>
          </div>
        </div>

        {/* 分类类型 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(78, 205, 196, 0.1)",
            padding: 30,
            borderRadius: 15,
            border: "2px solid #4ecdc4",
            opacity: classificationOpacity,
            textAlign: "center"
          }}
        >
          <h2 style={{ fontSize: 36, color: "#4ecdc4", marginBottom: 20 }}>
            🏷️ 分类
          </h2>
          <p style={{ fontSize: 22, lineHeight: 1.5, marginBottom: 15 }}>
            <strong>类别判断</strong>
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.4, color: "#cccccc" }}>
            数据是离散的
          </p>
          <div style={{ marginTop: 20, fontSize: 16, color: "#999999" }}>
            <p>• 预测离散类别</p>
            <p>• 如：猫/狗、是/否、A/B/C</p>
            <p>• 输出：类别标签</p>
          </div>
        </div>
      </div>

      {/* 对比总结 */}
      <div
        style={{
          fontSize: 24,
          lineHeight: 1.6,
          textAlign: "center",
          marginTop: 40,
          opacity: summaryOpacity,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 20,
          borderRadius: 10,
          maxWidth: "70%"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>关键区别</strong>：回归预测连续数值，分类预测离散类别
        </p>
      </div>
    </div>
  );
};