import React from "react";

type ShareholderDetails = {
  shareholderName: string;
  shareholderEmail: string;
  shareholderAddress: string;
  shareholderCity: string;
  shareholderState: string;
  shareholderZip: string;
  shareholderCountry: string;
};

export const ShareholderDetailsPreview: React.FC<ShareholderDetails> = ({
  shareholderName,
  shareholderEmail,
  shareholderAddress,
  shareholderCity,
  shareholderState,
  shareholderZip,
  shareholderCountry,
}) => (
  <div>
    <p className="text-[11px] text-neutral-400 font-semibold uppercase pb-2">
      Registered Holder
    </p>
    {shareholderName ? (
      <p className="text-base font-semibold">{shareholderName}</p>
    ) : (
      <div className="rounded-md bg-neutral-100 h-4 w-36 animate-pulse mb-2" />
    )}
    {shareholderEmail ? (
      <p className="text-[10px] text-neutral-500 mt-0.5">{shareholderEmail}</p>
    ) : (
      <div className="rounded-md bg-neutral-100 h-3 w-28 animate-pulse mt-1" />
    )}
    <div className="text-[10px] text-neutral-500 mt-1">
      {shareholderAddress ? (
        <p>
          {shareholderAddress}
          {shareholderCity ? `, ${shareholderCity}` : ""}
          {shareholderState ? `, ${shareholderState}` : ""}
          {shareholderZip ? ` ${shareholderZip}` : ""}
          {shareholderCountry ? `, ${shareholderCountry}` : ""}
        </p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-3 w-40 animate-pulse mt-1" />
      )}
    </div>
  </div>
);
