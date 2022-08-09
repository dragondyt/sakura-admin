import {generateKeyPair, generateSecret, jwtVerify, SignJWT} from "jose";
import {JWTVerifyResult} from "jose/dist/types/types";
export async function generateToken(email: string): Promise<string> {
    return await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new Uint8Array(32));
}

export async function VerifyToken(token: string): Promise<JWTVerifyResult> {
    // const { publicKey, privateKey } = await generateKeyPair('PS256');
    return jwtVerify(token, new Uint8Array(32));
}