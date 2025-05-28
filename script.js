async function loadImage() {
  const response = await fetch("https://api.unsplash.com/photos/random?query=octopus,squid&client_id=Gtm9c4Em02v8-yvl__DK70bRYOwOnoOmJGbvTFF0TUY");
  const data = await response.json();

  const imgElement = document.getElementById("octopus-image");
  imgElement.src = data.urls.regular;

  const isLove = data.alt_description?.toLowerCase().includes("love") || data.description?.toLowerCase().includes("love");

  const hearts = document.getElementById("hearts");
  if (isLove) {
    hearts.style.display = "block";
    setTimeout(() => hearts.style.display = "none", 1500);
  } else {
    hearts.style.display = "none";
  }
}

window.onload = function () {
  loadImage();
};
