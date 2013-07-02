package com.food.debug.web.food;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.support.SessionStatus;

import javax.validation.Valid;

@Controller
@Secured("ROLE_USER")
public class FoodController {
    private FoodRepository foodRepository;
    @Autowired
    public FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
        init();
    }
    private void init() {
        foodRepository.save(new Food("土豆丝","菜品",1,"菜品",0.5F,0,0,0,0,0,0,0));
        foodRepository.save(new Food("番茄炒鸡蛋","菜品",3,"家常菜",25f,0f,0f,0f,0f,0f,0f,0f));
        foodRepository.save(new Food("牛筋面","面食",3,"主食",0.5f,0f,0f,0f,0.8f,0f,0f,0f));
        foodRepository.save(new Food("牛肉拉面","面食",1,"主食",0.5f,0f,0f,0f,0f,0f,0f,0f));
        foodRepository.save(new Food("臊子面","面食",2,"主食",0.1f,0f,0f,0f,0f,0f,0f,0f));
        foodRepository.save(new Food("凉面","面食",1,"主食",30f,0f,0f,0f,0.23f,0f,0f,0f));
    }

    @ModelAttribute("page")
    public String module() {
        return "foods";
    }

    @RequestMapping(value = "foods", method = RequestMethod.GET)
    public String messages(Model model) {
        model.addAttribute("foods", foodRepository.findAll());
        return "food/list";
    }


    @RequestMapping("/food/{foodId}")
    public String showFood(@PathVariable("foodId") long foodId,Model model) {
        model.addAttribute("food", foodRepository.findById(foodId));
        return "food/foodDetails";
    }


    @RequestMapping(value = "/food/new", method = RequestMethod.POST)
    public String processCreationForm(@Valid Food food, BindingResult result, SessionStatus status) {
        if (result.hasErrors()) {
            return "food/createOrUpdateFoodForm";
        } else {
            foodRepository.save(food);
            status.setComplete();
            return "redirect:/food/" + food.getId();
        }
    }
    @RequestMapping(value = "/food/new", method = RequestMethod.GET)
    public String initCreationForm(Model model) {
        Food food = new Food();
        model.addAttribute("food", food);
        return "food/createOrUpdateFoodForm";
    }

    @RequestMapping(value = "/food/{foodId}/edit", method = RequestMethod.GET)
    public String initUpdateFoodForm(@PathVariable("foodId") long foodId, Model model) {
        Food food = foodRepository.findById(foodId);
        model.addAttribute(food);
        return "food/createOrUpdateFoodForm";
    }

    @RequestMapping(value = "/food/{foodId}/delete", method = RequestMethod.GET)
    public String deleteFood(@PathVariable("foodId") long foodId) {
        foodRepository.delete(foodId);
        return "redirect:/foods";
    }

    @RequestMapping(value = "/food/{foodId}/edit", method = RequestMethod.POST)
    public String processUpdateFoodForm(@Valid Food food,@PathVariable("foodId") long foodId, BindingResult result, SessionStatus status) {
        if (result.hasErrors()) {
            return "food/createOrUpdateFoodForm";
        } else {
            food.setId(foodId);
            foodRepository.update(food);
            status.setComplete();
            return "redirect:/food/{foodId}";
        }
    }



}
