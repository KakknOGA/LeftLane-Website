const toggle = document.getElementById("langToggle");
let lang = "de";

function setLang(nextLang){
  lang = nextLang;
  document.documentElement.lang = lang;
  toggle.textContent = lang === "de" ? "EN" : "DE";
  document.querySelectorAll("[data-de]").forEach(el => {
    el.innerHTML = el.dataset[lang];
  });
}

toggle.addEventListener("click", () => {
  setLang(lang === "de" ? "en" : "de");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });
},{threshold:0.15});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".feature-card,.news-card,.gallery-card,.team-card,.patch").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.transform = `perspective(900px) rotateX(${-(y-r.height/2)/28}deg) rotateY(${(x-r.width/2)/28}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
