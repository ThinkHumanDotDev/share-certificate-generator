"use client";
import { CertificatePreviewDetails } from "@/app/component/form/certificatePreviewDetails";
import { useCertificateData } from "@/app/hooks/useCertificateData";
import { useFormContext } from "react-hook-form";

export const CertificateDataPreview = () => {
  const { companyDetails, shareholderDetails, shareDetails, signatoryDetails, appearance } =
    useCertificateData();
  const { setValue } = useFormContext();

  const onClick = (step: string) => {
    setValue("step", step);
    localStorage.setItem("step", step);
  };

  return (
    <CertificatePreviewDetails
      onClick={onClick}
      companyDetails={companyDetails}
      shareholderDetails={shareholderDetails}
      shareDetails={shareDetails}
      signatoryDetails={signatoryDetails}
      appearance={appearance}
    />
  );
};
