# Django Portfolio Backend - Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [Database Models](#database-models)
5. [API Endpoints](#api-endpoints)
6. [Deployment](#deployment)

---

## Project Overview

This is a complete Django backend for a dynamic portfolio website. It supports:
- **Bio Section**: Name, job title, profile picture, professional description
- **Education**: Academic qualifications
- **Skills**: Technical and professional skills
- **Experience**: Academic and professional experiences
- **Projects**: Personal projects with images and descriptions

**Architecture**: Django MVT (Model-View-Template) with REST API for frontend integration

---

## Prerequisites

- Python 3.8+ installed
- pip (Python package manager)
- PostgreSQL or SQLite
- Virtual Environment (recommended)

---

## Step-by-Step Setup

### Step 1: Create Project Directory

```bash
mkdir portfolio-backend
cd portfolio-backend
```

### Step 2: Create Virtual Environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` prefix in your terminal.

### Step 3: Install Django and Dependencies

```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install pillow
pip install python-decouple
pip install psycopg2-binary  # For PostgreSQL (optional)
pip install gunicorn
pip install whitenoise
```

Save dependencies:
```bash
pip freeze > requirements.txt
```

### Step 4: Create Django Project

```bash
django-admin startproject config .
```

This creates:
```
portfolio-backend/
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── manage.py
└── requirements.txt
```

### Step 5: Create Django Apps

Create separate apps for each portfolio section:

```bash
python manage.py startapp bio
python manage.py startapp education
python manage.py startapp skills
python manage.py startapp experience
python manage.py startapp projects
```

---

## Database Models

### Step 6: Define Models

#### 1. **Bio App** (`bio/models.py`)

```python
from django.db import models

class Bio(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=200)
    profile_picture = models.ImageField(upload_to='profile/')
    bio_description = models.TextField()
    contact_email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=200, blank=True)
    
    # Social Links
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Bio"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
```

#### 2. **Education App** (`education/models.py`)

```python
from django.db import models

class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    gpa = models.CharField(max_length=10, blank=True)
    field_of_study = models.CharField(max_length=200, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-end_date']

    def __str__(self):
        return f"{self.degree} - {self.institution}"
```

#### 3. **Skills App** (`skills/models.py`)

```python
from django.db import models

class SkillCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    proficiency_level = models.IntegerField(
        choices=[
            (1, 'Beginner'),
            (2, 'Intermediate'),
            (3, 'Advanced'),
            (4, 'Expert'),
        ],
        default=3
    )
    years_of_experience = models.FloatField(default=1)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.name} ({self.category})"
```

#### 4. **Experience App** (`experience/models.py`)

```python
from django.db import models

class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    employment_type = models.CharField(
        max_length=50,
        choices=[
            ('Full-time', 'Full-time'),
            ('Part-time', 'Part-time'),
            ('Freelance', 'Freelance'),
            ('Internship', 'Internship'),
        ]
    )
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    key_highlights = models.TextField(
        help_text="Enter highlights separated by comma",
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-end_date', '-start_date']

    def __str__(self):
        return f"{self.title} at {self.company}"
```

#### 5. **Projects App** (`projects/models.py`)

```python
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    featured_image = models.ImageField(upload_to='projects/')
    
    technologies = models.CharField(
        max_length=500,
        help_text="Enter technologies separated by comma"
    )
    
    project_link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)
    
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date', '-order']

    def __str__(self):
        return self.title
```

---

## Step 7: Update Settings

Update `config/settings.py`:

```python
import os
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='your-secret-key-change-in-production')

DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=lambda v: [s.strip() for s in v.split(',')])

# Installed Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party
    'rest_framework',
    'corsheaders',
    
    # Local apps
    'bio.apps.BioConfig',
    'education.apps.EducationConfig',
    'skills.apps.SkillsConfig',
    'experience.apps.ExperienceConfig',
    'projects.apps.ProjectsConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # or sqlite3
        'NAME': config('DB_NAME', default='portfolio_db'),
        'USER': config('DB_USER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD', default='password'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': ['rest_framework.filters.SearchFilter'],
}

# CORS Settings
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000',
    cast=lambda v: [s.strip() for s in v.split(',')]
)

# Static Files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media Files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```

---

## Step 8: Create Serializers

Create `serializers.py` in each app:

#### Bio Serializer (`bio/serializers.py`)

```python
from rest_framework import serializers
from .models import Bio

class BioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bio
        fields = '__all__'
```

#### Education Serializer (`education/serializers.py`)

```python
from rest_framework import serializers
from .models import Education

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
```

#### Skills Serializer (`skills/serializers.py`)

```python
from rest_framework import serializers
from .models import Skill, SkillCategory

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = SkillCategory
        fields = '__all__'
```

#### Experience Serializer (`experience/serializers.py`)

```python
from rest_framework import serializers
from .models import Experience

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
```

#### Projects Serializer (`projects/serializers.py`)

```python
from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
```

---

## Step 9: Create Views

Create `views.py` with API endpoints:

#### Bio Views (`bio/views.py`)

```python
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Bio
from .serializers import BioSerializer

class BioViewSet(viewsets.ModelViewSet):
    queryset = Bio.objects.all()
    serializer_class = BioSerializer

@api_view(['GET'])
def bio_detail(request):
    bio = Bio.objects.first()
    serializer = BioSerializer(bio)
    return Response(serializer.data)
```

#### Education Views (`education/views.py`)

```python
from rest_framework import viewsets
from .models import Education
from .serializers import EducationSerializer

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
```

#### Skills Views (`skills/views.py`)

```python
from rest_framework import viewsets
from .models import Skill, SkillCategory
from .serializers import SkillSerializer, SkillCategorySerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
```

#### Experience Views (`experience/views.py`)

```python
from rest_framework import viewsets
from .models import Experience
from .serializers import ExperienceSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
```

#### Projects Views (`projects/views.py`)

```python
from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
```

---

## Step 10: Set Up URLs

Update `config/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from bio.views import BioViewSet, bio_detail
from education.views import EducationViewSet
from skills.views import SkillViewSet, SkillCategoryViewSet
from experience.views import ExperienceViewSet
from projects.views import ProjectViewSet

router = DefaultRouter()
router.register(r'education', EducationViewSet, basename='education')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'skill-categories', SkillCategoryViewSet, basename='skillcategory')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/bio/', bio_detail, name='bio-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

---

## Step 11: Register Models in Admin

Update `admin.py` in each app:

#### Bio Admin (`bio/admin.py`)

```python
from django.contrib import admin
from .models import Bio

@admin.register(Bio)
class BioAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'job_title', 'created_at')
    search_fields = ('first_name', 'last_name', 'job_title')
```

#### Education Admin (`education/admin.py`)

```python
from django.contrib import admin
from .models import Education

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'end_date')
    search_fields = ('degree', 'institution')
