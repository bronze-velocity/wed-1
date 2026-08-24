export const REGIONS = { EU: 'eu', UK: 'uk', CA: 'california', US: 'us', OTHER: 'other' }

const EU_TIMEZONES = [
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid',
  'Europe/Rome', 'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna',
  'Europe/Stockholm', 'Europe/Copenhagen', 'Europe/Helsinki', 'Europe/Dublin',
  'Europe/Athens', 'Europe/Warsaw', 'Europe/Prague', 'Europe/Bucharest',
  'Europe/Budapest', 'Europe/Sofia', 'Europe/Zagreb', 'Europe/Lisbon',
  'Europe/Oslo', 'Europe/Zurich', 'Europe/Luxembourg', 'Europe/Bratislava',
  'Europe/Ljubljana', 'Europe/Vilnius', 'Europe/Riga', 'Europe/Tallinn',
  'Europe/Malta', 'Europe/Nicosia', 'Europe/Belfast',
]

const CA_TIMEZONES = ['America/Los_Angeles', 'America/San_Francisco', 'America/San_Diego', 'America/Sacramento']

export function detectRegion() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const locale = (typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage)) || ''

    if (timezone === 'Europe/London' && locale.toLowerCase().includes('gb')) return REGIONS.UK
    if (EU_TIMEZONES.includes(timezone)) return REGIONS.EU
    if (timezone.startsWith('Europe/')) return REGIONS.EU
    if (CA_TIMEZONES.includes(timezone)) return REGIONS.CA
    if (timezone.startsWith('America/') && locale.startsWith('en-US')) return REGIONS.US

    return REGIONS.EU
  } catch {
    return REGIONS.EU
  }
}

export function getComplianceRules(region) {
  const rules = {
    [REGIONS.EU]: { bannerType: 'detailed', requiresOptIn: true },
    [REGIONS.UK]: { bannerType: 'detailed', requiresOptIn: true },
    [REGIONS.CA]: { bannerType: 'simple-ccpa', requiresOptIn: false },
    [REGIONS.US]: { bannerType: 'simple', requiresOptIn: false },
    [REGIONS.OTHER]: { bannerType: 'detailed', requiresOptIn: true },
  }
  return rules[region] || rules[REGIONS.OTHER]
}
