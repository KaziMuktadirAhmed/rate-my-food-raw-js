export const filterLocationAutocompleteResponse = function (res) {
  let {
    data: { geolocation },
  } = res;
  let filteredRes = geolocation.map((item) => {
    let {
      id: { id, type },
      name: { text },
    } = item;
    return { id, type, location: text };
  });
  return filteredRes;
};

export const filterRestuarentAutocompleteResponse = function (res) {
  let {
    data: { autocomplete: data },
  } = res;
  let resturantes = data
    .filter((item) => item.__typename === "SearchAutocompleteRestaurant")
    .map((item) => {
      const {
        id,
        name: { text },
        zipCode,
        cityName,
        countryName,
      } = item;

      return {
        id,
        restuarent: text,
        addresss: { zip: zipCode, city: cityName, country: countryName },
      };
    });
  return resturantes;
};
