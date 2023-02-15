let _data;
let currentContent;

export const setData = function (data) {
  _data = data;
};

export const setCurrentContent = function (type) {
  if (type === "tab-about") {
  } else if (type === "tab-menu") {
  } else if (type === "tab-review") {
  }
};

export const getContentData = function () {
  return currentContent;
};
