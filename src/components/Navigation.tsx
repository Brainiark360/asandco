"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../lib/site-data";
import { Logo } from "./Brand";
import { ButtonLink } from "./ui";

export default function Navigation() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const isCurrent = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);
  function closeMenu() { dialog.current?.close(); }
  function openMenu() { dialog.current?.showModal(); setOpen(true); }

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = originalOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return <header className="site-header">
    <div className="header-inner">
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(({ href, label }) => <Link href={href} key={href} aria-current={isCurrent(href) ? "page" : undefined}>{label}</Link>)}
      </nav>
      <div className="header-cta"><ButtonLink /></div>
      <button ref={trigger} className="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={openMenu}>
        <Image src="/brand/home-mobile-imgMenu.svg" width={20} height={20} alt="" />
      </button>
    </div>
    <dialog id="mobile-navigation" ref={dialog} className="mobile-menu" aria-label="Main navigation" onClose={() => { setOpen(false); trigger.current?.focus(); }}>
      <div className="mobile-menu__header">
        <div onClick={closeMenu}><Logo /></div>
        <button autoFocus className="menu-toggle" type="button" aria-label="Close navigation menu" onClick={closeMenu}><Image src="/brand/10-1189-imgClose.svg" width={20} height={20} alt="" /></button>
      </div>
      <nav className="mobile-menu__links" aria-label="Mobile navigation">
        {navigation.map(({ href, label }, i) => <Link href={href} key={href} aria-current={isCurrent(href) ? "page" : undefined} onClick={closeMenu} style={{ animationDelay: i * 40 + "ms" }}>{label}</Link>)}
      </nav>
      <ButtonLink onClick={closeMenu} />
    </dialog>
  </header>;
}
