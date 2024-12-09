import { assertEquals } from "@std/assert";
import { solvePart1, solvePart2, isReportSafe } from "./main.ts";

const demoInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

Deno.test(function solvePart1WithDemoInput() {
  assertEquals(solvePart1(demoInput), 2);
});

Deno.test(function solvePart2WithDemoInput() {
  assertEquals(solvePart2(demoInput), 4);
});

Deno.test(function testIsReportSafe() {
  assertEquals(isReportSafe([7, 6, 4, 2, 1]), true);
  assertEquals(isReportSafe([1, 2, 7, 8, 9]), false);
  assertEquals(isReportSafe([9, 7, 6, 2, 1]), false);
  assertEquals(isReportSafe([1, 3, 2, 4, 5]), false);
  assertEquals(isReportSafe([8, 6, 4, 4, 1]), false);
  assertEquals(isReportSafe([1, 3, 6, 7, 9]), true);
});
