export type Comparison = 'Exceed' | 'Align' | 'Below';
export type DataOrigin = 'StoryMap' | 'Independent Research' | "StoryMap + Emily's draft";

export interface CountyRecord {
  /** 5-digit state+county FIPS code, matches us-atlas counties-10m.json feature ids */
  fips: string;
  name: string;
  /** Human-readable permitting figure as it appears in the source table (may be a range or inequality) */
  permittingDisplay: string;
  /** Single representative number for the permitting figure, used for map color scaling */
  permittingMw: number;
  /** CPUC 2041 busbar-mapped solar, MW */
  mappedMw: number;
  /** How CPUC's mapped figure compares to what's actually in local permitting */
  comparison: Comparison;
  /** Where the permitting figure came from */
  source: string;
  /** Cross-check / confidence notes */
  notes: string;
  dataOrigin: DataOrigin;
}

export const COUNTIES: CountyRecord[] = [
  {
    fips: '06047',
    name: 'Merced',
    permittingDisplay: '200 MW',
    permittingMw: 200,
    mappedMw: 2438,
    comparison: 'Exceed',
    source:
      "Las Camas Solar Park, approved, near Los Banos (Merced County SEIR CUP20-011; EDP); matches County Planner Mark Hamilton's figure from the 7/28/26 call",
    notes:
      'Independently confirmed by BOTH Sydney Dever-Mendenhall and Josie Amoo storymaps, high confidence.',
    dataOrigin: 'StoryMap',
  },
  {
    fips: '06001',
    name: 'Alameda',
    permittingDisplay: '100 MW',
    permittingMw: 100,
    mappedMw: 945,
    comparison: 'Exceed',
    source: 'Aramis Solar Energy Generation & Storage Project, Livermore, in CAISO interconnection queue',
    notes: 'Independently confirmed by BOTH Alice Zhao and Meera Raju storymaps.',
    dataOrigin: 'StoryMap',
  },
  {
    fips: '06025',
    name: 'Imperial',
    permittingDisplay: '~2,500 MW',
    permittingMw: 2500,
    mappedMw: 1057,
    comparison: 'Align',
    source:
      'Imperial County Planning & Development Services Dept internal project data (Titan II Solar, Northstar 2 at 130MW, Virgo Renewables, Nider); figure retained from Emily Leslie\'s original draft, no single public aggregate found.',
    notes:
      'Existing installed capacity (about 2.2 to 2.5 GW) confirmed by 4 separate storymaps. A December 2025 county cap on farmland conversion may constrain the future pipeline.',
    dataOrigin: "StoryMap + Emily's draft",
  },
  {
    fips: '06029',
    name: 'Kern',
    permittingDisplay: '~2,068 MW',
    permittingMw: 2068,
    mappedMw: 9120,
    comparison: 'Exceed',
    source:
      'Winston Solar 200MW + Raceway Solar 400MW + Chalan Solar 65MW + Pappas Solar 3MW (active Kern County CEQA Notices of Preparation, 2026) + Discovery Solar / TerraGen 1,400MW (seeking approval).',
    notes:
      "Storymaps (Kelsey, Anna) gave no permitting figure. Storymaps' own CPUC estimate (about 10.5 to 11 GW) runs slightly above the official busbar table.",
    dataOrigin: 'Independent Research',
  },
  {
    fips: '06037',
    name: 'Los Angeles',
    permittingDisplay: '375 MW',
    permittingMw: 375,
    mappedMw: 3239,
    comparison: 'Exceed',
    source:
      'LA County Dept. of Regional Planning, "Renewable Energy Ordinance Update Technical Study" (March 2026): 8 projects under review in Antelope Valley.',
    notes:
      "Mapped figure is an exact match to the student storymap's own citation. The storymap flagged the source document but did not state the permitting total itself.",
    dataOrigin: 'Independent Research',
  },
  {
    fips: '06071',
    name: 'San Bernardino',
    permittingDisplay: '~505 MW',
    permittingMw: 505,
    mappedMw: 2104,
    comparison: 'Exceed',
    source:
      'County of San Bernardino Land Use Services official project list (3/25/26): Equinox Energy Center 500MW (In Review, NextEra) + Bear Valley Solar 5MW (In Review).',
    notes:
      'Storymaps (Elise, Fiona) gave no permitting figure. Soda Mountain Solar (300MW) excluded, approved via CEC Opt-In Certification, bypassing the county process.',
    dataOrigin: 'Independent Research',
  },
  {
    fips: '06065',
    name: 'Riverside',
    permittingDisplay: '~3,255 MW',
    permittingMw: 3255,
    mappedMw: 3255,
    comparison: 'Align',
    source:
      'CAISO interconnection / commercial-interest "planned capacity" pipeline (Matthew Risk storymap). County Planning Director John Hildebrand describes a "streamlined permitting environment."',
    notes:
      'Pipeline figure and CPUC-mapped figure are the same number. No county-only permit count exists separate from the interconnection queue.',
    dataOrigin: 'StoryMap',
  },
  {
    fips: '06019',
    name: 'Fresno',
    permittingDisplay: '>21,000 MW',
    permittingMw: 21000,
    mappedMw: 2799,
    comparison: 'Below',
    source:
      'VCIP (Valley Clean Infrastructure Plan), 20,000+MW proposed by Golden State Clean Energy, + Darden Clean Energy Project 1,150MW (approved via AB205/CEC opt-in, bypassing the county).',
    notes: 'Independently confirmed by BOTH Miki Yang and Almanzo Gao storymaps (about 20 to 21 GW, consistent).',
    dataOrigin: 'StoryMap',
  },
  {
    fips: '06085',
    name: 'Santa Clara',
    permittingDisplay: '0 MW',
    permittingMw: 0,
    mappedMw: 0,
    comparison: 'Align',
    source:
      '"Santa Clara currently has no utility-scale clean energy plants nor any major projects in development" (Sadira Bobb & Camden Burk storymap).',
    notes: 'Simplest case: both figures are zero, stated explicitly in the storymap text.',
    dataOrigin: 'StoryMap',
  },
  {
    fips: '06073',
    name: 'San Diego',
    permittingDisplay: '100 MW',
    permittingMw: 100,
    mappedMw: 127,
    comparison: 'Align',
    source: 'Starlight Solar Project (100MW AC + 217.4MW BESS), approved by SD County Planning Commission 7/10/26 (KPBS News).',
    notes: 'No student storymap covered San Diego, the course roster shows no students were assigned to this county.',
    dataOrigin: 'Independent Research',
  },
  {
    fips: '06031',
    name: 'Kings',
    permittingDisplay: '~2,925-3,175 MW',
    permittingMw: 3050,
    mappedMw: 630,
    comparison: 'Below',
    source:
      'Westlands VI Solar 250MW (approved 4/7/26) + San Luis West Solar 125MW (breaking ground 2026) + one unnamed 2,800MW solar+storage project (Draft EIR stage, per CEQAnet).',
    notes:
      'No student storymap covered Kings ("not applicable" per the course roster). The local pipeline far exceeds CPUC\'s modest allocation, similar to Fresno\'s VCIP dynamic.',
    dataOrigin: 'Independent Research',
  },
];

export const COMPARISON_COLOR: Record<Comparison, string> = {
  Exceed: 'var(--exceed)',
  Align: 'var(--align)',
  Below: 'var(--below)',
};

export const COMPARISON_LABEL: Record<Comparison, string> = {
  Exceed: 'Mapped exceeds permitting',
  Align: 'Mapped aligns with permitting',
  Below: 'Mapped falls below permitting',
};
