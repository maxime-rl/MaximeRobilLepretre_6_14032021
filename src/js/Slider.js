export class Slider {
  constructor (id, medias) {
    this.sliderElt = id;
    this.medias = medias;
    this.mediaNumber = 0;

    this.sliderDomElt = document.getElementById(this.sliderElt);
    // this.mediaDom = this.sliderDomElt.querySelector("img");
    this.prevDomElt = this.sliderDomElt.getElementById("btn-prev");
    this.nextDomElt = this.sliderDomElt.getElementById("btn-next");

    document.addEventListener("keydown", this.keyboard.bind(this));
    this.prevDomElt.addEventListener("click", this.prevMedia.bind(this));
    this.nextDomElt.addEventListener("click", this.nextMedia.bind(this));
  }

  prevMedia () {
    this.mediaNumber--;
    if (this.mediaNumber < 0) {
      this.mediaNumber = this.medias.length - 1;
    }
    this.mediaDom.src = this.medias[this.mediaNumber];
  }

  nextMedia () {
    this.mediaNumber++;
    if (this.mediaNumber > (this.medias.length - 1)) {
      this.mediaNumber = 0;
    }
    this.mediaDom.src = this.medias[this.mediaNumber];
  }

  keyboard (e) {
    switch (e.keyCode) {
      case 37: // left
        this.nextImage();
        break;
      case 39: // right
        this.prevImage();
        break;
    }
  }
}
