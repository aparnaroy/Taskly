function toggleNav() {
    const sidebarIcon = document.getElementById('sidebarIcon');
    const mainContent = document.querySelector('.main-content');

    // Toggle between black and white
    if (sidebarIcon.src.includes('sidebar-icon-black.png')) {
        sidebarIcon.src = './img/sidebar-icon-white.png';
    } else {
        sidebarIcon.src = './img/sidebar-icon-black.png';
    }
    
    // Toggle sidebar open/close
    $('#side-nav').toggleClass('open');
    // Toggle left-align class for main content when sidebar is opened/closed
    mainContent.classList.toggle('left-align');
}

function toggleLightDarkMode() {
    const sidebarIcon = document.getElementById('sidebarIcon');
    const lightDarkIcon = document.getElementById('lightdarkIcon');
    const body = document.body;
    
    // Toggle light/dark mode
    body.classList.toggle('dark-mode');
    
    // Swap icon colors
    if (sidebarIcon.src.includes('sidebar-icon-black.png')) {
        sidebarIcon.src = './img/sidebar-icon-white.png';
    } else {
        sidebarIcon.src = './img/sidebar-icon-black.png';
    }

    if (lightDarkIcon.src.includes('lightdark-icon-white.png')) {
        lightDarkIcon.src = './img/lightdark-icon-black.png';
    } else {
        lightDarkIcon.src = './img/lightdark-icon-white.png';
    }
}

function addTask() {
    const input = document.getElementById('newTaskInput');
    const taskList = document.getElementById('taskList');

    if (input.value.trim() === '') return; // Ignore empty input

    const newTask = document.createElement('li');
    newTask.innerHTML = `<span class="circle" onclick="taskCompleted(event)"></span>${input.value}`;
    taskList.appendChild(newTask);

    input.value = ''; // Clear the input field
}

function taskCompleted(event) {
    // Handle the click on the circle here (e.g., toggle a completed state)
    const circle = event.currentTarget;
    circle.classList.toggle('clicked'); // You can style this class to indicate completion
}
