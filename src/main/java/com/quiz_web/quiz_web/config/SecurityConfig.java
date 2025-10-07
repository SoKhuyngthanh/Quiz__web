package com.quiz_web.quiz_web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        // ▼▼▼ DÒNG QUAN TRỌNG NHẤT LÀ DÒNG NÀY ▼▼▼
                        // Cho phép TẤT CẢ MỌI NGƯỜI truy cập các đường dẫn này mà không cần đăng nhập
                        .requestMatchers("/", "/dang-ky", "/dang-nhap", "/css/**", "/js/**").permitAll()
                        
                        // Bất kỳ đường dẫn nào khác đều YÊU CẦU phải đăng nhập
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/dang-nhap")
                        .loginProcessingUrl("/xu-ly-dang-nhap")
                        .defaultSuccessUrl("/trang-chu-giao-vien", true)
                        .usernameParameter("email")
                        .passwordParameter("matKhau")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/dang-xuat"))
                        .logoutSuccessUrl("/dang-nhap?logout")
                        .permitAll()
                );
        return http.build();
    }
}