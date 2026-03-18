// ─── Theme ───────────────────────────────────────────────────────────────────

export type CertificateTheme = {
  id: string;
  name: string;
  // Container
  bg: string;
  rounded: string;
  outerBorder: string;
  innerBorder: string; // second border for double-border effect (Classic). "" = none
  shadow: string;
  // Dividers
  divider: string;
  innerBorderClass: string; // column separators in landscape standard layout
  // Labels
  labelColor: string;
  labelTracking: string;
  labelSize: string;
  // Values / body text
  valueColor: string;
  bodyText: string;
  // Share details grid
  gridBorder: string;
  gridCellBorder: string;
  // Signatory line
  sigLineColor: string;
  // Header accent / title
  headerAccent: string;
  // Section padding
  sectionPadding: string;
};

export const themes: CertificateTheme[] = [
  {
    id: "minimal",
    name: "Minimal",
    bg: "bg-white",
    rounded: "rounded-2xl",
    outerBorder: "border border-dashed",
    innerBorder: "",
    shadow: "",
    divider: "border-b border-dashed border-neutral-200",
    innerBorderClass: "border-r border-dashed border-neutral-200",
    labelColor: "text-neutral-400",
    labelTracking: "tracking-[0.15em]",
    labelSize: "text-[11px]",
    valueColor: "text-neutral-800",
    bodyText: "text-[10px] text-neutral-500 leading-relaxed",
    gridBorder: "border border-dashed border-neutral-200 rounded-lg",
    gridCellBorder: "border-r border-dashed border-neutral-200",
    sigLineColor: "border-neutral-300 border-dashed",
    headerAccent: "text-neutral-400",
    sectionPadding: "px-10 py-6",
  },
  {
    id: "new-york",
    name: "New York",
    bg: "bg-white",
    rounded: "rounded-xl",
    outerBorder: "border border-neutral-200",
    innerBorder: "",
    shadow: "shadow-sm",
    divider: "border-b border-neutral-200",
    innerBorderClass: "border-r border-neutral-200",
    labelColor: "text-neutral-500",
    labelTracking: "tracking-[0.12em]",
    labelSize: "text-[10px]",
    valueColor: "text-neutral-900",
    bodyText: "text-[10px] text-neutral-600 leading-snug",
    gridBorder: "border border-neutral-200 rounded-md",
    gridCellBorder: "border-r border-neutral-200",
    sigLineColor: "border-neutral-400",
    headerAccent: "text-neutral-600",
    sectionPadding: "px-8 py-5",
  },
  {
    id: "classic",
    name: "Classic",
    bg: "bg-white",
    rounded: "rounded-none",
    outerBorder: "border-[3px] border-[#1e3169]",
    innerBorder: "border border-[#1e3169] m-2",
    shadow: "",
    divider: "border-b border-[#1e3169]/30",
    innerBorderClass: "border-r border-[#1e3169]/30",
    labelColor: "text-[#1e3169]",
    labelTracking: "tracking-[0.05em]",
    labelSize: "text-[11px]",
    valueColor: "text-neutral-900",
    bodyText: "text-[10px] text-neutral-700 leading-relaxed",
    gridBorder: "border border-[#1e3169]/40",
    gridCellBorder: "border-r border-[#1e3169]/40",
    sigLineColor: "border-neutral-700",
    headerAccent: "text-[#1e3169]",
    sectionPadding: "px-8 py-5",
  },
];

export const getTheme = (id: string): CertificateTheme =>
  themes.find((t) => t.id === id) ?? themes[0];

// ─── Layout ───────────────────────────────────────────────────────────────────

export type CertificateLayout = {
  id: string;
  name: string;
};

export const layouts: Record<"portrait" | "landscape", CertificateLayout[]> = {
  portrait: [{ id: "standard", name: "Standard" }],
  landscape: [
    { id: "standard", name: "Standard" },
    { id: "formal", name: "Formal" },
  ],
};

export const getLayoutsForOrientation = (
  orientation: string
): CertificateLayout[] =>
  layouts[orientation as "portrait" | "landscape"] ?? layouts.portrait;
