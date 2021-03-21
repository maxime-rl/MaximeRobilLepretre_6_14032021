/* eslint-disable array-callback-return */
import "../styles/main.scss";

import { fetchData } from "./fetchData.js";

fetchData();

/**
 * DOM elements
 */
const photographersList = document.querySelector(".photographers-list");

/**
 * 1er test photographer card avec innerHTML
 */
// function createPhotographersList (data) {
//   data.photographers.map(photographer => {
//     const photographerCard = document.createElement("li");
//     const template = `
//       <a href="photographers.html?id=${photographer.id}">
//         <img src="../assets/images/${photographer.portrait}" alt="${photographer.name}">
//         <h2>${photographer.name}</h2>
//       </a>
//       <p>${photographer.city}, ${photographer.country}</p>
//       <p>${photographer.tagline}</p>
//       <p>${photographer.price}€/jour</p>
//       <ul>${photographer.tags.map(tag => `<li id=${tag}>#${tag}</li>`).join(" ")}</ul>
//     `;
//     console.log(photographerCard);
//     photographerCard.innerHTML = template;
//     photographersList.appendChild(photographerCard);
//   });
// }

function createPhotographersList (data) {
  /**
   * Iteration on data.photographers
   */
  data.photographers.map(photographer => {
  /**
   * Create elements
   */
    const photographerCard = document.createElement("li");
    const photographerLink = document.createElement("a");
    const photographerImg = document.createElement("img");
    const photographerTitle = document.createElement("h2");
    const photographerLocation = document.createElement("p");
    const photographerTagline = document.createElement("p");
    const photographerPrice = document.createElement("p");
    const photographerTagsList = document.createElement("ul");
    /**
     * Data elements
     */
    photographerTitle.textContent = `${photographer.name}`;
    photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
    photographerTagline.textContent = `${photographer.tagline}`;
    photographerPrice.textContent = `${photographer.price}€/jour`;
    // const templateTagList = `
    // <ul>${photographer.tags.map(tag => `<li id=${tag}>#${tag}</li>`).join(" ")}</ul>
    // `;
    // photographerTagsList.appendChild(templateTagList);
    // photographerTagsList.insertAdjacentElement("afterbegin", templateTagList);

    /**
     * Create setAttribute
     */
    photographerLink.setAttribute("href", `photographers.html?id=${photographer.id}`);
    photographerLink.setAttribute("title", `${photographer.name}`);
    photographerImg.setAttribute("src", `../assets/images/${photographer.portrait}`);
    photographerImg.setAttribute("alt", `${photographer.name}`);

    /**
      * Create class css
      */
    photographerCard.classList.add("photographer-card");
    photographerImg.classList.add("img-photographer");
    console.log(photographerCard);
    photographersList.appendChild(photographerCard);

    /**
     * Insert elements
     */
    photographerLink.insertAdjacentElement("afterbegin", photographerImg);
    photographerLink.insertAdjacentElement("beforeend", photographerTitle);
    photographerCard.insertAdjacentElement("afterbegin", photographerLink);
    photographerCard.insertAdjacentElement("beforeend", photographerLocation);
    photographerCard.insertAdjacentElement("beforeend", photographerTagline);
    photographerCard.insertAdjacentElement("beforeend", photographerPrice);
    photographerCard.insertAdjacentElement("beforeend", photographerTagsList);
  });
}

// function createPhotographerTags (data) {
//   const dataPhotographer = data.photographers;
//   dataPhotographer.tags.map(tag => {
//     const photographerTags = document.createElement("li");
//     photographerTags.setAttribute("id", `${tag}`);
//     photographerTags.textContent = `#${tag}`;
//   });
// }

export { createPhotographersList };
