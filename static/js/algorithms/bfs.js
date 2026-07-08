import { resetSearch, getNeighbours } from "../helper.js"

export function breadthFirstSearch(startCell, endCell, grid, ROWS, COLUMNS) {
    resetSearch(grid, ROWS, COLUMNS);

    const visitedOrder = []
    const queue = []
    const path = []
    let current = endCell

    startCell.visited = true
    queue.push(startCell)

    while (queue.length > 0) {
        const current = queue.shift()

        visitedOrder.push(current)

        if (current === endCell) {
            console.log("found end")
            break;
        }

        const neighbours = getNeighbours(current, grid, ROWS, COLUMNS)

        for (const neighbour of neighbours) {
            if (neighbour.visited) continue

            neighbour.visited = true
            neighbour.previous = current

            queue.push(neighbour)
        }
    }


    while (current !== null) {
        path.push(current)
        current = current.previous
    }

    path.reverse()


    console.log(path, visitedOrder)
    return {
        visitedOrder,
        path
    }


}