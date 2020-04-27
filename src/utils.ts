import { IS_PROD } from 'germy/constants'
import ReactGA from 'react-ga'

export const initAnalytics = (): void => {
  if (IS_PROD) {
    ReactGA.initialize(process.env.GA_TRACKING_ID || '')
  }
}

export const logPageView = (): void => {
  if (IS_PROD) {
    const { pathname } = window.location
    ReactGA.set({ page: pathname })
    ReactGA.pageview(pathname)
  }
}

export const logOpenedLink = (href: string): void =>
  ReactGA.outboundLink({ label: href }, () => {})
