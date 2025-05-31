// Numero totale di immagini nella cartella "images"
const imageCount = 37;

function getRandomImagePath() {
  const index = Math.floor(Math.random() * imageCount) + 1;
  return `images/polpo${index}.jpg`; // Template literal e nome file coerente
}

function loadImage() {
  const imgElement = document.getElementById("octopus-image");
  const imagePath = getRandomImagePath();
  imgElement.src = imagePath;

  const isLove = imagePath.toLowerCase().includes("love") || imagePath.toLowerCase().includes("cuore");
  const hearts = document.getElementById("hearts");

  if (isLove) {
    hearts.style.display = "block";
  } else {
    hearts.style.display = "none"; // Chiudi la logica
  }

  document.getElementById("octopus-image").addEventListener("click", function (e) {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  document.body.appendChild(heart);

    document.getElementById("octopus-image").addEventListener("click", function (e) {
  const colors = ['deeppink', 'red', 'hotpink', 'violet', 'magenta'];

  for (let i = 0; i < 3; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";

    const x = e.clientX + (Math.random() * 60 - 30); // posizione sparsa
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


  const rect = e.target.getBoundingClientRect();
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;

  setTimeout(() => {
    heart.remove();
  }, 1000);
});

}
document.getElementById("new-octopus").addEventListener("click", loadImage);
