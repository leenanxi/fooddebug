package com.food.debug.web.food;


import com.food.debug.web.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class FoodRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(FoodRepository.class);
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Food save(Food food) {
        entityManager.persist(food);
        return food;
    }
    @Transactional
       public void delete(Long id) {
        entityManager.remove(entityManager.getReference(Food.class, id));
    }

    @Transactional
    public void update(Food food) {
        entityManager.merge(food);
    }


    public List<Food> findAll() {
        return entityManager.createQuery("SELECT f FROM Food f", Food.class).getResultList();
    }
    public Food findById(Long id) {
        return entityManager.find(Food.class, id);
    }
}
