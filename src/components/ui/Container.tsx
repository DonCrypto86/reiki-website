import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Zentraler Breiten-Container, sorgt für konsistente Ränder auf allen
 * Bildschirmgrößen und verhindert zu breite Textzeilen.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`container max-w-6xl ${className}`}>{children}</div>;
}
