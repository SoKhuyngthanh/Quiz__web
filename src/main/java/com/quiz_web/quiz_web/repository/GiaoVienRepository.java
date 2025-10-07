package com.quiz_web.quiz_web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz_web.quiz_web.entity.GiaoVien;

// Quan trọng nhất là dòng "extends JpaRepository<GiaoVien, Integer>" này
// GiaoVien: Lớp Entity mà Repository này quản lý
// Integer: Kiểu dữ liệu của khóa chính (id) trong lớp GiaoVien
public interface GiaoVienRepository extends JpaRepository<GiaoVien, Integer> {

    Optional<GiaoVien> findByEmail(String email);
    
}