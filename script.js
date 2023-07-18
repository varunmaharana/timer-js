const outerCircle = document.querySelector(".c-outer");
const cLeft = document.querySelector(".left");
const cRight = document.querySelector(".right");
const screen = document.querySelector(".screen");
const innerCircle = document.querySelector(".c-inner");
const time = document.querySelector(".time");
const addTen = document.querySelector(".addTen");
const skipFive = document.querySelector(".skipFive");
const clearBtn = document.querySelector(".clear");
const reset = document.querySelector(".reset");

// time to countdown from
const min = 1;
const sec = 1;

// converting time into milliseconds
const minutes = min * 60000;
const seconds = sec * 1000;
let timeRemaining;

// setting time
const setTime = minutes + seconds;

// initial start time
const startTime = Date.now();

// time spent
let spentTime = startTime + setTime;

// setting interval to update timer
const timer = setInterval(countdown);

// starting countdown
countdown();

// actual countdown function
function countdown() {
	// calculating time
	const currTime = Date.now();
	const remainingTime = spentTime - currTime;
    timeRemaining = remainingTime;

	// calculating angles for semicircles
	const angle = (remainingTime / setTime) * 360;

	// indicate progress of clock
	if (angle > 180) {
		cLeft.style.transform = `rotate(${angle}deg)`;
		cRight.style.opacity = "1";
	} else if (angle >= 0 && angle <= 180) {
		cLeft.style.opacity = "0";
		cRight.style.transform = `rotate(${angle - 180}deg)`;
	}

	// timer calculation
	const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
	const secs = Math.floor((remainingTime / 1000) % 60);

	// displaying time
	time.innerHTML = `<span>${String(mins).padStart(
		2,
		"0"
	)}</span> : <span>${String(secs).padStart(2, "0")}</span>`;

	// ending timer
	if (remainingTime < 0) {
		endTimer();
	}
}

function endTimer() {
	clearInterval(timer);
	cLeft.style.opacity = "0";
	cRight.style.opacity = "0";
	screen.style.opacity = "0";

	time.innerHTML = `<span>00</span> : <span>00</span>`;
}

// click event to add 10 seconds to timer
addTen.addEventListener("click", () => {
	if (timeRemaining >= 50000) {
		spentTime = spentTime +  setTime - timeRemaining;
	} else {
		spentTime = spentTime + 10000;
	}
});

// click event to skip 5 seconds to timer
skipFive.addEventListener("click", () => {
    spentTime = spentTime - 5000;
});

// click event to clear timer
clearBtn.addEventListener("click", () => {
	endTimer();
});

// click event to restart/reset timer
reset.addEventListener("click", () => {
	location.reload();
});
