export function resetSearch(grid, ROWS, COLUMNS) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            grid[row][col].visited = false
            grid[row][col].previous = null
        }
    }
}


export function getNeighbours(cell, grid, ROWS, COLUMNS) {
    const neighbours = []

    const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ]



    for (const [dr, dc] of direction) {
        const newRow = cell.row + dr
        const newCol = cell.column + dc

        if (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLUMNS
        ) {
            const neighbour = grid[newRow][newCol]

            if (neighbour.type !== "wall") {
                neighbours.push(neighbour)
            }
        }
    }



    return neighbours
}