import { createElementFactory } from "./createElementFactory.js";

/**
 * @property {HTMLElement} elt
 * @property {string[]} medias paths
 * @property {string} url current media
 */
export class Lightbox {
  static init () {
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    const allMedias = links.map(link => link.getAttribute("href"));

    links.forEach(link => link.addEventListener("click", e => {
      e.preventDefault();
      // eslint-disable-next-line no-new
      new Lightbox(e.currentTarget.getAttribute("href"), allMedias);
    }));
  }

  /**
   *
   * @param {string} url media
   * @param {string[]} medias paths
   */
  constructor (url, medias) {
    this.elt = this.buildDOM(url);
    this.medias = medias;
    this.loadMedia(url);
    this.keyBoard = this.keyBoard.bind(this);
    document.body.appendChild(this.elt);
    document.addEventListener("keyup", this.keyBoard);
  }

  loadMedia (url) {
    this.url = null;

    const videoElt = createElementFactory("video", { class: "media", preload: "true", controls: "true", loop: "true", tabindex: "0" });
    const imageElt = createElementFactory("img", { class: "media" });

    const container = this.elt.querySelector(".media-container");
    const loaderElt = createElementFactory("div", { class: "media-loading" });
    container.innerHTML = "";
    container.appendChild(loaderElt);

    const currentUrl = url.split(".").pop();

    if (currentUrl === "jpg") {
      container.removeChild(loaderElt);
      container.appendChild(imageElt);
      this.url = url;
    } else if (currentUrl === "mp4") {
      container.removeChild(loaderElt);
      container.appendChild(videoElt);
      this.url = url;
    }

    this.url = url;
    imageElt.src = url;
    videoElt.src = url;
  }

  /**
   * Close Lightbox
   * @param {MouseEvent|KeyboardEvent} e
   */
  close (e) {
    e.preventDefault();
    this.elt.classList.add("fade-out");

    const profileHeader = document.querySelector(".page-photographer-header");
    const profileContent = document.querySelector(".photographer-content");
    const lightboxDialog = document.querySelector(".lightbox-dialog");

    lightboxDialog.setAttribute("aria-hidden", true);
    profileHeader.setAttribute("aria-hidden", false);
    profileContent.setAttribute("aria-hidden", false);

    window.setTimeout(() => {
      this.elt.parentElement.removeChild(this.elt);
    }, 500);
    document.removeEventListener("keyup", this.keyBoard);
  }

  /**
   * Next media
   * @param {MouseEvent|KeyboardEvent} e
   */
  next (e) {
    e.preventDefault();
    let i = this.medias.findIndex(media => media === this.url);
    if (i === this.medias.length - 1) {
      i = -1;
    }
    this.loadMedia(this.medias[i + 1]);
  }

  /**
   * Previous media
   * @param {MouseEvent|KeyboardEvent} e
   */
  previous (e) {
    e.preventDefault();
    let i = this.medias.findIndex(media => media === this.url);
    if (i === 0) {
      i = this.medias.length;
    }
    this.loadMedia(this.medias[i - 1]);
  }

  /**
   *
   * @param {string} url media
   * @returns {HTMLElement}
   */
  buildDOM () {
    const dialogDomElt = createElementFactory("div", { class: "lightbox-dialog", "aria-hidden": "false" });
    const containerDomElt = createElementFactory("div", { class: "lightbox-container" });

    const profileHeader = document.querySelector(".page-photographer-header");
    const profileContent = document.querySelector(".photographer-content");
    profileHeader.setAttribute("aria-hidden", true);
    profileContent.setAttribute("aria-hidden", true);

    const btnCloseElt = createElementFactory("button", {
      type: "button",
      class: "btn-close",
      title: "Close lightbox",
      "data-dismiss": "lightbox-dialog",
      "aria-controls": "Close",
      tabindex: "0"
    }, "X");

    const btnPrevElt = createElementFactory("button", {
      type: "button",
      class: "btn-prev",
      role: "link",
      "aria-label": "Previous media",
      tabindex: "0"
    }, "<");

    const btnNextElt = createElementFactory("button", {
      type: "button",
      class: "btn-next",
      role: "link",
      "aria-label": "Next media",
      tabindex: "0"
    }, ">");

    const containerElt = createElementFactory("div", { class: "media-container" });

    containerDomElt.appendChild(btnCloseElt);
    containerDomElt.appendChild(btnPrevElt);
    containerDomElt.appendChild(containerElt);
    containerDomElt.appendChild(btnNextElt);

    dialogDomElt.appendChild(containerDomElt);

    dialogDomElt.querySelector(".btn-close").addEventListener("click", this.close.bind(this));
    dialogDomElt.querySelector(".btn-next").addEventListener("click", this.next.bind(this));
    dialogDomElt.querySelector(".btn-prev").addEventListener("click", this.previous.bind(this));

    return dialogDomElt;
  }

  keyBoard (e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "ArrowLeft") {
      this.previous(e);
    }
  }
}
