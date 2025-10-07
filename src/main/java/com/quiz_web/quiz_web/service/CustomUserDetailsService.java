package com.quiz_web.quiz_web.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.quiz_web.quiz_web.entity.GiaoVien;
import com.quiz_web.quiz_web.repository.GiaoVienRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private GiaoVienRepository khoGiaoVien;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        GiaoVien giaoVien = khoGiaoVien.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy giáo viên với email: " + email));

        return new User(
                giaoVien.getEmail(),
                giaoVien.getMatKhau(),
                Collections.emptyList()
        );
    }
}