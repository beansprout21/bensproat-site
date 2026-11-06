type StatTileProps = {
  value: string;
  label: string;
};

/** Card with a 40px display number and a caption (brief 1.5). */
export function StatTile({ value, label }: StatTileProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 rounded-card border border-line bg-surface p-[22px]">
      <p className="type-stat">{value}</p>
      <p className="text-[14px] leading-[1.45] text-ink-2">{label}</p>
    </div>
  );
}
