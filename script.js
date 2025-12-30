const SIZE = 9;
const gridElement = document.getElementById("sudoku-grid");

/* Create Sudoku Grid */
for (let i = 0; i < SIZE; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < SIZE; j++) {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        cell.appendChild(input);
        row.appendChild(cell);
    }
    gridElement.appendChild(row);
}

function getGrid() {
    const grid = [];
    for (let i = 0; i < SIZE; i++) {
        grid[i] = [];
        for (let j = 0; j < SIZE; j++) {
            const value = gridElement.rows[i].cells[j].firstChild.value;
            grid[i][j] = value === "" ? 0 : parseInt(value);
        }
    }
    return grid;
}

function setGrid(grid) {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            gridElement.rows[i].cells[j].firstChild.value =
                grid[i][j] === 0 ? "" : grid[i][j];
        }
    }
}

function isValid(grid, row, col, num) {
    for (let i = 0; i < SIZE; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve(grid) {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    const grid = getGrid();
    if (solve(grid)) {
        setGrid(grid);
    } else {
        alert("No solution exists!");
    }
}

function clearGrid() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            gridElement.rows[i].cells[j].firstChild.value = "";
        }
    }
}
