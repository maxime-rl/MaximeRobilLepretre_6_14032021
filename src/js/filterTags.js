import { createElementFactory } from "./createElementFactory.js";

const filterTagsList = document.querySelector(".nav-tags-list");

/**
 * Create DOM elements for the navigation list
 *
 * @param {object} data
 * @returns {object}
 */
const createFilterTagsNavList = (data) => {
  collectSortedTags(data).forEach((tag) => {
    const liEl = createElementFactory("li");
    const aEl = createElementFactory("a", { href: "#", class: "tag", "data-filter": `${tag}` });
    const span = createElementFactory("span", { class: "sr-only" }, "tag");
    aEl.textContent = "#" + tag;
    aEl.appendChild(span);
    liEl.appendChild(aEl);
    filterTagsList.appendChild(liEl);
  });
  return filterTagsList;
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
 * @returns {array}
 */
const collectSortedTags = (data) => {
  const tags = createUniqueTagsArr(data);

  return tags.sort();
};

// TEST FILTER TAGS
// TOGGLE CLASS TAG ACTIVE
const filterTags = () => {
  const filterTagsEl = filterTagsList.getElementsByClassName("tag");
  for (let i = 0; i < filterTagsEl.length; i++) {
    filterTagsEl[i].addEventListener("click", function () {
      filterTagsEl[i].classList.toggle("tag--active");
    });
  }
};

export { createFilterTagsNavList };
export { filterTags };
