# JSON Data Structure Reference

Complete structure of `portfolio_data.json` with all fields and values.

## Complete JSON Structure

```json
{
  "bio": {
    "name": "Your Name",
    "title": "Full-Stack Web Developer",
    "about_short": "Building exceptional digital experiences...",
    "about_long": "I'm a Full-Stack Web Developer...",
    "about_paragraph_2": "My approach combines clean code...",
    "about_paragraph_3": "Beyond coding, I'm passionate...",
    "years_experience": 5,
    "projects_completed": 50,
    "client_satisfaction": 100
  },

  "skills": [
    {
      "id": 1,
      "category": "Frontend",
      "order": 1,
      "skills": [
        { "id": 1, "name": "React", "category_id": 1 },
        { "id": 2, "name": "Next.js", "category_id": 1 },
        { "id": 3, "name": "TypeScript", "category_id": 1 },
        { "id": 4, "name": "Tailwind CSS", "category_id": 1 },
        { "id": 5, "name": "GSAP", "category_id": 1 },
        { "id": 6, "name": "Three.js", "category_id": 1 }
      ]
    },
    {
      "id": 2,
      "category": "Backend",
      "order": 2,
      "skills": [
        { "id": 7, "name": "Django", "category_id": 2 },
        { "id": 8, "name": "Node.js", "category_id": 2 },
        { "id": 9, "name": "Python", "category_id": 2 },
        { "id": 10, "name": "PostgreSQL", "category_id": 2 },
        { "id": 11, "name": "REST APIs", "category_id": 2 },
        { "id": 12, "name": "GraphQL", "category_id": 2 }
      ]
    },
    {
      "id": 3,
      "category": "Tools & DevOps",
      "order": 3,
      "skills": [
        { "id": 13, "name": "Git", "category_id": 3 },
        { "id": 14, "name": "Docker", "category_id": 3 },
        { "id": 15, "name": "Vercel", "category_id": 3 },
        { "id": 16, "name": "AWS", "category_id": 3 },
        { "id": 17, "name": "GitHub", "category_id": 3 },
        { "id": 18, "name": "VS Code", "category_id": 3 }
      ]
    },
    {
      "id": 4,
      "category": "Design",
      "order": 4,
      "skills": [
        { "id": 19, "name": "UI/UX Design", "category_id": 4 },
        { "id": 20, "name": "Figma", "category_id": 4 },
        { "id": 21, "name": "Responsive Design", "category_id": 4 },
        { "id": 22, "name": "Animation", "category_id": 4 },
        { "id": 23, "name": "Accessibility", "category_id": 4 },
        { "id": 24, "name": "Web Performance", "category_id": 4 }
      ]
    }
  ],

  "proficiencies": [
    {
      "id": 1,
      "label": "Frontend Development",
      "percentage": 95
    },
    {
      "id": 2,
      "label": "Backend Development",
      "percentage": 85
    },
    {
      "id": 3,
      "label": "UI/UX Design",
      "percentage": 90
    }
  ],

  "education": [
    {
      "id": 1,
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University of Technology",
      "year": "2020 - 2024",
      "description": "Focus on software engineering and web development",
      "gpa": "3.8/4.0",
      "order": 1
    },
    {
      "id": 2,
      "degree": "Full-Stack Web Development Bootcamp",
      "institution": "Tech Academy",
      "year": "2020",
      "description": "Intensive training in MERN stack and modern development practices",
      "gpa": "Graduated with Distinction",
      "order": 2
    },
    {
      "id": 3,
      "degree": "Advanced JavaScript & React Certification",
      "institution": "Online Learning Platform",
      "year": "2021",
      "description": "Advanced concepts in JavaScript, React, and performance optimization",
      "gpa": "Certified",
      "order": 3
    }
  ],

  "experience": [
    {
      "id": 1,
      "title": "Senior Frontend Developer",
      "company": "Tech Innovations Inc.",
      "period": "2023 - Present",
      "description": "Leading frontend architecture and mentoring junior developers...",
      "highlights": [
        "React & Next.js",
        "Team Leadership",
        "Performance Optimization"
      ],
      "order": 1
    },
    {
      "id": 2,
      "title": "Full-Stack Developer",
      "company": "Digital Solutions Ltd.",
      "period": "2021 - 2023",
      "description": "Developed and maintained full-stack web applications...",
      "highlights": [
        "Django & React",
        "Database Design",
        "API Development"
      ],
      "order": 2
    },
    {
      "id": 3,
      "title": "Junior Web Developer",
      "company": "StartUp Labs",
      "period": "2020 - 2021",
      "description": "Built responsive web applications and learned modern development practices...",
      "highlights": [
        "HTML/CSS/JS",
        "First Projects",
        "Learning & Growth"
      ],
      "order": 3
    }
  ],

  "projects": [
    {
      "id": 1,
      "title": "Analytics Dashboard",
      "description": "Comprehensive analytics dashboard with real-time data visualization...",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "tags": [
        "Vue.js",
        "Django",
        "D3.js",
        "PostgreSQL"
      ],
      "link": "#",
      "github": "#",
      "order": 1
    }
  ]
}
```

