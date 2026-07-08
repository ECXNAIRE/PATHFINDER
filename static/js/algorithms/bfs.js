import { resetSearch,getNeighbours } from "../helper.js"

export function breadthFirstSearch(startCell, endCell, grid, ROWS, COLUMNS) {
    resetSearch(grid, ROWS, COLUMNS);

    const queue = []

    startCell.visited = true
    queue.push(startCell)

    while (queue.length > 0) {
        const current = queue.shift()

        if(current === endCell) {
            console.log("found end")
            break;
        }

        const neighbours = getNeighbours(current, grid, ROWS, COLUMNS)

        for(const neighbour of neighbours) {
            if(neighbour.visited) continue

            neighbour.visited = true
            neighbour.previous = current

            queue.push(neighbour)
        }
    }
}