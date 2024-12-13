type PageNumber = number;

type Rule = {
  greater: PageNumber;
  smaller: PageNumber;
};

type Update = Array<PageNumber>;

export function solvePart1(input: string): number {
  const { rules, updates } = parseInput(input);

  const validUpdates = updates.filter((update) => isValidUpdate(update, rules));

  const middlePagesSumOfValidUpdates = validUpdates
    // Get the middle pages of the valid updates
    .map((update) => update[update.length / 2 - 0.5])
    .reduce((sum, pageNumber) => sum + pageNumber, 0);

  return middlePagesSumOfValidUpdates;
}

const isValidUpdate = (update: Update, rules: Rule[]): boolean => {
  return update.every((pageNumber, index) => {
    // Get all pages which come later in this update
    const laterPages = update.slice(index + 1);

    // Check for every later page whether there are no violations of the rules
    return laterPages.every(
      (laterPage) =>
        // Check for every rule whether the rule states that the later page is actually
        // larger than the current page.
        !rules.some(({ greater, smaller }) => {
          return laterPage === greater && pageNumber === smaller;
        })
    );
  });
};

/**
 * -- PART 2 --
 */

export function solvePart2(input: string): number {
  const { rules, updates } = parseInput(input);

  const invalidUpdates = updates.filter((update) => !isValidUpdate(update, rules));

  

  return -1;
}

/**
 * Parse the input of the puzzle
 * @param input The puzzel input
 * @returns The grid with all characters
 */
export function parseInput(input: string): {
  rules: Rule[];
  updates: Update[];
} {
  const [ruleInput, updateInput] = input.split("\n\n");

  const rules = ruleInput.split("\n").map((line) => {
    const [greater, smaller] = line.split("|").map(Number);
    return { greater, smaller };
  });

  const updates = updateInput.split("\n").map((line) => {
    return line.split(",").map(Number);
  });

  return { rules, updates };
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url)
  );
  console.log(solvePart1(input));
  console.log(solvePart2(input));
}
