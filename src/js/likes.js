import { createElementFactory } from "./createElementFactory.js";

const urlParams = new URLSearchParams(window.location.search);

const createLikesCounterDomElements = (data) => {
  const mainElt = document.querySelector(".photographer-content");
  const asideElt = createElementFactory("aside", { class: "likes-counter" });

  const counterElt = createElementFactory("p", { class: "all-likes" }, "test");
  allLikesPhotographer(counterElt, data);

  const pricingElt = createElementFactory("p", { class: "photographer-pricing" });
  pricingPhotographer(pricingElt, data);

  const heartElt = createElementFactory("i", { class: "fas fa-heart" });

  counterElt.appendChild(heartElt);
  asideElt.appendChild(counterElt);
  asideElt.appendChild(pricingElt);
  mainElt.appendChild(asideElt);
};

const allLikesPhotographer = (elt, data) => {
  let allLikes = 0;
  data.media.forEach((media) => {
    if (media.photographerId === Number(urlParams.get("id"))) {
      allLikes += media.likes;
      elt.textContent = `${allLikes} `;
    }
  });
};

const pricingPhotographer = (elt, data) => {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      elt.textContent = photographer.price + "€/jour";
    }
  });
};

export { createLikesCounterDomElements };
