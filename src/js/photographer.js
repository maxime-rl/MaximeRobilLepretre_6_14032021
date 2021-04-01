import { createElementFactory } from "./createElementFactory.js";

export class Photographer {
  constructor (id, name, portrait, city, country, tags, tagline, price) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.tags = tags;
    this.price = price;
  }

  createMainDomElements () {
    const photographersList = document.querySelector(".photographers-list");
    const ulElPhotographer = document.createElement("ul");
    const liElPhotographer = createElementFactory("li", { class: "photographer" });
    const aELPhotographer = createElementFactory("a", { href: `photographer.html?id=${this.id}`, tabindex: "0" });
    const spanElPhotographer = createElementFactory("span", { class: "sr-only sr-only-focusable" }, `${this.name}`);
    const imgElPhotographer = createElementFactory("img", { src: `../assets/medias/${this.portrait}`, alt: " " });
    const h2ElPhotographer = createElementFactory("h2", {}, `${this.name}`);
    const pElPhotographerLocation = createElementFactory("p", { class: "photographer__location" }, (`${this.city}, ${this.country}`));
    const pElPhotographerTagline = createElementFactory("p", { class: "photographer__tagline" }, `${this.tagline}`);
    const pElPhotographerPrice = createElementFactory("p", { class: "photographer__price" }, `${this.price}€/jour`);

    this.tags.forEach(tag => {
      const liElTag = document.createElement("li");
      const aElTag = createElementFactory("a", { href: "index.html", class: "tag" });
      const spanElTag = createElementFactory("span", { class: "sr-only" }, "tag");
      aElTag.textContent = "#" + tag;
      aElTag.appendChild(spanElTag);
      liElTag.appendChild(aElTag);
      ulElPhotographer.appendChild(liElTag);
    });

    aELPhotographer.appendChild(spanElPhotographer);
    aELPhotographer.appendChild(imgElPhotographer);
    aELPhotographer.appendChild(h2ElPhotographer);
    liElPhotographer.appendChild(aELPhotographer);
    liElPhotographer.appendChild(pElPhotographerLocation);
    liElPhotographer.appendChild(pElPhotographerTagline);
    liElPhotographer.appendChild(pElPhotographerPrice);
    liElPhotographer.appendChild(ulElPhotographer);
    photographersList.appendChild(liElPhotographer);
  }

  createProfilHeaderDomElements () {
    const photographerHeader = document.querySelector(".photographer-header");
    const ulElPhotographer = document.createElement("ul");
    const imgElPhotographer = createElementFactory("img", { src: `../assets/medias/${this.portrait}`, alt: " " });
    const h1ElPhotographer = createElementFactory("h1", {}, `${this.name}`);
    const pElPhotographerLocation = createElementFactory("p", { class: "photographer__location" }, (`${this.city}, ${this.country}`));
    const pElPhotographerTagline = createElementFactory("p", { class: "photographer__tagline" }, `${this.tagline}`);
    const btnElPhotographer = createElementFactory("button", { type: "button", class: "btn", "aria-haspopup": "dialog", title: "Contact me" }, "Contactez-moi");

    this.tags.forEach(tag => {
      const liElTag = document.createElement("li");
      const aElTag = createElementFactory("a", { href: "index.html", class: "tag" });
      const spanElTag = createElementFactory("span", { class: "sr-only" }, "tag");
      aElTag.textContent = "#" + tag;
      aElTag.appendChild(spanElTag);
      liElTag.appendChild(aElTag);
      ulElPhotographer.appendChild(liElTag);
    });

    photographerHeader.appendChild(imgElPhotographer);
    photographerHeader.appendChild(h1ElPhotographer);
    photographerHeader.appendChild(pElPhotographerLocation);
    photographerHeader.appendChild(pElPhotographerTagline);
    photographerHeader.appendChild(ulElPhotographer);
    photographerHeader.appendChild(btnElPhotographer);
  }
}
