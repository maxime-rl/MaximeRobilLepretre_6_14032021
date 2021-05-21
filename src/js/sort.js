import { handleUpdatePhotographer } from "./photographerProfil";

/**
 * Listen to the select tag to sort and rebuild the DOM
 * @param {data} data
 */
const sortMedias = (data) => {
  const selectElt = document.getElementById("sortBy");
  const mediasListElt = document.querySelector(".medias-list");

  selectElt.addEventListener("change", () => {
    if (selectElt.value === "Popularité") {
      removeFirstChildElt(mediasListElt);
      sortByPopularity(data.media);
      handleUpdatePhotographer(data);
    }
    if (selectElt.value === "Date") {
      removeFirstChildElt(mediasListElt);
      sortByDate(data.media);
      handleUpdatePhotographer(data);
    }
    if (selectElt.value === "Titre") {
      removeFirstChildElt(mediasListElt);
      sortByTitle(data.media);
      handleUpdatePhotographer(data);
    }
  });
};

/**
 * elt to sort by likes
 * @param {array}
 * @returns sorted works
 */
const sortByPopularity = (elt) => {
  return elt.sort((a, b) => b.likes - a.likes);
};

/**
 * elt to sort by dates
 * @param {array}
 * @returns sorted works
 */
const sortByDate = (elt) => {
  return elt.sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * elt to sort by titles
 * @param {array}
 * @returns sorted works
 */
const sortByTitle = (elt) => {
  return elt.sort((a, b) => {
    const titleA = a.alt.toUpperCase();
    const titleB = b.alt.toUpperCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
};

/**
 * Remove first child html elt
 * @param {HTMLElement}
 */
const removeFirstChildElt = (elt) => {
  while (elt.firstChild) {
    elt.removeChild(elt.firstChild);
  }
};

/**
 * Change icon if select is open or close
 */
const changeIconselect = () => {
  const selectElt = document.getElementById("sortBy");
  const selectIconElt = document.querySelector(".select-icon");

  selectElt.addEventListener("click", () => {
    selectIconElt.classList.toggle("fa-chevron-up");
  });
};

export { sortMedias };
export { sortByPopularity };
export { changeIconselect };
