/**
 * A report is a list of numbers
 */
type Report = number[];

export function solvePart1(input: string): number {
  // Parse the input
  const reports = parseInput(input);

  // Count the amount of safe reports
  return reports.filter(isReportSafe).length;
}

export function solvePart2(input: string): number {
  const reports = parseInput(input);

  /**
   * Create all possible dampened reports from one original report.
   * A dampened report is a report where one number has been removed.
   * @param report The original report
   * @returns A list of dampened reports
   */
  const dampenedReports = (report: Report): Report[] =>
    report.map((_, index) => [
      ...report.slice(0, index),
      ...report.slice(index + 1),
    ]);

  // Check for each report if any of the dampened reports are safe
  const safeReports = reports.filter((report) =>
    dampenedReports(report).some(isReportSafe)
  );

  // Return the amount of safe reports
  return safeReports.length;
}

/**
 * Determines if a report is safe, a report is considered safe when
 * either all numbers are gradually increasing or decreasing, and the
 * difference between each number is 1, 2 or 3.
 * @param report The report to determine if it's safe
 */
export const isReportSafe = (report: Report): boolean => {
  // Check if the report is increasing
  const isIncreasing = report.every(
    (value, index) => index === 0 || value > report[index - 1]
  );

  // Check if the report is decreasing
  const isDecreasing = report.every(
    (value, index) => index === 0 || value < report[index - 1]
  );

  const areAllValueDifferencesValid = report.every(
    (value, index) => index === 0 || Math.abs(value - report[index - 1]) <= 3
  );

  return (isIncreasing || isDecreasing) && areAllValueDifferencesValid;
};

/**
 * Parse the input into a list of reports
 * @param input The puzzel input
 * @returns A list of reports
 */
function parseInput(input: string): Report[] {
  return (
    input
      // Get each individual line
      .split("\n")
      // Parse each line as a tuple of two numbers
      .map((line) => line.split(" ").map(Number))
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
