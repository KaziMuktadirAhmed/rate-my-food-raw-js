import * as DB from "./mockDB.js";

let {
  data: { restaurant },
} = DB.resturantDetails;
console.log(restaurant);

let bannerElement = document.querySelector(".page-banner");
restaurant.photos.map((item) => {
  let markup = `<img src="${item.src}" class="banner-image">`;
  bannerElement.insertAdjacentHTML("afterbegin", markup);
});

let mainContent = document.querySelector(".main-content");
let headingElement = document.querySelector(".heading");
let sidebarElement = document.querySelector(".content-side-bar");

headingElement.innerHTML = restaurant.name;

function formatOpeningHoursMarkup(openingHoursString) {
  let OpeningHoursArray = openingHoursString
    .split("\r\n")
    .filter((item) => item.length > 0)
    .map((item) => {
      let day,
        tokens = item.split(",").map((item) => item.trim());

      let times = tokens.map((item) =>
        item.split("-").map((item) => item.trim())
      );

      let final = times.map((item) => {
        let start,
          end = item[1];

        if (item[0].includes(" ")) {
          day = item[0].split(" ")[0];
          start = item[0].split(" ")[1];
        } else {
          start = item[0];
        }
        return { start, end };
      });
      return { [day]: final };
    });
  return OpeningHoursArray;
}

let openingHours = formatOpeningHoursMarkup(restaurant.openingHours);
console.log(openingHours);

// let markupSidebar = `<p>${restaurant.openingHours}</p>`;
// sidebarElement.insertAdjacentHTML("afterbegin", markupSidebar);
