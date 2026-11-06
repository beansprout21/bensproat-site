import type { Profile } from "./content";

export const SITE_URL = "https://bensproat.com";

type PersonJsonLd = {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  description: string;
  sameAs: string[];
};

type WithContext<T> = T & { "@context": "https://schema.org" };

export function buildPerson(profile: Profile): PersonJsonLd {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.name,
    url: SITE_URL,
    description: profile.oneLiner,
    sameAs: profile.sameAs,
  };
}

export function buildProfilePage(
  profile: Profile,
  pagePath: string,
): WithContext<{
  "@type": "ProfilePage";
  url: string;
  mainEntity: PersonJsonLd;
}> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: new URL(pagePath, SITE_URL).toString(),
    mainEntity: buildPerson(profile),
  };
}

/** Serializes JSON-LD for a <script> tag, escaping "<" to prevent XSS. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
