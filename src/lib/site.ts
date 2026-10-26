/**
 * AVIGENT Technologies — single source of truth for site content.
 *
 * VERIFIED content comes from the current live website (avigent.in):
 *   company name, founder, founding year, service names + descriptions,
 *   phone, email, office address.
 *
 * Items marked `// REVIEW:` were drafted as sensible defaults and must be
 * confirmed by AVIGENT before launch. See CONTENT_REVIEW.md in the repo root.
 */

export const company = {
  name: "AVIGENT Technologies",
  shortName: "AVIGENT",
  tagline: "Powering Progress Since 2012",
  founder: "Avinash Mohandas",
  foundedYear: 2012,
  url: "https://avigent.in",
  phoneDisplay: "+91 96200 94100",
  phoneHref: "tel:+919620094100",
  email: "info@avigent.in",
  emailHref: "mailto:info@avigent.in",
  whatsappHref: "https://wa.me/919620094100",
  whatsappWithText: (text: string) =>
    `https://wa.me/919620094100?text=${encodeURIComponent(text)}`,
  address: {
    line1: "2nd Floor, KC Arcade",
    line2: "Near TV Centre, CSEZ P.O.",
    locality: "Kakkanad, Kochi",
    region: "Kerala",
    postalCode: "682037",
    country: "IN",
    full: "2nd Floor, KC Arcade, Near TV Centre, CSEZ P.O., Kakkanad, Kochi, Kerala 682037",
  },
  mapsQuery: "KC Arcade, Near TV Centre, Kakkanad, Kochi, Kerala 682037",
  // REVIEW: business hours are not published on the current site.
  hours: null as string | null,
} as const;

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  company.mapsQuery,
)}&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.mapsQuery,
)}`;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export type ServiceSlug =
  | "electrical-maintenance"
  | "electrical-safety-audits"
  | "engineering-consultancy"
  | "renewable-energy-epc"
  | "engineering-services";

export type Service = {
  slug: ServiceSlug;
  index: string;
  title: string;
  short: string;
  /** Verified copy from the live site */
  summary: string;
  /** Additional verified copy where available */
  extra?: string;
  image: string;
  imageAlt: string;
  icon: "wrench" | "shield" | "compass" | "sun" | "cog";
  /** 3dicons.co asset name (see components/ui/Icon3D) */
  icon3d: "tool" | "shield" | "bulb" | "sun" | "setting";
  seoTitle: string;
  seoDescription: string;
  // REVIEW: scope & outcomes lists are drafted defaults — confirm with AVIGENT.
  scope: string[];
  outcomes: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "electrical-maintenance",
    index: "01",
    title: "Electrical Maintenance",
    short: "Preventive care that keeps your systems running smoothly.",
    summary:
      "Keep your electrical systems in top shape with our help. We make sure everything works well, preventing problems and keeping things running smoothly.",
    image: "/images/electrical-maintenance.jpg",
    imageAlt:
      "AVIGENT engineer testing a low-voltage switchgear panel with a multimeter during preventive maintenance",
    icon: "wrench",
    icon3d: "tool",
    seoTitle: "Electrical Maintenance Services in Kochi",
    seoDescription:
      "Preventive and breakdown electrical maintenance from AVIGENT Technologies, Kakkanad, Kochi. Keep panels, switchgear and distribution systems safe and running smoothly.",
    scope: [
      "Planned preventive maintenance for LT panels, distribution boards and switchgear",
      "Breakdown support, troubleshooting and fault rectification",
      "Inspection of cables, terminations and busbar connections",
      "Testing of protection devices — breakers, RCCBs and relays",
      "Earthing system inspection and resistance testing",
      "Clear maintenance records and recommendations after every visit",
    ],
    outcomes: [
      { title: "Fewer breakdowns", text: "Problems are caught early, before they interrupt operations." },
      { title: "Longer equipment life", text: "Well-maintained systems age slower and perform better." },
      { title: "Safer facilities", text: "Loose connections and overloads are identified and corrected." },
    ],
  },
  {
    slug: "electrical-safety-audits",
    index: "02",
    title: "Electrical Safety Audits",
    short: "Identify hazards and build a secure, compliant workplace.",
    summary:
      "Prioritize workplace safety with our comprehensive safety audits, identifying and addressing potential hazards to create a secure and compliant environment.",
    image: "/images/safety-audit.jpg",
    imageAlt:
      "Electrical safety auditor inspecting a distribution panel with a thermal imaging camera and tablet checklist",
    icon: "shield",
    icon3d: "shield",
    seoTitle: "Electrical Safety Audits in Kochi, Kerala",
    seoDescription:
      "Comprehensive electrical safety audits by AVIGENT Technologies. Identify hazards, close compliance gaps and create a secure workplace. Based in Kakkanad, Kochi.",
    scope: [
      "On-site inspection of electrical installations and switch rooms",
      "Thermal scanning of panels to spot overheating connections",
      "Earthing and protection system assessment",
      "Review of load distribution and protection coordination",
      "Hazard identification with prioritised recommendations",
      "Detailed audit report with a practical corrective-action plan",
    ],
    outcomes: [
      { title: "Hazards made visible", text: "A clear picture of risks across your installation." },
      { title: "Prioritised actions", text: "Know what to fix first, and why it matters." },
      { title: "Compliance confidence", text: "Work towards a secure and compliant environment." },
    ],
  },
  {
    slug: "engineering-consultancy",
    index: "03",
    title: "Engineering Consultancy",
    short: "Expert guidance to optimise processes and solve complex challenges.",
    summary:
      "Leverage our engineering expertise to optimize your processes, improve efficiency, and navigate complex challenges with tailored consultancy services.",
    extra:
      "AVIGENT Technologies serves as a trusted consulting agency, offering expert guidance and strategic insights. Our seasoned consultants collaborate with clients to navigate challenges, optimize operations, and achieve sustainable growth.",
    image: "/images/engineering-consultancy.jpg",
    imageAlt: "Two engineers reviewing electrical single-line diagrams and drawings in an office",
    icon: "compass",
    icon3d: "bulb",
    seoTitle: "Electrical Engineering Consultancy in Kochi",
    seoDescription:
      "Tailored electrical engineering consultancy from AVIGENT Technologies — optimise processes, improve efficiency and plan projects with expert guidance. Kakkanad, Kochi.",
    scope: [
      "Electrical system design review and improvement",
      "Load assessment and energy-efficiency studies",
      "Solar feasibility and energy-transition planning",
      "Technical specifications and equipment evaluation",
      "Project planning and execution guidance",
      "Independent technical advice for facility teams",
    ],
    outcomes: [
      { title: "Better decisions", text: "Engineering insight before you commit budget." },
      { title: "Improved efficiency", text: "Processes and systems tuned for performance." },
      { title: "Sustainable growth", text: "Plans that scale with your operations." },
    ],
  },
  {
    slug: "renewable-energy-epc",
    index: "04",
    title: "Renewable Energy EPC",
    short: "End-to-end solar engineering, procurement and construction.",
    summary:
      "Embrace sustainable solutions with our end-to-end services in Renewable Energy Engineering, Procurement, and Construction (EPC), facilitating the seamless integration of renewable technologies.",
    image: "/images/solar-epc.jpg",
    imageAlt: "Technicians installing solar PV panels on a commercial rooftop in Kerala",
    icon: "sun",
    icon3d: "sun",
    seoTitle: "Solar EPC & Renewable Energy Solutions in Kochi",
    seoDescription:
      "End-to-end renewable energy EPC from AVIGENT Technologies — solar design, procurement, installation and commissioning for businesses and homes in Kerala.",
    scope: [
      "Site survey, shadow analysis and feasibility assessment",
      "System design for rooftop and ground-mounted solar",
      "On-grid, off-grid and hybrid solar configurations",
      "Procurement of modules, inverters and balance-of-system",
      "Safe installation, testing and commissioning",
      "Post-installation monitoring and maintenance support",
    ],
    outcomes: [
      { title: "Single point of contact", text: "One team from feasibility to commissioning." },
      { title: "Seamless integration", text: "Renewables that work with your existing systems." },
      { title: "Cleaner energy", text: "A practical step towards a greener future." },
    ],
  },
  {
    slug: "engineering-services",
    index: "05",
    title: "Engineering Services",
    short: "Custom, reliable engineering for diverse industry needs.",
    summary:
      "At AVIGENT Technologies, we offer a variety of engineering solutions with precision and innovation in every project. Our skilled team provides custom and reliable services to meet different industry needs efficiently.",
    image: "/images/engineering-services.jpg",
    imageAlt: "Engineer working on a neatly wired industrial electrical control panel",
    icon: "cog",
    icon3d: "setting",
    seoTitle: "Electrical Engineering Services in Kochi, Kerala",
    seoDescription:
      "Precision electrical engineering services from AVIGENT Technologies — installations, panel works, testing and custom solutions for industrial and commercial facilities.",
    scope: [
      "Electrical installation — wiring, fittings and distribution",
      "Panel, cabling and power distribution works",
      "Fire alarm and security alarm system installation",
      "Electrical testing, measurement and analysis",
      "Power project engineering support",
      "Custom solutions engineered around your site",
    ],
    outcomes: [
      { title: "Precision delivery", text: "Work executed carefully and to specification." },
      { title: "Tailored solutions", text: "Engineering shaped around your requirements." },
      { title: "Reliable results", text: "Systems built to perform day after day." },
    ],
  },
];

export const getService = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const whyChooseUs = [
  {
    title: "Safety First",
    text: "Every task is planned around safe work practices — protecting your people, your property and our team.",
    icon: "shield",
    icon3d: "shield",
  },
  {
    title: "Reliability",
    text: "Dependable workmanship and responsive support, so your electrical systems keep running when you need them.",
    icon: "gauge",
    icon3d: "battery",
  },
  {
    title: "Technical Expertise",
    text: "Engineering know-how across maintenance, audits, consultancy and renewable energy — under one roof.",
    icon: "cog",
    icon3d: "setting",
  },
  {
    title: "Transparent Communication",
    text: "Clear scopes, honest recommendations and straightforward reporting at every stage of the work.",
    icon: "handshake",
    icon3d: "chat",
  },
] as const;

export const industries = [
  { name: "Manufacturing", icon: "factory" },
  { name: "Commercial Buildings", icon: "building" },
  { name: "Healthcare", icon: "health" },
  { name: "Hospitality", icon: "hotel" },
  { name: "Education", icon: "education" },
  { name: "IT Parks", icon: "server" },
  { name: "Residential Complexes", icon: "house" },
] as const;

export type ProjectCategory = "Solar EPC" | "Maintenance" | "Safety Audits" | "Engineering";

export const projectCategories: ProjectCategory[] = [
  "Solar EPC",
  "Maintenance",
  "Safety Audits",
  "Engineering",
];

/**
 * REVIEW: These entries describe the TYPES of work AVIGENT delivers and use
 * representative imagery. No client names, capacities or locations are
 * claimed. Replace with verified AVIGENT project photos/details when available.
 */
export const projects: {
  id: string;
  title: string;
  category: ProjectCategory;
  sector: string;
  description: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "commercial-rooftop",
    title: "Commercial Rooftop Solar",
    category: "Solar EPC",
    sector: "Commercial Buildings",
    description: "Rooftop PV for commercial facilities — from design and procurement to commissioning.",
    image: "/images/commercial-rooftop-solar.jpg",
    imageAlt: "Aerial view of a commercial office building with a rooftop solar PV system in Kochi",
  },
  {
    id: "lt-panel-room",
    title: "LT Panel Room Maintenance",
    category: "Maintenance",
    sector: "Healthcare",
    description: "Planned preventive maintenance for main LT distribution panels and switch rooms.",
    image: "/images/lt-panel-room.jpg",
    imageAlt: "Clean electrical room with a row of LT distribution panels and overhead cable trays",
  },
  {
    id: "thermal-audit",
    title: "Thermal Scanning & Safety Audit",
    category: "Safety Audits",
    sector: "Manufacturing",
    description: "Panel thermography and hazard identification to prevent failures before they happen.",
    image: "/images/safety-audit.jpg",
    imageAlt: "Auditor using a thermal imaging camera on an industrial electrical panel",
  },
  {
    id: "control-panel",
    title: "Control Panel Engineering",
    category: "Engineering",
    sector: "Manufacturing",
    description: "Neat, well-documented panel wiring and distribution works built to specification.",
    image: "/images/engineering-services.jpg",
    imageAlt: "Close-up of an organised industrial control panel with indicator lights",
  },
  {
    id: "residential-solar",
    title: "Residential Solar System",
    category: "Solar EPC",
    sector: "Residential Complexes",
    description: "Elevated rooftop solar structures with neatly routed inverter and conduit works.",
    image: "/images/residential-solar.jpg",
    imageAlt: "Residential apartment building with an elevated rooftop solar structure and wall-mounted inverters",
  },
  {
    id: "earthing-test",
    title: "Earthing System Testing",
    category: "Safety Audits",
    sector: "Manufacturing",
    description: "Earth resistance measurement and assessment of earthing and protection systems.",
    image: "/images/earthing-test.jpg",
    imageAlt: "Technician performing an earth resistance test beside an industrial building",
  },
  {
    id: "transformer-yard",
    title: "Transformer Yard Inspection",
    category: "Maintenance",
    sector: "Manufacturing",
    description: "Routine inspection of transformer yards, HT cabling and associated protection.",
    image: "/images/transformer-yard.jpg",
    imageAlt: "Engineer inspecting a fenced distribution transformer at an industrial facility",
  },
  {
    id: "switchgear-pm",
    title: "Switchgear Preventive Maintenance",
    category: "Maintenance",
    sector: "Commercial Buildings",
    description: "Testing, tightening and inspection of switchgear to keep power distribution reliable.",
    image: "/images/electrical-maintenance.jpg",
    imageAlt: "Engineer testing a switchgear panel with a multimeter",
  },
  {
    id: "solar-plant",
    title: "Ground-Mounted Solar",
    category: "Solar EPC",
    sector: "Utility & Industrial",
    description: "Engineering, procurement and construction support for ground-mounted solar arrays.",
    image: "/images/solar-plant-aerial.jpg",
    imageAlt: "Aerial view of a ground-mounted solar power plant surrounded by greenery",
  },
];
