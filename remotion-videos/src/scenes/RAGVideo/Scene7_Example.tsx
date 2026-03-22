import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const THEME = {
  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)',
  titleGradient: 'linear-gradient(45deg, #58a6ff, #79c0ff)',
  textPrimary: '#c9d1d9',
  textSecondary: '#8b949e',
  accent: '#f0883e',
  codeBackground: '#1e2530',
  codeText: '#e6edf3',
  codeKeyword: '#ff7b72',
  codeString: '#a5d6ff',
  codeComment: '#8b949e',
};

// 流程图步骤定义
const flowSteps = [
  { id: 1, title: '加载文档', icon: '📄', desc: '读取PDF、Word等文档', color: '#58a6ff' },
  { id: 2, title: '文档分割', icon: '✂️', desc: '将长文档切分成小块', color: '#3fb950' },
  { id: 3, title: '向量化', icon: '🔢', desc: '将文本转换为向量', color: '#f0883e' },
  { id: 4, title: '存储索引', icon: '🗄️', desc: '存入向量数据库', color: '#a371f7' },
  { id: 5, title: '用户提问', icon: '❓', desc: '输入问题', color: '#79c0ff' },
  { id: 6, title: '相似度检索', icon: '🔍', desc: '找出最相关的文档块', color: '#ffa657' },
  { id: 7, title: '生成回答', icon: '💬', desc: '结合上下文生成答案', color: '#56d364' },
];

// Scene7 总帧数（与 RAGVideo.tsx 中 scene7 duration 保持一致）
const SCENE_DURATION = 337;
// 滚动开始帧（等待内容出现动画完成后再开始滚动）
const SCROLL_START_FRAME = 80;
// 滚动结束帧（留出最后30帧停留在底部）
const SCROLL_END_FRAME = SCENE_DURATION - 30;

export const Scene7_Example: React.FC = () => {
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

  // Code animation
  const codeProgress = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 80, damping: 12 },
  });
  const codeX = interpolate(codeProgress, [0, 1], [100, 0]);
  const codeOpacity = interpolate(codeProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: THEME.background }}>
      <div style={{ padding: '48px 48px', height: '100%', boxSizing: 'border-box' }}>
        {/* Title */}
        <h1
          style={{
            fontSize: '48px',
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
          实战案例：企业知识库问答系统
        </h1>

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            height: 'calc(100% - 100px)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Knowledge Base Image */}
          <div style={{ flex: '0 0 45%' }}>
            <Img
src={staticFile("RAGVideo/knowledge-base.png")}
              style={{
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transform: `scale(${imageScale})`,
                opacity: imageOpacity,
              }}
            />
          </div>

          {/* 伪代码流程图 */}
          <div
            style={{
              flex: '0 0 52%',
              background: THEME.codeBackground,
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transform: `translateX(${codeX}px)`,
              opacity: codeOpacity,
              display: 'flex',
              flexDirection: 'column',
              // 固定高度，确保不超出屏幕（视频高度720px，减去上下padding和标题区域）
              height: '560px',
              overflow: 'hidden',
            }}
          >
            {/* 标题 - 固定不滚动 */}
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: THEME.textPrimary,
                margin: '0 0 16px 0',
                textAlign: 'center',
                fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                flexShrink: 0,
              }}
            >
              🔄 RAG系统工作流程
            </h3>

            {/* 流程图滚动区域 - overflow:hidden 裁剪超出内容 */}
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* 可滚动内容 - 通过 translateY 实现帧驱动滚动 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transform: `translateY(${interpolate(
                    frame,
                    [SCROLL_START_FRAME, SCROLL_END_FRAME],
                    [0, -320],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  )}px)`,
                }}
              >
                {/* 第一部分：预处理阶段 */}
                <div
                  style={{
                    background: 'rgba(88, 166, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(88, 166, 255, 0.3)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#58a6ff',
                      fontWeight: 'bold',
                      marginBottom: '12px',
                      fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                    }}
                  >
                    📚 预处理阶段（离线执行）
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {flowSteps.slice(0, 4).map((step, idx) => (
                      <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: `rgba(${step.color === '#58a6ff' ? '88, 166, 255' : step.color === '#3fb950' ? '63, 185, 80' : step.color === '#f0883e' ? '240, 136, 62' : '163, 113, 247'}, 0.2)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            flexShrink: 0,
                          }}
                        >
                          {step.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: '15px',
                              fontWeight: 'bold',
                              color: THEME.textPrimary,
                              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                            }}
                          >
                            {step.title}
                          </div>
                          <div
                            style={{
                              fontSize: '13px',
                              color: THEME.textSecondary,
                              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                            }}
                          >
                            {step.desc}
                          </div>
                        </div>
                        {idx < 3 && (
                          <div style={{ fontSize: '16px', color: step.color }}>↓</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 分隔线 */}
                <div
                  style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #58a6ff, transparent)',
                    margin: '4px 0',
                  }}
                />

                {/* 第二部分：查询阶段 */}
                <div
                  style={{
                    background: 'rgba(240, 136, 62, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(240, 136, 62, 0.3)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#f0883e',
                      fontWeight: 'bold',
                      marginBottom: '12px',
                      fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                    }}
                  >
                    ⚡ 查询阶段（实时执行）
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {flowSteps.slice(4, 7).map((step, idx) => (
                      <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: `rgba(${step.color === '#79c0ff' ? '121, 192, 255' : step.color === '#ffa657' ? '255, 166, 87' : '86, 211, 100'}, 0.2)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            flexShrink: 0,
                          }}
                        >
                          {step.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: '15px',
                              fontWeight: 'bold',
                              color: THEME.textPrimary,
                              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                            }}
                          >
                            {step.title}
                          </div>
                          <div
                            style={{
                              fontSize: '13px',
                              color: THEME.textSecondary,
                              fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                            }}
                          >
                            {step.desc}
                          </div>
                        </div>
                        {idx < 2 && (
                          <div style={{ fontSize: '16px', color: step.color }}>↓</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 核心技术栈 - 放在滚动内容末尾 */}
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    borderLeft: '3px solid #58a6ff',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      color: THEME.textSecondary,
                      fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                      marginBottom: '4px',
                    }}
                  >
                    核心技术栈
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: THEME.textPrimary,
                      fontFamily: 'Consolas, Monaco, monospace',
                    }}
                  >
                    LangChain + OpenAI + FAISS 向量库
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
