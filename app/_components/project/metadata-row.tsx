export type MetadataItem = { label: string; value: string };

/** The Role, Team, When, Status, Stack row under a project's lede (brief 3.1). */
export function MetadataRow({ items }: { items: MetadataItem[] }) {
  if (items.length === 0) return null;
  return (
    <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-x-7 gap-y-5 border-t border-line pt-2">
      {items.map((item) => (
        <div key={item.label} className="flex min-w-0 flex-col gap-1.5 pt-4">
          <dt className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
            {item.label}
          </dt>
          <dd className="text-[15px] leading-[1.5] text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
