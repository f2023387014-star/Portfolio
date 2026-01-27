# Quick Reference Guide - Commands & Solutions

## 🚀 Frontend Commands (Next.js)

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code (if prettier is configured)
npm run format
```

### Access Points
- **Development**: http://localhost:3000
- **API**: http://localhost:8000/api (when backend is running)

---

## 🎯 Backend Commands (Django)

### Virtual Environment
```bash
# Create virtual environment
python3 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Deactivate
deactivate
```

### Dependencies
```bash
# Install requirements
pip install -r requirements.txt

# Add new package
pip install package-name

# Update requirements.txt
pip freeze > requirements.txt
```

### Database
```bash
# Create migrations
python manage.py makemigrations

# Create migrations for specific app
python manage.py makemigrations bio

# Apply migrations
python manage.py migrate

# Apply migrations for specific app
python manage.py migrate bio

# Show migration status
python manage.py showmigrations

# Undo migrations
python manage.py migrate bio 0001  # Revert to specific migration
```

### Server
```bash
# Run development server
python manage.py runserver

# Run on specific port
python manage.py runserver 8001

# Run development server accessible from network
python manage.py runserver 0.0.0.0:8000
```

### Admin
```bash
# Create superuser
python manage.py createsuperuser

# Change superuser password
python manage.py changepassword username

# Create sample data
python manage.py shell
```

### Static Files
```bash
# Collect static files
python manage.py collectstatic

# Collect without asking for confirmation
python manage.py collectstatic --noinput

# Find static files
python manage.py findstatic filename
```

### Shell & Testing
```bash
# Open Django shell
python manage.py shell

# Run tests
python manage.py test

# Run specific test app
python manage.py test bio

# Run specific test
python manage.py test bio.tests.BioTestCase
```

---

## 🔧 Database Commands

### PostgreSQL
```bash
# Create database
createdb portfolio_db

# Access database
psql portfolio_db

# List databases
\l

# Connect to database
\c portfolio_db

# List tables
\dt

# Drop database
dropdb portfolio_db

# Backup database
pg_dump portfolio_db > backup.sql

# Restore database
psql portfolio_db < backup.sql
```

### SQLite (for development)
```bash
# Access database shell
python manage.py dbshell

# View database file
ls db.sqlite3

# Delete database and start fresh
rm db.sqlite3
python manage.py migrate
```

---

## 📦 Project Setup

### First Time Setup
```bash
# Frontend
cd portfolio-app
npm install
npm run dev

# Backend (in new terminal)
cd portfolio-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

## 🐛 Troubleshooting Commands

### Port Already in Use

**Port 3000 (Frontend)**
```bash
# macOS/Linux - Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Windows - Find process
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F

# Use different port
npm run dev -- -p 3001
```

**Port 8000 (Backend)**
```bash
# macOS/Linux
lsof -i :8000
kill -9 <PID>

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Use different port
python manage.py runserver 8001
```

### Database Issues
```bash
# Reset database (WARNING: Deletes all data)
python manage.py flush

# Check database connection
python manage.py dbshell
select 1;  # If you get "1", connection is working
\q

# Recreate all tables
python manage.py migrate --run-syncdb
```

### Migration Issues
```bash
# Show migration plan
python manage.py showmigrations

# Unmigrate all (WARNING: Deletes all data)
python manage.py migrate zero

# Create empty migration
python manage.py makemigrations --empty bio --name migration_name

# Show SQL that will be executed
python manage.py sqlmigrate bio 0001
```

### Package Issues
```bash
# Upgrade pip
pip install --upgrade pip

# Upgrade all packages
pip list --outdated
pip install --upgrade package-name

# Fix dependency issues
pip install --force-reinstall -r requirements.txt

# Check for conflicts
pip check
```

---

## 📝 Common Edits

### Add to Django App
```python
# In models.py
from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name

# In serializers.py
from rest_framework import serializers
from .models import MyModel

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = '__all__'

# In views.py
from rest_framework import viewsets
from .models import MyModel
from .serializers import MyModelSerializer

class MyModelViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

# In admin.py
from django.contrib import admin
from .models import MyModel

@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
```

### Register URL in Django
```python
# In config/urls.py
from rest_framework.routers import DefaultRouter
from myapp.views import MyModelViewSet

router = DefaultRouter()
router.register(r'mymodel', MyModelViewSet, basename='mymodel')

urlpatterns = [
    path('api/', include(router.urls)),
]
```

