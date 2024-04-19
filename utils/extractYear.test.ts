import { extractYear } from "./extractYear";

describe("extractYear function", () => {
  test("should return the year from a date string", () => {
    // Arrange
    const dateString = "2022-05-12";

    // Act
    const year = extractYear(dateString);

    // Assert
    expect(year).toBe("2022");
  });

  test("should return empty string if input is not in expected format", () => {
    // Arrange
    const dateString = "2022/05/12"; // Invalid date format

    // Act
    const year = extractYear(dateString);

    // Assert
    expect(year).toBe("");
  });
});
