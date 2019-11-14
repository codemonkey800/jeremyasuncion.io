import { AppShell } from 'germy/components'
import { APP_HEAD } from 'germy/strings'
import Head from 'next/head'
import { FunctionComponent } from 'react'

const Home: FunctionComponent = () => (
  <>
    <Head>
      <title>{APP_HEAD.TITLE}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content={APP_HEAD.VIEWPORT} />
      <meta name="description" content={APP_HEAD.DESCRIPTION} />
    </Head>
    <AppShell>
      <h1>derp</h1>
    </AppShell>
  </>
)

export default Home
