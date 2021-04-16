import { createPhotographersMainList } from "./index.js";
import {
  createFilterTagsNavList,
  filteringPhotographersByTags
} from "./filterTags.js";
import {
  createProfileHeader,
  createProfileMediasList,
  displaySlider
} from "./photographerProfil.js";
import { createLikesCounterDomElements } from "./likes.js";
import { handleModals } from "./handleModals.js";
import { photographerName } from "./form.js";

/**
 * Fetch photographers data
 */
const fetchData = async () => {
  try {
    const response = await fetch("./data/FishEyeData.json");
    const data = await response.json();
    if (window.location.pathname.includes("photographer.html")) {
      createProfileHeader(data);
      createProfileMediasList(data);
      createLikesCounterDomElements(data);
      handleModals();
      photographerName(data);
      displaySlider();
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
