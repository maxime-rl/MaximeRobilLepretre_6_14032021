import "../styles/main.scss";

import { Photographer } from "./Photographer.js";
import { MediasFactory } from "./MediasFactory.js";
import { Select } from "./Select.js";

const urlParams = new URLSearchParams(window.location.search);
let mediasList = [];

const createProfileHeader = (data) => {
  let photographerHeader = "";
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      photographerHeader = (new Photographer(
        photographer.id,
        photographer.name,
        photographer.portrait,
        photographer.city,
        photographer.country,
        photographer.tags,
        photographer.tagline,
        photographer.price
      ).createProfileHeaderDomElements());
    }
  });
  return photographerHeader;
};

const mediaFactory = new MediasFactory();

const createProfileMediasList = (data) => {
  data.media.forEach((media) => {
    if (media.photographerId === Number(urlParams.get("id"))) {
      mediasList = mediaFactory.createMedia(
        media.id,
        media.photographerId,
        media.image?.split(".").pop() || media.video?.split(".").pop(),
        media.image || media.video,
        media.tags,
        media.likes,
        media.date,
        media.price,
        media.alt
      ).createDomElt();
      return mediasList;
    }
  });
};

const selectElts = document.querySelectorAll("[data-custom]");
let select = "";

const createCustomSortSelect = () => {
  selectElts.forEach(selectElt => {
    select = new Select(selectElt);
    sortMedias();
    return select;
  });
};

// TEST sortMedias
const sortMedias = () => {
  const popularityElt = document.querySelector("[data-value='Popularité']");
  const dateElt = document.querySelector("[data-value='Date']");
  const titleElt = document.querySelector("[data-value='Titre']");

  popularityElt.addEventListener("click", () => {
    sortByPopularity(mediasList);
  });

  dateElt.addEventListener("click", () => {
    sortByDate(mediasList);
  });

  titleElt.addEventListener("click", () => {
    sortByTitle(mediasList);
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

export { createProfileHeader };
export { createProfileMediasList };
export { createCustomSortSelect };
