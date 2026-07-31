import { useMemo, useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import CountyMap from '@/components/CountyMap';
import CountyDetail from '@/components/CountyDetail';
import Legend from '@/components/Legend';
import FadeContent from '@/components/FadeContent';
import CountUp from '@/components/CountUp';
import DecryptedText from '@/components/DecryptedText';
import { COUNTIES, type CountyRecord } from '@/data/counties';

function App() {
  const [selected, setSelected] = useState<CountyRecord | null>(null);

  const stats = useMemo(() => {
    const exceed = COUNTIES.filter((c) => c.comparison === 'Exceed').length;
    const align = COUNTIES.filter((c) => c.comparison === 'Align').length;
    const below = COUNTIES.filter((c) => c.comparison === 'Below').length;
    const independent = COUNTIES.filter((c) => c.dataOrigin !== 'StoryMap').length;
    return { exceed, align, below, independent };
  }, []);

  return (
    <TooltipProvider>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <header className="flex items-center gap-6 px-6 py-3 border-b-2 border-black shrink-0">
          <a
            href="../../../index.html"
            className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 hover:text-black transition-colors"
          >
            &larr; VibeC
          </a>
          <div className="text-xs font-bold tracking-[0.12em] uppercase flex-1">
            GroundTruth
          </div>
          <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
            CA Renewable Permitting vs. CPUC Busbar Mapping
          </div>
        </header>

        <main className="flex flex-1 overflow-hidden">
          <aside className="w-[360px] shrink-0 border-r-2 border-black overflow-y-auto p-6 flex flex-col gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                Spatial Planning for Gigascale Renewables, 2026
              </div>
              <h1 className="font-display text-6xl leading-[0.9] tracking-wide">
                <DecryptedText
                  text="GROUND TRUTH"
                  animateOn="view"
                  revealDirection="start"
                  sequential
                  speed={40}
                />
              </h1>
            </div>

            <FadeContent duration={700} blur>
              <p className="text-sm leading-relaxed text-neutral-600">
                California's state energy plan assigns each county a share of new solar via
                CPUC busbar mapping. This checks that assignment against what's actually moving
                through local land-use permitting, sourced from this year's CEE276M student
                ArcGIS StoryMaps and independent county-records research where a StoryMap
                didn't cover it.
              </p>
            </FadeContent>

            <FadeContent duration={700} delay={150}>
              <div className="grid grid-cols-3 gap-3 border-y border-black py-4">
                <Stat value={stats.exceed} label="Exceed" color="var(--exceed)" />
                <Stat value={stats.align} label="Align" color="var(--align)" />
                <Stat value={stats.below} label="Below" color="var(--below)" />
              </div>
            </FadeContent>

            <FadeContent duration={700} delay={250}>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                  Reading the map
                </div>
                <Legend />
              </div>
            </FadeContent>

            <FadeContent duration={700} delay={350} className="mt-auto">
              <div className="text-[11px] leading-relaxed text-neutral-400 border-t border-neutral-200 pt-3">
                <CountUp to={stats.independent} duration={1} /> of {COUNTIES.length} counties
                needed independent research beyond the StoryMaps (highlighted on click). Click
                any county on the map for full sourcing.
              </div>
            </FadeContent>
          </aside>

          <div className="flex-1 relative">
            <CountyMap selectedFips={selected?.fips ?? null} onSelectCounty={setSelected} />
          </div>
        </main>

        <CountyDetail county={selected} onOpenChange={(open) => !open && setSelected(null)} />
      </div>
    </TooltipProvider>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <div className="font-display text-4xl leading-none" style={{ color }}>
        <CountUp to={value} duration={1} />
      </div>
      <div className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

export default App;
