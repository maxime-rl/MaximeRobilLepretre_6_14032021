import { createElementFactory } from "./createElementFactory.js";

/**
 * DOM elements
 */
const filterTagsList = document.querySelector(".nav-tags-list");

/**
 * Create DOM elements for the navigation list
 *
 * @param {object} data
 * @returns {object} li tags elements
 */
const createFilterTagsNavList = (data) => {
  collectSortedTags(data).forEach((tag) => {
    const liEl = createElementFactory("li");
    const aEl = createElementFactory("a", { href: "#", class: "tag", "data-filter": `${tag}` });
    const spanEl = createElementFactory("span", { class: "sr-only" }, "tag");
    aEl.textContent = "#" + tag;
    aEl.appendChild(spanEl);
    liEl.appendChild(aEl);
    filterTagsList.appendChild(liEl);
  });
  // Add filter tag #all in filters tag nav list
  const liAllEl = createElementFactory("li");
  const aAllEl = createElementFactory("a", { href: "#", class: "tag tag--active", "data-filter": "all" }, "#all");
  const spanAllEl = createElementFactory("span", { class: "sr-only" }, "tag");
  aAllEl.appendChild(spanAllEl);
  liAllEl.appendChild(aAllEl);
  filterTagsList.insertAdjacentElement("afterbegin", liAllEl);
};

/**
 * Create tags list without duplicates
 *
 * @param {object} data
 * @returns {object}
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
 * @returns {array} unique tag list sort alphabetically for navigation
 */
const collectSortedTags = (data) => {
  const tags = createUniqueTagsArr(data);

  return tags.sort();
};

/**
 * Filtering photographers by tags
 *
 * @param {object} data
 */
const filteringPhotographersByTags = (data) => {
  const photographersList = document.querySelector(".photographers-list");
  const filterTagsNav = filterTagsList.getElementsByClassName("tag");
  const photographerCard = photographersList.getElementsByClassName("photographer");

  for (const tag of filterTagsNav) {
    tag.addEventListener("click", (e) => {
      const el = e.target;
      const active = document.querySelector(".tag--active");

      if (active) {
        active.classList.remove("tag--active");
      }

      el.classList.add("tag--active");
      const dataSetFilterTagNav = el.dataset.filter;

      for (let i = 0; i < data.photographers.length; i++) {
        if (!data.photographers[i].tags.includes(dataSetFilterTagNav)) {
          photographerCard[i].classList.add("hide");
          photographerCard[i].classList.remove("show");
          console.log(photographerCard[i]);
        } else {
          photographerCard[i].classList.remove("hide");
          photographerCard[i].classList.add("show");
        }
      }
      if (dataSetFilterTagNav === "all") {
        for (const photographer of photographersList.children) {
          photographer.classList.remove("hide");
          photographer.classList.add("show");
        }
      }
    });
  }
};

export { createFilterTagsNavList };
export { filteringPhotographersByTags };
