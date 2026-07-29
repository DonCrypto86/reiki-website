import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import PrimaryButton from "@/components/ui/PrimaryButton";
import DesktopNav from "./DesktopNav";
import MobileNavigation from "./MobileNavigation";

/**
 * Kopfbereich der Website: Logo/Praxisname, Hauptnavigation, hervorgehobener
 * CTA-Button sowie mobiles Menü. `relative` auf dem <header>, damit sich das
 * mobile Panel sauber darunter einhängt.
 */
export default function Header() {
  return (
    <header className="relative border-b border-beige-dark bg-cream-light">
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <Image
            src="/images/blume-des-lebens.svg"
            alt=""
            width={56}
            height={56}
            className="h-9 w-9 shrink-0 sm:h-14 sm:w-14"
            priority
          />
          <span className="font-serif text-base font-semibold leading-tight text-forest sm:text-xl">
            <span className="block whitespace-nowrap">{siteConfig.headerBrand.line1}</span>
            <span className="block whitespace-nowrap">{siteConfig.headerBrand.line2}</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <DesktopNav />
          <div className="hidden xl:block">
            <PrimaryButton href={siteConfig.header.ctaHref}>
              {siteConfig.header.ctaLabel}
            </PrimaryButton>
          </div>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
