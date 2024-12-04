let startTime;
let updatedTime;
let running = false;
let lapTimes =[];
let interval;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

//Start
function startStopwatch() {
    startTime = Date.now() - (updatedTime || 0);
    interval = setInterval(updateTime, 1);
    running = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
}

// Pause 
function pauseStopwatch() {
    clearInterval(interval);
    running = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

// Reset 
function resetStopwatch() {
    clearInterval(interval);
    running = false;
    updatedTime = 0;
    display.innerHTML = '00:00:00';
    lapTimes = [];
    lapList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
}

// Update the stopwatch display
function updateTime() {
    updatedTime = Date.now() - startTime;
    const hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    display.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Format the time to always show two digits
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Record  lap time
function recordLap() {
    if (!running) return;
    const lapTime = display.innerHTML;
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

// Event Listeners for buttons
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
