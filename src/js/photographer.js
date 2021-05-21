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
    const listElt = document.querySelector(".photographers-list");
    const cardElt = createElementFactory("li", { class: "photographer" });
    const linkElt = createElementFactory("a", { href: `photographer.html?id=${this.id}`, tabindex: "0", title: `${this.name}` });
    const screenOnlyElt = createElementFactory("span", { class: "sr-only sr-only-focusable" }, `${this.name}`);
    const imageElt = createElementFactory("img", { src: `./assets/medias/${this.portrait}`, alt: "" });
    const nameElt = createElementFactory("h2", {}, `${this.name}`);
    const locationElt = createElementFactory("p", { class: "photographer__location" }, (`${this.city}, ${this.country}`));
    const taglineElt = createElementFactory("p", { class: "photographer__tagline" }, `${this.tagline}`);
    const pricingElt = createElementFactory("p", { class: "photographer__price" }, `${this.price}€/jour`);
    const tagsElt = createElementFactory("ul", { class: "tags-list" });

    this.tags.forEach(tag => {
      const tagElt = createElementFactory("li");
      const linkTagElt = createElementFactory("a", { href: "#", class: "tag" });
      const screenOnlyTagElt = createElementFactory("span", { class: "sr-only" }, tag);

      linkTagElt.textContent = "#" + tag;
      linkTagElt.appendChild(screenOnlyTagElt);
      tagElt.appendChild(linkTagElt);

      tagsElt.appendChild(tagElt);
    });

    linkElt.appendChild(screenOnlyElt);
    linkElt.appendChild(imageElt);
    linkElt.appendChild(nameElt);

    cardElt.appendChild(linkElt);
    cardElt.appendChild(locationElt);
    cardElt.appendChild(taglineElt);
    cardElt.appendChild(pricingElt);
    cardElt.appendChild(tagsElt);

    listElt.appendChild(cardElt);
  }

  createProfileHeaderDomElements () {
    const headerElt = document.querySelector(".profil-photographer-header");
    const imageElt = createElementFactory("img", { src: `./assets/medias/${this.portrait}`, alt: `Photo de ${this.name}`, title: `${this.name}` });
    const nameElt = createElementFactory("h1", {}, `${this.name}`);
    const locationElt = createElementFactory("p", { class: "photographer__location" }, (`${this.city}, ${this.country}`));
    const taglineElt = createElementFactory("p", { class: "photographer__tagline" }, `${this.tagline}`);
    const tagsElt = createElementFactory("ul", { class: "tags-list" });
    const btnElt = createElementFactory("button", {
      type: "button",
      class: "btn btn-contact",
      "aria-haspopup": "dialog",
      "aria-controls": "dialog",
      "aria-label": "Contact me"
    }, "Contactez-moi");

    this.tags.forEach(tag => {
      const liElTag = document.createElement("li");
      const aElTag = createElementFactory("a", { href: "#", class: "tag", "data-filter": `${tag}` });
      const spanElTag = createElementFactory("span", { class: "sr-only" }, tag);

      aElTag.textContent = "#" + tag;
      aElTag.appendChild(spanElTag);
      liElTag.appendChild(aElTag);

      tagsElt.appendChild(liElTag);
    });

    headerElt.appendChild(imageElt);

    nameElt.appendChild(btnElt);

    headerElt.appendChild(nameElt);
    headerElt.appendChild(locationElt);
    headerElt.appendChild(taglineElt);
    headerElt.appendChild(tagsElt);
  }
}
