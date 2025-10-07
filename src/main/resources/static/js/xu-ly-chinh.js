// NHÚNG API KEY CỦA BẠN VÀO ĐÂY
const GEMINI_API_KEY = "AIzaSyAhIkiuoRhIHBgq6nN5un3e9CPjYEhOLE0"; // <<<<<<<<<<<<<<<<<<< THAY API KEY CỦA BẠN VÀO ĐÂY

MathJax = {
    tex: {
        inlineMath: [
        ['$', '$'],        // Thêm dòng này để nhận diện $...$
        ['\\(', '\\)']
        ],
        displayMath: [
        ['$$', '$$'],      // Thêm dòng này để nhận diện $$...$$ cho display math (nếu cần)
        ['\\[', '\\]']
        ],
        processEscapes: true,
        packages: {'[+]': ['amsmath', 'amssymb']}
    },
    options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
    },
    startup: {
        ready: () => {
        MathJax.startup.defaultReady();
        MathJax.startup.promise.then(() => {
            // console.log('MathJax is ready and configured for single dollars!');
        });
        }
    }
};

let maMonHocDaChon = '';
let loaiCauHoiDaChon = '';
let doKhoDaChon = 'trungbinh'; // Mặc định
let lopDaChon = '';
let maBoSachDaChon = ''; // Ví dụ: 'kntt', 'ctst'
let tenHienThiBoSachDaChon = '';
let chiSoChuongDaChon = ''; // Lưu index của chương
let tenChuongDaChon = '';
let tenBaiHocDaChon = '';

