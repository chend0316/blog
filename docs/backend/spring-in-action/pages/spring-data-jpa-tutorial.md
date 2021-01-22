# Spring Data JPA 快速入门
## 环境搭建
### JPA + H2 环境
略

## 定义 Entity
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

## 定义 Repository
Repository 是 Spring 对数据访问层的抽象，使用时需要定义一个继承自 `org.springframework.data.repository.Repository` 的接口。

下面为我们的咖啡实体定义一个 Repository：
```java
public interface CoffeeRepository extends CrudRepository<Coffee, Long> {
}
```

## 使用 Repository 操作数据
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

## 为 Repository 添加更多字段、注解
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

## 如何处理金额
涉及到金额的系统，一定要注意，不要用浮点数存储金额。

## 参考资料
- [Spring Data JPA 官方教程](https://spring.io/guides/gs/accessing-data-jpa/)。
- [极客时间《玩转Spring全家桶》](https://time.geekbang.org/course/detail/100023501-82882)
