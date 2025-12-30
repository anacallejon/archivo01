// ====== DATOS ======
// Array con todas las fotos (550 en total)
const photos = [
  {
    src: "img/1.jpeg",
    caption: "Marina\nAgosto 1961",
    secondary: "Marina, mujer, retrato, bebé, 1961",
  },
  {
    src: "img/2.jpeg",
    caption: "Fernando, Las Dalias\n5/9/1954",
    secondary: "Fernando, playa, verano, abuelo, 1954",
  },
  {
    src: "img/3.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá",
  },
  {
    src: "img/4.jpeg",
    caption: "Primo ¿¿\n(Fecha)",
    secondary: "Bebé, tío",
  },
  {
    src: "img/5.jpeg",
    caption: "Tía Teresa\n(Fecha)",
    secondary: "Teresa, tía, bebé",
  },
  {
    src: "img/6.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, hija, hermana, bebé",
  },
  {
    src: "img/7.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "abuela Marina, abuelo Marcial, bebé",
  },

  {
    src: "img/8.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá",
  },
  {
    src: "img/9.jpeg",
    caption: "Marina hija\n(Fecha)",
    secondary: "Hermana Marina, bebé, sentada",
  },

  {
    src: "img/10.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Hermana Marina, bebé, perro",
  },

  {
    src: "img/11.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá",
  },

  {
    src: "img/12.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Hermana Marina, playa, gorro, hija",
  },
  {
    src: "img/13.jpeg",
    caption: "Marina y Fernando con amigos\n(Fecha)",
    secondary: "mamá, papá, amigos, grupo, abuelos, campo, picnic",
  },
  {
    src: "img/14.jpeg",
    caption: "Marina y Fernando con amigos\n(Fecha)",
    secondary: "Mamá, papá, amigos, grupo, abuelos, campo, picnic",
  },
  {
    src: "img/15.jpeg",
    caption: "Fernando\n(Fecha)",
    secondary: "Fernando, abuelo, papá, libro",
  },
  {
    src: "img/16.jpeg",
    caption: "Marina con amigas\n(Fecha)",
    secondary: "Marina, abuela, mamá, campo, amigas",
  },
  {
    src: "img/17.jpeg",
    caption: "Fernando\n(Fecha)",
    secondary: "Fernando, abuelo, papá, perro",
  },
  {
    src: "img/18.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá, amigas",
  },
  {
    src: "img/19.jpeg",
    caption: "x\n(Fecha)",
    secondary: "x",
  },
  {
    src: "img/20.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá",
  },
  {
    src: "img/21.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá",
  },
  {
    src: "img/22.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá, árbol",
  },
  {
    src: "img/23.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá, retrato",
  },
  {
    src: "img/24.jpeg",
    caption: "Marina\n(Fecha)",
    secondary: "Marina, abuela, mamá, retrato",
  },
  // Añade aquí tus fotos personalizadas con datos reales
  // Ejemplo de las primeras fotos para que puedas reemplazarlas:
];

// Genera automáticamente el resto de fotos hasta llegar a 550
for (let i = photos.length + 1; i <= 550; i++) {
  photos.push({
    src: `img/${i}.jpeg`,
    caption: `Foto ${i}\nDescripción`,
    secondary: `Foto ${i}`,
  });
}

// Páginas especiales (las 2 primeras)
const introPages = [
  {
    title: "Catálogo de fotos 01",
    text: "Las fotos de los abuelos en un solo sitio.\n",
  },
  {
    title: "",
    text:
      "Este álbum es una recopilación.\n" +
      "\nEn este catálogo aparecen todas las fotos que he recopilado los abuelos.\n" +
      "La calidad de las imágenes ha sido trabajada y procesada para ser la más alta posible: cualquier rasguño, reflejo o desgaste es propio del original.\n" +
      "La numeración no es cronológica y por tanto podría no estar ordenado según qué criterios.\n\n" +
      "Pasa página, amplía las imágenes y descárgalas cuando quieras.",
  },
];

const PER_PAGE = 6;
let currentPage = 0;
let filteredPhotos = [...photos];
let searchActive = false;

