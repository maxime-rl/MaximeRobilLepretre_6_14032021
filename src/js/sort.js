import { handleUpdatePhotographer } from "./photographerProfil";

const sortMedias = (data) => {
  const popularityElt = document.querySelector("[data-value='Popularité']");
  const dateElt = document.querySelector("[data-value='Date']");
  const titleElt = document.querySelector("[data-value='Titre']");

  popularityElt.addEventListener("click", () => {
    const elt = document.querySelector(".medias-list");
    while (elt.firstChild) {
      elt.removeChild(elt.firstChild);
    }
    sortByPopularity(data.media);
    handleUpdatePhotographer(data);
  });

  dateElt.addEventListener("click", () => {
    const elt = document.querySelector(".medias-list");
    while (elt.firstChild) {
      elt.removeChild(elt.firstChild);
    }
    sortByDate(data.media);
    handleUpdatePhotographer(data);
  });

  titleElt.addEventListener("click", () => {
    const elt = document.querySelector(".medias-list");
    while (elt.firstChild) {
      elt.removeChild(elt.firstChild);
    }
    sortByTitle(data.media);
    handleUpdatePhotographer(data);
  });

  titleElt.addEventListener("keydown", e => {
    if (e.key === "Escape" || e.key === "Enter") {
      const elt = document.querySelector(".medias-list");
      while (elt.firstChild) {
        elt.removeChild(elt.firstChild);
      }
      sortByTitle(data.media);
      handleUpdatePhotographer(data);
    }
  });
};

const sortByPopularity = (elt) => {
  return elt.sort((a, b) => b.likes - a.likes);
};

const sortByDate = (elt) => {
  return elt.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const sortByTitle = (elt) => {
  return elt.sort((a, b) => {
    const titleA = a.alt.toUpperCase();
    const titleB = b.alt.toUpperCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
};

export { sortMedias };
export { sortByPopularity };
