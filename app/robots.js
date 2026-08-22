const BASE_URL = 'https://wepho.com'

export default function robots() {
  const allowAll = { allow: '/', disallow: ['/api/', '/dev/'] }

  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Googlebot',
    'Applebot',
    'Applebot-Extended',
    'Bingbot',
    'DuckDuckBot',
    'YandexBot',
    'Amazonbot',
    'Bytespider',
    'meta-externalagent',
    'FacebookBot',
    'CCBot',
    'cohere-ai',
    'Diffbot',
  ]

  return {
    rules: [
      ...aiBots.map((userAgent) => ({ userAgent, ...allowAll })),
      { userAgent: '*', ...allowAll },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
