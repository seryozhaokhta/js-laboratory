document.addEventListener("DOMContentLoaded", function () {
  const resetIcon = document.getElementById("reset-icon");

  if (!resetIcon) return;

  resetIcon.addEventListener("click", function () {
    resetIcon.style.transition =
      "transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
    resetIcon.style.transform = "rotate(360deg)";

    setTimeout(() => {
      resetIcon.style.transition = "";
      resetIcon.style.transform = "";
    }, 600);
  });
});
