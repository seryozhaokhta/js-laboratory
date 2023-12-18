class SearchBox {
  constructor() {
    this.searchInput = document.getElementById("search-input");
    this.searchIcon = document.getElementById("search-icon");
    this.clearButton = document.getElementById("clear-button");
    this.dropdownButton = document.getElementById("dropdown-button");
    this.dropdownMenu = document.getElementById("dropdown-menu");
    this.initEventListeners();
  }

  initEventListeners() {
    this.searchInput.addEventListener("focus", () => this.handleFocus());
    this.searchInput.addEventListener("blur", () => this.handleBlur());
    this.clearButton.addEventListener("click", () => this.handleClear());
    this.dropdownButton.addEventListener("click", (event) =>
      this.handleDropdownClick(event)
    );

    // Обработка кликов вне элемента для закрытия меню
    document.addEventListener("click", (event) =>
      this.handleDocumentClick(event)
    );

    // Обработка клика по каждой ссылке в меню
    const menuLinks = this.dropdownMenu.querySelectorAll("a");
    menuLinks.forEach((link) =>
      link.addEventListener("click", (event) =>
        this.handleMenuSelect(event, link)
      )
    );
  }

  handleFocus() {
    this.searchIcon.style.opacity = "0.5";
  }

  handleBlur() {
    this.searchIcon.style.opacity = "1";
  }

  handleClear() {
    this.searchInput.value = "";
    this.searchInput.focus();
  }

  handleDropdownClick(event) {
    event.stopPropagation();
    this.dropdownMenu.classList.toggle("hidden");
    this.dropdownButton.classList.toggle("active");

    // Если меню скрыто, сбросить выбранный элемент
    if (this.dropdownMenu.classList.contains("hidden")) {
      this.resetSelected();
    }
  }

  handleDocumentClick(event) {
    if (
      !this.dropdownMenu.contains(event.target) &&
      !this.dropdownButton.contains(event.target)
    ) {
      this.dropdownMenu.classList.add("hidden");
      this.dropdownButton.classList.remove("active");
      this.resetSelected(); // Сбросить выбранный элемент, если клик вне меню
    }
  }

  handleMenuSelect(event, link) {
    event.preventDefault();
    this.dropdownMenu
      .querySelectorAll("a")
      .forEach((a) => a.classList.remove("selected"));
    link.classList.add("selected");
  }

  // Функция для сброса выбранного элемента
  resetSelected() {
    this.dropdownMenu.querySelectorAll("a").forEach((a) => {
      a.classList.remove("selected");
    });
  }
}

// Инициализация класса после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  new SearchBox();
});
