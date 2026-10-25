import Image from "next/image";
import Link from "next/link";

export function Logo({ primary = false }: { primary?: boolean }) {
  return (
    <Link href="/" aria-label="Alexander Stephen & Co. — Home" className={"logo" + (primary ? " logo--primary" : "")}>
      {primary ? <Image src="/brand/home-desktop-imgMomentumAperture.svg" width={56} height={56} alt="" /> : <>
        <Image className="logo__desktop-mark" src="/brand/home-desktop-imgMomentumAperture1.svg" width={38} height={38} alt="" />
        <Image className="logo__mobile-mark" src="/brand/home-mobile-imgMomentumAperture2.svg" width={31.54} height={31.54} alt="" />
      </>}
      <span className="logo__words" aria-hidden="true"><span>alexander</span><span>stephen &amp; co.</span></span>
    </Link>
  );
}

export function Arrow({ light = false }: { light?: boolean }) {
  return <Image className="arrow" src={light ? "/brand/home-desktop-imgArrow.svg" : "/brand/home-desktop-imgArrow1.svg"} width={20} height={20} alt="" aria-hidden="true" />;
}

export function BrandSculpture({ context }: { context: "hero" | "about" | "project" | "success" }) {
  const assets = {
    hero: { desktop: "/brand/home-desktop-imgMomentumAperture3.svg", mobile: "/brand/home-mobile-imgMomentumAperture3.svg", desktopSize: 440, mobileSize: 260 },
    about: { desktop: "/brand/9-3-imgMomentumAperture1.svg", mobile: "/brand/9-8-imgMomentumAperture1.svg", desktopSize: 280, mobileSize: 180 },
    project: { desktop: "/brand/home-desktop-imgMomentumAperture2.svg", mobile: "/brand/home-mobile-imgMomentumAperture1.svg", desktopSize: 220, mobileSize: 140 },
    success: { desktop: "/brand/10-594-imgMomentumAperture1.svg", mobile: "/brand/10-1208-imgMomentumAperture1.svg", desktopSize: 180, mobileSize: 120 },
  }[context];
  return <span className={"brand-sculpture brand-sculpture--" + context} aria-hidden="true">
    <span className="brand-sculpture__motion">
      <Image className="brand-sculpture__desktop" src={assets.desktop} width={assets.desktopSize} height={assets.desktopSize} alt="" preload={context === "hero"} />
      <Image className="brand-sculpture__mobile" src={assets.mobile} width={assets.mobileSize} height={assets.mobileSize} alt="" preload={context === "hero"} />
    </span>
  </span>;
}
