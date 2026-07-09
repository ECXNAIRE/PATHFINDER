import { resetSearch, getNeighbours } from "../helper.js";
export function disjkstra(startCell, endCell, grid, ROWS, COLUMNS) {

    resetSearch(grid, ROWS, COLUMNS)

    const visitedOrder = []
    const path = []
    const unvisited = []
    let found = false


    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            grid[row][column].distance = Infinity
            unvisited.push(grid[row][column])


        }
    }


    startCell.distance = 0

    while (unvisited.length > 0) {
        unvisited.sort((a, b) => a.distance - b.distance)

        const current = unvisited.shift()


        if (current.type === "wall") continue

        if (current.distance === Infinity) break


        current.visited = true
        visitedOrder.push(current)


        if (current === endCell) {
            found = true;
            break;
        }

        const neighbours = getNeighbours(current, grid, ROWS, COLUMNS);

        for (const neighbour of neighbours) {

            if (neighbour.visited) continue;

            const newDistance = current.distance + 1;

            if (newDistance < neighbour.distance) {
                neighbour.distance = newDistance;
                neighbour.previous = current;
            }
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