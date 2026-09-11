package com.office.calendar.member;

public class MemberDto {

    private int no;                 // 사용자 고유 번호
    private String id;              // 사용자 아이디
    private String pw;              // 사용자 비밀번호
    private String mail;            // 사용자 메일
    private String phone;           // 사용자 연락처
    private int authority_no;       // 사용자 권한 번호
    private String reg_date;        // 사용자 정보 등록일
    private String mod_date;        // 사용자 정보 수정일

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getAuthority_no() {
        return authority_no;
    }

    public void setAuthority_no(int authority_no) {
        this.authority_no = authority_no;
    }

    public String getReg_date() {
        return reg_date;
    }

    public void setReg_date(String reg_date) {
        this.reg_date = reg_date;
    }

    public String getMod_date() {
        return mod_date;
    }

    public void setMod_date(String mod_date) {
        this.mod_date = mod_date;
    }

}
