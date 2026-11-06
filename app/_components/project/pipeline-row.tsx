import { ArrowRight } from "../icons";

export type PipelineStep = { title: string; text?: string };

type PipelineRowProps = {
  steps: PipelineStep[];
  /** Mono label above the row, for example "Built by a team of AI agents, coordinated through GitHub". */
  label?: string;
};

/**
 * The agent pipeline (brief 4.2 and 4.6): boxes in a wrapping flex row with
 * inline arrow icons between them, not a single SVG. Shared by the Sprout
 * case study and /ventures.
 */
export function PipelineRow({ steps, label }: PipelineRowProps) {
  return (
    <div className="flex flex-col gap-4">
      {label ? (
        <p className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
          {label}
        </p>
      ) : null}
      <ol className="m-0 flex list-none flex-wrap items-stretch gap-2.5 p-0">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex min-w-0 flex-1 basis-[200px] items-stretch gap-2.5"
          >
            <div
              className={`flex min-w-0 flex-1 flex-col gap-1 rounded-[10px] border px-4 py-3.5 ${
                index === 0 ? "border-ink" : "border-line-strong"
              }`}
            >
              <p className="font-display text-[16px] font-semibold text-ink">
                {step.title}
              </p>
              {step.text ? (
                <p className="text-[13.5px] leading-[1.45] text-ink-2">
                  {step.text}
                </p>
              ) : null}
            </div>
            {index < steps.length - 1 ? (
              <span
                className="flex shrink-0 items-center text-muted"
                aria-hidden="true"
              >
                <ArrowRight className="size-[22px]" />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
