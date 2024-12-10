type Line = string[];
type Grid = Line[];

export function solvePart1(input: string): number {
  const grid = parseInput(input);

  // Rotate the grid 3 times to get all possible projections,
  // this gets all horizontal and vertical projections
  const allGridRotations = [grid];
  for (let i = 0; i < 3; i++) {
    allGridRotations.push(
      turnGrid(allGridRotations[allGridRotations.length - 1])
    );
  }

  // Add all diagnoal projections
  const projections = allGridRotations.flatMap((g) => [
    g,
    transposeGrid(skewGrid(g)),
  ]);

  return (
    projections
      // Calculate the amount of matches in each projection of the grid
      .map((g) => matchesInGrid(g))
      // Sum up the matches
      .reduce((acc, matches) => acc + matches, 0)
  );
}

/**
 * Count the amount of matches in a line
 * @param line The line to check for matches
 * @returns The amount of matches in the line
 */
const matchesInLine = (line: Line): number => {
  const matches = line.join("").matchAll(/XMAS/g);

  return matches.toArray().length;
};

/**
 * Count the amount of matches in a grid
 * @param grid The grid to check for matches
 * @returns The amount of matches in the grid
 */
const matchesInGrid = (grid: Grid): number => {
  return grid.reduce((acc, line) => acc + matchesInLine(line), 0);
};

/**
 * Mirror a grid horizontally
 * @param grid The grid to mirror
 * @returns The grid mirrored horizontally
 */
const mirrorGridHorizontal = (grid: Grid): Grid => {
  return grid.map((line) => [...line].reverse());
};

/**
 * Turn a grid 90 degrees clockwise
 * @param grid The grid to turn
 * @returns The grid turned 90 degrees
 */
const turnGrid = (grid: Grid): Grid => {
  return mirrorGridHorizontal(transposeGrid(grid));
};

/**
 * Skew a grid
 * @param grid The grid to skew
 * @returns The grid skewed
 */
const skewGrid = (grid: Grid): Grid => {
  return grid.map((line, index) => [
    ...Array.from<string>({ length: index }).fill(" "),
    ...line,
    ...Array.from<string>({ length: grid.length - index }).fill(" "),
  ]);
};

const transposeGrid = (grid: Grid): Grid => {
  return grid[0].map((_, index) => grid.map((line) => line[index]));
};

/**
 * -- PART 2 --
 */

export function solvePart2(input: string): number {
  const grid = parseInput(input).map((line) =>
    line.map((char) => (char === "X" ? "." : char))
  );


  // First we find all diagonal matches in one direction
  const transposed = transposeGrid(skewGrid(grid));

  const horizontalMatches = transposed.map((line) =>
    line.join("").replaceAll(/MAS/g, "M S").replaceAll(/SAM/g, "S M").split("")
  );
  const straightenedGrid = mirrorGridHorizontal(
    skewGrid(turnGrid(horizontalMatches))
  ).map((line) => line.join("").trim().split(""));

  // Then, we turn the grid by 90 degrees and find all matches which intersect with an existing match
  const alsoVerticalMatches = transposeGrid(
    skewGrid(turnGrid(straightenedGrid))
  ).map((line) =>
    line
      .join("")
      .replaceAll(/M\ S/g, "M#S")
      .replaceAll(/S\ M/g, "S#M")
      .split("")
  );

  // console.log("Detected matches:");
  // printGrid(
  //   mirrorGridHorizontal(skewGrid(turnGrid(alsoVerticalMatches))).map((line) =>
  //     line.join("").trim().split("")
  //   )
  // );

  return alsoVerticalMatches.reduce(
    (acc, line) => acc + line.filter((char) => char === "#").length,
    0
  );
}

/**
 * Parse the input of the puzzle
 * @param input The puzzel input
 * @returns The grid with all characters
 */
export function parseInput(input: string): Grid {
  return input.split("\n").map((line) => line.split(""));
}

/**
 * -- DEBUG --
 */

const printGrid = (grid: Grid) => {
  grid.forEach((line) => {
    console.debug(line.join(""));
  });

  console.log();
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url)
  );
  console.log(solvePart1(input));
  console.log(solvePart2(input));
}
