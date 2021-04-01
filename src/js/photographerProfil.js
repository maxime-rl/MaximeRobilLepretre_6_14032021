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

//   const mediaList = [];

//   data.media.forEach((media) => {
//     if (media.photographerId === currentPhotographer.id) {
//       mediaList.push(new MediasFactory(
//         media.id,
//         media.photographerId,
//         media.image?.split(".").pop() || media.video?.split(".").pop(),
//         media.image || media.video,
//         media.tags,
//         media.likes,
//         media.date,
//         media.price,
//         media.alt
//       ).createMedia());
//     }
//   });
// };

export { createPhotographerProfilPage };
