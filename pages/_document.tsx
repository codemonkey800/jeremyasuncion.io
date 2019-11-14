import { ServerStyleSheets } from '@material-ui/styles'
import { APP_HEAD } from 'germy/strings'
import theme from 'germy/theme'
import { getViewportString } from 'germy/utils'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { Children, ReactElement } from 'react'

const VIEWPORT_STRING = getViewportString(APP_HEAD.VIEWPORT)

export default class GermyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets()
    const { renderPage } = ctx

    ctx.renderPage = () => renderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ]
    }
  }

  render(): ReactElement {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content={VIEWPORT_STRING} />
          <meta name="description" content={APP_HEAD.DESCRIPTION} />
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link rel="stylesheet" href={APP_HEAD.ROBOTO} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
