import React from 'react';

interface CodeBlockProps {
  code: string;
  filename?: string;
  style?: React.CSSProperties;
}

const THEME = {
  codeBackground: '#1e2530',
  codeText: '#e6edf3',
  codeKeyword: '#ff7b72',
  codeString: '#a5d6ff',
  codeComment: '#8b949e',
  textSecondary: '#8b949e',
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  filename = 'example.py',
  style = {},
}) => {
  return (
    <div
      style={{
        background: THEME.codeBackground,
        borderRadius: '12px',
        padding: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        ...style,
      }}
    >
      {/* 窗口控制按钮 */}
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
          {filename}
        </span>
      </div>

      {/* 代码内容 */}
      <pre
        style={{
          fontSize: '16px',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          lineHeight: 1.5,
          color: THEME.codeText,
          margin: 0,
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          maxHeight: '500px',
        }}
      >
        {code.split('\n').map((line, idx) => (
          <div key={idx} style={{ paddingLeft: '8px' }}>
            {renderHighlightedLine(line)}
          </div>
        ))}
      </pre>
    </div>
  );
};

/**
 * 简单的语法高亮
 */
function renderHighlightedLine(line: string): React.ReactNode {
  // 注释
  if (line.trim().startsWith('#')) {
    return <span style={{ color: THEME.codeComment }}>{line}</span>;
  }
  if (line.includes('#')) {
    const commentIndex = line.indexOf('#');
    return (
      <span>
        <span>{highlightCode(line.substring(0, commentIndex))}</span>
        <span style={{ color: THEME.codeComment }}>{line.substring(commentIndex)}</span>
      </span>
    );
  }
  return highlightCode(line);
}

/**
 * 代码高亮处理
 */
function highlightCode(code: string): React.ReactNode {
  const keywords = ['from', 'import', 'def', 'class', 'return', 'if', 'else', 'for', 'in', 'while', 'try', 'except', 'with', 'as', 'async', 'await', 'lambda'];
  const strings = ['"', "'", '`'];
  
  // 简单的关键词高亮
  let result: React.ReactNode[] = [];
  let remaining = code;
  let key = 0;

  // 处理 from ... import ...
  if (remaining.includes('from ') && remaining.includes(' import ')) {
    const parts = remaining.split(' import ');
    const fromPart = parts[0];
    const importPart = parts[1];
    
    return (
      <>
        <span style={{ color: THEME.codeKeyword }}>from </span>
        <span style={{ color: THEME.codeString }}>{fromPart.replace('from ', '')} </span>
        <span style={{ color: THEME.codeKeyword }}>import </span>
        <span>{importPart}</span>
      </>
    );
  }

  // 处理 import ...
  if (remaining.trim().startsWith('import ')) {
    return (
      <>
        <span style={{ color: THEME.codeKeyword }}>import </span>
        <span>{remaining.replace('import ', '')}</span>
      </>
    );
  }

  // 处理 def/class
  if (remaining.trim().startsWith('def ') || remaining.trim().startsWith('class ')) {
    const kw = remaining.trim().startsWith('def ') ? 'def ' : 'class ';
    const rest = remaining.replace(kw, '');
    const nameMatch = rest.match(/^(\w+)/);
    if (nameMatch) {
      const name = nameMatch[1];
      const afterName = rest.substring(name.length);
      return (
        <>
          <span style={{ color: THEME.codeKeyword }}>{kw}</span>
          <span style={{ color: THEME.codeString }}>{name}</span>
          <span>{afterName}</span>
        </>
      );
    }
  }

  // 其他关键字
  for (const kw of keywords) {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    if (regex.test(remaining)) {
      const parts = remaining.split(regex);
      const matches = remaining.match(regex);
      if (matches && parts.length > 1) {
        return parts.map((part, i) => (
          <span key={i}>
            {part}
            {matches[i] && (
              <span style={{ color: THEME.codeKeyword }}>{matches[i]}</span>
            )}
          </span>
        ));
      }
    }
  }

  return <span>{code}</span>;
}