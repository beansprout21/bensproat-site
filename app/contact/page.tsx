import type { Metadata } from "next";
import { ComingSoon } from "../_components/coming-soon";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return <ComingSoon title="Contact" />;
}
