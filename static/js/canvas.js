import { breadthFirstSearch } from "./algorithms/bfs.js";
import { depthFirstSearch } from "./algorithms/dfs.js";
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
const toolBtn = document.querySelectorAll(".toolBtn")
let selectedTool = null
let startCell = null;
const dropdown = document.getElementById("algorithmDropdown");
const selected = document.getElementById("selectedAlgorithm");
const options = document.getElementById("algorithmOptions");
const arrow = document.getElementById("arrow")
const sovleBtn = document.getElementById("solve");
let result
let canClick = true
let boardCleared = true

let selectedAlgorithm = "BFS"

let endCell = null;

let isMouseDown = false;

toolBtn.forEach(button => {
    button.addEventListener("click", () => {
        toolBtn.forEach(btn => {
            btn.classList.remove("selectedTool")
        })

        button.classList.add("selectedTool")

        selectedTool = button.dataset.tool
        console.log(selectedTool)
    })
})
const canvasArea = document.getElementById("canvasArea");
const cellSize = 25;

canvas.width = Math.floor(canvasArea.clientWidth / cellSize) * cellSize;
canvas.height = Math.floor(canvasArea.clientHeight / cellSize) * cellSize;

const ROWS = canvas.height / cellSize;
const COLUMNS = canvas.width / cellSize;

console.log(ROWS, COLUMNS,)




const grid = []
for (let row = 0; row < ROWS; row++) {
    grid[row] = []

    for (let column = 0; column < COLUMNS; column++) {
        grid[row][column] = {
            row: row,
            column: column,
            type: "empty",
            visited: false,
            previos: null,
            distance: Infinity
        }
    }
}


function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            drawCell(grid[row][column])
        }
    }
}


function drawCell(cell) {
    const x = cell.column * cellSize;
    const y = cell.row * cellSize

    switch (cell.type) {

        case "empty":
            ctx.fillStyle = "#F6F0DE";
            break;

        case "wall":
            ctx.fillStyle = "#2F2F2F";
            break;

        case "start":
            ctx.fillStyle = "#3a8847";
            break;

        case "end":
            ctx.fillStyle = "#b13d3d";
            break;

        case "visited":
            ctx.fillStyle = "#8E7DBE";
            break;

        case "path":
            ctx.fillStyle = "#D4A64A";
            break;
    }


    ctx.fillRect(x, y, cellSize, cellSize)
    ctx.strokeStyle = "#C8BFA8";
    ctx.strokeRect(x, y, cellSize, cellSize);
}

drawGrid()


// CLEAR BTN HERE 
document.getElementById("clearBtn").addEventListener("click", () => {

    if (!canClick) return
    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            grid[row][column].type = "empty"
        }
    }

    startCell = null;
    endCell = null

    boardCleared = true


    drawGrid()
})


canvas.addEventListener("mousedown", () => {

    if (!boardCleared) return


    const rect = canvas.getBoundingClientRect();
    const column = Math.floor((event.clientX - rect.left) / cellSize);
    const row = Math.floor((event.clientY - rect.top) / cellSize);

    paintCell(row, column);
    isMouseDown = true
})

window.addEventListener("mouseup", () => {
    isMouseDown = false
})

canvas.addEventListener("mousemove", (event) => {
    if (!isMouseDown) return

    if (selectedTool !== "wall" && selectedTool !== "eraser") return

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top;

    const column = Math.floor(mouseX / cellSize)
    const row = Math.floor(mouseY / cellSize)

    paintCell(row, column)

})



function paintCell(row, column) {
    if (
        row < 0 || row >= ROWS ||
        column < 0 || column >= COLUMNS
    ) return



    console.log(row, column, grid[row][column].type)



    if (selectedTool === "eraser") {
        grid[row][column].type = "empty"


    } else if (selectedTool === "start") {
        if (startCell !== null) {
            startCell.type = "empty"
        }
        grid[row][column].type = "start"
        startCell = grid[row][column]


    } else if (selectedTool === "end") {
        if (endCell !== null) {
            endCell.type = "empty"
        }
        grid[row][column].type = "end"
        endCell = grid[row][column]

    } else if (
        selectedTool === "wall" &&
        (grid[row][column].type === "start" || grid[row][column].type === "end")
    ) {
        return;
    }
    else {
        grid[row][column].type = selectedTool
    }

    drawGrid()
}






//DROPDOWN HANDLER 

selected.addEventListener("click", (e) => {

    e.stopPropagation();
    if (options.style.display === "block") {
        options.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    }
    else {
        options.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
    }

});

document.querySelectorAll(".option").forEach(option => {

    option.addEventListener("click", (e) => {
        e.stopPropagation();

        selectedAlgorithm = option.textContent

        selected.childNodes[0].textContent = option.textContent + " ";

        options.style.display = "none";
        arrow.style.transform = "rotate(0deg)";

    });

});

window.addEventListener("click", (e) => {

    if (!dropdown.contains(e.target)) {
        options.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    }

});



sovleBtn.addEventListener("click", () => {

    if (!startCell || !endCell) {
        alert("Place both Start and End nodes!");
        return
    }


    canClick = false
    boardCleared = false
    switch (selectedAlgorithm) {
        case "BFS":
            result = breadthFirstSearch(startCell, endCell, grid, ROWS, COLUMNS)
            animate(result.visitedOrder, result.path)

        case "DFS":
            result = depthFirstSearch(startCell, endCell, grid, ROWS, COLUMNS)
            animate(result.visitedOrder, result.path)
    }


})



//ANIMTING FUNNTION

function animate(visitedOrder, path) {
    for (let i = 0; i < visitedOrder.length; i++) {
        setTimeout(() => {

            const cell = visitedOrder[i];

            if (cell !== startCell && cell !== endCell) {
                cell.type = "visited";
            }

            drawGrid();
        }, i * 20)
    }

    setTimeout(() => {

        if (!result.found) {
            alert("No Path Found!");
            return;
        }

        for (let i = 0; i < path.length; i++) {

            setTimeout(() => {

                if (path[i] !== startCell && path[i] !== endCell) {
                    path[i].type = "path";
                }

                drawGrid();

            }, i * 40);

        }

    }, visitedOrder.length * 20);


    setTimeout(() => {
        canClick = true;
    }, visitedOrder.length * 20);
}
