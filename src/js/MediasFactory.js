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
    const figureElt = document.createElement("figure");

    const pictureElt = createElementFactory("picture", { class: "media-card__img" });
    const photoMedia = createElementFactory("img", {
      src: `./assets/medias/${this.src}`,
      class: "media",
      alt: `${this.alt}`,
      role: "button",
      "aria-haspopup": "lightbox-dialog",
      "aria-controls": "lightbox-dialog",
      tabindex: "0",
      title: `${this.alt}, closeup view`
    });

    const figcaptionElt = document.createElement("figcaption");
    const titleElt = createElementFactory("h2", {}, `${this.alt}`);
    const priceElt = createElementFactory("p", { class: "media-card__price" }, `${this.price}€`);
    const btnElt = createElementFactory("button", { tabindex: "0" }, `${this.likes}`);
    const iconLikeElt = createElementFactory("i", {
      class: "far fa-heart",
      "aria-label": "likes"
    });

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
    const figureElt = document.createElement("figure");

    const videoMedia = createElementFactory("video", {
      preload: "true",
      loop: "true",
      autoplay: "true",
      alt: `${this.alt}`,
      class: "media",
      role: "button",
      "aria-haspopup": "lightbox-dialog",
      "aria-controls": "lightbox-dialog",
      tabindex: "0",
      title: `${this.alt}, closeup view`
    });
    const videoSrc = createElementFactory("source", { src: `./assets/medias/${this.src}` });

    const figcaptionElt = document.createElement("figcaption");
    const titleElt = createElementFactory("h2", {}, `${this.alt}`);
    const priceElt = createElementFactory("p", { class: "media-card__price" }, `${this.price}€`);
    const btnElt = createElementFactory("button", { tabindex: "0" }, `${this.likes}`);
    const iconLikeElt = createElementFactory("i", {
      class: "far fa-heart",
      "aria-label": "likes"
    });

    btnElt.appendChild(iconLikeElt);

    figcaptionElt.appendChild(titleElt);
    figcaptionElt.appendChild(priceElt);
    figcaptionElt.appendChild(btnElt);

    videoMedia.appendChild(videoSrc);

    figureElt.appendChild(videoMedia);
    figureElt.appendChild(figcaptionElt);

    cardElt.appendChild(figureElt);

    listElt.appendChild(cardElt);
  };
}

// export class MediasFactory {
//   createMedia (id, photographerId, type, src, tags, likes, date, price, alt) {
//     if (type === "jpg") {
//       const photo = new Photo();
//       photo.id = id;
//       photo.photographerId = photographerId;
//       photo.src = src;
//       photo.tags = tags;
//       photo.likes = likes;
//       photo.date = date;
//       photo.price = price;
//       photo.alt = alt;
//       return photo;
//     } else if (type === "mp4") {
//       const video = new Video();
//       video.id = id;
//       video.photographerId = photographerId;
//       video.src = src;
//       video.tags = tags;
//       video.likes = likes;
//       video.date = date;
//       video.price = price;
//       video.alt = alt;
//       return video;
//     }
//   }

//   createMediaDomElement () {
//     const listElt = document.querySelector(".medias-list");
//     const cardElt = createElementFactory("li", { class: "media-card" });
//     const figureElt = document.createElement("figure");

//     if (this.type === "jpg") {
//       const pictureElt = createElementFactory("picture", { class: "media-card__img" });
//       const photoMedia = createElementFactory("img", {
//         src: `./assets/medias/${this.src}`,
//         alt: `${this.alt}`,
//         role: "button",
//         "aria-haspopup": "lightbox-dialog",
//         "aria-controls": "dialog",
//         tabindex: "0",
//         title: `${this.alt}, closeup view`
//       });

//       pictureElt.appendChild(photoMedia);
//       figureElt.appendChild(pictureElt);
//     }

//     if (this.type === "mp4") {
//       const videoMedia = createElementFactory("video", {
//         preload: "true",
//         loop: "true",
//         autoplay: "true",
//         alt: `${this.alt}`,
//         role: "button",
//         "aria-haspopup": "lightbox-dialog",
//         "aria-controls": "dialog",
//         tabindex: "0",
//         title: `${this.alt}, closeup view`
//       });
//       const videoSrc = createElementFactory("source", { src: `./assets/medias/${this.src}` });

