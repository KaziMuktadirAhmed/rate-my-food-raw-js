import contentsView from "./views/contents.view";
import {
  setLocationSearchResult,
  setResutarantNameSearchResult,
  setBothSearchResult,
} from "./controllers/contents.controller";
import ResturantDetailsView from "./views/details.view";

/// Ok

class App {
  _locationInput = document.querySelector(".location-input");
  _resturantInput = document.querySelector(".resturant-input");
  _searchBtn = document.querySelector(".search_btn");
  _loginBtn = document.querySelector(".btn_login");

  constructor() {
    console.log(
      "App started\nInitial card data are impotred from a mock db file sarch using the searchbar to get new results"
    );

    // sets execution context
    this.handelClickSearchBtn.bind(this);

    // adds event handlers
    this._searchBtn.addEventListener("click", (event) =>
      this.handelClickSearchBtn(event)
    );
    this._loginBtn.addEventListener("click", (event) => {
      event.preventDefault();
      ResturantDetailsView.render();
    });

    // Renders initial layout
    contentsView.render();
  }

  handelClickSearchBtn(event) {
    event.preventDefault();

    let locationText = this._locationInput.value,
      restaurantText = this._resturantInput.value;

    try {
      if (locationText.length > 2 && restaurantText.length > 2)
        setBothSearchResult(restaurantText, locationText);
      else if (locationText.length > 2 && restaurantText.length <= 2)
        setLocationSearchResult(locationText);
      else if (locationText.length <= 2 && restaurantText.length > 2)
        setResutarantNameSearchResult(restaurantText);
    } catch (error) {
      console.error("In app.js: ", error);
    }
  }
}

const app = new App();
