import type { ReactNode } from "react";
import { CUSTOMER_SUPPORT_URL } from "@/lib/contact";

export function ContactLink({
  children = "케리 카카오톡 채널",
  className = "font-medium text-primary underline underline-offset-4 transition-opacity hover:opacity-70",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a href={CUSTOMER_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}