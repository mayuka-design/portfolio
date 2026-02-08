// アコーディオン機能
document.addEventListener("DOMContentLoaded", function () {
  const accordionBtns = document.querySelectorAll(".accordion-btn");
  const slides = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 現在のアコーディオンアイテムを取得
      const accordionItem = this.parentElement;
      const content = accordionItem.querySelector(".accordion-content");

      // すべてのアコーディオンアイテムをクローズ
      document.querySelectorAll(".accordion-item").forEach((item) => {
        if (item !== accordionItem) {
          item.querySelector(".accordion-btn").classList.remove("active");
          item.querySelector(".accordion-content").classList.remove("show");
        }
      });

      // クリックされたアイテムをトグル
      this.classList.toggle("active");
      content.classList.toggle("show");
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = dot.dataset.index;
      slides.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });
});
