# Spring Data JPA 入门教程
## 环境搭建
### JPA + H2 环境
略，请看 Spring 官网的 Guides。

### JPA + MySQL 环境
在学习阶段使用 H2 数据库是很方便的，但最终到了生产肯定要切换到 MySQL。

首先要启动 MySQL 服务器，这里推荐使用 Docker，参考[Docker 官网](https://hub.docker.com/_/mysql)
- 启动服务：`$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag`
- 测试服务是否启动成功：`$ docker run -it --rm mysql:tag mysql -h192.168.x.x -uroot -p`

然后在 Spring 项目中连接 MySQL，参考[Spring 官方教程](https://spring.io/guides/gs/accessing-data-mysql/)，关键步骤：
- 启动 MySQL
- 在 MySQL 中创建一个数据库
- 在 MySQL 中创建一个用户
- 在 application.properties 中配置刚创建的 MySQL 数据库、用户名、密码
- 进行后续的开发

## 定义 Entity、Repository
### 定义 Entity
在 JPA 中，实体 (Entity) 相当于数据模型。下面我们创建一个咖啡实体。

首先定义咖啡的 POJO，为了方便业务使用，我们还定义了一个构造函数：
```java
public class Coffee {
    private Long id;
    private String name;
    private double price;

    public Coffee(String name, double price) {
        this.name = name;
        this.price = price;
    }
}
```

为了让 POJO 被识别为 JPA Entity，必须有 `@Entity`，光这样还不够，IDE 会提示说还需要 `@Id` 和无参构造函数。
```java{1,3,8}
@Entity
public class Coffee {
    @Id
    private Long id;
    private String name;
    private double price;

    public Coffee() {}
    public Coffee(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // 省略大量的 getter/setter 方法
}
```

构造函数、getter/setter 写起来简单枯燥，我们使用 lombok 提供的注解来减少样板代码。
```java{2-5}
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coffee {
    @Id
    private Long id;
    private String name;
    private double price;
}
```

### 定义 Repository
Repository 是 Spring 对数据访问层的抽象，使用时需要定义一个继承自 `org.springframework.data.repository.Repository` 的接口。

下面为我们的咖啡实体定义一个 Repository：
```java
public interface CoffeeRepository extends CrudRepository<Coffee, Long> {
}
```

### 使用 Repository 访问数据库
我们先来看一下入口类，这里用到的 SpringBoot 有点超纲，但没关系，我们没必要一开始就搞明白所有知识点。现在我们只需要知道 `run()` 是入口函数。
```java
@SpringBootApplication
@Slf4j
public class SpringbucksApplication implements ApplicationRunner {
    public static void main(String[] args) {
        SpringApplication.run(SpringbucksApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
    }
}
```

下面我们使用前面定义好的 CoffeeRepository 读写数据库：
```java{4-5,16-23}
@SpringBootApplication
@Slf4j
public class SpringbucksApplication implements ApplicationRunner {
    @Autowired
    private CoffeeRepository coffeeRepository;

    public static void main(String[] args) {
        SpringApplication.run(SpringbucksApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        initOrders();
    }

    private void initOrders() {
        Coffee latte = Coffee.builder().id(1L).name("latte").price(11.9).build();
        Coffee espresso = new Coffee(2L, "espresso", 13.9);
        coffeeRepository.save(latte);
        coffeeRepository.save(espresso);
        log.info("共{}个咖啡", coffeeRepository.count());
        coffeeRepository.findAll().forEach(c -> log.info("咖啡名：{}，价格：{}", c.getName(), c.getPrice()));
    }
}
```

## Entity
### 完善 Entity 定义
知识点如下：
- 一般的实践会增加 `createTime` 和 `updateTime` 这两个字段
- 使用 `@Table` 指定表名，如果省略则表名默认为类名
- 主键用 `@Id`，一般会配合 `@GeneratedValue` 实现主键自动填充

```java
@Entity
@Table(name = "T_COFFEE")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coffee {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private double price;
    @CreationTimestamp
    private Date createTime;
    @UpdateTimestamp
    private Date updateTime;
}
```

### 如何定义多表连接


### 如何处理金额
涉及到金额的系统，一定要注意，不要用浮点数存储金额。

## Repository
### 定义查询
我们的 Repository 是一个继承自 `CrudRepository` 的接口，默认提供了一些方法：`findAll()`、`findById()`、`delete()`等等。如果觉得不够的话可以自己再定义一些方法，如下所示。

```java
public interface CoffeeRepository extends CrudRepository<Coffee, Long> {
    List<Coffee> findByNameIgnoreCase(String name);
    List<Coffee> findByPriceBetween(double start, double end);
}
```

Repository 是一个接口，我们只需要定义方法签名，不需要实现这些方法，这就是 Spring 带来的魔法吧？这个魔法要求方法名符合一些规律，这个规律可以看官方文档。

### 定义分页查询

### 自定义 SQL 查询语句

## 参考资料
- [Spring Data JPA 官方教程](https://spring.io/guides/gs/accessing-data-jpa/)。
- [极客时间《玩转Spring全家桶》](https://time.geekbang.org/course/detail/100023501-82882)
- [Hibernate 5.4 官方指南](https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html)