---

## Field Descriptions

### Bio Object
| Field | Type | Example |
|-------|------|---------|
| name | string | "Your Name" |
| title | string | "Full-Stack Web Developer" |
| about_short | string | "Building exceptional..." |
| about_long | string | "I'm a Full-Stack..." |
| about_paragraph_2 | string | "My approach combines..." |
| about_paragraph_3 | string | "Beyond coding..." |
| years_experience | integer | 5 |
| projects_completed | integer | 50 |
| client_satisfaction | integer | 100 |

### Skill Category
| Field | Type | Example |
|-------|------|---------|
| id | integer | 1 |
| category | string | "Frontend" |
| order | integer | 1 |
| skills | array | [...] |

### Individual Skill
| Field | Type | Example |
|-------|------|---------|
| id | integer | 1 |
| name | string | "React" |
| category_id | integer | 1 |

### Proficiency
| Field | Type | Example |
|-------|------|---------|
| id | integer | 1 |
| label | string | "Frontend Development" |
| percentage | integer | 95 |

### Education Entry
| Field | Type | Example |
|-------|------|---------|
| id | integer | 1 |
| degree | string | "Bachelor of Science..." |
| institution | string | "University of Technology" |
| year | string | "2020 - 2024" |
| description | string | "Focus on software..." |
| gpa | string | "3.8/4.0" |
| order | integer | 1 |

### Experience Entry
| Field | Type | Example |
|-------|------|---------|
| id | integer | 1 |
| title | string | "Senior Frontend Developer" |
| company | string | "Tech Innovations Inc." |
| period | string | "2023 - Present" |
| description | string | "Leading frontend..." |
| highlights | array | ["React & Next.js", ...] |
| order | integer | 1 |

### Project Entry
| Field | Type | Example |
|-------|------|---------|
| id | integer | 1 |
| title | string | "Analytics Dashboard" |
| description | string | "Comprehensive analytics..." |
| image | string (URL) | "https://images.unsplash.com/..." |
| tags | array | ["Vue.js", "Django", ...] |
| link | string | "#" |
| github | string | "#" |
| order | integer | 1 |

---

## Data Statistics

| Section | Count | Total Fields |
|---------|-------|--------------|
| Bio | 1 | 9 |
| Skill Categories | 4 | 4 |
| Individual Skills | 24 | 24 |
| Proficiencies | 3 | 3 |
| Education | 3 | 3 |
| Experience | 3 | 3 |
| Projects | 1 | 1 |
| **TOTAL** | **39** | **47** |

---

## Customization Guide

### To Add More Skills
```json
{
  "id": 25,
  "name": "Rust",
  "category_id": 2
}
```

### To Add More Education
```json
{
  "id": 4,
  "degree": "Your Degree",
  "institution": "Institution Name",
  "year": "2024 - 2025",
  "description": "Description here",
  "gpa": "GPA or achievement",
  "order": 4
}
```

### To Add More Projects
```json
{
  "id": 2,
  "title": "Project Title",
  "description": "Project description",
  "image": "https://images.unsplash.com/...",
  "tags": ["Tech1", "Tech2", "Tech3"],
  "link": "https://project-link.com",
  "github": "https://github.com/...",
  "order": 2
}
```

---

## Notes

1. All IDs are unique within their sections
2. `order` fields control display order in frontend
3. `category_id` in skills links to skill category
4. Arrays (skills, highlights, tags) are actual arrays in JSON
5. Highlights and tags will be converted to pipe-delimited strings when imported to Django

---

## File Size

- Total lines: 268
- Total size: ~12 KB
- Format: Valid JSON (can be validated at jsonlint.com)
