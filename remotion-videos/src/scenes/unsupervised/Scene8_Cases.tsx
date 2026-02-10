import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const UnsupervisedScene8_Cases: React.FC = () => {
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

  // 三个案例依次出现
  const case1Opacity = interpolate(
    frame,
    [40, 70],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const case2Opacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const case3Opacity = interpolate(
    frame,
    [140, 170],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 结束语动画
  const endingOpacity = interpolate(
    frame,
    [190, 220],
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
        实际案例 🌟
      </h1>

      {/* 三个案例 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 25,
          width: "100%",
          maxWidth: "90%",
          marginBottom: 40
        }}
      >
        {/* 电商聚类 */}
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.7,
            opacity: case1Opacity,
            backgroundColor: "rgba(78, 205, 196, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #4ecdc4"
          }}
        >
          <p style={{ margin: 0, fontSize: 30, fontWeight: "bold", color: "#4ecdc4", marginBottom: 8 }}>
            🛒 电商聚类
          </p>
          <p style={{ margin: 0 }}>
            亚马逊用 <code style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 5 }}>DeepCluster</code> 算法将商品分成27万类<br/>
            <span style={{ color: "#4ecdc4" }}>（比人工分类多19倍）</span>
          </p>
        </div>

        {/* 降维奇效 */}
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.7,
            opacity: case2Opacity,
            backgroundColor: "rgba(240, 147, 251, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #f093fb"
          }}
        >
          <p style={{ margin: 0, fontSize: 30, fontWeight: "bold", color: "#f093fb", marginBottom: 8 }}>
            🚀 降维奇效
          </p>
          <p style={{ margin: 0 }}>
            NASA用 <code style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 5 }}>t-SNE</code> 分析星系图像<br/>
            <span style={{ color: "#f093fb" }}>将数据处理时间从3周缩短到4小时</span>
          </p>
        </div>

        {/* 关联暴利 */}
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.7,
            opacity: case3Opacity,
            backgroundColor: "rgba(245, 87, 108, 0.15)",
            padding: 30,
            borderRadius: 15,
            borderLeft: "5px solid #f5576c"
          }}
        >
          <p style={{ margin: 0, fontSize: 30, fontWeight: "bold", color: "#f5576c", marginBottom: 8 }}>
            💰 关联暴利
          </p>
          <p style={{ margin: 0 }}>
            7-Eleven发现 <code style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 5 }}>关东煮 + 清酒</code> 关联销售规律<br/>
            <span style={{ color: "#f5576c" }}>冬季单店增收 $6,800</span>
          </p>
        </div>
      </div>

      {/* 结束语 */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1.6,
          textAlign: "center",
          opacity: endingOpacity,
          backgroundColor: "rgba(240, 147, 251, 0.2)",
          padding: 30,
          borderRadius: 15,
          maxWidth: "80%",
          width: "100%",
          fontWeight: "bold"
        }}
      >
        <p style={{ margin: 0 }}>
          🎯 无监督学习：让AI自己发现数据中的宝藏！
        </p>
      </div>
    </div>
  );
};
