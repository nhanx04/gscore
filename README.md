# G-Scores

## Mô tả

Dự án này gồm hai phần:

- `backend/`: Django REST API để lưu trữ và truy vấn điểm thi.
- `frontend/`: Ứng dụng React/Vite để hiển thị giao diện quản lý và tra cứu.

---

## Yêu cầu trước

- Python 3.11+ (hoặc Python 3.10+)
- PostgreSQL
- Node.js 18+ và npm

---

## Chạy backend local

1. Tạo môi trường ảo và cài dependencies:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2. Sao chép file cấu hình môi trường:

```bash
copy .env.example .env
```

3. Chỉnh sửa `backend/.env` nếu cần:

- `SECRET_KEY`: thay bằng chuỗi an toàn.
- `DEBUG`: `True` khi chạy local.
- `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_SSLMODE` phù hợp với PostgreSQL local.

Nếu bạn chạy PostgreSQL local mà không cần SSL, đặt `DATABASE_SSLMODE=disable`.

4. Khởi tạo database và áp migration:

```bash
cd backend
.venv\Scripts\activate
python manage.py migrate
```

5. Chạy server Django:

```bash
python manage.py runserver 8000
```

Backend sẽ sẵn sàng tại: `http://localhost:8000/`

---

## Nhập dữ liệu từ CSV vào database

File command nằm ở `backend/scores/management/commands/import_scores.py`.

Cú pháp:

```bash
cd backend
.venv\Scripts\activate
python manage.py import_scores <đường_dẫn_đến_csv>
```

Ví dụ với file mẫu:

```bash
cd backend
.venv\Scripts\activate
python manage.py import_scores data\diem_thi_thpt_2024.csv
```

Command này sẽ:

- đọc file CSV
- chuyển các cột vào model `StudentScore`
- bỏ qua các bản ghi trùng số báo danh
- hiển thị số lượng `Imported` và `Skipped`

---

## Chạy frontend local

1. Cài dependencies:

```bash
cd frontend
npm install
```

2. Sao chép file cấu hình môi trường:

```bash
copy .env.example .env
```

3. Nếu backend không chạy trên `http://localhost:8000/api`, hãy chỉnh `VITE_API_BASE_URL` trong `frontend/.env`.

4. Chạy frontend:

```bash
cd frontend
npm run dev
```

Sau khi khởi động, truy cập ứng dụng tại URL hiển thị trong terminal (mặc định là `http://localhost:5173`).

---