// ====== DOM ======
const grid = document.getElementById("grid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const modalNumber = document.getElementById("modalNumber");
const modalSecondary = document.getElementById("modalSecondary");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
const modalDownload = document.getElementById("modalDownload");

let currentModalIndex = 0;

// ====== GESTOS TÁCTILES ======
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const minSwipeDistance = 50;

function handleSwipe(isModal = false) {
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  // Solo procesar si el movimiento horizontal es mayor que el vertical
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
    if (diffX > 0) {
      // Swipe derecha -> anterior
      if (isModal) {
        if (currentModalIndex > 0) openModal(currentModalIndex - 1);
      } else {
        if (currentPage > 0) {
          currentPage = clamp(currentPage - 1, 0, totalPages() - 1);
          renderPage();
          trackStateChange();
        }
      }
    } else {
      // Swipe izquierda -> siguiente
      if (isModal) {
        if (currentModalIndex < photos.length - 1)
          openModal(currentModalIndex + 1);
      } else {
        if (currentPage < totalPages() - 1) {
          currentPage = clamp(currentPage + 1, 0, totalPages() - 1);
          renderPage();
          trackStateChange();
        }
      }
    }
  }
}

// Swipe en el grid principal
grid.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  },
  { passive: true }
);

grid.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe(false);
  },
  { passive: true }
);

// Swipe en el modal
modal.addEventListener(
  "touchstart",
  (e) => {
    if (!modal.classList.contains("is-open")) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  },
  { passive: true }
);

modal.addEventListener(
  "touchend",
  (e) => {
    if (!modal.classList.contains("is-open")) return;
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe(true);
  },
  { passive: true }
);

// ====== PERSISTENCIA ======
function saveState() {
  const state = {
    currentPage,
    searchActive,
    searchQuery: searchInput.value,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  };
  sessionStorage.setItem("photoGalleryState", JSON.stringify(state));
}

function loadState() {
  const saved = sessionStorage.getItem("photoGalleryState");
  if (!saved) return false;

  try {
    const state = JSON.parse(saved);
    currentPage = state.currentPage || 0;
    searchActive = state.searchActive || false;

    if (state.searchQuery) {
      searchInput.value = state.searchQuery;
      performSearch(state.searchQuery, false);
    }

    // Restaurar scroll después de un breve delay para asegurar que el contenido está renderizado
    if (state.scrollX !== undefined || state.scrollY !== undefined) {
      setTimeout(() => {
        window.scrollTo(state.scrollX || 0, state.scrollY || 0);
      }, 50);
    }

    return true;
  } catch (e) {
    console.error("Error loading state:", e);
    return false;
  }
}

// Guardar estado cuando cambia
function trackStateChange() {
  saveState();
}

function totalPhotoPages() {
  return Math.max(1, Math.ceil(filteredPhotos.length / PER_PAGE));
}

