import React, { useEffect, useState } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, staticFile, spring, useVideoConfig } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
  primary: "#58a6ff",
  secondary: "#79c0ff",
  accent: "#f0883e",
  highlight: "#f778ba",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
};

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const Scene5_Ethics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile("DeepSeekVideo/scene5-captions.json"));
        if (response.ok) {
          const data = await response.json();
          setCaptions(data);
        }
      } catch (e) {
        console.error("Failed to load captions:", e);
      }
    };
    loadCaptions();
  }, []);

  const pages = React.useMemo(() => {
    if (captions.length === 0) return [];
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captions]);

  const currentTimeMs = (frame / fps) * 1000;
  const currentPage = pages.find((page, index) => {
    const nextPage = pages[index + 1];
    const pageEndMs = nextPage ? nextPage.startMs : page.startMs + SWITCH_CAPTIONS_EVERY_MS;
    return currentTimeMs * 1000 >= page.startMs && currentTimeMs * 1000 < pageEndMs;
  });

  // 标题栏
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 图表区域
  const chartOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 曲线绘制动画
  const curveProgress = interpolate(frame, [30, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 甜点区脉冲高亮
  const sweetSpotPulse = interpolate(
    frame,
    [60, 80, 100],
    [0.4, 1, 0.4],
    { extrapolateRight: "clamp" }
  );

  // 辩论卡片
  const leftCard = spring({
    frame: frame - 50,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  const rightCard = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        fontFamily: THEME.fontFamily,
        display: "flex",
        flexDirection: "column",
        padding: "48px",
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(247,120,186,0.15)",
            border: `1px solid ${THEME.highlight}40`,
            borderRadius: 20,
            padding: "8px 24px",
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 18, color: THEME.highlight }}>第三轮辩论</span>
        </div>
        <h2
          style={{
            fontSize: 40,
            color: THEME.textPrimary,
            fontWeight: "bold",
            margin: 0,
          }}
        >
          R1的"推理甜点区"悖论
        </h2>
      </div>

      {/* 图表区域 */}
      <div
        style={{
          height: 280,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          opacity: chartOpacity,
        }}
      >
        <svg viewBox="0 0 700 240" style={{ width: "100%", height: "100%" }}>
          {/* 坐标轴 */}
          <line x1="60" y1="200" x2="640" y2="200" stroke="#8b949e" strokeWidth="2" />
          <line x1="60" y1="200" x2="60" y2="30" stroke="#8b949e" strokeWidth="2" />

          {/* 坐标标签 */}
          <text x="350" y="235" fill="#8b949e" fontSize="16" textAnchor="middle">
            思维链长度
          </text>
          <text x="20" y="115" fill="#8b949e" fontSize="16" textAnchor="middle" transform="rotate(-90, 20, 115)">
            推理性能
          </text>

          {/* 抛物线路径 - 推理甜点区 */}
          <path
            d="M 100 180 Q 350 30 600 170"
            fill="none"
            stroke={THEME.highlight}
            strokeWidth="4"
            strokeDasharray="700"
            strokeDashoffset={700 * (1 - curveProgress)}
            strokeLinecap="round"
          />

          {/* 甜点区标注 */}
          <circle cx="350" cy="30" r="12" fill={THEME.highlight} opacity={sweetSpotPulse} />
          <circle cx="350" cy="30" r="20" fill="none" stroke={THEME.highlight} strokeWidth="2" opacity={sweetSpotPulse * 0.5} />

          {/* 甜点区文字 */}
          <text x="350" y="65" fill={THEME.highlight} fontSize="20" fontWeight="bold" textAnchor="middle">
            甜点区
          </text>
          <text x="350" y="88" fill="#8b949e" fontSize="14" textAnchor="middle">
            超过此长度，性能反而下降
          </text>

          {/* 区域标注 */}
          <text x="120" y="150" fill="#8b949e" fontSize="14" opacity={0.7}>
            思考不足
          </text>
          <text x="520" y="150" fill="#8b949e" fontSize="14" opacity={0.7}>
            反刍式思考
          </text>

          {/* 研究机构标注 */}
          <text x="600" y="50" fill={THEME.textSecondary} fontSize="14" textAnchor="end">
            魁北克研究所 142页论文
          </text>
        </svg>
      </div>

      {/* 辩论观点 */}
      <div style={{ display: "flex", gap: 16, flex: 1 }}>
        {/* 观点一：探索终极形态 */}
        <div
          style={{
            flex: 1,
            background: "rgba(88,166,255,0.08)",
            borderRadius: 16,
            padding: 20,
            border: `2px solid ${THEME.primary}40`,
            transform: `translateX(${(1 - leftCard) * -50}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 24, marginRight: 8 }}>🎯</span>
            <span style={{ fontSize: 20, fontWeight: "bold", color: THEME.primary }}>
              观点一：攻克终极难题
            </span>
          </div>
          <p
            style={{
              fontSize: 18,
              color: THEME.textPrimary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            R2迟迟不发，恰恰说明DeepSeek在攻克难题——
            <strong style={{ color: THEME.primary }}>如何让模型知道什么时候该停止思考</strong>。
            这不是技术瓶颈，是在探索推理模型的终极形态。
          </p>
        </div>

        {/* 观点二：遇上天花板 */}
        <div
          style={{
            flex: 1,
            background: "rgba(247,120,186,0.08)",
            borderRadius: 16,
            padding: 20,
            border: `2px solid ${THEME.highlight}40`,
            transform: `translateX(${(1 - rightCard) * 50}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 24, marginRight: 8 }}>📉</span>
            <span style={{ fontSize: 20, fontWeight: "bold", color: THEME.highlight }}>
              观点二：暴露天花板
            </span>
          </div>
          <p
            style={{
              fontSize: 18,
              color: THEME.textPrimary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            "甜点区"恰恰暴露了R1的天花板。R1会
            <strong style={{ color: THEME.highlight }}>反复沉溺在已探索过的方案中</strong>，
            形成低效循环。R2如果延续这路线，永远无法超越R1。
          </p>
        </div>
      </div>

      {/* 字幕显示 */}
      {currentPage && (
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: "bold",
              whiteSpace: "pre-wrap",
              textAlign: "center",
              maxWidth: "90%",
              lineHeight: 1.5,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {currentPage.tokens.map((token, index) => {
              const isActive =
                token.fromMs <= currentTimeMs * 1000 && token.toMs > currentTimeMs * 1000;

              return (
                <span
                  key={`${token.fromMs}-${index}`}
                  style={{
                    color: isActive ? "#ffd200" : "#c9d1d9",
                  }}
                >
                  {token.text}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
