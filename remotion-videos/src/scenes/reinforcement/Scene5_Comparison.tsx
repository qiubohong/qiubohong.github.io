import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const ReinforcementScene5_Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  
  // 标题动画
  const titleOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 表格动画
  const tableOpacity = interpolate(
    frame,
    [30, 60],
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
      {/* 标题 */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          marginBottom: 50,
          textAlign: "center",
          opacity: titleOpacity,
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        免模型 vs 有模型
      </h1>

      {/* 对比表格 */}
      <div
        style={{
          opacity: tableOpacity,
          width: "90%",
          maxWidth: "1600px",
        }}
      >
        {/* 表头 */}
        <div style={{ display: "flex", marginBottom: 20 }}>
          <div style={{ flex: 1, fontSize: 36, fontWeight: "bold", color: "#667eea", textAlign: "center" }}>
            维度
          </div>
          <div style={{ flex: 1, fontSize: 36, fontWeight: "bold", color: "#43e97b", textAlign: "center" }}>
            免模型学习
          </div>
          <div style={{ flex: 1, fontSize: 36, fontWeight: "bold", color: "#fa709a", textAlign: "center" }}>
            有模型学习
          </div>
        </div>

        {/* 表格行 */}
        {[
          { dim: "核心思想", free: "直接学习策略", based: "先理解环境运作规则" },
          { dim: "工作方式", free: "试错→记下最佳动作", based: "构建环境模拟器→规划行动" },
          { dim: "计算成本", free: "低（不需模拟环境）", based: "高（需建模环境动态）" },
          { dim: "适用场景", free: "环境复杂难建模", based: "环境可精确仿真" },
          { dim: "代表算法", free: "Q-Learning, DQN", based: "动态规划, MCTS" },
        ].map((row, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              marginBottom: 15,
              backgroundColor: "rgba(102, 126, 234, 0.1)",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <div style={{ flex: 1, fontSize: 28, color: "#cccccc", textAlign: "center" }}>
              {row.dim}
            </div>
            <div style={{ flex: 1, fontSize: 26, color: "#ffffff", textAlign: "center" }}>
              {row.free}
            </div>
            <div style={{ flex: 1, fontSize: 26, color: "#ffffff", textAlign: "center" }}>
              {row.based}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
