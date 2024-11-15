
fetch('header.html').then(response => response.text()).then(data => document.getElementById('navbar').innerHTML = data);
fetch('footer.html').then(response => response.text()).then(data => document.getElementById('footer').innerHTML = data);

function searchCourses() {
    const searchTerm = document.getElementById('course-search').value.toLowerCase();

    filterAndDisplayCourses(searchTerm);
}

function applyFilters() {
    const minAge = document.getElementById('age-filter').value;
    const degreeLevel = document.getElementById('degree-filter').value;
    filterAndDisplayCourses('', minAge, degreeLevel);
}

function filterAndDisplayCourses(searchTerm = '', minAge = '', degreeLevel = '') {
    const courses = [
        { name: "Primary School I - V", age: 7, degreeLevel: "primary" },
        { name: "Middle School VI - VIII", age: 12, degreeLevel: "middle" },
        { name: "Higher Secondary School", age: 15, degreeLevel: "highschool" },
        { name: "Senior Secondary School", age: 19, degreeLevel: "intermediate" },
        { name: "Computer Application", age: 24, degreeLevel: "bachelor" },
        { name: "Physics", age: 24, degreeLevel: "bachelor" },
        { name: "Chemistry", age: 24, degreeLevel: "bachelor" },
        { name: "Mathematics", age: 24, degreeLevel: "bachelor" },
        { name: "Geology", age: 24, degreeLevel: "bachelor" },
        { name: "Industrial Chemistry", age: 24, degreeLevel: "bachelor" },
        { name: "Geography", age: 24, degreeLevel: "bachelor" },
        { name: "Statistics", age: 24, degreeLevel: "bachelor" },
        { name: "Master of Computer Science and Application MCA", age: 27, degreeLevel: "master" },
        { name: "Cyber Security & Digital Forensic", age: 27, degreeLevel: "master" }
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.name.toLowerCase().includes(searchTerm);
        const matchesAge = minAge ? course.age >= minAge : true;
        const matchesDegree = degreeLevel ? course.degreeLevel === degreeLevel : true;
        return matchesSearch && matchesAge && matchesDegree;
    });

    const courseContainer = document.getElementById('course-container');
    courseContainer.innerHTML = filteredCourses.map(course =>
        `<li>${course.name} - Age ${course.age} - ${capitalize(course.degreeLevel)}</li>`
    ).join('') || '<li>No courses found</li>';
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function toggleSearchButton() {
    const searchInput = document.getElementById('course-search').value.trim();
    const searchBtn = document.getElementById('search-btn');

    if (searchInput) {
        searchBtn.disabled = false; 
        searchBtn.style.backgroundColor = '#1d72b8'; // Enabled color
        searchBtn.style.color = '#fff';
    } else {
        searchBtn.disabled = true;
        searchBtn.style.backgroundColor = '#ccc'; // Disabled color
        searchBtn.style.color = '#666';
    }
}




