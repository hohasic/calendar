package com.office.calendar.member;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MemberController {

    final private String CLASS_NAME = "[MemberController] ";

    final private MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원가입 양식
    @GetMapping("/signup")
    public String signup() {
        System.out.println(CLASS_NAME.concat("signup()"));

        String nextPage = "member/signup_form";

        return nextPage;

    }

    // 회원가입 확인
    @PostMapping("signup_confirm")
    public String signupConfirm(MemberDto memberDto, Model model) {
        System.out.println(CLASS_NAME.concat("signupConfirm()"));

        String nextPage = "member/signup_result";

        int result = memberService.signupConfirm(memberDto);
        model.addAttribute("result", result);

        return nextPage;

    }

}
