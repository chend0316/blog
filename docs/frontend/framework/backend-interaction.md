# 前后端交互
技术演进：
1. 在业务组件内通过 Axios 这样的库裸跑 HTTP 协议
2. 在前端代码中为 API 通信单独封装一层，通常放在 `service/` 或 `api/` 文件夹下
3. 前端人员使用 Node.js 编写 BFF 层，封装成前端想要的 API 形式
4. GraphQL
