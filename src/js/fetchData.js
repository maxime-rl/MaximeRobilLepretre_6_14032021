import { createPhotographersMainList } from "./index.js";
import { createFilterTagsNavList, filterTags } from "./filterTags.js";

/**
 * Fetch photographers data
 */
const fetchData = async () => {
  try {
    const response = await fetch("./data/FishEyeData.json");
    const data = await response.json();
    // createPhotographerCard(data);
    createPhotographersMainList(data);
    createFilterTagsNavList(data);
    filterTags(data);
  } catch (e) {
    console.log("e : ", e);
  }
};

export { fetchData };
