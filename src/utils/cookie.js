import Cookies from 'js-cookie';

const TokenKey = 'token';
const UserKey = 'user';
export function getToken() {
  return Cookies.get(TokenKey);
}
export function setCookies(key, value) {
  return Cookies.set(key, value);
}

export function getCookies(key) {
  return Cookies.get(key);
}

export function removeCookies(key) {
  return Cookies.remove(key);
}
export function getUser() {
  return Cookies.get(UserKey);
}
