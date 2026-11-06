import { Container } from "./container";

/** Placeholder body for routes that are not built yet. Copy arrives per issue. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <Container className="flex flex-col gap-4 py-16 md:py-24">
      <h1 className="type-title">{title}</h1>
      <p className="type-lede text-ink-2">Coming soon</p>
    </Container>
  );
}
