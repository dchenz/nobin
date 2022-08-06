export type HMACOptions = {
  hash: string
  iters: number
}

export type PasteHeader = {
  iv: string
  salt: string
  options: HMACOptions
}

export type Paste = {
  header: PasteHeader
  body: string
}
