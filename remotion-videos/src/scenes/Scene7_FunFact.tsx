import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene7_FunFact: React.FC = () => {
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

  // 冷知识内容动画
  const factOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 数据可视化动画
  const dataOpacity = interpolate(
    frame,
    [60, 90],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 结束语动画
  const conclusionOpacity = interpolate(
    frame,
    [120, 150],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 作者信息动画
  const authorOpacity = interpolate(
    frame,
    [180, 210],
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
        backgroundColor: "#1a1a1a",
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
        🧠 冷知识
      </h1>

      {/* 冷知识内容 */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 50,
          opacity: factOpacity,
          maxWidth: "80%"
        }}
      >
        <p>
          <strong>ImageNet数据集</strong>包含<strong style={{ color: "#ff6b6b" }}>1400万张</strong>带标签图片
        </p>
      </div>

      {/* 数据可视化 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 60,
          opacity: dataOpacity,
          backgroundColor: "rgba(78, 205, 196, 0.1)",
          padding: 30,
          borderRadius: 15,
          border: "2px solid #4ecdc4",
          width: "70%"
        }}
      >
        <p style={{ margin: 0 }}>
          AI学习ImageNet数据集相当于
        </p>
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "#ffd93d",
            margin: "20px 0"
          }}
        >
          16年
        </div>
        <p style={{ margin: 0, fontSize: 24, color: "#cccccc" }}>
          人类不眠不休看照片的时间！
        </p>
      </div>

      {/* 结束语 */}
      <div
        style={{
          fontSize: 26,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 40,
          opacity: conclusionOpacity,
          maxWidth: "70%"
        }}
      >
        <p>
          这就是监督学习的魅力——通过大量标注数据，
          AI能够学习到人类难以想象的复杂规律！
        </p>
      </div>

      {/* 总结回顾 */}
      <div
        style={{
          fontSize: 22,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 50,
          opacity: conclusionOpacity,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 25,
          borderRadius: 10,
          width: "80%"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>今天学到了：</strong>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 20,
            flexWrap: "wrap",
            gap: 20
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ff6b6b", fontSize: 20 }}>📚 监督学习定义</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#4ecdc4", fontSize: 20 }}>📈 回归任务</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ffd93d", fontSize: 20 }}>🏷️ 分类任务</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#6c5ce7", fontSize: 20 }}>🛠️ 动手实践</div>
          </div>
        </div>
      </div>

      {/* 作者信息和结束 */}
      <div
        style={{
          fontSize: 20,
          lineHeight: 1.6,
          textAlign: "center",
          opacity: authorOpacity,
          color: "#888888"
        }}
      >
        <p>做一个有温度和有干货的技术分享作者</p>
        <p style={{ marginTop: 10 }}>
          —— <a href="https://qborfy.com" style={{ color: "#4ecdc4" }}>Qborfy</a>
        </p>
        <p style={{ marginTop: 30, fontSize: 24, color: "#cccccc" }}>
          明天继续学习新的AI知识点！
        </p>
      </div>
    </div>
  );
};