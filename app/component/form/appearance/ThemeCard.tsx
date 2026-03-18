"use client";

type ThemeCardProps = {
  id: string;
  name: string;
  selected: boolean;
  onClick: () => void;
  preview: React.ReactNode;
};

export const ThemeCard = ({ name, selected, onClick, preview }: ThemeCardProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 group focus:outline-none"
  >
    <div
      className={`w-[88px] h-[64px] overflow-hidden transition-all duration-150 rounded-md ${
        selected
          ? "ring-2 ring-primary ring-offset-2"
          : "ring-1 ring-neutral-200 hover:ring-neutral-400"
      }`}
    >
      {preview}
    </div>
    <span
      className={`text-xs font-medium transition-colors ${
        selected
          ? "text-primary"
          : "text-neutral-500 group-hover:text-neutral-800"
      }`}
    >
      {name}
    </span>
  </button>
);

// ─── Theme mini-previews ──────────────────────────────────────────────────────

export const MinimalThemePreview = () => (
  <div className="w-full h-full bg-white p-2 flex flex-col gap-1.5 rounded-2xl">
    <div className="border-b border-dashed border-neutral-200 pb-1.5 flex justify-between items-start">
      <div className="flex flex-col gap-0.5">
        <div className="h-1.5 w-12 bg-neutral-800 rounded-sm" />
        <div className="h-1 w-8 bg-neutral-300 rounded-sm" />
      </div>
      <div className="w-5 h-5 bg-neutral-100 rounded-md" />
    </div>
    <div className="flex flex-col gap-1">
      <div className="h-1 w-full bg-neutral-100 rounded-sm" />
      <div className="h-1 w-4/5 bg-neutral-100 rounded-sm" />
    </div>
    <div className="mt-auto border border-dashed border-neutral-200 rounded-md grid grid-cols-2 overflow-hidden">
      <div className="p-0.5 border-r border-dashed border-neutral-200">
        <div className="h-1 w-4 bg-neutral-200 rounded-sm" />
      </div>
      <div className="p-0.5">
        <div className="h-1 w-4 bg-neutral-200 rounded-sm" />
      </div>
    </div>
  </div>
);

export const NewYorkThemePreview = () => (
  <div className="w-full h-full bg-white p-1.5 flex flex-col gap-1 rounded-xl shadow-sm">
    <div className="border-b border-neutral-300 pb-1 flex justify-between items-start">
      <div className="flex flex-col gap-0.5">
        <div className="h-1.5 w-12 bg-neutral-900 rounded-none" />
        <div className="h-1 w-8 bg-neutral-400 rounded-none" />
      </div>
      <div className="w-4 h-4 bg-neutral-100 rounded-sm" />
    </div>
    <div className="flex flex-col gap-0.5">
      <div className="h-1 w-full bg-neutral-200 rounded-none" />
      <div className="h-1 w-4/5 bg-neutral-200 rounded-none" />
      <div className="h-1 w-3/5 bg-neutral-100 rounded-none" />
    </div>
    <div className="mt-auto border border-neutral-300 rounded-md grid grid-cols-2 overflow-hidden">
      <div className="p-0.5 border-r border-neutral-300">
        <div className="h-1 w-4 bg-neutral-300 rounded-none" />
      </div>
      <div className="p-0.5">
        <div className="h-1 w-4 bg-neutral-300 rounded-none" />
      </div>
    </div>
  </div>
);

// Classic: navy double-border, centered content, traditional
export const ClassicThemePreview = () => (
  <div className="w-full h-full bg-white p-0.5 flex flex-col border-[1.5px] border-[#1e3169] origin-center scale-[0.8]">
    <div className="flex-1 border border-[#1e3169] m-0.5 flex flex-col p-0.5 gap-0.5">
      {/* Company name centered */}
      <div className="flex justify-center">
        <div className="h-1.5 w-16 bg-[#1e3169]/80 rounded-none" />
      </div>
      <div className="flex justify-center">
        <div className="h-1 w-10 bg-neutral-200 rounded-none" />
      </div>
      {/* 3-col row */}
      <div className="border-t border-b border-[#1e3169]/30 grid grid-cols-3 gap-0 mt-0.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`py-0.5 flex flex-col items-center ${i < 2 ? "border-r border-[#1e3169]/30" : ""}`}
          >
            <div className="h-1 w-5 bg-[#1e3169]/60 rounded-none mb-0.5" />
            <div className="h-1 w-3 bg-neutral-200 rounded-none" />
          </div>
        ))}
      </div>
      {/* cert text centered */}
      <div className="flex flex-col items-center gap-0.5 flex-1 justify-center">
        <div className="h-1 w-12 bg-neutral-200 rounded-none" />
        <div className="h-1.5 w-16 bg-[#1e3169]/30 rounded-none" />
        <div className="h-1 w-20 bg-neutral-100 rounded-none" />
      </div>
    </div>
  </div>
);

