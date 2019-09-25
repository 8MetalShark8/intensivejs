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
    speed: 3,
    traffic: 3
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight/heightElement +1;
}

start.addEventListener ("click", startGame);
document.addEventListener ("keydown", startRun);
document.addEventListener ("keyup", stopRun);

function startGame(){
    start.classList.add("hide");

    for (let i = 0; i < getQuantityElements(90); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 90) + 'px';
        line.y = i * 90;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(90 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(\'./images/enemy.png\') center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    settings.start = true;
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame(){
    if (settings.start){
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && settings.x > 0){
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)){
            settings.x += settings.speed;
        }
        if (keys.ArrowUp && settings.y > 0){
            settings.y -= settings.speed;
        }
        if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
            settings.y += settings.speed;
        }

        car.style.left = settings.x + "px";
        car.style.top = settings.y + "px";

        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += settings.speed;
        line.style.top = line.y + "px";

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -90;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        item.y += settings.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight){
            item.y = -100 *settings.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}