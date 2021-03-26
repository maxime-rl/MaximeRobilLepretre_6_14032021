import { createPhotographerCard, createFilterTagsList } from "./index.js";

const fetchData = async () => {
  try {
    const response = await fetch("./data/FishEyeData.json");
    const data = await response.json();
    createPhotographerCard(data);
    createFilterTagsList(data);
  } catch (e) {
    console.log("e : ", e);
  }
};

export { fetchData };
