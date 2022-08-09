/**
 * PasteFull contains all paste attributes stored on the server,
 * excluding values that should be kept secret, like "edit_key".
 */
export type PasteFull = {
  id: string
  createdAt: Date
  duration: number
  editable: boolean
  content: PasteContent
}

/**
 * PasteCreateRequest contains values that are submitted to the server
 * when creating a new paste. Some paste attributes, such as "created_at",
 * are generated on the server, hence they are not included in this type.
 */
export type PasteCreateRequest = {
  content: PasteContent
  duration: number
}

/**
 * PasteContent contains the paste's encryption header and content.
 * The "body" attribute will be updated when the paste is encrypted/decrypted,
 * so PasteContent represents both encrypted and plaintext pastes.
 */
export type PasteContent = {
  header: PasteHeader
  body: string
}

/**
 * PasteHeader contains values required for future decryption,
 * such as the algorithms used and randomly-generated IV + salt.
 */
export type PasteHeader = HMACOptions & {
  iv: string
  salt: string
}

/**
 * HMACOptions contains hashing configuration for CryptoJS.PBKDF2.
 */
export type HMACOptions = {
  hash: string
  iters: number
}

/**
 * PasteRef is returned by the API after a successful paste creation.
 * It contains the server-generated ID and a key that authorises edits.
 */
export type PasteRef = {
  id: string
  editKey: string
}


