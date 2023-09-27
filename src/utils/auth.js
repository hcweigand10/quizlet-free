import decode from "jwt-decode";

const getToken = () => localStorage.getItem("token");

const auth = {
  getProfile: () => {
    return decode(getToken()) || undefined; // {data: {username, _id}}
  },
  isLoggedIn: () => {
    try {
      const token = getToken();
      if (!token) {
        return false;
      }
      const decoded = decode(token);
      if (decoded.exp > (Date.now() / 1000)) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  },
  login: (token) => {
    // Saves user token to localStorage
    localStorage.setItem('token', token);
    window.location.assign('/');
  },

  logout:() => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
};

export default auth
