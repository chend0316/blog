# SQL

我们可以把 SQL 语言按照功能划分成以下的 4 个部分：

- DDL，用来定义我们的数据库对象，包括数据库、数据表和列。通过使用 DDL，我们可以创建，删除和修改数据库和表结构。
- DML，用来操作和数据库相关的记录，比如增加、删除、修改数据表中的记录。
- DCL，用来定义访问权限和安全级别。
- DQL，数据查询语言，是 SQL 语言的重中之重。学会编写正确且高效的查询语句，是学习的重点。

## SELECT 语句
### 单表查询
对于单张表
- 我们可以使用 `where` 筛选
- 使用 `order by` 进行排序
- 使用 `limit` 限制查询结果数量
- 使用 `distinct` 去重
- 使用 `group by` 和聚合函数进行聚合查询

### 多表查询
对于多张表，我们可以使用连接、子查询。

连接分为：笛卡尔积、等值连接、非等值连接、外连接、自连接。

子查询涉及到主表、从表两张表，根据主表和从表是否有关联分为「关联子查询」和「非关联子查询」。
- 非关联子查询只会执行一次，而关联子查询类似二重循环会执行多次耗时更多
- 关联子查询常配合集合比较操作符使用，包括 `IN`、`ANY`、`ALL`、`SOME`
- 关联子查询的 `EXISTS` 和 `IN` 的功能相近，如果主表大于从表则 `IN` 效率更高，反之 `EXISTS` 效率更高
- 子查询除了可以作为临时表使用外，还可以做为计算字段使用

## 视图
视图的用途：
- 复用 SQL 语句
- 简化复杂的 SQL 语句
- 数据保护

具体用法就是在 `select` 语句的前面加上视图的语句：
- 新建视图：`CREATE VIEW view_name AS`
- 修改视图：`ALTER VIEW view_name AS`
- 删除视图：`DROP VIEW view_name`

## 存储过程
以 MySQL 为例，我们需要先使用 `DELIMITER` 定义一个结束符，最后再用 `DELIMITER` 将结束符还原为分号。如果使用的是 Navicat 之类的工具，则可以省略 `DELIMITER`。

存储过程虽然有很多优点，但在工程上也有致命的缺点：会和特定数据库耦合、不方便调试、没有版本控制。所以阿里的最佳实践禁止使用存储过程。

```sql
DELIMITER //
CREATE PROCEDURE `add_num`(IN n INT)
BEGIN
    DECLARE i INT;
    DECLARE sum INT;
    
    SET i = 1;
    SET sum = 0;
    WHILE i <= n DO
        SET sum = sum + i;
        SET i = i +1;
    END WHILE;
    SELECT sum;
END //
DELIMITER ;
```
