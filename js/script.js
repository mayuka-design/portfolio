// アコーディオン機能
document.addEventListener("DOMContentLoaded", function () {
  const accordionBtns = document.querySelectorAll(".accordion-btn");

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
});
