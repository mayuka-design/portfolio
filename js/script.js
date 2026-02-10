// ============ 共通設定オブジェクト ============
// JavaScriptとCSS（カスタムプロパティ）で共有
const CONFIG = {
  // スプラッシュ表示時間（ms）
  SPLASH_DISPLAY_TIME: 800,
  // フェードイン時間（ms）
  SPLASH_FADEIN_TIME: 0,
  // フェードアウト時間（ms）
  SPLASH_FADEOUT_TIME: 700,
  // 各要素間の遅延（ms）
  ELEMENT_STAGGER_DELAY: 300
};

// コンテンツ表示開始遅延（計算値）
CONFIG.CONTENT_START_DELAY =
  CONFIG.SPLASH_DISPLAY_TIME + CONFIG.SPLASH_FADEOUT_TIME;

// アコーディオン機能
document.addEventListener("DOMContentLoaded", () => {
  // CSSカスタムプロパティにセット（msからsに変換）
  document.documentElement.style.setProperty(
    "--splash-fadein-time",
    CONFIG.SPLASH_FADEIN_TIME / 1000 + "s"
  );
  document.documentElement.style.setProperty(
    "--splash-fadeout-time",
    CONFIG.SPLASH_FADEOUT_TIME / 1000 + "s"
  );
  document.documentElement.style.setProperty(
    "--content-fade-time",
    CONFIG.CONTENT_START_DELAY / 1000 + "s"
  );
  // スプラッシュスクリーン表示中はスクロール禁止
  document.body.style.overflow = "hidden";

  // スプラッシュスクリーン: 表示時間後に非表示
  const splashScreen = document.getElementById("splash-screen");
  setTimeout(() => {
    splashScreen.classList.add("hidden");
  }, CONFIG.SPLASH_DISPLAY_TIME);

  // フェードアウトアニメーション完了後に完全削除
  setTimeout(
    () => {
      splashScreen.style.display = "none";
      // スクロール復活
      document.body.style.overflow = "auto";
    },
    CONFIG.SPLASH_DISPLAY_TIME + CONFIG.SPLASH_FADEOUT_TIME + 50
  );

  // フェードインアニメーション: スプラッシュ後に開始
  const fadeInElements = document.querySelectorAll(".fade-in");
  fadeInElements.forEach((element, index) => {
    setTimeout(
      () => {
        element.classList.add("show");
      },
      CONFIG.CONTENT_START_DELAY + index * CONFIG.ELEMENT_STAGGER_DELAY
    ); // スプラッシュ終了後に開始
  });

  // ハンバーガーメニューの機能
  const hamburgerBtn = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  const menuOverlay = document.querySelector(".menu-overlay");

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
      menuOverlay.classList.toggle("active");
    });
  }

  // オーバーレイクリックでメニューを閉じる
  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      hamburgerBtn.classList.remove("active");
      navMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
    });
  }

  // ナビゲーションメニューのリンククリック
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // メニューを閉じる
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

        // スムーススクロール
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
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
