
const key = 'authToken';

const getToken = () => localStorage.getItem(key);

const storeToken = token => localStorage.setItem(key, token);

const removeToken = () => localStorage.removeItem(key);

const authStorage = {
    getToken,
    storeToken,
    removeToken,
};

export default authStorage;
