// Career / education timeline entries — ported from home.cljs

export interface TimelineEntry {
  /** Display year for the left column. Can be a number or formatted date string. */
  year: number | string;
  /** "Since" label (start of this role). */
  since?: string | undefined;
  /** "Until" label (end of this role). */
  until?: string | undefined;
  /** Path to the organisation logo image. */
  iconSrc?: string | undefined;
  /** Short label for the icon tooltip. */
  iconAlt?: string | undefined;
  /** Section header text. */
  heading: string;
  /** Optional URL linked from the organisation name. */
  orgUrl?: string | undefined;
  /** Main body text for this entry (may contain multiple paragraphs). */
  body: string[];
  /** Optional bullet points under the body. */
  bullets?: string[] | undefined;
  /** Optional link label + href. */
  link?: { label: string; href: string } | undefined;
}

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: new Date().getFullYear(),
    since: 'Oct, 2024',
    until: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    iconSrc: '/static/images/freshpaint.svg',
    iconAlt: 'Freshpaint',
    heading: 'Software Engineering Manager @ Freshpaint',
    orgUrl: 'https://www.freshpaint.io',
    body: [
      'I manage a team of Engineers building out the next generation of Freshpaint Products. We specialize in bringing new Product ideas from 0 to 1.',
    ],
    bullets: [
      'Working on a HIPAA-compliant platform that connects multiple data sources (EHR, Marketing/Advertising, etc) so that Marketers and Advertisers can drive more conversions for every dollar they spend. So far we\'ve seen 20% cost reductions using our Offline Attributions algorithms to improve advertisement targeting.',
      'Developed a HIPAA-Compliant Analytics alternative to Google Analytics 4.',
    ],
  },
  {
    year: 2024,
    since: 'Sept, 2023',
    until: 'Oct, 2024',
    iconSrc: '/static/images/freshpaint.svg',
    iconAlt: 'Freshpaint',
    heading: 'Senior Software Engineer @ Freshpaint',
    orgUrl: 'https://www.freshpaint.io',
    body: [
      'Freshpaint used a Project-based engagement model. I worked on several Projects to develop new Product ideas and improve our platform.',
    ],
    bullets: [
      "Built out the first version of the HIPAA compliant Map product. For some time, the product drove ~20% of Freshpaint's revenue.",
      'Developed an Observability tool that told the story of how Freshpaint processed events (Event Verification). This helped build trust for our external users and speed up debugging for internal users.',
      'Conducted Product/Market Research for a new Freshpaint Product line, designed and prototyped integrations with EMRs (HL7 & FHIR). This directly led to the Ad Performance product.',
    ],
  },
  {
    year: 2023,
    since: 'Dec, 2022',
    until: 'Sept, 2023',
    iconSrc: '/static/images/splash-logo.svg',
    iconAlt: 'Splash Financial',
    heading: 'Engineering Team Lead @ Splash Financial',
    orgUrl: 'https://www.splashfinancial.com',
    body: [
      'I managed the Lender Onboarding Team (4 Engineers) as we built software that shortened customer time-to-value.',
      "Splash planned to increase revenue by bringing more Lenders onto their platform, but the Lending platform didn't support quickly onboarding new Lenders. We replaced the old Monolithic, hard-coded configuration (Lending Rules & Documents) with microservices that allowed internal users to quickly get Lenders on the platform. Per Lender, these systems decreased Engineering onboarding time from ~3 weeks to ~3 days.",
    ],
  },
  {
    year: 2022,
    since: 'June, 2021',
    until: 'Dec, 2022',
    iconSrc: '/static/images/splash-logo.svg',
    iconAlt: 'Splash Financial',
    heading: 'Senior Software Engineer @ Splash Financial',
    orgUrl: 'https://www.splashfinancial.com',
    body: [
      "Migrated Splash's Rate and Eligibility calculations from PHP/Laravel Monolith to Clojure Microservices. Built CSV ingest system and data processing pipelines to support Credit Union Lenders that had custom, in-house operational processes before loan disbursement.",
    ],
  },
  {
    year: 2021,
    since: 'Jan, 2019',
    until: 'June, 2021',
    iconSrc: '/static/images/opploans-logo.svg',
    iconAlt: 'Opportunity Financial',
    heading: 'Software Engineer @ Opportunity Financial',
    orgUrl: 'https://www.oppfi.com',
    body: [
      'At OppFi, the Clojure team used a strong pairing and shared ownership model. I worked on a suite of microservices that included Lending Rules, Credit Decisioning, integrations with consumer report providers (IBV and Credit Reports), Observability/Auditing and more.',
      "Our microservice portfolio included Clojure, Python and Scala, built primarily on ECS and Lambda. Through our work, we enhanced the company's ability to detect fraud, apply custom machine-learning credit decisioning, and introspect/audit our loan processing.",
    ],
  },
  {
    year: 2019,
    since: 'March 2018',
    until: 'Jan, 2019',
    iconSrc: '/static/images/opploans-logo.svg',
    iconAlt: 'Opportunity Financial',
    heading: 'Business Operations Associate @ Opportunity Financial',
    orgUrl: 'https://www.oppfi.com',
    body: [
      'My primary focus was on the health of our Loan Processing pipeline (between loan application and loan origination). While in this role, I wore several different hats, including Analyst, Product Owner, and Engineer.',
      'I analyzed our loan processing data and logs, identified processes to improve areas of high attrition, and executed projects to improve the pipeline.',
    ],
  },
  {
    year: 2018,
    since: 'Aug 2013',
    until: 'Jan 2018',
    iconSrc: '/static/images/n-logo.svg',
    iconAlt: 'Northwestern University',
    heading: 'PhD in Biomedical Engineering @ Northwestern University',
    orgUrl: 'https://northwestern.edu',
    body: [
      'For my Doctoral Thesis, I studied stroke survivors and two possible mechanisms relating to their movement impairments. I used Shear Wave Elastography to study changes in muscle elasticity, and EMG to study changes in muscle\'s electrical properties post-stroke.',
      "While studying muscle's mechanical properties, I performed a sensitivity analysis and measured how sensitive my measurements were to changes in experimental setup. I found that muscle activity played the largest role in repeatability.",
      "Using a Hierarchical Linear Mixed Model, I found evidence of significant differences in the elasticity of stroke survivors' muscles post-stroke.",
      "The second part of my thesis was based on the electrical properties of muscle. I decomposed muscle's electrical signals (sEMG decomposition) to analyze how the Motor Unit pool became disorganized after stroke.",
    ],
    link: {
      label: 'Neural and Biomechanical Mechanisms of Movement Impairment in Stroke Survivors',
      href: 'https://search.library.northwestern.edu/permalink/01NWU_INST/p285fv/cdi_proquest_journals_1984962358',
    },
  },
  {
    year: 2016,
    iconSrc: '/static/images/n-logo.svg',
    iconAlt: 'Northwestern University',
    heading: 'Fellowship @ Northwestern University Center for Leadership',
    orgUrl: 'https://lead.northwestern.edu/our-approach/',
    body: [
      'In the Leadership Fellowship, I studied several theories and models of Leadership with ~10 other Fellows and spent ~100 hours coaching Undergraduate student leaders.',
    ],
  },
  {
    year: 2013,
    since: 'Sept, 2011',
    until: 'Aug, 2013',
    iconSrc: '/static/images/n-logo.svg',
    iconAlt: 'Northwestern University',
    heading: 'MS in Biomedical Engineering @ Northwestern University',
    orgUrl: 'https://northwestern.edu',
    body: [
      "For my Master's Thesis, I studied how the nervous system coordinates complex motion and force production. I simulated muscle activity and muscle tuning curves using Optimal Control theory and compared the results to experimental data gathered in the lab. I found that the Optimal Control optimization strategy predicted inter-muscular coordination patterns well (using NMF/dimensionality reduction).",
    ],
  },
  {
    year: 2011,
    since: 'Aug, 2007',
    until: 'May, 2011',
    iconSrc: '/static/images/lafayette-logo.svg',
    iconAlt: 'Lafayette College',
    heading: 'BS in Chemical Engineering @ Lafayette College',
    orgUrl: 'https://lafayette.edu',
    body: [
      "I chose a major that I thought would be an academic challenge. I liked Chemistry and building and decided to major in Chemical Engineering. I played Ultimate Frisbee, got my worst grade in Experiencing Opera (which I still listen to) and found out that counting (Combinatorics) can get extremely complicated.",
      'I was pretty interested in Engineering pedagogy and thought I might want to become a Professor. I did an independent study in Engineering Pedagogy, which included Maslow\'s hierarchy of needs, models of mastery, etc.',
    ],
  },
  {
    year: 2010,
    iconSrc: '/static/images/air-liquide.ico',
    iconAlt: 'Air Liquide',
    heading: 'Chemical Engineering Internship @ Air Liquide',
    orgUrl: 'https://airliquide.com',
    body: [
      'Was selected as a Society for Chemical Industry (SCI) scholar, and chose Air Liquide as a summer internship. At Air Liquide, I worked on a calculator that computed the amount of refrigerant necessary for a truck to transport goods at a given temperature. I also studied solubility properties of a gas in oil.',
    ],
  },
  {
    year: 2006,
    iconSrc: '/static/images/dunkin.jpg',
    iconAlt: 'Dunkin',
    heading: "Dunkin' Donuts",
    body: [
      "High school job — I was having fun and thought 'why not include my whole work history?'",
    ],
  },
  {
    year: 2005,
    heading: "Acton Children's Discovery Museum",
    body: [
      "High school job — I was having fun and thought 'why not include my whole work history?'",
    ],
  },
];
