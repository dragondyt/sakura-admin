import {generateKeyPair, generateSecret, SignJWT} from "jose";
export async function generateToken(): Promise<string> {
    const { publicKey, privateKey } = await generateKeyPair('RS256', { modulusLength: 4096 });
    const secret = await generateSecret("RS256");
    think.logger.info(secret.toString());
    return await new SignJWT({'urn:example:claim': true})
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('2h')
        .sign(secret);
}