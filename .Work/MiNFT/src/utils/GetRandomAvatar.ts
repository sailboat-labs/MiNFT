export function getRandomAvatar(address?: string) {
  if (!address) return `/images/default_avatar3.webp`;
  const lastChar = address.substring(address.length - 2, address.length - 1);
  if (typeof lastChar === "number" && lastChar < 6 && lastChar > 0)
    return `/images/default_avatar${lastChar}.webp`;
  return `/images/default_avatar3.webp`;
}
