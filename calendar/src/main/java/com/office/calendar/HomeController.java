package com.office.calendar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    final private String CLASS_NAME = "[HomeController] ";

    @GetMapping({"", "/"})
    public String home() {
        System.out.println(CLASS_NAME.concat("home()"));

        String nextPage = "home";

        return nextPage;

    }

}
