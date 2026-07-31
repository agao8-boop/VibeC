import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CountUp from '@/components/CountUp';
import { COMPARISON_LABEL, type CountyRecord } from '@/data/counties';

interface CountyDetailProps {
  county: CountyRecord | null;
  onOpenChange: (open: boolean) => void;
}

export default function CountyDetail({ county, onOpenChange }: CountyDetailProps) {
  return (
    <Sheet open={!!county} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto rounded-none border-l-2">
        {county && (
          <>
            <SheetHeader className="pb-2">
              <SheetTitle className="font-display text-4xl tracking-wide">
                {county.name}
              </SheetTitle>
              <SheetDescription className="flex flex-wrap gap-2 pt-1">
                <Badge
                  variant="outline"
                  className="rounded-none border-black text-black"
                  style={{ backgroundColor: `color-mix(in oklab, var(--${county.comparison.toLowerCase()}) 18%, white)` }}
                >
                  {COMPARISON_LABEL[county.comparison]}
                </Badge>
                <Badge variant="outline" className="rounded-none border-black text-black">
                  {county.dataOrigin}
                </Badge>
              </SheetDescription>
            </SheetHeader>

            <div className="px-4 pb-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-black p-3">
                  <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                    In county permitting
                  </div>
                  <div className="font-display text-3xl leading-none">
                    {county.permittingMw > 0 ? (
                      <>
                        <CountUp to={county.permittingMw} duration={1.2} separator="," />
                        <span className="text-base font-sans align-top ml-1">MW</span>
                      </>
                    ) : (
                      '0 MW'
                    )}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">{county.permittingDisplay}</div>
                </div>
                <div className="border border-black p-3">
                  <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                    CPUC 2041 mapped
                  </div>
                  <div className="font-display text-3xl leading-none">
                    <CountUp to={county.mappedMw} duration={1.2} separator="," />
                    <span className="text-base font-sans align-top ml-1">MW</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                  Permitting data source
                </div>
                <p className="text-sm leading-relaxed">{county.source}</p>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                  Cross-check / confidence notes
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">{county.notes}</p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
