import React from "react";

type SignatoryDetails = {
  director1Name: string;
  director2Name: string;
  secretaryName: string;
  sigLineClass?: string;
};

const SignatureLine = ({
  name,
  role,
  sigLineClass = "border-neutral-300 border-dashed",
}: {
  name: string;
  role: string;
  sigLineClass?: string;
}) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`w-20 border-b ${sigLineClass}`} />
    {name ? (
      <p className="text-[9px] font-medium text-center text-neutral-700">{name}</p>
    ) : (
      <div className="rounded-md bg-neutral-100 h-2.5 w-16 animate-pulse" />
    )}
    <p className="text-[8px] text-neutral-400 uppercase">{role}</p>
  </div>
);

export const SignatoryDetailsPreview: React.FC<SignatoryDetails> = ({
  director1Name,
  director2Name,
  secretaryName,
  sigLineClass,
}) => (
  <div>
    <p className="text-[11px] text-neutral-400 font-semibold uppercase pb-3">
      Signed on behalf of the Company
    </p>
    <div className="flex gap-6 flex-wrap">
      <SignatureLine name={director1Name} role="Director" sigLineClass={sigLineClass} />
      {director2Name && (
        <SignatureLine name={director2Name} role="Director" sigLineClass={sigLineClass} />
      )}
      {secretaryName && (
        <SignatureLine name={secretaryName} role="Secretary" sigLineClass={sigLineClass} />
      )}
    </div>
  </div>
);