const duLieuSGK = { // Trước đây là textbooksData
    'toan': {
        grades: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 6': {
            'kntt': {
                displayName: "SGK Toán 6 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Tập hợp các số tự nhiên", lessons: ["Bài 1: Tập hợp. Phần tử của tập hợp", "Bài 2: Cách ghi số tự nhiên", "Bài 3: Các phép tính trong tập hợp số tự nhiên"] },
                    { name: "Chương 2: Tính chia hết trong tập hợp các số tự nhiên", lessons: ["Bài 4: Quan hệ chia hết và tính chất", "Bài 5: Dấu hiệu chia hết", "Bài 6: Ước và bội. Số nguyên tố"] },
                    { name: "Chương 3: Số nguyên", lessons: ["Bài 7: Tập hợp các số nguyên", "Bài 8: Phép cộng và phép trừ số nguyên"] },
                    { name: "Chương 4: Hình học phẳng", lessons: ["Bài 9: Điểm, đường thẳng, tia", "Bài 10: Góc"] },
                    { name: "Chương 5: Tính đối xứng của hình phẳng", lessons: ["Bài 11: Hình có trục đối xứng", "Bài 12: Hình có tâm đối xứng"] },
                    { name: "Chương 6: Dữ liệu và xác suất thực nghiệm", lessons: ["Bài 13: Thu thập và phân loại dữ liệu", "Bài 14: Biểu diễn dữ liệu trên biểu đồ"] }
                ]
            },
            'ctst': {
                displayName: "SGK Toán 6 - Chân Trời Sáng Tạo",
                chapters: [
                    { name: "Chương 1: Số tự nhiên", lessons: ["Bài 1: Tập hợp. Phần tử của tập hợp", "Bài 2: Ba số tự nhiên. Ghi số tự nhiên", "Bài 3: Thứ tự trong tập hợp số tự nhiên"] },
                    { name: "Chương 2: Số nguyên", lessons: ["Bài 1: Số nguyên âm và tập hợp các số nguyên", "Bài 2: Thứ tự trong tập hợp số nguyên"] },
                    { name: "Chương 3: Hình học trực quan", lessons: ["Bài 1: Hình vuông - Tam giác đều - Lục giác đều", "Bài 2: Hình chữ nhật - Hình thoi - Hình bình hành - Hình thang cân"] },
                ]
            },
            'cd': {
                displayName: "SGK Toán 6 - Cánh Diều",
                chapters: [
                    { name: "Chương 1: Số tự nhiên", lessons: ["Bài 1: Tập hợp", "Bài 2: Phép cộng, phép trừ số tự nhiên"] },
                    { name: "Chương 2: Số nguyên", lessons: ["Bài 1: Số nguyên âm", "Bài 2: Phép cộng các số nguyên"] },
                    { name: "Chương 3: Hình học phẳng", lessons: ["Bài 1: Tam giác đều. Hình vuông. Lục giác đều", "Bài 2: Hình chữ nhật. Hình thoi"] },
                ]
            }
        },
        'Lớp 7': {
             'kntt': {
                displayName: "SGK Toán 7 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Số hữu tỉ", lessons: ["Bài 1: Tập hợp các số hữu tỉ", "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ"] },
                    { name: "Chương 2: Số thực", lessons: ["Bài 3: Số vô tỉ. Căn bậc hai số học", "Bài 4: Tập hợp các số thực"] },
                    { name: "Chương 3: Góc và đường thẳng song song", lessons: ["Bài 5: Các loại góc", "Bài 6: Hai đường thẳng song song và dấu hiệu nhận biết"] }
                ]
            }
        },
        'Lớp 8': {
            'kntt': {
                displayName: "SGK Toán 8 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Đa thức", lessons: ["Bài 1: Đơn thức", "Bài 2: Đa thức", "Bài 3: Hằng đẳng thức đáng nhớ"] },
                    { name: "Chương 2: Phân thức đại số", lessons: ["Bài 4: Phân thức đại số", "Bài 5: Các phép toán với phân thức"] },
                ]
            }
        },
        'Lớp 9': {
            'kntt': {
                displayName: "SGK Toán 9 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Căn bậc hai. Căn bậc ba", lessons: ["Bài 1: Căn bậc hai", "Bài 2: Căn thức bậc hai và hằng đẳng thức"] },
                    { name: "Chương 2: Hàm số bậc nhất", lessons: ["Bài 3: Hàm số bậc nhất", "Bài 4: Đồ thị của hàm số bậc nhất"] },
                ]
            }
        },
        'Lớp 10': {
            'kntt': {
                displayName: "SGK Toán 10 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Mệnh đề và Tập hợp", lessons: ["Bài 1: Mệnh đề, mệnh đề chứa biến", "Bài 2: Tập hợp và các phép toán trên tập hợp"] },
                    { name: "Chương 2: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn", lessons: ["Bài 3: Bất phương trình bậc nhất hai ẩn", "Bài 4: Hệ bất phương trình bậc nhất hai ẩn"] },
                    { name: "Chương 3: Hệ thức lượng trong tam giác", lessons: ["Bài 5: Giá trị lượng giác của một góc từ 0° đến 180°", "Bài 6: Hệ thức lượng trong tam giác"] },
                    { name: "Chương 4: Vectơ", lessons: ["Bài 7: Các khái niệm mở đầu về vectơ", "Bài 8: Tổng và hiệu của hai vectơ"] },
                    { name: "Chương 5: Các số đặc trưng của mẫu số liệu không ghép nhóm", lessons: ["Bài 9: Số gần đúng và sai số", "Bài 10: Các số đặc trưng đo xu thế trung tâm"] },
                    { name: "Chương 6: Hàm số, đồ thị và ứng dụng", lessons: ["Bài 11: Hàm số và đồ thị", "Bài 12: Hàm số bậc nhất và hàm số bậc hai"] }
                ]
            },
            'ctst': {
                displayName: "SGK Toán 10 - Chân Trời Sáng Tạo",
                chapters: [
                    { name: "Chương 1: Mệnh đề - Tập hợp", lessons: ["Bài 1: Mệnh đề", "Bài 2: Tập hợp", "Bài 3: Các phép toán tập hợp"] },
                    { name: "Chương 2: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn", lessons: ["Bài 1: Bất phương trình bậc nhất hai ẩn", "Bài 2: Hệ bất phương trình bậc nhất hai ẩn"] },
                    { name: "Chương 3: Hàm số và Đồ thị", lessons: ["Bài 1: Hàm số", "Bài 2: Hàm số bậc hai"] }
                ]
            },
            'cd': {
                displayName: "SGK Toán 10 - Cánh Diều",
                chapters: [
                    { name: "Chuyên đề 1: Mệnh đề toán học. Tập hợp", lessons: ["Bài 1: Mệnh đề toán học", "Bài 2: Tập hợp và các phép toán trên tập hợp"] },
                    { name: "Chuyên đề 2: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn", lessons: ["Bài 1: Bất phương trình bậc nhất hai ẩn", "Bài 2: Hệ bất phương trình bậc nhất hai ẩn"] },
                    { name: "Chuyên đề 3: Hàm số và đồ thị", lessons: ["Bài 1: Hàm số", "Bài 2: Hàm số bậc hai. Đồ thị hàm số bậc hai và ứng dụng"] }
                ]
            }
        },
        'Lớp 11': {
            'kntt': {
                displayName: "SGK Toán 11 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Hàm số lượng giác và phương trình lượng giác", lessons: ["Bài 1: Góc lượng giác. Giá trị lượng giác của góc lượng giác", "Bài 2: Công thức lượng giác", "Bài 3: Hàm số lượng giác", "Bài 4: Phương trình lượng giác cơ bản"] },
                    { name: "Chương 2: Dãy số. Cấp số cộng và cấp số nhân", lessons: ["Bài 5: Dãy số", "Bài 6: Cấp số cộng", "Bài 7: Cấp số nhân"] },
                    { name: "Chương 3: Giới hạn. Hàm số liên tục", lessons: ["Bài 8: Giới hạn của dãy số", "Bài 9: Giới hạn của hàm số", "Bài 10: Hàm số liên tục"] },
                    { name: "Chương 4: Đường thẳng và mặt phẳng trong không gian. Quan hệ song song", lessons: ["Bài 11: Các khái niệm mở đầu", "Bài 12: Hai đường thẳng song song. Đường thẳng song song với mặt phẳng"] },
                ]
            }
        },
        'Lớp 12': {
            'kntt': {
                displayName: "SGK Toán 12 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị của hàm số", lessons: ["Bài 1: Sự đồng biến, nghịch biến của hàm số", "Bài 2: Cực trị của hàm số", "Bài 3: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số", "Bài 4: Đường tiệm cận của đồ thị hàm số"] },
                    { name: "Chương 2: Hàm số lũy thừa, hàm số mũ và hàm số lôgarit", lessons: ["Bài 5: Hàm số mũ và hàm số lôgarit", "Bài 6: Phương trình mũ và phương trình lôgarit"] },
                    { name: "Chương 3: Nguyên hàm - Tích phân và ứng dụng", lessons: ["Bài 7: Nguyên hàm", "Bài 8: Tích phân"] },
                ]
            }
        }
    },
    'vatly': {
        grades: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 6': {
            'kntt': {
                displayName: "SGK Khoa học tự nhiên 6 (Phần Vật lý) - Kết Nối Tri Thức", 
                chapters: [
                    { name: "Chủ đề 1: Các phép đo (Vật lý)", lessons: ["Bài 1: Đo chiều dài", "Bài 2: Đo khối lượng", "Bài 3: Đo thời gian"] },
                    { name: "Chủ đề 2: Lực và tác dụng của lực (Vật lý)", lessons: ["Bài 4: Lực. Ma sát", "Bài 5: Biến dạng của lò xo"] },
                ]
            },
            'cd': {
                displayName: "SGK Khoa học tự nhiên 6 (Phần Vật lý) - Cánh Diều",
                chapters: [
                     { name: "Phần Mở đầu: Giới thiệu về Khoa học tự nhiên", lessons: ["Bài 1: Giới thiệu về Khoa học tự nhiên"] },
                     { name: "Chủ đề Lực và Năng lượng (Vật lý)", lessons: ["Bài 10: Lực và biểu diễn lực", "Bài 11: Các loại lực thường gặp"] },
                ]
            }
        },
        'Lớp 10': {
            'kntt': {
                displayName: "SGK Vật Lý 10 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Mở đầu: Đối tượng, mục tiêu và phương pháp nghiên cứu Vật lí", lessons: ["Bài 1: Giới thiệu về Vật lí", "Bài 2: An toàn trong phòng thí nghiệm"] },
                    { name: "Chương 1: Động học", lessons: ["Bài 3: Chuyển động thẳng", "Bài 4: Độ dịch chuyển và quãng đường đi được", "Bài 5: Tốc độ và vận tốc", "Bài 6: Chuyển động thẳng biến đổi đều. Gia tốc"] },
                    { name: "Chương 2: Động lực học", lessons: ["Bài 7: Định luật 1 Newton", "Bài 8: Định luật 2 Newton", "Bài 9: Định luật 3 Newton", "Bài 10: Một số lực thường gặp"] },
                    { name: "Chương 3: Năng lượng, công, công suất", lessons: ["Bài 11: Công và công suất", "Bài 12: Động năng và thế năng. Định luật bảo toàn cơ năng"] }
                ]
            },
            'ctst': {
                displayName: "SGK Vật Lý 10 - Chân Trời Sáng Tạo",
                chapters: [
                    { name: "Mở đầu", lessons: ["Bài 1: Khái quát về môn Vật lí"] },
                    { name: "Chủ đề 1: Động học", lessons: ["Bài 1: Mô tả chuyển động", "Bài 2: Chuyển động thẳng đều", "Bài 3: Chuyển động thẳng biến đổi đều"] },
                    { name: "Chủ đề 2: Động lực học", lessons: ["Bài 1: Lực và gia tốc. Định luật 2 Newton", "Bài 2: Định luật 1 Newton. Định luật 3 Newton"] },
                ]
            },
            'cd': {
                displayName: "SGK Vật Lý 10 - Cánh Diều",
                chapters: [
                    { name: "Mở đầu", lessons: ["Bài 1: Giới thiệu mục đích học tập môn Vật lí"] },
                    { name: "Chủ đề 1: Động học", lessons: ["Bài 1: Mô tả chuyển động", "Bài 2: Đồ thị độ dịch chuyển – thời gian. Vận tốc", "Bài 3: Gia tốc và đồ thị vận tốc – thời gian"] },
                    { name: "Chủ đề 2: Động lực học", lessons: ["Bài 1: Lực và gia tốc", "Bài 2: Các định luật Newton về chuyển động"] },
                ]
            }
        },
        'Lớp 11': {
            'kntt': {
                displayName: "SGK Vật Lý 11 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Dao động", lessons: ["Bài 1: Dao động điều hoà", "Bài 2: Mô tả dao động điều hoà"] },
                    { name: "Chương 2: Sóng", lessons: ["Bài 3: Sóng và sự truyền sóng", "Bài 4: Giao thoa sóng"] },
                    { name: "Chương 3: Điện trường", lessons: ["Bài 5: Điện tích. Định luật Coulomb", "Bài 6: Điện trường"] },
                ]
            }
        },
        'Lớp 12': {
            'kntt': {
                displayName: "SGK Vật Lý 12 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Dao động cơ", lessons: ["Bài 1: Dao động điều hòa", "Bài 2: Con lắc lò xo", "Bài 3: Con lắc đơn"] },
                    { name: "Chương 2: Sóng cơ và sóng âm", lessons: ["Bài 4: Sóng cơ", "Bài 5: Giao thoa sóng", "Bài 6: Sóng dừng", "Bài 7: Sóng âm"] },
                    { name: "Chương 3: Dòng điện xoay chiều", lessons: ["Bài 8: Các mạch điện xoay chiều", "Bài 9: Công suất điện tiêu thụ của mạch điện xoay chiều"] },
                ]
            }
        }
    },
    'lichsu': {
        grades: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 6': { 
            'kntt': {
                displayName: "SGK Lịch Sử và Địa Lí 6 (Phần Lịch Sử) - Kết Nối Tri Thức",
                chapters: [
                    { name: "Chương 1: Tại sao cần học Lịch Sử?", lessons: ["Bài 1: Lịch Sử là gì?", "Bài 2: Thời gian trong Lịch Sử"] },
                    { name: "Chương 2: Thời kì nguyên thủy", lessons: ["Bài 3: Nguồn gốc loài người", "Bài 4: Xã hội nguyên thủy"] },
                    { name: "Chương 3: Xã hội cổ đại", lessons: ["Bài 5: Các quốc gia cổ đại phương Đông", "Bài 6: Các quốc gia cổ đại phương Tây"] },
                    { name: "Chương 4: Đông Nam Á từ những thế kỉ tiếp giáp Công nguyên đến thế kỉ X", lessons: ["Bài 7: Vương quốc Phù Nam", "Bài 8: Vương quốc Chăm-pa"] }
                ]
            },
            'cd': {
                displayName: "SGK Lịch Sử và Địa Lí 6 (Phần Lịch Sử) - Cánh Diều",
                chapters: [
                    { name: "Bài mở đầu: Hành trình khám phá Lịch Sử", lessons: ["Bài 1: Lịch Sử và cuộc sống"] },
                    { name: "Chương 1: Con người và xã hội thời nguyên thủy", lessons: ["Bài 2: Con người xuất hiện", "Bài 3: Đời sống của người nguyên thủy trên đất nước Việt Nam"] },
                    { name: "Chương 2: Xã hội cổ đại", lessons: ["Bài 4: Ai Cập và Lưỡng Hà cổ đại", "Bài 5: Hy Lạp và La Mã cổ đại"] },
                ]
            }
        },
        'Lớp 10': {
            'kntt': {
                displayName: "SGK Lịch Sử 10 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Bài mở đầu: Lịch Sử - Hiện thực và Nhận thức", lessons: ["Bài 1: Hiện thực lịch sử và nhận thức lịch sử"] },
                    { name: "Chương 1: Một số nền văn minh thế giới thời kì cổ - trung đại", lessons: ["Bài 2: Văn minh Ai Cập", "Bài 3: Văn minh Hy Lạp - La Mã", "Bài 4: Văn minh Trung Hoa"] },
                    { name: "Chương 2: Các cuộc cách mạng công nghiệp trong lịch sử thế giới", lessons: ["Bài 5: Cách mạng công nghiệp lần thứ nhất và lần thứ hai"] },
                    { name: "Chương 3: Vai trò của lịch sử và văn hóa đối với sự phát triển du lịch", lessons: ["Bài 6: Lịch sử và văn hóa trong phát triển du lịch"] }
                ]
            },
            'ctst': {
                displayName: "SGK Lịch Sử 10 - Chân Trời Sáng Tạo",
                chapters: [
                    { name: "Bài mở đầu: Lịch Sử là gì?", lessons: ["Bài 1: Lịch Sử - Một khoa học"] },
                    { name: "Chủ đề 1: Cách mạng công nghiệp và tác động", lessons: ["Bài 2: Các cuộc cách mạng công nghiệp", "Bài 3: Vai trò của cách mạng công nghiệp"] },
                    { name: "Chủ đề 2: Các nền văn minh cổ đại", lessons: ["Bài 4: Văn minh Ai Cập", "Bài 5: Văn minh Ấn Độ"] },
                ]
            }
        },
        'Lớp 11': {
            'kntt': {
                displayName: "SGK Lịch Sử 11 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Một số vấn đề chung về cách mạng tư sản", lessons: ["Bài 1: Cách mạng tư sản Anh và cuộc chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ"] },
                    { name: "Chương 2: Chủ nghĩa đế quốc và chiến tranh thế giới thứ nhất", lessons: ["Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản", "Bài 3: Chiến tranh thế giới thứ nhất (1914 - 1918)"] }
                ]
            }
        },
        'Lớp 12': {
            'kntt': {
                displayName: "SGK Lịch Sử 12 - Kết Nối Tri Thức Với Cuộc Sống",
                chapters: [
                    { name: "Chương 1: Sự hình thành trật tự thế giới mới sau Chiến tranh thế giới thứ hai (1945-1949)", lessons: ["Bài 1: Trật tự thế giới mới sau Chiến tranh thế giới thứ hai"] },
                    { name: "Chương 2: Liên Xô và các nước Đông Âu (1945 - 1991). Liên Bang Nga (1991 - 2000)", lessons: ["Bài 2: Liên Xô và các nước Đông Âu từ năm 1945 đến giữa những năm 70"] }
                ]
            }
        }
    },
    'hoahoc': {
        grades: ['Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 8': { /* Cần bổ sung dữ liệu */ },
        'Lớp 10': { /* Cần bổ sung dữ liệu */ }
    },
    'dialy': { 
        grades: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 6': { /* Cần bổ sung dữ liệu */ },
        'Lớp 10': { /* Cần bổ sung dữ liệu */ }
    },
    'tinhoc': {
        grades: ['Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 6': { /* Cần bổ sung dữ liệu */ },
        'Lớp 10': { /* Cần bổ sung dữ liệu */ }
    },
    'gdcd': { 
        grades: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 6': { /* Cần bổ sung dữ liệu */ },
        'Lớp 10': { /* Giáo dục Kinh tế và Pháp luật 10 - Cần bổ sung dữ liệu */ }
    },
    'sinhhoc': { 
        grades: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
        'Lớp 6': { /* Cần bổ sung dữ liệu */ },
        'Lớp 10': { /* Cần bổ sung dữ liệu */ }
    }
};

const tenHienThiMonHoc = { // Trước đây là subjectDisplayNames
    'toan': 'Toán học', 'vatly': 'Vật Lý', 'hoahoc': 'Hóa học', 'lichsu': 'Lịch sử',
    'dialy': 'Địa lý', 'tinhoc': 'Tin Học', 'gdcd': 'GDCD', 'sinhhoc': 'Sinh học'
};

// DOM Elements - Đặt tên biến tiếng Việt cho các phần tử DOM
const dropdownChonLopChiTiet = document.getElementById('grade-selector-detail');
const dropdownChonBoSach = document.getElementById('book-set-selector');
const dropdownChonChuong = document.getElementById('chapter-selector');
const dropdownChonBaiHoc = document.getElementById('lesson-selector');

const cacNutMonHoc = document.querySelectorAll('.subject-btn');
const khuVucLoaiCauHoi = document.querySelector('.question-types');
const khuVucNoiDung = document.querySelector('.content-section');
const cacNutLoaiCauHoi = document.querySelectorAll('.question-type-btn');
const cacNutDoKho = document.querySelectorAll('.difficulty-btn');

const nutTaiAnhLen = document.querySelector('.upload-btn');
const inputTaiAnh = document.querySelector('#image-upload');
const khungXemTruocAnh = document.querySelector('#image-preview');

const nutGuiYeuCau = document.querySelector('.request-btn'); // Đổi tên requestBtn
const khuVucPhanHoi = document.querySelector('.response-section');
const thongBaoLoi = document.querySelector('.error-message');
const vungNhapLieu = document.querySelector('.input-area');
const inputSoLuongCauHoi = document.getElementById('question-count-input');

// Hàm đặt lại các dropdown lựa chọn chương trình học
function datLaiDropdownChuongTrinh(batDauTu = 'grade') {
    if (batDauTu === 'grade') {
        dropdownChonLopChiTiet.innerHTML = '<option value="">-- Chọn Lớp --</option>';
        dropdownChonLopChiTiet.disabled = true;
        lopDaChon = '';
    }
    if (batDauTu === 'grade' || batDauTu === 'bookset') {
        dropdownChonBoSach.innerHTML = '<option value="">-- Chọn Bộ Sách --</option>';
        dropdownChonBoSach.disabled = true;
        maBoSachDaChon = '';
        tenHienThiBoSachDaChon = '';
    }
    if (batDauTu === 'grade' || batDauTu === 'bookset' || batDauTu === 'chapter') {
        dropdownChonChuong.innerHTML = '<option value="">-- Chọn Chương --</option>';
        dropdownChonChuong.disabled = true;
        chiSoChuongDaChon = '';
        tenChuongDaChon = '';
    }
    if (batDauTu === 'grade' || batDauTu === 'bookset' || batDauTu === 'chapter' || batDauTu === 'lesson') {
        dropdownChonBaiHoc.innerHTML = '<option value="">-- Chọn Bài học --</option>';
        dropdownChonBaiHoc.disabled = true;
        tenBaiHocDaChon = '';
    }
}

// Xử lý chọn môn học
cacNutMonHoc.forEach(nut => {
    nut.addEventListener('click', () => {
        cacNutMonHoc.forEach(n => n.classList.remove('active'));
        nut.classList.add('active');
        maMonHocDaChon = nut.id;
        
        khuVucLoaiCauHoi.classList.remove('hidden');
        khuVucNoiDung.classList.add('hidden'); 
        datLaiDropdownChuongTrinh('grade'); 

        if (duLieuSGK[maMonHocDaChon] && duLieuSGK[maMonHocDaChon].grades) {
            dropdownChonLopChiTiet.innerHTML = '<option value="">-- Chọn Lớp --</option>'; 
            duLieuSGK[maMonHocDaChon].grades.forEach(lop => {
                const luaChon = document.createElement('option');
                luaChon.value = lop;
                luaChon.textContent = lop;
                dropdownChonLopChiTiet.appendChild(luaChon);
            });
            dropdownChonLopChiTiet.disabled = false;
        } else {
             dropdownChonLopChiTiet.innerHTML = '<option value="">-- Không có dữ liệu lớp cho môn này --</option>';
             dropdownChonLopChiTiet.disabled = true;
        }
        cacNutLoaiCauHoi.forEach(nLC => nLC.classList.remove('active'));
        loaiCauHoiDaChon = '';
    });
});

// Xử lý chọn loại câu hỏi
cacNutLoaiCauHoi.forEach(nut => {
    nut.addEventListener('click', () => {
        cacNutLoaiCauHoi.forEach(n => n.classList.remove('active'));
        nut.classList.add('active');
        loaiCauHoiDaChon = nut.id;
        khuVucNoiDung.classList.remove('hidden');
        khuVucPhanHoi.innerHTML = '<p>Câu hỏi được tạo sẽ hiển thị ở đây</p>';
        thongBaoLoi.style.display = 'none';
    });
});

// Xử lý chọn Lớp
dropdownChonLopChiTiet.addEventListener('change', (suKien) => {
    lopDaChon = suKien.target.value;
    datLaiDropdownChuongTrinh('bookset');
    if (lopDaChon && duLieuSGK[maMonHocDaChon] && duLieuSGK[maMonHocDaChon][lopDaChon]) {
        const cacBoSach = duLieuSGK[maMonHocDaChon][lopDaChon];
        dropdownChonBoSach.innerHTML = '<option value="">-- Chọn Bộ Sách --</option>';
        let soLuongBoSach = 0;
        for (const maBoSach in cacBoSach) {
             // Kiểm tra xem key có phải là của một bộ sách không (tránh 'displayName', 'chapters', 'lessons' nếu có ở cấp này)
            if (cacBoSach[maBoSach] && typeof cacBoSach[maBoSach] === 'object' && cacBoSach[maBoSach].displayName) {
                const luaChon = document.createElement('option');
                luaChon.value = maBoSach;
                luaChon.textContent = cacBoSach[maBoSach].displayName;
                dropdownChonBoSach.appendChild(luaChon);
                soLuongBoSach++;
            }
        }
        dropdownChonBoSach.disabled = soLuongBoSach === 0;
    }
});

// Xử lý chọn Bộ Sách
dropdownChonBoSach.addEventListener('change', (suKien) => {
    maBoSachDaChon = suKien.target.value;
    tenHienThiBoSachDaChon = suKien.target.options[suKien.target.selectedIndex].text;
    datLaiDropdownChuongTrinh('chapter');
    if (maBoSachDaChon && duLieuSGK[maMonHocDaChon] && duLieuSGK[maMonHocDaChon][lopDaChon] && duLieuSGK[maMonHocDaChon][lopDaChon][maBoSachDaChon]) {
        const duLieuSach = duLieuSGK[maMonHocDaChon][lopDaChon][maBoSachDaChon];
        if (duLieuSach && duLieuSach.chapters) {
            dropdownChonChuong.innerHTML = '<option value="">-- Chọn Chương --</option>';
            duLieuSach.chapters.forEach((chuong, chiSo) => {
                const luaChon = document.createElement('option');
                luaChon.value = chiSo; 
                luaChon.textContent = chuong.name;
                dropdownChonChuong.appendChild(luaChon);
            });
            dropdownChonChuong.disabled = false;
        } else {
            dropdownChonChuong.disabled = true;
        }
    }
});

// Xử lý chọn Chương
dropdownChonChuong.addEventListener('change', (suKien) => {
    chiSoChuongDaChon = suKien.target.value; 
    datLaiDropdownChuongTrinh('lesson');
    if (chiSoChuongDaChon !== "" && duLieuSGK[maMonHocDaChon] && 
        duLieuSGK[maMonHocDaChon][lopDaChon] && 
        duLieuSGK[maMonHocDaChon][lopDaChon][maBoSachDaChon] &&
        duLieuSGK[maMonHocDaChon][lopDaChon][maBoSachDaChon].chapters[chiSoChuongDaChon]) {

        tenChuongDaChon = duLieuSGK[maMonHocDaChon][lopDaChon][maBoSachDaChon].chapters[chiSoChuongDaChon].name;
        const cacBaiHoc = duLieuSGK[maMonHocDaChon][lopDaChon][maBoSachDaChon].chapters[chiSoChuongDaChon].lessons;
        
        if (cacBaiHoc && cacBaiHoc.length > 0) {
            dropdownChonBaiHoc.innerHTML = '<option value="">-- Chọn Bài học --</option>';
            cacBaiHoc.forEach(baiHoc => {
                const luaChon = document.createElement('option');
                luaChon.value = baiHoc;
                luaChon.textContent = baiHoc;
                dropdownChonBaiHoc.appendChild(luaChon);
            });
            dropdownChonBaiHoc.disabled = false;
        } else {
            dropdownChonBaiHoc.disabled = true;
        }
    }
});

// Xử lý chọn Bài học
dropdownChonBaiHoc.addEventListener('change', (suKien) => {
    tenBaiHocDaChon = suKien.target.value;
});

// Xử lý chọn độ khó
cacNutDoKho.forEach(nut => {
    nut.addEventListener('click', () => {
        cacNutDoKho.forEach(n => n.classList.remove('active'));
        nut.classList.add('active');
        doKhoDaChon = nut.id;
    });
});

// Xử lý tải ảnh lên
nutTaiAnhLen.addEventListener('click', () => inputTaiAnh.click());

inputTaiAnh.addEventListener('change', async (suKien) => {
    const tep = suKien.target.files[0];
    if (tep) {
        const trinhDoc = new FileReader();
        trinhDoc.onload = async (e) => {
            khungXemTruocAnh.src = e.target.result;
            khungXemTruocAnh.style.display = 'block';
            
            const divXemTruocToanCu = document.querySelector('.math-preview');
            if (divXemTruocToanCu) divXemTruocToanCu.remove();

            const congThucToan = await xuLyAnhTimCongThucToan(tep);
            if (congThucToan) {
                vungNhapLieu.value += `\n\nCông thức từ ảnh: ${congThucToan}`;
                
                const divXemTruocToanMoi = document.createElement('div');
                divXemTruocToanMoi.className = 'math-preview';
                divXemTruocToanMoi.innerHTML = `Xem trước công thức từ ảnh: ${congThucToan}`;
                khungXemTruocAnh.parentNode.insertBefore(divXemTruocToanMoi, khungXemTruocAnh.nextSibling);
                
                if (window.MathJax) {
                     MathJax.typesetPromise([divXemTruocToanMoi]).catch(loi => console.error("Lỗi MathJax typesetting:", loi));
                }
            }
        };
        trinhDoc.readAsDataURL(tep);
    }
});

// Hàm xử lý ảnh để tìm công thức toán
async function xuLyAnhTimCongThucToan(tepAnh) {
    try {
        khuVucPhanHoi.innerHTML = '<div class="loading"><div class="spinner"></div><p style="margin-left:10px; color: #555;">Đang xử lý ảnh để tìm công thức...</p></div>';
        const { data: { text: vanBanOCR } } = await Tesseract.recognize(tepAnh, 'eng+vie', { logger: m => {} }); 
        
        khuVucPhanHoi.innerHTML = '<p>Câu hỏi được tạo sẽ hiển thị ở đây</p>'; 

        if (!vanBanOCR || vanBanOCR.trim().length < 3) { 
            return null;
        }

        const goiYChoGemini = `Đây là nội dung nhận dạng từ ảnh: "${vanBanOCR}". 
        Chỉ trích xuất và trả về công thức toán học dưới dạng LaTeX nếu có. 
        Ví dụ, nếu thấy "x bình phương cộng y bình phương bằng z bình phương", trả về "\\\\(x^2 + y^2 = z^2\\\\)".
        Nếu không phát hiện công thức toán học rõ ràng, chỉ trả lời "Không có công thức toán".`;
        
        const phanHoiGemini = await goiAPIGemini(goiYChoGemini);
        return phanHoiGemini.toLowerCase().includes('không có công thức toán') ? null : phanHoiGemini;
    } catch (loi) {
        console.error('Lỗi xử lý ảnh:', loi);
        thongBaoLoi.textContent = 'Lỗi khi xử lý ảnh: ' + loi.message;
        thongBaoLoi.style.display = 'block';
        khuVucPhanHoi.innerHTML = '<p>Câu hỏi được tạo sẽ hiển thị ở đây</p>';
        return null;
    }
}

// Xử lý nút gửi yêu cầu tạo câu hỏi
nutGuiYeuCau.addEventListener('click', async () => {
    const yeuCauTuyChinhNguoiDung = vungNhapLieu.value.trim();
    
    if (!maMonHocDaChon || !loaiCauHoiDaChon) {
        thongBaoLoi.textContent = 'Vui lòng chọn Môn học và Loại câu hỏi.';
        thongBaoLoi.style.display = 'block';
        return;
    }
    
    let noiDungChinhChoAPI = yeuCauTuyChinhNguoiDung;
    if (tenBaiHocDaChon) { 
        noiDungChinhChoAPI = `Nội dung từ Sách giáo khoa ${tenHienThiBoSachDaChon}, Lớp ${lopDaChon}, Chương "${tenChuongDaChon}", Bài "${tenBaiHocDaChon}".`;
        if (yeuCauTuyChinhNguoiDung) {
            noiDungChinhChoAPI += `\nYêu cầu bổ sung của người dùng: "${yeuCauTuyChinhNguoiDung}"`;
        }
    } else if (tenChuongDaChon) { 
         noiDungChinhChoAPI = `Nội dung từ Sách giáo khoa ${tenHienThiBoSachDaChon}, Lớp ${lopDaChon}, Chương "${tenChuongDaChon}".`;
         if (yeuCauTuyChinhNguoiDung) {
            noiDungChinhChoAPI += `\nYêu cầu bổ sung của người dùng: "${yeuCauTuyChinhNguoiDung}"`;
        }
    } else if (yeuCauTuyChinhNguoiDung) {
         noiDungChinhChoAPI = `Nội dung yêu cầu từ người dùng: "${yeuCauTuyChinhNguoiDung}"`;
    } else {
         thongBaoLoi.textContent = 'Vui lòng chọn Sách/Chương/Bài hoặc nhập yêu cầu cụ thể.';
         thongBaoLoi.style.display = 'block';
         khuVucPhanHoi.innerHTML = '<p>Câu hỏi được tạo sẽ hiển thị ở đây</p>';
         return;
    }

    khuVucPhanHoi.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    thongBaoLoi.style.display = 'none';
    
    try {
        const cauHoiDuocTaoRa = await hamTaoCauHoi( // Đổi tên hàm createQuestions
            noiDungChinhChoAPI, 
            loaiCauHoiDaChon, 
            tenHienThiMonHoc[maMonHocDaChon], 
            lopDaChon, 
            doKhoDaChon,
            tenHienThiBoSachDaChon,
            tenChuongDaChon,
            tenBaiHocDaChon
        );
        khuVucPhanHoi.innerHTML = cauHoiDuocTaoRa;
        
        if (khungXemTruocAnh.src && khungXemTruocAnh.style.display !== 'none') {
            const theAnh = document.createElement('img');
            theAnh.src = khungXemTruocAnh.src;
            theAnh.style.maxWidth = '300px'; 
            theAnh.style.marginTop = '15px';
            theAnh.style.display = 'block';
            theAnh.style.marginLeft = 'auto';
            theAnh.style.marginRight = 'auto';
            khuVucPhanHoi.appendChild(theAnh);
        }
        
        localStorage.setItem('cauHoiDaLuu', khuVucPhanHoi.innerHTML); // Đổi tên localStorage key
        
        if (window.MathJax) {
            MathJax.typesetPromise([khuVucPhanHoi]).catch(loi => console.error("Lỗi MathJax typesetting:", loi));
        }

    } catch (loi) {
        console.error('Lỗi xử lý yêu cầu:', loi);
        thongBaoLoi.textContent = loi.message || 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn.';
        thongBaoLoi.style.display = 'block';
        khuVucPhanHoi.innerHTML = '<p>Câu hỏi được tạo sẽ hiển thị ở đây</p>';
    }
});

// Hàm gọi API Gemini
// Hàm gọi API Gemini (phiên bản mới, gọi qua Backend)
async function goiAPIGemini(noiDungGoiY) {
    // URL bây giờ trỏ đến API trên chính máy chủ của chúng ta
    const phanHoi = await fetch('/api/tao-cau-hoi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: noiDungGoiY // Gửi prompt lên cho Backend
        })
    });

    const duLieu = await phanHoi.json();
        if (!phanHoi.ok) {
            console.error("Lỗi từ Backend:", duLieu);
            throw new Error(duLieu.error ? duLieu.error.message : `Lỗi từ máy chủ (HTTP ${phanHoi.status})`);
        }

        if (!duLieu.candidates || !duLieu.candidates[0].content || !duLieu.candidates[0].content.parts || !duLieu.candidates[0].content.parts[0].text) {
            console.error("Phản hồi API Gemini không như mong đợi:", duLieu);
            throw new Error("Phản hồi không mong đợi từ API Gemini.");
        }
        return duLieu.candidates[0].content.parts[0].text;
    }
