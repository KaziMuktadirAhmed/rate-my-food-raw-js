import * as query from "./helpers/get.response";

console.log("ok");

const btnSearchRestuarent = document.querySelector(".search-food-restuarnt");
const btnSearchLocation = document.querySelector(".search-location");

btnSearchLocation.addEventListener("click", async function (event) {
  console.log("searching resturants for given location ......");
  let result;
  try {
    result = await query.getAllRestuarentForALocation("Lon");
  } catch (error) {
    console.error(error);
  }
  console.dir(result);
});

btnSearchRestuarent.addEventListener("click", async function (event) {
  console.log("searching resturants for given name ........");
  let result;
  try {
    result = await query.getAllRestuarentForAName("Burger");
  } catch (error) {
    console.error(error);
  }

  console.log(result);
});

/// Ok

class App {
  constructor() {}
}

const app = new App();
