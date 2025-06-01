const imageCount = 37;

function getRandomImagePath() {
  const index = Math.floor(Math.random() * imageCount) + 1;
  return `images/polpo${index}.jpg`;
}

function loadImage() {
  const imgElement = document.getElementById("octopus-image");
  const imagePath = getRandomImagePath();
  imgElement.src = imagePath;

  const isLove = imagePath.toLowerCase().includes("love") || imagePath.toLowerCase().includes("cuore");
  const hearts = document.getElementById("hearts");

  hearts.style.display = isLove ? "block" : "none";
}

// Solo una volta, dopo che il DOM è pronto
window.addEventListener("DOMContentLoaded", () => {
  const imgElement = document.getElementById("octopus-image");
  const newPolpButton = document.getElementById("new-octopus");

  newPolpButton.addEventListener("click", loadImage);

  imgElement.addEventListener("click", (e) => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    document.body.appendChild(heart);

    // Calcolo posizione con offset rispetto al rettangolo dell'immagine
    const rect = e.target.getBoundingClientRect();
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;

    setTimeout(() => {
      heart.remove();
    }, 1000);
  });

  // Carica un'immagine iniziale
  loadImage();
});

