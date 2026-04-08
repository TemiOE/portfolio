const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const toolChips = document.querySelectorAll("[data-tool-filter]");
const toolLinks = document.querySelectorAll("[data-tool]");
const projectCards = document.querySelectorAll(".project-card");

function setActiveFilter(filter) {
  toolChips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.toolFilter === filter);
  });

  projectCards.forEach((card) => {
    const tools = (card.dataset.tools || "").split(" ");
    const isMatch = filter === "all" || tools.includes(filter);
    card.classList.toggle("is-highlighted", isMatch);
    card.classList.toggle("is-dimmed", !isMatch);
  });
}

toolChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    setActiveFilter(chip.dataset.toolFilter);
  });
});

toolLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveFilter(link.dataset.tool);
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

setActiveFilter("all");
