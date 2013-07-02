package com.food.debug.web.food;


import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@Secured("ROLE_USER")
public class NutritionCalculateController {

    @RequestMapping(value = "/nutritionCalculate", method = RequestMethod.GET)
    public String nutritionCalculate(Model model) {
        return "food/nutritionCalculate";
    }

}
