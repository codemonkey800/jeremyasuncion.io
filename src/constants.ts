import { ButtonRowConfig } from 'germy/types'

export const APP_HEAD = {
  AUTHOR: 'Jeremy Asuncion',
  TITLE: 'jeremyasuncion.io',
  VIEWPORT: {
    'initial-scale': 1,
    'minimum-scale': 1,
    'shrink-to-fit': 'no',
    width: 'device-width',
  },
}

export const BUTTON_ROW: ButtonRowConfig = {
  GITHUB: {
    TITLE: 'GitHub',
    LINK: 'https://github.com/codemonkey800',
  },
  LINKEDIN: {
    TITLE: 'LinkedIn',
    LINK: 'https://www.linkedin.com/in/jeremyasuncion',
  },
  RESUME: {
    TITLE: 'Resume',
    LINK: 'https://github.com/codemonkey800/dotfiles/blob/master/resume.pdf',
  },
}

export const IS_PROD = process.env.NODE_ENV === 'production'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const TYPED_HEADERS = [
  'Frontend Engineer',
  'Postmates X',
  'SJSU Alumnus',
  'Skateboarder',
  'Steak Enthusiast',
]
