package com.food.debug.web.food;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    private String type;
    @NotNull
    private Integer level;
    private String description;
    private Float cereals;
    private Float fruits;
    private Float vegetables;
    private Float eggs;
    private Float fish;
    private Float meat;
    private Float nuts;
    private Float dairy;

    public Food(){

    }
    public Food(String name, String type, Integer level, String description, float cereals, float fruits, float vegetables, float eggs, float fish, float meat, float nuts, float dairy) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.description = description;
        this.cereals = cereals;
        this.fruits = fruits;
        this.vegetables = vegetables;
        this.eggs = eggs;
        this.fish = fish;
        this.meat = meat;
        this.nuts = nuts;
        this.dairy = dairy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getCereals() {
        return cereals;
    }

    public void setCereals(Float cereals) {
        this.cereals = cereals;
    }

    public Float getFruits() {
        return fruits;
    }

    public void setFruits(Float fruits) {
        this.fruits = fruits;
    }

    public Float getVegetables() {
        return vegetables;
    }

    public void setVegetables(Float vegetables) {
        this.vegetables = vegetables;
    }

    public Float getEggs() {
        return eggs;
    }

    public void setEggs(Float eggs) {
        this.eggs = eggs;
    }

    public Float getFish() {
        return fish;
    }

    public void setFish(Float fish) {
        this.fish = fish;
    }

    public Float getMeat() {
        return meat;
    }

    public void setMeat(Float meat) {
        this.meat = meat;
    }

    public Float getNuts() {
        return nuts;
    }

    public void setNuts(Float nuts) {
        this.nuts = nuts;
    }

    public Float getDairy() {
        return dairy;
    }

    public void setDairy(Float dairy) {
        this.dairy = dairy;
    }
}
