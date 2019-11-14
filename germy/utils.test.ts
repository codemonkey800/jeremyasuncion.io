import { getViewportString } from 'germy/utils'

describe('getViewportString()', () => {
  it('should return empty string for empty options', () => {
    expect(getViewportString({})).toEqual('')
  })

  it('should expand options to string', () => {
    const options = {
      a: 1,
      b: 'derp',
      c: true,
      d: 'off',
    }
    const expected = 'a=1,b=derp,c=true,d=off'

    expect(getViewportString(options)).toEqual(expected)
  })
})