// Hàm tạo câu hỏi
async function hamTaoCauHoi(noiDungVanBan, loaiCauHoi, tenMonHoc, lop, doKho, tenBoSach, tenChuong, tenBai) {
    const anhXaLop = { 
        'Lớp 6': 'Lớp 6', 'Lớp 7': 'Lớp 7', 'Lớp 8': 'Lớp 8', 'Lớp 9': 'Lớp 9',
        'Lớp 10': 'Lớp 10', 'Lớp 11': 'Lớp 11', 'Lớp 12': 'Lớp 12'
    };
    const anhXaDoKho = { 'de': 'dễ', 'trungbinh': 'trung bình', 'kho': 'khó' };
    
    let soLuongCauHoiValue = parseInt(inputSoLuongCauHoi.value) || 5;
    if (soLuongCauHoiValue < 1 || soLuongCauHoiValue > 50) soLuongCauHoiValue = 5;

    let nguCanhChuongTrinh = `Bạn là một trợ lý AI chuyên tạo câu hỏi cho giáo viên Việt Nam.`;
    nguCanhChuongTrinh += `\nHãy tạo câu hỏi cho môn ${tenMonHoc}`;
    if (lop && anhXaLop[lop]) nguCanhChuongTrinh += `, ${anhXaLop[lop]}`;
    nguCanhChuongTrinh += ` theo chương trình giáo dục phổ thông hiện hành của Việt Nam.`;

    if (tenBoSach && tenChuong && tenBai) {
        nguCanhChuongTrinh += `\nNội dung câu hỏi cần bám sát Sách giáo khoa "${tenBoSach}", Chương "${tenChuong}", Bài "${tenBai}".`;
    } else if (tenBoSach && tenChuong) {
         nguCanhChuongTrinh += `\nNội dung câu hỏi cần bám sát Sách giáo khoa "${tenBoSach}", Chương "${tenChuong}".`;
    }

    let goiYHeThong = "";
    if (loaiCauHoi === 'tracnghiem') {
        goiYHeThong = `${nguCanhChuongTrinh}
        Hãy tạo ${soLuongCauHoiValue} câu hỏi trắc nghiệm ở mức độ ${anhXaDoKho[doKho]}. 
        Mỗi câu hỏi phải có 4 lựa chọn (A, B, C, D) và chỉ có MỘT đáp án đúng. Đánh dấu đáp án đúng bằng dấu (*) ở cuối lựa chọn đó (ví dụ: B. Lựa chọn B (*)).
        Sử dụng định dạng LaTeX cho bất kỳ công thức toán học, ký hiệu hóa học hoặc vật lý nào nếu cần (ví dụ: \\\\(x^2 + y = z\\\\) hoặc \\\\(H_2SO_4\\\\)).
        Sau mỗi câu hỏi, cung cấp một lời giải thích ngắn gọn và rõ ràng cho đáp án đúng.

        Định dạng mong muốn (TUÂN THỦ NGHIÊM NGẶT):
        Câu 1: [Nội dung câu hỏi]
        A. [Lựa chọn A]
        B. [Lựa chọn B]
        C. [Lựa chọn C] (*)
        D. [Lựa chọn D]
        Giải thích: [Lời giải thích cho đáp án C]

        Câu 2: ... (tương tự)

        -----
        Nội dung được cung cấp để tạo câu hỏi (nếu người dùng nhập "Nội dung từ Sách giáo khoa..." thì đây là ngữ cảnh chính, nếu là yêu cầu khác thì dựa vào đó):
        ${noiDungVanBan}`;
    } else { // tuluan
        goiYHeThong = `${nguCanhChuongTrinh}
        Hãy tạo ${soLuongCauHoiValue} câu hỏi tự luận ở mức độ ${anhXaDoKho[doKho]}.
        Mỗi câu hỏi cần rõ ràng, phù hợp với cấp độ và ngữ cảnh đã cho.
        Sử dụng định dạng LaTeX cho bất kỳ công thức toán học, ký hiệu hóa học hoặc vật lý nào nếu cần.
        Sau mỗi câu hỏi, cung cấp hướng dẫn trả lời hoặc đáp án chi tiết.

        Định dạng mong muốn (TUÂN THỦ NGHIÊM NGẶT):
        Câu 1: [Nội dung câu hỏi]
        Hướng dẫn trả lời: [Chi tiết hướng dẫn hoặc đáp án]

        Câu 2: ... (tương tự)

        -----
        Nội dung được cung cấp để tạo câu hỏi (nếu người dùng nhập "Nội dung từ Sách giáo khoa..." thì đây là ngữ cảnh chính, nếu là yêu cầu khác thì dựa vào đó):
        ${noiDungVanBan}`;
    }
    
    try {
        let phanHoiTuAPI = await goiAPIGemini(goiYHeThong);
        
        let htmlDaDinhDang = phanHoiTuAPI
            .replace(/Câu (\d+):/g, (match, number) => {
                return `<div style="margin-top: 20px; margin-bottom: 5px; display: flex; align-items: center;">
                            <strong>${match}</strong>
                            <button class="copy-btn" onclick="saoChepNoiDungCauHoi(this)">Sao chép câu hỏi</button>
                        </div><div class="question-content-wrapper">`;
            })
            .replace(/Giải thích:/g, '</div><strong style="margin-top:5px; display:block;">Giải thích:</strong>')
            .replace(/Hướng dẫn trả lời:/g, '</div><strong style="margin-top:5px; display:block;">Hướng dẫn trả lời:</strong>')
            .replace(/\n/g, '<br>')
            .replace(/\(\*\)/g, '<span style="color: #4caf50; font-weight: bold;"> (*)</span>');
        
        // Đóng các div .question-content-wrapper còn mở
        let htmlTamThoi = "";
        let dangTrongNoiDungCauHoi = false;
        htmlDaDinhDang.split(/(<div class="question-content-wrapper">|<\/div><strong style="margin-top:5px; display:block;">Giải thích:<\/strong>|<\/div><strong style="margin-top:5px; display:block;">Hướng dẫn trả lời:<\/strong>)/).forEach(phan => {
            if (phan === '<div class="question-content-wrapper">') {
                if (dangTrongNoiDungCauHoi) htmlTamThoi += "</div>"; 
                htmlTamThoi += phan;
                dangTrongNoiDungCauHoi = true;
            } else if (phan && (phan.includes('Giải thích:') || phan.includes('Hướng dẫn trả lời:'))) {
                 if (dangTrongNoiDungCauHoi) { // Đóng thẻ div trước khi thêm strong
                    htmlTamThoi += "</div>";
                    dangTrongNoiDungCauHoi = false; 
                }
                htmlTamThoi += phan; // Thêm strong và nội dung của nó
            }
             else {
                htmlTamThoi += phan || "";
            }
        });
        if (dangTrongNoiDungCauHoi) htmlTamThoi += "</div>"; 
        htmlDaDinhDang = htmlTamThoi;


        let tieuDePhanCauHoi = `<h3>Câu hỏi ${loaiCauHoi === 'tracnghiem' ? 'trắc nghiệm' : 'tự luận'} môn ${tenMonHoc}</h3>`;
        if (lop && anhXaLop[lop]) tieuDePhanCauHoi += `<p>Lớp: ${anhXaLop[lop]}`;
        if (tenBoSach && tenChuong && tenBai) {
            tieuDePhanCauHoi += ` | SGK: ${tenBoSach}, Chương: ${tenChuong}, Bài: ${tenBai}`;
        } else if (tenBoSach && tenChuong) {
             tieuDePhanCauHoi += ` | SGK: ${tenBoSach}, Chương: ${tenChuong}`;
        }
        if (lop && anhXaLop[lop]) tieuDePhanCauHoi += ` | Độ khó: ${anhXaDoKho[doKho]}</p>`;
        else tieuDePhanCauHoi += `<p>Độ khó: ${anhXaDoKho[doKho]}</p>`;
        
        return `${tieuDePhanCauHoi}<div class="questions">${htmlDaDinhDang}</div>`;

    } catch (loi) {
        console.error("Lỗi khi tạo câu hỏi:", loi)
        throw new Error('Lỗi khi tạo câu hỏi từ AI: ' + loi.message);
    }
}

