package com.quiz_web.quiz_web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController // Dùng @RestController vì nó chuyên trả về dữ liệu (JSON), không phải trang HTML
public class ApiController {

    // Lấy giá trị của API key từ file application.properties
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    // Hàm này sẽ được gọi khi Frontend gửi yêu cầu POST đến /api/tao-cau-hoi
    @PostMapping("/api/tao-cau-hoi")
    public ResponseEntity<String> taoCauHoi(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");

        // Tạo một đối tượng để giao tiếp với các API bên ngoài
        RestTemplate restTemplate = new RestTemplate();

        // Đây là URL của Google Gemini API
        String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

        // Tạo phần "header" cho yêu cầu, báo cho Google biết chúng ta gửi dữ liệu dạng JSON
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Tạo phần "body" của yêu cầu với nội dung prompt mà Frontend gửi lên
        // Thoát các ký tự đặc biệt trong prompt để đảm bảo JSON hợp lệ
        String escapedPrompt = prompt.replace("\\", "\\\\").replace("\"", "\\\"");

        // Tạo requestBody theo cách truyền thống, tương thích với mọi phiên bản Java
        String requestBody = "{\n" +
                "    \"contents\": [{\n" +
                "        \"parts\": [{\n" +
                "            \"text\": \"" + escapedPrompt + "\"\n" +
                "        }]\n" +
                "    }],\n" +
                "    \"generationConfig\": {\n" +
                "        \"temperature\": 0.5,\n" +
                "        \"maxOutputTokens\": 4096\n" +
                "    }\n" +
                "}";

        // Gói header và body lại thành một yêu cầu hoàn chỉnh
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        try {
            // Gửi yêu cầu đến Google API và nhận lại kết quả
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
            
            // Trả kết quả từ Google về lại cho Frontend
            return response;
        } catch (Exception e) {
            // Nếu có lỗi, trả về thông báo lỗi cho Frontend
            return ResponseEntity.internalServerError().body("Lỗi khi gọi Gemini API: " + e.getMessage());
        }
    }
}