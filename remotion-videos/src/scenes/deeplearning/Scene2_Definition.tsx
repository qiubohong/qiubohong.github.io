import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface Scene2_DefinitionProps {}

export const Scene2_Definition: React.FC<Scene2_DefinitionProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // 标题动画效果
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 定义内容动画效果
  const definitionOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 对比表格动画效果
  const tableOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 关键认知动画效果
  const keyInsightOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#2d3436" }}>
      {/* 标题 */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
        textAlign: "center",
        width: "90%"
      }}>
        <h2 style={{
          fontSize: 64,
          fontWeight: "800",
          color: "#ff7675",
          margin: 0,
          textShadow: "0 4px 8px rgba(0,0,0,0.6)",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          深度学习是什么？
        </h2>
      </div>

      {/* 定义内容 */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: definitionOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <p style={{
          fontSize: 32,
          fontWeight: "500",
          color: "#e0e0e0",
          lineHeight: 1.6,
          margin: "20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          <strong>定义</strong>: 深度学习（也称为深度结构化学习或分层学习）是基于学习数据表示的更广泛的机器学习方法系列的一部分，而不是特定于任务的算法。学习可以是监督，半监督或无监督。
        </p>
      </div>

      {/* 对比表格 */}
      <div style={{
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: tableOpacity,
        textAlign: "center",
        width: "90%",
        maxWidth: "1200px"
      }}>
        <h3 style={{
          fontSize: 36,
          fontWeight: "700",
          color: "#74b9ff",
          margin: "30px 0 20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          与传统机器学习对比
        </h3>
        
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 24,
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#0984e3" }}>
              <th style={{
                padding: "15px",
                border: "1px solid #ddd",
                color: "white",
                fontWeight: "bold"
              }}>能力</th>
              <th style={{
                padding: "15px",
                border: "1px solid #ddd",
                color: "white",
                fontWeight: "bold"
              }}>传统方法</th>
              <th style={{
                padding: "15px",
                border: "1px solid #ddd",
                color: "white",
                fontWeight: "bold"
              }}>深度学习</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: "#2d3436" }}>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#e0e0e0",
                fontWeight: "600"
              }}>特征工程依赖度</td>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#ff7675"
              }}>人工设计特征</td>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#00b894"
              }}>自动学习特征</td>
            </tr>
            <tr style={{ backgroundColor: "#3d4547" }}>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#e0e0e0",
                fontWeight: "600"
              }}>数据利用率</td>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#ff7675"
              }}>小样本有效</td>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#00b894"
              }}>需大规模数据</td>
            </tr>
            <tr style={{ backgroundColor: "#2d3436" }}>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#e0e0e0",
                fontWeight: "600"
              }}>处理非结构化数据</td>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#ff7675"
              }}>效果差（如图像）</td>
              <td style={{
                padding: "12px",
                border: "1px solid #555",
                color: "#00b894"
              }}><strong>核心优势领域</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 核心差别说明 */}
      <div style={{
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: tableOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1000px"
      }}>
        <p style={{
          fontSize: 28,
          fontWeight: "500",
          color: "#fdcb6e",
          lineHeight: 1.5,
          margin: "20px 0",
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          核心差别在特征提取环节，深度学习由机器自己完成特征提取，不需要人工提取。
        </p>
      </div>

      {/* 关键认知 */}
      <div style={{
        position: "absolute",
        top: "75%",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: keyInsightOpacity,
        textAlign: "center",
        width: "80%",
        maxWidth: "1200px",
        backgroundColor: "rgba(255, 118, 117, 0.1)",
        padding: "20px",
        borderRadius: "10px",
        border: "2px solid rgba(255, 118, 117, 0.3)"
      }}>
        <p style={{
          fontSize: 26,
          fontWeight: "600",
          color: "#ff7675",
          lineHeight: 1.6,
          margin: 0,
          fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        }}>
          <strong>关键认知</strong>: 深度学习不是单个算法，而是通过层次化特征学习逼近人类智能的工程技术体系。掌握它，就掌握了AI时代的核心生产资料！
        </p>
      </div>
    </AbsoluteFill>
  );
};