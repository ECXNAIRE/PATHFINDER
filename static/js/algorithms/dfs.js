import { resetSearch, getNeighbours } from "../helper.js";

export function depthFirstSearch(startCell, endCell, grid, ROWS, COLUMNS) {
    resetSearch(grid, ROWS, COLUMNS)

    const visitedOrder = []
    const stack = []
    const path = []
    let found = false


    startCell.visited = true
    stack.push(startCell)

    while (stack.length > 0) {
        const current = stack.pop()

        visitedOrder.push(current)

        if (current === endCell) {
            found = true
            break
        }

        const neighbours = getNeighbours(current, grid, ROWS, COLUMNS)

        for (const neighbour of neighbours) {
            if (neighbour.visited) continue

            neighbour.visited = true
            neighbour.previous = current

            stack.push(neighbour)
        }
    }


    if (found) {
        let current = endCell
        while (current !== null) {
            path.push(current)
            current = current.previous
        }

        path.reverse()
    }


    return {
        visitedOrder,
        path,
        found
    }
}