import { ViewportOptions } from 'germy/types'

export const dummy = 1

const FIRST_CAPITAL_CHAR_CODE = 'A'.charCodeAt(0)
const LAST_CAPITAL_CHAR_CODE = 'Z'.charCodeAt(0)

function isCapital(character: string) {
  const charCode = character.charCodeAt(0)
  return (
    charCode >= FIRST_CAPITAL_CHAR_CODE
    && charCode <= LAST_CAPITAL_CHAR_CODE
  )
}

function findIndexOfFirstCapital(value: string): number {
  for (let i = 0; i < value.length; i++) {
    if (isCapital(value[i])) {
      return i
    }
  }

  return -1
}

function camelCaseToSnakeCase(value: string): string {
  let result = value
  let nextDashIndex: number

  do {
    nextDashIndex = findIndexOfFirstCapital(result)
    if (nextDashIndex >= 0) {
      result =
        result.substring(0, nextDashIndex)
        + result.substr(nextDashIndex + 1, 1)
        + result.substring(nextDashIndex + 2)
    }
  } while (nextDashIndex >= 0)

  return result
}

export function getViewportString(options: ViewportOptions): string {
  return Object
    .entries(options)
    .map(([key, val]) => `${camelCaseToSnakeCase(key)}=${val}`)
    .join(',')
}
