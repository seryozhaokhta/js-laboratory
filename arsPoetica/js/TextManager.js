export class TextManager {
  constructor(bezierAnimation) {
    this.currentLanguage = "no";
    this.textContainer = document.getElementById("text-container");
    this.bezierAnimation = bezierAnimation;
    this.loadText();
  }

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === "no" ? "ru" : "no";
    this.loadText();
  }

  loadText() {
    fetch("../texts.json")
      .then((response) => response.json())
      .then((data) => {
        const textData = data[this.currentLanguage];
        this.textContainer.innerHTML = `
        <p id="poem-date" class="poem-date">${textData.date}</p>
        <p id="poem-author" class="poem-author">${textData.author}</p>
        <h1 class="poem-title">${textData.title}</h1>
        <pre>${textData.text.part1}</pre>
        <button class="frosty-tone-button" onclick="bezierAnimationInstance.addCurve();">${textData.text.button}</button>`;
      });
  }
}
