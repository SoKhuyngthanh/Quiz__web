package com.quiz_web.quiz_web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.quiz_web.quiz_web.entity.GiaoVien;
import com.quiz_web.quiz_web.repository.GiaoVienRepository;

@Controller
public class WebController {

    @Autowired
    private GiaoVienRepository khoGiaoVien;

    @Autowired
    private PasswordEncoder congCuMaHoa;

    @GetMapping("/")
    public String hienThiTrangChuChaoMung() {
        return "chao-mung";
    }

    @GetMapping("/dang-nhap")
    public String hienThiFormDangNhap(Authentication authentication) {
        // SỬA LỖI QUAN TRỌNG:
        // Kiểm tra xem người dùng đã đăng nhập thực sự chưa (không phải là người dùng ẩn danh).
        // Nếu đã đăng nhập, chuyển hướng họ về trang chính, tránh vòng lặp.
        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            return "redirect:/trang-chu-giao-vien";
        }
        return "dang-nhap";
    }

    @GetMapping("/dang-ky")
    public String hienThiFormDangKy(Authentication authentication, Model model) {
        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            return "redirect:/trang-chu-giao-vien";
        }
        model.addAttribute("giaoVienMoi", new GiaoVien());
        return "dang-ky";
    }

    @PostMapping("/dang-ky")
    public String xuLyDangKy(@ModelAttribute("giaoVienMoi") GiaoVien giaoVienMoi) {
        giaoVienMoi.setMatKhau(congCuMaHoa.encode(giaoVienMoi.getMatKhau()));
        khoGiaoVien.save(giaoVienMoi);
        return "redirect:/dang-nhap?success";
    }

    @GetMapping("/trang-chu-giao-vien")
    public String hienThiTrangChuGiaoVien() {
        return "trang-chu-giao-vien";
    }
}