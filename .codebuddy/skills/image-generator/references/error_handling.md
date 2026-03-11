# 错误处理参考文档

## 概述

本文档提供图片生成过程中可能遇到的错误代码、原因分析和解决方案。

## 常见错误分类

### 1. 环境配置错误

#### 错误：环境变量未设置

**症状：**

```
错误：请设置环境变量 LLM_BASE_URL 和 LLM_MODEL
```

**原因：**

- 环境变量未正确设置
- 配置文件未加载
- 终端会话中变量丢失

**解决方案：**

```bash
# 检查环境变量
echo $LLM_BASE_URL
echo $LLM_MODEL

# 重新设置环境变量
export LLM_BASE_URL="https://api.deepseek.com/v1"
export LLM_MODEL="deepseek-chat"

# 永久设置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export LLM_BASE_URL="https://api.deepseek.com/v1"' >> ~/.bashrc
echo 'export LLM_MODEL="deepseek-chat"' >> ~/.bashrc
source ~/.bashrc
```

### 2. API 调用错误

#### 错误：401 Unauthorized

**症状：**

```
API调用失败: 401 Client Error: Unauthorized
```

**原因：**

- API 密钥无效或过期
- 密钥格式错误
- 服务商账户问题

**解决方案：**

1. 检查 API 密钥是否正确
2. 重新生成 API 密钥
3. 确认账户状态和额度
4. 验证密钥格式（Bearer token 格式）

#### 错误：404 Not Found

**症状：**

```
API调用失败: 404 Client Error: Not Found
```

**原因：**

- API 端点 URL 错误
- 模型名称不正确
- 服务商 API 版本变更

**解决方案：**

1. 检查 BASE_URL 是否正确
2. 验证模型名称是否支持图片生成
3. 查看服务商最新 API 文档

#### 错误：429 Too Many Requests

**症状：**

```
API调用失败: 429 Client Error: Too Many Requests
```

**原因：**

- API 调用频率超限
- 免费额度用完
- 并发请求过多

**解决方案：**

1. 降低调用频率，添加延时
2. 检查账户额度状态
3. 升级付费套餐或切换服务商
4. 实现请求队列和重试机制

#### 错误：500 Internal Server Error

**症状：**

```
API调用失败: 500 Server Error
```

**原因：**

- 服务商服务器问题
- 临时性故障
- 请求格式错误

**解决方案：**

1. 等待一段时间后重试
2. 检查请求参数格式
3. 联系服务商技术支持

### 3. 网络连接错误

#### 错误：Connection Timeout

**症状：**

```
API调用失败: Connection timeout
```

**原因：**

- 网络连接不稳定
- 防火墙或代理设置
- DNS 解析问题

**解决方案：**

1. 检查网络连接状态
2. 调整超时时间设置
3. 检查代理和防火墙配置
4. 使用 VPN 或更换网络环境

#### 错误：SSL Certificate Error

**症状：**

```
API调用失败: SSL certificate verification failed
```

**原因：**

- 证书验证失败
- 系统时间不正确
- 代理证书问题

**解决方案：**

1. 同步系统时间
2. 更新 CA 证书包
3. 临时禁用 SSL 验证（不推荐）

### 4. 图片处理错误

#### 错误：图片保存失败

**症状：**

```
图片保存失败
```

**原因：**

- 磁盘空间不足
- 文件权限问题
- 路径不存在

**解决方案：**

```bash
# 检查磁盘空间
df -h

# 检查目录权限
ls -la /path/to/output

# 创建输出目录
mkdir -p /path/to/output
```

#### 错误：图片格式不支持

**症状：**

```
错误：不支持的图片数据格式
```

**原因：**

- API 返回格式与预期不符
- 服务商 API 变更（如使用 /chat/completions 而非 /images/generations）
- 图片数据解析错误（如 venus_multimodal_url 格式）

**解决方案：**

1. 检查 API 响应格式，确认是否使用 result.json 格式
2. 更新脚本适配 venus_multimodal_url 格式
3. 检查 API 端点是否正确（当前使用 /chat/completions）
4. 查看服务商最新 API 文档确认格式规范

## 调试技巧

### 启用详细日志

```python
# 在脚本中添加调试信息
import logging
logging.basicConfig(level=logging.DEBUG)

# 或使用print调试
print(f"请求URL: {url}")
print(f"请求头: {headers}")
print(f"请求体: {payload}")
```

### 手动测试 API

使用 curl 命令测试 API 连通性：

```bash
# 测试图片生成API（使用聊天补全端点）
curl -X POST "$LLM_BASE_URL/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $LLM_API_KEY" \
  -d '{
    "model": "'$LLM_MODEL'",
    "messages": [
      {
        "role": "system",
        "content": "你是一个图像生成助手，根据用户的描述生成高质量的图片。"
      },
      {
        "role": "user",
        "content": "一只可爱的橘猫在花园里晒太阳"
      }
    ],
    "image_config": {
      "aspect_ratio": "16:9",
      "image_size": "1K"
    }
  }'
```

### 环境检查脚本

创建环境检查脚本：

```python
#!/usr/bin/env python3
import os
import sys

def check_environment():
    required_vars = ['LLM_BASE_URL', 'LLM_MODEL']
    optional_vars = ['LLM_API_KEY']

    print("=== 环境变量检查 ===")

    for var in required_vars:
        value = os.getenv(var)
        if value:
            print(f"✅ {var}: {value}")
        else:
            print(f"❌ {var}: 未设置")
            return False

    for var in optional_vars:
        value = os.getenv(var)
        if value:
            print(f"✅ {var}: 已设置")
        else:
            print(f"⚠️ {var}: 未设置（可选）")

    return True

if __name__ == "__main__":
    if check_environment():
        print("\n✅ 环境检查通过")
    else:
        print("\n❌ 环境检查失败")
        sys.exit(1)
```

## 预防措施

### 1. 参数验证

在脚本中添加参数验证：

```python
def validate_arguments(args):
    """验证输入参数"""
    if not args.prompt or len(args.prompt.strip()) == 0:
        raise ValueError("提示词不能为空")

    # 验证图片尺寸格式
    if not re.match(r'^\d+x\d+$', args.size):
        raise ValueError("图片尺寸格式错误，应为 '宽x高' 格式")

    # 验证输出路径
    output_dir = Path(args.output).parent
    if not output_dir.exists():
        output_dir.mkdir(parents=True, exist_ok=True)
```

### 2. 重试机制

实现 API 调用重试：

```python
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

def create_session_with_retry():
    """创建带重试机制的会话"""
    session = requests.Session()

    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
    )

    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    return session
```

### 3. 资源清理

确保异常情况下资源正确释放：

```python
try:
    # API调用代码
    response = session.post(url, headers=headers, json=payload, timeout=60)
    response.raise_for_status()

except Exception as e:
    # 清理资源
    if 'response' in locals():
        response.close()
    raise e
```
