package com.office.calendar.member;

import org.springframework.stereotype.Service;

@Service
public class MemberService {

    final private String CLASS_NAME = "[MemberService] ";

    final public static int USER_ID_ALREADY_EXIST   = 0;
    final public static int USER_SIGNUP_SUCCESS     = 1;
    final public static int USER_SIGNUP_FAIL        = -1;

    final private MemberDao memberDao;

    public MemberService(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    public int signupConfirm(MemberDto memberDto) {
        System.out.println(CLASS_NAME.concat("signupConfirm()"));

        boolean isMember = memberDao.isMember(memberDto.getId());

        if (!isMember) {
            int result = memberDao.insertMember(memberDto);

            if (result > 0)
                return USER_SIGNUP_SUCCESS;
            else
                return USER_SIGNUP_FAIL;

        } else {
            return USER_ID_ALREADY_EXIST;
        }

    }
}
