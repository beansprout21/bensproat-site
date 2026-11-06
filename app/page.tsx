import { getLinks, getProfile } from "@/lib/content";
import { buildProfilePage, serializeJsonLd } from "@/lib/jsonld";
import { Container } from "./_components/container";

const HOME_LINK_ICONS = ["linkedin", "github", "email"];

export default function Home() {
  const profile = getProfile();
  const links = getLinks().filter((link) =>
    HOME_LINK_ICONS.includes(link.icon),
  );

  return (
    <Container className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildProfilePage(profile, "/")),
        }}
      />
      <h1 className="type-title">{profile.name}</h1>
      <p className="type-lede mt-4 text-ink-2">{profile.oneLiner}</p>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              rel="me"
              className="inline-block py-2 underline underline-offset-4"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-muted">Site in progress</p>
    </Container>
  );
}
