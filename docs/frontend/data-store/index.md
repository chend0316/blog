# 数据存储
知识点罗列：
- Cookie
- H5 新增的 Web Storage：localStorage、sessionStorage
- IndexedDB

Cookie 本是用来和服务端通信的，在 H5 出现以前勉强能用作数据存储。后来 H5 新增了 Web Storage 专门做存储。Cookie 会随着每个网络请求发送出去，所以不能存太大的内容，否则浪费流量。
