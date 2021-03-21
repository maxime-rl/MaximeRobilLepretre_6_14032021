import "../styles/main.scss";

// import { loadData } from "./fetchData.js";
// loadData();

const photographersList = document.querySelector(".photographers-list");

function createPhotographersList (data) {
  const photographers = data.photographers;
  console.log(photographers[0]);
  photographers.forEach((elt) => {
    const photographerDOM = document.createElement("li");
    photographerDOM.classList.add("photographer");
    photographerDOM.innerHTML = `
    <a>
      <p>${elt.id}</p>
    </a>
    `;
    return photographerDOM;
  });
  photographersList.innerHTML = "";
  photographersList.append(...photographers);
}

function test (data) {
  const user = data.photographers;
  Object.keys(user).map(elt => {
    console.log(elt);
    return elt;
  });
}

const fetchData = async () => {
  try {
    const response = await fetch("./data/FishEyeData.json");
    const data = await response.json();
    console.log(data.photographers);
    console.log(data.media);
    createPhotographersList(data);
    test(data);
  } catch (e) {
    console.log("e : ", e);
  }
};

fetchData();
