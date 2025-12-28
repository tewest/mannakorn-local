// public/app.js
const icons = ["🌾","✨","☀️","🙏","📖","💛","✝️","🕊️"];
const btn = document.getElementById("newBtn");
const iconEl = document.getElementById("icon");
const photoEl = document.getElementById("photo");
const verseEl = document.getElementById("verse");
const refEl = document.getElementById("ref");

let lastFetch = 0;
const DEBOUNCE_MS = 600;

async function loadVerse() {
  const now = Date.now();
  if (now - lastFetch < DEBOUNCE_MS) return;
  lastFetch = now;

  try {
    const res = await fetch("/api/random");
    if (!res.ok) {
      const txt = await res.text().catch(()=>res.statusText||"");
      throw new Error(`HTTP ${res.status} ${txt}`);
    }
    const data = await res.json();

    if (iconEl) {
      iconEl.textContent = icons[Math.floor(Math.random()*icons.length)];
      iconEl.style.transform = "scale(1.12) rotate(8deg)";
      setTimeout(()=>iconEl.style.transform="",280);
    }

    if (verseEl) verseEl.textContent = data.text || "";
    if (refEl) refEl.textContent = data.reference || "";

    if (photoEl) {
      if (data.image) {
        photoEl.src = data.image;
        photoEl.style.display = "block";
      } else {
        photoEl.removeAttribute && photoEl.removeAttribute("src");
        photoEl.style.display = "none";
      }
    }
  } catch (err) {
    console.error("Error loading verse:", err);
    if (verseEl) verseEl.textContent = "Feil ved lasting av vers";
    if (refEl) refEl.textContent = err.message || String(err);
    if (photoEl) photoEl.style.display = "none";
  }
}

// Koble event listeners bare hvis elementene finnes
if (btn) btn.addEventListener("click", loadVerse);

const card = document.getElementById("card");
if (card) {
  card.addEventListener("click", (e) => {
    // unngå at knapp-klikking trigges dobbelt hvis knapp ligger over kortet
    if (e.target && (e.target.id === "newBtn" || e.target.closest && e.target.closest("#newBtn"))) return;
    card.style.transform = "scale(0.995)";
    setTimeout(()=>card.style.transform="",160);
    loadVerse();
  });
}

// Første lasting (try/catch for sikkerhet)
try { loadVerse(); } catch(e) { console.error("Initial load failed:", e); }