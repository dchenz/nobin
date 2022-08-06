import { decrypt, encrypt } from "./Crypto";

test("Test encryption/decryption", () => {
  const text = "hello world";
  const password = "123456";
  const ops = {
    hash: "sha256",
    iters: 1000
  };
  const encryptionOutput = encrypt(text, password, ops);
  // Options should be copied into the returned header.
  expect(encryptionOutput.header.options.hash).toBe(ops.hash);
  expect(encryptionOutput.header.options.iters).toBe(ops.iters);
  // 16-bytes encoded as Base64 should be 24 characters long.
  expect(encryptionOutput.header.iv.length).toBe(24);
  expect(encryptionOutput.header.salt.length).toBe(24);
  // TODO: Verify a successful decryption using some form of HMAC.
  expect(decrypt(encryptionOutput, password)).toBe(text);
  expect(decrypt(encryptionOutput, password + ".")).toBe("");

});