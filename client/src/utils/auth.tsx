import decode from 'jwt-decode'; // to decode a JWT token to retrieve a user's information

class AuthService {
  getProfile() { // get user data from local storage
    return decode(this.getToken() || "{}"); // removes null type issue, source: https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
  }

  loggedIn() { // checks if the user is logged in
    // Checks if there is a saved token and if it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) { // have to declare a type in function parameters
    try { // checks if the token is expired
      const decoded: any = decode(token); // to remove "Object is of type 'unknown'.ts(2571)" issue in if statement: decoded.exp, source: https://stackoverflow.com/questions/33615680/how-to-properly-change-a-variables-type-in-typescript
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

  login(idToken: string) { // have to declare a type in function parameters
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
