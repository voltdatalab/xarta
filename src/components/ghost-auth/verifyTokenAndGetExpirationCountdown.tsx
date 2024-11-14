import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./verifyToken";

export const verifyTokenAndGetExpirationCountdown = async (jwtString: string) => {
    let decodedToken = await verifyToken(jwtString) as JwtPayload;

    let expirationTime = ((decodedToken as JwtPayload).exp as number) * 1000;
    let expirationCountdown = expirationTime - Date.now();
    
    return {
        expirationCountdown,
        decodedToken
    };
};
