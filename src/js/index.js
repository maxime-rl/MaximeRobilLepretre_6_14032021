import "../styles/main.scss";

import { fetchData } from "./fetchData.js";
import { Photographer } from "./Photographer";

fetchData();

/**
 * Display photographers home page
 *
 * @param {object} data
 */
const createPhotographersMainList = (data) => {
  const photographersList = [];
  data.photographers.forEach((photographer) => {
    photographersList.push(new Photographer(
      photographer.id,
      photographer.name,
      photographer.portrait,
      photographer.city,
      photographer.country,
      photographer.price,
      photographer.tagline,
      photographer.tags
    ).createMainDomElements());
  });
};

export { createPhotographersMainList };
