import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const THEME = {
  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
  titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
  textPrimary: '#c9d1d9',
  textSecondary: '#8b949e',
  accent: '#f0883e',
  gold: '#ffd200',
  cardBackground: 'rgba(255,255,255,0.06)',
};

const keyPoints = [
  { icon: '📚', title: '知识库构建', desc: '将文本分割成块并向量存储' },
  { icon: '🔍', title: '语义检索', desc: '在向量数据库中搜索相关内容' },
  { icon: '🧠', title: '大模型生成', desc: '结合检索结果和推理能力' },
  { icon: '🚀', title: '实时更新', desc: '知识库可随时更新，保持最新' },
];

export const Scene9_Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame: frame,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 0.5, 1], [0, 0, 1]);

  // Cards animation (staggered)
  const cardAnimations = keyPoints.map((_, index) => {
    const cardProgress = spring({
      frame: frame - 20 - index * 15,
      fps,
      config: { stiffness: 100, damping: 15 },
    });
    return {
      y: interpolate(cardProgress, [0, 1], [60, 0]),
      opacity: interpolate(cardProgress, [0, 1], [0, 1]),
      scale: interpolate(cardProgress, [0, 1], [0.9, 1]),
    };
  });

  // CTA animation
  const ctaProgress = spring({
    frame: frame - 100,
    fps,
    config: { stiffness: 80, damping: 12 },
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [30, 0]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: THEME.background }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: '64px',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            background: THEME.titleGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 16px 0',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          RAG 完整技术栈
        </h1>

        <p
          style={{
            fontSize: '28px',
            fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
            color: THEME.textSecondary,
            margin: '0 0 48px 0',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          检索增强生成，让大模型拥有实时知识库
        </p>

        {/* Key Points Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            marginBottom: '64px',
          }}
        >
          {keyPoints.map((point, index) => (
            <div
              key={index}
              style={{
                background: THEME.cardBackground,
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                transform: `translateY(${cardAnimations[index].y}px) scale(${cardAnimations[index].scale})`,
                opacity: cardAnimations[index].opacity,
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>{point.icon}</div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                  color: THEME.textPrimary,
                  margin: '0 0 8px 0',
                }}
              >
                {point.title}
              </h3>
              <p
                style={{
                  fontSize: '18px',
                  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                  color: THEME.textSecondary,
                  margin: 0,
                }}
              >
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(240, 136, 62, 0.2), rgba(240, 136, 62, 0.1))',
            border: '2px solid #f0883e',
            borderRadius: '16px',
            padding: '32px 64px',
            transform: `translateY(${ctaY}px)`,
            opacity: ctaOpacity,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
              color: THEME.accent,
              margin: '0 0 8px 0',
            }}
          >
            💡 关键收获
          </p>
          <p
            style={{
              fontSize: '24px',
              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
              color: THEME.textPrimary,
              margin: 0,
            }}
          >
            RAG = 大模型的<span style={{ color: THEME.gold, fontWeight: 'bold' }}> 超级搜索技能 </span>
            + 知识永远不会过期的<span style={{ color: THEME.gold, fontWeight: 'bold' }}> 记忆外挂</span>
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
