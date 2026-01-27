# Frontend-Django Integration Complete Guide

## Status: PARTIALLY READY

You now have:
- ✅ SWR installed in package.json
- ✅ API service layer created (`/lib/api.ts`)
- ✅ Environment variables template (`.env.local.example`)
- ✅ Projects component updated with SWR
- ❌ Skills, Education, Experience components need updates
- ❌ Environment variables file needs to be created
- ❌ Django API CORS configuration needed

---

## Quick Setup Steps (Next 15 minutes)

### Step 1: Copy Environment Variables
```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install SWR and all other dependencies.

### Step 3: Update Django CORS Settings

In your Django `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
]

# Allow credentials
CORS_ALLOW_CREDENTIALS = True
```

Install django-cors-headers if not already:
```bash
pip install django-cors-headers
```

### Step 4: Test Django API

Start your Django server:
```bash
python manage.py runserver
```

Test endpoints:
```bash
curl http://localhost:8000/api/projects/
curl http://localhost:8000/api/skills/
curl http://localhost:8000/api/education/
curl http://localhost:8000/api/experience/
```

### Step 5: Start Frontend
```bash
npm run dev
```

Visit http://localhost:3000 and check console for API calls.

---

## API Response Format Expected

### Projects Endpoint
```json
{
  "results": [
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "...",
      "image": "https://...",
      "tags": ["React", "Node.js"],
      "github_link": "https://github.com/...",
      "live_link": "https://...",
      "created_at": "2024-01-15"
    }
  ]
}
```

### Skills Endpoint
```json
{
  "results": [
    {
      "id": 1,
      "category": "Frontend",
      "name": "React",
      "proficiency": 95,
      "years": 3
    }
  ]
}
```

### Education Endpoint
```json
{
  "results": [
    {
      "id": 1,
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University of Technology",
      "graduation_year": 2024,
      "gpa": "3.8/4.0",
      "description": "..."
    }
  ]
}
```

### Experience Endpoint
```json
{
  "results": [
    {
      "id": 1,
      "title": "Senior Frontend Developer",
      "company": "Tech Innovations Inc.",
      "start_date": "2023-01-15",
      "end_date": null,
      "description": "...",
      "highlights": ["React", "Leadership"]
    }
  ]
}
```

---

## Component Updates Remaining

### Update Skills Component
Replace the hardcoded `skillsData` with:
```typescript
const { data: apiData, isLoading, error } = useSWR('/skills/', getSkills)
const skillsData = apiData?.results || fallbackSkillsData
```

### Update Education Component
Replace the hardcoded `educationData` with:
```typescript
const { data: apiData, isLoading, error } = useSWR('/education/', getEducation)
const educationData = apiData?.results || fallbackEducationData
```

### Update Experience Component
Replace the hardcoded `experienceData` with:
```typescript
const { data: apiData, isLoading, error } = useSWR('/experience/', getExperience)
const experienceData = apiData?.results || fallbackExperienceData
```

---

## Debugging Tips

### Check API Connection in Browser
Open DevTools → Network tab → look for `/api/projects/` requests

### Check Console Errors
Look for CORS errors:
```
Access to XMLHttpRequest at 'http://localhost:8000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:** Add CORS_ALLOWED_ORIGINS in Django

### Test API Directly
```bash
curl -H "Origin: http://localhost:3000" http://localhost:8000/api/projects/
```

### Enable API Logging
Edit `/lib/api.ts` and uncomment logging:
```typescript
console.log(`[API] Fetching ${endpoint}`)
```

---

## Full Integration Timeline

- **Now:** Projects component ready to fetch (SWR installed)
- **Next 10 min:** Set up .env.local and Django CORS
- **Next 20 min:** Update Skills, Education, Experience components
- **Next 10 min:** Test all endpoints
- **Total:** ~45 minutes to full integration

---

## Files Modified/Created

✅ Created:
- `/lib/api.ts` - API service layer
- `/.env.local.example` - Environment template
- `FRONTEND_READINESS_ASSESSMENT.md` - This guide

✅ Updated:
- `/package.json` - Added SWR dependency
- `/components/projects.tsx` - Added SWR integration

⏳ Still Need:
- `.env.local` - Actual environment file (you create)
- `/components/skills.tsx` - Update with SWR
- `/components/education.tsx` - Update with SWR
- `/components/experience.tsx` - Update with SWR

---

## Next Actions

1. Run `npm install` to install SWR
2. Copy `.env.local.example` to `.env.local`
3. Update Django CORS settings
4. Test API endpoints with curl
5. Run `npm run dev`
6. Check browser console for API calls
7. Update remaining components if needed

Your frontend is almost ready! Just need to activate the API integration. 🚀
