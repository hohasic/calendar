package com.office.calendar.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();

    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/css/*",
                                "/img/*",
                                "/js/*",
                                "/member/signup",
                                "/member/signup_confirm",
                                "/member/signin",
                                "/member/findpassword",
                                "/member/findpassword_confirm",
                                "/member/signin_result").permitAll()
                        .anyRequest().authenticated()

                );

        http
                .formLogin(login -> login
                        .loginPage("/member/signin")
                        .loginProcessingUrl("/member/signin_confirm")
                        .usernameParameter("id")
                        .passwordParameter("pw")
                        .successHandler((request, response, authentication) -> {
                            System.out.println("signin successHandler()");

                            User user = (User) authentication.getPrincipal();
                            String targetURI = "/member/signin_result?loginedID=" + user.getUsername();
                            response.sendRedirect(targetURI);

                        })
                        .failureHandler((request, response, exception) -> {
                            System.out.println("signin failureHandler()");

                            String targetURI = "/member/signin_result";
                            response.sendRedirect(targetURI);

                        })
                );

        // http.exceptionHandling(...)은 Spring Security의 예외 처리 설정을 구성합니다.
        // 지금은 ‘.accessDeniedHandler’를 설정해서 인가(Authorization) 과정에서
        // 접근 거부(403 Forbidden) 발생 시 MemberAccessDeniedHandler가 동작하도록 합니다.
        http
                .logout(logout -> logout
                        .logoutUrl("/member/signout_confirm")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            System.out.println("signout logoutSuccessHandler()");

                            String targetURI = "/";
                            response.sendRedirect(targetURI);

                        })
                );

        return http.build();

    }

}
