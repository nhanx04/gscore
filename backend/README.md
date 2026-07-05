# Vietnamese High School Exam Score Checking Backend

This repository contains a clean Django backend foundation for a Vietnamese high school exam score checking application.

## Tech Stack

- Python 3.11+
- Django
- Django REST Framework
- PostgreSQL
- Django ORM
- django-cors-headers
- python-dotenv

## Project Structure

- `config/`: Django project configuration
- `scores/`: Main application for future score-checking features

## Setup

### 1. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate
```

Windows PowerShell:

```powershell
python -m venv venv
venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

If you are using the provided Neon PostgreSQL database, set the following values in `.env`:

- `DATABASE_NAME=neondb`
- `DATABASE_USER=neondb_owner`
- `DATABASE_PASSWORD=your_password_here`
- `DATABASE_HOST=ep-lingering-forest-atcj0o1u-pooler.c-9.us-east-1.aws.neon.tech`
- `DATABASE_PORT=5432`
- `DATABASE_SSLMODE=require`

Required variables:

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- `DATABASE_NAME`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `CORS_ALLOWED_ORIGINS`

### 4. Run migrations

```bash
python manage.py migrate
```

### 5. Run the development server

```bash
python manage.py runserver
```

## Health Check

Once the server is running, open:

- `http://localhost:8000/api/health/`

Expected response:

```json
{
  "status": "ok"
}
```
