import { createElementFactory } from "./createElementFactory.js";

export class MediasFactory {
  createMedia (id, photographerId, type, src, tags, likes, date, price, alt) {
    if (type === "jpg") {
      const photo = new Photo();
      photo.id = id;
      photo.photographerId = photographerId;
      photo.src = src;
      photo.tags = tags;
      photo.likes = likes;
      photo.date = date;
      photo.price = price;
      photo.alt = alt;
      return photo;
    } else if (type === "mp4") {
      const video = new Video();
      video.id = id;
      video.photographerId = photographerId;
      video.src = src;
      video.tags = tags;
      video.likes = likes;
      video.date = date;
      video.price = price;
      video.alt = alt;
      return video;
    }
  }

  createMediaDomElts = (MediaElt) => {
    const listElt = document.querySelector(".medias-list");
    const cardElt = createElementFactory("li", { class: "media-card" });
    const figureElt = document.createElement("figure");
    const linkElt = createElementFactory("a", {
      href: `./assets/medias/${this.src}`,
      tabindex: "0",
      "aria-haspopup": "lightbox-dialog",
      "aria-controls": "lightbox-dialog"
    });
    const figcaptionElt = document.createElement("figcaption");
    const titleElt = createElementFactory("h2", {}, `${this.alt}`);
    const priceElt = createElementFactory("p", { class: "media-card__price" }, `${this.price}€`);
    const likesContainerElt = createElementFactory("div", { class: "media-card__likes-container" });
    const likesElt = createElementFactory("p", { class: "media-likes" }, `${this.likes}`);
    const iconLikeElt = createElementFactory("i", {
      class: "far fa-heart",
      tabindex: "0",
      "aria-label": "likes"
    });

    likesContainerElt.appendChild(likesElt);
    likesContainerElt.appendChild(iconLikeElt);

    figcaptionElt.appendChild(titleElt);
    figcaptionElt.appendChild(priceElt);
    figcaptionElt.appendChild(likesContainerElt);

    linkElt.appendChild(MediaElt);

    figureElt.appendChild(linkElt);
    figureElt.appendChild(figcaptionElt);

    cardElt.appendChild(figureElt);

    listElt.appendChild(cardElt);
  };
}

export class Photo extends MediasFactory {
  createDomElt () {
    const photoMedia = createElementFactory("img", {
      src: `./assets/medias/${this.src}`,
      class: "media",
      alt: `${this.alt}`,
      title: `${this.alt}, closeup view`
    });
    this.createMediaDomElts(photoMedia);
  };
}

export class Video extends MediasFactory {
  createDomElt () {
    const videoMedia = createElementFactory("video", {
      src: `./assets/medias/${this.src}`,
      preload: "true",
      alt: `${this.alt}`,
      class: "media",
      title: `${this.alt}, closeup view`
    });
    this.createMediaDomElts(videoMedia);
  };
}
