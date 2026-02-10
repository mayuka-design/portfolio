// ============ 共通設定オブジェクト ============
const CONFIG = {
  SPLASH_DISPLAY_TIME: 800,
  SPLASH_FADEIN_TIME: 0,
  SPLASH_FADEOUT_TIME: 700,
  ELEMENT_STAGGER_DELAY: 300
};

CONFIG.CONTENT_START_DELAY =
  CONFIG.SPLASH_DISPLAY_TIME + CONFIG.SPLASH_FADEOUT_TIME;

// ============ メニュー制御関数 ============
const closeMenu = (hamburgerBtn, navMenu, menuOverlay) => {
  hamburgerBtn.classList.remove("active");
  navMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
};

const toggleMenu = (hamburgerBtn, navMenu, menuOverlay) => {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
};

// ============ メイン処理 ============
document.addEventListener("DOMContentLoaded", () => {
  // CSSカスタムプロパティにセット
  const root = document.documentElement;
  root.style.setProperty(
    "--splash-fadein-time",
    `${CONFIG.SPLASH_FADEIN_TIME / 1000}s`
  );
  root.style.setProperty(
    "--splash-fadeout-time",
    `${CONFIG.SPLASH_FADEOUT_TIME / 1000}s`
  );
  root.style.setProperty(
    "--content-fade-time",
    `${CONFIG.CONTENT_START_DELAY / 1000}s`
  );

  // スプラッシュスクリーン制御
  const body = document.body;
  const splashScreen = document.getElementById("splash-screen");

  body.style.overflow = "hidden";

  setTimeout(() => {
    splashScreen.classList.add("hidden");
  }, CONFIG.SPLASH_DISPLAY_TIME);

  setTimeout(
    () => {
      splashScreen.style.display = "none";
      window.scrollTo(0, 0);
    },
    CONFIG.SPLASH_DISPLAY_TIME + CONFIG.SPLASH_FADEOUT_TIME + 50
  );

  // フェードインアニメーション
  document.querySelectorAll(".fade-in").forEach((element, index) => {
    setTimeout(
      () => {
        element.classList.add("show");
      },
      CONFIG.CONTENT_START_DELAY + index * CONFIG.ELEMENT_STAGGER_DELAY
    );
  });

  // ハンバーガーメニュー
  const hamburgerBtn = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  const menuOverlay = document.querySelector(".menu-overlay");

  if (hamburgerBtn && navMenu && menuOverlay) {
    hamburgerBtn.addEventListener("click", () => {
      toggleMenu(hamburgerBtn, navMenu, menuOverlay);
    });

    menuOverlay.addEventListener("click", () => {
      closeMenu(hamburgerBtn, navMenu, menuOverlay);
    });

    // ナビゲーションリンク
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          closeMenu(hamburgerBtn, navMenu, menuOverlay);
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      });
    });
  }

  // アコーディオン機能
  document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const isActive = this.classList.contains("active");
      const content = this.parentElement.querySelector(".accordion-content");

      // すべて閉じる
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.querySelector(".accordion-btn").classList.remove("active");
        item.querySelector(".accordion-content").classList.remove("show");
      });

      // クローズされていた場合のみ開く
      if (!isActive) {
        this.classList.add("active");
        content.classList.add("show");
      }
    });
  });

  // カテゴリーフィルタリング機能
  const categoryBtns = document.querySelectorAll(".category-btn");
  const workCards = document.querySelectorAll(".work-card");

  if (categoryBtns.length && workCards.length) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedCategory = btn.dataset.category;

        // アクティブボタン切り替え
        categoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // カード表示/非表示
        workCards.forEach((card) => {
          const shouldShow =
            selectedCategory === "all" ||
            card.dataset.category === selectedCategory;
          const cardLink =
            card.closest(".work-card-link") || card.parentElement;

          card.classList.toggle("hidden", !shouldShow);
          if (cardLink?.classList) {
            cardLink.classList.toggle("hidden", !shouldShow);
          }
        });
      });
    });
  }

  // トップに戻るボタン
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  
  // スクロール時の表示/非表示
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // クリック時にトップへスクロール
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
