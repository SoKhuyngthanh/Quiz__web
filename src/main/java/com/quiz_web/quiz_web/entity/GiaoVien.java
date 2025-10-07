package com.quiz_web.quiz_web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity // <-- DÒNG NÀY CỰC KỲ QUAN TRỌNG, RẤT CÓ THỂ BẠN ĐÃ BỎ SÓT NÓ
@Table(name = "giao_vien")
public class GiaoVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "mat_khau", nullable = false)
    private String matKhau;

    @Column(name = "ho_ten")
    private String hoTen;
}