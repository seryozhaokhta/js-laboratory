class LanguageButtonAnimator {
  constructor() {
    this.buttons = document.querySelectorAll("#language-buttons button");
    this.underlines = document.querySelectorAll("#language-buttons .underline");
    this.additionalText = document.querySelector("#additional-text-no");
    this.outerContainerNo = document.querySelector("#outer-container-no");
    this.btnRuContainer = document.querySelector("#btn-ru-container");
    this.targetX = 0;
    this.currentX = 0;
    this.lerpAmount = 0.1;
    this.hovering = false; // новое состояние
    this.hideTimeout = null; // новый таймер
    this.bindEvents();
  }

  bindEvents() {
    this.buttons.forEach((button, index) => {
      button.addEventListener("mouseenter", () => this.onButtonHover(index));
      button.addEventListener("mouseleave", () => this.onButtonLeave(index));
    });

    // Обработчики событий для внешнего контейнера и дополнительных кнопок
    this.outerContainerNo.addEventListener("mouseenter", () =>
      this.showAdditionalButtons()
    );
    this.outerContainerNo.addEventListener("mouseleave", () =>
      this.prepareHideAdditionalButtons()
    );
    this.additionalText.addEventListener("mouseenter", () =>
      this.cancelHideAdditionalButtons()
    );
    this.additionalText.addEventListener("mouseleave", () =>
      this.prepareHideAdditionalButtons()
    );
  }

  onButtonHover(index) {
    const underline = this.underlines[index];
    underline.style.width = "100%";
  }

  onButtonLeave(index) {
    const underline = this.underlines[index];
    underline.style.width = "0";
  }

  showAdditionalButtons() {
    this.hovering = true;
    this.additionalText.style.opacity = "1";
    this.additionalText.style.visibility = "visible";
    this.targetX = 130;
    this.update();
  }

  prepareHideAdditionalButtons() {
    this.hovering = false;
    this.hideTimeout = setTimeout(() => this.hideAdditionalButtons(), 300);
  }

  cancelHideAdditionalButtons() {
    this.hovering = true;
    clearTimeout(this.hideTimeout);
  }

  hideAdditionalButtons() {
    if (!this.hovering) {
      this.additionalText.style.opacity = "0";
      this.additionalText.style.visibility = "hidden";
      this.targetX = 0;
      this.update();
    }
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  update() {
    this.currentX = this.lerp(this.currentX, this.targetX, this.lerpAmount);
    this.btnRuContainer.style.transform = `translateX(${this.currentX}px)`;

    if (Math.abs(this.currentX - this.targetX) > 0.1) {
      requestAnimationFrame(() => this.update());
    }
  }
}

// Создание экземпляра класса и инициализация анимации
const languageButtonAnimator = new LanguageButtonAnimator();
