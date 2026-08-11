history.scrollRestoration = "manual";

  window.addEventListener("load", () => {
    history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
});

document.querySelectorAll(".button-secondary, .nav-cta").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = this.dataset.target
      ? document.getElementById(this.dataset.target)
      : document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

const contactScene = document.querySelector(".contact-footer-scene");
const background = contactScene?.querySelector(".contact-background");

if (contactScene && background) {
  let targetX = 0, targetY = 0, scrollOffset = 0;
  let currentX = 0, currentY = 0;

  if (window.matchMedia("(pointer: fine)").matches) {
    contactScene.addEventListener("mousemove", (event) => {
      const rect = contactScene.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 16;
    });
  }

  const updateScrollOffset = () => {
    const rect = contactScene.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    scrollOffset = (Math.max(0, Math.min(1, progress)) - 0.5) * 90;
  };

  window.addEventListener("scroll", updateScrollOffset, { passive: true });
  window.addEventListener("resize", updateScrollOffset);
  updateScrollOffset();

  const animate = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY + scrollOffset - currentY) * 0.06;
    background.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animate);
  };
  animate();
}

// Reveal each major page section as it enters the viewport.
const revealSections = document.querySelectorAll("main > section, .contact");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  revealSections.forEach((section) => {
    section.classList.add("reveal-on-scroll");
    revealObserver.observe(section);
  });
} else {
  revealSections.forEach((section) => section.classList.add("is-revealed"));
}

// Move the About emphasis to the paragraph currently being hovered.
const aboutParagraphs = [...document.querySelectorAll(".about-copy p")];
if (aboutParagraphs.length) {
  const setActiveParagraph = (activeParagraph) => {
    aboutParagraphs.forEach((paragraph) => {
      paragraph.classList.toggle("is-active", paragraph === activeParagraph);
    });
  };

  aboutParagraphs.forEach((paragraph) => {
    paragraph.addEventListener("mouseenter", () => setActiveParagraph(paragraph));
  });
  document.querySelector(".about-copy").addEventListener("mouseleave", () => {
    setActiveParagraph(aboutParagraphs[0]);
  });
}

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);
  const interactive = "a, button, input, textarea, select, [role='button'], [tabindex]";
  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add("is-visible");
  });
  document.addEventListener("mouseover", (event) => cursor.classList.toggle("is-hovering", Boolean(event.target.closest(interactive))));
  document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
}
