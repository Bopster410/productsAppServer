const BACKEND_URL = 'https://fakestoreapi.com';

const fetchGet = async (url) => {
    const response = await fetch(BACKEND_URL + url);
    const result = await response.json();
    return result;
};

module.exports = { fetchGet };
