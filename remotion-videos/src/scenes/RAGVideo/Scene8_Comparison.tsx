import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const THEME = {
  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
  titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
  textPrimary: '#c9d1d9',
  textSecondary: '#8b949e',
  accent: '#f0883e',
  cardBackground: 'rgba(255,255,255,0.06)',
};

export const Scene8_Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame: frame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 0.5, 1], [0, 0, 1]);

  // Chart animation
  const chartProgress = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 80, damping: 12 },
  });
  const chartScale = interpolate(chartProgress, [0, 1], [0.9, 1]);
  const chartOpacity = interpolate(chartProgress, [0, 1], [0, 1]);

  // Comparison cards animation
  const cardsProgress = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const cardsY = interpolate(cardsProgress, [0, 1], [50, 0]);
  const cardsOpacity = interpolate(cardsProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: THEME.background }}>
      <div style={{ padding: '48px 64px', height: '100%', boxSizing: 'border-box' }}>
        {/* Title */}
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            background: THEME.titleGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 32px 0',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          RAG VS 其他方法
        </h1>

        {/* Content Layout */}
        <div style={{ display: 'flex', gap: '40px', height: 'calc(100% - 120px)' }}>
          {/* Mermaid Chart on Left */}
          <div
            style={{
              flex: '0 0 45%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Img
              src="/RAGVideo/rag-vs-others.svg"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: `scale(${chartScale})`,
                opacity: chartOpacity,
              }}
            />
          </div>

          {/* Comparison Table on Right */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '24px',
              transform: `translateY(${cardsY}px)`,
              opacity: cardsOpacity,
            }}
          >
            {/* RAG Card */}
            <div
              style={{
                background: THEME.cardBackground,
                borderRadius: '16px',
                padding: '32px',
                borderLeft: '4px solid #3fb950',
              }}
            >
              <h3
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                  color: '#3fb950',
                  margin: '0 0 16px 0',
                }}
              >
                RAG - 检索增强
              </h3>
              <ul
                style={{
                  fontSize: '22px',
                  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                  color: THEME.textSecondary,
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: '24px',
                }}
              >
                <li>✅ 知识实时更新</li>
                <li>✅ 成本可控</li>
                <li>✅ 数据源可追溯</li>
                <li>✅ 适合事实性知识</li>
              </ul>
            </div>

            {/* Fine-tuning Card */}
            <div
              style={{
                background: THEME.cardBackground,
                borderRadius: '16px',
                padding: '32px',
                borderLeft: '4px solid #f0883e',
              }}
            >
              <h3
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                  color: THEME.accent,
                  margin: '0 0 16px 0',
                }}
              >
                微调 Fine-tuning
              </h3>
              <ul
                style={{
                  fontSize: '22px',
                  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                  color: THEME.textSecondary,
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: '24px',
                }}
              >
                <li>✅ 深层能力提升</li>
                <li>✅ 特定任务优化</li>
                <li>❌ 训练成本高</li>
                <li>❌ 知识静态不更新</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
