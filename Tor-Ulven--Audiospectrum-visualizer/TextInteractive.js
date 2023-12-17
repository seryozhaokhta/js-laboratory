export default class TextInteractive {
  constructor(barLines, diktContainer) {
    this.barLines = barLines;
    this.diktContainer = diktContainer;
  }

  update(currentTime) {
    let activeLineIndex = null;

    this.barLines.forEach((entry, index) => {
      if (currentTime >= entry.time) {
        activeLineIndex = index;
        entry.bar.style.backgroundColor = "white";
      }
    });

    this.barLines.forEach((entry, index) => {
      if (index === activeLineIndex) {
        entry.line.style.opacity = 1;
        entry.line.style.fontSize = "27px";
      } else {
        entry.line.style.opacity = 0.5;
        entry.line.style.fontSize = "20px";
      }
    });

    if (activeLineIndex !== null) {
      this.scrollActiveLineIntoView(this.barLines[activeLineIndex].line);
    }
  }

  scrollActiveLineIntoView(activeLine) {
    var diktContainerRect = this.diktContainer.getBoundingClientRect();
    var activeLineRect = activeLine.getBoundingClientRect();

    if (
      activeLineRect.top < diktContainerRect.top ||
      activeLineRect.bottom > diktContainerRect.bottom
    ) {
      activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  reset() {
    this.barLines.forEach((entry) => {
      entry.bar.style.backgroundColor = "grey";
      entry.line.style.opacity = 0.5;
      entry.line.style.fontSize = "20px";
    });
  }
}
