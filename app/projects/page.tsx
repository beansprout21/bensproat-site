import type { Metadata } from "next";
import { ComingSoon } from "../_components/coming-soon";

export const metadata: Metadata = { title: "Projects" };

export default function Page() {
  return <ComingSoon title="Projects" />;
}
