import type { Metadata } from "next";
import { getProfile } from "@/lib/content";
import { buildProfilePage, serializeJsonLd } from "@/lib/jsonld";
import { ComingSoon } from "../_components/coming-soon";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  const profile = getProfile();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildProfilePage(profile, "/about")),
        }}
      />
      <ComingSoon title="About" />
    </>
  );
}
