export type ButtonRowKey = 'GITHUB' | 'LINKEDIN' | 'RESUME'

interface ButtonRowItem {
  LINK: string
  TITLE: string
}

export type ButtonRowConfig = {
  [key in ButtonRowKey]: ButtonRowItem
}
export type ViewportOptions = Record<string, boolean | number | string>
