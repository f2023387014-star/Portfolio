# Django Data Import Guide

Complete guide to import the `portfolio_data.json` into your Django database.

## File Overview

The `portfolio_data.json` contains ALL hardcoded frontend data organized into these sections:

- **bio** - Personal information, about text, stats
- **skills** - Skill categories with individual skills  
- **proficiencies** - Proficiency percentages for 3 areas
- **education** - Educational background and certifications
- **experience** - Work experience and career history
- **projects** - Portfolio projects (only Analytics Dashboard included as requested)

---

## Step 1: Create Django Management Command

Create file: `portfolio/management/commands/import_portfolio_data.py`

```python
import json
from django.core.management.base import BaseCommand
from portfolio.models import (
    Bio, SkillCategory, Skill, Proficiency,
    Education, Experience, Project
)

class Command(BaseCommand):
    help = 'Import portfolio data from JSON file'

    def handle(self, *args, **options):
        # Load JSON file
        with open('portfolio_data.json', 'r') as f:
            data = json.load(f)

        # Import Bio
        self.import_bio(data['bio'])
        
        # Import Skills
        self.import_skills(data['skills'])
        
        # Import Proficiencies
        self.import_proficiencies(data['proficiencies'])
        
        # Import Education
        self.import_education(data['education'])
        
        # Import Experience
        self.import_experience(data['experience'])
        
        # Import Projects
        self.import_projects(data['projects'])
        
        self.stdout.write(
            self.style.SUCCESS('Successfully imported all portfolio data')
        )

    def import_bio(self, bio_data):
        Bio.objects.update_or_create(
            id=1,
            defaults={
                'name': bio_data['name'],
                'title': bio_data['title'],
                'about_short': bio_data['about_short'],
                'about_long': bio_data['about_long'],
                'about_paragraph_2': bio_data['about_paragraph_2'],
                'about_paragraph_3': bio_data['about_paragraph_3'],
                'years_experience': bio_data['years_experience'],
                'projects_completed': bio_data['projects_completed'],
                'client_satisfaction': bio_data['client_satisfaction'],
            }
        )
        self.stdout.write('✓ Bio imported')

    def import_skills(self, skills_data):
        for category_data in skills_data:
            category, _ = SkillCategory.objects.get_or_create(
                name=category_data['category'],
                defaults={'order': category_data['order']}
            )
            
            for skill_data in category_data['skills']:
                Skill.objects.get_or_create(
                    name=skill_data['name'],
                    defaults={'category': category}
                )
        
        self.stdout.write('✓ Skills imported')

    def import_proficiencies(self, proficiencies_data):
        for prof_data in proficiencies_data:
            Proficiency.objects.update_or_create(
                id=prof_data['id'],
                defaults={
                    'label': prof_data['label'],
                    'percentage': prof_data['percentage'],
                }
            )
        self.stdout.write('✓ Proficiencies imported')

    def import_education(self, education_data):
        for edu_data in education_data:
            Education.objects.update_or_create(
                id=edu_data['id'],
                defaults={
                    'degree': edu_data['degree'],
                    'institution': edu_data['institution'],
                    'year': edu_data['year'],
                    'description': edu_data['description'],
                    'gpa': edu_data['gpa'],
                    'order': edu_data['order'],
                }
            )
        self.stdout.write('✓ Education imported')

    def import_experience(self, experience_data):
        for exp_data in experience_data:
            highlights = '||'.join(exp_data['highlights'])
            Experience.objects.update_or_create(
                id=exp_data['id'],
                defaults={
                    'title': exp_data['title'],
                    'company': exp_data['company'],
                    'period': exp_data['period'],
                    'description': exp_data['description'],
                    'highlights': highlights,
                    'order': exp_data['order'],
                }
            )
        self.stdout.write('✓ Experience imported')

    def import_projects(self, projects_data):
        for proj_data in projects_data:
            tags = '||'.join(proj_data['tags'])
            Project.objects.update_or_create(
                id=proj_data['id'],
                defaults={
                    'title': proj_data['title'],
                    'description': proj_data['description'],
                    'image': proj_data['image'],
                    'tags': tags,
                    'link': proj_data['link'],
                    'github': proj_data['github'],
                    'order': proj_data['order'],
                }
            )
        self.stdout.write('✓ Projects imported')
```

---

## Step 2: Create Directory Structure

```bash
mkdir -p portfolio/management/commands
touch portfolio/management/__init__.py
touch portfolio/management/commands/__init__.py
```

---

## Step 3: Place JSON File in Project Root

Place `portfolio_data.json` in your Django project root directory (same level as `manage.py`)

```
your_django_project/
├── manage.py
├── portfolio_data.json  ← HERE
├── portfolio/
│   ├── models.py
│   ├── views.py
│   └── management/
│       └── commands/
│           └── import_portfolio_data.py
└── ...
```

---

## Step 4: Run the Import Command

```bash
python manage.py import_portfolio_data
```

Expected output:
```
✓ Bio imported
✓ Skills imported
✓ Proficiencies imported
✓ Education imported
✓ Experience imported
✓ Projects imported
Successfully imported all portfolio data
```

---

## Step 5: Verify Data

Check Django admin:
```
http://localhost:8000/admin/
```

You should see all data populated in the portfolio section.

---

## Models Reference

Make sure your Django models match these fields:

### Bio
- name: CharField
- title: CharField
- about_short: TextField
- about_long: TextField
- about_paragraph_2: TextField
- about_paragraph_3: TextField
- years_experience: IntegerField
- projects_completed: IntegerField
- client_satisfaction: IntegerField

### SkillCategory
- name: CharField
- order: IntegerField

### Skill
- name: CharField
- category: ForeignKey(SkillCategory)

### Proficiency
- label: CharField
- percentage: IntegerField

### Education
- degree: CharField
- institution: CharField
- year: CharField
- description: TextField
- gpa: CharField
- order: IntegerField

### Experience
- title: CharField
- company: CharField
- period: CharField
- description: TextField
- highlights: TextField (delimited by ||)
- order: IntegerField

### Project
- title: CharField
- description: TextField
- image: URLField
- tags: TextField (delimited by ||)
- link: CharField
- github: CharField
- order: IntegerField

---

## Troubleshooting

### ImportError: No module named 'portfolio.management'
Make sure you created the `__init__.py` files in both `management/` and `management/commands/` directories.

### FileNotFoundError: portfolio_data.json
Place the `portfolio_data.json` file in your Django project root (same directory as manage.py).

### Database Errors
Make sure all your models are defined and you've run:
```bash
python manage.py migrate
```

### Duplicate Key Errors
The import uses `update_or_create()`, so running it twice should update existing data, not create duplicates.

---

## Customization

Edit `portfolio_data.json` to change any data before importing. The import command will use whatever is in the JSON file.

For example, to add more projects, edit the projects array and re-run the import command.
