export function extractYear(dateString: string | null | undefined): string {
  if (dateString === null || dateString === undefined) {
    return "";
  }
  const parts = dateString.split("-");
  if (parts.length !== 3) return "";
  return parts[0];
}
