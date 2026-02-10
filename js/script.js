// 定数定義
// スプラッシュ表示時間（ms）
const SPLASH_DISPLAY_TIME = 800;

// フェードアウト時間（ms）
const SPLASH_FADEOUT_TIME = 800;

// コンテンツ表示開始遅延（ms）
const CONTENT_START_DELAY = SPLASH_DISPLAY_TIME + SPLASH_FADEOUT_TIME;

// 各要素間の遅延（ms）
const ELEMENT_STAGGER_DELAY = 0;

window.addEventListener("load", () => {
  // 強制的に先頭にスクロール
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  // スプラッシュスクリーン表示中はスクロール禁止
  document.body.style.overflow = "hidden";

  // スプラッシュスクリーン: 0.5秒後に非表示
  const splashScreen = document.getElementById("splash-screen");
  setTimeout(() => {
    splashScreen.classList.add("hidden");
    // さらに1秒後に完全に削除
    setTimeout(() => {
      splashScreen.style.display = "none";
      // スクロール復活
      document.body.style.overflow = "auto";
    }, SPLASH_FADEOUT_TIME);
  }, SPLASH_DISPLAY_TIME);

  // フェードインアニメーション: スプラッシュ後に開始
  const fadeInElements = document.querySelectorAll(".fade-in");
  fadeInElements.forEach((element, index) => {
    setTimeout(
      () => {
        element.classList.add("show");
      },
      CONTENT_START_DELAY + 50 + index * ELEMENT_STAGGER_DELAY
    ); // スプラッシュ終了後に開始
  });

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

  if (categoryBtns.length > 0 && workCards.length > 0) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedCategory = btn.dataset.category;

        // アクティブなボタンを変更
        categoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // 該当するカードを表示/非表示
        workCards.forEach((card) => {
          const cardCategory = card.dataset.category;
          const cardLink =
            card.closest(".work-card-link") || card.parentElement;

          if (selectedCategory === "all" || cardCategory === selectedCategory) {
            card.classList.remove("hidden");
            if (cardLink && cardLink.classList) {
              cardLink.classList.remove("hidden");
            }
          } else {
            card.classList.add("hidden");
            if (cardLink && cardLink.classList) {
              cardLink.classList.add("hidden");
            }
          }
        });
      });
    });
  }

  // Instagram ボタンの中身を別ファイルから読み込む
  fetch("works/instagram-btn.html")
    .then((res) => res.text())
    .then((html) => {
      const btn = document.getElementById("instagram-btn");
      if (btn) btn.innerHTML = html;
    });
});
