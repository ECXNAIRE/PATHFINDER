import { resetSearch, getNeighbours } from "../helper.js";

export function astar(startCell, endCell, grid, ROWS, COLUMNS) {
    resetSearch(grid, ROWS, COLUMNS)


    const visitedOrder = []
    const path = []
    const openList = []
    let found = false


    startCell.g = 0
    startCell.h = heuristic(startCell, endCell)
    startCell.f = startCell.g + startCell.h


    openList.push(startCell)

    while (openList.length > 0) {
        openList.sort((a, b) => a.f - b.f);

        const current = openList.shift()

        current.visited = true

        visitedOrder.push(current)

        if (current === endCell) {
            found = true;
            break;
        }

        const neighbours = getNeighbours(current, grid, ROWS, COLUMNS);

        for (const neighbour of neighbours) {
            if (neighbour.visited) continue


            const newG = current.g + 1

            if (newG < neighbour.g) {
                neighbour.g = newG;
                neighbour.h = heuristic(neighbour, endCell);
                neighbour.f = neighbour.g + neighbour.h;

                neighbour.previous = current;

                if (!openList.includes(neighbour)) {
                    openList.push(neighbour);
                }
            }
        }
    }

    if (found) {
        let current = endCell;

        while (current !== null) {
            path.push(current);
            current = current.previous;
        }

        path.reverse();
    }

    return {
        visitedOrder,
        path,
        found
    }
}


function heuristic(cell, endCell) {
    return Math.abs(cell.row - endCell.row) +
        Math.abs(cell.column - endCell.column);
}