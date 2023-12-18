window.onload = function () {
  let langButtons = document.querySelectorAll(".lang-btn");
  let langElems = document.querySelectorAll("[class*='lang-']");

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let lang = button.id;
      changeLang(lang);
    });
  });

  function changeLang(lang) {
    console.log(`Changing language to ${lang}`);
    langElems.forEach((elem) => {
      let key = elem.className
        .split(" ")
        .find((name) => name.startsWith("lang-")); // получаем ключ из класса начинающегося с 'lang-'
      console.log(`Changing text for element with key ${key}`);
      if (langArr[key] && langArr[key][lang]) {
        elem.textContent = langArr[key][lang]; // обновляем текст в элементе на основе выбранного языка и ключа
      }
    });
  }
};
