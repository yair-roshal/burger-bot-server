import getTokenJWT from './getTokenJWT';
import changeTokenToIAM from './changeTokenToIAM';

interface JwtObj {
  jwt: string;
}

async function refreshTokenIAM(): Promise<string | undefined> {
  const tokenJWT = await getTokenJWT();

  const jwtObj: JwtObj = {
    jwt: tokenJWT,
  };

  return changeTokenToIAM(jwtObj);
}

export default refreshTokenIAM;