package com.food.debug.web.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.security.Principal;

@Controller
public class HomeController {

    @ModelAttribute("page")
    public String module() {
        return "home";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Principal principal) {
        return "home/index";
    }
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String indexPage(Principal principal) {
//        return principal != null ? "home/index" : "food/nutritionCalculate";
        return "home/index";
    }
    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String homePage(Principal principal) {
//        return principal != null ? "home/index" : "food/nutritionCalculate";
        return "home/index";
    }

    @RequestMapping(value = "/messageBoard", method = RequestMethod.GET)
    public String messagePage() {
        return "home/message";
    }

    @RequestMapping(value = "/about", method = RequestMethod.GET)
    public String aboutPage() {
        return "home/about";
    }

}
