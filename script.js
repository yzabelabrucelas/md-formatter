function redirectTo(url) {
  window.location.href = url;
}

const inputText = document.getElementById("inputText");
const outputMarkdown = document.getElementById("outputMarkdown");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");

function convertToMarkdownTable(text) {
  const lines = text.trim().split("\n");
  if (lines.length === 0) {
    return "";
  }

  const data = lines.map((line) => line.split("\t"));
  const columnWidths = [];
  data.forEach((row) => {
    row.forEach((cell, colIndex) => {
      if (!columnWidths[colIndex]) {
        columnWidths[colIndex] = 0;
      }
      columnWidths[colIndex] = Math.max(columnWidths[colIndex], cell.length);
    });
  });

  let markdownTable = "";
  const header = data[0];
  markdownTable +=
    header.map((cell, i) => cell.padEnd(columnWidths[i])).join(" | ") + "\n";
  markdownTable +=
    columnWidths.map((width) => "-".repeat(width)).join(" | ") + "\n";

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    markdownTable +=
      row.map((cell, j) => cell.padEnd(columnWidths[j] || 0)).join(" | ") +
      "\n";
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
});

copyButton.addEventListener("click", () => {
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