```

#### Skills Admin (`skills/admin.py`)

```python
from django.contrib import admin
from .models import Skill, SkillCategory

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    ordering = ('order',)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency_level', 'years_of_experience')
    list_filter = ('category', 'proficiency_level')
    search_fields = ('name',)
```

#### Experience Admin (`experience/admin.py`)

```python
from django.contrib import admin
from .models import Experience

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'start_date', 'end_date', 'is_current')
    list_filter = ('is_current', 'employment_type')
    search_fields = ('title', 'company')
    date_hierarchy = 'start_date'
```

#### Projects Admin (`projects/admin.py`)

```python
from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'is_featured', 'order')
    list_filter = ('is_featured', 'start_date')
    search_fields = ('title', 'description')
    ordering = ('-start_date', 'order')
```

---

## Step 12: Create and Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Step 13: Create Superuser

```bash
python manage.py createsuperuser
```

Answer the prompts for username, email, and password.

---

## Step 14: Run Development Server

```bash
python manage.py runserver
```

Access:
- Admin Panel: `http://localhost:8000/admin`
- API: `http://localhost:8000/api/`

---

## API Endpoints

### Bio
- `GET /api/bio/` - Get all bio entries
- `GET /api/bio/<id>/` - Get specific bio entry
- `POST /api/bio/` - Create bio entry
- `PUT /api/bio/<id>/` - Update bio entry
- `DELETE /api/bio/<id>/` - Delete bio entry

### Education
- `GET /api/education/` - Get all education entries
- `GET /api/education/<id>/` - Get specific education
- `POST /api/education/` - Create education entry
- `PUT /api/education/<id>/` - Update education entry
- `DELETE /api/education/<id>/` - Delete education entry

### Skills
- `GET /api/skills/` - Get all skills
- `GET /api/skill-categories/` - Get all categories
- `POST /api/skills/` - Create skill
- `POST /api/skill-categories/` - Create category

### Experience
- `GET /api/experience/` - Get all experiences
- `GET /api/experience/<id>/` - Get specific experience
- `POST /api/experience/` - Create experience
- `PUT /api/experience/<id>/` - Update experience

### Projects
- `GET /api/projects/` - Get all projects
- `GET /api/projects/<id>/` - Get specific project
- `POST /api/projects/` - Create project
- `PUT /api/projects/<id>/` - Update project

---

## Environment Variables (.env)

Create `.env` file:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

---

## Deployment

### Using Heroku

1. Create `Procfile`:
```
web: gunicorn config.wsgi
```

2. Update `settings.py` for production:
```python
import dj_database_url

DATABASES['default'] = dj_database_url.config(
    default=config('DATABASE_URL'),
    conn_max_age=600
)
```

3. Deploy:
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku run python manage.py migrate
```

### Using Railway/Render

1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Add build command: `python manage.py migrate`
4. Add start command: `gunicorn config.wsgi`

---

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8000
kill -9 <PID>
```

### Database Connection Error
- Ensure PostgreSQL is running
- Check credentials in `.env`

### CORS Error
- Update `CORS_ALLOWED_ORIGINS` in settings.py
- Frontend URL must be in the list

---

This completes the full Django backend setup! Your portfolio is now fully functional and ready for deployment.
