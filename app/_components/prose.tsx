type ProseProps = {
  paragraphs: string[];
  className?: string;
};

/** Renders an array of paragraphs as <p> elements. No markdown (brief 3). */
export function Prose({ paragraphs, className = "" }: ProseProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="type-body max-w-[60ch] text-ink-2">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
