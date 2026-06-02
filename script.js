// JavaScript Document

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("siteMenu");
const body = document.body;

function setMenuState(isOpen) {
  if (!menuToggle || !navMenu) {
    return;
  }

  menuToggle.classList.toggle("is-open", isOpen);
  navMenu.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

function updateThemeLabel() {
  if (!themeToggle) {
    return;
  }

  themeToggle.textContent = body.classList.contains("dark-mode") ? "Light mode" : "Dark mode";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark-mode");
    } else {
      localStorage.removeItem("theme");
    }

    updateThemeLabel();
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    setMenuState(isOpen);
  });

  navMenu.querySelectorAll("a, button").forEach((element) => {
    if (element === menuToggle || element === themeToggle) {
      return;
    }

    element.addEventListener("click", () => {
      if (window.innerWidth <= 840) {
        setMenuState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) {
      setMenuState(false);
    }
  });
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark-mode") {
  body.classList.add("dark-mode");
}
updateThemeLabel();

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
  const thumbs = Array.from(gallery.querySelectorAll(".gallery-thumb"));
  const prev = gallery.querySelector(".gallery-prev");
  const next = gallery.querySelector(".gallery-next");

  if (!slides.length) {
    return;
  }

  let index = 0;

  function renderGallery() {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === index);
      thumb.setAttribute("aria-pressed", thumbIndex === index ? "true" : "false");
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      renderGallery();
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      renderGallery();
    });
  }

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.addEventListener("click", () => {
      index = thumbIndex;
      renderGallery();
    });
  });

  renderGallery();
});
