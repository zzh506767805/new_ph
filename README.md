# Product Research 工具

这是一个基于 ProductHunt API 的产品研究工具，可以帮助产品经理快速了解市场上的相关产品，并获取产品分析报告。

## 功能特点

- 智能关键词生成：根据输入的主题自动生成相关的搜索关键词
- ProductHunt 数据获取：自动从 ProductHunt 获取相关产品信息
- AI 分析报告：使用 GPT 模型分析产品数据，生成市场分析报告
- RESTful API：提供简单的 API 接口，方便集成到其他系统

## 技术栈

- 后端：Node.js + Express
- 前端：React + Vite
- AI：OpenAI GPT API
- 数据源：ProductHunt API

## 快速开始

1. 克隆项目
```bash
git clone [repository-url]
```

2. 安装依赖
```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd frontend
npm install
```

3. 配置环境变量
创建 `.env` 文件并添加以下配置：
```
OPENAI_API_KEY=your_openai_api_key
PRODUCTHUNT_API_KEY=your_producthunt_api_key
PORT=3001
HTTP_PROXY=127.0.0.1:7897
```

4. 启动服务
```bash
# 启动后端服务
npm start

# 启动前端开发服务器
cd frontend
npm run dev
```

## API 文档

### 产品研究 API

**请求**
- 方法：POST
- 路径：/api/research
- 内容类型：application/json
- 参数：
  ```json
  {
    "topic": "研究主题"
  }
  ```

**响应**
```json
{
  "content": "分析报告内容",
  "keywords": ["关键词1", "关键词2", ...],
  "products": [
    {
      "name": "产品名称",
      "tagline": "产品标语",
      "description": "产品描述",
      "url": "产品链接",
      "votesCount": "投票数",
      "website": "网站地址",
      "createdAt": "创建时间",
      "topics": ["主题1", "主题2", ...]
    }
  ]
}
```

## 注意事项

- 请确保在使用前已经获取了必要的 API 密钥
- ProductHunt API 可能会有请求限制，请合理使用
- 建议在开发环境中使用代理以避免网络问题

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT License