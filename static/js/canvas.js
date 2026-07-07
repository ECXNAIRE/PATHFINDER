const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
const toolBtn = document.querySelectorAll(".toolBtn")
let selectedTool = null


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

console.log(ROWS, COLUMNS)




const grid = []
for (let row = 0; row < ROWS; row++) {
    grid[row] = []

    for (let column = 0; column < COLUMNS; column++) {
        grid[row][column] = {
            row: row,
            column: column,
            type: "empty"
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
            ctx.fillStyle = "#59C36A";
            break;

        case "end":
            ctx.fillStyle = "#E25757";
            break;

    }


    ctx.fillRect(x, y, cellSize, cellSize)
    ctx.strokeStyle = "#C8BFA8";
    ctx.strokeRect(x, y, cellSize, cellSize);
}

drawGrid()



canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top;

    const column = Math.floor(mouseX/ cellSize)
    const row = Math.floor(mouseY / cellSize)

    console.log(row, column)

    grid[row][column].type = selectedTool

    if(selectedTool === "eraser") {
        grid[row][column].type = "empty"
    } else {
        grid[row][column].type = selectedTool
    }

    drawGrid()
})

