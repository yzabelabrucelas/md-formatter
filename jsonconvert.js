const inputText = document.getElementById("inputText");
const copyButton = document.getElementById("copyButton");
const outputJson = document.getElementById("outputJson");
const clearButton = document.getElementById("clearButton");
const exportGpaste = document.getElementById("exportGpaste");

inputText.addEventListener("input", () => {
  const jsonString = inputText.value.trim();

  try {
    // Attempt to parse the JSON string
    const parsedJson = JSON.parse(jsonString);

    // Use JSON.stringify with 2 spaces for pretty printing
    const formattedJson = JSON.stringify(parsedJson, null, 2);
    outputJson.value = formattedJson;
  } catch (error) {
    // Handle JSON parsing errors by displaying them in the output textarea
    outputJson.value = `Error: Invalid JSON format. Please check your input for syntax errors.\n\nDetails: ${error.message}`;
    console.error("JSON parsing error:", error);
  }
});

copyButton.addEventListener("click", () => {
  if (outputJson.value && !outputJson.value.startsWith("Error:")) {
    outputJson.select();

    document.execCommand("copy");
    alert("Formatted JSON copied to clipboard!");
    const originalOutput = outputJson.value;
  } else if (outputJson.value.startsWith("Error:")) {
    outputJson.value =
      "Info: Cannot copy error message. Please fix the JSON first.";
  } else {
    outputJson.value =
      "Info: No formatted JSON to copy. Please format JSON first.";
  }
});

clearButton.addEventListener("click", () => {
  inputText.value = "";
  outputJson.value = "";
  copyButton.disabled = false;
  inputText.disabled = false;
});

exportGpaste.addEventListener("click", () => {
  //TODO: add function to export
});
