import "../styles/main.scss";

import { Photographer } from "./Photographer.js";
import { MediasFactory } from "./MediasFactory.js";
import { Select } from "./Select.js";
import { Lightbox } from "./Lightbox.js";
// import { sortMedias } from "./sort.js";

import {
  updateMediaLikes,
  updateAllLikes
} from "./likes.js";

const createPhotographerPageTitleTag = (data) => {
  const titleElt = document.querySelector("title");
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      titleElt.textContent = "Fishye - profil de " + photographer.name;
    }
  });
};

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

const selectElts = document.querySelectorAll("[data-custom]");
let select = "";

const createCustomSortSelect = () => {
  selectElts.forEach(selectElt => {
    select = new Select(selectElt);
    return select;
  });
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

const handleUpdatePhotographer = (data) => {
  createProfileMediasList(data);
  updateMediaLikes();
  updateAllLikes();
  Lightbox.init();
};

export { createPhotographerPageTitleTag };
export { createProfileHeader };
export { createProfileMediasList };
export { createCustomSortSelect };
export { handleUpdatePhotographer };
