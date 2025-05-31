// Numero totale di immagini nella cartella "images"
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

// Clic sul bottone "NEW POLP"
document.getElementById("new-octopus").addEventListener("click", loadImage);

// Clic sull'immagine = MAESTOSO SCOPPIO DI CUORI
document.getElementById("octopus-image").addEventListener("click", function (e) {
  const colors = ['deeppink', 'red', 'hotpink', 'violet', 'magenta'];

  for (let i = 0; i < 3; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";

    const x = e.clientX + (Math.random() * 60 - 30);
    const y = e.clientY + (Math.random() * 20 - 10);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1500);
  }
});
