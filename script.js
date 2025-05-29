// Numero totale di immagini che hai caricato nella cartella "images"
const imageCount = 35;

function getRandomImagePath() {
  const index = Math.floor(Math.random() * imageCount) + 1;
  return `images/polpo${index}.jpg`;
}

function loadImage() {
  const imgElement = document.getElementById("octopus-image");
  const imagePath = getRandomImagePath();
  imgElement.src = imagePath;

  // Se il nome del file contiene parole d'amore, attiva i cuori 💘
  const isLove = imagePath.toLowerCase().includes("love") || imagePath.toLowerCase().includes("cuore");

  const hearts = document.getElementById("hearts");
  if (isLove) {
    hearts.style.display = "block";
    setTimeout(() => hearts.style.display = "none", 1500);
  } else {
    hearts.style.display = "none";
  }
}

// Attiva il bottone per generare un nuovo polpo
document.getElementById("new-octopus").addEventListener("click", loadImage);

// Mostra un polpo subito all'avvio
window.onload = loadImage;
