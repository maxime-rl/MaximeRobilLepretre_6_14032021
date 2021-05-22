import { createPhotographersMainList } from "./index.js";

import {
  createFilterTagsNavList,
  filteringPhotographersByTags
} from "./filterTags.js";

import { sortMedias, sortByPopularity, changeIconselect } from "./sort";

import {
  createPhotographerPageTitleTag,
  createProfileHeader,
  createProfileMediasList
} from "./photographerProfil.js";

import {
  createLikesCounterDomElements,
  updateMediaLikes,
  updateAllLikes
} from "./likes.js";

import { handleModalForm } from "./handleModalForm.js";
import { photographerName, submitForm, updateCheckedInputElts } from "./form.js";
import { Lightbox } from "./Lightbox";

const createPhotographerPage = (data) => {
  createPhotographerPageTitleTag(data);
  createProfileHeader(data);
  sortByPopularity(data.media);
  createProfileMediasList(data);
  sortMedias(data);
  changeIconselect();
  createLikesCounterDomElements(data);
  updateMediaLikes();
  updateAllLikes();
  submitForm();
  updateCheckedInputElts();
  handleModalForm();
  photographerName(data);
  Lightbox.init();
};

const createMainPage = (data) => {
  createPhotographersMainList(data);
  createFilterTagsNavList(data);
  filteringPhotographersByTags(data);
};

/**
 * Fetch data and router
 */
const fetchData = async () => {
  try {
    const response = await fetch("./data/FishEyeData.json");
    const data = await response.json();
    if (window.location.pathname.includes("photographer.html")) {
      createPhotographerPage(data);
    } else {
      createMainPage(data);
    }
  } catch (e) {
    console.log("e : ", e);
  }
};

export { fetchData };
