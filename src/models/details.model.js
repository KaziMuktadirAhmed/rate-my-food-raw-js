let _data;
let currentContent;

export const setData = function (data) {
  _data = data;
};

export const setCurrentContent = function (type) {
  if (type === "tab-about") {
    console.log("in tab-about");
    currentContent = {
      type: "About",
      description: _data.description,
      exchangeRates: _data.exchangeRates,
      openingHours: _data.openingHours,
      additionalProperty: _data.additionalProperty,
    };
  } else if (type === "tab-menu") {
    console.log("in tab-menu");
    currentContent = {
      type: "Menu",
      chef: _data.chefName,
      menus: _data.menus,
      payAtTheTable: _data.payAtTheTable,
      safetyMeasures: _data.safetyMeasures,
    };
  } else if (type === "tab-review") {
    console.log("in tab-review");
    currentContent = {
      type: "Reviews",
      bestRating: _data.bestRating,
    };
  }
};

export const getContentData = function () {
  return currentContent;
};
