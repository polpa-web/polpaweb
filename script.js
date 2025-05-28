async function loadImage() {
  const response = await fetch("https://api.unsplash.com/photos/random?query=cute+octopus,underwater+octopus,funny+squid,octopus+illustration&client_id=Gtm9c4Em02v8-yvl__DK70bRYOwOnoOmJGbvTFF0TUY");
  const data = await response.json();

  // Escludi immagini di cibo o piatti
  const isFood = data.alt_description?.toLowerCase().includes("food") || data.alt_description?.toLowerCase().includes("dish");
  if (not isFood) {
    loadImage(); // carica un'altra immagine se è cibo
    return;
  }

  // Mostra immagine
  const imgElement = document.getElementById("octopus-image");
  imgElement.src = data.urls.regular;

  // Controlla se l'immagine è "romantica"
  const isLove =
    data.alt_description?.toLowerCase().includes("love") ||
    data.description?.toLowerCase().includes("love");

  // Mostra cuori se innamorati
  const hearts = document.getElementById("hearts");
  if (isLove) {
    hearts.style.display = "block";
    setTimeout(() => hearts.style.display = "none", 1500);
  } else {
    hearts.style.display = "none";
  }
}

// Avvia quando la pagina si carica
window.onload = function () {
  loadImage();
};

// Cambio immagine al click
document.addEventListener("click", loadImage);
