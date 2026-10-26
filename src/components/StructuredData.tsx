import { canIndex, pageSchema, serializeJsonLd, type PublicPagePath } from "../lib/seo";

export default function StructuredData({ path }: { path: PublicPagePath }) {
  if (!canIndex()) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema(path)) }} />;
}
