import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const THEME = {
  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
  titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
  textPrimary: '#c9d1d9',
  textSecondary: '#8b949e',
  accent: '#3fb950',
  gold: '#ffd200',
};

export const Scene6_Search: React.FC = () => {
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

  // Image animation
  const imageProgress = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 80, damping: 12 },
  });
  const imageScale = interpolate(imageProgress, [0, 1], [0.9, 1]);
  const imageOpacity = interpolate(imageProgress, [0, 1], [0, 1]);

  // Description animation
  const descProgress = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 100, damping: 15 },
  });
  const descY = interpolate(descProgress, [0, 1], [50, 0]);
  const descOpacity = interpolate(descProgress, [0, 1], [0, 1]);

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
            margin: '0 0 24px 0',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          检索系统：语义搜索
        </h1>

        {/* Search Image */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 200px)',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <Img
src={staticFile("RAGVideo/semantic-search.png")}
              style={{
                maxWidth: '60%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transform: `scale(${imageScale})`,
                opacity: imageOpacity,
              }}
            />

            {/* Key Points */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '320px',
                transform: `translateY(${descY}px)`,
                opacity: descOpacity,
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '24px',
                  borderLeft: '4px solid #3fb950',
                }}
              >
                <h4
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                    color: THEME.accent,
                    margin: '0 0 8px 0',
                  }}
                >
                  相似度计算
                </h4>
                <p
                  style={{
                    fontSize: '18px',
                    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                    color: THEME.textSecondary,
                    margin: 0,
                  }}
                >
                  使用余弦相似度衡量向量距离
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '24px',
                  borderLeft: '4px solid #ffd200',
                }}
              >
                <h4
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                    color: THEME.gold,
                    margin: '0 0 8px 0',
                  }}
                >
                  Top-K排序
                </h4>
                <p
                  style={{
                    fontSize: '18px',
                    fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                    color: THEME.textSecondary,
                    margin: 0,
                  }}
                >
                  返回最相关的K个文本块
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '16px 32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
              color: THEME.textSecondary,
              margin: 0,
            }}
          >
            将用户查询向量化，在向量数据库中搜索
            <span style={{ color: THEME.accent, fontWeight: 'bold' }}>语义相似的文档</span>
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
