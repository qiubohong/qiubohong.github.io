import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene5_Classification: React.FC = () => {
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

  // 标签分值动画
  const scoresOpacity = interpolate(
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
        🏷️ 分类任务
      </h1>

      {/* 例子介绍 */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 30,
          opacity: exampleOpacity,
          maxWidth: "85%",
          width: "100%"
        }}
      >
        <p>
          <strong>例子</strong>：动物分类，离散类别数据（如：猫、狗）的预测
        </p>
      </div>

      {/* 预测目标 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 25,
          opacity: targetOpacity,
          backgroundColor: "rgba(78, 205, 196, 0.1)",
          padding: 15,
          borderRadius: 10,
          width: "75%",
          maxWidth: "600px"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>预测目标</strong>：判断图片是猫还是狗
        </p>
      </div>

      {/* 常见算法 */}
      <div
        style={{
          fontSize: 26,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 30,
          opacity: algorithmOpacity,
          backgroundColor: "rgba(255, 107, 107, 0.1)",
          padding: 15,
          borderRadius: 10,
          width: "65%",
          maxWidth: "500px"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>常见算法</strong>：逻辑回归、支持向量机
        </p>
      </div>

      {/* 标签分值 */}
      <div
        style={{
          fontSize: 24,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 30,
          opacity: scoresOpacity,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 20,
          borderRadius: 10,
          width: "85%",
          maxWidth: "800px"
        }}
      >
        <p style={{ marginBottom: 15, fontSize: 26 }}>
          <strong>标签分值</strong>：
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: 35,
            flexWrap: "wrap"
          }}
        >
          {/* 猫的特征 */}
          <div
            style={{
              textAlign: "center",
              backgroundColor: "rgba(255, 107, 107, 0.1)",
              padding: 20,
              borderRadius: 8,
              border: "1px solid #ff6b6b",
              minWidth: "200px"
            }}
          >
            <h3 style={{ color: "#ff6b6b", marginBottom: 15, fontSize: 24 }}>🐱 猫</h3>
            <div style={{ fontSize: 18, lineHeight: 1.4 }}>
              <p>眼睛(5)</p>
              <p>鼻子(7)</p>
              <p>耳朵(6)</p>
              <p>嘴巴(7)</p>
              <p style={{ marginTop: 15, fontWeight: "bold", fontSize: 20 }}>总分: 25</p>
            </div>
          </div>

          {/* 狗的特征 */}
          <div
            style={{
              textAlign: "center",
              backgroundColor: "rgba(78, 205, 196, 0.1)",
              padding: 20,
              borderRadius: 8,
              border: "1px solid #4ecdc4",
              minWidth: "200px"
            }}
          >
            <h3 style={{ color: "#4ecdc4", marginBottom: 15, fontSize: 24 }}>🐶 狗</h3>
            <div style={{ fontSize: 18, lineHeight: 1.4 }}>
              <p>眼睛(5)</p>
              <p>鼻子(5)</p>
              <p>耳朵(6)</p>
              <p>嘴巴(7)</p>
              <p style={{ marginTop: 15, fontWeight: "bold", fontSize: 20 }}>总分: 23</p>
            </div>
          </div>
        </div>
      </div>

      {/* 最终输出 */}
      <div
        style={{
          fontSize: 30,
          lineHeight: 1.6,
          textAlign: "center",
          opacity: outputOpacity,
          backgroundColor: "rgba(255, 107, 107, 0.2)",
          padding: 25,
          borderRadius: 15,
          border: "2px solid #ff6b6b",
          width: "75%",
          maxWidth: "600px"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>最终输出</strong>：
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 15
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ff6b6b", fontSize: 24 }}>猫</div>
            <div style={{ fontSize: 20, color: "#cccccc" }}>20~40分</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#4ecdc4", fontSize: 24 }}>狗</div>
            <div style={{ fontSize: 20, color: "#cccccc" }}>42~60分</div>
          </div>
        </div>
        <p style={{ margin: "15px 0 0 0", fontSize: 22, color: "#cccccc" }}>
          输入图片得到最终分类
        </p>
      </div>
    </div>
  );
};