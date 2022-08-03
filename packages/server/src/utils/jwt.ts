import {generateKeyPair, generateSecret, SignJWT} from "jose";
export async function generateToken(): Promise<string> {
    return await new SignJWT({'urn:example:claim': true})
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new Uint8Array(32));
}