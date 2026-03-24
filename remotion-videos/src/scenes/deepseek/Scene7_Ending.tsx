import React, { useEffect, useState } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile, spring, useVideoConfig } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
  primary: "#58a6ff",
  secondary: "#79c0ff",
  accent: "#f0883e",
  highlight: "#f778ba",
  gold: "#ffd200",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
};

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const Scene7_Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile("DeepSeekVideo/scene7-captions.json"));
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

  // 背景图缩放
  const bgScale = interpolate(frame, [0, 180], [1, 1.1], {
    extrapolateRight: "clamp",
  });

  // 伦理部分
  const ethicsOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 战略部分
  const strategyOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 尾声部分
  const endingOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 金句发光
  const glowPulse = interpolate(frame, [150, 180], [0.8, 1.2], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        fontFamily: THEME.fontFamily,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景图片 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${bgScale})`,
        }}
      >
        <Img
          src={staticFile("DeepSeekVideo/future-outlook.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
        />
      </div>

      {/* 渐变遮罩 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(13,17,23,0.9) 0%, rgba(13,17,23,0.95) 100%)",
        }}
      />

      {/* 内容区 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "40px 40px 120px 40px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* 第五轮：伦理暗物质 */}
        <div style={{ opacity: ethicsOpacity, marginBottom: 20 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(247,120,186,0.15)",
              border: `1px solid ${THEME.highlight}40`,
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 16, color: THEME.highlight }}>第五轮辩论：安全伦理</span>
          </div>
          <h3 style={{ fontSize: 28, color: THEME.highlight, margin: "0 0 12px 0" }}>
            ⚠️ 伦理暗物质警告
          </h3>
          <div style={{ display: "flex", gap: 12, fontSize: 16, color: THEME.textPrimary }}>
            <div
              style={{
                flex: 1,
                background: "rgba(247,120,186,0.1)",
                padding: 12,
                borderRadius: 10,
                border: `1px solid ${THEME.highlight}30`,
              }}
            >
              <strong style={{ color: "#ffd200" }}>Nature论文：</strong>
              大模型存在"伦理暗物质"，预训练嵌入的有害知识会永久存留
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(247,120,186,0.1)",
                padding: 12,
                borderRadius: 10,
                border: `1px solid ${THEME.highlight}30`,
              }}
            >
              <strong style={{ color: "#ffd200" }}>安全困境：</strong>
              R2能力比R1强10倍，安全风险可能也强10倍
            </div>
          </div>
        </div>

        {/* 第六七轮：战略武器 vs 方向迷失 */}
        <div style={{ opacity: strategyOpacity, flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(88,166,255,0.15)",
              border: `1px solid ${THEME.primary}40`,
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 16, color: THEME.primary }}>第六、七轮辩论</span>
          </div>

          <div style={{ display: "flex", gap: 12, flex: 1 }}>
            {/* 观点一 */}
            <div
              style={{
                flex: 1,
                background: "rgba(88,166,255,0.08)",
                borderRadius: 16,
                padding: 16,
                border: `2px solid ${THEME.primary}40`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 24, marginRight: 8 }}>🎯</span>
                <span style={{ fontSize: 18, fontWeight: "bold", color: THEME.primary }}>
                  战略武器论
                </span>
              </div>
              <ul style={{ fontSize: 15, color: THEME.textPrimary, paddingLeft: 18, margin: 0, lineHeight: 1.8 }}>
                <li>用户流失是<strong style={{ color: THEME.primary }}>短期阵痛换长期优势</strong></li>
                <li>V4优先给华为早期访问，不让英伟达先用</li>
                <li>DeepSeek不是产品公司，是研究驱动</li>
                <li>GPT-5不及预期，参数堆叠已到极限</li>
                <li>下一波AI竞争拼的是<strong style={{ color: THEME.gold }}>架构创新</strong></li>
              </ul>
            </div>

            {/* 观点二 */}
            <div
              style={{
                flex: 1,
                background: "rgba(139,148,158,0.08)",
                borderRadius: 16,
                padding: 16,
                border: "2px solid rgba(139,148,158,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 24, marginRight: 8 }}>❓</span>
                <span style={{ fontSize: 18, fontWeight: "bold", color: THEME.textSecondary }}>
                  方向迷失论
                </span>
              </div>
              <ul
                style={{ fontSize: 15, color: THEME.textPrimary, paddingLeft: 18, margin: 0, lineHeight: 1.8 }}
              >
                <li>
                  V4传闻4月上，R2<strong style={{ color: "#f85149" }}>一点消息都没有</strong>
                </li>
                <li>V3.2已发，抢了R2的戏，R系列或已消失</li>
                <li>DeepSeek使用率从50%跌到3%</li>
                <li>用户等不了：豆包、千问、腾讯元宝在发力</li>
                <li>
                  <strong style={{ color: "#f85149" }}>市场不等人</strong>，热度可能就凉了
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 尾声 */}
        <div
          style={{
            textAlign: "center",
            opacity: endingOpacity,
            padding: "20px 0",
          }}
        >
          <p
            style={{
              fontSize: 22,
              color: THEME.textSecondary,
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            "当我们在追问'为什么还不发'的时候，
            <br />
            DeepSeek可能在问：什么样的模型，才配得上这个时代的期待？"
          </p>

          <div
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${THEME.gold}20, ${THEME.gold}10)`,
              borderRadius: 16,
              padding: "16px 40px",
              border: `2px solid ${THEME.gold}${Math.floor(glowPulse * 50)}`,
              boxShadow: `0 0 ${30 * glowPulse}px rgba(255,210,0,0.3)`,
            }}
          >
            <p
              style={{
                fontSize: 36,
                fontWeight: "bold",
                color: THEME.gold,
                margin: 0,
                textShadow: `0 0 ${20 * glowPulse}px rgba(255,210,0,0.8)`,
              }}
            >
              好的东西，值得等待。
            </p>
          </div>
        </div>

        {/* 字幕显示 */}
        {currentPage && (
          <div
            style={{
              position: "absolute",
              bottom: 25,
              left: 0,
              right: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
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
      </div>
    </AbsoluteFill>
  );
};
