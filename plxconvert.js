$(document).ready(() => {
  const $delimiterSelect = $("#delimiter");
  const $inputOutputArea = $("#inputOutputArea");
  const $processButton = $("#processButton");
  const $clearContentsButton = $("#clearContents");

  const copyInput = document.getElementById("inputOutputArea");
  const copybtn = document.getElementById("processButton");

  const formatters = {
    ",": (ids) => (ids.length ? ids.join(",") : ""),
    ";": (ids) => (ids.length ? ids.join(";") : ""),
    "|": (ids) => (ids.length ? ids.join("|") : ""),
    plx: (ids) => (ids.length ? ids.map((id) => `'${id}'`).join(",\n") : ""),
  };

  const copyToClipboard = (text) => {
    if (!navigator.clipboard) {
      const tempTextArea = $("<textarea>").appendTo("body").val(text).select();
      document.execCommand("copy");
      tempTextArea.remove();
      return Promise.resolve();
    }
    return navigator.clipboard.writeText(text);
  };

  $processButton.on("click", () => {
    const delimiter = $delimiterSelect.val();
    if (!delimiter) {
      alert("Please select a delimiter.");
      return;
    }
    const paymentIds = $inputOutputArea
      .val()
      .split("\n")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    const formattedText = formatters[delimiter]
      ? formatters[delimiter](paymentIds)
      : "";
    $inputOutputArea.val(formattedText);

    copyInput.disabled = true;
    copybtn.disabled = true;

    copyToClipboard(formattedText).then(() => {
      alert("Copied to clipboard!");
    });
  });

  $clearContentsButton.on("click", () => {
    $inputOutputArea.val("");
    copybtn.disabled = false;
    copyInput.disabled = false;
  });
});
