const scrollButtonLeft = document.querySelector("#scroll-left");
const scrollButtonRight = document.querySelector("#scroll-right");
const galleryContainer = document.querySelector(".gallery-container");
const images = Array.from(document.querySelectorAll(".gallery img"));
let currentImageIndex = 0;
let scrollSpeed = 10;
let animationFrameId = null;
const maxSpeed = 130; // Максимальная скорость прокрутки

function updateScrollButtons() {
  scrollButtonLeft.disabled = currentImageIndex <= 0;
  scrollButtonRight.disabled = currentImageIndex >= images.length - 1;
}

function updateGalleryScroll() {
  galleryContainer.scrollLeft += scrollSpeed;

  // Уменьшаем скорость прокрутки со временем для плавной остановки
  scrollSpeed *= 0.95;

  // Если скорость достаточно мала, останавливаем анимацию
  if (Math.abs(scrollSpeed) > 0.5) {
    animationFrameId = requestAnimationFrame(updateGalleryScroll);
  } else {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function handleWheelEvent(e) {
  // Устанавливаем скорость прокрутки и запускаем анимацию
  scrollSpeed += e.deltaY > 0 ? 10 : -10;
  scrollSpeed = Math.max(-maxSpeed, Math.min(maxSpeed, scrollSpeed)); // Ограничиваем скорость

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(updateGalleryScroll);
  }
  e.preventDefault();
}

// Обработчик нажатия клавиши Esc для остановки прокрутки
function handleEscKey(e) {
  if (e.key === "Escape") {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    scrollSpeed = 0;
  }
}

galleryContainer.addEventListener("wheel", handleWheelEvent);
window.addEventListener("keydown", handleEscKey);

scrollButtonLeft.addEventListener("click", () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    images[currentImageIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    updateScrollButtons();
  }
});

scrollButtonRight.addEventListener("click", () => {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
    images[currentImageIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    updateScrollButtons();
  }
});

const periodButtons = document.querySelectorAll(".period-button");

periodButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const period = e.target.dataset.period;
    const sectionToScrollTo = document.querySelector(
      `.period-section.${period}`
    );
    const firstImageInSection = sectionToScrollTo.querySelector("img");
    currentImageIndex = images.indexOf(firstImageInSection);
    firstImageInSection.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    updateScrollButtons();
  });
});

const artistSearchInput = document.querySelector("#artistSearch");
const searchButton = document.querySelector("#searchButton");

// Создание индекса художников для оптимизации поиска
const artistIndex = images.reduce((acc, img, index) => {
  const artist = img.alt.toLowerCase();
  if (!acc[artist]) {
    acc[artist] = [];
  }
  acc[artist].push(index);
  return acc;
}, {});

searchButton.addEventListener("click", () => {
  const searchText = artistSearchInput.value.toLowerCase();

  // Использование индекса для поиска художника
  for (let artist in artistIndex) {
    if (artist.includes(searchText)) {
      currentImageIndex = artistIndex[artist][0];
      images[currentImageIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      updateScrollButtons();
      break;
    }
  }
});

updateScrollButtons();
