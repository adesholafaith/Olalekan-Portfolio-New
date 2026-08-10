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
