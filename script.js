// Array of days
const weekdayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

// Array of months
const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

// Array of quotes
const quotes = [
  "\"If one day the speed kills me, don't cry. Because I was smiling.\"",
  "\"There's three things men always talk about – women, sports, and cars.\"",
  "\"When you put good will out there, it's amazing what can be accomplished.\"",
  "\"It's not about working anymore, its about doing work I can be proud of.\"",
  "\"Mananatiling ikaw, kahit 'di ka nakikita araw araw\""
];

// Function to update the time
function updatedTime() {
  let timeElement = document.getElementById('current-time');
  let currentTime = new Date();

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  let amPm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12;
  }

  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Format the time as "h:mm AM/PM"
  let formattedTime = hours + ':' + minutes + ' ' + amPm;

  timeElement.innerHTML = formattedTime;
}

// Function to update the date
function updatedDate() {
  let dateElement = document.getElementById('current-date');
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();

  let formattedDate = day + ' ' + monthNames[month] + ', ' + year;
  dateElement.innerHTML = formattedDate;
}

function updatedDay() {
  let dayElement = document.getElementById('current-day');
  let currentDayOfWeek = new Date().getDay();
  dayElement.innerHTML = weekdayNames[currentDayOfWeek];
}

updatedTime();
updatedDate();
updatedDay();

setInterval(updatedTime, 1000);
setInterval(updatedDate, 1000);
setInterval(updatedDay, 1000);

// Get references to elements for user input
const nameInput = document.getElementById('name');
const greeting = document.getElementById('greeting');
const clickSound = document.getElementById('clickSound');

// Function to update the greeting based on the time of day and user's name
function updateGreeting() {
  let name = nameInput.value || 'Racer';
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  let greetingMessage = '';

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = 'Good Afternoon';
  } else {
    greetingMessage = 'Good Evening';
  }

  greeting.textContent = `${greetingMessage}, ${name}!`;
}

// Function to play a click sound
function playClickSound() {
  clickSound.currentTime = 0; 
  clickSound.play();
}

// Add event listener to handle user pressing Enter in the name input field
nameInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    playClickSound();
    nameInput.classList.add('borderless');
    updateGreeting();
    nameInput.disabled = true;
  }
});

updateGreeting();

// Get references to elements for task input
const todayTaskInput = document.getElementById('today-task');
const todayFocus = document.getElementById('focus-title');

// Add event listener to detect Enter key press in task input field
todayTaskInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    todayTaskInput.disabled = true;
    todayTaskInput.classList.add('borderless');
    todayFocus.textContent = "Today's Focus";
  }
});

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteContainer = document.getElementById('random-quote');

  quoteContainer.style.opacity = 0;

  // After a brief delay, change the quote and apply a fade-in effect by setting opacity to 1
  setTimeout(() => {
    quoteContainer.textContent = randomQuote;
    quoteContainer.style.opacity = 1;
  }, 500);
}

// Function to add a new quote to the array
function addQuote() {
  const newQuoteInput = document.getElementById('new-quote-input');
  const newQuote = newQuoteInput.value;

  if (newQuote !== '') {
    quotes.push(newQuote);
    newQuoteInput.value = '';
  }
}

// Event listener for adding a new quote
document.getElementById('add-quote-button').addEventListener('click', addQuote);

displayRandomQuote();

setInterval(displayRandomQuote, 5000);

// Get references to elements for the popup modal
const showPopupButton = document.getElementById("show-popup-button");
const popupModal = document.getElementById("popup-modal");
const closeButton = document.getElementById("close-button");

// Function to open the popup modal
function openPopup() {
  popupModal.style.display = "block";
}

// Function to close the popup modal
function closePopup() {
  popupModal.style.display = "none";
}

// Add click event listeners to show and close the popup modal
showPopupButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

// Get references to elements for managing tasks
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Function to add a task to the list
function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// Event listener for marking tasks as checked or removing them
listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

// Function to save task data to localStorage
function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

// Function to display tasks from localStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}

showTask();

// Get references to elements for managing the to-do list modal
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("todo-list-container");
const closeModalBtn = document.getElementById("closeModal");

// Event listeners to open and close the to-do list modal
openModalBtn.addEventListener("click", function() {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// List of your image filenames
const images = ['car1.jpg', 'car2.jpg', 'car4.jpg','car4.jpg'];

// Function to set a random background image
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    const newBackgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${randomImage}")`;
    
    // Set the new background image in the CSS
    document.body.style.backgroundImage = newBackgroundImage;
}

// Call the function on page load
window.addEventListener('load', setRandomBackground);