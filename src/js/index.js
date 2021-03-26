/* eslint-disable array-callback-return */
import "../styles/main.scss";

import { fetchData } from "./fetchData.js";

fetchData();

/**
 * DOM elements
 */
const photographersList = document.querySelector(".photographers-list");
const filterTagsList = document.querySelector(".filter-tags-list");

/**
 * 1er test photographer card avec innerHTML
 */
function createPhotographerCard (data) {
  data.photographers.map(photographer => {
    const photographerCard = document.createElement("li");
    photographerCard.classList.add("photographer-card");
    const template = `
      <a href="photographers.html?id=${photographer.id}">
        <img src="../assets/images/${photographer.portrait}" alt="${photographer.name}">
        <h2>${photographer.name}</h2>
      </a>
      <p>${photographer.city}, ${photographer.country}</p>
      <p>${photographer.tagline}</p>
      <p>${photographer.price}€/jour</p>
      <ul>
          ${photographer.tags.map(tag => `<li><a href="index.html" class="filter-tag"><span>#</span>${tag}</a></li>`).join(" ")}
      </ul>
    `;
    photographerCard.innerHTML = template;
    photographersList.appendChild(photographerCard);
  });
}

function createFilterTagsList (data) {
  data.photographers.map(photographer => {
    photographer.tags.forEach((tag) => {
      // const test2 = [];
      // test2.push(tag);
      // console.log(test2);
      const filterTagLi = document.createElement("li");
      const filterTagLink = document.createElement("a");
      filterTagLink.textContent = tag;
      filterTagLi.appendChild(filterTagLink);
      filterTagsList.appendChild(filterTagLi);
    });
  });
}

/**
 * 2eme test photographer card avec insertAdjacentElement
 */
// function createPhotographerCard (data) {
//   /**
//    * Iteration on data.photographers
//    */
//   data.photographers.map(photographer => {
//   /**
//    * Create elements
//    */
//     const photographerCard = document.createElement("li");
//     const photographerLink = document.createElement("a");
//     const photographerImg = document.createElement("img");
//     const photographerTitle = document.createElement("h2");
//     const photographerLocation = document.createElement("p");
//     const photographerTagline = document.createElement("p");
//     const photographerPrice = document.createElement("p");
//     const photographerTagsList = document.createElement("ul");
//     /**
//      * Data elements
//      */
//     photographerTitle.textContent = `${photographer.name}`;
//     photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
//     photographerTagline.textContent = `${photographer.tagline}`;
//     photographerPrice.textContent = `${photographer.price}€/jour`;

//     photographer.tags.forEach((tag) => {
//       const photographerTagLi = document.createElement("li");
//       const photographerTagLink = document.createElement("a");
//       photographerTagLink.classList.add("filter-tag");
//       photographerTagLink.setAttribute("href", "index.html");
//       photographerTagLink.textContent = tag;
//       photographerTagLi.appendChild(photographerTagLink);
//       photographerTagsList.appendChild(photographerTagLi);
//     });
//     /**
//      * Create setAttribute
//      */
//     photographerLink.setAttribute("href", `photographers.html?id=${photographer.id}`);
//     photographerLink.setAttribute("title", `${photographer.name}`);
//     photographerImg.setAttribute("src", `../assets/images/${photographer.portrait}`);
//     photographerImg.setAttribute("alt", `${photographer.name}`);
//     /**
//       * Create class css
//       */
//     photographerCard.classList.add("photographer-card");
//     photographerImg.classList.add("img-photographer");
//     photographersList.appendChild(photographerCard);
//     /**
//      * Insert elements
//      */
//     photographerLink.insertAdjacentElement("afterbegin", photographerImg);
//     photographerLink.insertAdjacentElement("beforeend", photographerTitle);
//     photographerCard.insertAdjacentElement("afterbegin", photographerLink);
//     photographerCard.insertAdjacentElement("beforeend", photographerLocation);
//     photographerCard.insertAdjacentElement("beforeend", photographerTagline);
//     photographerCard.insertAdjacentElement("beforeend", photographerPrice);
//     photographerCard.insertAdjacentElement("beforeend", photographerTagsList);
//   });
// }

export { createPhotographerCard };
export { createFilterTagsList };
