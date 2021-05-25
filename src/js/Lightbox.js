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
    document.body.style.overflow = "hidden";
    document.body.appendChild(this.elt);
    this.trapFocus();
    document.addEventListener("keyup", this.keyBoard);
  }

  loadMedia (url) {
    this.url = null;

    // Transform URL for media title
    const textElt = url.split("/").pop().replace(/_|.jpg|.mp4/g, " ").trim();

    const videoElt = createElementFactory("video", { class: "media", preload: "true", controls: "true", loop: "true", tabindex: "0", alt: `${textElt}` });
    const imageElt = createElementFactory("img", { class: "media", alt: `${textElt}` });
    const titleElt = createElementFactory("h2", {});

    titleElt.textContent = textElt;

    const container = this.elt.querySelector(".media-container");
    const loaderElt = createElementFactory("div", { class: "media-loading" });
    container.innerHTML = "";
    container.appendChild(loaderElt);

    const currentUrl = url.split(".").pop();

    if (currentUrl === "jpg") {
      container.removeChild(loaderElt);
      container.appendChild(imageElt);
      container.appendChild(titleElt);
      this.url = url;
    } else if (currentUrl === "mp4") {
      container.removeChild(loaderElt);
      container.appendChild(videoElt);
      container.appendChild(titleElt);
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
    document.body.style.overflow = "initial";

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
    document.removeEventListener("keydown", this.trapFocus);
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
    const dialogDomElt = createElementFactory("div", { role: "dialog", class: "lightbox-dialog", "aria-hidden": "false", "aria-modal": "true", "aria-label": "image closeup view", tabindex: "-1" });
    const containerDomElt = createElementFactory("div", { role: "document", class: "lightbox-container" });

    const profileHeader = document.querySelector(".page-photographer-header");
    const profileContent = document.querySelector(".photographer-content");
    profileHeader.setAttribute("aria-hidden", true);
    profileContent.setAttribute("aria-hidden", true);

    const btnCloseElt = createElementFactory("button", {
      type: "button",
      class: "btn-close",
      title: "Close lightbox",
      "data-dismiss": "lightbox-dialog",
      "aria-label": "Close",
      tabindex: "0"
    });

    const iconCloseElt = createElementFactory("img", { src: "./assets/icons/close-lightbox.svg", alt: " ", "aria-hidden": "true" });

    const btnPrevElt = createElementFactory("button", {
      type: "button",
      class: "btn-prev",
      role: "link",
      "aria-label": "Previous media",
      tabindex: "0",
      title: "Previous media"
    });

    const iconPrevElt = createElementFactory("img", { src: "./assets/icons/arrow-left.svg", alt: " ", "aria-hidden": "true" });

    const btnNextElt = createElementFactory("button", {
      type: "button",
      class: "btn-next",
      role: "link",
      "aria-label": "Next media",
      tabindex: "0",
      title: "Next media"
    });

    const iconNextElt = createElementFactory("img", { src: "./assets/icons/arrow-right.svg", alt: " ", "aria-hidden": "true" });

    const containerElt = createElementFactory("div", { class: "media-container" });

    btnCloseElt.appendChild(iconCloseElt);
    btnPrevElt.appendChild(iconPrevElt);
    btnNextElt.appendChild(iconNextElt);
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

  trapFocus () {
    // focusable elements inside lightbox
    const focusableEltsArr = 'button, video, [tabindex]:not([tabindex="-1"])';
    const lightboxElt = document.querySelector(".lightbox-dialog");
    const focusableElts = lightboxElt.querySelectorAll(focusableEltsArr);
    const firstFocusableElt = focusableElts[0];
    const lastFocusableElt = focusableElts[focusableElts.length - 1];

    window.setTimeout(() => {
      firstFocusableElt.focus();

      // trapping focus inside the dialog
      focusableElts.forEach((focusableElt) => {
        if (focusableElt.addEventListener) {
          focusableElt.addEventListener("keydown", (e) => {
            const isTabPressed = e.key === "Tab" || e.keyCode === 9;

            if (!isTabPressed) {
              return;
            }

            if (e.shiftKey) {
              if (e.target === firstFocusableElt) { // shift + tab
                e.preventDefault();

                lastFocusableElt.focus();
              }
            } else if (e.target === lastFocusableElt) { // tab
              e.preventDefault();

              firstFocusableElt.focus();
            }
          });
        }
      });
    }, 500);
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
