# 雲月閣 · Vân Nguyệt Các

Trình xem model PMX và chuyển động VMD chạy ngay trên trình duyệt (cài được như app).

## Đưa lên GitHub Pages
1. Tạo repo, tải **tất cả** file trong thư mục này lên (cùng một cấp, không bỏ vào thư mục con):
   `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `loading.gif`.
2. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
3. Mở `https://<tên>.github.io/<repo>/`.

## Cài như app
- Android/Chrome: menu ⚙️ → **Cài app** (hoặc menu trình duyệt → Cài đặt ứng dụng).
- iPhone/Safari: nút Chia sẻ → **Thêm vào Màn hình chính**.

## Offline
Lần đầu phải mở khi có mạng để trình duyệt lưu thư viện. Sau đó mở lại không cần mạng.
Rigid body (Ammo.js) chỉ có offline nếu đã bật "Rigid" một lần khi có mạng. Dịch tên mục luôn cần mạng.

## Cập nhật bản mới
Sau khi sửa `index.html`, tăng số trong `V = 'vnc-v3'` ở `sw.js` (thành `vnc-v4`, v.v.) để máy người dùng lấy bản mới.

## Lưu ý
Model chứa nội dung 18+ cần người dùng tự mở từ máy của họ; app có cổng xác nhận 18+.
