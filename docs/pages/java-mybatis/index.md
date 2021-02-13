# MyBatis

## 工作流程
1. 安装 MyBatis，以 Maven 为例：
```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.3</version>
</dependency>
```

2. 创建 [MyBatis 配置文件](https://mybatis.org/mybatis-3/zh/configuration.html)，文件名没有特别规定，核心代码如下：
```xml
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/db"/>
                <property name="username" value="root"/>
                <property name="password" value="admin"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mappers/user.xml"/>
    </mappers>
</configuration>
```

3. 读取 MyBatis 配置文件，并最终得到 `org.apache.ibatis.session.SqlSessionFactory`，一个实例如下：
```java
Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
```

4. 定义 Mapper、Entity
Mapper 是 MyBatis 的术语，配置文件可以是 xml 格式的，核心代码如下：
```xml
<mapper namespace="org.example.data.UserMapper">
    <select id="getByUsername" parameterType="String" resultType="org.example.entity.User">
        select * from sys_user where username = #{value};
    </select>
</mapper>
```

Entity 表示业务实体类，是一个 POJO 对象：
```java
package org.example.entity;

public class User {
    private Long userId;
    private String username;
    private String password;
    // 省略 Getter/Setter
}
```

UserMapper 是一个接口：
```java
package org.example.data;

public interface UserMapper {
    User getByUsername(String username);
}
```

5. 通过 `org.apache.ibatis.session.SqlSession` 操作数据库，代码如下：
```java
SqlSession session = sqlSessionFactory.openSession();
User user = session.getMapper(UserMapper.class).getByUsername("zhangsan");
session.close();
```
