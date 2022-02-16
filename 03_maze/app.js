const {Engine, Render, World, Bodies, Runner, MouseConstraint, Mouse} = Matter;

const width = 800;
const height = 600;
const cells = 3;

const engine = Engine.create()
const {world} = engine;
const render = Render.create({
	element: document.body,
	engine,
	options: {
		wireframes: false,
		width,
		height
	}
});
Render.run(render)
Runner.run(Runner.create(), engine)

World.add(world, MouseConstraint.create(engine, {
	mouse: Mouse.create(render.canvas)
}))

// Walls
const walls = [
	Bodies.rectangle(400, 0, 800, 40, {isStatic: true}),
	Bodies.rectangle(400, 600, 800, 40, {isStatic: true}),
	Bodies.rectangle(0, 300, 40, 600, {isStatic: true}),
	Bodies.rectangle(800, 300, 40, 600, {isStatic: true}),
]

World.add(world, walls)

// Generate Maze
const grid = Array(cells).fill(null)
	.map(() => Array(cells).fill(false))

const verticals = Array(cells)
	.fill(null)
	.map(() => Array(cells - 1).fill(false))

const horizontals = Array(cells - 1)
	.fill(cells - 1)
	.map(() => Array(cells).fill(false))

const startRow = Math.floor(Math.random() * cells)
const startColumn = Math.floor(Math.random() * cells)

const stepThroughCells = (row, column) => {
	// If I have visited the cell, then return
	if (grid[row][column]) {
		return;
	}

	// Mark this cell as being visited
	grid[row][column] = true;

	// Assemble the randomly-list of neighbor
	const neighbors = [
		[row - 1, column],
		[row, column + 1],
		[row + 1, column],
		[row, column - 1]
	];
}
stepThroughCells(startRow, startColumn);