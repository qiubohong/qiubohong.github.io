import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const UnsupervisedScene4_Clustering: React.FC = () => {
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
        backgroundColor: "#1a1a2e",
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
          color: "#4ecdc4",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        聚类(K均值聚类) —— 物以类聚
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
          color: "#f093fb",
          fontWeight: "bold"
        }}
      >
        <p style={{ margin: 0 }}>
          主要解决问题："哪些东西本质相似？"
        </p>
      </div>

      {/* 例子 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.7,
          opacity: exampleOpacity,
          backgroundColor: "rgba(78, 205, 196, 0.15)",
          padding: 35,
          borderRadius: 15,
          maxWidth: "90%",
          width: "100%",
          borderLeft: "5px solid #4ecdc4"
        }}
      >
        <p style={{ margin: 0, marginBottom: 20, fontSize: 32, fontWeight: "bold", color: "#4ecdc4" }}>
          🍱 例子：自助餐厅菜品自动分区
        </p>
        <p style={{ margin: 0, marginBottom: 12 }}>
          • <strong>原始状态</strong>：200道菜杂乱摆放
        </p>
        <p style={{ margin: 0, marginBottom: 12 }}>
          • <strong>聚类过程</strong>：
        </p>
        <p style={{ margin: 0, marginLeft: 30, marginBottom: 8, fontSize: 26 }}>
          ✓ 算法检测菜品特征（烹饪方式/食材/口味）
        </p>
        <p style={{ margin: 0, marginLeft: 30, fontSize: 26 }}>
          ✓ 自动划分为：海鲜刺身区、川湘热炒区、西式烘焙区
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
          backgroundColor: "rgba(240, 147, 251, 0.2)",
          padding: 25,
          borderRadius: 15,
          maxWidth: "70%",
          width: "100%",
          fontWeight: "bold",
          color: "#f093fb"
        }}
      >
        <p style={{ margin: 0 }}>
          💡 价值：顾客5秒锁定目标区域
        </p>
      </div>
    </div>
  );
};
