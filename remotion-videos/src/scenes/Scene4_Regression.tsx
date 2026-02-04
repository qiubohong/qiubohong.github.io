import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene4_Regression: React.FC = () => {
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

  // 例子介绍动画
  const exampleOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 预测目标动画
  const targetOpacity = interpolate(
    frame,
    [60, 90],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 算法动画
  const algorithmOpacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 训练数据动画
  const dataOpacity = interpolate(
    frame,
    [120, 150],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 最终输出动画
  const outputOpacity = interpolate(
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
        backgroundColor: "#2a2a2a",
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
          color: "#ff6b6b"
        }}
      >
        📈 回归任务
      </h1>

      {/* 例子介绍 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 40,
          opacity: exampleOpacity,
          maxWidth: "80%"
        }}
      >
        <p>
          <strong>例子</strong>：天气预测，连续数值（如温度）的预测
        </p>
      </div>

      {/* 预测目标 */}
      <div
        style={{
          fontSize: 24,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 30,
          opacity: targetOpacity,
          backgroundColor: "rgba(255, 107, 107, 0.1)",
          padding: 20,
          borderRadius: 10,
          width: "70%"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>预测目标</strong>：今天天气是多少度
        </p>
      </div>

      {/* 常见算法 */}
      <div
        style={{
          fontSize: 22,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 40,
          opacity: algorithmOpacity,
          backgroundColor: "rgba(78, 205, 196, 0.1)",
          padding: 20,
          borderRadius: 10,
          width: "60%"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>常见算法</strong>：线性回归、决策树回归
        </p>
      </div>

      {/* 训练数据 */}
      <div
        style={{
          fontSize: 20,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 40,
          opacity: dataOpacity,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 25,
          borderRadius: 10,
          width: "80%"
        }}
      >
        <p style={{ marginBottom: 15 }}>
          <strong>提供训练数据</strong>：
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            flexWrap: "wrap"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#ff6b6b" }}>A(湿度)</div>
            <div style={{ fontSize: 16, color: "#cccccc" }}>输入特征</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#ff6b6b" }}>B(风力)</div>
            <div style={{ fontSize: 16, color: "#cccccc" }}>输入特征</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#ff6b6b" }}>C(海拔)</div>
            <div style={{ fontSize: 16, color: "#cccccc" }}>输入特征</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#ff6b6b" }}>D(风向)</div>
            <div style={{ fontSize: 16, color: "#cccccc" }}>输入特征</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#4ecdc4" }}>Y(温度)</div>
            <div style={{ fontSize: 16, color: "#cccccc" }}>目标变量</div>
          </div>
        </div>
      </div>

      {/* 最终输出 */}
      <div
        style={{
          fontSize: 26,
          lineHeight: 1.6,
          textAlign: "center",
          opacity: outputOpacity,
          backgroundColor: "rgba(78, 205, 196, 0.2)",
          padding: 30,
          borderRadius: 15,
          border: "2px solid #4ecdc4",
          width: "70%"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>最终输出</strong>：Y = f(A,B,C,D) 公式
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: 20, color: "#cccccc" }}>
          输入新的ABCD，得到最终天气温度
        </p>
      </div>
    </div>
  );
};