$(document).ready(function() {
    const processButton = $("#processButton");
    const inputOutputArea = $("#inputOutputArea");
  
    function processTextareaInputOnClick() {
      processButton.prop("disabled", true);
  
      const inputText = inputOutputArea.val();
      const lines = inputText.split('\n').filter(line => line.trim() !== "");
      const outputArray = $.map(lines, line => {
        let trimmedLine = line.trim();
        if (trimmedLine.startsWith("'") && trimmedLine.endsWith("'")) {
          trimmedLine = trimmedLine.slice(1, -1);
        }
        return "'" + trimmedLine + "'";
      });
      const outputString = outputArray.join(',\n');
      inputOutputArea.val(outputString);
  
      // Optionally re-enable the button after processing
      // setTimeout(() => {
      //   processButton.prop("disabled", false);
      // }, 500);
    }
  
    // Attach the function to the onclick event of the button
    processButton.on("click", processTextareaInputOnClick);
  });