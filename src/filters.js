
const filters = {
    searchTitle: '',
}

const setFilters = (updates) => {
    if (typeof updates === 'string') {
        filters.searchTitle = updates.searchTitle
    }
    
}

const getFilters = () => filters

export { getFilters, setFilters }