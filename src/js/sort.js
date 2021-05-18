import { handleUpdatePhotographer } from "./photographerProfil";

const sortMedias = (data) => {
  const selectElt = document.getElementById("sortBy");
  const mediasListElt = document.querySelector(".medias-list");

  selectElt.addEventListener("change", () => {
    if (selectElt.value === "Popularité") {
      removeFirstChildElt(mediasListElt);
      sortByPopularity(data.media);
      handleUpdatePhotographer(data);
    }
    if (selectElt.value === "Date") {
      removeFirstChildElt(mediasListElt);
      sortByDate(data.media);
      handleUpdatePhotographer(data);
    }
    if (selectElt.value === "Titre") {
      removeFirstChildElt(mediasListElt);
      sortByTitle(data.media);
      handleUpdatePhotographer(data);
    }
  });
};

const sortByPopularity = (elt) => {
  return elt.sort((a, b) => b.likes - a.likes);
};

const sortByDate = (elt) => {
  return elt.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const sortByTitle = (elt) => {
  return elt.sort((a, b) => {
    const titleA = a.alt.toUpperCase();
    const titleB = b.alt.toUpperCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
};

const removeFirstChildElt = (elt) => {
  while (elt.firstChild) {
    elt.removeChild(elt.firstChild);
  }
};

const changeIconselect = () => {
  const selectElt = document.getElementById("sortBy");
  const selectIconElt = document.querySelector(".select-icon");
  // const mainElt = document.querySelector("main");

  selectElt.addEventListener("click", () => {
    selectIconElt.classList.toggle("fa-chevron-up");
  });

  // if (selectIconElt.classList.contains("fa-chevron-up")) {
  //   mainElt.addEventListener("click", () => {
  //     selectIconElt.classList.remove("fa-chevron-up");
  //   });
  // }
};

export { sortMedias };
export { sortByPopularity };
export { changeIconselect };
