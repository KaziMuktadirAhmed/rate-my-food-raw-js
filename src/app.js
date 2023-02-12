import contentsView from "./views/contents.view";
import {
  setLocationSearchResult,
  setResutarantNameSearchResult,
  setBothSearchResult,
} from "./controllers/contents.controller";

/// Ok

class App {
  _locationInput = document.querySelector(".location-input");
  _resturantInput = document.querySelector(".resturant-input");
  _searchBtn = document.querySelector(".search_btn");

  constructor() {
    console.log("App started");
    this.handelClickSearchBtn.bind(this);
    this._searchBtn.addEventListener("click", (event) =>
      this.handelClickSearchBtn(event)
    );
    contentsView.render();
  }

  handelClickSearchBtn(event) {
    event.preventDefault();

    let locationText = this._locationInput.value,
      restaurantText = this._resturantInput.value;

    try {
      if (locationText.length > 2 && restaurantText.length > 2)
        // setBothSearchResult(itemText, locationText);
        console.log(locationText, restaurantText);
      else if (locationText.length > 2 && restaurantText.length <= 2)
        setLocationSearchResult(locationText);
      // console.log(locationText);
      else if (locationText.length <= 2 && restaurantText.length > 2)
        // setResutarantNameSearchResult(itemText);
        console.log(restaurantText);
    } catch (error) {
      console.log("In app: ", error);
    }
  }
}

const app = new App();
