// Central spec for every simulated phone rendered on the site.
// Proportions match a modern iPhone (≈393×852pt logical, 9:19.5) so all
// displayed phones share one silhouette. Change it here, it changes everywhere.
export const IPHONE = {
  width: 280,
  aspectRatio: '393 / 852',
  radius: 44,
  frameBg: '#1A1A1A',
  bezel: '2px solid #2E2E2E',
  notch: { width: 88, height: 22 },
  homeIndicator: { width: 100, height: 4 },
}
