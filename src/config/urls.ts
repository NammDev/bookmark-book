const isProduction = process.env.NODE_ENV === 'production'

const domain = 'bookmarkx-c53b200cd6d8.herokuapp.com'
const local = 'localhost:3000'
const home = isProduction ? domain : local
export const protocol = isProduction ? 'https://' : 'http://'

export const urls = {
  homeWithoutProtocol: home,
  home: `${protocol}${home}`,
  authCallback: `${protocol}${home}/auth-callback`,
  account: `${protocol}${home}/account`,
  intro: `${protocol}${home}/intro`,
  settings: `${protocol}${home}/settings`,
  app: `${protocol}${home}/dashboard`,
  api: `${protocol}${home}/api`,
  nonAppApi: `${protocol}${home}/api`,
  twitter: 'https://twitter.com/namdeveloper_ca',
  github: 'https://github.com/NammDev/bookmark-book',
  extensions: {
    chrome:
      'https://chromewebstore.google.com/detail/bookmark-it/fgnmdiklfcddmhmmmppepijecbljfjbm?utm_source=nammdev',
  },
}
