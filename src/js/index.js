/* eslint-disable array-callback-return */
import "../styles/main.scss";

import { fetchData } from "./fetchData.js";

fetchData();

/**
 * DOM elements
 */
const photographersList = document.querySelector(".photographers-list");
const filterTagsList = document.querySelector(".filter-tags-list");

const createFilterTagsNavList = (data) => {
  collectSortedTags(data).forEach((tag) => {
    const filterTagNavLi = document.createElement("li");
    const filterTagNavLink = createLinkElement("index.html");
    const spanForScreenReader = createTextElement("span", "sr-only", "tag");
    filterTagNavLink.textContent = "#" + tag;
    filterTagNavLink.appendChild(spanForScreenReader);
    filterTagNavLi.appendChild(filterTagNavLink);
    filterTagsList.appendChild(filterTagNavLi);
  });
};

const uniqueTagsArr = (data) => {
  const tags = new Set();

  for (const photographer of data.photographers) {
    for (let tag of photographer.tags) {
      tag = tag.toLowerCase();
      tags.add(tag);
    }
  }
  return [...tags];
};

const collectSortedTags = (data) => {
  const tags = uniqueTagsArr(data);

  return tags.sort();
};

const createPhotographerCard = (data) => {
  data.photographers.map(photographer => {
    const photographerCard = createElementWithClassCss("li", "photographer-card");
    const photographerLink = createLinkElement(`photographer.html?id=${photographer.id}`);
    photographerLink.setAttribute("tabindex", 0);
    const spanForScreenReader = createTextElement("span", "sr-only", `${photographer.name}`);
    spanForScreenReader.classList.add("sr-only-focusable");
    const photographerImg = createImgElement(`../assets/images/${photographer.portrait}`, " ");
    const photographerName = createTextElement("h2", "photographer-name", `${photographer.name}`);
    const photographerLocation = createTextElement("p", "photographer-location", (`${photographer.city}, ${photographer.country}`));
    const photographerTagline = createTextElement("p", "photographer-tagline", `${photographer.tagline}`);
    const photographerPrice = createTextElement("p", "photographer-price", `${photographer.price}€/jour`);
    const photographerTagsList = document.createElement("ul");

    photographer.tags.forEach((tag) => {
      const photographerTagLi = document.createElement("li");
      const photographerTagLink = document.createElement("a");
      photographerTagLink.classList.add("filter-tag");
      photographerTagLink.setAttribute("href", "index.html");
      const spanForScreenReader = createTextElement("span", "sr-only", "tag");
      photographerTagLink.textContent = "#" + tag;

      photographerTagLink.appendChild(spanForScreenReader);
      photographerTagLi.appendChild(photographerTagLink);
      photographerTagsList.appendChild(photographerTagLi);
    });

    photographersList.appendChild(photographerCard);

    photographerLink.insertAdjacentElement("afterbegin", spanForScreenReader);
    photographerLink.insertAdjacentElement("afterbegin", photographerImg);
    photographerLink.insertAdjacentElement("beforeend", photographerName);
    photographerCard.insertAdjacentElement("afterbegin", photographerLink);
    photographerCard.insertAdjacentElement("beforeend", photographerLocation);
    photographerCard.insertAdjacentElement("beforeend", photographerTagline);
    photographerCard.insertAdjacentElement("beforeend", photographerPrice);
    photographerCard.insertAdjacentElement("beforeend", photographerTagsList);
  });
};

const createTextElement = (htmlTag, classCSS, text) => {
  const element = createElementWithClassCss(htmlTag, classCSS);
  element.textContent = text;

  return element;
};

const createLinkElement = (link) => {
  const element = document.createElement("a");
  element.setAttribute("href", link);

  return element;
};

const createElementWithClassCss = (htmlTag, classCSS) => {
  const element = document.createElement(htmlTag);
  element.classList.add(classCSS);

  return element;
};

const createImgElement = (src, alt) => {
  const element = document.createElement("img");
  element.setAttribute("src", src);
  element.setAttribute("alt", alt);

  return element;
};

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
export { createFilterTagsNavList };
