export default function ValidateJSON(data: unknown): void {
  if (data === null || data === undefined) {
    throw new Error("Data cannot be null or undefined.");
  }
  if (typeof data !== "object" && typeof data !== "string") {
    throw new Error("Data must be a JSON object or a JSON string.");
  }

  // Try parsing if it's a string
  if (typeof data === "string") {
    try {
      JSON.parse(data);
    } catch (error) {
      throw new Error("Invalid JSON string. Parsing failed.");
    }
  }
}
