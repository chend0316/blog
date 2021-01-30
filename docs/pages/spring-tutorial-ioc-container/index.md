# Spring IOC 入门教程

通过 Maven 安装 Spring 依赖：
``` xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.3</version>
    </dependency>
</dependencies>
```

新建 *applicationContext.xml* 文件，文件内容参考[官网](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-metadata)：
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  
        <property name="..." value="..."></property>
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->
</beans>
```

在代码中创建 `ApplicationContext`：
``` java
public class SpringApplication {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        // 获取 Bean 实例：context.getBean("xxx", xxx.class);
    }
}
```
