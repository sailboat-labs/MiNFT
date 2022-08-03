export const pageview = (url: URL) => {
  gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  })
}

export const event = ( {action, params} ) => {
  window.gtag('event', action, params)
}