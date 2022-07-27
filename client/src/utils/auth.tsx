import decode from 'jwt-decode'; // to decode a JWT token to retrieve a user's information

class AuthService {
  getProfile() { // get user data from local storage
    return decode(this.getToken());
  }

  loggedIn() { // checks if the user is logged in
    // Checks if there is a saved token and if it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) { // Typescript uses Strong typing so the token is of type string
    try { // checks if the token is expired
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string) { // Typescript uses Strong typing so the token is of type string
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
