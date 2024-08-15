import axios, { AxiosResponse } from 'axios';
import refreshTokenIAM from './refreshTokenIAM';
import getTokenJWT from './getTokenJWT';
import changeTokenToIAM from './changeTokenToIAM';
import checkTokenExpiration from './checkTokenExpiration';

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

interface TranslateResponse {
  translations: { text: string }[];
}

const repeatedly_request_to_translate = async (url: string, body: any, headers: any, n: number): Promise<string> => {
  try {
    const response: AxiosResponse<TranslateResponse> = await axios.post(url, body, headers);
    const translate = response.data.translations[0].text;
    return translate;
  } catch (err) {
    console.log("catch_error repeatedly_request_to_translate :>> ");
    if (n <= 1) throw err;
    await sleep(3000);
    const newTokenIAM = await refreshTokenIAM();
    if (newTokenIAM) {
      console.log("res_newTokenIAM :>> ", { newTokenIAM });
      headers = { headers: { Authorization: `Bearer ${newTokenIAM}` } };
    }
    return repeatedly_request_to_translate(url, body, headers, n - 1);
  }
};

async function getIAMToken(): Promise<string | undefined> {
  const tokenJWT = await getTokenJWT();
  return await changeTokenToIAM({ jwt: tokenJWT });
}

export default async function translateText(texts: string[], target_language: string): Promise<string | null> {
  if (!texts || texts.length === 0) {
    console.log('texts :>> ', texts);
    console.error("Invalid texts provided. Ensure that texts is a non-empty array.");
    return null;
  }

  const IAM_TOKEN = await getIAMToken();

  if (!IAM_TOKEN) {
    console.error("Failed to obtain IAM token");
    return null;
  }

  const body = {
    sourceLanguageCode: "",
    targetLanguageCode: target_language,
    texts: texts,
    folderId: process.env.folder_id,
  };

  const headers = { headers: { Authorization: `Bearer ${IAM_TOKEN}` } };
  const url = "https://translate.api.cloud.yandex.net/translate/v2/translate";

  let translate: string | null = null;
  try {
    console.log(" url, body, headers :>> ", url, body, headers);

    translate = await repeatedly_request_to_translate(
      url,
      body,
      headers,
      5 // number of attempts
    );
    console.log("translate :>> ", translate);
  } catch (err: any) {
    console.log("yandex_api_ERROR_translate: ===");
    console.error("err.message -> ", err?.message);
    console.error("err.data -> ", err?.data);
  }
  return translate;
}