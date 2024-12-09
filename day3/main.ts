/**
 * A report is a list of numbers
 */
interface MultiplicationOperation {
  type: "multiplication";
  numbers: readonly [number, number];
}

interface DoOperation {
  type: "do";
}

interface DontOperation {
  type: "dont";
}

export type Operations = MultiplicationOperation | DoOperation | DontOperation;

export function solvePart1(input: string): number {
  const operations = parseInput(input);

  const multiplicationOperations = operations.filter(
    (op): op is MultiplicationOperation => op.type === "multiplication"
  );

  return multiplicationOperations.reduce((acc, operation) => {
    const [a, b] = operation.numbers;
    return acc + a * b;
  }, 0);
}

export function solvePart2(input: string): number {
  const operations = parseInput(input);

  const { enabledOperations } = operations.reduce(
    (acc, operation) => {
      if (operation.type === "do") {
        return { enabled: true, enabledOperations: acc.enabledOperations };
      } else if (operation.type === "dont") {
        return { enabled: false, enabledOperations: acc.enabledOperations };
      } else if (acc.enabled) {
        return {
          enabled: acc.enabled,
          enabledOperations: [...acc.enabledOperations, operation],
        };
      } else {
        return acc;
      }
    },
    { enabled: true, enabledOperations: [] } as {
      enabled: boolean;
      enabledOperations: MultiplicationOperation[];
    }
  );

  return enabledOperations.reduce((acc, operation) => {
    const [a, b] = operation.numbers;
    return acc + a * b;
  }, 0);
}

/**
 * Parse the input into a list of operations
 * @param input The puzzel input
 * @returns A list of Operations
 */
export function parseInput(input: string): Operations[] {
  const regex = /mul\((\d+),(\d+)\)|(?:do|don't)\(\)/gi;
  const operations: Operations[] = [];

  let match;
  while ((match = regex.exec(input)) !== null) {
    if (match[1] && match[2]) {
      operations.push({
        type: "multiplication",
        numbers: [parseInt(match[1], 10), parseInt(match[2], 10)] as const,
      });
    } else if (match[0].toLowerCase() === "do()") {
      operations.push({ type: "do" });
    } else if (match[0].toLowerCase() === "don't()") {
      operations.push({ type: "dont" });
    }
  }

  return operations;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url)
  );
  console.log(solvePart1(input));
  console.log(solvePart2(input));
}
