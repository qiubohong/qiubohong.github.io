import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene6_HandsOn: React.FC = () => {
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

  // 工具介绍动画
  const toolIntroOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 步骤1动画
  const step1Opacity = interpolate(
    frame,
    [60, 90],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 步骤2动画
  const step2Opacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 步骤3动画
  const step3Opacity = interpolate(
    frame,
    [120, 150],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 链接动画
  const linkOpacity = interpolate(
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
          color: "#ffd93d"
        }}
      >
        🛠️ 动手试试！
      </h1>

      {/* 工具介绍 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 50,
          opacity: toolIntroOpacity,
          maxWidth: "80%"
        }}
      >
        <p>
          打开 <strong style={{ color: "#ffd93d" }}>Google Teachable Machine</strong>
        </p>
        <p style={{ fontSize: 24, color: "#cccccc", marginTop: 10 }}>
          体验监督学习的实际应用
        </p>
      </div>

      {/* 操作步骤 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          gap: 30,
          marginBottom: 50
        }}
      >
        {/* 步骤1 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 107, 107, 0.1)",
            padding: 25,
            borderRadius: 12,
            border: "2px solid #ff6b6b",
            opacity: step1Opacity,
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: 36,
              marginBottom: 15,
              color: "#ff6b6b"
            }}
          >
            1️⃣
          </div>
          <h3 style={{ fontSize: 24, color: "#ff6b6b", marginBottom: 15 }}>
            创建项目
          </h3>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: "#cccccc" }}>
            点击「图片项目」→ 创建「苹果」「橘子」分类
          </p>
        </div>

        {/* 步骤2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(78, 205, 196, 0.1)",
            padding: 25,
            borderRadius: 12,
            border: "2px solid #4ecdc4",
            opacity: step2Opacity,
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: 36,
              marginBottom: 15,
              color: "#4ecdc4"
            }}
          >
            2️⃣
          </div>
          <h3 style={{ fontSize: 24, color: "#4ecdc4", marginBottom: 15 }}>
            上传样本
          </h3>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: "#cccccc" }}>
            用手机拍摄/上传20张样本图片
          </p>
        </div>

        {/* 步骤3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 217, 61, 0.1)",
            padding: 25,
            borderRadius: 12,
            border: "2px solid #ffd93d",
            opacity: step3Opacity,
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: 36,
              marginBottom: 15,
              color: "#ffd93d"
            }}
          >
            3️⃣
          </div>
          <h3 style={{ fontSize: 24, color: "#ffd93d", marginBottom: 15 }}>
            训练测试
          </h3>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: "#cccccc" }}>
            点击「训练」→ 测试新图片识别效果！
          </p>
        </div>
      </div>

      {/* 工具链接 */}
      <div
        style={{
          fontSize: 24,
          lineHeight: 1.6,
          textAlign: "center",
          opacity: linkOpacity,
          backgroundColor: "rgba(255, 217, 61, 0.2)",
          padding: 25,
          borderRadius: 10,
          border: "2px solid #ffd93d",
          width: "60%"
        }}
      >
        <p style={{ margin: 0 }}>
          🔗 <strong>工具链接</strong>：
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: 20, color: "#4ecdc4" }}>
          https://teachablemachine.withgoogle.com/
        </p>
      </div>

      {/* 鼓励文字 */}
      <div
        style={{
          fontSize: 22,
          lineHeight: 1.6,
          textAlign: "center",
          marginTop: 40,
          opacity: linkOpacity,
          color: "#cccccc"
        }}
      >
        <p>
          亲自体验监督学习的魅力，创建你自己的图像分类器！
        </p>
      </div>
    </div>
  );
};