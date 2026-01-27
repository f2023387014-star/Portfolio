# Complete Deployment Guide - Portfolio Full-Stack Application

## 📋 Table of Contents
1. [Frontend Deployment (Next.js)](#frontend-deployment-nextjs)
2. [Backend Deployment (Django)](#backend-deployment-django)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Troubleshooting](#troubleshooting)

---

## Frontend Deployment (Next.js)

### Option 1: Deploy to Vercel (Recommended)

Vercel is optimized for Next.js and makes deployment incredibly simple.

#### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- Your code pushed to GitHub

#### Step-by-Step

1. **Connect Repository**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Environment Variables**
   - Add any required environment variables (if connecting to backend)
   - Example: `NEXT_PUBLIC_API_URL=https://your-django-backend.com`

4. **Deploy**
   - Click "Deploy"
   - Your site is live! (vercel will give you a URL like `your-project.vercel.app`)

#### Set Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., yourportfolio.com)
3. Update DNS records as shown by Vercel

---

### Option 2: Deploy to Netlify

Netlify is also excellent for Next.js applications.

#### Prerequisites
- Netlify account (free at netlify.com)
- GitHub repository

#### Step-by-Step

1. **Connect Repository**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

2. **Configure Build Settings**
   - Build command: `npm run build` or `next build`
   - Publish directory: `out` (or `.next` if using SSR)
   - For Next.js with SSR, use Functions instead

3. **Set Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add variables like `NEXT_PUBLIC_API_URL`

4. **Deploy**
   - Netlify automatically deploys when you push to GitHub

---

## Backend Deployment (Django)

### Option 1: Deploy to Heroku (Easy Option)

Heroku is great for beginners and has free tier (currently paid only).

#### Prerequisites
- Heroku account
- Git installed
- Heroku CLI installed

#### Step-by-Step

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku

   # Windows
   # Download installer from https://devcenter.heroku.com/articles/heroku-cli

   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Procfile**
   Create file named `Procfile` in project root:
   ```
   web: gunicorn config.wsgi
   release: python manage.py migrate
   ```

4. **Create runtime.txt**
   Create file named `runtime.txt`:
   ```
   python-3.11.7
   ```

5. **Update requirements.txt**
   ```bash
   pip freeze > requirements.txt
   ```

6. **Initialize Git Repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

7. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

8. **Set Environment Variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=your-app-name.herokuapp.com
   ```

9. **Deploy**
   ```bash
   git push heroku main
   ```

10. **Run Migrations**
    ```bash
    heroku run python manage.py migrate
    heroku run python manage.py createsuperuser
    ```

11. **View Logs**
    ```bash
    heroku logs --tail
    ```

---

### Option 2: Deploy to Railway

Railway is modern and very user-friendly.

#### Step-by-Step

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Connect GitHub Repository**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Select Python
   - Railway auto-detects Django

4. **Set Environment Variables**
   - Go to Variables tab
   - Add all required environment variables:
     ```
     SECRET_KEY=your-secret-key
     DEBUG=False
     ALLOWED_HOSTS=your-domain.railway.app
     DATABASE_URL=<auto-provided>
     ```

5. **Set Start Command**
   - In Variables, add:
     ```
     RAILWAY_ENTRYPOINT=gunicorn config.wsgi
     ```

6. **Database Setup**
   - Click "Add Plugin"
   - Select "PostgreSQL"
   - Railway automatically sets DATABASE_URL

7. **Deploy**
   - Push to GitHub, Railway auto-deploys
   - Visit your domain to see your app

---

### Option 3: Deploy to Render

Render offers free tier with automatic deployments.

#### Step-by-Step

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository

3. **Configure Service**
   - Name: `portfolio-backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn config.wsgi:application`

4. **Set Environment Variables**
   - Add all required variables:
     ```
     DJANGO_SETTINGS_MODULE=config.settings
     PYTHON_VERSION=3.11.7
     SECRET_KEY=your-secret-key
     DEBUG=False
     ALLOWED_HOSTS=your-service.onrender.com
     ```

5. **Create PostgreSQL Database**
   - In Render dashboard, create PostgreSQL instance
   - Copy DATABASE_URL
   - Add to Web Service environment variables

6. **Deploy**
   - Render auto-deploys when you push to GitHub
   - Run migrations via shell:
     ```bash
     python manage.py migrate
     python manage.py createsuperuser
     ```

---

## Database Setup

### Using PostgreSQL (Production Recommended)

#### Local PostgreSQL Setup

1. **Install PostgreSQL**
   ```bash
   # macOS
   brew install postgresql

   # Windows
   # Download installer from postgresql.org

   # Linux
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Start PostgreSQL**
   ```bash
   # macOS
   brew services start postgresql

   # Linux
   sudo systemctl start postgresql
   ```

3. **Create Database**
   ```bash
   createdb portfolio_db
   ```

4. **Create User**
   ```bash
   psql postgres
   CREATE USER portfolio_user WITH PASSWORD 'secure_password';
   ALTER ROLE portfolio_user SET client_encoding TO 'utf8';
   ALTER ROLE portfolio_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE portfolio_user SET default_transaction_deferrable TO on;
   ALTER ROLE portfolio_user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
   \q
   ```

#### Cloud PostgreSQL Options

**Supabase (Recommended)**
```bash
# 1. Go to supabase.com and create account
# 2. Create new project
# 3. Go to Settings → Database
# 4. Copy connection string
# 5. Add to .env:
DATABASE_URL=postgresql://user:password@host:5432/database
```

**AWS RDS**
```bash
# 1. Go to AWS console
# 2. Create RDS PostgreSQL instance
# 3. Get endpoint and credentials
# 4. Add to environment variables
```

**Digital Ocean Database**
```bash
# 1. Create DigitalOcean account
# 2. Create PostgreSQL database cluster
# 3. Copy connection string
```

---

## Environment Variables

### Frontend (.env.local for Next.js)

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-django-backend.com/api
NEXT_PUBLIC_APP_NAME=Portfolio
NEXT_PUBLIC_APP_DESCRIPTION=My Professional Portfolio

# Optional: Analytics
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

### Backend (.env for Django)

```env
# Security
SECRET_KEY=your-super-secret-key-generate-one
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
DB_ENGINE=postgresql
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=secure_password
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://yourdomain.com

# Email (for contact forms)
EMAIL_BACKEND=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Security Settings
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

---

## Complete Deployment Checklist

### Pre-Deployment
- [ ] All code committed to Git
- [ ] `.env` file created locally (not committed)
- [ ] `requirements.txt` updated
- [ ] All dependencies tested locally
- [ ] Database migrations created and tested
- [ ] Static files collected
- [ ] Tests passing

### Frontend Deployment
- [ ] Code pushed to GitHub
- [ ] Vercel/Netlify project created
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Build process successful

### Backend Deployment
- [ ] Code pushed to GitHub
- [ ] Deployment platform selected (Heroku/Railway/Render)
- [ ] Database set up and migrated
- [ ] Environment variables configured
- [ ] Superuser created
- [ ] Admin panel accessible
- [ ] API endpoints responding
- [ ] CORS configured correctly

### Post-Deployment
- [ ] Test all API endpoints
- [ ] Test frontend to backend connection
- [ ] Check error logs
- [ ] Verify media uploads working
- [ ] Test admin panel login
- [ ] Performance testing

---

## Troubleshooting

### Common Issues

#### 502 Bad Gateway Error (Django)
```bash
# Check logs
heroku logs --tail  # Heroku

# Common causes:
# 1. Dependencies not installed
pip install -r requirements.txt

# 2. Database not migrated
python manage.py migrate

# 3. Static files not collected
python manage.py collectstatic --noinput

# 4. ALLOWED_HOSTS not configured
# Update settings.py
```

#### CORS Error
```python
# In settings.py
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
    "https://yourdomain.com",
    "http://localhost:3000",  # development
]
```

#### Database Connection Error
```bash
# Test connection
python manage.py dbshell

# Check DATABASE_URL format
postgresql://user:password@host:5432/database
```

#### Static Files Not Loading
```bash
# Collect static files
python manage.py collectstatic --noinput

# Check STATIC_URL and STATIC_ROOT in settings.py
```

#### Image Upload Not Working
```bash
# Ensure media directory exists
mkdir -p media

# Check MEDIA_URL and MEDIA_ROOT in settings.py
# In urls.py, ensure media files are served
```

---

## Performance Optimization

### Frontend Optimization
- Enable caching headers
- Compress images
- Minimize CSS/JS
- Use CDN for static assets

### Backend Optimization
- Enable database connection pooling
- Cache API responses
- Optimize database queries
- Use compression middleware

### Both
- Monitor performance metrics
- Set up error tracking (Sentry)
- Enable logging
- Regular backups

---

## Security Checklist

- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` set
- [ ] HTTPS enabled
- [ ] ALLOWED_HOSTS configured
- [ ] CORS properly restricted
- [ ] Database password strong
- [ ] Environment variables secured
- [ ] Regular backups scheduled
- [ ] Security headers configured
- [ ] User input validated

---

Your portfolio is now live! Celebrate your achievement and keep updating it with your latest work. 🎉
