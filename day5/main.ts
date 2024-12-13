type PageNumber = number;

type Rule = {
  greater: PageNumber;
  smaller: PageNumber;
};

type Update = Array<PageNumber>;

export function solvePart1(input: string): number {
  const { rules, updates } = parseInput(input);

  const validUpdates = updates.filter((update) => isValidUpdate(update, rules));

  const middlePagesSumOfValidUpdates = getMiddleSumOfUpdates(validUpdates);

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

const getMiddleSumOfUpdates = (updates: Update[]): number => {
  return (
    updates
      // Get the middle pages of the valid updates
      .map((update) => update[update.length / 2 - 0.5])
      .reduce((sum, pageNumber) => sum + pageNumber, 0)
  );
};

/**
 * -- PART 2 --
 */

export function solvePart2(input: string): number {
  const { rules, updates } = parseInput(input);

  // Get all updates which are invalid
  const invalidUpdates = updates.filter(
    (update) => !isValidUpdate(update, rules)
  );

  /**
   * Fixes an invalid update by reordering the pages in the update
   * so that the rules are not violated anymore.
   * @param update The invalid update
   * @returns A fixed version of the update
   */
  const fixUpdate = (update: Update, rules: Rule[]): Update => {
    // Clone the update to avoid mutating the original, then 
    // sort the update such that none of the rules are violated
    return [...update].sort((a, b) => {
      for (const rule of rules) {
        if (a === rule.smaller && b === rule.greater) {
          return -1;
        }
        if (a === rule.greater && b === rule.smaller) {
          return 1;
        }
      }

      return 0;
    });
  };

  // Fix all invalid updates
  const fixedUpdates = invalidUpdates.map((update) => fixUpdate(update, rules));

  // Get the sum of the middle pages of the fixed updates
  const middlePagesSumOfFixedUpdates = getMiddleSumOfUpdates(fixedUpdates);

  return middlePagesSumOfFixedUpdates;
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
