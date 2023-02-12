import { cardModelData } from "./mockDB";

const resultsPerPage = 5;
let data = [];

// for (let i = 0; i < 100; i++) data[i] = `Data no: ${i + 1}`;
data = cardModelData;

export const setData = function (arr) {
  data = arr;
};

export const getPageRange = function () {
  return Math.ceil(data.length / resultsPerPage);
};

export const getCoordsAndName = function () {
  return data.map((item) => {
    let { geo, name } = item;
    return { text: name, position: geo };
  });
};

export const getSearchResultsPage = function (page = 1) {
  if (data.length === 0) return [];
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  return data.slice(start, end);
};
