
let q = [];
let path = [];

async function startAlgorithm() {
    
    if (rows && cols && start && finish) {
        await lee();
    }
    else {
        alert("Please fill all the data, select start and finish");
    }

}


async function lee() {

    let x, y;

    clearData();
    console.log("before", arr);
    console.log("start", start);
    console.log("finish", finish);
    await addToQueue(1, start.x, start.y);

    while (q.length > 0) {
        x = q[0].x;
        y = q[0].y;

        if (x - 1 >= 0 && arr[x - 1][y] == 0){
            arr[x - 1][y] = arr[x][y] + 1;
            addToQueue(arr[x][y] + 1, x - 1, y);
        }

        if (x + 1 < rows && arr[x + 1][y] == 0){
            arr[x + 1][y] = arr[x][y] + 1;
            addToQueue(arr[x][y] + 1, x + 1, y);
        }

        if (y + 1 < cols && arr[x][y + 1] == 0){
            arr[x][y + 1] = arr[x][y] + 1;
            addToQueue(arr[x][y] + 1, x, y + 1);
        }
        if (y - 1 >= 0 && arr[x][y - 1] == 0){
            arr[x][y - 1] = arr[x][y] + 1;
            addToQueue(arr[x][y] + 1, x, y - 1);
        }

        q.shift();
    }

    if (arr[finish.x][finish.y] > 0) {
        await buildPath();
    }
    else {
        alert("No Path !");
    }

    console.log(arr);
    console.log(path);
}

async function buildPath() {
    let x, y, dist;

    x = finish.x;
    y = finish.y;

    while (arr[x][y] != 1) {
        dist = arr[x][y];

        if (x - 1 >= 0 && arr[x - 1][y] == dist - 1){
            x = x - 1;
            addPath(x, y);
        }
        else if (x + 1 < rows && arr[x + 1][y] == dist - 1){
            x = x + 1;
            addPath(x, y);
        }
        if (y + 1 < cols && arr[x][y + 1] == dist - 1){
            y = y + 1;
            addPath(x, y);
        }
        if (y - 1 >= 0 && arr[x][y - 1] == dist - 1){
            y = y - 1;
            addPath(x, y);
        }
    }

    await printPath();

}

function addToQueue(distance, x, y) {
    q.push({distance, x, y});
}

function addPath(x, y) {
    path.push({x, y});
}

async function printPath() {
    for (let i = path.length - 1; i >= 0; i--) {
        document.querySelector(`[index='${path[i].x}-${path[i].y}']`).classList.add("path");
        const delay = ms => new Promise(res => setTimeout(res, ms))
        await delay(300);
    }
}

function  clearData() {
    q = [];
    path = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arr[i][j] > 1) {
                arr[i][j] = 0;
                document.querySelector(`[index='${i}-${j}']`).classList.remove("path");
            }
        }
    }
}