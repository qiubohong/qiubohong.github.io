import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const UnsupervisedScene6_Association: React.FC = () => {
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
        backgroundColor: "#0f3460",
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
          color: "#f5576c",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        关联(Association) —— 发现隐藏规律
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
          主要解决问题："哪些事总一起发生？"
        </p>
      </div>

      {/* 例子 */}
      <div
        style={{
          fontSize: 27,
          lineHeight: 1.7,
          opacity: exampleOpacity,
          backgroundColor: "rgba(245, 87, 108, 0.15)",
          padding: 35,
          borderRadius: 15,
          maxWidth: "90%",
          width: "100%",
          borderLeft: "5px solid #f5576c"
        }}
      >
        <p style={{ margin: 0, marginBottom: 20, fontSize: 32, fontWeight: "bold", color: "#f5576c" }}>
          🏪 例子：便利店商品摆放策略
        </p>
        <p style={{ margin: 0, marginBottom: 12 }}>
          • <strong>原始数据</strong>：10万条购物小票
        </p>
        <p style={{ margin: 0, marginBottom: 12 }}>
          • <strong>关联规则挖掘</strong>：
        </p>
        <p style={{ margin: 0, marginLeft: 30, marginBottom: 8, fontSize: 25 }}>
          {"{薯片，可乐}"} → {"{纸巾}"} [支持度=22%，置信度=81%]
        </p>
        <p style={{ margin: 0, marginLeft: 30, fontSize: 25 }}>
          规律：买零食饮料的顾客81%会顺手拿纸巾
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
          maxWidth: "75%",
          width: "100%",
          fontWeight: "bold",
          color: "#f093fb"
        }}
      >
        <p style={{ margin: 0 }}>
          💡 价值：收银台旁放置纸巾架 → 纸巾销量+35%
        </p>
      </div>
    </div>
  );
};
