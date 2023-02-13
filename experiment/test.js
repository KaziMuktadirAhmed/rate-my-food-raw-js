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

// Inserting Resturant name
headingElement.insertAdjacentHTML(
  "afterbegin",
  `<div class="heading-title">\
    <h1 class="heading-name">${restaurant.name}</h1>
  </div>`
);

// Inserting cuisine tag
let tagMarkup = ``;
restaurant.highlightedTag.map((item) => {
  tagMarkup += `<span class="card-tag-${item.highlightType}">${item.text}</span>`;
});
tagMarkup = `<p class="card-tags">` + tagMarkup + `</p>`;

headingElement.insertAdjacentHTML("afterbegin", tagMarkup);

// Inserting resturant address and avarage price
headingElement.insertAdjacentHTML(
  "beforeend",
  `<h4 class="card-address">
    ${restaurant.address.street}, ${restaurant.address.zipCode}, ${restaurant.address.locality}
  </h4>
  <p class="card-address">
    Avarage price range: ${restaurant.acceptedCurrency} ${restaurant.averagePrice}
  </p>`
);

function formatOpeningHoursMarkup(openingHoursString) {
  let OpeningHoursArray = openingHoursString
    .split("\r\n")
    .filter((item) => item.length > 0)
    .map((item) => {
      let day,
        tokens = item.split(",").map((item) => item.trim()),
        times = tokens.map((item) =>
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
      return { day: day, time: final };
    });

  let openingHoursMarkup = ``;

  if (OpeningHoursArray.length > 0) {
    openingHoursMarkup += `
    <table class="timetable">
      <thead>
        <tr>
          <th>Day</th>
          <th>Start time</th>
          <th>End time</th>
        </tr>
      </thead>`;
    OpeningHoursArray.map((item) => {
      openingHoursMarkup += `
      <tr>
        <td rowspan="3" class="cell-color-day">${item.day}</td>`;
      item.time.map((it, index) => {
        if (index > 0) openingHoursMarkup += `<tr>`;
        openingHoursMarkup += `
          <td>${it.start}</td>
          <td>${it.end}</td>
        </tr>`;
      });
    });
    openingHoursMarkup += `
    </table>`;
  }

  return openingHoursMarkup;
}

let openingHours = formatOpeningHoursMarkup(restaurant.openingHours);
// console.log(openingHours);

// let markupSidebar = `<p>${restaurant.openingHours}</p>`;
sidebarElement.insertAdjacentHTML("afterbegin", openingHours);
