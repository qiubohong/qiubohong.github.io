# Pexels API 参考文档

## 认证

所有请求需在 Header 中携带 API Key：

```
Authorization: YOUR_API_KEY
```

## 搜索图片接口

**GET** `https://api.pexels.com/v1/search`

### 请求参数

| 参数        | 类型    | 必填 | 说明                                                       |
| ----------- | ------- | ---- | ---------------------------------------------------------- |
| query       | string  | ✅   | 搜索关键词                                                 |
| orientation | string  | ❌   | 图片方向：`landscape` / `portrait` / `square`              |
| size        | string  | ❌   | 图片尺寸：`large`(24MP+) / `medium`(12MP+) / `small`(4MP+) |
| color       | string  | ❌   | 颜色过滤，支持颜色名或十六进制（如 `red`、`#ffffff`）      |
| locale      | string  | ❌   | 语言区域，如 `zh-CN`、`en-US`                              |
| page        | integer | ❌   | 页码，默认 1                                               |
| per_page    | integer | ❌   | 每页数量，默认 15，最大 80                                 |

### 响应结构

```json
{
  "total_results": 10000,
  "page": 1,
  "per_page": 5,
  "photos": [
    {
      "id": 2014422,
      "width": 3024,
      "height": 3024,
      "url": "https://www.pexels.com/photo/...",
      "photographer": "Scott Webb",
      "photographer_url": "https://www.pexels.com/@scottwebb",
      "photographer_id": 9706,
      "avg_color": "#4E342E",
      "alt": "Brown Rocks During Golden Hour",
      "src": {
        "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        "large2x": "...",
        "large": "...",
        "medium": "...",
        "small": "...",
        "portrait": "...",
        "landscape": "...",
        "tiny": "..."
      },
      "liked": false
    }
  ],
  "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=5&query=..."
}
```

## 图片尺寸说明

| 尺寸键    | 说明       |
| --------- | ---------- |
| original  | 原始分辨率 |
| large2x   | 1880px 宽  |
| large     | 940px 宽   |
| medium    | 350px 宽   |
| small     | 130px 宽   |
| portrait  | 800×1200px |
| landscape | 1200×627px |
| tiny      | 280×200px  |

## 使用限制

- 免费额度：**200 次请求/小时**
- 使用图片需注明摄影师姓名（Attribution）
- 不可将图片用于出售或作为主要商品

## 申请 API Key

访问 [https://www.pexels.com/api/](https://www.pexels.com/api/) 注册并获取免费 API Key。
