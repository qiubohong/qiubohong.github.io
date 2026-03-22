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

const codeSnippet = `from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI

# 1. 加载文档并分割
loader = TextLoader("docs.txt")
docs = loader.load()
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(docs)

# 2. 创建向量数据库
vectorstore = FAISS.from_documents(
    chunks,
    OpenAIEmbeddings()
)

# 3. 检索和生成
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}
)
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),
    retriever=retriever
)`;

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

          {/* Code Block */}
          <div
            style={{
              flex: '0 0 50%',
              background: THEME.codeBackground,
              borderRadius: '12px',
              padding: '24px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transform: `translateX(${codeX}px)`,
              opacity: codeOpacity,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ff5f56',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ffbd2e',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#27c93f',
                }}
              />
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '14px',
                  fontFamily: '"PingFang SC", "Microsoft YaHei", Arial, sans-serif',
                  color: THEME.textSecondary,
                }}
              >
                rag_example.py
              </span>
            </div>
            <pre
              style={{
                fontSize: '16px',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                lineHeight: 1.5,
                color: THEME.codeText,
                margin: 0,
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
              }}
            >
              {codeSnippet.split('\n').map((line, idx) => (
                <div key={idx} style={{ paddingLeft: '8px' }}>
                  {line.includes('#') ? (
                    <span>
                      <span style={{ color: THEME.codeComment }}>{line.substring(0, line.indexOf('#'))}</span>
                      <span style={{ color: THEME.codeComment }}>{line.substring(line.indexOf('#'))}</span>
                    </span>
                  ) : line.includes('from') || line.includes('import') ? (
                    <span>
                      <span style={{ color: THEME.codeKeyword }}>from </span>
                      <span style={{ color: THEME.codeString }}>{line.split(' ')[1]} </span>
                      <span style={{ color: THEME.codeKeyword }}>import </span>
                      <span>{line.split('import ')[1]}</span>
                    </span>
                  ) : line.includes('=') && line.includes('(') ? (
                    <span>
                      <span>{line.split('=')[0]}</span>
                      <span style={{ color: THEME.codeKeyword }}> = </span>
                      <span>{line.split('=')[1]}</span>
                    </span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
