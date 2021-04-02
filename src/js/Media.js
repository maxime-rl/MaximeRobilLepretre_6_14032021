import { createElementFactory } from "./createElementFactory.js";

export class MediasFactory {
  constructor (id, photographerId, tags, likes, date, price, alt) {
    this.id = id;
    this.photographerId = photographerId;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.alt = alt;

    this.creatMedia = function (type) {
      let media;
      if (type === "jpg") {
        media = new Photo();
      } else if (type === "mp4") {
        media = new Video();
      }
      return media;
    };
  }
}

export class Photo {
  constructor () {
    this._type = "jpg";
    this.createMediaDomElement = function () {
      const photoMedia = createElementFactory("img", { src: `../assets/medias/${this.image}`, alt: `${this.alt}` });

      return photoMedia;
    };
  }
}

export class Video {
  constructor () {
    this._type = "mp4";
    this.createMediaDomElement = function () {
      const videoMedia = createElementFactory("video", { preload: "true", loop: "true", autoplay: "true", alt: `${this.alt}` });
      const videoSrc = createElementFactory("source", { src: `../assets/medias/${this.video}` });

      videoMedia.append(videoSrc);

      return videoMedia;
    };
  }
}
