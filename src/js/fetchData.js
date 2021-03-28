import { createPhotographerCard } from "./index.js";
import { createFilterTagsNavList } from "./filterTags.js";

/**
 * Fetch photographers data
 */
const fetchData = async () => {
  try {
    const response = await fetch("./data/FishEyeData.json");
    const data = await response.json();
    createPhotographerCard(data);
    createFilterTagsNavList(data);
  } catch (e) {
    console.log("e : ", e);
  }
};

export { fetchData };
