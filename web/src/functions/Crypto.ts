import CryptoJS from "crypto-js";
import { HMACOptions, Paste } from "../shared/types/Paste";

type Bytes = CryptoJS.lib.WordArray

const defaultOptions: HMACOptions = {
  hash: "sha256",
  iters: 100000
};

const AES_BLOCK_SIZE = 16;
const SALT_SIZE = 16;

/**
 * Encrypt text using the AES-256 cipher and a password.
 *
 * @param text     Plain-text to be encrypted.
 * @param password Password.
 * @param ops      PBKDF2 options (hash algorithm, iteration count).
 *
 * @returns        Paste object with header and encrypted body (Base64).
 */
export function encrypt(text: string, password: string, ops?: HMACOptions): Paste {
  // Use default PBKDF2 options if not provided.
  if (!ops) {
    ops = defaultOptions;
  }
  // Generate a random 16-byte IV.
  const iv = CryptoJS.lib.WordArray.random(AES_BLOCK_SIZE);
  // Generate a random 16-byte salt.
  const salt = CryptoJS.lib.WordArray.random(SALT_SIZE);
  // Derive the key for AES-256 by hashing password and salt.
  const key = deriveKey(ops.hash, password, salt, ops.iters);
  // Encrypt the plaintext using AES-CBC mode.
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.CBC,
    iv: iv
  });
  // Encode the binary values as Base64.
  // This object should contain the necessary values to decrypt
  // the encrypted content when supplied with the password again.
  return {
    header: {
      iv: iv.toString(CryptoJS.enc.Base64),
      salt: salt.toString(CryptoJS.enc.Base64),
      options: ops
    },
    body: encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  };
}

/**
 * Decrypt an AES-encrypted paste using a password.
 *
 * @param paste    Encrypted paste object.
 * @param password Password.
 *
 * @returns        Plain-text content as UTF-8.
 */
export function decrypt(paste: Paste, password: string): string {
  const { header, body } = paste;
  // Derive the key for AES-256 by hashing password and salt.
  const iv = CryptoJS.enc.Base64.parse(header.iv);
  const salt = CryptoJS.enc.Base64.parse(header.salt);
  const key = deriveKey(header.options.hash, password, salt, header.options.iters);
  // Decrypt the AES-encrypted cipher-text.
  const cipherText = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(body)
  });
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    mode: CryptoJS.mode.CBC,
    iv: iv
  });
  // Decode decrypted text into UTF-8.
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Wrapper over CryptoJS PBKDF2.
 *
 * @param algo     Hash algorithm to use. Supports SHA256, SHA512.
 * @param password Password or passphrase.
 * @param salt     Password salt.
 * @param iters    Number of hash iterations.
 *
 * @returns        AES-256 symmetric key derived using parameters.
 */
function deriveKey(algo: string, pw: string, salt: Bytes, iters: number): Bytes {
  let algoStatic;
  switch (algo) {
    case "sha256":
      algoStatic = CryptoJS.algo.SHA256;
      break;
    case "sha512":
      algoStatic = CryptoJS.algo.SHA512;
      break;
    default:
      throw new Error(`${algo} is not a supported hash algorithm right now`);
  }
  return CryptoJS.PBKDF2(pw, salt, {
    hasher: algoStatic,
    iterations: iters,
    keySize: 256 / 32
  });
}