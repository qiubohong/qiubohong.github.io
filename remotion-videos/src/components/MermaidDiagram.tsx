import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, staticFile, Img } from "remotion";

interface MermaidDiagramProps {
    /** SVG 文件路径（相对于 public 目录），例如 "diagrams/flow.svg" */
    svgFile: string;
    /** 组件宽度，默认 100% */
    width?: string | number;
    /** 组件高度，默认 auto */
    height?: string | number;
    /** 最大宽度 */
    maxWidth?: string | number;
    /** 淡入动画持续帧数，默认 20 帧 */
    fadeInDuration?: number;
    /** 缩放动画：是否启用从小到大的缩放效果，默认 true */
    scaleIn?: boolean;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 图表背景色，默认透明 */
    backgroundColor?: string;
    /** 图表内边距 */
    padding?: string | number;
    /** 图表圆角 */
    borderRadius?: string | number;
}

/**
 * MermaidDiagram 组件
 * 
 * 用于在 Remotion 视频中展示预渲染的 Mermaid 流程图（SVG 格式）。
 * 
 * 使用前需要先运行预渲染脚本将 .mmd 文件转换为 SVG：
 * ```
 * node scripts/render-mermaid.mjs
 * ```
 * 
 * 使用示例：
 * ```tsx
 * <MermaidDiagram
 *   svgFile="diagrams/my-flow.svg"
 *   width="80%"
 *   fadeInDuration={20}
 *   scaleIn={true}
 * />
 * ```
 */
export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
    svgFile,
    width = "100%",
    height = "auto",
    maxWidth = "100%",
    fadeInDuration = 20,
    scaleIn = true,
    style,
    backgroundColor = "transparent",
    padding = 0,
    borderRadius = 12,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 淡入动画
    const opacity = interpolate(frame, [0, fadeInDuration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.ease),
    });

    // 缩放动画（从 0.92 到 1.0）
    const scale = scaleIn
        ? interpolate(frame, [0, fadeInDuration], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.2)),
        })
        : 1;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width,
                height,
                maxWidth,
                opacity,
                transform: `scale(${scale})`,
                backgroundColor,
                padding,
                borderRadius,
                ...style,
            }}
        >
            <Img
                src={staticFile(svgFile)}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />
        </div>
    );
};
