type Position = { x: number; y: number };

type Lab = {
  guard: {
    position: Position;
    direction: number;
  };
  obstacles: Position[];
  dimensions: { width: number; height: number };
};

export function solvePart1(input: string): number {
  const { guard, obstacles, dimensions } = parseInput(input);

  /**
   * Get the next step of the guard
   * @param guard The guard
   * @param obstacles The obstacles
   * @returns The next position of the guard or null if the guard leaves the lab
   */
  const getNextStepOfGuard = (
    guard: Lab["guard"],
    obstacles: Lab["obstacles"],
    dimensions: Lab["dimensions"]
  ): Position | null => {
    const { x, y } = guard.position;

    // Get the next position
    const nextPosition = {
      x: x + Math.round(Math.cos(guard.direction)),
      y: y + Math.round(Math.sin(guard.direction)),
    };

    // Check if the guard leaves the lab
    if (
      nextPosition.x < 0 ||
      nextPosition.y < 0 ||
      nextPosition.x >= dimensions.width ||
      nextPosition.y >= dimensions.height
    ) {
      return null;
    }

    // Check if the next position is an obstacle
    if (
      obstacles.some(
        (obstacle) =>
          obstacle.x === nextPosition.x && obstacle.y === nextPosition.y
      )
    ) {
      guard.direction = guard.direction + Math.PI / 2;
    } else {
      guard.position = nextPosition;
    }

    return guard.position;
  };

  // Take steps until the guard leaves the lab
  let steps: Position[] = [];
  do {
    const step = getNextStepOfGuard(guard, obstacles, dimensions);

    // Stop if the guard leaves the lab
    if (!step) {
      break;
    }

    steps = [...steps, step];
  } while (true);

  // Get the amount of unique steps the guard took
  const uniqueSteps = new Set(steps.map((step) => `${step.x},${step.y}`));

  return uniqueSteps.size;
}

/**
 * -- PART 2 --
 */

export function solvePart2(input: string): number {
  return -1;
}

/**
 * Parse the input of the puzzle
 * @param input The puzzel input
 * @returns The grid with all characters
 */
export function parseInput(input: string): Lab {
  const grid = input.split("\n").map((line) => line.split(""));

  // Get all cells as one long list, such that we can iterate over them
  const cells = grid.flatMap((line, y) =>
    line.map((cell, x) => {
      return {
        cell,
        x,
        y,
      };
    })
  );

  // Find the position of the guard
  const guardCell = cells.find((cell) => cell.cell === "^");

  if (!guardCell) {
    throw new Error("Guard not found");
  }

  const guard: Lab["guard"] = {
    position: { x: guardCell.x, y: guardCell.y },
    direction: -Math.PI / 2, // Starts facing up
  };

  // Find the position of all obstacles
  const obstacles = cells
    .filter((cell) => cell.cell === "#")
    .map((cell) => ({ x: cell.x, y: cell.y }));

  // Get the dimensions of the lab
  const dimensions = {
    width: grid[0].length,
    height: grid.length,
  };

  return {
    guard,
    obstacles,
    dimensions,
  };
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url)
  );
  console.log(solvePart1(input));
  console.log(solvePart2(input));
}
