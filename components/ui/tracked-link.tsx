"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { trackGoal } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  goal: string;
  className?: string;
  children: ReactNode;
  target?: string;
  label?: string;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("tel:") || href.startsWith("mailto:");
}

export function TrackedLink({ href, goal, className, children, target, label }: TrackedLinkProps) {
  const rel = target === "_blank" ? "noreferrer" : undefined;
  const onClick = () => trackGoal(goal, { label: label ?? href });

  if (isExternalHref(href)) {
    return (
      <a className={className} href={href} onClick={onClick} rel={rel} target={target}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={onClick} target={target}>
      {children}
    </Link>
  );
}
