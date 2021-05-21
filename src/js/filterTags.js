import { createElementFactory } from "./createElementFactory.js";

/**
 * DOM elements
 */
const filterTagsList = document.querySelector(".tags-list");

/**
 * Create DOM elements for the navigation list
 *
 * @param {object} data
 * @returns {DOM elements} li tags elements
 */
const createFilterTagsNavList = (data) => {
  collectSortedTags(data).forEach((tag) => {
    const tagElt = createElementFactory("li");
    const linkElt = createElementFactory("a", { href: "#", class: "tag", "data-filter": `${tag}` });
    const screenOnlyElt = createElementFactory("span", { class: "sr-only" }, tag);

    linkElt.textContent = "#" + tag;
    linkElt.appendChild(screenOnlyElt);

    tagElt.appendChild(linkElt);

    filterTagsList.appendChild(tagElt);
  });
  // Add filter tag #all in filters tag nav list
  const tagAllElt = createElementFactory("li");
  const linkAllElt = createElementFactory("a", { href: "#", class: "tag tag--active", "data-filter": "all" }, "#all");
  const screenOnlyAllEl = createElementFactory("span", { class: "sr-only" }, "tag");

  linkAllElt.appendChild(screenOnlyAllEl);
  tagAllElt.appendChild(linkAllElt);
  filterTagsList.insertAdjacentElement("afterbegin", tagAllElt);
};

/**
 * Create tags list without duplicates
 *
 * @param {object} data
 * @returns {array} unique tag array
 */
const createUniqueTagsArr = (data) => {
  const tags = new Set();

  for (const photographer of data.photographers) {
    for (let tag of photographer.tags) {
      tag = tag.toLowerCase();
      tags.add(tag);
    }
  }
  return [...tags];
};

/**
 * Sort tags alphabetically
 *
 * @param {object} data
 * @returns {array} unique tag array sort alphabetically for navigation
 */
const collectSortedTags = (data) => {
  const tags = createUniqueTagsArr(data);

  return tags.sort();
};

/**
 * Filtering photographers by tags with data attributs
 *
 * @param {object} data
 */
const filteringPhotographersByTags = (data) => {
  const listElt = document.querySelector(".photographers-list");
  const filterTagsNav = filterTagsList.getElementsByClassName("tag");

  for (const tag of filterTagsNav) {
    tag.addEventListener("click", (e) => {
      const active = document.querySelector(".tag--active");
      const elt = e.target;

      if (active) {
        active.classList.remove("tag--active");
      }

      elt.classList.add("tag--active");

      // storage data attribute filter on each tag
      const dataAttrTagNav = elt.dataset.filter;

      displayPhotographers(elt, data);

      if (dataAttrTagNav === "all") {
        for (const photographer of listElt.children) {
          photographer.classList.remove("hide");
          photographer.classList.add("show");
        }
      }
    });
  }
};

/**
 * compare data attribute filter in tags of each photographer and show or hide photographer
 *
 * @param {DOM element} elt active tag
 * @param {object} data
 */
const displayPhotographers = (elt, data) => {
  const listElt = document.querySelector(".photographers-list");
  const cardsElt = listElt.getElementsByClassName("photographer");
  const dataAttrTagNav = elt.dataset.filter;

  for (let i = 0; i < data.photographers.length; i++) {
    if (!data.photographers[i].tags.includes(dataAttrTagNav)) {
      cardsElt[i].classList.add("hide");
      cardsElt[i].classList.remove("show");
    } else {
      cardsElt[i].classList.remove("hide");
      cardsElt[i].classList.add("show");
    }
  }
};

export { createFilterTagsNavList };
export { filteringPhotographersByTags };
