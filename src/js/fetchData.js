import { createPhotographersMainList } from "./index.js";
import {
  createFilterTagsNavList,
  filteringPhotographersByTags
} from "./filterTags.js";
import {
  createProfileHeader,
  createProfileMediasList,
  createCustomSortSelect
} from "./photographerProfil.js";
import { createLikesCounterDomElements } from "./likes.js";
import { handleModalForm } from "./handleModalForm.js";
import { photographerName } from "./form.js";
import { Lightbox } from "./Lightbox";

/**
 * Fetch data
 */
const fetchData = async () => {
  try {
    const response = await fetch("./data/FishEyeData.json");
    const data = await response.json();
    if (window.location.pathname.includes("photographer.html")) {
      createProfileHeader(data);
      createProfileMediasList(data);
      createCustomSortSelect();
      createLikesCounterDomElements(data);
      handleModalForm();
      photographerName(data);
      Lightbox.init();
    } else {
      createPhotographersMainList(data);
      createFilterTagsNavList(data);
      filteringPhotographersByTags(data);
    }
  } catch (e) {
    console.log("e : ", e);
  }
};

export { fetchData };
