// new converter instead of script.js
const inputText = document.getElementById("inputText");
const outputMarkdown = document.getElementById("outputMarkdown");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");

function convertToMarkdownTable(text) {
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== ""); // Filter out empty lines
  if (lines.length === 0) {
    return ""; // Return empty string if no valid lines
  }

  // Split each line by tab to get cells. If no tabs, it's a single column.
  const data = lines.map((line) => line.split("\t"));

  // Determine the maximum number of columns to handle cases where rows might have different column counts
  const maxColumns = data.reduce((max, row) => Math.max(max, row.length), 0);

  // Initialize column widths
  const columnWidths = Array(maxColumns).fill(0);

  // Calculate maximum width for each column
  data.forEach((row) => {
    row.forEach((cell, colIndex) => {
      // Ensure columnWidths has enough elements for the current column
      if (colIndex >= columnWidths.length) {
        columnWidths[colIndex] = 0; // Should not happen if maxColumns is correctly calculated
      }
      columnWidths[colIndex] = Math.max(columnWidths[colIndex], cell.length);
    });
  });

  let markdownTable = "";

  // Header row
  const header = data[0];
  // Pad cells and join with ' | ', then wrap with leading/trailing pipes
  markdownTable +=
    "| " +
    header
      .map(
        (cell, i) => cell.padEnd(columnWidths[i] || 0) // Use 0 if columnWidths[i] is undefined (e.g., if a row has more columns than the first)
      )
      .join(" | ") +
    " |\n";

  // Separator row (e.g., |---|---|)
  markdownTable +=
    "| " +
    columnWidths
      .map(
        (width) => "-".repeat(Math.max(3, width)) // Ensure minimum width of 3 for separator (e.g., for empty headers)
      )
      .join(" | ") +
    " |\n";

  // Data rows (starting from the second line)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    // Pad cells, ensuring each row has cells for all columns (fill with empty string if missing)
    const paddedRow = Array(maxColumns)
      .fill("")
      .map((_, j) => {
        const cellContent = row[j] || ""; // Use empty string if cell is missing
        return cellContent.padEnd(columnWidths[j] || 0);
      });
    markdownTable += "| " + paddedRow.join(" | ") + " |\n";
  }

  return markdownTable;
}

inputText.addEventListener("input", () => {
  const pastedText = inputText.value;
  outputMarkdown.value = convertToMarkdownTable(pastedText);
});

clearButton.addEventListener("click", () => {
  inputText.value = "";
  outputMarkdown.value = "";
  copyButton.disabled = false;
  inputText.disabled = false;
});

copyButton.addEventListener("click", () => {
  inputText.disabled = true;
  copyButton.disabled = true;

  if (outputMarkdown.value) {
    outputMarkdown.select();

    try {
      document.execCommand("copy");
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy!");
    }
  } else {
    alert("Nothing to copy!");
  }
});
