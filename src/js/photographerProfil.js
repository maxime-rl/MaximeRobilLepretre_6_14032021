import "../styles/main.scss";

import { Photographer } from "./Photographer.js";
import { MediasFactory } from "./MediasFactory.js";
import { Lightbox } from "./Lightbox.js";

import {
  updateMediaLikes,
  updateAllLikes
} from "./likes.js";

/**
 * Variables and constants
 */
const urlParams = new URLSearchParams(window.location.search);
let mediasList = [];
const mediaFactory = new MediasFactory();

/**
 * Create title tag foreach photographer
 * @param {data} data
 */
const createPhotographerPageTitleTag = (data) => {
  const titleElt = document.querySelector("title");
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      titleElt.textContent = "FishEye - profil de " + photographer.name;
    }
  });
};

/**
 * Create photographer header for page photographer
 * @param {data} data
 * @returns {HTMLElement}
 */
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
      return photographerHeader;
    }
  });
};

/**
 * Create medias list for page photographer
 * @param {data} data
 * @returns {HTMLElement}
 */
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
export { handleUpdatePhotographer };