// ─── Orientation mini-previews ────────────────────────────────────────────────

export const PortraitOrientationPreview = ({ selected }: { selected: boolean }) => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <div
      className={`w-8 h-11 border transition-colors flex flex-col gap-0.5 p-0.5 ${
        selected ? "border-primary" : "border-neutral-300"
      }`}
    >
      <div className="h-1 w-full bg-neutral-200" />
      <div className="h-0.5 w-4/5 bg-neutral-100" />
      <div className="h-0.5 w-3/5 bg-neutral-100" />
      <div className="mt-auto h-1 w-full bg-neutral-100" />
    </div>
  </div>
);

export const LandscapeOrientationPreview = ({ selected }: { selected: boolean }) => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <div
      className={`w-11 h-8 border transition-colors flex flex-col gap-0.5 p-0.5 ${
        selected ? "border-primary" : "border-neutral-300"
      }`}
    >
      <div className="h-1 w-full bg-neutral-200" />
      <div className="flex gap-0.5 flex-1">
        <div className="w-1/2 bg-neutral-100" />
        <div className="w-1/2 bg-neutral-50 border-l border-neutral-200" />
      </div>
    </div>
  </div>
);

// ─── Layout mini-previews ─────────────────────────────────────────────────────

// Portrait standard: stacked sections
export const StandardPortraitLayoutPreview = ({ selected }: { selected: boolean }) => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <div
      className={`w-8 h-11 border flex flex-col p-0.5 gap-0.5 transition-colors ${
        selected ? "border-primary" : "border-neutral-300"
      }`}
    >
      <div className="h-2 w-full border-b border-neutral-200 flex items-center px-0.5">
        <div className="h-0.5 w-3/4 bg-neutral-300" />
      </div>
      <div className="h-2 w-full border-b border-neutral-200 flex items-center px-0.5">
        <div className="h-0.5 w-2/3 bg-neutral-200" />
      </div>
      <div className="flex-1 flex items-center px-0.5">
        <div className="h-0.5 w-1/2 bg-neutral-200" />
      </div>
    </div>
  </div>
);

// Landscape standard: two-column
export const StandardLandscapeLayoutPreview = ({ selected }: { selected: boolean }) => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <div
      className={`w-11 h-8 border flex flex-col p-0.5 gap-0.5 transition-colors ${
        selected ? "border-primary" : "border-neutral-300"
      }`}
    >
      <div className="h-2 border-b border-neutral-200 flex items-center px-0.5">
        <div className="h-0.5 w-3/4 bg-neutral-300" />
      </div>
      <div className="flex-1 flex gap-0.5">
        <div className="flex-1 border-r border-neutral-200 flex flex-col gap-0.5 p-0.5">
          <div className="h-0.5 w-full bg-neutral-200" />
          <div className="h-0.5 w-4/5 bg-neutral-100" />
        </div>
        <div className="flex-1 flex flex-col gap-0.5 p-0.5">
          <div className="h-0.5 w-full bg-neutral-200" />
          <div className="h-0.5 w-3/5 bg-neutral-100" />
        </div>
      </div>
    </div>
  </div>
);

// Landscape formal: stub + double-bordered main area, centered text
export const FormalLandscapeLayoutPreview = ({ selected }: { selected: boolean }) => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <div className={`w-11 h-8 flex flex-col gap-0.5`}>
      {/* stub */}
      <div className="flex justify-between px-0.5 pt-0.5">
        <div className="h-0.5 w-3 bg-neutral-300" />
        <div className="h-0.5 w-3 bg-neutral-300" />
      </div>
      <div
        className={`border-t border-dashed border-neutral-300 mx-0.5`}
      />
      {/* main cert with double border */}
      <div
        className={`flex-1 border-[1.5px] transition-colors mx-0.5 mb-0.5 ${
          selected ? "border-primary" : "border-neutral-400"
        }`}
      >
        <div
          className={`h-full border transition-colors m-0.5 flex flex-col items-center justify-center gap-0.5 ${
            selected ? "border-primary/60" : "border-neutral-300"
          }`}
        >
          <div className="h-1 w-6 bg-neutral-300" />
          <div className="h-0.5 w-8 bg-neutral-200" />
          <div className="h-0.5 w-5 bg-neutral-100" />
        </div>
      </div>
    </div>
  </div>
);
