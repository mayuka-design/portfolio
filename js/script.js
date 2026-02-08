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

  // カテゴリーフィルタリング機能
  const categoryBtns = document.querySelectorAll(".category-btn");
  const workCards = document.querySelectorAll(".work-card");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedCategory = this.dataset.category;

      // アクティブなボタンを変更
      categoryBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // 該当するカードを表示/非表示
      workCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        if (
          selectedCategory === "all" ||
          cardCategory === selectedCategory
        ) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
