import { createElementFactory } from "./createElementFactory.js";

const filterTagsList = document.querySelector(".filter-tags-list");

/**
 * Create DOM elements for the navigation list
 *
 * @param {object} data
 * @returns {object}
 */
const createFilterTagsNavList = (data) => {
  collectSortedTags(data).forEach((tag) => {
    const liEl = document.createElement("li");
    const aEl = createElementFactory("a", { href: "index.html" });
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
  console.log(tags);
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

export { createFilterTagsNavList };
