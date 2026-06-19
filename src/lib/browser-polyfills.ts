// Safari 16.4 is supported by this project but does not provide URL.canParse.
// Next.js can use it when an asset prefix is configured, so retain only this
// required fallback instead of shipping the full legacy polyfill collection.
const urlConstructor = URL as unknown as {
  canParse?: (url: string | URL, base?: string | URL) => boolean
}

if (!urlConstructor.canParse) {
  urlConstructor.canParse = (url, base) => {
    try {
      new URL(url, base)
      return true
    } catch {
      return false
    }
  }
}
