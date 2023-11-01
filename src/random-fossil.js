import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const getRandomFossilButton = document.getElementById("get-random-fossil");
  const fossilImageDiv = document.getElementById("random-fossil-image");
  const fossilNameParagraph = document.getElementById("random-fossil-name");

  getRandomFossilButton.addEventListener("click", () => {
    axios.get("/random-fossil.json")
      .then((response) => {
        const { img, name } = response.data;

        fossilImageDiv.innerHTML = `<img src="${img}" alt="${name}" />`;
        fossilNameParagraph.textContent = name;
      })
      .catch((error) => {
        console.error("Error fetching random fossil:", error);
      });
  });
});


console.log('Hello World');
