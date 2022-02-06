const basePath = process.env.NODE_ENV === 'production' ? '/snaptr-blog' : '';

module.exports = {
  reactStrictMode: true,
  basePath: `${basePath}`,
  assetPrefix: `${basePath}/`
}
