//index script
function showAlert(message) {
  alert(message);
}

function redirectTo(url) {
  window.location.href = url;
}

// md-converter script
function copyToClipboard(elementId) {
  const textarea = document.getElementById(elementId);
  textarea.select();
  document.execCommand("copy");
  // Optional: Provide visual feedback
  const copyButton = textarea.nextElementSibling;
  const originalText = copyButton.textContent.trim();
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = originalText;
  }, 1500);
}

// You would add your JavaScript logic here to convert the input data
// and populate the markdownOutput and tabularOutput textareas.
document.getElementById("inputData").addEventListener("input", function () {
  const input = this.value;
  // Example (replace with your actual conversion logic)
  const markdown = convertToMarkdown(input);
  const tabular = convertToTabular(input);
  document.getElementById("markdownOutput").value = markdown;
  document.getElementById("tabularOutput").value = tabular;
});

function convertToMarkdown(data) {
  // Replace this with your actual Markdown conversion logic
  const lines = data.trim().split("\n");
  if (lines.length === 0) return "";
  const header = lines[0].split("\t").map((item) => item.trim());
  const separator = header.map(() => ":---:").join("|");
  const body = lines
    .slice(1)
    .map((line) =>
      line
        .split("\t")
        .map((item) => item.trim())
        .join("|")
    )
    .join("\n");
  return header.join("|") + "\n" + separator + "\n" + body;
}

function convertToTabular(data) {
  // Replace this with your actual Tabular conversion logic
  return data; // For now, just returns the original data
}
