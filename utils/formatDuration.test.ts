import { formatDuration } from "./formatDuration";

describe("formatDuration", () => {
  it("should return the formatted duration for minutes less than an hour", () => {
    expect(formatDuration(30)).toBe("30min");
    expect(formatDuration(0)).toBe("0min");
  });

  it("should return the formatted duration for whole hours", () => {
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(120)).toBe("2h");
  });

  it("should return the formatted duration for hours and remaining minutes", () => {
    expect(formatDuration(90)).toBe("1h 30min");
    expect(formatDuration(150)).toBe("2h 30min");
  });

  it("should return empty for null", () => {
    expect(formatDuration(null)).toBe("");
  });
});
