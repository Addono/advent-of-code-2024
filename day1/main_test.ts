import { assertEquals } from "@std/assert";
import { solvePart1, solvePart2 } from "./main.ts";

const demoInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test(function solvePart1WithDemoInput() {
  assertEquals(solvePart1(demoInput), 11);
});

Deno.test(function solvePart1WithDemoInput() {
  assertEquals(solvePart2(demoInput), 31);
});
