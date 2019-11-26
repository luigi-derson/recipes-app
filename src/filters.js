const filters = {
  searchTitle: ""
};

const setFilters = update => {
  if (typeof update.searchTitle === "string") {
    filters.searchTitle = update.searchTitle;
  }
};

const getFilters = () => filters;

export { getFilters, setFilters };
