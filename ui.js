let rowsInput = document.getElementById("rows-input");
let colsInput = document.getElementById("cols-input");
let startBtn = document.getElementById("start-btn");
let finishBtn = document.getElementById("finish-btn");
let wallBtn = document.getElementById("wall-btn");
let labirint = document.getElementById("labirint");
let arr = [];

let rows = 0;
let cols = 0;
let start;
let finish;
let isWallEnabled = false;
let isStartEnabled = false;
let isFinishEnabled = false;


const labirintWidth = 600;
const labirintHeight = 600;

rowsInput.addEventListener('keyup', (event) => {
    buildLabirint();
});

colsInput.addEventListener('keyup', (event) => {
    buildLabirint();
});

function buildLabirint() {
    rows = rowsInput.value;
    cols = colsInput.value;

    if (rows && cols) {
        if (rows <= 25 && cols <= 25) {
            drawLabirint();
            addListeners()
        }
        else {
            alert("Maximum 25 rows or columns are allowed");
        }
    }

}



function drawLabirint() {
    let cellWidth = labirintWidth / cols;
    let cellHeight = labirintHeight / rows;
    start = finish = null;

    arr = [];
    labirint.innerHTML = "";
    debugger;
    for (let i = 0; i < rows; i++) {
        arr.push(new Array(cols));
        for (let j = 0; j < cols; j++) {
            arr[i][j] = 0;
            labirint.innerHTML += `
            <div class="cell" 
                 style="width: ${cellWidth}px; height: ${cellHeight}px;"
                 index="${i}-${j}">
            `
        }
        
    }


}

function addListeners() {
    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', addWall, false);
        cells[i].addEventListener('click', addStart, false);
        cells[i].addEventListener('click', addFinish, false);

    }
}

function addWall(event) {
    let sourceCell = event.target;
    if (isWallEnabled) {

        sourceCell.classList.remove("start");
        sourceCell.classList.remove("finish");
        sourceCell.classList.remove("path");


        let index;
        if (sourceCell.classList.contains("wall")) {
            sourceCell.classList.remove("wall");
            index = setCell(sourceCell, 0);
        }
        else {
            sourceCell.classList.add("wall");
            index = setCell(sourceCell, -1);
        }

        if (start &&
            index.x == start.x && index.y == start.y) {
                start = null;
            }
        
        if (finish &&
                index.x == finish.x && index.y == finish.y) {
                    finish = null;
                }
    }
}

function addStart(event) {
    let sourceCell = event.target;
    if (isStartEnabled) {
        clearStart();

        sourceCell.classList.remove("wall");
        sourceCell.classList.remove("finish");
        sourceCell.classList.remove("path");
        sourceCell.classList.add("start");


        start = setCell(sourceCell,  1);
        console.log("start seted ", start);
    }
}

function addFinish(event) {
    let sourceCell = event.target;
    if (isFinishEnabled) {
        clearFinish();
        sourceCell.classList.remove("wall");
        sourceCell.classList.remove("start");
        sourceCell.classList.remove("path");
        sourceCell.classList.add("finish");

        finish = setCell(sourceCell, 0);
        console.log("finish seted ", finish);

    }
}

function setCell(sourceCell,  val) {
    let indexStr = sourceCell.getAttribute("index");
    let index = getIndexes(indexStr);
    arr[index.x][index.y] = val;

    return index;
}

function clearFinish() {
    if (finish) {
        arr[finish.x][finish.y] = 0;

        let element = document.querySelector(`[index='${finish.x}-${finish.y}']`);
        element.classList.remove('finish');
        finish = null;


    }
}

function clearStart() {
    if (start) {
        arr[start.x][start.y] = 0;
        let element = document.querySelector(`[index='${start.x}-${start.y}']`);
        element.classList.remove('start');
        start = null;
    }
}

function selectWall(event) {
    isWallEnabled = !isWallEnabled;
    isStartEnabled = false;
    isFinishEnabled = false;

    finishBtn.classList.remove("active");
    startBtn.classList.remove("active");
    event.target.classList.toggle("active");
}

function selectStart(event) {
    isStartEnabled = !isStartEnabled;
    event.target.classList.toggle("active");

    isFinishEnabled = false;
    finishBtn.classList.remove("active");

    isWallEnabled = false;
    wallBtn.classList.remove("active");


}

function selectFinish(event) {
    isFinishEnabled = !isFinishEnabled;
    event.target.classList.toggle("active");

    isStartEnabled = false;
    startBtn.classList.remove("active");

    isWallEnabled = false;
    wallBtn.classList.remove("active");
}

function getIndexes(str) {
    let result = str.split('-');

    return {
        x: Number(result[0]),
        y: Number(result[1])
    };
}