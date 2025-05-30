// Numero totale di immagini che hai caricato nella cartella "images"
const imageCount = 35;

function getRandomImagePath() {
  const index = Math.floor(Math.random() * imageCount) + 1;
  return `images/polpo${index}.jpg`;
}

export function loadImage() {
  const imgElement = document.getElementById("octopus-image");
  const imagePath = getRandomImagePath();
  imgElement.src = imagePath;

  const isLove = imagePath.toLowerCase().includes("love") || imagePath.toLowerCase().includes("cuore");
  const hearts = document.getElementById("hearts");

  if (isLove) {
    hearts.style.display = "block";
    setTimeout(() => hearts.style.display = "none", 1500);
  } else {
    hearts.style.display = "none";
  }
}

document.getElementById("new-octopus").addEventListener("click", loadImage);
