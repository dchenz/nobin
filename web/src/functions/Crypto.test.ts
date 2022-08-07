import { decrypt, encrypt } from "./Crypto";

const BASE64_16_BYTES_SIZE = 24;

test("Encrypt/decrypt - AES256/SHA256", () => {

  const text = "The quick brown fox jumps over the lazy dog";
  const password = "password_123456";
  const ops = {
    hash: "sha256",
    iters: 1000
  };

  const encryptionOutput = encrypt(text, password, ops);

  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));

  // Options should be copied into the returned header.
  expect(encryptionOutput.header.options.hash).toBe(ops.hash);
  expect(encryptionOutput.header.options.iters).toBe(ops.iters);

  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(BASE64_16_BYTES_SIZE);
  expect(encryptionOutput.header.salt.length).toBe(BASE64_16_BYTES_SIZE);

  // Check for successful decryption using correct password.
  expect(decrypt(encryptionOutput, password)).toBe(text);

  // Check for failed decryption using incorrect password.
  expect(decrypt(encryptionOutput, password + "1")).toBeNull();

});

test("Encrypt/decrypt - AES256/SHA512", () => {

  const text = "The quick brown fox jumps over the lazy dog";
  const password = "password_123456";
  const ops = {
    hash: "sha512",
    iters: 1000
  };

  const encryptionOutput = encrypt(text, password, ops);

  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));

  // Options should be copied into the returned header.
  expect(encryptionOutput.header.options.hash).toBe(ops.hash);
  expect(encryptionOutput.header.options.iters).toBe(ops.iters);

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
  const ops = {
    hash: "sha256",
    iters: 1000
  };

  const encryptionOutput = encrypt(text, password, ops);

  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));

  // Options should be copied into the returned header.
  expect(encryptionOutput.header.options.hash).toBe(ops.hash);
  expect(encryptionOutput.header.options.iters).toBe(ops.iters);

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
  const ops = {
    hash: "sha256",
    iters: 1000
  };

  const encryptionOutput = encrypt(text, password, ops);

  // Encrypted text should at least be different to the original text.
  expect(encryptionOutput.body).not.toBe(Buffer.from(text).toString("base64"));

  // Options should be copied into the returned header.
  expect(encryptionOutput.header.options.hash).toBe(ops.hash);
  expect(encryptionOutput.header.options.iters).toBe(ops.iters);

  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(BASE64_16_BYTES_SIZE);
  expect(encryptionOutput.header.salt.length).toBe(BASE64_16_BYTES_SIZE);

  // Check for successful decryption using correct password.
  expect(decrypt(encryptionOutput, password)).toBe(text);

  // Check for failed decryption using incorrect password.
  expect(decrypt(encryptionOutput, password + "1")).toBeNull();

});