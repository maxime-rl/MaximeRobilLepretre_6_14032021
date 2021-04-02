import "../styles/main.scss";

import { Photographer } from "./Photographer.js";
// import { MediasFactory } from "./Media.js";

const urlParams = new URLSearchParams(window.location.search);

const createPhotographerProfilPage = (data) => {
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
      ).createProfilHeaderDomElements());
    }
  });
  return photographerHeader;
};

export { createPhotographerProfilPage };
