import { Buffer } from "buffer";
import { KDFSpec, PasteHeader } from "../shared/types/Paste";
import { decrypt, encrypt } from "./Crypto";

const BASE64_16_BYTES_SIZE = 24;

test("Encrypt/decrypt - aes256/sha256", () => {
  const text = "The quick brown fox jumps over the lazy dog";
  const password = "password_123456";
  const ops: KDFSpec = {
    hash: "sha256",
    iters: 1000
  };
  const encryptionOutput = encrypt(text, password, ops);
  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));
  // Options should be copied into the returned header.
  checkOutputHeader(encryptionOutput.header, ops);
  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(BASE64_16_BYTES_SIZE);
  expect(encryptionOutput.header.salt.length).toBe(BASE64_16_BYTES_SIZE);
  // Check for successful decryption using correct password.
  expect(decrypt(encryptionOutput, password)).toBe(text);
  // Check for failed decryption using incorrect password.
  expect(decrypt(encryptionOutput, password + "1")).toBeNull();
});

test("Encrypt/decrypt - aes256/sha512", () => {
  const text = "The quick brown fox jumps over the lazy dog";
  const password = "password_123456";
  const ops: KDFSpec = {
    hash: "sha512",
    iters: 1000
  };
  const encryptionOutput = encrypt(text, password, ops);
  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));
  // Options should be copied into the returned header.
  checkOutputHeader(encryptionOutput.header, ops);
  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(BASE64_16_BYTES_SIZE);
  expect(encryptionOutput.header.salt.length).toBe(BASE64_16_BYTES_SIZE);
  // Check for successful decryption using correct password.
  expect(decrypt(encryptionOutput, password)).toBe(text);
  // Check for failed decryption using incorrect password.
  expect(decrypt(encryptionOutput, password + "1")).toBeNull();
});

test("Encrypt/decrypt - empty plaintext", () => {
  const text = "";
  const password = "password_123456";
  const ops: KDFSpec = {
    hash: "sha256",
    iters: 1000
  };
  const encryptionOutput = encrypt(text, password, ops);
  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));
  // Options should be copied into the returned header.
  checkOutputHeader(encryptionOutput.header, ops);
  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(BASE64_16_BYTES_SIZE);
  expect(encryptionOutput.header.salt.length).toBe(BASE64_16_BYTES_SIZE);
  // Check for successful decryption using correct password.
  expect(decrypt(encryptionOutput, password)).toBe(text);
  // Check for failed decryption using incorrect password.
  expect(decrypt(encryptionOutput, password + "1")).toBeNull();
});

test("Encrypt/decrypt - unicode characters", () => {
  const text = "你好 😂😂😂";
  const password = "password_123456";
  const ops: KDFSpec = {
    hash: "sha256",
    iters: 1000
  };
  const encryptionOutput = encrypt(text, password, ops);
  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));
  // Options should be copied into the returned header.
  checkOutputHeader(encryptionOutput.header, ops);
  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(BASE64_16_BYTES_SIZE);
  expect(encryptionOutput.header.salt.length).toBe(BASE64_16_BYTES_SIZE);
  // Check for successful decryption using correct password.
  expect(decrypt(encryptionOutput, password)).toBe(text);
  // Check for failed decryption using incorrect password.
  expect(decrypt(encryptionOutput, password + "1")).toBeNull();
});

test("Encrypt/decrypt - aes256/scrypt", () => {
  const text = "The quick brown fox jumps over the lazy dog";
  const password = "password_123456";
  const ops: KDFSpec = {
    hash: "scrypt",
    n: 2 ** 8,
    r: 4,
    t: 1
  };
  const encryptionOutput = encrypt(text, password, ops);
  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));
  // Options should be copied into the returned header.
  checkOutputHeader(encryptionOutput.header, ops);
  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(BASE64_16_BYTES_SIZE);
  expect(encryptionOutput.header.salt.length).toBe(BASE64_16_BYTES_SIZE);
  // Check for successful decryption using correct password.
  expect(decrypt(encryptionOutput, password)).toBe(text);
  // Check for failed decryption using incorrect password.
  expect(decrypt(encryptionOutput, password + "1")).toBeNull();
});

function checkOutputHeader(header: PasteHeader, ops: KDFSpec) {
  if (header.hash == "scrypt") {
    if (ops.hash == "scrypt") {
      expect(header.n).toBe(ops.n);
      expect(header.r).toBe(ops.r);
      expect(header.t).toBe(ops.t);
    } else {
      fail("mismatched hash types");
    }
  } else {
    if (ops.hash == "sha256" || ops.hash == "sha512") {
      expect(header.iters).toBe(ops.iters);
    } else {
      fail("mismatched hash types");
    }
  }
}