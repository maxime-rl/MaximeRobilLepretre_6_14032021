import "../styles/main.scss";

import { fetchData } from "./fetchData.js";
import { createElementFactory } from "./createElementFactory.js";

fetchData();

/**
 * DOM elements
 */
const photographersList = document.querySelector(".photographers-list");

/**
 * Create DOM elements for photographer card
 *
 * @param {object} data
 * @returns {object}
 */
const createPhotographerCard = (data) => {
  let photographer = data.photographers;
  for (photographer of data.photographers) {
    const ulElPhotographer = document.createElement("ul");
    const liElPhotographer = createElementFactory("li", { class: "photographer" });
    const aELPhotographer = createElementFactory("a", { href: `photographer.html?id=${photographer.id}`, tabindex: "0" });
    const spanElPhotographer = createElementFactory("span", { class: "sr-only sr-only-focusable" }, `${photographer.name}`);
    const imgElPhotographer = createElementFactory("img", { src: `../assets/images/${photographer.portrait}`, alt: " " });
    const h2ElPhotographer = createElementFactory("h2", {}, `${photographer.name}`);
    const pElPhotographerLocation = createElementFactory("p", { class: "photographer__location" }, (`${photographer.city}, ${photographer.country}`));
    const pElPhotographerTagline = createElementFactory("p", { class: "photographer__tagline" }, `${photographer.tagline}`);
    const pElPhotographerPrice = createElementFactory("p", { class: "photographer__price" }, `${photographer.price}€/jour`);

    photographer.tags.forEach((tag) => {
      const liElTag = document.createElement("li");
      const aElTag = createElementFactory("a", { class: "filter-tag", href: "index.html" });
      const spanElTag = createElementFactory("span", { class: "sr-only" }, "tag");
      aElTag.textContent = "#" + tag;

      aElTag.appendChild(spanElTag);
      liElTag.appendChild(aElTag);
      ulElPhotographer.appendChild(liElTag);
    });

    aELPhotographer.appendChild(spanElPhotographer);
    aELPhotographer.appendChild(imgElPhotographer);
    aELPhotographer.appendChild(h2ElPhotographer);
    liElPhotographer.appendChild(aELPhotographer);
    liElPhotographer.appendChild(pElPhotographerLocation);
    liElPhotographer.appendChild(pElPhotographerTagline);
    liElPhotographer.appendChild(pElPhotographerPrice);
    liElPhotographer.appendChild(ulElPhotographer);
    photographersList.appendChild(liElPhotographer);
  }
  return photographersList;
};

export { createPhotographerCard };
