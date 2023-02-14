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

// Inserting cuisine tag
let tagMarkup = ``;
restaurant.highlightedTag.map((item) => {
  tagMarkup += `<span class="card-tag-${item.highlightType}">${item.text}</span>`;
});
tagMarkup = `<p class="card-tags">` + tagMarkup + `</p>`;

headingElement.insertAdjacentHTML("afterbegin", tagMarkup);

// Inserting Resturant name and rating
let headingTitleMarkup = ``;
headingTitleMarkup += `<h1 class="heading-name">${restaurant.name}</h1>`;
restaurant.aggregateRatings.thefork;
let {
  aggregateRatings: {
    thefork: { ratingValue: theforkRating, reviewCount: theforkReviewCount },
    tripadvisor: { ratingValue: tripadvisor },
  },
} = restaurant;
// console.log(thefork, tripadvisor);
headingTitleMarkup += `
<div>
  <p>
    <span class="heading-rating">${theforkRating}</span>
    /10
  </p>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" mr="xs" alt="" class="css-igdmea e125e8xs0"><path fill-rule="evenodd" d="M10.5 3C6.365 3 3 6.365 3 10.5S6.365 18 10.5 18h3c.131 0 .26.033.372.098L18 20.458v-3.593c0-.224.1-.437.272-.579A7.478 7.478 0 0 0 21 10.5C21 6.365 17.635 3 13.5 3h-3Zm8.25 19.5a.747.747 0 0 1-.372-.098L13.301 19.5H10.5c-4.963 0-9-4.037-9-9s4.037-9 9-9h3c4.963 0 9 4.037 9 9 0 2.575-1.088 5-3 6.709v4.541a.75.75 0 0 1-.75.75Z"></path></svg>
    ${theforkReviewCount}
  </div>
</div>`;
headingTitleMarkup =
  `<div class="heading-title">` + headingTitleMarkup + `</div>`;
headingElement.insertAdjacentHTML("beforeend", headingTitleMarkup);

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

// Inserting tabs div
let tabsMarkup = `
<div class="menu-tabs">
  <button class="tab tab-about">
    <span>About</span>
  </button>
  <button class="tab tab-menu">
    <span>Menu</span>
  </button>
  <button class="tab tab-review">
    <span>Review</span>
  </button>
</div>`;
headingElement.classList.toggle("heading-no-padding-bottom");
headingElement.insertAdjacentHTML("beforeend", tabsMarkup);

let aboutTab = document.querySelector(".tab-about"),
  menuTab = document.querySelector(".tab-menu"),
  reviewTab = document.querySelector(".tab-review");

aboutTab.addEventListener("click", insertAboutCard);

mainContent.insertAdjacentHTML("beforeend", `<div class="tab-contents"></div>`);
let tabContents = document.querySelector(".tab-contents");

function insertAboutCard(event) {
  event.preventDefault();
  // Insert about div in tab contents
  tabContents.innerHTML = "";

  let contentMarkup = `
<div class="about-tab">
  <p>${restaurant.description}</p>`;

  let timeTableMarkup = generateTimetableMarkup();

  contentMarkup += timeTableMarkup + `</div>`;

  tabContents.insertAdjacentHTML("beforeend", contentMarkup);
}

function generateTimetableMarkup() {
  let { OpeningHoursArray: timeTable, openingHoursMarkup: timeTableMarkup } =
    formatOpeningHoursMarkup(restaurant.openingHours);

  timeTable = timeTable.map((item) => {
    return {
      day: item.day,
      time: item.time.map((it) => {
        return {
          start: convert12HrTimeFormat(it.start),
          end: convert12HrTimeFormat(it.end),
        };
      }),
    };
  });

  let markup = `
  <div class="time-table">
    <h3 class="time-table-heading">Opening Hours</h3>
    <div class="time-table-list">`;
  timeTable.map((item) => {
    markup += `
      <div class="time-table-row">
        <div style="min-width: 8rem;">${item.day}</div>
        <div class="time-row">`;
    let len = item.time.length;
    item.time.map((t, index) => {
      markup += `
          <div> ${t.start} - ${t.end} </div>`;
      if (index < len - 1)
        markup += `
          <div>
            <span>•</span>
          </div>`;
    });
    markup += `
        </div>
      </div>`;
  });
  markup += `
    </div>
  </div>`;

  return markup;
}

function convert12HrTimeFormat(timeString) {
  let [hr, min] = timeString.split(":").map((item) => parseInt(item)),
    tailingStr = ``;
  if (hr > 11) tailingStr = "PM";
  else tailingStr = "AM";

  if (hr > 12) hr -= 12;
  else if (hr === 0) hr = 12;

  return `${`${hr}`.padStart(2, "0")}:${`${min}`.padStart(
    2,
    "0"
  )} ${tailingStr}`;
}

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

  return { openingHoursMarkup, OpeningHoursArray };
}

let openingHours = formatOpeningHoursMarkup(restaurant.openingHours);
// console.log(openingHours);

// let markupSidebar = `<p>${restaurant.openingHours}</p>`;
// sidebarElement.insertAdjacentHTML(
//   "afterbegin",
//   openingHours.openingHoursMarkup
// );
