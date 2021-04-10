import "../styles/main.scss";

import { Photographer } from "./Photographer.js";
import { MediasFactory } from "./MediasFactory.js";

const urlParams = new URLSearchParams(window.location.search);

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
  let mediasList = [];

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
      ).createMediaDomElement();
      return mediasList;
    }
  });
};

export { createProfileHeader };
export { createProfileMediasList };
