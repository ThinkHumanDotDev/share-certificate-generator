/* eslint-disable @next/next/no-img-element */
import React from "react";

type CertificateCompanyDetails = {
  certCompanyName: string;
  certCompanyRegNumber: string;
  certCompanyAddress: string;
  certCompanyCity: string;
  certCompanyState: string;
  certCompanyZip: string;
  certCompanyCountry: string;
  certCompanyLogo: string;
};

export const CertificateCompanyPreview: React.FC<CertificateCompanyDetails> = ({
  certCompanyName,
  certCompanyRegNumber,
  certCompanyAddress,
  certCompanyCity,
  certCompanyState,
  certCompanyZip,
  certCompanyCountry,
  certCompanyLogo,
}) => (
  <div className="flex items-start justify-between">
    <div>
      {certCompanyName ? (
        <p className="text-lg font-bold tracking-wide">{certCompanyName}</p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-5 w-44 animate-pulse mb-2" />
      )}
      {certCompanyRegNumber ? (
        <p className="text-[10px] text-neutral-500">
          Reg. No. {certCompanyRegNumber}
        </p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-3 w-28 animate-pulse mt-1" />
      )}
      <div className="text-[10px] text-neutral-500 mt-1">
        {certCompanyAddress ? (
          <p>
            {certCompanyAddress}
            {certCompanyCity ? `, ${certCompanyCity}` : ""}
            {certCompanyState ? `, ${certCompanyState}` : ""}
            {certCompanyZip ? ` ${certCompanyZip}` : ""}
            {certCompanyCountry ? `, ${certCompanyCountry}` : ""}
          </p>
        ) : (
          <div className="rounded-md bg-neutral-100 h-3 w-36 animate-pulse mt-1" />
        )}
      </div>
    </div>
    <div className="h-12 flex-shrink-0">
      {certCompanyLogo ? (
        <img src={certCompanyLogo} alt="Company Logo" className="h-12 rounded-md" />
      ) : (
        <div className="rounded-lg bg-neutral-100 h-12 w-12 animate-pulse" />
      )}
    </div>
  </div>
);
