// Sample course data (to be replaced with database data)
const sampleCourses = [
    {
        id: 1,
        title: "Bachelor of Science in Computer Science",
        department: "science",
        level: "undergraduate",
        description: "A comprehensive program covering computer science fundamentals, programming, and software development.",
        duration: "4 years",
        seats: 60,
        featured: true,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 2,
        title: "Master of Arts in English Literature",
        department: "arts",
        level: "postgraduate",
        description: "Advanced study of English literature, critical theory, and research methodologies.",
        duration: "2 years",
        seats: 30,
        featured: true,
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80"
    },
    {
        id: 3,
        title: "Bachelor of Commerce",
        department: "commerce",
        level: "undergraduate",
        description: "Comprehensive program in commerce, accounting, and business management.",
        duration: "3 years",
        seats: 120,
        featured: true,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80"
    },
    {
        id: 4,
        title: "Bachelor of Technology in Mechanical Engineering",
        department: "engineering",
        level: "undergraduate",
        description: "Advanced study of mechanical systems, design, and manufacturing processes.",
        duration: "4 years",
        seats: 80,
        featured: true,
        image: "https://images.unsplash.com/photo-1581094794329-c8112c4e0e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 5,
        title: "Master of Science in Physics",
        department: "science",
        level: "postgraduate",
        description: "Advanced study of physics, research methodologies, and experimental techniques.",
        duration: "2 years",
        seats: 40,
        featured: false,
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 6,
        title: "PhD in Computer Science",
        department: "science",
        level: "phd",
        description: "Doctoral program focusing on advanced research in computer science.",
        duration: "3-5 years",
        seats: 15,
        featured: false,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
];

// DOM Elements
let searchInput, departmentFilter, levelFilter, coursesContainer, noResultsMessage;

// Function to initialize DOM elements
function initializeDOMElements() {
    searchInput = document.getElementById('searchInput');
    departmentFilter = document.getElementById('departmentFilter');
    levelFilter = document.getElementById('levelFilter');
    coursesContainer = document.getElementById('coursesContainer');
    noResultsMessage = document.querySelector('.no-results');

    // Add event listeners only if elements exist
    if (searchInput) {
        searchInput.addEventListener('input', filterCourses);
    }
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterCourses);
    }
    if (levelFilter) {
        levelFilter.addEventListener('change', filterCourses);
    }
}

// Function to create course card
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-image-container">
            <img src="${course.image}" alt="${course.title}" class="course-image">
            ${course.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <span class="course-department">${course.department}</span>
            <p class="course-description">${course.description}</p>
            <div class="course-details">
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-users"></i> ${course.seats} seats</span>
            </div>
            <button class="apply-button">Apply Now</button>
        </div>
    `;
    return card;
}

// Function to display featured courses
function displayFeaturedCourses() {
    if (!coursesContainer) return;

    const featuredCourses = sampleCourses.filter(course => course.featured);
    const featuredSection = document.createElement('div');
    featuredSection.className = 'featured-courses-section';
    
    featuredSection.innerHTML = `
        <h2 class="section-title">Featured Courses</h2>
        <div class="featured-courses-grid">
            ${featuredCourses.map(course => createCourseCard(course).outerHTML).join('')}
        </div>
    `;
    
    coursesContainer.insertBefore(featuredSection, coursesContainer.firstChild);
}

// Function to filter courses
function filterCourses() {
    if (!coursesContainer) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedDepartment = departmentFilter ? departmentFilter.value : '';
    const selectedLevel = levelFilter ? levelFilter.value : '';

    const filteredCourses = sampleCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                            course.description.toLowerCase().includes(searchTerm);
        const matchesDepartment = !selectedDepartment || course.department === selectedDepartment;
        const matchesLevel = !selectedLevel || course.level === selectedLevel;

        return matchesSearch && matchesDepartment && matchesLevel;
    });

    displayCourses(filteredCourses);
}

// Function to display courses
function displayCourses(courses) {
    if (!coursesContainer) return;

    // Clear the container except for the featured section
    const featuredSection = document.querySelector('.featured-courses-section');
    coursesContainer.innerHTML = '';
    if (featuredSection) {
        coursesContainer.appendChild(featuredSection);
    }
    
    if (courses.length === 0) {
        if (noResultsMessage) {
            noResultsMessage.style.display = 'block';
            coursesContainer.appendChild(noResultsMessage);
        }
    } else {
        if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
        const allCoursesSection = document.createElement('div');
        allCoursesSection.className = 'all-courses-section';
        allCoursesSection.innerHTML = '<h2 class="section-title">All Courses</h2>';
        
        const coursesGrid = document.createElement('div');
        coursesGrid.className = 'courses-grid';
        
        courses.forEach(course => {
            const card = createCourseCard(course);
            coursesGrid.appendChild(card);
        });
        
        allCoursesSection.appendChild(coursesGrid);
        coursesContainer.appendChild(allCoursesSection);
    }
}

// Function to load courses from database (to be implemented)
async function loadCoursesFromDatabase() {
    try {
        // This will be implemented when the database is ready
        // const response = await fetch('/api/courses');
        // const courses = await response.json();
        // return courses;
        
        // For now, return sample data
        return sampleCourses;
    } catch (error) {
        console.error('Error loading courses:', error);
        return [];
    }
}

// Initialize the page
async function initializePage() {
    try {
        // Initialize DOM elements
        initializeDOMElements();
        
        // Load and display courses
        const courses = await loadCoursesFromDatabase();
        displayFeaturedCourses();
        displayCourses(courses);
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);




