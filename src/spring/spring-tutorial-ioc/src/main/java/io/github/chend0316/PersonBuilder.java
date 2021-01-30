package io.github.chend0316;

public class PersonBuilder {
    private Person p;

    public static PersonBuilder builder(PersonConfig config) {
        PersonBuilder builder = new PersonBuilder();
        builder.init();
        return builder;
    }

    private void init() {
        this.p = new Person();
    }

    public PersonBuilder name(String name) {
        this.p.setName(name);
        return this;
    }

    public PersonBuilder age(int age) {
        this.p.setAge(age);
        return this;
    }

    public Person build() {
        return this.p;
    }
}
