const axios = require("axios")
const refreshTokenIAM = require("./refreshTokenIAM")
const getTokenJWT = require("./getTokenJWT.js")
const changeTokenToIAM = require("./changeTokenToIAM.js")
const checkTokenExpiration = require("./checkTokenExpiration.js")

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const repeatedly_request_to_translate = async (url, body, headers, n) => {
  try {
    const response = await axios.post(url, body, headers)
    const translate = response.data.translations[0].text
    return translate
  } catch (err) {
    console.log("catch_error repeatedly_request_to_translate :>> ")
    if (n <= 1) throw err
    await sleep(3000)
    const newTokenIAM = await refreshTokenIAM()
    newTokenIAM.then((res_newTokenIAM) => {
      console.log("res_newTokenIAM :>> ", { res_newTokenIAM })
      headers = { headers: { Authorization: `Bearer ${res_newTokenIAM}` } }
    })

    return repeatedly_request_to_translate(url, body, headers, n - 1)
  }
}

let cachedIAMToken = null;
let tokenExpirationTime = null;

async function getIAMToken() {
  const currentTime = Date.now();

  // Check if the token exists and is not expired
  if (cachedIAMToken && tokenExpirationTime && currentTime < tokenExpirationTime) {
    console.log("Using cached IAM_TOKEN");
    return cachedIAMToken;
  }

  console.log("Creating new IAM_TOKEN");
  const tokenJWT = await getTokenJWT()
  const newToken = await changeTokenToIAM({ jwt: tokenJWT })
  
  // Store the new token and set its expiration time (e.g., 12 hours from now)
  cachedIAMToken = newToken;
  tokenExpirationTime = currentTime + 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  return newToken;
}

module.exports = async function translateText(texts, target_language) {
  if (!texts  || texts.length === 0) {
    console.log('texts :>> ', texts);
    console.error("Invalid texts provided. Ensure that texts is a non-empty array.")
    return null // or throw an error depending on your use case
  }
  
  const IAM_TOKEN = await getIAMToken()

  const body = {
    sourceLanguageCode: "",
    targetLanguageCode: target_language,
    texts: texts,
    folderId: process.env.folder_id,
  }

  const headers = { headers: { Authorization: `Bearer ${IAM_TOKEN}` } }
  const url = "https://translate.api.cloud.yandex.net/translate/v2/translate"

  let translate
  try {
    console.log(" url, body, headers :>> ", url, body, headers)

    translate = await repeatedly_request_to_translate(
      url,
      body,
      headers,
      5 // number of attempts
    )
    console.log("translate :>> ", translate)
  } catch (err) {
    console.log("yandex_api_ERROR_translate: ===")
    console.error("err.message -> ", err?.message)
    console.error("err.data -> ", err?.data)
  }
  return translate
}
