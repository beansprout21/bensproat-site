import type { Metadata } from "next";
import { ComingSoon } from "../_components/coming-soon";

export const metadata: Metadata = { title: "Now" };

export default function Page() {
  return <ComingSoon title="Now" />;
}
