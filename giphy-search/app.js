const searchButton = document.getElementById("submitSearch");
const searchInput = document.getElementById("searchWord");
const imageElement = document.querySelector("#imageContainer img");

const API_KEY = "s5Q27Tbx6Gr5xbZ25kDfss4aZqmwG9KP";
const API_URL = "https://api.giphy.com/v1/gifs/translate";

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  fetch(`${API_URL}?api_key=${API_KEY}&s=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.data && data.data.images) {
        imageElement.src = data.data.images.original.url;
      } else {
        imageElement.src = "#";
        console.error("No image found");
      }
      searchInput.value = "";
    })
    .catch((error) => {
      console.error("Error fetching Giphy:", error);
    });
});