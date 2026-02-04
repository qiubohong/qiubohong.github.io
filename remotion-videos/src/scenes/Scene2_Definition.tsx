import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const Scene2_Definition: React.FC = () => {
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

  // 定义内容动画
  const definitionOpacity = interpolate(
    frame,
    [30, 60],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 比喻动画
  const analogyOpacity = interpolate(
    frame,
    [90, 120],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 详细解释动画
  const explanationOpacity = interpolate(
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
          color: "#ff6b6b",
          width: "100%",
          maxWidth: "90%"
        }}
      >
        监督学习是什么？
      </h1>

      {/* 核心定义 */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 30,
          opacity: definitionOpacity,
          maxWidth: "85%",
          width: "100%"
        }}
      >
        <blockquote
          style={{
            borderLeft: "4px solid #4ecdc4",
            paddingLeft: 20,
            margin: 0,
            fontStyle: "italic"
          }}
        >
          <strong>监督学习</strong>：让AI像学生一样，通过「带答案的习题集」学习总结出规律，
          然后根据规律应用到新的习题中。
        </blockquote>
      </div>

      {/* 生动比喻 */}
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.5,
          textAlign: "center",
          marginBottom: 30,
          opacity: analogyOpacity,
          backgroundColor: "rgba(78, 205, 196, 0.1)",
          padding: 25,
          borderRadius: 10,
          maxWidth: "75%",
          width: "100%"
        }}
      >
        <p style={{ margin: 0 }}>
          💡 <strong>简单理解</strong>：就像老师给学生批改作业，
          告诉学生哪些做对了，哪些做错了，学生从中学习规律。
        </p>
      </div>

      {/* 技术定义 */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1.6,
          textAlign: "center",
          opacity: explanationOpacity,
          maxWidth: "85%",
          color: "#cccccc",
          width: "100%"
        }}
      >
        <p>
          监督学习是机器学习中的一种方式，把已经分类的数据给到数据模型，
          让模型自己学习规律，然后对没有分类的数据进行分类。
        </p>
      </div>
    </div>
  );
};