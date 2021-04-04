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
}

export class Photo extends MediasFactory {
  createMediaDomElement () {
    const listElt = document.querySelector(".medias-list");
    const cardElt = createElementFactory("li", { class: "media-card" });

    const figureElt = createElementFactory("figure", { class: "media-card__container" });

    const pictureElt = createElementFactory("picture", { class: "media-card__img" });
    const photoMedia = createElementFactory("img", { src: `./assets/medias/${this.src}`, alt: `${this.alt}`, role: "button", tabindex: "0" });

    const figcaptionElt = document.createElement("figcaption");
    const titleElt = createElementFactory("h2", { class: "media-card__title" }, `${this.alt}`);
    const priceElt = createElementFactory("p", { class: "media-card__price" }, `${this.price}€`);
    const btnElt = createElementFactory("button", { class: "media-card__likes", tabindex: "0" }, `${this.likes}`);
    const iconLikeElt = createElementFactory("i", { class: "far fa-heart" });

    btnElt.appendChild(iconLikeElt);

    figcaptionElt.appendChild(titleElt);
    figcaptionElt.appendChild(priceElt);
    figcaptionElt.appendChild(btnElt);

    pictureElt.appendChild(photoMedia);

    figureElt.appendChild(pictureElt);
    figureElt.appendChild(figcaptionElt);

    cardElt.appendChild(figureElt);

    listElt.appendChild(cardElt);
  };
}

export class Video extends MediasFactory {
  createMediaDomElement () {
    const listElt = document.querySelector(".medias-list");
    const cardElt = createElementFactory("li", { class: "media-card" });
    const linkElt = createElementFactory("a", { href: "#", tabindex: "0" });

    const videoMedia = createElementFactory("video", { preload: "true", loop: "true", autoplay: "true", alt: `${this.alt}` });
    const videoSrc = createElementFactory("source", { src: `./assets/medias/${this.src}` });
    console.log(videoMedia);
    videoMedia.appendChild(videoSrc);
    linkElt.appendChild(videoMedia);
    cardElt.appendChild(linkElt);
    listElt.appendChild(cardElt);
  };
}
