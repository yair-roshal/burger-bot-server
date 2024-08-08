const axios = require("axios")
const {
  source_language,
  target_language,
} = require("../../constants/languages")
const refreshTokenIAM = require("./refreshTokenIAM")

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const repeatedly_request_to_translate = async (url, body, headers, n) => {
  try {
    // console.log('url, body, headers, n :>> ', url, body, headers, n)

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

module.exports = async function translateText(texts, IAM_TOKEN) {
  const body = {
    sourceLanguageCode: source_language,
    targetLanguageCode: target_language,
    texts: texts,
    folderId: process.env.folder_id,
  }

  const headers = { headers: { Authorization: `Bearer ${IAM_TOKEN}` } }
  const url = "https://translate.api.cloud.yandex.net/translate/v2/translate"

  let translate
  try {
    translate = await repeatedly_request_to_translate(
      url,
      body,
      headers,
      5 // number of attempts
    )
    console.log("translate :>> ", translate)
  } catch (err) {
    console.log("yandex_api_ERROR_translate: ")
    console.error("err.message", err?.message)
    console.error("err.data", err?.data)
  }
  return translate
}
