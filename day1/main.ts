
const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
  return a.map((e, i) => [e, b[i]]);
};

export function solvePart1(input: string): number {
  // Parse the input
  const lists = parseInput(input);

  // Create tuples of each of the values in the sets in incrementing order
  const pairs = zip(lists[0].sort(), lists[1].sort());

  // Take the difference between each pair of values
  const differences = pairs.map(([a, b]) => Math.abs(a - b));

  // Sum all the differences
  return differences.reduce((acc, diff) => acc + diff, 0);
}

export function solvePart2(input: string): number {
  // Parse the input
  const [leftList, rightList] = parseInput(input);

  // Count the amount of times each value appears in the right list
  const rightListOccurances = rightList.reduce((acc, value) => {
    return {
      ...acc,
      [value]: (acc[value] || 0) + 1,
    };
  }, {} as Record<number, number>);

  // For each element in the left list, multiply it with the amount of times it appears in the right list
  const products = leftList.map(
    (value) => value * (rightListOccurances[value] ?? 0)
  );

  // Sum all the products for the similarity score
  return products.reduce((acc, product) => acc + product, 0);
}

function parseInput(input: string): [number[], number[]] {
  return (
    input
      // Get each individual line
      .split("\n")
      // Parse each line as a tuple of two numbers
      .map((line) => line.split("   ").map(Number))
      // Create an array of the first and second index of the tuples,
      // this effectively pivots the array
      .reduce(
        ([accumulatorA, accumulatorB], [a, b]) => {
          return [
            [...accumulatorA, a],
            [...accumulatorB, b],
          ];
        },
        [new Array<number>(), new Array<number>()]
      )
  );
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url)
  );
  console.log(solvePart1(input));
  console.log(solvePart2(input));
}
