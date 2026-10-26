import Link from "next/link";
import { Logo } from "./Brand";

export default function Footer() {
  return <footer className="site-footer tone-navy">
    <div className="footer-inner">
      <div className="footer-top">
        <Logo primary />
        <div className="footer-proposition">
          <p className="heading-sm">Clarity that creates momentum.</p>
          <p>Strategy, marketing and digital systems for ambitious businesses.</p>
          <p>Nigeria / Africa / United States / United Kingdom</p>
        </div>
        <div className="footer-links">
          <nav aria-label="Footer navigation"><Link href="/about">About</Link><span aria-hidden="true">/</span><Link href="/services">Services</Link><span aria-hidden="true">/</span><Link href="/approach">Approach</Link></nav>
          <Link className="footer-contact" href="/contact">Start a conversation</Link>
        </div>
      </div>
      <div className="divider" />
      <p className="small-copy">© Alexander Stephen &amp; Co.</p>
    </div>
  </footer>;
}
