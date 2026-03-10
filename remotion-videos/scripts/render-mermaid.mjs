#!/usr/bin/env node
/**
 * Mermaid 预渲染脚本
 * 
 * 将 .mmd 文件（Mermaid 流程图源码）批量转换为 SVG 文件，
 * 保存到 public/diagrams/ 目录，供 Remotion 视频组件使用。
 * 
 * 使用方法：
 *   node scripts/render-mermaid.mjs [输入目录或文件]
 * 
 * 示例：
 *   node scripts/render-mermaid.mjs                          # 扫描 public/diagrams/*.mmd
 *   node scripts/render-mermaid.mjs public/diagrams/flow.mmd # 渲染单个文件
 *   node scripts/render-mermaid.mjs public/diagrams/         # 渲染目录下所有 .mmd 文件
 * 
 * 注意：需要 Node.js 18+ 运行此脚本
 *   ~/.nvm/versions/node/v20.19.0/bin/node scripts/render-mermaid.mjs
 */

import { createMermaidRenderer } from 'mermaid-isomorphic';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, basename, extname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const DEFAULT_INPUT_DIR = join(PROJECT_ROOT, 'public', 'diagrams');
const DEFAULT_OUTPUT_DIR = join(PROJECT_ROOT, 'public', 'diagrams');

// Mermaid 主题配置（与视频设计风格一致）
const MERMAID_CONFIG = {
    theme: 'dark',
    themeVariables: {
        // 背景色（与视频背景一致）
        background: '#0d1117',
        primaryColor: '#1c2333',
        primaryTextColor: '#c9d1d9',
        primaryBorderColor: '#58a6ff',
        lineColor: '#58a6ff',
        secondaryColor: '#161b22',
        tertiaryColor: '#1c2333',
        // 节点颜色
        nodeBorder: '#58a6ff',
        clusterBkg: 'rgba(255,255,255,0.06)',
        titleColor: '#79c0ff',
        edgeLabelBackground: '#161b22',
        // 字体
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
    },
};

/**
 * 渲染单个 .mmd 文件为 SVG
 */
async function renderMmdFile(inputPath, outputPath, renderer) {
    console.log(`  渲染: ${basename(inputPath)} → ${basename(outputPath)}`);

    const mmdContent = readFileSync(inputPath, 'utf-8').trim();

    try {
        const results = await renderer([mmdContent], {
            mermaidConfig: MERMAID_CONFIG,
        });

        const result = results[0];

        if (result.status === 'fulfilled') {
            let svg = result.value.svg;

            // 确保 SVG 有正确的背景（透明，让视频背景透出）
            // 移除 mermaid 默认的白色背景
            svg = svg.replace(/background:\s*[^;]+;/g, 'background: transparent;');

            writeFileSync(outputPath, svg, 'utf-8');
            console.log(`  ✅ 成功: ${outputPath}`);
            return true;
        } else {
            console.error(`  ❌ 失败: ${result.reason}`);
            return false;
        }
    } catch (err) {
        console.error(`  ❌ 渲染出错: ${err.message}`);
        return false;
    }
}

/**
 * 获取目录下所有 .mmd 文件
 */
function getMmdFiles(dirPath) {
    if (!existsSync(dirPath)) {
        return [];
    }
    return readdirSync(dirPath)
        .filter(f => extname(f) === '.mmd')
        .map(f => join(dirPath, f));
}

/**
 * 主函数
 */
async function main() {
    const args = process.argv.slice(2);

    // 确保输出目录存在
    if (!existsSync(DEFAULT_OUTPUT_DIR)) {
        mkdirSync(DEFAULT_OUTPUT_DIR, { recursive: true });
        console.log(`📁 创建目录: ${DEFAULT_OUTPUT_DIR}`);
    }

    // 收集需要渲染的文件列表
    let filesToRender = [];

    if (args.length === 0) {
        // 默认：扫描 public/diagrams/ 目录
        filesToRender = getMmdFiles(DEFAULT_INPUT_DIR);
        if (filesToRender.length === 0) {
            console.log(`ℹ️  未找到 .mmd 文件，请在 ${DEFAULT_INPUT_DIR} 目录下创建 .mmd 文件`);
            console.log('\n示例 .mmd 文件内容（保存为 public/diagrams/example.mmd）：');
            console.log('---');
            console.log('flowchart TD');
            console.log('    A[开始] --> B{判断}');
            console.log('    B -->|是| C[执行]');
            console.log('    B -->|否| D[跳过]');
            console.log('    C --> E[结束]');
            console.log('    D --> E');
            console.log('---');
            process.exit(0);
        }
    } else {
        // 处理命令行参数
        for (const arg of args) {
            const absPath = resolve(arg);
            if (extname(absPath) === '.mmd') {
                // 单个文件
                filesToRender.push(absPath);
            } else {
                // 目录
                filesToRender.push(...getMmdFiles(absPath));
            }
        }
    }

    if (filesToRender.length === 0) {
        console.log('❌ 未找到任何 .mmd 文件');
        process.exit(1);
    }

    console.log(`\n🎨 Mermaid 预渲染脚本`);
    console.log(`📂 输出目录: ${DEFAULT_OUTPUT_DIR}`);
    console.log(`📋 待渲染文件数: ${filesToRender.length}\n`);

    // 创建渲染器（默认使用 chromium）
    const renderer = createMermaidRenderer();

    let successCount = 0;
    let failCount = 0;

    for (const inputPath of filesToRender) {
        const fileName = basename(inputPath, '.mmd');
        const outputPath = join(DEFAULT_OUTPUT_DIR, `${fileName}.svg`);

        const success = await renderMmdFile(inputPath, outputPath, renderer);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
    }

    console.log(`\n📊 渲染完成: ✅ ${successCount} 成功, ❌ ${failCount} 失败`);

    if (successCount > 0) {
        console.log('\n💡 使用方法（在 Remotion 场景组件中）：');
        console.log('```tsx');
        console.log('import { MermaidDiagram } from "../components/MermaidDiagram";');
        console.log('');
        console.log('// 在场景中使用');
        console.log('<MermaidDiagram');
        console.log('  svgFile="diagrams/your-diagram.svg"');
        console.log('  width="80%"');
        console.log('  fadeInDuration={20}');
        console.log('/>');
        console.log('```');
    }

    process.exit(failCount > 0 ? 1 : 0);
}

main().catch(err => {
    console.error('脚本执行失败:', err);
    process.exit(1);
});
