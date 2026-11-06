import type { Metadata } from "next";
import { ComingSoon } from "../_components/coming-soon";

export const metadata: Metadata = { title: "Resume" };

export default function Page() {
  return <ComingSoon title="Resume" />;
}
