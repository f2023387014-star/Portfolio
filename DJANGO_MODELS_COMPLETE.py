# ==========================================
# COMPLETE DJANGO MODELS FOR PORTFOLIO
# Copy these models to respective app models.py files
# ==========================================

# ==========================================
# bio/models.py
# ==========================================
from django.db import models

class Bio(models.Model):
    """User biography and contact information"""
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
    portfolio_url = models.URLField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Bio"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# ==========================================
# education/models.py
# ==========================================
from django.db import models

class Education(models.Model):
    """Educational background and qualifications"""
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    gpa = models.CharField(max_length=10, blank=True)
    field_of_study = models.CharField(max_length=200, blank=True)
    is_current = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-end_date']
        verbose_name_plural = "Educations"

    def __str__(self):
        return f"{self.degree} - {self.institution}"


# ==========================================
# skills/models.py
# ==========================================
from django.db import models

class SkillCategory(models.Model):
    """Categories for skills (Frontend, Backend, Tools, etc.)"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = "Skill Categories"

    def __str__(self):
        return self.name


class Skill(models.Model):
    """Individual skills with proficiency levels"""
    PROFICIENCY_LEVELS = [
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
        (4, 'Expert'),
    ]
    
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    proficiency_level = models.IntegerField(choices=PROFICIENCY_LEVELS, default=3)
    years_of_experience = models.FloatField(default=1)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']
        unique_together = ('category', 'name')

    def __str__(self):
        return f"{self.name} ({self.category})"


# ==========================================
# experience/models.py
# ==========================================
from django.db import models

class Experience(models.Model):
    """Work experience and professional background"""
    EMPLOYMENT_TYPES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Freelance', 'Freelance'),
        ('Internship', 'Internship'),
        ('Contract', 'Contract'),
    ]
    
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    employment_type = models.CharField(max_length=50, choices=EMPLOYMENT_TYPES)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    
    # Key achievements
    key_highlights = models.TextField(
        help_text="Enter highlights separated by comma",
        blank=True
    )
    
    # Media
    company_logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.title} at {self.company}"

    def get_highlights_list(self):
        """Return highlights as a list"""
        if self.key_highlights:
            return [h.strip() for h in self.key_highlights.split(',')]
        return []


# ==========================================
# projects/models.py
# ==========================================
from django.db import models

class Project(models.Model):
    """Portfolio projects showcase"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    featured_image = models.ImageField(upload_to='projects/')
    
    # Technologies used
    technologies = models.CharField(
        max_length=500,
        help_text="Enter technologies separated by comma"
    )
    
    # Project links
    project_link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)
    
    # Dates
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    # Display settings
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date', 'order']

    def __str__(self):
        return self.title

    def get_technologies_list(self):
        """Return technologies as a list"""
        if self.technologies:
            return [t.strip() for t in self.technologies.split(',')]
        return []
