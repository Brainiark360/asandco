import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Arrow } from "./Brand";

export function ButtonLink({ href = "/contact", children = "Start a conversation", inverse = false, onClick }: { href?: string; children?: ReactNode; inverse?: boolean; onClick?: () => void }) {
  return <Link href={href} className={"button" + (inverse ? " button--inverse" : "")} onClick={onClick}><span>{children}</span><Arrow light={!inverse} /></Link>;
}

export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={"text-link" + (light ? " text-link--light" : "")}><span>{children}</span><Arrow light={light} /></Link>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => <span className="title-line" key={line} style={{ "--line-index": i } as CSSProperties}><span>{line}</span></span>);
}

export function Section({ children, tone = "chalk", className = "", id }: { children: ReactNode; tone?: "chalk" | "white" | "cobalt" | "navy" | "amber" | "tint"; className?: string; id?: string }) {
  return <section id={id} className={"section tone-" + tone + " " + className}><div className="container section__content">{children}</div></section>;
}

export function PageIntro({ eyebrow, title, description, cobalt = false, children }: { eyebrow: string; title: string; description: string; cobalt?: boolean; children?: ReactNode }) {
  return <Section tone={cobalt ? "cobalt" : "chalk"} className="page-intro">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1 className="heading-xl heading-enter"><Lines text={title} /></h1>
    <p className="body-copy measure-intro">{description}</p>
    {children}
  </Section>;
}
