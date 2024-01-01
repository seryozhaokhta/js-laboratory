document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".num-curves-input");
  const customCursor = document.createElement("div");
  customCursor.classList.add("custom-cursor");
  document.body.appendChild(customCursor);

  inputField.addEventListener("focus", () => {
    customCursor.classList.add("blink");
    updateCursorPosition();
  });
  inputField.addEventListener("blur", () =>
    customCursor.classList.remove("blink")
  );
  inputField.addEventListener("input", updateCursorPosition);
  inputField.addEventListener("keydown", animateCursorOnKeyPress);

  document.addEventListener("click", (e) => {
    if (!inputField.contains(e.target)) {
      customCursor.style.visibility = "hidden";
    }
  });

  function updateCursorPosition() {
    const rect = inputField.getBoundingClientRect();
    const cursorPosition = inputField.selectionStart;
    const span = document.createElement("span");
    span.textContent = inputField.value.substring(0, cursorPosition);
    document.body.appendChild(span);
    const spanRect = span.getBoundingClientRect();

    const cursorOffset = 52; // Смещение курсора в пикселях
    customCursor.style.left = `${rect.left + spanRect.width + cursorOffset}px`;
    customCursor.style.top = `${rect.top}px`;
    customCursor.style.height = "10px"; // Фиксированная высота, равная ширине курсора
    customCursor.style.visibility = "visible";

    document.body.removeChild(span);
  }

  function animateCursorOnKeyPress(e) {
    if (
      [
        "Backspace",
        "Digit0",
        "Digit1",
        "Digit2",
        "Digit3",
        "Digit4",
        "Digit5",
        "Digit6",
        "Digit7",
        "Digit8",
        "Digit9",
      ].includes(e.code)
    ) {
      customCursor.classList.add("animate");
      setTimeout(() => customCursor.classList.remove("animate"), 200); // Время анимации
    }
  }
});
