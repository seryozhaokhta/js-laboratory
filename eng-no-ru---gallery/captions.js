const captions = {
  Cimabue: `
  <strong>Cimabue</strong><br>
  <strong>Thronende Madonna mit acht Engeln und vier Propheten</strong><br>
  <span class="caption-date">1240—1302</span>
  `,
  Giotto1: `
  <strong>Giotto</strong><br>
  <strong>Scenes from the Life of Christ: Nativity</strong><br>
  <span class="caption-date">1304—1306</span>
  `,
  Giotto2: `
  <strong>Giotto</strong><br>
  <strong>Scenes from the Life of Christ</strong><br>
  <span class="caption-date">Detail</span>
  `,
  Duccio: `
  <strong>Duccio</strong><br>
  <strong>Maesta<br>
  <span class="caption-date">1308–1311</span>
  `,
  Giotto2: `
  <strong>Giotto</strong><br>
  <strong>Scenes from the Life of Christ: Nativity</strong><br>
  <span class="caption-date">Detail</span>
  `,
  Giotto2: `
  <strong>Giotto</strong><br>
  <strong>Scenes from the Life of Christ: Nativity</strong><br>
  <span class="caption-date">Detail</span>
  `,
  Martini: `
  <strong>Simone Martini</strong><br>
  <strong>The Virgin of the Annunciation</strong><br>
  <span class="caption-date">circa 1330</span>
  `,
  Lorenzetti: `
    <strong>Lorenzetti Ambrogio</strong><br>
    <strong>Presentation in the Temple</strong><br>
    <span class="caption-date">1342</span>
  `,
  FraAngelico: `
    <strong>Fra Angelico</strong><br>
    <strong>Annunciation with Saint Peter Martyr</strong><br>
    <span class="caption-date">1439–1443</span>
  `,
  Masaccio1: `
    <strong>Masaccio</strong><br>
    <strong>The Expulsion from the Garden of Eden</strong><br>
    <span class="caption-date">1426–1427</span>
  `,
  Masaccio2: `
    <strong>Masaccio</strong><br>
    <strong>Trinity</strong><br>
    <span class="caption-date">1425</span>
  `,
  Uccello: `
    <strong>Paolo Uccello</strong><br>
    <strong>Creation of Animals, Adam, Eve and Original Sin</strong><br>
    <span class="caption-date">1420–1425</span>
  `,
  Bellini1: `
    <strong>Giovanni Bellini</strong><br>
    <strong>Blessing Christ</strong><br>
    <span class="caption-date">1450–1475</span>
  `,
  Bellini2: `
    <strong>Giovanni Bellini</strong><br>
    <strong>Transfiguration of Christ</strong><br>
    <span class="caption-date">circa 1480</span>
  `,
  Botticelli1: `
    <strong>Sandro Botticelli</strong><br>
    <strong>Primavera</strong><br>
    <span class="caption-date">1482</span>
  `,
  Botticelli2: `
    <strong>Sandro Botticelli</strong><br>
    <strong>The Birth of Venus</strong><br>
    <span class="caption-date">circa 1485</span>
  `,
  Mantegna: `
    <strong>Andrea Mantegna</strong><br>
    <strong>The Dead Christ and Three Mourners</strong><br>
    <span class="caption-date">1470–1474</span>
  `,
  Leonardo: `
    <strong>Leonardo da Vinci</strong><br>
    <strong>Madonna with the Yarnwinder</strong><br>
    <span class="caption-date">circa 1510</span>
  `,
  Michelangelo: `
    <strong>Michelangelo</strong><br>
    <strong>Last Judgement</strong><br>
    <span class="caption-date">1536–1541</span>
  `,
  Titian: `
    <strong>Titian</strong><br>
    <strong>Pesaro Madonna</strong><br>
    <span class="caption-date">1519–1526</span>
  `,
  Giorgione: `
    <strong>Giorgione</strong><br>
    <strong>Judith with the Head of Holofernes</strong><br>
    <span class="caption-date">1504</span>
  `,
  Raphael: `
    <strong>Raphael</strong><br>
    <strong>Sistine Madonna</strong><br>
    <span class="caption-date">1513–1514</span>
  `,
  Bramante: `
    <strong>Bramante</strong><br>
    <strong>Christ at the Column</strong><br>
    <span class="caption-date">circa 1490</span>
  `,
  Pontormo: `
    <strong>Jacopo Pontormo</strong><br>
    <strong>The Virgin and Child with St Joseph and St John the Baptist</strong><br>
    <span class="caption-date">1520</span>
  `,
  Bronzino: `
    <strong>Bronzino</strong><br>
    <strong>Venus, Cupid, Folly and Time</strong><br>
    <span class="caption-date">circa 1545</span>
  `,
  Tintoretto: `
    <strong>Tintoretto</strong><br>
    <strong>Last Supper</strong><br>
    <span class="caption-date">1592–1594</span>
  `,
  Veronese: `
    <strong>Veronese</strong><br>
    <strong>God the Father over the Piazza San Marco</strong><br>
    <span class="caption-date">1540</span>
  `,
  Reni: `
    <strong>Guido Reni</strong><br>
    <strong>Crucifixion of Saint Peter</strong><br>
    <span class="caption-date">1604–1605</span>
  `,
  ElGreco: `
    <strong>El Greco</strong><br>
    <strong>The Burial of the Count of Orgaz</strong><br>
    <span class="caption-date">1586</span>
  `,
  Anguissola: `
    <strong>Sofonisba Anguissola</strong><br>
    <strong>Self-Portrait</strong><br>
    <span class="caption-date">1556</span>
  `,
  Parmigianino: `
    <strong>Parmigianino</strong><br>
    <strong>Madonna with the Long Neck</strong><br>
    <span class="caption-date">1534–1540</span>
  `,
  Correggio: `
    <strong>Correggio</strong><br>
    <strong>Jupiter and Io</strong><br>
    <span class="caption-date">1532–1533</span>
  `,
};

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const key = item.getAttribute("data-caption-key");
    const captionText = captions[key] || "Описание не найдено";
    item.querySelector(".caption").innerHTML = captionText;
  });
});
