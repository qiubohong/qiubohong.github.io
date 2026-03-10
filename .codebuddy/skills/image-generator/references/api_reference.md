# 大模型 API 配置参考文档

## 概述

本文档提供各种大模型服务商的 API 配置参考，帮助用户正确设置环境变量以使用图片生成功能。

## 环境变量配置

### 必需变量

- `LLM_BASE_URL`: 大模型 API 的基础 URL
- `LLM_MODEL`: 使用的模型名称

### 可选变量

- `LLM_API_KEY`: API 密钥（如果服务商需要认证）

## 主流大模型配置示例

### DeepSeek

```bash
export LLM_BASE_URL="https://api.deepseek.com/v1"
export LLM_MODEL="deepseek-chat"
export LLM_API_KEY="your-deepseek-api-key"
```

**特点：**

- 推理能力强，适合复杂任务
- 免费额度充足
- 支持图片生成 API

### 通义千问（Qwen）

```bash
export LLM_BASE_URL="https://dashscope.aliyuncs.com/api/v1"
export LLM_MODEL="qwen-plus"
export LLM_API_KEY="your-qwen-api-key"
```

**特点：**

- 阿里云出品，稳定性高
- 支持多种模型规格
- 图片生成质量优秀

### 智谱 GLM

```bash
export LLM_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
export LLM_MODEL="glm-4-plus"
export LLM_API_KEY="your-glm-api-key"
```

**特点：**

- 每月免费额度大方
- 支持多模态能力
- 国内访问速度快

### MiniMax

```bash
export LLM_BASE_URL="https://api.minimax.chat/v1"
export LLM_MODEL="abab5.5-chat"
export LLM_API_KEY="your-minimax-api-key"
```

**特点：**

- 支持多模态（图片、语音）
- 图片生成功能丰富
- 免费试用额度

### 豆包

```bash
export LLM_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"
export LLM_MODEL="doubao-pro-128k"
export LLM_API_KEY="your-doubao-api-key"
```

**特点：**

- 字节跳动出品
- 日常对话流畅
- 支持图片生成

## API 端点说明

### 图片生成端点

所有支持图片生成的大模型都使用类似的 API 端点：

```
POST {base_url}/images/generations
```

**请求体格式：**

```json
{
  "model": "模型名称",
  "prompt": "图片生成提示词",
  "size": "图片尺寸（如1024x1024）",
  "quality": "图片质量（standard/hd）",
  "n": 1
}
```

**响应格式：**

```json
{
  "data": [
    {
      "url": "图片URL",
      "b64_json": "base64编码的图片数据"
    }
  ]
}
```

## 常见问题

### 1. 如何获取 API 密钥？

- 访问各服务商官网注册账号
- 进入控制台创建 API 密钥
- 注意保存密钥，部分服务商只显示一次

### 2. 如何测试配置是否正确？

```bash
# 检查环境变量
echo $LLM_BASE_URL
echo $LLM_MODEL

# 运行测试脚本
python scripts/generate_image.py --prompt "测试图片" --output test.png
```

### 3. 遇到 API 调用失败怎么办？

1. 检查网络连接
2. 验证 API 密钥是否正确
3. 查看服务商文档确认 API 端点
4. 检查模型是否支持图片生成功能

### 4. 免费额度用完后的处理

- 切换其他免费服务商
- 注册新账号获取新额度
- 考虑付费方案（根据使用频率）

## 最佳实践

### 环境变量管理

```bash
# 创建配置文件
echo 'export LLM_BASE_URL="https://api.deepseek.com/v1"' >> ~/.bashrc
echo 'export LLM_MODEL="deepseek-chat"' >> ~/.bashrc
echo 'export LLM_API_KEY="your-key"' >> ~/.bashrc

# 重新加载配置
source ~/.bashrc
```

### 多模型切换

可以创建多个配置文件，根据需要切换：

```bash
# deepseek配置
source ~/.deepseek_config

# qwen配置
source ~/.qwen_config
```

### 安全建议

- 不要将 API 密钥提交到版本控制系统
- 使用环境变量而非硬编码
- 定期更换 API 密钥
- 设置合理的 API 调用频率限制
