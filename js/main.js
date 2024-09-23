// Document ready function
$(function () {
    document.querySelectorAll('#tags .color-picker').forEach(colorPicker => {
        colorPicker.addEventListener('input', updateTagColor);
    });

    toggleNav(); // Make sure sidebar is open by default
});

// Show top navbar when scrolling
window.onscroll = function() {
    const navbar = document.querySelector('.top-nav');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.classList.add('scrolled'); // Add the scrolled class
    } else {
        navbar.classList.remove('scrolled'); // Remove the scrolled class
    }
};

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


// Task List Functions

function addTask() {
    const input = document.getElementById('newTaskInput');
    const taskList = document.getElementById('taskList');

    if (input.value.trim() === '') return; // Ignore empty input

    const newTask = document.createElement('li');
    newTask.innerHTML = `<div class="circle" onclick="taskCompleted(event)"></div>
                        <div class="task-input task-text" contenteditable="true" onchange="updateTask(event)">${input.value}</div>
                        <img src="./img/tag.png" class="tag-button" onclick="toggleTagDropdown(event)" />
                        <div class="tag-dropdown"></div>
                        <img src="./img/delete.png" class="delete-button" onclick="deleteTask(event)" alt="Delete"/>`;
    taskList.appendChild(newTask);

    input.value = ''; // Clear the input field
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
    listItem.classList.toggle('completed'); // Toggle the completed class

    const taskInput = listItem.querySelector('.task-text');
    const tagElements = listItem.querySelectorAll('.tag-rectangle'); // Get all tag elements

    // Apply or remove the dull class based on completion status
    tagElements.forEach(tag => {
        tag.classList.toggle('dull', listItem.classList.contains('completed'));
    });

    if (taskInput) {
        taskInput.classList.toggle('completed'); // Toggle the completed class for the input
    }

    // Trigger confetti effect if task completed
    if (listItem.classList.contains('completed')) {
        createConfetti();
    }
}


function createConfetti() {
    const numConfetti = 1000; // Number of confetti pieces
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


// Tag Functions

// Function to get the tags from the side navbar
function getTags() {
    const tagElements = document.querySelectorAll('#tags a');
    return Array.from(tagElements).map(tag => tag.textContent);
}

// Function to toggle the visibility of the tag dropdown
function toggleTagDropdown(event) {
    const dropdown = event.target.nextElementSibling; // Find the corresponding dropdown div
    const tags = getTags(); // Fetch the tags from the side navbar
    
    dropdown.innerHTML = ''; 

    // Populate the dropdown if it hasn't been done yet
    if (!dropdown.innerHTML) {
        tags.forEach(tag => {
            const tagOption = document.createElement('a');
            tagOption.textContent = tag;
            tagOption.onclick = () => addTagToTask(event, tagOption.textContent, tag); // Attach event handler for selecting a tag
            dropdown.appendChild(tagOption);
        });
    }

    // Toggle visibility of the dropdown
    dropdown.classList.toggle('visible');
}


function addTagToTask(event, tagText) {
    event.preventDefault(); // Prevent the default link behavior

    // Find the closest list item (task) where the tag was clicked
    const listItem = event.target.closest('li');
    
    // Check if the tag already exists
    const existingTag = Array.from(listItem.querySelectorAll('.tag-rectangle'))
        .find(tag => tag.textContent === tagText);
    
    if (existingTag) {
        // If the tag exists and matches the clicked tag, remove it
        listItem.removeChild(existingTag);
    } else {
        // Get the corresponding color picker for the tag
        const tagElements = document.querySelectorAll('#tags .tag-item');
        let color = '#000000'; // Default color

        tagElements.forEach(tagItem => {
            const tagName = tagItem.querySelector('.tag-name').textContent;
            if (tagName === tagText) {
                const colorPicker = tagItem.querySelector('.color-picker');
                color = colorPicker.value; // Get the value from the color picker
            }
        });

        // Create a new tag element
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-rectangle'; // Add a class for styling
        tagElement.style.backgroundColor = color; // Set the color from the color picker
        tagElement.textContent = tagText; // Set the tag text

        // Find the tag button element (adjust this selector as necessary)
        const tagButtonElement = listItem.querySelector('.tag-button'); // Assuming you have a class for the tag button

        // Insert the tag element before the tag button element
        listItem.insertBefore(tagElement, tagButtonElement);
    }
    
    // Hide the dropdown after selecting a tag
    const dropdown = listItem.querySelector('.tag-dropdown');
    if (dropdown) {
        dropdown.classList.remove('visible'); // Assuming you are using 'visible' class to show/hide the dropdown
    }
}

function updateTagColor(event) {
    const colorPicker = event.target;
    const selectedColor = colorPicker.value;
    
    // Get the tag name corresponding to the color picker
    const tagName = colorPicker.closest('.tag-item').querySelector('.tag-name').textContent;
    
    // Find all list items that contain the tag
    const listItems = document.querySelectorAll('#taskList li');
    listItems.forEach(listItem => {
        const existingTag = Array.from(listItem.querySelectorAll('.tag-rectangle'))
            .find(tag => tag.textContent === tagName);
        
        if (existingTag) {
            existingTag.style.backgroundColor = selectedColor; // Update the tag color
        }
    });
}

function addNewTag() {
    const tagName = prompt("Enter the name of your new tag:");

    if (tagName && tagName.trim() !== '') {
        // Create a new tag item element
        const tagItem = document.createElement('div');
        tagItem.className = 'tag-item';

        // Create the tag link
        const tagLink = document.createElement('a');
        tagLink.href = "#";
        tagLink.className = 'tag-name';
        tagLink.textContent = tagName;

        // Create the color picker
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.className = 'color-picker';
        colorPicker.value = getRandomColor(); // Set random color
        
        // Append elements to the tag item
        tagItem.appendChild(tagLink);
        tagItem.appendChild(colorPicker);

        // Append the new tag item to the tags div
        document.getElementById('tags').appendChild(tagItem);
        
        // Add event listener to the color picker
        colorPicker.addEventListener('input', updateTagColor);
    } else {
        alert("Tag name cannot be empty.");
    }
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




