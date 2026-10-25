import Image from "next/image";
import { clients } from "../lib/clients";
import ClientLogoStrip from "./ClientLogoStrip";
import { Section } from "./ui";

export default function ClientsSection() {
  return <Section className="clients-section" id="clients">
    <ClientLogoStrip>
      {/* Equal-width groups make the -50% transform a seamless loop.
          The second is visual only: assistive technology reads each client once. */}
      {[false, true].map((duplicate) => <ul key={String(duplicate)} className="client-marquee__group" aria-label={duplicate ? undefined : "Selected clients"} aria-hidden={duplicate ? true : undefined}>
      {clients.map((client) => <li key={client.id} className={"client-tile" + (client.tone ? " client-tile--" + client.tone : "")}>
        {client.logo ? <>
          <div className="client-tile__artwork">
            <Image
              src={client.logo.src}
              alt=""
              width={client.logo.width}
              height={client.logo.height}
              sizes={client.logo.presentation ? "100px" : "(max-width: 767px) 130px, 180px"}
              className={"client-tile__logo" + (client.logo.presentation ? " client-tile__logo--" + client.logo.presentation : "")}
            />
          </div>
          <span className="client-tile__name">{client.name}</span>
        </> : <span className="client-tile__text">{client.name}</span>}
      </li>)}
      </ul>)}
    </ClientLogoStrip>
    <div className="divider" />
  </Section>;
}
