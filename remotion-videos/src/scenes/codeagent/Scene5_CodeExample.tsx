import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { CaptionDisplay } from "../../components/CaptionDisplay";
import { CodeBlock } from "../../components/CodeBlock";

const THEME = {
  background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2333 100%)",
  textPrimary: "#c9d1d9",
  accentOrange: "#f0883e",
  accentBlue: "#58a6ff",
  cardBg: "rgba(255,255,255,0.06)",
  textSecondary: "#8b949e",
  borderColor: "rgba(255,255,255,0.08)",
};

interface Scene5Props {
  code: string;
}

// 流程图节点组件
const FlowNode: React.FC<{
  text: string;
  subText: string;
  color: string;
  icon: string;
  delay: number;
}> = ({ text, subText, color, icon, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const nodeSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 60, damping: 15 },
  });
  
  const nodeOpacity = interpolate(nodeSpring, [0, 1], [0, 1]);
  const nodeY = interpolate(nodeSpring, [0, 1], [30, 0]);
  const nodeScale = interpolate(nodeSpring, [0, 1], [0.8, 1]);
  
  return (
    <div
      style={{
        opacity: nodeOpacity,
        transform: `translateY(${nodeY}px) scale(${nodeScale})`,
        background: THEME.cardBg,
        border: `1px solid ${THEME.borderColor}`,
        borderRadius: 12,
        padding: "12px 16px",
        width: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div
        style={{
          fontSize: 24,
          marginBottom: 4,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color,
          textAlign: "center",
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontSize: 12,
          color: THEME.textSecondary,
          textAlign: "center",
        }}
      >
        {subText}
      </div>
    </div>
  );
};

// 流程箭头组件
const FlowArrow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const arrowSpring = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 60, damping: 15 },
  });
  
  const arrowOpacity = interpolate(arrowSpring, [0, 1], [0, 1]);
  
  return (
    <div
      style={{
        opacity: arrowOpacity,
        fontSize: 24,
        color: THEME.accentBlue,
        padding: "0 20px",
      }}
    >
      ➜
    </div>
  );
};

// 流程图组件
const CodeFlowChart: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        width: "100%",
        maxWidth: 1000,
      }}
    >
      {/* 步骤1: 导入与初始化 */}
      <FlowNode
        text="导入与初始化"
        subText="import + api_key"
        color={THEME.accentBlue}
        icon="📦"
        delay={30}
      />
      <FlowArrow delay={45} />
      
      {/* 步骤2: 发送需求 */}
      <FlowNode
        text="发送编程需求"
        subText="prompt + language"
        color={THEME.accentOrange}
        icon="💬"
        delay={60}
      />
      <FlowArrow delay={75} />
      
      {/* 步骤3: AI处理 */}
      <FlowNode
        text="AI 分析处理"
        subText="理解 + 生成"
        color="#3fb950"
        icon="🤖"
        delay={90}
      />
      <FlowArrow delay={105} />
      
      {/* 步骤4: 获取结果 */}
      <FlowNode
        text="获取结果"
        subText="代码 + 建议"
        color="#f778ba"
        icon="✨"
        delay={120}
      />
    </div>
  );
};

export const Scene5_CodeExample: React.FC<Scene5Props> = ({ code }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const codeSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 20, mass: 1.5 },
  });

  const codeY = interpolate(codeSpring, [0, 1], [60, 0]);
  const codeOpacity = interpolate(codeSpring, [0, 1], [0, 1]);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 64px",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 40,
          fontWeight: 700,
          color: THEME.textPrimary,
          marginBottom: 16,
        }}
      >
        Code Agent <span style={{ color: THEME.accentOrange }}>代码演示</span>
      </div>

      {/* Flow Chart */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <CodeFlowChart />
      </div>

      {/* Code Container */}
      <div
        style={{
          transform: `translateY(${codeY}px)`,
          opacity: codeOpacity,
          width: "100%",
          maxWidth: 1100,
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <CodeBlock code={code} />
      </div>

      {/* Subtitles at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          width: "100%",
          padding: "0 64px",
        }}
      >
        <CaptionDisplay captionFile="CodeAgent21/scene5-captions.json" />
      </div>
    </AbsoluteFill>
  );
};