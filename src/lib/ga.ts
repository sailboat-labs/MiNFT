export const pageview = (url: URL) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const event = ({ action, params }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.gtag("event", action, params);
};
