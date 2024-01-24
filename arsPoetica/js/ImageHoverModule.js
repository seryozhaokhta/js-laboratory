// export class ImageHoverModule {
//   constructor() {
//     this.initEventListeners();
//   }

//   initEventListeners() {
//     document.addEventListener("DOMContentLoaded", () => {
//       this.addEventListeners();
//     });
//   }

//   addEventListeners() {
//     setTimeout(() => {
//       const authorElement = document.getElementById("poem-author");
//       if (authorElement) {
//         authorElement.addEventListener("mouseenter", (event) =>
//           this.showImage(`/img/unnamed.jpg`, event)
//         );
//         authorElement.addEventListener("mouseleave", () => this.hideImage());
//       }
//     }, 1000);
//   }
// }
