let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown)
    // time in milliseconds, 10000 ms in 1 sec
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then)



    countdown = setInterval(() => {
        // convert to seconds from ms
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if (secondsLeft < 0) {
            clearInterval(countdown)
            return;

        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    document.title = display;
    // change the tab title to show the time
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}: ${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    // log the button element which is pressed, grab the time attribute
    const seconds = parseInt(this.dataset.time);
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    // run the timer function with seconds
    timer(mins * 60)
    // clear the value in the input
    this.reset();
})

// DONE, review