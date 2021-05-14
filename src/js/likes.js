import { createElementFactory } from "./createElementFactory.js";

const urlParams = new URLSearchParams(window.location.search);

const createLikesCounterDomElements = (data) => {
  const mainElt = document.querySelector(".photographer-content");
  const asideElt = document.createElement("aside");
  const allLikesContainer = createElementFactory("div", { class: "all-likes-container" });
  const counterElt = createElementFactory("p", { class: "all-likes" });

  allLikesPhotographer(counterElt, data);

  const pricingElt = createElementFactory("p", { class: "photographer-pricing" });

  pricingPhotographer(pricingElt, data);

  // const heartElt = createElementFactory("i", { class: "fas fa-heart" });
  const heartElt = createElementFactory("img", { src: "./assets/icons/filled-heart.svg", alt: " ", "aria-hidden": "true" });

  allLikesContainer.appendChild(counterElt);
  allLikesContainer.appendChild(heartElt);
  asideElt.appendChild(allLikesContainer);
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

const updateMediaLikes = () => {
  const heartElts = document.querySelectorAll(".fa-heart");

  for (let i = 0; i < heartElts.length; i++) {
    heartElts[i].addEventListener("click", () => {
      heartElts[i].classList.toggle("fas");

      if (heartElts[i].classList.contains("fas")) {
        heartElts[i].previousSibling.textContent++;
      } else {
        heartElts[i].previousSibling.textContent--;
      }
    });

    heartElts[i].addEventListener("keydown", e => {
      if (e.keyCode === 32 || e.key === "Enter") {
        e.preventDefault();
        heartElts[i].classList.toggle("fas");

        if (heartElts[i].classList.contains("fas")) {
          heartElts[i].previousSibling.textContent++;
        } else {
          heartElts[i].previousSibling.textContent--;
        }
      }
    });
  };
};

const updateAllLikes = () => {
  const allLikesDomElt = document.querySelector(".all-likes");
  const heartElts = document.querySelectorAll(".fa-heart");

  for (let i = 0; i < heartElts.length; i++) {
    heartElts[i].addEventListener("click", () => {
      if (heartElts[i].classList.contains("fas")) {
        allLikesDomElt.textContent++;
      } else {
        allLikesDomElt.textContent--;
      }
    });

    heartElts[i].addEventListener("keydown", e => {
      if (e.keyCode === 32 || e.key === "Enter") {
        e.preventDefault();
        if (heartElts[i].classList.contains("fas")) {
          allLikesDomElt.textContent++;
        } else {
          allLikesDomElt.textContent--;
        }
      }
    });
  };
};

const pricingPhotographer = (elt, data) => {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      elt.textContent = photographer.price + "€/jour";
    }
  });
};

export { createLikesCounterDomElements };
export { allLikesPhotographer };
export { updateAllLikes };
export { updateMediaLikes };
