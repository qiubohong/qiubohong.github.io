import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene1_IntroductionProps {
  title: string;
}

export const Scene1_Introduction: React.FC<Scene1_IntroductionProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题动画效果
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 60], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 副标题动画效果
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 内容动画效果
  const contentOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 要点逐个显示
  const point1Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {/* 主标题 */}
      <div style={{
        position: "absolute",
        top: "15%",
        left: "50%",
        transform: `translateX(-50%) scale(${titleScale})`,
        opacity: titleOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h1 style={{
          fontSize: 72,
          fontWeight: "900",
          color: "#1a1a2e",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          2026年AI应用开发最佳学习路线
        </h1>
      </div>

      {/* 副标题 */}
      <div style={{
        position: "absolute",
        top: "32%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: subtitleOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h2 style={{
          fontSize: 56,
          fontWeight: "700",
          color: "#4f46e5",
          margin: "20px 0",
          textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          从零到一，掌握AI开发核心技能
        </h2>
      </div>

      {/* 核心观点 */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: contentOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1200px"
      }}>
        <p style={{
          fontSize: 36,
          fontWeight: "600",
          color: "#374151",
          lineHeight: 1.6,
          margin: "20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          学习一门技能最重要的是<span style={{ color: "#0891b2" }}>目标</span>和<span style={{ color: "#0891b2" }}>路线</span>
        </p>
      </div>

      {/* 要点说明 */}
      <div style={{
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "left",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <div style={{
          opacity: point1Opacity,
          marginBottom: 20,
          display: "flex",
          alignItems: "center"
        }}>
          <span style={{
            fontSize: 32,
            color: "#4f46e5",
            marginRight: 15
          }}>🎯</span>
          <p style={{
            fontSize: 28,
            fontWeight: "400",
            color: "#4b5563",
            lineHeight: 1.5,
            margin: 0,
            fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
          }}>
            有了目标，才能知道所学可以用到哪里
          </p>
        </div>
        
        <div style={{
          opacity: point2Opacity,
          display: "flex",
          alignItems: "center"
        }}>
          <span style={{
            fontSize: 32,
            color: "#4f46e5",
            marginRight: 15
          }}>🛤️</span>
          <p style={{
            fontSize: 28,
            fontWeight: "400",
            color: "#4b5563",
            lineHeight: 1.5,
            margin: 0,
            fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
          }}>
            有了路线，才能知道该学什么，怎么学
          </p>
        </div>
      </div>

      {/* 作者信息 */}
      <div style={{
        position: "absolute",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: contentOpacity,
        textAlign: "center"
      }}>
        <p style={{
          fontSize: 24,
          fontWeight: "300",
          color: "#6b7280",
          margin: 0,
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          做一个有温度和有干货的技术分享作者 —— Qborfy
        </p>
      </div>
    </AbsoluteFill>
  );
};