---

## 🌐 Environment Variables

### Create .env file
```bash
# Frontend (.env.local)
touch .env.local

# Backend (.env)
touch .env
```

### Required Variables

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=My Portfolio
```

**Backend (.env)**
```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

---

## 🚀 Deployment Commands

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy with production flag
vercel --prod

# View logs
vercel logs
```

### Backend (Heroku)
```bash
# Install Heroku CLI
# Download from https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create app-name

# Add remote
heroku git:remote -a app-name

# Set environment variables
heroku config:set SECRET_KEY=your-key
heroku config:set DEBUG=False

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate

# View logs
heroku logs --tail

# Open app
heroku open
```

---

## 📊 Useful Django Shell Commands

```bash
# Enter Django shell
python manage.py shell

# Create object
from bio.models import Bio
bio = Bio.objects.create(
    first_name="John",
    last_name="Doe",
    job_title="Developer",
    contact_email="john@example.com",
    bio_description="My bio"
)

# Query objects
from bio.models import Bio
bio = Bio.objects.first()
bio = Bio.objects.get(id=1)
bio = Bio.objects.filter(first_name="John")

# Update object
bio = Bio.objects.get(id=1)
bio.job_title = "Senior Developer"
bio.save()

# Delete object
bio = Bio.objects.get(id=1)
bio.delete()

# Count objects
Bio.objects.count()

# Exit shell
exit()
```

---

## 🔐 Security Commands

### Generate Secret Key
```bash
# Python
python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
exit()

# Or use this in Django shell
python manage.py shell
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### Change Django Admin Password
```bash
python manage.py changepassword admin
```

### Create Custom User
```bash
python manage.py shell
from django.contrib.auth.models import User
User.objects.create_superuser('admin', 'admin@example.com', 'password')
exit()
```

---

## 📱 API Testing

### Using curl
```bash
# GET request
curl http://localhost:8000/api/bio/

# POST request with data
curl -X POST http://localhost:8000/api/bio/ \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe"}'

# PUT request
curl -X PUT http://localhost:8000/api/bio/1/ \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Jane"}'

# DELETE request
curl -X DELETE http://localhost:8000/api/bio/1/
```

### Using HTTPie (better curl alternative)
```bash
# Install
pip install httpie

# GET
http GET http://localhost:8000/api/bio/

# POST
http POST http://localhost:8000/api/bio/ first_name=John last_name=Doe

# PUT
http PUT http://localhost:8000/api/bio/1/ first_name=Jane

# DELETE
http DELETE http://localhost:8000/api/bio/1/
```

### Using Postman
1. Install Postman
2. Create requests for each endpoint
3. Test with different HTTP methods
4. Save requests in collections

---

## 🎯 Quick Fixes

### Fix CORS Error
```python
# In settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-domain.com",
]
```

### Fix 404 on Static Files
```bash
python manage.py collectstatic --noinput
```

### Fix Module Not Found
```bash
# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

### Reset Everything (Development Only)
```bash
# Delete migrations
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# Delete database
rm db.sqlite3

# Create fresh migrations
python manage.py makemigrations

# Migrate
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

---

## 📚 Documentation Locations

- **Full README**: /README.md
- **Django Setup**: /DJANGO_SETUP_GUIDE.md
- **Deployment**: /DEPLOYMENT_GUIDE.md
- **Setup Summary**: /SETUP_SUMMARY.md
- **Models Copy-Paste**: /DJANGO_MODELS_COMPLETE.py
- **Settings Copy-Paste**: /DJANGO_SETTINGS_COMPLETE.py
- **Auto Setup Script**: /DJANGO_QUICKSTART.sh

---

## ⚡ Pro Tips

1. **Keep .env secure** - Never commit to Git
2. **Use virtual environment** - Always activate before working
3. **Test locally first** - Before deploying
4. **Backup database** - Before making major changes
5. **Monitor logs** - Always check logs for errors
6. **Use git branches** - For new features
7. **Commit frequently** - With clear messages
8. **Update requirements** - After adding packages

---

## 🆘 Getting Help

1. Check relevant documentation file
2. Review error messages carefully
3. Check browser console (frontend)
4. Check Django logs (backend)
5. Google the error message
6. Ask in relevant communities

---

**Bookmark this page for quick reference!** ⭐
