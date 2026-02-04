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
          color: "#ffd93d",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        🛠️ 动手试试！
      </h1>

      {/* 工具介绍 */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 40,
          opacity: toolIntroOpacity,
          maxWidth: "85%",
          width: "100%"
        }}
      >
        <p>
          打开 <strong style={{ color: "#ffd93d" }}>Google Teachable Machine</strong>
        </p>
        <p style={{ fontSize: 26, color: "#cccccc", marginTop: 10 }}>
          体验监督学习的实际应用
        </p>
      </div>

      {/* 操作步骤 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          gap: 25,
          marginBottom: 40,
          maxWidth: "1400px"
        }}
      >
        {/* 步骤1 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 107, 107, 0.1)",
            padding: 20,
            borderRadius: 12,
            border: "2px solid #ff6b6b",
            opacity: step1Opacity,
            textAlign: "center",
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              fontSize: 40,
              marginBottom: 12,
              color: "#ff6b6b"
            }}
          >
            1️⃣
          </div>
          <h3 style={{ fontSize: 26, color: "#ff6b6b", marginBottom: 12 }}>
            创建项目
          </h3>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: "#cccccc" }}>
            点击「图片项目」→ 创建「苹果」「橘子」分类
          </p>
        </div>

        {/* 步骤2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(78, 205, 196, 0.1)",
            padding: 20,
            borderRadius: 12,
            border: "2px solid #4ecdc4",
            opacity: step2Opacity,
            textAlign: "center",
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              fontSize: 40,
              marginBottom: 12,
              color: "#4ecdc4"
            }}
          >
            2️⃣
          </div>
          <h3 style={{ fontSize: 26, color: "#4ecdc4", marginBottom: 12 }}>
            上传样本
          </h3>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: "#cccccc" }}>
            用手机拍摄/上传20张样本图片
          </p>
        </div>

        {/* 步骤3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 217, 61, 0.1)",
            padding: 20,
            borderRadius: 12,
            border: "2px solid #ffd93d",
            opacity: step3Opacity,
            textAlign: "center",
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              fontSize: 40,
              marginBottom: 12,
              color: "#ffd93d"
            }}
          >
            3️⃣
          </div>
          <h3 style={{ fontSize: 26, color: "#ffd93d", marginBottom: 12 }}>
            训练测试
          </h3>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: "#cccccc" }}>
            点击「训练」→ 测试新图片识别效果！
          </p>
        </div>
      </div>

      {/* 工具链接 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          opacity: linkOpacity,
          backgroundColor: "rgba(255, 217, 61, 0.2)",
          padding: 20,
          borderRadius: 10,
          border: "2px solid #ffd93d",
          width: "65%",
          maxWidth: "650px"
        }}
      >
        <p style={{ margin: 0 }}>
          🔗 <strong>工具链接</strong>：
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: 22, color: "#4ecdc4" }}>
          https://teachablemachine.withgoogle.com/
        </p>
      </div>

      {/* 鼓励文字 */}
      <div
        style={{
          fontSize: 24,
          lineHeight: 1.6,
          textAlign: "center",
          marginTop: 30,
          opacity: linkOpacity,
          color: "#cccccc",
          width: "100%",
          maxWidth: "80%"
        }}
      >
        <p>
          亲自体验监督学习的魅力，创建你自己的图像分类器！
        </p>
      </div>
    </div>
  );
};