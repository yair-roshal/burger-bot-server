import axios, { AxiosError } from 'axios';

interface JwtObj {
  jwt: string;
}

export default async function changeTokenToIAM(jwtObj: JwtObj): Promise<string | undefined> {
  try {
    const response = await axios.post("https://iam.api.cloud.yandex.net/iam/v1/tokens", jwtObj);
    const IAM_TOKEN = response.data.iamToken;
    console.log("IAM_TOKEN==", { IAM_TOKEN });
    return IAM_TOKEN;
  } catch (err) {
    const error = err as AxiosError;
    console.log('jwtObj', jwtObj);
    if (error.response) {
      console.warn("AXIOS ERROR _ changeTokenToIAM_err.response.data: ", error.response.data);
    } else {
      console.warn("AXIOS ERROR _ changeTokenToIAM: ", error.message);
    }
    return undefined;
  }
}