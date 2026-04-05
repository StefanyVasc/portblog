export function resolveSiteUrl() {
  return (
    process.env.SITE_URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.URL ??
    'https://stefany-sa.com.br'
  )
}
