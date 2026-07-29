import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
  type?: undefined;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type PrimaryButtonProps = LinkButtonProps | NativeButtonProps;

const baseStyles =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-forest-dark focus-visible:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60 min-h-[44px]";

/**
 * Hervorgehobener Haupt-Call-to-Action. Rendert je nach Nutzung entweder
 * einen Link (z. B. Navigation zu einer Seite) oder einen echten Button
 * (z. B. Formular-Submit).
 */
export default function PrimaryButton(props: PrimaryButtonProps) {
  const { children, className = "" } = props;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  const { href, ...buttonProps } = props as NativeButtonProps;

  return (
    <button {...buttonProps} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
}
