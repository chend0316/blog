# Spring IOC 容器

## 安装依赖
通过 Maven 安装 spring-context 依赖：
``` xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.3</version>
    </dependency>
</dependencies>
```

## 配置 IOC 容器
有三种配置方法：
- 基于 XML
- [基于注解](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-annotation-config)
- [基于 Java 代码](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-java)

### 基于 XML
新建 *applicationContext.xml* 文件，文件内容参考[官网](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-metadata)：
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 使用 setter 创建 Bean -->
    <bean id="..." class="...">  
        <property name="..." value="..."></property>
    </bean>

    <!-- 使用构造函数创建 Bean -->
    <bean id="..." class="...">
        <constructor-arg name="..." value="..."></constructor-arg>
        <constructor-arg index="..." value="..."></constructor-arg>
    </bean>

    <!-- 使用静态工厂创建 Bean -->
    <bean id="..." class="..." factory-method="..." />

    <!-- 使用工厂实例创建 Bean -->
    <bean id="factory..." class="..." />
    <bean id="..." factory-bean="factory..." factory-methods="..." />
</beans>
```

在代码中创建 `ApplicationContext`，并获取 Bean 实例，下面的代码对应于[官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-client)：
``` java
public class SpringApplication {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        // 获取 Bean 实例：context.getBean("xxx", xxx.class);
    }
}
```

## 琐碎知识点
ClassPathXmlApplicationContext 的 configLocation 参数还是有点复杂的，见 API 文档。

[这篇教程](https://www.tutorialspoint.com/spring/spring_injecting_collection.htm)介绍了如何注入集合类型的对象。

## 考点
说实话我个人很反感背题库。
- Bean 的 id 和 name 有什么区别？
- 定义 Bean 的时候如果 id 和 name 都没有定义，那么会发生什么？
