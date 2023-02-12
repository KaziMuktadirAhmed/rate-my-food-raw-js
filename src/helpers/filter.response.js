export const filterLocationAutocompleteResponse = function (res) {
  try {
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
  } catch (error) {
    throw res;
  }
};

export const filterRestuarentAutocompleteResponse = function (res) {
  try {
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
  } catch (error) {
    throw res;
  }
};
