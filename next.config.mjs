/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Platzhalter-Konfiguration. Sobald echte Bilder z. B. über eine CDN-Domain
    // eingebunden werden, hier die jeweilige Domain unter "remotePatterns" ergänzen.
    remotePatterns: [],
    // Erlaubt next/image, das lokale SVG-Logo (Blume des Lebens) im Header
    // auszuliefern. Nur für vertrauenswürdige, lokal abgelegte SVGs aktiviert.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default nextConfig;
