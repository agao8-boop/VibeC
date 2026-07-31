import { COMPARISON_COLOR, COMPARISON_LABEL, type Comparison } from '@/data/counties';

const ORDER: Comparison[] = ['Exceed', 'Align', 'Below'];

export default function Legend() {
  return (
    <div className="flex flex-col gap-2">
      {ORDER.map((c) => (
        <div key={c} className="flex items-center gap-2 text-xs">
          <span
            className="inline-block w-3 h-3 border border-black shrink-0"
            style={{ backgroundColor: COMPARISON_COLOR[c] }}
          />
          <span className="text-neutral-600">{COMPARISON_LABEL[c]}</span>
        </div>
      ))}
    </div>
  );
}
