import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const UnsupervisedScene7_HandsOn: React.FC = () => {
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

  // 三个实验依次出现
  const exp1Opacity = interpolate(
    frame,
    [40, 70],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const exp2Opacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const exp3Opacity = interpolate(
    frame,
    [140, 170],
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
        backgroundColor: "#1a1a2e",
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
          marginBottom: 60,
          textAlign: "center",
          opacity: titleOpacity,
          color: "#f093fb",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        动手实验 🧪
      </h1>

      {/* 三个实验 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          width: "100%",
          maxWidth: "90%"
        }}
      >
        {/* 聚类实操 */}
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.7,
            opacity: exp1Opacity,
            backgroundColor: "rgba(78, 205, 196, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #4ecdc4"
          }}
        >
          <p style={{ margin: 0, fontSize: 32, fontWeight: "bold", color: "#4ecdc4", marginBottom: 10 }}>
            🔵 聚类实操
          </p>
          <p style={{ margin: 0 }}>
            用 <code style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 5 }}>K-means GUI</code> 可视化分群过程
          </p>
        </div>

        {/* 降维对比 */}
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.7,
            opacity: exp2Opacity,
            backgroundColor: "rgba(240, 147, 251, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #f093fb"
          }}
        >
          <p style={{ margin: 0, fontSize: 32, fontWeight: "bold", color: "#f093fb", marginBottom: 10 }}>
            📊 降维对比
          </p>
          <p style={{ margin: 0 }}>
            在 <code style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 5 }}>TensorFlow Embedding Projector</code> 看词向量压缩
          </p>
        </div>

        {/* 关联发现 */}
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.7,
            opacity: exp3Opacity,
            backgroundColor: "rgba(245, 87, 108, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #f5576c"
          }}
        >
          <p style={{ margin: 0, fontSize: 32, fontWeight: "bold", color: "#f5576c", marginBottom: 10 }}>
            🔗 关联发现
          </p>
          <p style={{ margin: 0 }}>
            通过Python实现超市购物车数据分析
          </p>
        </div>
      </div>

      {/* 提示 */}
      <div
        style={{
          fontSize: 24,
          textAlign: "center",
          opacity: exp3Opacity,
          color: "#888888",
          marginTop: 40
        }}
      >
        <p style={{ margin: 0 }}>
          💡 所有工具都有在线版本，可以直接体验！
        </p>
      </div>
    </div>
  );
};
