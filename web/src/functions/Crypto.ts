import { Buffer } from "buffer";
import CryptoJS from "crypto-js";
import ScryptJS from "scrypt-js";
import { KDFSpec, KDFSpecScrypt, PasteContent, PasteHeader } from "../shared/types/Paste";

type Bytes = CryptoJS.lib.WordArray

const defaultOptions: KDFSpecScrypt = {
  hash: "scrypt",
  n: 2 ** 14,
  r: 8,
  t: 1
};

const AES_BLOCK_SIZE = 16;
const SALT_SIZE = 16;
const AES_KEY_SIZE = 32; // AES-256

/**
 * Encrypt text using the AES-256 cipher and a password.
 *
 * @param text     Plain-text to be encrypted.
 * @param password Password.
 * @param ops      Hash options (hash algorithm, iteration count).
 *
 * @returns        Paste object with header and encrypted body (Base64).
 */
export function encrypt(text: string, password: string, ops?: KDFSpec): PasteContent {
  if (!ops) {
    ops = defaultOptions;
  }
  // Generate a random 16-byte IV.
  const iv = CryptoJS.lib.WordArray.random(AES_BLOCK_SIZE);
  // Generate a random 16-byte salt.
  const salt = CryptoJS.lib.WordArray.random(SALT_SIZE);
  // Derive the key for AES-256 by hashing password and salt.
  const key = deriveKey(password, salt.toString(CryptoJS.enc.Base64), ops);
  // Convert the plaintext to JSON so it's possible to verify
  // a successful decryption by JSON-decoding the returned plaintext.
  const plainText = JSON.stringify({ data: text });
  // Encrypt the plaintext using AES-CBC mode.
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
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
      ...ops
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
export function decrypt(paste: PasteContent, password: string): string | null {
  const { header, body } = paste;
  const ops = getKDFSpecFromHeader(header);
  if (!ops) {
    // Invalid header.
    return null;
  }
  // Derive the key for AES-256 by hashing password and salt.
  const iv = CryptoJS.enc.Base64.parse(header.iv);
  const key = deriveKey(password, header.salt, ops);
  // Decrypt the AES-encrypted cipher-text into UTF-8.
  const cipherText = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(body)
  });
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    mode: CryptoJS.mode.CBC,
    iv: iv
  });
  // Attempt to decode JSON and return the plaintext.
  try {
    const plainText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plainText)?.data ?? null;
  } catch (e) {
    return null;
  }
}

/**
 * Helper for password hashing.
 *
 * @param password Password or passphrase.
 * @param salt     Password salt as base64.
 * @param ops      Hash and options for password hashing.
 *
 * @returns        AES-256 symmetric key derived using parameters.
 */
function deriveKey(pw: string, salt: string, ops: KDFSpec): Bytes {
  if (ops.hash == "scrypt") {
    const h = Buffer.from(ScryptJS.syncScrypt(
      Buffer.from(pw),
      Buffer.from(salt, "base64"),
      ops.n,
      ops.r,
      ops.t,
      AES_KEY_SIZE
    ));
    return CryptoJS.enc.Base64.parse(h.toString("base64"));
  }
  // Not used for encryption, only supported for backwards-compatibility.
  return CryptoJS.PBKDF2(pw, CryptoJS.enc.Base64.parse(salt), {
    hasher: ops.hash == "sha256" ? CryptoJS.algo.SHA256 : CryptoJS.algo.SHA512,
    iterations: ops.iters,
    keySize: AES_KEY_SIZE * 8 / 32
  });
}

/**
 * Helper to retrieve password hashing options from header.
 *
 * @param header Paste header.
 *
 * @returns      If valid, returns the spec object, otherwise null.
 */
function getKDFSpecFromHeader(header: PasteHeader): KDFSpec | null {
  if (header.hash == "scrypt") {
    return {
      hash: header.hash,
      n: header.n,
      r: header.r,
      t: header.t
    };
  }
  if (header.hash == "sha256" || header.hash == "sha512") {
    return {
      hash: header.hash,
      iters: header.iters
    };
  }
  return null;
}