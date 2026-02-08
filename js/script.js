// アコーディオン機能
document.addEventListener("DOMContentLoaded", () => {
  const accordionBtns = document.querySelectorAll(".accordion-btn");

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const accordionItem = this.parentElement;
      const content = accordionItem.querySelector(".accordion-content");
      const isActive = this.classList.contains("active");

      // すべてのアコーディオンをクローズ
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.querySelector(".accordion-btn").classList.remove("active");
        item.querySelector(".accordion-content").classList.remove("show");
      });

      // 現在のアイテムをトグル（クローズされていた場合のみオープン）
      if (!isActive) {
        this.classList.add("active");
        content.classList.add("show");
      }
    });
  });
});
