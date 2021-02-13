# JDBC

## 环境搭建
JDBC 是标准，各个数据库厂商实现了这个标准。

以 MySQL 为例，你需要去 MySQL 的官网下载对应的 JDBC 驱动。我们翻一下官网，发现是一个名为 Connector/J 的东西。谷歌可以搜到 Maven 安装 Connector/J 相关的[文档](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-installing-maven.html)。

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>
```
