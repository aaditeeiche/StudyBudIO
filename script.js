// Select DOM elements
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Initialize timer variables
let countdown;
let isPaused = true;

// Function to format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Function to start or resume timer
function startTimer() {
  if (isPaused) {
    isPaused = false;
    countdown = setInterval(() => {
      const timeLeft = timerEl.textContent.split(':').map(Number);
      const totalSeconds = timeLeft[0] * 60 + timeLeft[1];
      if (totalSeconds > 0) {
        const newTime = formatTime(totalSeconds - 1);
        timerEl.textContent = newTime;
      } else {
        clearInterval(countdown);
        timerEl.textContent = '00:00';
      }
    }, 1000);
    startBtn.textContent = 'Pause';
  } else {
    isPaused = true;
    clearInterval(countdown);
    startBtn.textContent = 'Resume';
  }
}

// Function to reset timer
function resetTimer() {
  clearInterval(countdown);
  timerEl.textContent = '25:00';
  isPaused = true;
  startBtn.textContent = 'Start';
}

// Add event listeners to buttons
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Function to add new task
function addTask() {
  if (taskInput.value.trim() !== '') {
    const newTask = document.createElement('li');
    newTask.classList.add('task-item');
    const taskText = document.createElement('div');
    taskText.classList.add('task-text');
    taskText.textContent = taskInput.value;
    newTask.appendChild(taskText);
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      newTask.remove();
    });
    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);
    taskInput.value = '';
  }
}

// Add event listener to "Add Task" button
addBtn.addEventListener('click', addTask);

deleteBtn.addEventListener('click', deleteNote);
function deleteNote() {
  this.parentNode.remove();
}
// get the delete buttons and add event listeners
var deleteBtns = document.querySelectorAll('.delete-btn');
for (var i = 0; i < deleteBtns.length; i++) {
  var deleteBtn = deleteBtns[i];
  deleteBtn.addEventListener('click', deleteNote);
}

// define the deleteNote function
function deleteNote() {
  this.parentNode.remove();
}
