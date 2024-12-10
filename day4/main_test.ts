import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { solvePart1, solvePart2 } from "./main.ts";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe("solvePart1", () => {
  it("should solve with horizontal input", () => {
    const input = `XMAS
---X
oooo
oooo`;

    assertEquals(solvePart1(input), 1);
  });

  it("should solve with inverted input", () => {
    const input = `SAMX
---X
oooo`;

    assertEquals(solvePart1(input), 1);
  });

  it("should solve with dummy input", () => {
    const input = `123
456
789`;

    assertEquals(solvePart1(input), 0);
  });

  it("should solve with vertical input", () => {
    const input = `X..o
M..o
A..o
S..X`;

    assertEquals(solvePart1(input), 1);
  });

  it("should solve with diagonal input", () => {
    const input = `Xooo
oMoo
ooAo
oooS`;

    assertEquals(solvePart1(input), 1);
  });

  it("should solve with inverted diagonal input", () => {
    const input = `oooX
ooMo
oAoo
Sooo`;

    assertEquals(solvePart1(input), 1);
  });

  it("should solve with intersecting input", () => {
    const input = `Xooo
MMoo
AoAo
SooS`;

    assertEquals(solvePart1(input), 2);
  });

  it("should solve with the given example", () => {
    assertEquals(solvePart1(testInput), 18);
  });
});

describe("solvePart2", () => {
  it("should solve a trivial example", () => {
    const input = `M.S
.A.
M.S`;

    assertEquals(solvePart2(input), 1);
  });

  it("should solve the given example", () => {
    assertEquals(solvePart2(testInput), 9);
  });
});
