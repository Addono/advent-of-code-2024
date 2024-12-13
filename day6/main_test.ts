import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { solvePart1, solvePart2 } from "./main.ts";

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("solvePart1", () => {
  it("should solve with the given example", () => {
    assertEquals(solvePart1(testInput), 41);
  });
});

// describe("solvePart2", () => {
//   it("should solve the given example", () => {
//     assertEquals(solvePart2(testInput), 123);
//   });
// });
