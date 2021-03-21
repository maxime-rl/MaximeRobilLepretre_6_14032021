// async function loadData () {
//   const response = await fetch("./data/FishEyeData.json");
//   const fishEyeData = await response.json();

//   return fishEyeData;
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   let fishEyeData = [];

//   try {
//     let photographersList = [];
//     let mediasList = [];
//     fishEyeData = await loadData();
//     photographersList = fishEyeData.photographers;
//     mediasList = fishEyeData.media;
//     console.log(photographersList);
//     console.log(mediasList);
//   } catch (e) {
//     console.log("Error!");
//     console.log(e);
//   }
// });

// export { loadData };

// // test other method
// const fetchData = async () => {
//   try {
//     const response = await fetch("./data/FishEyeData.json");
//     const data = await response.json();
//     console.log(data);
//   } catch (e) {
//     console.log("e : ", e);
//   }
// };

// export { fetchData };
