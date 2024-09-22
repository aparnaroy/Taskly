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
    newTask.innerHTML = `<div class="circle" onclick="taskCompleted(event)"></div>
                        <input type="text" class="task-input task-text" value="${input.value}" onchange="updateTask(event)" />
                        <img src="./img/delete.png" class="delete-button" onclick="deleteTask(event)" alt="Delete"/>`;
    taskList.appendChild(newTask);

    input.value = ''; // Clear the input field
}

function updateTask(event) {
    const inputField = event.currentTarget;
    const listItem = inputField.closest('li');
    const taskText = listItem.querySelector('.task-text');

    // If the input value is empty, do not update
    if (inputField.value.trim() === '') {
        return;
    }

    // Update the task text
    taskText.textContent = inputField.value;
}

function deleteTask(event) {
    const listItem = event.currentTarget.closest('li');
    listItem.style.transition = 'opacity 0.5s ease'; // Add a transition for smooth removal
    listItem.style.opacity = '0'; // Fade out

    // Remove the item after the fade-out transition
    setTimeout(() => {
        listItem.remove();
    }, 500); // Match the duration with the CSS transition
}

function editTask(event) {
    const listItem = event.currentTarget.closest('li');
    const taskInput = listItem.querySelector('.task-input');

    // Make the input field editable (focus and select)
    taskInput.removeAttribute('readonly');
    taskInput.focus();
}

function addNewList() {
    const listName = prompt("Enter the name of your new list:");

    if (listName && listName.trim() !== '') {
        const lists = document.getElementById('lists');

        const newList = document.createElement('a');
        newList.href = "#"; // Set link as needed
        newList.textContent = listName; // Set the name of the list
        newList.className = ''; // Add any necessary classes

        lists.appendChild(newList); // Append to the sidebar
    } else {
        alert("List name cannot be empty.");
    }
}

function updateNavbarListTitle() {
    const newTitle = document.getElementById('list-title').value;
    const navbarTitle = document.querySelector('#lists a'); // Update the correct selector based on your HTML structure

    navbarTitle.textContent = newTitle; // Update the navbar title
}


function taskCompleted(event) {
    const listItem = event.currentTarget.closest('li');
    listItem.classList.toggle('completed'); // Toggles the completed class on both the circle and text/input

    const taskInput = listItem.querySelector('.task-input');
    if (taskInput) {
        taskInput.classList.toggle('completed'); // Toggle the completed class for the input
    }

    // Trigger confetti effect if task completed
    if (listItem.classList.contains('completed')) {
        createConfetti();
    }
}

function createConfetti() {
    const numConfetti = 300; // Number of confetti pieces
    const colors = [
        '#FF5733', // Red
        '#FFC300', // Yellow
        '#DAF7A6', // Light Green
        '#33FF57', // Green
        '#337FFF', // Blue
        '#FF33A1', // Pink
        '#FF8C33', // Orange
        '#8D33FF'  // Purple
    ];

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Randomize size
        const sizeClass = Math.random() > 0.5 ? 'confetti-small' : Math.random() > 0.5 ? 'confetti-large' : '';
        if (sizeClass) {
            confetti.classList.add(sizeClass);
        }

        // Randomize horizontal position
        confetti.style.left = `${Math.random() * 100}vw`; // Full width of viewport
        confetti.style.top = `-20px`; // Start from the top

        // Randomize color
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Add a random delay for each piece
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        document.body.appendChild(confetti);

        // Remove the confetti after the animation ends
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

