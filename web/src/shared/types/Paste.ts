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

export type PasteOptions = {
  duration: number
  editable: boolean
}

export type PasteRef = {
  id: string
  editKey: string | null
}

export type PasteSubmitResponse = {
  success: boolean
  data: PasteRef | string
}
