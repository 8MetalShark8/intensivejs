const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

const keys = {
    ArrowDown: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowLeft: false
};

const settings = {
    start: false,
    score: 0,
    speed: 3
};

start.addEventListener ("click", startGame);
document.addEventListener ("keydown", startRun);
document.addEventListener ("keyup", stopRun);

function startGame(){
    start.classList.add("hide");
    settings.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
}

function playGame(){
    console.log('go');
    if (settings.start){
        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
    settings.start = false;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}