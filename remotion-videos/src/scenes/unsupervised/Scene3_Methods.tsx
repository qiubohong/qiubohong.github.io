import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const UnsupervisedScene3_Methods: React.FC = () => {
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

  // 三个方法依次出现
  const method1Opacity = interpolate(
    frame,
    [40, 70],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const method2Opacity = interpolate(
    frame,
    [70, 100],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const method3Opacity = interpolate(
    frame,
    [100, 130],
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
          marginBottom: 80,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#f093fb",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        怎么做？三种主要方法
      </h1>

      {/* 三种方法 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "95%",
          gap: 40
        }}
      >
        {/* 聚类 */}
        <div
          style={{
            flex: 1,
            fontSize: 32,
            lineHeight: 1.8,
            opacity: method1Opacity,
            backgroundColor: "rgba(78, 205, 196, 0.2)",
            padding: 40,
            borderRadius: 20,
            textAlign: "center",
            border: "3px solid #4ecdc4"
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 20 }}>🔵</div>
          <p style={{ margin: 0, marginBottom: 20, fontSize: 42, fontWeight: "bold", color: "#4ecdc4" }}>
            聚类
          </p>
          <p style={{ margin: 0, fontSize: 28, color: "#cccccc" }}>
            相似数据分组
          </p>
        </div>

        {/* 降维 */}
        <div
          style={{
            flex: 1,
            fontSize: 32,
            lineHeight: 1.8,
            opacity: method2Opacity,
            backgroundColor: "rgba(240, 147, 251, 0.2)",
            padding: 40,
            borderRadius: 20,
            textAlign: "center",
            border: "3px solid #f093fb"
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 20 }}>📊</div>
          <p style={{ margin: 0, marginBottom: 20, fontSize: 42, fontWeight: "bold", color: "#f093fb" }}>
            降维
          </p>
          <p style={{ margin: 0, fontSize: 28, color: "#cccccc" }}>
            压缩数据特征
          </p>
        </div>

        {/* 关联 */}
        <div
          style={{
            flex: 1,
            fontSize: 32,
            lineHeight: 1.8,
            opacity: method3Opacity,
            backgroundColor: "rgba(245, 87, 108, 0.2)",
            padding: 40,
            borderRadius: 20,
            textAlign: "center",
            border: "3px solid #f5576c"
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 20 }}>🔗</div>
          <p style={{ margin: 0, marginBottom: 20, fontSize: 42, fontWeight: "bold", color: "#f5576c" }}>
            关联
          </p>
          <p style={{ margin: 0, fontSize: 28, color: "#cccccc" }}>
            发现数据关联规律
          </p>
        </div>
      </div>
    </div>
  );
};
