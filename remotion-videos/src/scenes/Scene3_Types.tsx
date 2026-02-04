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
        padding: 40,
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
          marginBottom: 30,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#4ecdc4",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        监督学习的两种类型
      </h1>

      {/* 类型介绍 */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 40,
          opacity: typesOpacity,
          maxWidth: "85%",
          width: "100%"
        }}
      >
        <p>怎么让AI模型根据训练数据，总结规律呢？主要分为两个类型：</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          gap: 30,
          maxWidth: "1600px"
        }}
      >
        {/* 回归类型 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 107, 107, 0.1)",
            padding: 25,
            borderRadius: 15,
            border: "2px solid #ff6b6b",
            opacity: regressionOpacity,
            textAlign: "center",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <h2 style={{ fontSize: 40, color: "#ff6b6b", marginBottom: 15 }}>
            📈 回归
          </h2>
          <p style={{ fontSize: 26, lineHeight: 1.5, marginBottom: 12 }}>
            <strong>数值预测</strong>
          </p>
          <p style={{ fontSize: 20, lineHeight: 1.4, color: "#cccccc" }}>
            数据是连续的、具体的
          </p>
          <div style={{ marginTop: 15, fontSize: 18, color: "#999999" }}>
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
            padding: 25,
            borderRadius: 15,
            border: "2px solid #4ecdc4",
            opacity: classificationOpacity,
            textAlign: "center",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <h2 style={{ fontSize: 40, color: "#4ecdc4", marginBottom: 15 }}>
            🏷️ 分类
          </h2>
          <p style={{ fontSize: 26, lineHeight: 1.5, marginBottom: 12 }}>
            <strong>类别判断</strong>
          </p>
          <p style={{ fontSize: 20, lineHeight: 1.4, color: "#cccccc" }}>
            数据是离散的
          </p>
          <div style={{ marginTop: 15, fontSize: 18, color: "#999999" }}>
            <p>• 预测离散类别</p>
            <p>• 如：猫/狗、是/否、A/B/C</p>
            <p>• 输出：类别标签</p>
          </div>
        </div>
      </div>

      {/* 对比总结 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          marginTop: 30,
          opacity: summaryOpacity,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 15,
          borderRadius: 10,
          maxWidth: "75%",
          width: "100%"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>关键区别</strong>：回归预测连续数值，分类预测离散类别
        </p>
      </div>
    </div>
  );
};