import { createElementFactory } from "./createElementFactory.js";

const urlParams = new URLSearchParams(window.location.search);

const createLikesCounterDomElements = (data) => {
  const mainElt = document.querySelector(".photographer-content");
  const asideElt = createElementFactory("aside", { class: "likes-counter" });

  const counterElt = createElementFactory("p", { class: "all-likes" });
  allLikesPhotographer(counterElt, data);

  const pricingElt = createElementFactory("p", { class: "photographer-pricing" });
  pricingPhotographer(pricingElt, data);

  const heartElt = createElementFactory("i", { class: "fas fa-heart" });

  counterElt.appendChild(heartElt);
  asideElt.appendChild(counterElt);
  asideElt.appendChild(pricingElt);
  mainElt.appendChild(asideElt);
};

let allLikes = 0;

const allLikesPhotographer = (elt, data) => {
  data.media.forEach((media) => {
    if (media.photographerId === Number(urlParams.get("id"))) {
      allLikes += media.likes;
      elt.textContent = `${allLikes} `;
    }
  });
};

const handleLikes = () => {
  const btnLikes = document.querySelectorAll(".media-likes");
  const allLikesDomElt = document.querySelector(".all-likes");
  const heartElt = document.querySelector(".media-likes > i");
  let addLike = true;
  btnLikes.forEach((btnLike) => {
    btnLike.addEventListener("click", () => {
      if (addLike) {
        allLikesDomElt.textContent = allLikes += 1;
        heartElt.classList.remove("far");
        heartElt.classList.add("fas");
        addLike = false;
      } else if (!addLike) {
        allLikesDomElt.textContent = allLikes -= 1;
        heartElt.classList.remove("fas");
        heartElt.classList.add("far");
        addLike = true;
      }
    });
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
export { handleLikes };
