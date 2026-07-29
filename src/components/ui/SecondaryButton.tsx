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

type SecondaryButtonProps = LinkButtonProps | NativeButtonProps;

const baseStyles =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-forest bg-transparent px-6 py-3 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest hover:text-cream focus-visible:bg-forest focus-visible:text-cream disabled:cursor-not-allowed disabled:opacity-60 min-h-[44px]";

/**
 * Zurückhaltender sekundärer Button, z. B. für "Reiki kennenlernen" oder
 * ergänzende Handlungen neben einem PrimaryButton.
 */
export default function SecondaryButton(props: SecondaryButtonProps) {
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