// Hàm sao chép nội dung câu hỏi
function saoChepNoiDungCauHoi(nutBam) {
    const vungBaoCauHoi = nutBam.closest('div').nextElementSibling; 
    if (vungBaoCauHoi && vungBaoCauHoi.classList.contains('question-content-wrapper')) {
        let noiDungCanSaoChep = "";
        
        vungBaoCauHoi.childNodes.forEach(nutCon => {
            if (nutCon.nodeType === Node.TEXT_NODE) {
                noiDungCanSaoChep += nutCon.textContent;
            } else if (nutCon.nodeType === Node.ELEMENT_NODE) {
                if (nutCon.tagName === 'BR') {
                   noiDungCanSaoChep += "\n";
                } else if (nutCon.classList.contains('mjx-math')) { 
                    const chuThichTex = nutCon.querySelector('mjx-assistive-mml annotation[encoding="application/x-tex"]');
                    if (chuThichTex) {
                        noiDungCanSaoChep += ` ${chuThichTex.textContent.trim()} `;
                    } else {
                        noiDungCanSaoChep += nutCon.textContent;
                    }
                } else if (nutCon.tagName === 'SPAN' && nutCon.style.color === 'rgb(76, 175, 80)') { // Đáp án đúng (*)
                    noiDungCanSaoChep += "(*)";
                }
                 else {
                    noiDungCanSaoChep += nutCon.textContent;
                }
                 if(nutCon.tagName !== 'SPAN' && nutCon.nextSibling && nutCon.nextSibling.nodeType === Node.TEXT_NODE && nutCon.nextSibling.textContent.trim() === "") {
                    // Bỏ qua các BR không cần thiết do textContent đã bao gồm
                } else if (nutCon.tagName !== 'SPAN') {
                     noiDungCanSaoChep += "\n";
                }
            }
        });
        noiDungCanSaoChep = noiDungCanSaoChep.replace(/\n\n+/g, "\n").trim(); 

        navigator.clipboard.writeText(noiDungCanSaoChep)
            .then(() => {
                const vanBanGocCuaNut = nutBam.textContent;
                nutBam.textContent = 'Đã chép!';
                setTimeout(() => { nutBam.textContent = vanBanGocCuaNut; }, 2000);
            })
            .catch(loi => {
                console.error('Không thể sao chép bằng Clipboard API:', loi);
                try { // Fallback
                     const vungChonTam = document.createRange();
                     vungChonTam.selectNodeContents(vungBaoCauHoi);
                     window.getSelection().removeAllRanges();
                     window.getSelection().addRange(vungChonTam);
                     document.execCommand('copy');
                     const vanBanGocCuaNut = nutBam.textContent;
                     nutBam.textContent = 'Đã chép (cũ)!';
                     setTimeout(() => { nutBam.textContent = vanBanGocCuaNut; }, 2000);
                } catch (e) {
                    nutBam.textContent = 'Lỗi!';
                    setTimeout(() => { nutBam.textContent = "Sao chép câu hỏi"; }, 2000);
                }
                window.getSelection().removeAllRanges();
            });

    } else {
        console.error("Không tìm thấy nội dung câu hỏi (.question-content-wrapper) để sao chép.");
    }
}

// Khôi phục câu hỏi đã lưu khi tải lại trang
window.addEventListener('load', () => {
    const cauHoiDaLuuTru = localStorage.getItem('cauHoiDaLuu'); // Đổi tên localStorage key
    if (cauHoiDaLuuTru) {
        khuVucPhanHoi.innerHTML = cauHoiDaLuuTru;
         if (window.MathJax) {
            MathJax.typesetPromise([khuVucPhanHoi]).catch(loi => console.error("Lỗi MathJax typesetting khi tải trang:", loi));
        }
    }
    datLaiDropdownChuongTrinh('grade');
    dropdownChonLopChiTiet.disabled = true; 
});