import dotenv from 'dotenv';
import formatDate from './formatDate';
import * as jose from 'node-jose';

dotenv.config();

const serviceAccountId = process.env.SERVICE_ACCOUNT_ID;
const keyId = process.env.KEY_ID;
const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n") || '';

interface Payload {
  aud: string;
  iss: string;
  iat: number;
  exp: number;
}

const getTokenJWT = async (): Promise<string> => {
  const now = Math.floor(new Date().getTime() / 1000);
  console.log('now :>> ', now);

  const payload: Payload = {
    aud: "https://iam.api.cloud.yandex.net/iam/v1/tokens",
    iss: serviceAccountId || '',
    iat: now,
    exp: now + 3600,
  };

  const key = await jose.JWK.asKey(privateKey, "pem", {
    kid: keyId,
    alg: "PS256",
  });

  const token = await jose.JWS.createSign({ format: "compact" }, key)
  .update(JSON.stringify(payload))
  .final();

console.log("getTokenJWT_now", formatDate(payload.iat));
console.log("getTokenJWT_exp", formatDate(payload.exp));
console.log("TokenJWT", token);

return token.toString(); // Return the token as a string
};

export default getTokenJWT;