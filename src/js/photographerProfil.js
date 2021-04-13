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

// TEST display slider modal with aria-haspopup
const displaySlider = () => {
  const mediaTriggers = document.querySelectorAll('[aria-haspopup="lightbox-dialog"]');
  const profileHeader = document.querySelector(".page-photographer-header");
  const profileContent = document.querySelector(".photographer-content");

  const open = function (dialog) {
    document.body.style.overflow = "hidden";
    dialog.setAttribute("aria-hidden", false);
    profileHeader.setAttribute("aria-hidden", true);
    profileContent.setAttribute("aria-hidden", true);
  };

  const close = function (dialog) {
    document.body.style.overflow = "auto";
    dialog.setAttribute("aria-hidden", true);
    profileHeader.setAttribute("aria-hidden", false);
    profileContent.setAttribute("aria-hidden", false);
  };

  mediaTriggers.forEach((trigger) => {
    const dialog = document.getElementById(trigger.getAttribute("aria-controls"));
    const dismissTriggers = dialog.querySelectorAll('[data-dismiss="lightbox-dialog"]');

    // open dialog
    trigger.addEventListener("click", (event) => {
      event.preventDefault();

      open(dialog);
    });

    // close dialog
    dismissTriggers.forEach((dismissTrigger) => {
      const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);

      dismissTrigger.addEventListener("click", (event) => {
        event.preventDefault();

        close(dismissDialog);
      });
    });

    window.addEventListener("click", (event) => {
      if (event.target === dialog) {
        close(dialog);
      }
    });
  });
};

export { createProfileHeader };
export { createProfileMediasList };
export { displaySlider };
