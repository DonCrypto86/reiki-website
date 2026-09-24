/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Next.js cached besuchte Seiten standardmässig clientseitig kurz
    // zwischen (u. a. bei "Zurück"-Navigation), selbst wenn die Seite
    // serverseitig als "force-dynamic" markiert ist. Das führte im
    // Patienten-Tool dazu, dass frisch gespeicherte Änderungen erst nach
    // manuellem Neuladen sichtbar wurden. Für dynamische Seiten wird dieser
    // Cache hier deaktiviert, damit z. B. /patienten-verwalten und
    // /erfahrungen-verwalten bei jeder Navigation den aktuellen Stand laden.
    staleTimes: {
      dynamic: 0
    }
  },
  async redirects() {
    // Pferde/Kleintiere-Landingpages wieder entfernt (Petra bietet aktuell
    // nur Hunde/Katzen an) – leitet evtl. bereits verteilte/indexierte
    // Links sauber auf die Hauptseite "Reiki für Tiere" weiter.
    return [
      {
        source: "/reiki-fuer-tiere/pferde",
        destination: "/reiki-fuer-tiere",
        permanent: true
      },
      {
        source: "/reiki-fuer-tiere/kleintiere",
        destination: "/reiki-fuer-tiere",
        permanent: true
      }
    ];
  },
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
