import {SignJWT} from 'jose'
import dotenv from 'dotenv'

dotenv.config();

// Convert secret into Uint8Array
export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Generate a JWT token
 * @param {Object} payload - The payload to be encoded in the JWT
 * @param {string} expiresIn - The expiration time for the JWT(e.g., '15m', '7d', '30d')
 * @returns {Promise<string>} - The generated JWT token
 */
export const generateToken = async (payload, expiresIn = '')=>{
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET)
}