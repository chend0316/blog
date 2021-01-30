package io.github.chend0316;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringApplication {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        PersonConfig personConfig = context.getBean("personConfig", PersonConfig.class);
        System.out.println(personConfig.getEmailValidator());
    }
}