function totalPages() {
  if (searchActive) return totalPhotoPages();
  return introPages.length + totalPhotoPages();
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ====== NORMALIZACIÓN DE TEXTO ======
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// ====== BÚSQUEDA ======
function performSearch(query, shouldSaveState = true) {
  const q = normalizeText(query.trim());

  if (!q) {
    filteredPhotos = [...photos];
    searchActive = false;
    currentPage = 0;
    clearSearchBtn.classList.remove("visible");
    renderPage();
    if (shouldSaveState) trackStateChange();
    return;
  }

  searchActive = true;
  clearSearchBtn.classList.add("visible");

  const numMatch = q.match(/^\d+$/);
  if (numMatch) {
    const num = parseInt(q, 10);
    filteredPhotos = photos.filter((_, idx) => idx + 1 === num);
  } else {
    filteredPhotos = photos.filter((photo, idx) => {
      const keywords = normalizeText(photo.secondary || "");
      const photoNum = (idx + 1).toString();
      return keywords.includes(q) || photoNum.includes(q);
    });
  }

  currentPage = 0;
  renderPage();
  if (shouldSaveState) trackStateChange();
}

searchInput.addEventListener("input", (e) => {
  performSearch(e.target.value);
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  performSearch("");
});

// ====== RENDERIZADO ======
function renderIntroPage(pageIndex) {
  grid.classList.remove("is-photos");
  grid.classList.add("is-text");
  grid.innerHTML = "";

  const p = introPages[pageIndex];

  const wrap = document.createElement("div");
  wrap.className = "intro";

  if (p.title) {
    const h = document.createElement("h2");
    h.className = "intro__title";
    h.textContent = p.title;
    wrap.appendChild(h);
  }

  const t = document.createElement("div");
  t.className = "intro__text";
  t.textContent = p.text;
  wrap.appendChild(t);

  grid.appendChild(wrap);
}

function renderPhotoPage(photoPageIndex) {
  grid.classList.remove("is-text");
  grid.classList.add("is-photos");
  grid.innerHTML = "";

  const start = photoPageIndex * PER_PAGE;
  const end = Math.min(start + PER_PAGE, filteredPhotos.length);
  const pagePhotos = filteredPhotos.slice(start, end);

  if (pagePhotos.length === 0) {
    const noResults = document.createElement("div");
    noResults.className = "intro__text";
    noResults.textContent = "No se encontraron resultados.";
    noResults.style.textAlign = "center";
    noResults.style.opacity = "0.7";
    grid.classList.remove("is-photos");
    grid.classList.add("is-text");
    grid.appendChild(noResults);
    return;
  }

  pagePhotos.forEach((photo, i) => {
    const globalIndex = photos.indexOf(photo);

    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    tile.setAttribute("aria-label", `Abrir foto ${globalIndex + 1}`);

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = "";

    tile.appendChild(img);
    tile.addEventListener("click", () => openModal(globalIndex));
    grid.appendChild(tile);
  });
}

function renderPage() {
  const tp = totalPages();

  if (searchActive) {
    renderPhotoPage(currentPage);
    const resultsText =
      filteredPhotos.length === 1 ? "resultado" : "resultados";
    pageIndicator.textContent = `${
      filteredPhotos.length
    } ${resultsText} - Página ${currentPage + 1} / ${tp}`;
  } else {
    const isIntro = currentPage < introPages.length;

    if (isIntro) {
      renderIntroPage(currentPage);
    } else {
      const photoPageIndex = currentPage - introPages.length;
      renderPhotoPage(photoPageIndex);
    }

    pageIndicator.textContent = `Página ${currentPage + 1} / ${tp}`;
  }

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage >= tp - 1;
}

prevBtn.addEventListener("click", () => {
  currentPage = clamp(currentPage - 1, 0, totalPages() - 1);
  renderPage();
  trackStateChange();
});

nextBtn.addEventListener("click", () => {
  currentPage = clamp(currentPage + 1, 0, totalPages() - 1);
  renderPage();
  trackStateChange();
});

// ====== NAVEGACIÓN CON TECLADO (FUERA DEL MODAL) ======
document.addEventListener("keydown", (e) => {
  // Si el modal está abierto, no navegamos páginas
  if (modal.classList.contains("is-open")) return;

  // Si estamos escribiendo en el input de búsqueda, no navegamos
  if (document.activeElement === searchInput) return;

  if (e.key === "ArrowLeft" && currentPage > 0) {
    e.preventDefault();
    currentPage = clamp(currentPage - 1, 0, totalPages() - 1);
    renderPage();
    trackStateChange();
  } else if (e.key === "ArrowRight" && currentPage < totalPages() - 1) {
    e.preventDefault();
    currentPage = clamp(currentPage + 1, 0, totalPages() - 1);
    renderPage();
    trackStateChange();
  }
});

// ====== CAPTION: 1ª línea italic Cormorant / 2ª línea Sukhumvit ======
function setModalCaption(rawCaption) {
  const text = (rawCaption || "").trim();

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const line1 = lines[0] || "";
  const line2 = lines[1] || "";

  modalCaption.innerHTML = "";

  const s1 = document.createElement("div");
  s1.className = "modal__capLine1";
  s1.textContent = line1;

  const s2 = document.createElement("div");
  s2.className = "modal__capLine2";
  s2.textContent = line2;

  modalCaption.appendChild(s1);
  modalCaption.appendChild(s2);
}

// ====== MODAL ======
function openModal(index) {
  currentModalIndex = index;

  const item = photos[currentModalIndex];
  modalImg.src = item.src;
  modalImg.alt = `Foto ${currentModalIndex + 1}`;

  modalNumber.textContent = `Nº ${currentModalIndex + 1}`;
  modalSecondary.textContent = item.secondary || "";

  setModalCaption(item.caption);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  updateModalNav();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
}

function updateModalNav() {
  modalPrev.disabled = currentModalIndex === 0;
  modalNext.disabled = currentModalIndex === photos.length - 1;
}

modalPrev.addEventListener("click", () => {
  if (currentModalIndex > 0) openModal(currentModalIndex - 1);
});

modalNext.addEventListener("click", () => {
  if (currentModalIndex < photos.length - 1) openModal(currentModalIndex + 1);
});

// Descargar imagen actual
modalDownload.addEventListener("click", () => {
  const item = photos[currentModalIndex];
  if (!item || !item.src) return;

  const a = document.createElement("a");
  a.href = item.src;

  const filename =
    item.src.split("/").pop() || `foto-${currentModalIndex + 1}.jpg`;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();
});

modal.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.dataset && target.dataset.close === "true") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft" && currentModalIndex > 0)
    openModal(currentModalIndex - 1);
  if (e.key === "ArrowRight" && currentModalIndex < photos.length - 1)
    openModal(currentModalIndex + 1);
});

// ====== INIT ======
const stateLoaded = loadState();
if (!stateLoaded) {
  renderPage();
} else {
  renderPage();
}

// Guardar estado antes de que la página se cierre
window.addEventListener("beforeunload", saveState);
