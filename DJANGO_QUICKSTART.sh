#!/bin/bash

# Django Portfolio Backend - Quick Setup Script
# Run this script to automatically set up Django backend

echo "=========================================="
echo "Django Portfolio Backend Setup"
echo "=========================================="
echo ""

# Step 1: Create Virtual Environment
echo "[1/8] Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate
echo "✓ Virtual environment created"
echo ""

# Step 2: Install Dependencies
echo "[2/8] Installing dependencies..."
pip install --upgrade pip
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install pillow
pip install python-decouple
pip install psycopg2-binary
pip install gunicorn
pip install whitenoise
pip install dj-database-url
pip freeze > requirements.txt
echo "✓ Dependencies installed"
echo ""

# Step 3: Create Django Project
echo "[3/8] Creating Django project..."
django-admin startproject config .
echo "✓ Django project created"
echo ""

# Step 4: Create Apps
echo "[4/8] Creating Django apps..."
python manage.py startapp bio
python manage.py startapp education
python manage.py startapp skills
python manage.py startapp experience
python manage.py startapp projects
echo "✓ Apps created"
echo ""

# Step 5: Create .env file
echo "[5/8] Creating .env file..."
cat > .env << EOF
SECRET_KEY=$(python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF
echo "✓ .env file created"
echo ""

# Step 6: Run Migrations
echo "[6/8] Running migrations..."
python manage.py migrate
echo "✓ Migrations applied"
echo ""

# Step 7: Create Superuser
echo "[7/8] Creating superuser..."
echo "Follow the prompts to create an admin account:"
python manage.py createsuperuser
echo "✓ Superuser created"
echo ""

# Step 8: Collect Static Files
echo "[8/8] Collecting static files..."
python manage.py collectstatic --noinput
echo "✓ Static files collected"
echo ""

echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Add your models to each app"
echo "2. Run: python manage.py runserver"
echo "3. Access admin panel at: http://localhost:8000/admin"
echo ""
echo "For detailed setup instructions, see DJANGO_SETUP_GUIDE.md"
echo ""
