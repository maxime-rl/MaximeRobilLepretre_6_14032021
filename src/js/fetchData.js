import { createPhotographersMainList } from "./index.js";

import {
  createFilterTagsNavList,
  filteringPhotographersByTags
} from "./filterTags.js";

import { sortMedias, sortByPopularity } from "./sort";

import {
  createPhotographerPageTitleTag,
  createProfileHeader,
  createProfileMediasList,
  createCustomSortSelect
} from "./photographerProfil.js";

import {
  createLikesCounterDomElements,
  updateMediaLikes,
  updateAllLikes
} from "./likes.js";

import { handleModalForm } from "./handleModalForm.js";
import { photographerName } from "./form.js";
import { Lightbox } from "./Lightbox";

const createPhotographerPage = (data) => {
  createPhotographerPageTitleTag(data);
  createProfileHeader(data);
  sortByPopularity(data.media);
  createProfileMediasList(data);
  createCustomSortSelect(data);
  sortMedias(data);
  createLikesCounterDomElements(data);
  updateMediaLikes();
  updateAllLikes();
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
