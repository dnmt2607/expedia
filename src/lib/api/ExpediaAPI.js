import CryptoJS from "crypto-js";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const SHARED_SECRET = process.env.REACT_APP_SHARED_SECRET;

function getAuthorizationKey() {
  // if we have an oauth key in the web localstorage
  // return the key instead

  // else we do this here
  let timestamp = Math.floor(new Date().getTime() / 1000).toString();
  let authKey =
    "EAN apikey=" +
    API_KEY +
    ",signature=" +
    getSigSHA512(timestamp) +
    ",timestamp=" +
    timestamp;
  return authKey;
}

function getSigSHA512(timestamp) {
  let sig = API_KEY + SHARED_SECRET + timestamp;
  return CryptoJS.SHA512(sig).toString();
}

export const ExpediaGET = async (url) => {
  let response = null;
  let jsonRes = null;

  try {
    response = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `${getAuthorizationKey()}`, // Bearer {key} // Token {key}
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "User-Agent": "expedia_demo/v1.00",
      },
    });
    jsonRes = await response.json();
  } catch (error) {
    throw error;
  }
  return jsonRes;
};

export const ExpediaPOST = async (url, data) => {
  let response = null;
  let jsonRes = null;
  try {
    response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        Authorization: `${getAuthorizationKey()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
        "User-Agent": "expedia_demo/v1.00",
      },
      body: JSON.stringify(data),
    });
    jsonRes = await response.json();
  } catch (error) {
    throw error;
  }
  return jsonRes;
};
