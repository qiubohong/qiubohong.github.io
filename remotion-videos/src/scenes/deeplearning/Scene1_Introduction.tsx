import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene1_IntroductionProps {
  title: string;
}

export const Scene1_Introduction: React.FC<Scene1_IntroductionProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

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

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      
      {/* 主标题 */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: `translateX(-50%) scale(${titleScale})`,
        opacity: titleOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h1 style={{
          fontSize: 80,
          fontWeight: "900",
          color: "#ffffff",
          margin: 0,
          textShadow: "0 4px 8px rgba(0,0,0,0.8)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          5分钟AI，每天搞懂一个知识点(5)
        </h1>
      </div>

      {/* 副标题 */}
      <div style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: subtitleOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h2 style={{
          fontSize: 64,
          fontWeight: "700",
          color: "#ff6b6b",
          margin: "20px 0",
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          深度学习
        </h2>
      </div>

      {/* 一句话理解 */}
      <div style={{
        position: "absolute",
        top: "55%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: contentOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1200px"
      }}>
        <p style={{
          fontSize: 36,
          fontWeight: "500",
          color: "#e0e0e0",
          lineHeight: 1.6,
          margin: "30px 0",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          让计算机像人类大脑一样，通过堆叠多层的‘神经元网络’，从原始数据中自动学习由简单到复杂的多层次特征表达，最终实现智能决策。
        </p>
      </div>

      {/* 对比说明 */}
      <div style={{
        position: "absolute",
        top: "75%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: contentOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <p style={{
          fontSize: 28,
          fontWeight: "400",
          color: "#b0b0b0",
          lineHeight: 1.5,
          margin: "20px 0",
          fontStyle: "italic",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          对比之前机器学习，就是让计算机学会“举一反三”的深度思考能力，如：从认识鸟，到自动分辨出老鹰和麻雀的特征。
        </p>
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
          color: "#888888",
          margin: 0,
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          做一个有温度和有干货的技术分享作者 —— Qborfy
        </p>
      </div>
    </AbsoluteFill>
  );
};