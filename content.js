// Function to show translation above selected text
function showTranslationAboveText(translation, x, y) {
  const translationDiv = document.createElement("div");
  translationDiv.style.position = "absolute";
  translationDiv.style.left = `${x}px`;
  translationDiv.style.top = `${y - 20}px`; // Adjust position above text
  translationDiv.style.backgroundColor = "yellow";
  translationDiv.style.border = "1px solid black";
  translationDiv.style.padding = "3px";
  translationDiv.style.zIndex = 1000;
  translationDiv.style.fontSize = "12px"; // Adjust font size
  translationDiv.innerText = translation;

  // Append the translated text above the selected text
  document.body.appendChild(translationDiv);

  // Remove translation after 3 seconds
  setTimeout(() => {
    document.body.removeChild(translationDiv);
  }, 3000);
}

// Function to fetch translation
async function fetchTranslation(text) {
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(
      text
    )}`
  );
  const data = await response.json();
  return data[0][0][0];
}

// Function to handle text selection and translation
async function handleTranslation(event) {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    const translation = await fetchTranslation(selection);
    if (translation) {
      // Calculate position to show translation above text
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const x = rect.left + window.scrollX;
      const y = rect.top + window.scrollY;

      showTranslationAboveText(translation, x, y);
    }
  }
}

// Double-click translation functionality
document.addEventListener("dblclick", handleTranslation);

// Hover translation functionality
document.addEventListener("mouseup", handleTranslation);
