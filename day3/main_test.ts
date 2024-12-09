import { assertEquals } from "@std/assert";
import { solvePart1, solvePart2, parseInput, Operations } from "./main.ts";

const demoInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

Deno.test(function parseInputTest() {
  const expected: Operations[] = [
    { type: 'multiplication', numbers: [2, 4] },
    { type: 'dont' },
    { type: 'multiplication', numbers: [5, 5] },
    { type: 'multiplication', numbers: [11, 8] },
    { type: 'do' },
    { type: 'multiplication', numbers: [8, 5] }
  ];
  assertEquals(parseInput(demoInput), expected);
});

Deno.test(function solvePart1WithDemoInput() {
  assertEquals(solvePart1(demoInput), 161);
});

Deno.test(function solvePart2WithDemoInput() {
  assertEquals(solvePart2(demoInput), 48);
});
