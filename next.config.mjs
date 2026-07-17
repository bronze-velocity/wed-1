/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder photography ships as SVG until real photos replace it — see photo-plan.md
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
