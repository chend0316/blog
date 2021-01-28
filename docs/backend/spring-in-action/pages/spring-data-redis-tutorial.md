# Spring Data Redis 入门教程
## 环境搭建
### 使用 Docker 启动 Redis 服务
见[官网](https://hub.docker.com/_/redis)
- 先下载镜像：`docker pull redis:5`
- 然后启动 Redis：`docker run --name redis-learning -p27017:27017 -d redis:5`
- 测试是否启动成功：`docker run -ti --rm --network host redis:5 redis-cli`

[在官网查阅 Redis 命令](https://redis.io/commands)

## 直接使用 Jedis
Jedis 没有独立官网，它的用法在 [GitHub Wiki](https://github.com/redis/jedis/wiki) 上。

基本使用方法如下：
```java
Jedis jedis = new Jedis("localhost", 6379);
jedis.set("hello", "world");
System.out.println(jedis.get("hello"));
```

### JedisPoll
按照[官方](https://github.com/redis/jedis/wiki/Getting-started#using-jedis-in-a-multithreaded-environment)的说法，Jedis 不是线程安全的。如果为每个线程都建一个 Jedis 实例也比较浪费，所以用 JedisPool 是比较好的办法，JedisPoll 是基于 [Apache Commons Pool](https://commons.apache.org/proper/commons-pool/) 实现的。

### 利用 Jedis 实现缓存
下面这段代码写起来很繁琐，仅供研究，勿用于生产环境。

::: details Jedis 实现缓存
```java
@Slf4j
@Service
public class CoffeeService {
    @Autowired
    private CoffeeRepository coffeeRepository;
    @Autowired
    private JedisPool jedisPool;
    Gson gson = new Gson();

    public List<Coffee> findAllCoffee() {
        return coffeeRepository.findAll();
    }

    public Optional<Coffee> findOneCoffee(String name) {
        String key = "coffee:" + name;
        try (Jedis jedis = jedisPool.getResource()) {
            if (jedis.exists(key)) {  // 缓存命中
                return Optional.of(gson.fromJson(jedis.get(key), Coffee.class));
            }
        }

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("name", exact().ignoreCase());
        Optional<Coffee> coffee = coffeeRepository.findOne(
                Example.of(Coffee.builder().name(name).build(), matcher));

        if (coffee.isPresent()) {
            try (Jedis jedis = jedisPool.getResource()) {
                jedis.set(key, gson.toJson(coffee.get()));
            }
        }
        return coffee;
    }
}
```
:::

## 在 Spring 中使用 RedisTemplate

## 在 Spring 中使用 RedisRepository

## 在 Spring 中使用缓存抽象

## 使用哨兵和集群
