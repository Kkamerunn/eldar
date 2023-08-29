import { TOKEN } from "../utils/constants";

// Set the token on the localstorage
export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

// Retrieve the token from the localstorage
export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

// Delete the token from the localstorage
export function deleteTokenApi() {
  return localStorage.removeItem(TOKEN);
}
