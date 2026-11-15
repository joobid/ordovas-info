(function () {
  var barra = document.getElementById("progreso");
  function actualizarBarra() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    barra.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", actualizarBarra, { passive: true });
  actualizarBarra();

  var enlaces = document.querySelectorAll(".menu a");
  var secciones = [];
  enlaces.forEach(function (a) {
    var s = document.querySelector(a.getAttribute("href"));
    if (s) secciones.push({ a: a, s: s });
  });
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          secciones.forEach(function (x) {
            x.a.classList.toggle("activo", x.s === e.target);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    secciones.forEach(function (x) { obs.observe(x.s); });

    var rev = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          rev.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }

  var visor = document.getElementById("visor");
  var visorImg = visor.querySelector("img");
  var visorPie = visor.querySelector("p");
  document.querySelectorAll("figure.foto img").forEach(function (img) {
    img.addEventListener("click", function () {
      visorImg.src = img.currentSrc || img.src;
      visorImg.alt = img.alt;
      var cap = img.closest("figure").querySelector("figcaption");
      visorPie.textContent = cap ? cap.textContent : "";
      visor.classList.add("abierto");
    });
  });
  function cerrar() { visor.classList.remove("abierto"); }
  visor.addEventListener("click", cerrar);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
})();

(function () {
  var marco = document.querySelector(".tablero-marco");
  if (!marco) return;
  var tablero = marco.querySelector(".tablero");
  function ajustar() {
    var s = Math.min(1, marco.clientWidth / 1200);
    tablero.style.transform = "scale(" + s + ")";
    marco.style.height = 850 * s + "px";
  }
  window.addEventListener("resize", ajustar);
  ajustar();
  marco.querySelectorAll(".ovalo img").forEach(function (img) {
    function sinFoto() {
      var o = img.parentNode;
      o.classList.add("sin-foto");
      img.remove();
    }
    if (img.complete && img.naturalWidth === 0) sinFoto();
    else img.addEventListener("error", sinFoto);
  });
})();

(function () {
  var fig = document.querySelector(".lamina-web");
  var marco = document.querySelector(".tablero-marco");
  if (!fig || !marco) return;
  var img = fig.querySelector("img");
  function mostrar() { fig.hidden = false; marco.style.display = "none"; fig.closest("section").classList.add("con-lamina"); }
  var test = new Image();
  test.onload = mostrar;
  test.src = img.getAttribute("src");
})();