//       videoMedia.appendChild(videoSrc);
//       figureElt.appendChild(videoMedia);
//     }

//     const figcaptionElt = document.createElement("figcaption");
//     const titleElt = createElementFactory("h2", {}, `${this.alt}`);
//     const priceElt = createElementFactory("p", { class: "media-card__price" }, `${this.price}€`);
//     const btnElt = createElementFactory("button", { tabindex: "0" }, `${this.likes}`);
//     const iconLikeElt = createElementFactory("i", {
//       class: "far fa-heart",
//       "aria-label": "likes"
//     });

//     btnElt.appendChild(iconLikeElt);

//     figcaptionElt.appendChild(titleElt);
//     figcaptionElt.appendChild(priceElt);
//     figcaptionElt.appendChild(btnElt);

//     figureElt.appendChild(figcaptionElt);

//     cardElt.appendChild(figureElt);

//     listElt.appendChild(cardElt);
//   };
// }

// export class Photo extends MediasFactory {
//   createMediaDomElement () {
//     const listElt = document.querySelector(".medias-list");
//     const cardElt = createElementFactory("li", { class: "media-card" });
//     const figureElt = document.createElement("figure");

//     const pictureElt = createElementFactory("picture", { class: "media-card__img" });
//     const photoMedia = createElementFactory("img", {
//       src: `./assets/medias/${this.src}`,
//       alt: `${this.alt}`,
//       role: "button",
//       "aria-haspopup": "lightbox-dialog",
//       "aria-controls": "dialog",
//       tabindex: "0",
//       title: `${this.alt}, closeup view`
//     });

//     const figcaptionElt = document.createElement("figcaption");
//     const titleElt = createElementFactory("h2", {}, `${this.alt}`);
//     const priceElt = createElementFactory("p", { class: "media-card__price" }, `${this.price}€`);
//     const btnElt = createElementFactory("button", { tabindex: "0" }, `${this.likes}`);
//     const iconLikeElt = createElementFactory("i", {
//       class: "far fa-heart",
//       "aria-label": "likes"
//     });

//     btnElt.appendChild(iconLikeElt);

//     figcaptionElt.appendChild(titleElt);
//     figcaptionElt.appendChild(priceElt);
//     figcaptionElt.appendChild(btnElt);

//     pictureElt.appendChild(photoMedia);

//     figureElt.appendChild(pictureElt);
//     figureElt.appendChild(figcaptionElt);

//     cardElt.appendChild(figureElt);

//     listElt.appendChild(cardElt);
//   };
// }

// export class Video extends MediasFactory {
//   createMediaDomElement () {
//     const listElt = document.querySelector(".medias-list");
//     const cardElt = createElementFactory("li", { class: "media-card" });
//     const figureElt = document.createElement("figure");

//     const videoMedia = createElementFactory("video", {
//       preload: "true",
//       loop: "true",
//       autoplay: "true",
//       alt: `${this.alt}`,
//       role: "button",
//       "aria-haspopup": "lightbox-dialog",
//       "aria-controls": "dialog",
//       tabindex: "0",
//       title: `${this.alt}, closeup view`
//     });
//     const videoSrc = createElementFactory("source", { src: `./assets/medias/${this.src}` });

//     const figcaptionElt = document.createElement("figcaption");
//     const titleElt = createElementFactory("h2", {}, `${this.alt}`);
//     const priceElt = createElementFactory("p", { class: "media-card__price" }, `${this.price}€`);
//     const btnElt = createElementFactory("button", { tabindex: "0" }, `${this.likes}`);
//     const iconLikeElt = createElementFactory("i", {
//       class: "far fa-heart",
//       "aria-label": "likes"
//     });

//     btnElt.appendChild(iconLikeElt);

//     figcaptionElt.appendChild(titleElt);
//     figcaptionElt.appendChild(priceElt);
//     figcaptionElt.appendChild(btnElt);

//     videoMedia.appendChild(videoSrc);

//     figureElt.appendChild(videoMedia);
//     figureElt.appendChild(figcaptionElt);

//     cardElt.appendChild(figureElt);

//     listElt.appendChild(cardElt);
//   };
// }
