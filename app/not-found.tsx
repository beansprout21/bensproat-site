import type { Metadata } from "next";
import { Button } from "./_components/button";
import { Container } from "./_components/container";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex flex-col gap-6 py-16 md:py-24">
      <h1 className="type-title">Nothing grows here.</h1>
      <p className="type-lede max-w-[44ch] text-ink-2">
        There is nothing at this address. Try the home page or the project list.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/">Home</Button>
        <Button href="/projects" variant="secondary">
          Projects
        </Button>
      </div>
    </Container>
  );
}
