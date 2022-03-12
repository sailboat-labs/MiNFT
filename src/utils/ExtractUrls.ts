/* eslint-disable no-useless-escape */
export function extractUrls(data:string){
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
  const matches = data.match(expression);

  return matches;
  
}