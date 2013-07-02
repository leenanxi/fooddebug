package com.food.debug.web.test;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 关于静态网页的测试
 */
@Controller
public class TestController {

    @RequestMapping(value = "test")
    public String test() {
        return "test/index";
    }

    @RequestMapping(value = "/test/{pageName}", method = RequestMethod.GET)
    public String initTestStaticPages(@PathVariable("pageName") String pageName) {
        return "test/"+pageName;
    }


    @RequestMapping(value = "admin")
    public String admin() {
        return "admin/index";
    }

    @RequestMapping(value = "/admin/{pageName}", method = RequestMethod.GET)
    public String initAdminStaticPages(@PathVariable("pageName") String pageName) {
        return "admin/"+pageName;
    }

    @RequestMapping(value = "frontend")
    public String frontend() {
        return "frontend/index";
    }

    @RequestMapping(value = "/frontend/{pageName}", method = RequestMethod.GET)
    public String initFrontendStaticPages(@PathVariable("pageName") String pageName) {
        return "frontend/"+pageName;
    }
}
