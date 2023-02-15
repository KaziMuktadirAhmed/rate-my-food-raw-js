export default class ResturantDetailsAboutView {
  _data;

  _parentElement = document.querySelector(".card-container");

  constructor(data) {
    this._data = data;

    // Sets execution context for methods
    this.render.bind(this);
    this._resetCardContainer.bind(this);

    // Reset div
  }

  render() {
    console.log("ok inside:", this);
    this._resetCardContainer();
  }

  _resetCardContainer() {
    this._parentElement.innerHTML = "";
    if (this._parentElement.classList.contains("card-container")) {
      this._parentElement.classList.remove("card-container");
      this._parentElement.classList.add("about-tab");
    }
  }

  _parseTimeTable() {
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
  }
}
