package io.github.chend0316;

public class Application {
    public static void main(String[] args) {
        PersonConfig config = new PersonConfig();
        config.setEmailValidator("1234");
        Person person = PersonBuilder.builder(config).age(18).name("zhangsan").build();
        System.out.println(person.getAge());
        System.out.println(person.getName());
    }
}
