import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { stateWrapper } from './stateWrapper';


// Tried using jose library but it did not accept ghost's jwt signature due to modulus length for RS512,
// see more details at: https://github.com/panva/jose/issues/210#jws-alg
// In order for this code to work with jsonwebtoken library, it needs to be pinned to version 8, https://stackoverflow.com/a/75089435
// Also tried using jsonwebtoken with node-jwks-rsa, but it is aimed at Node.js environments and it does not work well in the browser
// TODO: Consider using jsrsasign
export const verifyToken = async (token: string) => {

    const {publicKey} = stateWrapper.config;

    if (!publicKey) {
        throw new Error(`Missing "publicKey" in config. Please provide one of your keys from your JWKS file`);
    }

    // Convert to pem, see https://mojoauth.com/blog/jwt-validation-with-jwks-nodejs/
    const publicToken = jwkToPem(publicKey);

    return jwt.verify(token, publicToken, {algorithms: ['RS512']})
};
