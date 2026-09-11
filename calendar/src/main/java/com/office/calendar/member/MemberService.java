package com.office.calendar.member;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    final private String CLASS_NAME = "[MemberService] ";

    final public static int USER_ID_ALREADY_EXIST   = 0;
    final public static int USER_SIGNUP_SUCCESS     = 1;
    final public static int USER_SIGNUP_FAIL        = -1;

    final private MemberDao memberDao;
    final private PasswordEncoder passwordEncoder;

    public MemberService(MemberDao memberDao,
                         PasswordEncoder passwordEncoder) {
        this.memberDao = memberDao;
        this.passwordEncoder = passwordEncoder;
    }

    public int signupConfirm(MemberDto memberDto) {
        System.out.println(CLASS_NAME.concat("signupConfirm()"));

        boolean isMember = memberDao.isMember(memberDto.getId());

        if (!isMember) {
            String encodedPW = passwordEncoder.encode(memberDto.getPw());
            memberDto.setPw(encodedPW);
            int result = memberDao.insertMember(memberDto);

            if (result > 0)
                return USER_SIGNUP_SUCCESS;
            else
                return USER_SIGNUP_FAIL;

        } else {
            return USER_ID_ALREADY_EXIST;
        }

    }

    public String signinConfirm(MemberDto memberDto) {
        System.out.println(CLASS_NAME.concat("signinConfirm()"));

        MemberDto dto = memberDao.selectMemberByID(memberDto.getId());
        if (dto != null && passwordEncoder.matches(memberDto.getPw(), dto.getPw())) {
            System.out.println(CLASS_NAME.concat("MEMBER LOGIN SUCCESS!!"));
            return dto.getId();

        } else {
            System.out.println(CLASS_NAME.concat("MEMBER LOGIN FAIL!!"));
            return null;

        }

    }
}
