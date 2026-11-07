import type { Metadata } from "next";

export const SITE_NAME = "Ben Sproat";

type PageMetadataInput = {
  /** Page title without the site suffix, for example "Hire me". The home page passes SITE_NAME. */
  title: string;
  description: string;
  /** Site path, for example "/hire". Resolved against `metadataBase` in the root layout. */
  path: string;
  /** Open Graph type: "article" for project pages, "website" otherwise. */
  type?: "website" | "article";
};

/**
 * One metadata block per page (docs/brief-c5.md section 1): title,
 * description, canonical link, Open Graph and Twitter card.
 *
 * Next merges `openGraph` and `twitter` shallowly, so every page that sets a
 * title must set both blocks or the card shows the site default. No `images`
 * key here: the `opengraph-image` files attach the share image.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const isSiteTitle = title === SITE_NAME;
  const fullTitle = isSiteTitle ? SITE_NAME : `${title} | ${SITE_NAME}`;
  return {
    // The root layout's "%s | Ben Sproat" template applies to `title`; the
    // social blocks get the full string because they do not use the template.
    title: isSiteTitle ? { absolute: SITE_NAME } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
